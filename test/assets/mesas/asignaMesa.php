<?php

require ("../conn.php");

if($_POST){

    $idMesa =$_POST["idmesa"];
    $numeroMesa =$_POST["numeromesa"];
    $idPedido;
    
    if(isset($_POST["idpedido"])){
        $idPedido =$_POST["idpedido"];
    }


    session_start();

    $_SESSION["idmesa"] = $idMesa;
    $_SESSION["numeromesa"] = $numeroMesa;
    if(isset($idPedido)){
        $_SESSION["idpedido"] = $idPedido;
    }

    echo $_SESSION["idmesa"];

}