<?php
// api/users.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../config/db.php';

try {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            if (!empty($_GET['id'])) {
                $stmt = $pdo->prepare("SELECT * FROM users WHERE user_id = ?");
                $stmt->execute([$_GET['id']]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($user ? ['status' => 'success', 'user' => $user] : ['status' => 'error', 'message' => 'User not found']);
            } else {
                $stmt = $pdo->query("SELECT * FROM users");
                echo json_encode(['status' => 'success', 'users' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
            }
            break;

        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (isset($_GET['action']) && $_GET['action'] === 'login') {
                if (!isset($data['phone_number']) || !isset($data['password'])) {
                    echo json_encode(['status' => 'error', 'message' => 'Phone number and password are required']);
                    exit();
                }
                
                $stmt = $pdo->prepare("SELECT * FROM users WHERE phone_number = ?");
                $stmt->execute([$data['phone_number']]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($user && password_verify($data['password'], $user['password'])) {
                    unset($user['password']); // Remove password before sending response
                    echo json_encode(['status' => 'success', 'message' => 'Login successful', 'user' => $user]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Invalid phone number or password']);
                }
            } else {
                if (!isset($data['username']) || !isset($data['phone_number']) || !isset($data['password']) || !isset($data['role'])) {
                    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
                    exit();
                }
                
                $stmt = $pdo->prepare("INSERT INTO users (username, phone_number, password, role) VALUES (?, ?, ?, ?)");
                $stmt->execute([
                    $data['username'], 
                    $data['phone_number'], 
                    password_hash($data['password'], PASSWORD_DEFAULT), 
                    $data['role']
                ]);
                echo json_encode(['status' => 'success', 'message' => 'User created']);
            }
            break;

        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['user_id'])) {
                echo json_encode(['status' => 'error', 'message' => 'User ID is required']);
                exit();
            }
            $stmt = $pdo->prepare("UPDATE users SET username = ?, phone_number = ?, password = ?, role = ? WHERE user_id = ?");
            $stmt->execute([
                $data['username'], 
                $data['phone_number'], 
                password_hash($data['password'], PASSWORD_DEFAULT), 
                $data['role'], 
                $data['user_id']
            ]);
            echo json_encode(['status' => 'success', 'message' => 'User updated']);
            break;

        case 'DELETE':
            if (empty($_GET['id'])) {
                echo json_encode(['status' => 'error', 'message' => 'User ID is required']);
                exit();
            }
            $stmt = $pdo->prepare("DELETE FROM users WHERE user_id = ?");
            $stmt->execute([$_GET['id']]);
            echo json_encode(['status' => 'success', 'message' => 'User deleted']);
            break;

        default:
            echo json_encode(['status' => 'error', 'message' => 'Method not supported']);
            break;
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
