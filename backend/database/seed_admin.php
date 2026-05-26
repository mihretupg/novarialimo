<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/database.php';

$email = $argv[1] ?? getenv('NOVARIA_ADMIN_EMAIL') ?: 'admin@novaria.local';
$password = $argv[2] ?? getenv('NOVARIA_ADMIN_PASSWORD') ?: 'ChangeMeNow!123';
$name = $argv[3] ?? getenv('NOVARIA_ADMIN_NAME') ?: 'Novaria Admin';

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = db()->prepare(
    'INSERT INTO users (full_name, email, role, password_hash, auth_provider)
     VALUES (?, ?, "admin", ?, "password")
     ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), role = "admin", password_hash = VALUES(password_hash), auth_provider = "password"'
);
$stmt->execute([$name, $email, $hash]);

echo "Admin account ready: {$email}\n";
