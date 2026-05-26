<?php

declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/security.php';

cors();
boot_session();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
require_csrf();

if ($method === 'GET') {
    $user = require_user();
    if ($user['role'] === 'admin') {
        $stmt = db()->query(
            'SELECT b.*, u.email AS user_email, u.avatar_url AS user_avatar
             FROM bookings b
             LEFT JOIN users u ON u.id = b.user_id
             ORDER BY b.ride_date DESC, b.ride_time DESC, b.id DESC
             LIMIT 100'
        );
    } else {
        $stmt = db()->prepare(
            'SELECT b.*, u.email AS user_email, u.avatar_url AS user_avatar
             FROM bookings b
             LEFT JOIN users u ON u.id = b.user_id
             WHERE b.user_id = ?
             ORDER BY b.ride_date DESC, b.ride_time DESC, b.id DESC
             LIMIT 50'
        );
        $stmt->execute([(int) $user['id']]);
    }

    json_response(['success' => true, 'bookings' => $stmt->fetchAll()]);
}

if ($method === 'POST') {
    $user = current_user();
    $input = input_json();

    $service = clean_value($input['service'] ?? $input['serviceType'] ?? '');
    $name = clean_value($input['name'] ?? $input['fullName'] ?? '');
    $phone = clean_value($input['phone'] ?? '');
    $pickup = clean_value($input['pickup'] ?? '');
    $dropoff = clean_value($input['dropoff'] ?? '');
    $date = clean_value($input['date'] ?? $input['ride_date'] ?? '');
    $time = clean_value($input['time'] ?? $input['ride_time'] ?? '');
    $vehicle = clean_value($input['vehicle'] ?? $input['vehicleType'] ?? '');
    $notes = clean_value($input['notes'] ?? $input['specialRequest'] ?? '');

    $errors = [];
    if (!$service) {
        $errors[] = 'Service type is required.';
    }
    if (!$name) {
        $errors[] = 'Full name is required.';
    }
    if (!$phone) {
        $errors[] = 'Phone number is required.';
    }
    if (!$pickup) {
        $errors[] = 'Pickup location is required.';
    }
    if (!$date) {
        $errors[] = 'Date is required.';
    }
    if (!$time) {
        $errors[] = 'Time is required.';
    }
    if ($service !== 'Hourly Service' && !$dropoff) {
        $errors[] = 'Drop-off location is required for this service.';
    }
    if ($date && strtotime($date) < strtotime('today')) {
        $errors[] = 'Date cannot be in the past.';
    }

    if ($errors) {
        json_response(['success' => false, 'message' => 'Validation failed.', 'errors' => $errors], 422);
    }

    $stmt = db()->prepare(
        'INSERT INTO bookings
        (user_id, service_type, full_name, phone, pickup, dropoff, ride_date, ride_time, vehicle_type, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $user['id'] ?? null,
        $service,
        $name,
        $phone,
        $pickup,
        $dropoff ?: null,
        $date,
        $time,
        $vehicle ?: null,
        $notes ?: null,
    ]);

    json_response([
        'success' => true,
        'message' => 'Booking saved.',
        'booking_id' => (int) db()->lastInsertId(),
    ], 201);
}

if ($method === 'PATCH') {
    require_user('admin');
    $input = input_json();
    $id = (int) ($input['id'] ?? 0);
    $status = clean_value($input['status'] ?? '');
    $price = $input['quoted_price'] ?? null;
    $allowed = ['pending', 'confirmed', 'assigned', 'completed', 'cancelled'];

    if (!$id || !in_array($status, $allowed, true)) {
        json_response(['success' => false, 'message' => 'Valid booking id and status are required.'], 422);
    }

    $stmt = db()->prepare('UPDATE bookings SET status = ?, quoted_price = ? WHERE id = ?');
    $stmt->execute([$status, $price !== null && $price !== '' ? (float) $price : null, $id]);

    json_response(['success' => true]);
}

json_response(['success' => false, 'message' => 'Method not allowed.'], 405);
