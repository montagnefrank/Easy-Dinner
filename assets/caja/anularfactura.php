<?php

require ("../conn.php");

if($_POST["idFactura"]){
    ////////////////////////////////////////////////////////////////////////////INSERTAMOS LA FACTURA
    $update_factura = "UPDATE factura SET statusFactura = 'ANULADA' WHERE idFactura = '".$_POST["idFactura"]."'";
    $result_factura = $conn->query($update_factura);
    if(!$result_factura){
        echo "error";
    } else {
        echo $_POST["idFactura"];
    }
}
?>