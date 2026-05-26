<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';

function oauth_provider_config(string $provider): array
{
    $providers = [
        'google' => [
            'auth_url' => 'https://accounts.google.com/o/oauth2/v2/auth',
            'token_url' => 'https://oauth2.googleapis.com/token',
            'user_url' => 'https://www.googleapis.com/oauth2/v3/userinfo',
            'scope' => 'openid email profile',
        ],
        'facebook' => [
            'auth_url' => 'https://www.facebook.com/dialog/oauth',
            'token_url' => 'https://graph.facebook.com/oauth/access_token',
            'user_url' => 'https://graph.facebook.com/me?fields=id,name,email,picture.type(large)',
            'scope' => 'email,public_profile',
        ],
    ];

    if (!isset($providers[$provider])) {
        json_response(['success' => false, 'message' => 'Unsupported social provider.'], 400);
    }

    $credentials = app_config("oauth.{$provider}");
    return array_merge($providers[$provider], $credentials ?: []);
}

function http_post_form(string $url, array $data, array $headers = []): array
{
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => array_merge(['Content-Type: application/x-www-form-urlencoded'], $headers),
            'content' => http_build_query($data),
            'ignore_errors' => true,
        ],
    ]);

    $response = file_get_contents($url, false, $context);
    $decoded = json_decode((string) $response, true);
    return is_array($decoded) ? $decoded : [];
}

function http_get_json(string $url, string $token): array
{
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => [
                "Authorization: Bearer {$token}",
                'Accept: application/json',
                'User-Agent: Novaria-Limo',
            ],
            'ignore_errors' => true,
        ],
    ]);

    $response = file_get_contents($url, false, $context);
    $decoded = json_decode((string) $response, true);
    return is_array($decoded) ? $decoded : [];
}
