<?php

require ("../conn.php");

if($_POST){

    $username =$_POST["username"];
    $password = $_POST["password"];

    $query="SELECT * FROM usuario where nombreUsuario like '$username'";
    $result = $conn->query($query);
    if(!$result) die($conn->error);
    $rows = $result->num_rows;
    $result->data_seek(0);
    $row=$result->fetch_array(MYSQLI_ASSOC);

    if(($rows!=0)&&(strcmp($row["nombreUsuario"],$username)== 0)&&($row['passwordUsuario']===$password)){
        session_start();
        $_SESSION["usuario"] = $row;
        //PARA EL PERFIL
        $idperfil = $_SESSION['usuario']['idPerfil'];
        $query="SELECT * FROM perfil where idPerfil like '$idperfil'";
        $result = $conn->query($query);
        if(!$result) die($conn->error);
        $rows = $result->num_rows;
        $result->data_seek(0);
        $perfil=$result->fetch_array(MYSQLI_ASSOC);

        $_SESSION["usuario"]['idPerfil'] = $perfil["nombrePerfil"];

        //PARA EL ESTABLECIMIENTO
        $idestablecimiento = $_SESSION['usuario']['idEstablecimiento'];

        $query="SELECT * FROM establecimiento where idEstablecimiento like '$idestablecimiento'";
        $result = $conn->query($query);
        if(!$result) die($conn->error);
        $rows = $result->num_rows;
        $result->data_seek(0);
        $establecimiento=$result->fetch_array(MYSQLI_ASSOC);

        $_SESSION["usuario"]["nombreEstablecimiento"] =  $establecimiento["nombreEstablecimiento"] ;
        $_SESSION["usuario"]["ciudadEstablecimiento"] = $establecimiento["ciudadEstablecimiento"];
        $_SESSION["usuario"]["telefonoEstablecimiento"] = $establecimiento["telefonoEstablecimiento"];
        $_SESSION["usuario"]["sectorEstablecimiento"] = $establecimiento["sectorEstablecimiento"];

        echo json_encode($_SESSION["usuario"]);
    }else{
        echo 'false';
    }

}