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
enforce_rate_limit('admin_login', $email, 5, 15);

$stmt = db()->prepare('SELECT id, password_hash, role FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || $user['role'] !== 'admin' || !$user['password_hash'] || !password_verify($password, $user['password_hash'])) {
    record_auth_attempt('admin_login', $email);
    json_response(['success' => false, 'message' => 'Invalid admin credentials.'], 401);
}

clear_auth_attempts('admin_login', $email);
login_user((int) $user['id']);
json_response(['success' => true, 'user' => current_user(), 'csrf_token' => csrf_token()]);
