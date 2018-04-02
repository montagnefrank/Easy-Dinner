<?php

///////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
error_reporting(E_ALL);
ini_set('display_errors', 1);

require ("../conn.php");

if(isset($_GET["idestablecimiento"])){

    session_start();
    $idEstablecimiento = $_SESSION['usuario']['idEstablecimiento'];

    $query="SELECT idMesa, numeroMesa FROM mesa where idEstablecimiento like '$idEstablecimiento' AND estadoMesa = 'HABILITADA' ORDER BY CAST(numeroMesa as SIGNED INTEGER) ASC";
    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $mesas = array();

    for($i=0;$i< $rows;$i++){
        $result->data_seek($i);
        $mesas[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    echo json_encode($mesas);

}