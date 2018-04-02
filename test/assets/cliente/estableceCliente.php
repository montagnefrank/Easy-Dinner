<?php

require("../conn.php");

$cedula = "";

$cedula = $_POST['cedula'];

if($_POST){
    
    $q = "SELECT * FROM cliente where cedulaCliente='$cedula'";
    
    $result = $conn->query($q);
    if(!$result) die($conn->error);
    
    $rows = $result->num_rows;
    
    if($rows == 1){
        $result->data_seek(0);
        echo json_encode($result->fetch_array(MYSQLI_ASSOC));
    }

}



