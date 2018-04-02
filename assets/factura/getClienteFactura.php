<?php

require("../conn.php");

if(isset($_POST["idpedido"])){

    $idpedido = $_POST["idpedido"];


    $query="select c.* from factura f join cliente c on(f.idCliente = c.idCliente) where f.idPedido = '$idpedido' and f.statusFactura='DELIVER'";

    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $result->data_seek(0);
    $cliente = $result->fetch_array(MYSQLI_ASSOC);
    
    echo json_encode($cliente);

}