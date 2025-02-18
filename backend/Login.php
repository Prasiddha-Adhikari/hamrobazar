<?php
require 'db.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    try {
        $stmt = $conn->prepare("SELECT * FROM Users WHERE Email = :email");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['PasswordHash'])) {
            $_SESSION['user_id'] = $user['UserID'];
            $_SESSION['user_role'] = $user['UserRole'];
            $_SESSION['user_name'] = $user['FullName'];

            echo "Login successful! Welcome, " . $_SESSION['user_name'];
            // Redirect based on role
            if ($user['UserRole'] === 'admin') {
                header("Location: admin_dashboard.php");
            } elseif ($user['UserRole'] === 'seller') {
                header("Location: seller_dashboard.php");
            } else {
                header("Location: user_dashboard.php");
            }
            exit;
        } else {
            echo "Invalid email or password.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>