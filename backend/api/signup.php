<?php
// signup.php
require '../config/db.php'; // Ensure this file contains the correct database connection

session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON input"]);
    exit;
}

if (!isset($data['action'])) {
    echo json_encode(["status" => "error", "message" => "Action not specified"]);
    exit;
}

if ($data['action'] === 'signup') {
    if (!isset($data['fullName'], $data['contact'], $data['password'], $data['countryCode'])) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit;
    }

    $fullName = htmlspecialchars(trim($data['fullName']));
    $contact = htmlspecialchars(trim($data['contact']));
    $password = $data['password'];
    $countryCode = htmlspecialchars(trim($data['countryCode']));
    $created_at = date('Y-m-d H:i:s'); // Get current date and time

    // Generate a unique user_id (if needed, e.g., by UUID or an auto-increment column)
    $user_id = uniqid('', true); // Example user_id generation

    // Default role for the user is 'user'
    $role = 'customer';  // Set the default role as 'user'

    // Determine whether the contact is an email or phone number
    if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
        $contactType = 'email';
        $contactField = 'email';
    } else {
        $contactType = 'phone_number';
        $contactField = 'phone_number';
    }

    // Check if the contact already exists
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE $contactField = :contact");
        $stmt->bindParam(':contact', $contact);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            echo json_encode(["status" => "error", "message" => "Contact already exists"]);
            exit;
        }

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Insert the new user into the database
        $stmt = $pdo->prepare("INSERT INTO users (user_id, username, email, password, role, created_at, phone_number) 
                               VALUES (:user_id, :username, :email, :password, :role, :created_at, :phone)");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':username', $fullName);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':role', $role); // Insert 'user' as the default role
        $stmt->bindParam(':created_at', $created_at);
        $stmt->bindParam(':phone', $contact);
        $stmt->execute();

        echo json_encode(["status" => "success", "message" => "User registered successfully"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
}
?>
