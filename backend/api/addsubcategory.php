<?php
// api/addsubcategory.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Preflight request to check CORS
    http_response_code(200);
    exit();
}

include '../config/db.php';

try {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);

            // Check if category ID and subcategory name are provided
            if (!isset($data['category_id']) || !isset($data['subcategory_name']) || empty($data['subcategory_name'])) {
                http_response_code(400); // Bad request
                echo json_encode(['status' => 'error', 'message' => 'Category ID and subcategory name are required']);
                exit();
            }

            // Insert subcategory into the subcategories table
            $stmt = $pdo->prepare("INSERT INTO subcategories (category_id, subcategory_name) VALUES (?, ?)");
            $stmt->execute([$data['category_id'], $data['subcategory_name']]);

            echo json_encode(['status' => 'success', 'message' => 'Subcategory added successfully']);
            break;

        case 'GET':
            // Fetch all subcategories for a specific category
            if (empty($_GET['category_id'])) {
                http_response_code(400); // Bad request
                echo json_encode(['status' => 'error', 'message' => 'Category ID is required']);
                exit();
            }

            $category_id = $_GET['category_id'];
            $stmt = $pdo->prepare("SELECT subcategory_id, subcategory_name FROM subcategories WHERE category_id = ?");
            $stmt->execute([$category_id]);
            $subcategories = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['status' => 'success', 'subcategories' => $subcategories]);
            break;

        default:
            // Method not supported
            http_response_code(405); // Method Not Allowed
            echo json_encode(['status' => 'error', 'message' => 'Method not supported']);
            break;
    }
} catch (PDOException $e) {
    // Database error handling
    http_response_code(500); // Internal Server Error
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
