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
$email = clean_value($input['email'] ?? '');
$password = (string) ($input['password'] ?? '');

if (!$email || !$password) {
    json_response(['success' => false, 'message' => 'Email and password are required.'], 422);
}
enforce_rate_limit('user_login', $email);

$stmt = db()->prepare('SELECT id, password_hash FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !$user['password_hash'] || !password_verify($password, $user['password_hash'])) {
    record_auth_attempt('user_login', $email);
    json_response(['success' => false, 'message' => 'Invalid email or password.'], 401);
}

clear_auth_attempts('user_login', $email);
login_user((int) $user['id']);
json_response(['success' => true, 'user' => current_user(), 'csrf_token' => csrf_token()]);
