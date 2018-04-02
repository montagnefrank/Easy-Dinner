<?php
// Conexion a la base de datos
define('DB_HOST', '192.168.3.4');
define('DB_USER', 'root');
define('DB_PASSWORD', 'W1nnts3rv3r');	
define('DB_DATABASE', 'di_rulo');

$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);
$conn = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);
if($conn->connect_error)
{
    echo "No se puede establecer la conexión con la BDD";
} 