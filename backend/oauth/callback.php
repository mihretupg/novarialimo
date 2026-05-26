<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/oauth.php';

boot_session();

$provider = clean_value($_GET['provider'] ?? ($_SESSION['oauth_provider'] ?? ''));
$state = clean_value($_GET['state'] ?? '');
$code = clean_value($_GET['code'] ?? '');
$frontend = rtrim((string) app_config('frontend_url'), '/');

if (!$provider || !$state || !$code || !hash_equals((string) ($_SESSION['oauth_state'] ?? ''), $state)) {
    header('Location: ' . $frontend . '/#login?error=oauth_state');
    exit;
}

$providerConfig = oauth_provider_config($provider);
$token = http_post_form($providerConfig['token_url'], [
    'client_id' => $providerConfig['client_id'],
    'client_secret' => $providerConfig['client_secret'],
    'redirect_uri' => $providerConfig['redirect_uri'],
    'code' => $code,
    'grant_type' => 'authorization_code',
], ['Accept: application/json']);

if (empty($token['access_token'])) {
    header('Location: ' . $frontend . '/#login?error=oauth_token');
    exit;
}

$profile = http_get_json($providerConfig['user_url'], (string) $token['access_token']);

if ($provider === 'google') {
    $providerUserId = (string) ($profile['sub'] ?? '');
    $email = (string) ($profile['email'] ?? '');
    $name = (string) ($profile['name'] ?? $email);
    $avatar = $profile['picture'] ?? null;
} else {
    $providerUserId = (string) ($profile['id'] ?? '');
    $email = (string) ($profile['email'] ?? '');
    $name = (string) ($profile['name'] ?? $email);
    $avatar = $profile['picture']['data']['url'] ?? null;
}

if (!$providerUserId || !$email) {
    header('Location: ' . $frontend . '/#login?error=oauth_profile');
    exit;
}

$userId = find_or_create_oauth_user($provider, $providerUserId, $email, $name, $avatar);
login_user($userId);

unset($_SESSION['oauth_state'], $_SESSION['oauth_provider']);
header('Location: ' . $frontend . '/#dashboard');
exit;
