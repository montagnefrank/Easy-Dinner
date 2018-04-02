<?php

require ("../conn.php");

if($_POST["idfactura"]){
    $select_factura = "SELECT * FROM factura WHERE idFactura = '". $_POST["idfactura"] ."' LIMIT 1";
    $result_factura = mysqli_query($conn, $select_factura);
    $row_factura = mysqli_fetch_array($result_factura);

    $select_cliente = "SELECT * FROM cliente WHERE idCliente = '". $row_factura["idCliente"] ."' LIMIT 1 ";
    $result_cliente = mysqli_query($conn, $select_cliente);
    $row_cliente = mysqli_fetch_array($result_cliente);

    $select_sitio = "SELECT * FROM establecimiento WHERE idEstablecimiento = '". $row_factura["idEstablecimiento"] ."' LIMIT 1 ";
    $result_sitio = mysqli_query($conn, $select_sitio);
    $row_sitio = mysqli_fetch_array($result_sitio);

    if(!empty($row_factura['cheque_nrochequeFactura'])){
        $vouchers = "|";
    } else {
        $vouchers = "";
    }

    if($row_factura['statusFactura'] == "ACTIVE"){
        $statusfactura = '<span style="font-size: 20px;line-height: 30px;" class="badge badge-success verfactura_status">Factura Activa</span>';
    } else {
        $statusfactura = '<span style="font-size: 20px;line-height: 30px;" class="badge badge-danger verfactura_status">Factura Anulada</span>';
    }
    echo '
        <div class="col-md-6">
            <div class="row">
                <h1 class="pull-left" style="margin-top: 16px;"> Factura #: 
                    <span style="font-size: 20px;line-height: 30px;" class="badge badge-info verfactura_numero">'. $row_factura['idFactura'] .'</span>
                </h1>
            </div>
            <div class="row">
                <button type="button" class="btn btn-primary btn-lg pull-left verfactura_nombrecliente" style="margin-top: 16px;">
                    <i class="fa fa-user" aria-hidden="true"></i> '. $row_cliente["nombreCliente"] .'
                </button>
                <button type="button" class="btn btn-info btn-md pull-left verfactura_ruc" style="margin-top: 16px;margin-left: 6px;">
                    <i class="fa fa-cube" aria-hidden="true"></i> '. $row_cliente["cedulaCliente"] .'
                </button>
            </div>
            <div class="row">
                <h2 class="pull-left" style="margin-top: 16px;"> Fecha 
                    <span style="font-size: 20px;line-height: 30px;" class="badge badge-warning verfactura_fecha">'. $row_factura['fechaFactura'] .'</span>
                </h2>
            </div>
            <div class="row">
                <h6 class="pull-left" style="margin-top: 16px;"> Forma de Pago: 
                    <span style="font-size: 20px;line-height: 30px;" class="badge badge-success verfactura_formadepago">'. $row_factura['formadepagoFactura'] .'</span>&nbsp;
                    <span style="font-size: 20px;line-height: 30px; margin-top:5px;" class="badge badge-info verfactura_voucher">'. $row_factura['tdc_voucherFactura'] . $vouchers . $row_factura['cheque_nrochequeFactura'] .'</span>
                </h6>
            </div>
        </div>
        <div class="col-md-6">
            <div class="invoice-address">
                <h5 class="pull-left">Lugar: '. $row_sitio["sectorEstablecimiento"] .' ' . $statusfactura . '</h5>
                <table class="table table-striped" >
                    <tbody>
                        <tr>
                            <td width="200">Subtotal:</td>
                            <td class="text-right verfactura_subtotal">$ '. $row_factura['subtotalFactura'] .'</td>
                        </tr>
                        <tr>
                            <td width="200">Descuento:</td>
                            <td class="text-right verfactura_decuento">$ '. $row_factura['descuentoFactura'] .'</td>
                        </tr>
                        <tr>
                            <td>IVA 12%:</td>
                            <td class="text-right verfactura_iva">$ '. $row_factura['ivaFactura'] .'</td>
                        </tr>
                        <tr>
                            <td><strong>Total:</strong></td>
                            <td class="text-right verfactura_total"><strong>$ '. $row_factura['totalFactura'] .'</strong></td>
                        </tr>
                    </tbody>
                </table>   
            </div>
        </div>
        ';
}
?>