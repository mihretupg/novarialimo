<?php

return [
    'app_name' => 'Novaria Limo',
    'frontend_url' => getenv('NOVARIA_FRONTEND_URL') ?: 'http://localhost:5173',
    'allowed_origins' => array_filter(array_map('trim', explode(',', getenv('NOVARIA_ALLOWED_ORIGINS') ?: 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174'))),

    'database' => [
        'host' => getenv('NOVARIA_DB_HOST') ?: '127.0.0.1',
        'port' => getenv('NOVARIA_DB_PORT') ?: '3306',
        'name' => getenv('NOVARIA_DB_NAME') ?: 'novaria',
        'user' => getenv('NOVARIA_DB_USER') ?: 'root',
        'pass' => getenv('NOVARIA_DB_PASS') ?: '',
        'charset' => 'utf8mb4',
    ],

    'session' => [
        'name' => 'novaria_session',
        'secure' => filter_var(getenv('NOVARIA_SESSION_SECURE') ?: false, FILTER_VALIDATE_BOOLEAN),
    ],

    'oauth' => [
        'google' => [
            'client_id' => getenv('GOOGLE_CLIENT_ID') ?: '',
            'client_secret' => getenv('GOOGLE_CLIENT_SECRET') ?: '',
            'redirect_uri' => getenv('GOOGLE_REDIRECT_URI') ?: 'http://localhost:8000/backend/oauth/callback.php?provider=google',
        ],
        'facebook' => [
            'client_id' => getenv('FACEBOOK_CLIENT_ID') ?: '',
            'client_secret' => getenv('FACEBOOK_CLIENT_SECRET') ?: '',
            'redirect_uri' => getenv('FACEBOOK_REDIRECT_URI') ?: 'http://localhost:8000/backend/oauth/callback.php?provider=facebook',
        ],
    ],
];
