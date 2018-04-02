<?php
///////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
//error_reporting(E_ALL ^ E_NOTICE);
//ini_set('display_errors', 1);

require("../conn.php");

$tel = $_POST['tel'];

if($_POST){
    
    $q = "SELECT * FROM cliente where telefonoCliente='$tel'";
    
    $result = $conn->query($q);
    if(!$result) die($conn->error);
    
    $rows = $result->num_rows;
    
    if($rows == 1){
        $result->data_seek(0);
        echo json_encode($result->fetch_array(MYSQLI_ASSOC));
    }

}
