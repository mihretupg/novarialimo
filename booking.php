<?php

declare(strict_types=1);

// Backward-compatible entry point for older form integrations.
// The real MySQL-backed booking API lives in backend/api/bookings.php.
require __DIR__ . '/backend/api/bookings.php';
