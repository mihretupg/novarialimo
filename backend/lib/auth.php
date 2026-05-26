<?php

declare(strict_types=1);

require_once __DIR__ . '/database.php';

function current_user(): ?array
{
    boot_session();
    $id = $_SESSION['user_id'] ?? null;
    if (!$id) {
        return null;
    }

    $stmt = db()->prepare('SELECT id, full_name, email, avatar_url, role, auth_provider, created_at FROM users WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $user = $stmt->fetch();

    return $user ?: null;
}

function require_user(?string $role = null): array
{
    $user = current_user();
    if (!$user) {
        json_response(['success' => false, 'message' => 'Authentication required.'], 401);
    }

    if ($role && $user['role'] !== $role) {
        json_response(['success' => false, 'message' => 'You do not have access to this resource.'], 403);
    }

    return $user;
}

function login_user(int $userId): void
{
    boot_session();
    session_regenerate_id(true);
    $_SESSION['user_id'] = $userId;
}

function logout_user(): void
{
    boot_session();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', $params['secure'], $params['httponly']);
    }
    session_destroy();
}

function find_or_create_oauth_user(string $provider, string $providerUserId, string $email, string $name, ?string $avatar): int
{
    $pdo = db();

    $stmt = $pdo->prepare('SELECT user_id FROM oauth_accounts WHERE provider = ? AND provider_user_id = ? LIMIT 1');
    $stmt->execute([$provider, $providerUserId]);
    $linked = $stmt->fetch();
    if ($linked) {
        update_user_profile((int) $linked['user_id'], $name, $email, $avatar, $provider);
        return (int) $linked['user_id'];
    }

    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $existing = $stmt->fetch();

    if ($existing) {
        $userId = (int) $existing['id'];
        update_user_profile($userId, $name, $email, $avatar, $provider);
    } else {
        $stmt = $pdo->prepare('INSERT INTO users (full_name, email, avatar_url, role, auth_provider) VALUES (?, ?, ?, "user", ?)');
        $stmt->execute([$name ?: $email, $email, $avatar, $provider]);
        $userId = (int) $pdo->lastInsertId();
    }

    $stmt = $pdo->prepare('INSERT INTO oauth_accounts (user_id, provider, provider_user_id) VALUES (?, ?, ?)');
    $stmt->execute([$userId, $provider, $providerUserId]);

    return $userId;
}

function update_user_profile(int $userId, string $name, string $email, ?string $avatar, string $provider): void
{
    $stmt = db()->prepare('UPDATE users SET full_name = ?, email = ?, avatar_url = COALESCE(?, avatar_url), auth_provider = ?, updated_at = NOW() WHERE id = ?');
    $stmt->execute([$name ?: $email, $email, $avatar, $provider, $userId]);
}
