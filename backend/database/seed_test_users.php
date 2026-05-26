<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/database.php';

$users = [
    ['Grace Rider', 'rider@novaria.test', 'RiderPass123'],
    ['Client Demo', 'client@novaria.test', 'ClientPass123'],
];

$stmt = db()->prepare(
    'INSERT INTO users (full_name, email, role, password_hash, auth_provider)
     VALUES (?, ?, "user", ?, "password")
     ON DUPLICATE KEY UPDATE
        full_name = VALUES(full_name),
        role = "user",
        password_hash = VALUES(password_hash),
        auth_provider = "password"'
);

foreach ($users as [$name, $email, $password]) {
    $stmt->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT)]);
    echo "Test user ready: {$email}\n";
}
