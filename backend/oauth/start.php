<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/oauth.php';

cors();
boot_session();

$provider = clean_value($_GET['provider'] ?? '');
$providerConfig = oauth_provider_config($provider);

if (empty($providerConfig['client_id']) || empty($providerConfig['client_secret'])) {
    json_response(['success' => false, 'message' => ucfirst($provider) . ' OAuth is not configured.'], 500);
}

$state = bin2hex(random_bytes(24));
$_SESSION['oauth_state'] = $state;
$_SESSION['oauth_provider'] = $provider;

$params = [
    'client_id' => $providerConfig['client_id'],
    'redirect_uri' => $providerConfig['redirect_uri'],
    'response_type' => 'code',
    'scope' => $providerConfig['scope'],
    'state' => $state,
];

if ($provider === 'google') {
    $params['access_type'] = 'offline';
    $params['prompt'] = 'select_account';
}

$query = http_build_query($params);

header('Location: ' . $providerConfig['auth_url'] . '?' . $query);
exit;
