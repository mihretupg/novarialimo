<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/security.php';

cors();
boot_session();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed.'], 405);
}
require_csrf();

$input = input_json();
$name = clean_value($input['name'] ?? $input['full_name'] ?? '');
$email = clean_value($input['email'] ?? '');
$password = (string) ($input['password'] ?? '');

$errors = [];
if (!$name) {
    $errors[] = 'Full name is required.';
}
if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}
$errors = array_merge($errors, password_errors($password));

if ($errors) {
    json_response(['success' => false, 'message' => 'Registration failed.', 'errors' => $errors], 422);
}
enforce_rate_limit('register', $email);

$stmt = db()->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    record_auth_attempt('register', $email);
    json_response(['success' => false, 'message' => 'We could not create this account. Please check your details or sign in instead.'], 409);
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = db()->prepare(
    'INSERT INTO users (full_name, email, role, password_hash, auth_provider)
     VALUES (?, ?, "user", ?, "password")'
);
$stmt->execute([$name, $email, $hash]);

login_user((int) db()->lastInsertId());
clear_auth_attempts('register', $email);
json_response(['success' => true, 'user' => current_user(), 'csrf_token' => csrf_token()], 201);
