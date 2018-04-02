<?php
///////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
error_reporting(E_ALL);
ini_set('display_errors', 1);

require ("../conn.php");
session_start();
if($_POST){
    $insert_com = "INSERT INTO comentarios (idCliente,idUsuario,fechaComentario,textoComentario,statusComentario) VALUES ('". $_POST['idcliente'] ."','". $_SESSION['usuario']['idUsuario'] ."','". date("Y-m-d") ."','". $_POST['comment'] ."','ACTIVE')";
    $res_com = $conn->query($insert_com);
    if(!$res_com) die($conn->error);
} else {
    echo "No hay nada para actualizar";
}
?>