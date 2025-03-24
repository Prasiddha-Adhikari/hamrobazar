<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../config/db.php'; // Make sure the correct path to db.php

// Get the category ID from the request
$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : 0;

if ($category_id === 0) {
    echo json_encode(['error' => 'Invalid category ID']);
    exit();
}

// Prepare query to fetch subcategories for the selected category
$sql = "SELECT `subcategory_id`, `category_id`, `subcategory_name` FROM subcategories WHERE category_id = ?";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$category_id]);
    $subcategories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($subcategories)) {
        echo json_encode(['error' => 'No subcategories found for this category']);
    } else {
        echo json_encode(['subcategories' => $subcategories]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error fetching subcategories: ' . $e->getMessage()]);
    exit();
}
?>
