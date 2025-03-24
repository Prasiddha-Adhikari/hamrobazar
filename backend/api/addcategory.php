<?php
// api/addcategory.php

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
        case 'GET':
            // Fetch all categories and subcategories
            $stmt = $pdo->query("SELECT c.category_id, c.category_name, s.subcategory_id, s.subcategory_name 
                                 FROM categories c 
                                 LEFT JOIN subcategories s ON c.category_id = s.category_id");
            $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['status' => 'success', 'categories' => $categories]);
            break;

        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);

            if (!isset($data['category_name'])) {
                // Error response for missing category name
                http_response_code(400); // Bad request
                echo json_encode(['status' => 'error', 'message' => 'Category name is required']);
                exit();
            }

            // Insert category into categories table
            $stmt = $pdo->prepare("INSERT INTO categories (category_name) VALUES (?)");
            $stmt->execute([$data['category_name']]);
            $category_id = $pdo->lastInsertId();

            if (isset($data['subcategory_name']) && !empty($data['subcategory_name'])) {
                // Insert subcategory into subcategories table if provided
                $stmt = $pdo->prepare("INSERT INTO subcategories (category_id, subcategory_name) VALUES (?, ?)");
                $stmt->execute([$category_id, $data['subcategory_name']]);
            }

            echo json_encode(['status' => 'success', 'message' => 'Category and subcategory added successfully']);
            break;

        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);

            if (!isset($data['category_id']) || !isset($data['category_name'])) {
                // Error response for missing category ID or name
                http_response_code(400); // Bad request
                echo json_encode(['status' => 'error', 'message' => 'Category ID and name are required']);
                exit();
            }

            // Update category name
            $stmt = $pdo->prepare("UPDATE categories SET category_name = ? WHERE category_id = ?");
            $stmt->execute([$data['category_name'], $data['category_id']]);

            if (isset($data['subcategory_id']) && isset($data['subcategory_name'])) {
                // Update subcategory if provided
                $stmt = $pdo->prepare("UPDATE subcategories SET subcategory_name = ? WHERE subcategory_id = ?");
                $stmt->execute([$data['subcategory_name'], $data['subcategory_id']]);
            }

            echo json_encode(['status' => 'success', 'message' => 'Category and subcategory updated successfully']);
            break;

        case 'DELETE':
            if (empty($_GET['id'])) {
                // Error response for missing category ID
                http_response_code(400); // Bad request
                echo json_encode(['status' => 'error', 'message' => 'Category ID is required']);
                exit();
            }

            // Delete subcategories first if any
            $stmt = $pdo->prepare("DELETE FROM subcategories WHERE category_id = ?");
            $stmt->execute([$_GET['id']]);

            // Delete the category
            $stmt = $pdo->prepare("DELETE FROM categories WHERE category_id = ?");
            $stmt->execute([$_GET['id']]);

            echo json_encode(['status' => 'success', 'message' => 'Category and associated subcategories deleted successfully']);
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
