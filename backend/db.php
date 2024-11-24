<?php
$servername = "db"; // Use the service name defined in docker-compose
$username = "root"; // Your database username
$password = "root"; // Your database password
$dbname = "todo_list"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
