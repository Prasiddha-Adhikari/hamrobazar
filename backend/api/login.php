<?php
require '../config/db.php';  // Ensure this file contains the correct database connection

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

if ($data['action'] === 'login') {
    if (!isset($data['contact'], $data['password'])) {
        echo json_encode(["status" => "error", "message" => "Missing contact or password"]);
        exit;
    }

    // Sanitize the contact value
    $contact = htmlspecialchars(trim($data['contact'])); // Trim and sanitize contact
    $password = $data['password'];

    try {
        // Check if the contact is an email or phone number
        if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
            $contactType = 'email';
        } elseif (preg_match("/^\+?\d{10,15}$/", $contact)) { // Matches phone number with or without a country code
            $contactType = 'phone_number';
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid contact format"]);
            exit;
        }

        // Prepare the query to search by email or phone number
        $stmt = $pdo->prepare("SELECT user_id, username, email, password, role, created_at, phone_number
                               FROM users
                               WHERE $contactType = :contact");
        $stmt->bindParam(':contact', $contact, PDO::PARAM_STR);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['role'] = $user['role'];

                echo json_encode(["status" => "success", "user" => $user]);
            } else {
                echo json_encode(["status" => "error", "message" => "Incorrect password"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "No user found with this contact"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
}
?>