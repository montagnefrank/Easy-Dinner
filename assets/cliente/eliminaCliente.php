<?php

require("../conn.php");

if($_POST){

    $cedula = $_POST["cedula"];

    $q = "DELETE from cliente WHERE cedulaCliente='$cedula'";

    $res = $conn->query($q);

    if(!$res){
        $res = 'Error al eliminar. ' . $conn->error;
    } else {
        echo true;
    }

}
