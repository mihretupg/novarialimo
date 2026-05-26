<?php

declare(strict_types=1);

require_once __DIR__ . '/database.php';

function csrf_token(): string
{
    boot_session();
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return (string) $_SESSION['csrf_token'];
}

function require_csrf(): void
{
    boot_session();
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if (in_array($method, ['GET', 'HEAD', 'OPTIONS'], true)) {
        return;
    }

    $header = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!$header || !hash_equals(csrf_token(), $header)) {
        json_response(['success' => false, 'message' => 'Security token expired. Please refresh and try again.'], 419);
    }
}

function client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function throttle_key(string $scope, string $identifier): string
{
    return hash('sha256', $scope . '|' . strtolower($identifier) . '|' . client_ip());
}

function enforce_rate_limit(string $scope, string $identifier, int $maxAttempts = 8, int $minutes = 15): void
{
    $pdo = db();
    $key = throttle_key($scope, $identifier);
    $windowStart = date('Y-m-d H:i:s', time() - ($minutes * 60));

    $cleanup = $pdo->prepare('DELETE FROM auth_attempts WHERE attempted_at < ?');
    $cleanup->execute([date('Y-m-d H:i:s', time() - 86400)]);

    $stmt = $pdo->prepare('SELECT COUNT(*) AS attempts FROM auth_attempts WHERE attempt_key = ? AND attempted_at >= ?');
    $stmt->execute([$key, $windowStart]);
    $attempts = (int) ($stmt->fetch()['attempts'] ?? 0);

    if ($attempts >= $maxAttempts) {
        json_response(['success' => false, 'message' => 'Too many attempts. Please wait a few minutes and try again.'], 429);
    }
}

function record_auth_attempt(string $scope, string $identifier): void
{
    $stmt = db()->prepare('INSERT INTO auth_attempts (attempt_key, scope, ip_address) VALUES (?, ?, ?)');
    $stmt->execute([throttle_key($scope, $identifier), $scope, client_ip()]);
}

function clear_auth_attempts(string $scope, string $identifier): void
{
    $stmt = db()->prepare('DELETE FROM auth_attempts WHERE attempt_key = ?');
    $stmt->execute([throttle_key($scope, $identifier)]);
}

function password_errors(string $password): array
{
    $errors = [];
    if (strlen($password) < 10) {
        $errors[] = 'Password must be at least 10 characters.';
    }
    if (!preg_match('/[A-Z]/', $password)) {
        $errors[] = 'Password must include an uppercase letter.';
    }
    if (!preg_match('/[a-z]/', $password)) {
        $errors[] = 'Password must include a lowercase letter.';
    }
    if (!preg_match('/[0-9]/', $password)) {
        $errors[] = 'Password must include a number.';
    }

    return $errors;
}
