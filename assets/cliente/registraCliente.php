<?php

require("../conn.php");

if($_POST){

    $cedula = $_POST["cedula"];
    $nombre = $_POST["nombre"];
    $telefono = $_POST["telefono"];
    $email = $_POST["email"];
    $direccion = $_POST["direccion"];



    $q = "SELECT * FROM cliente WHERE cedulaCliente='$cedula'";

    $result = $conn->query($q);
    if(!$result) die($conn->error);
    $rows = $result->num_rows;


    if($rows == 0){
        $q = "INSERT INTO cliente(cedulaCliente,nombreCliente,telefonoCliente,emailCliente,direccionCliente) VALUES ('$cedula', '$nombre','$telefono', '$email','$direccion')";

        $res = $conn->query($q);

        if(!$res){
            $res = 'Error al ingresar. ' . $conn->error;
        } else {
            echo true ;
        }

    }else
        if($rows > 0){
            echo false ;
        }
}

