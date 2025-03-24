<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include '../config/db.php'; // Ensure this file correctly sets up the PDO connection as $pdo

$method = $_SERVER['REQUEST_METHOD'];

function sendResponse($status, $message, $data = []) {
    echo json_encode(["status" => $status, "message" => $message, "data" => $data]);
    exit();
}

if ($method === "GET") {
    // Check if an 'id' parameter is provided
    $productId = isset($_GET['id']) ? intval($_GET['id']) : 0;

    // If productId is provided, fetch a single product
    if ($productId > 0) {
        $sql = "SELECT 
                    p.*, 
                    s.subcategory_name, 
                    c.category_name 
                FROM products p
                JOIN subcategories s ON p.subcategory_id = s.subcategory_id
                JOIN categories c ON s.category_id = c.category_id
                WHERE p.product_id = :product_id";
        
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute([':product_id' => $productId]);
            $product = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($product) {
                // Convert binary image to base64 if stored in DB
                if ($product['image_url']) {
                    $product['image_url'] = 'data:image/png;base64,' . base64_encode($product['image_url']);
                }

                sendResponse("success", "Product fetched successfully", [$product]);
            } else {
                sendResponse("error", "Product not found");
            }
        } catch (PDOException $e) {
            sendResponse("error", "Database query failed: " . $e->getMessage());
        }
    } else {
        // Fetch all products
        $sql = "SELECT 
                    p.*, 
                    s.subcategory_name, 
                    c.category_name 
                FROM products p
                JOIN subcategories s ON p.subcategory_id = s.subcategory_id
                JOIN categories c ON s.category_id = c.category_id";

        try {
            $stmt = $pdo->query($sql);
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Convert binary images to base64
            foreach ($products as &$product) {
                if ($product['image_url']) {
                    $product['image_url'] = 'data:image/png;base64,' . base64_encode($product['image_url']);
                }
            }

            if (count($products) > 0) {
                sendResponse("success", "Products fetched successfully", $products);
            } else {
                sendResponse("error", "No products found");
            }
        } catch (PDOException $e) {
            sendResponse("error", "Database query failed: " . $e->getMessage());
        }
    }
}

sendResponse("error", "Invalid request method");
?>
