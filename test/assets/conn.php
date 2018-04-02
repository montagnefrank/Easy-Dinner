<?php
// Conexion a la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', 'W1nnts3rv3r');	
define('DB_DATABASE', 'dirulo_dev');

$conn = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);
mysqli_set_charset($conn,"utf8");
if($conn->connect_error)
{
    echo "No se puede establecer la conexión con la BDD dirulo";
} 