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
        
        $idperfil = $_SESSION['usuario']['idPerfil'];
        $query="SELECT * FROM perfil where idPerfil like '$idperfil'";
        $result = $conn->query($query);
        if(!$result) die($conn->error);
        $rows = $result->num_rows;
        $result->data_seek(0);
        $perfil=$result->fetch_array(MYSQLI_ASSOC);
        
        $_SESSION["usuario"]['idPerfil'] = $perfil["nombrePerfil"];
        


        echo json_encode($_SESSION["usuario"]);
    }else{
        echo 'false';
    }

}