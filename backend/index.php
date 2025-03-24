<?php
header('Content-Type: application/json');
require_once './config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? '';

switch ($endpoint) {
    case 'users':
        require_once './api/users.php';
        break;
    case 'vendors':
        require_once './api/vendors.php';
        break;
    case 'products':
        require_once './api/products.php';
        break;
    case 'orders':
        require_once './api/orders.php';
        break;
    // case 'manageusers':
    //     require_once './api/manageusers.php';
    //     break;
    // Add other cases as needed
    default:
        echo json_encode(['message' => 'Invalid endpoint']);
        break;
}
