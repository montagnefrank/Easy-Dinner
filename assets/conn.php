<?php

// Conexion a la base de datos PRODUCCION
//define('DB_HOST', 'localhost');
//define('DB_USER', 'root');
//define('DB_PASSWORD', 'W1nnts3rv3r');
//define('DB_DATABASE', 'dirulo');

// Conexion a la base de datos LOCAL
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', 'vagrant');
define('DB_DATABASE', 'dirulo');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
mysqli_set_charset($conn, "utf8");
if ($conn->connect_error) {
    echo "No se puede establecer la conexión con la BAse de Datos Master" . $conn->connect_error;
} 