<?php

require ("../conn.php");

if ($_POST["idpedido"]) {
    ////////////////////////////////////////////////////////////////////////////INSERTAMOS LA FACTURA
    $insert_factura = "INSERT INTO factura (idPedido,idCliente,idEstablecimiento,fechaFactura,horaFactura,subtotalFactura,ivaFactura,totalFactura,descuentoFactura"
            . ",formadepagoFactura,tdc_voucherFactura,cheque_nrochequeFactura,vueltoentregadoFactura,efectivoFactura,tdcFactura,chequeFactura,statusFactura)"
            . "VALUES ('" . $_POST['idpedido'] . "','" . $_POST['idcliente'] . "','2','" . date("Y-m-d") . "','" . date("H:i:s") . "','" . $_POST['subtotal'] .
            "','" . $_POST['iva'] . "','" . $_POST['totalapagar'] . "','" . $_POST['descuento'] . "','" . $_POST['formadepago'] . "','" . $_POST['vouchertdc'] .
            "','" . $_POST['nrocheque'] . "','" . $_POST['vuelto'] . "','" . $_POST['efectivo'] . "','" . $_POST['tdc'] . "','" . $_POST['cheque'] . "','ACTIVE')";
    $result_factura = mysqli_query($conn, $insert_factura);

    ////////////////////////////////////////////////////////////////////////////CAMBIAMOS EL PEDIDO A PAGADO
    $update_padago = "UPDATE pedido SET estadopagoPedido = 'PAGADO' WHERE idPedido = '" . $_POST['idpedido'] . "'";
    $result_pagado = mysqli_query($conn, $update_padago);

    ////////////////////////////////////////////////////////////////////////////CAMBIAMOS LA MESA A HABILITADA
    $select_mesapedido = "SELECT idMesa FROM pedido WHERE idPedido = '" . $_POST['idpedido'] . "'";
    $result_mesapedido = mysqli_query($conn, $select_mesapedido);
    $row_mesapedido = mysqli_fetch_array($result_mesapedido, MYSQLI_BOTH);
    if ($row_mesapedido[0] != '999') {

        $update_mesa = "UPDATE mesa SET estadoMesa = 'HABILITADA' WHERE idMesa = '" . $row_mesapedido[0] . "'";
    }
    $result_mesa = mysqli_query($conn, $update_mesa);
}
?>