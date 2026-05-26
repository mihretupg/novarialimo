<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/security.php';

cors();
require_csrf();
logout_user();

json_response(['success' => true]);
