<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../config/db.php'; // Make sure the path to db.php is correct

// Query to fetch categories using PDO
$sql = "SELECT category_id, category_name FROM categories"; // Ensure category_id is fetched
try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Return categories as an array of objects with category_id and category_name
    echo json_encode(['categories' => $categories]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error executing query: ' . $e->getMessage()]);
    exit();
}

$pdo = null; // Close the PDO connection
?>
