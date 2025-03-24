<?php
session_start(); // Start session to access logged-in user data

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '/var/log/php_errors.log');

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
include('../config/db.php'); 

// Handle error function
function sendError($message) {
    echo json_encode(['error' => $message]);
    exit();
}

// Ensure user is logged in
if (!isset($_SESSION['user'])) {
    sendError('User not authenticated.');
}

// Retrieve user details from session
$username = $_SESSION['user']['username'] ?? null;
$phone_number = $_SESSION['user']['phone_number'] ?? null;

if (!$username || !$phone_number) {
    sendError('Invalid user session. Please log in again.');
}

// Get form data from POST request
$product_name = $_POST['name'] ?? null;
$category_id = $_POST['category'] ?? null;
$description = $_POST['description'] ?? null;
$price = $_POST['price'] ?? null;
$subcategory_id = $_POST['subcategory'] ?? null;

// Validate form inputs
if (!$product_name || !$category_id || !$description || !$price || !$subcategory_id || !isset($_FILES['image'])) {
    sendError('All fields are required.');
}

// Handle image upload
$image = $_FILES['image'];
$image_tmp = $image['tmp_name'];
$image_error = $image['error'];
$image_size = $image['size'];
$allowed_types = ['image/jpeg', 'image/png', 'image/jpg'];

// Validate image type
if (!in_array($image['type'], $allowed_types)) {
    sendError('Invalid image type. Only JPG, JPEG, and PNG are allowed.');
}

// Check file size (Max 5MB)
$max_size = 5 * 1024 * 1024;
if ($image_size > $max_size) {
    sendError('Image size exceeds the maximum limit of 5MB.');
}

// Check for upload errors
if ($image_error !== UPLOAD_ERR_OK) {
    sendError('Failed to upload image.');
}

// Read the image content into a variable
$image_data = file_get_contents($image_tmp);

try {
    $sql = "INSERT INTO `products`(`product_name`, `category_id`, `description`, `price`, `subcategory_id`, `image_url`, `created_at`, `views`, `username`, `phone_number`) 
            VALUES (:product_name, :category_id, :description, :price, :subcategory_id, :image_url, NOW(), :views, :username, :phone_number)";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':product_name', $product_name);
    $stmt->bindParam(':category_id', $category_id);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':subcategory_id', $subcategory_id);
    $stmt->bindParam(':image_url', $image_data, PDO::PARAM_LOB);
    $views = 0; // Initial views count
    $stmt->bindParam(':views', $views);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':phone_number', $phone_number);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Product added successfully!']);
    } else {
        sendError('Failed to add product.');
    }
} catch (PDOException $e) {
    error_log('Database error: ' . $e->getMessage());
    sendError('Database error occurred.');
}
?>
