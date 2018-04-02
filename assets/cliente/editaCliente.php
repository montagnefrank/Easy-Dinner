<?php

require("../conn.php");

if($_POST){

    $cedula = $_POST["cedula"];
    $nombre = $_POST["nombre"];
    $telefono = $_POST["telefono"];
    $email = $_POST["email"];
    $direccion = $_POST["direccion"];

    $q = "UPDATE cliente SET nombreCliente='$nombre',telefonoCliente='$telefono',emailCliente='$email',direccionCliente='$direccion' WHERE cedulaCliente='$cedula'";

    $res = $conn->query($q);

    if(!$res){
        $res = 'Error al ingresar. ' . $conn->error;
    } else {
        $q = "SELECT * FROM cliente where cedulaCliente='$cedula'";

        $result = $conn->query($q);
        if(!$result) die($conn->error);

        $rows = $result->num_rows;

        if($rows == 1){
            $result->data_seek(0);
            echo json_encode($result->fetch_array(MYSQLI_ASSOC));
        }
    }

}

