<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/security.php';

cors();
boot_session();

json_response([
    'success' => true,
    'user' => current_user(),
    'csrf_token' => csrf_token(),
]);
