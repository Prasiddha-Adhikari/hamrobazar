<?php

include('../config/db.php'); // Assuming db.php has your database connection logic

ini_set('display_errors', 1);
error_reporting(E_ALL);

if (isset($_GET['id'])) {
    $productId = $_GET['id'];

    // Prepare query to increment views
    $query = "UPDATE products SET views = views + 1 WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $productId, PDO::PARAM_INT);

    // Execute the query to update the view count
    if ($stmt->execute()) {
        // Get the updated views count
        $updatedQuery = "SELECT views FROM products WHERE id = :id";
        $stmt = $pdo->prepare($updatedQuery);
        $stmt->bindParam(':id', $productId, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Log the result to ensure views are updated
        var_dump($row); // This will show the fetched result

        // Return updated views count
        echo json_encode(['status' => 'success', 'views' => $row['views']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update views']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Product ID not provided']);
}
?>
