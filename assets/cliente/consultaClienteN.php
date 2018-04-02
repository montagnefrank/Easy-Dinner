<?php

require("../conn.php");


$cedula = "";

if($_POST){
    $nombre = $_POST['nombre'];
}

$q = "SELECT * FROM cliente where nombreCliente like '%$nombre%'";

$result = $conn->query($q);
if(!$result) die($conn->error);

$rows = $result->num_rows;
$clientes = array();

for($i=0;$i<$rows;$i++){
    $result->data_seek($i);
    $clientes[] = $result->fetch_array(MYSQLI_ASSOC);
}

print_r(json_encode($clientes));