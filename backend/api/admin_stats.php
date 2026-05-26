<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';

cors();
require_user('admin');

$pdo = db();

$totals = $pdo->query(
    'SELECT
        COUNT(*) AS total_bookings,
        SUM(status = "pending") AS pending_bookings,
        SUM(status = "confirmed") AS confirmed_bookings,
        SUM(status = "completed") AS completed_bookings,
        COALESCE(SUM(quoted_price), 0) AS quoted_revenue
     FROM bookings'
)->fetch();

$users = $pdo->query('SELECT COUNT(*) AS total_users FROM users WHERE role = "user"')->fetch();

$upcoming = $pdo->query(
    'SELECT b.*, u.email AS user_email, u.avatar_url AS user_avatar
     FROM bookings b
     LEFT JOIN users u ON u.id = b.user_id
     WHERE b.ride_date >= CURDATE()
     ORDER BY b.ride_date ASC, b.ride_time ASC
     LIMIT 8'
)->fetchAll();

$serviceMix = $pdo->query(
    'SELECT service_type, COUNT(*) AS total
     FROM bookings
     GROUP BY service_type
     ORDER BY total DESC'
)->fetchAll();

json_response([
    'success' => true,
    'stats' => array_merge($totals ?: [], $users ?: []),
    'upcoming' => $upcoming,
    'service_mix' => $serviceMix,
]);
