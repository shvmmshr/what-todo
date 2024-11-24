<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");

include 'db.php';

// Check if 'id' is set in the request
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Validate and sanitize the ID to prevent SQL injection
    if (filter_var($id, FILTER_VALIDATE_INT)) {
        // Prepare the SQL statement
        $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
        if ($stmt === false) {
            echo json_encode(['status' => 'error', 'message' => 'Prepare failed: ' . $conn->error]);
            exit;
        }

        // Bind the parameter
        $stmt->bind_param("i", $id);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => $stmt->error]);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid ID']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No ID specified']);
}

// Close the database connection
$conn->close();
?>
