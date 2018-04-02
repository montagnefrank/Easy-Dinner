<?php

require("../conn.php");

$cedula = "";

$nombre = $_POST['nombre'];

if($_POST){
    
    $q = "SELECT * FROM cliente where nombreCliente='$nombre'";
    
    $result = $conn->query($q);
    if(!$result) die($conn->error);
    
    $rows = $result->num_rows;
    
    if($rows == 1){
        $result->data_seek(0);
        echo json_encode($result->fetch_array(MYSQLI_ASSOC));
    }

}
