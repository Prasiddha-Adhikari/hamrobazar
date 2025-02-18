<?php
require 'db.php';
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['fullName'], $data['phone'], $data['password'], $data['userRole'])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    $fullName = htmlspecialchars($data['fullName']);
    $phone = htmlspecialchars($data['phone']);
    $password = password_hash($data['password'], PASSWORD_BCRYPT);
    $userRole = htmlspecialchars($data['userRole']); // 'user', 'seller', 'admin'

    try {
        $stmt = $conn->prepare("INSERT INTO Users (FullName, Phone, PasswordHash, UserRole) VALUES (:fullName, :phone, :password, :userRole)");
        $stmt->execute([
            ':fullName' => $fullName,
            ':phone' => $phone,
            ':password' => $password,
            ':userRole' => $userRole
        ]);

        echo json_encode(["status" => "success", "message" => "Signup successful"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
    }
}
?>
