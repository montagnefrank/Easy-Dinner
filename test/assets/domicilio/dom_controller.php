<?php

/////////////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

require ("../conn.php");

if (isset($_POST["dom_newprod"])) {
    $dom_select = "SELECT * FROM producto pro JOIN submenu su ON su.idSubmenu = pro.idSubmenu JOIN menu me ON me.idMenu = su.idMenu WHERE codProducto = '" . $_POST["dom_newprod"] . "' LIMIT 1";
    $dom_res = $conn->query($dom_select);
    if (!$dom_res)
        die($conn->error);
    $dom_rownum = $dom_res->num_rows;
    if ($dom_rownum == 0) {
        echo json_encode(array('status' => 'empty'));
    } else {
        $dom_row = $dom_res->fetch_array(MYSQLI_ASSOC);
        echo json_encode($dom_row);
    }
}

if (isset($_POST["dom_newcom"])) {
    session_start();
    $insert_com = "INSERT INTO comentarios (idCliente,idUsuario,fechaComentario,textoComentario,statusComentario) VALUES ('" . $_POST['dom_newcom'] . "','" . $_SESSION['usuario']['idUsuario'] . "','" . date("Y-m-d") . "','" . $_POST['comment'] . "','ACTIVE')";
    $res_com = $conn->query($insert_com);
    if (!$res_com)
        die($conn->error);
}

if (isset($_POST["dom_resumen"])) {

    $idpedido = $_POST["dom_resumen"];

    $query = "SELECT * FROM pedidoproducto pp join producto p on(p.idProducto = pp.idProducto) join submenu sm on(p.idSubMenu = sm.idSubMenu) join menu m on (sm.idMenu = m.idMenu) WHERE pp.idPedido= '$idpedido'";
    $result = $conn->query($query);
    if (!$result)
        die($conn->error);

    $rows = $result->num_rows;
    $productos = array();

    for ($i = 0; $i < $rows; $i++) {
        $result->data_seek($i);
        $productos[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    $htmlPedido = '
                <div class="col-md-8">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <h2 id="resumen_nombrecliente"><span class="fa fa-list-alt"></span> Pedidos de la mesa</h2>
                            <div class="user">
                                <a href="#" class="name resumen_numerodepedido">Numero de pedido</a>
                                <div class="pull-right" style="width: 100px;">
                                    <button class="btn btn-info btn-block resumen_numeromesa"><span class="fa fa-thumb-tack"></span> Mesa</button>
                                </div>
                                <div class="pull-right" style="width: 200px; margin-right:16px;">
                                    <button class="btn btn-primary btn-block resumen_fecha"><span class="fa fa-clock-o"></span> Fecha</button>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body list-group">
                    ';

    foreach ($productos as $producto) {
        if ($producto["nombreMenu"] == "Pizzas") {
            $htmlPedido .= '
                            <div class="list-group-item">
                                <b><a href="#">1</a>  ' . $producto["nombreProducto"] . ' - ' . $producto["nombreSubmenu"] . '</b> ' . $producto["descripcionPedidoproducto"] . '.<br>
                                
                        ';
        } elseif ($producto["nombreMenu"] == "Ensaladas y Bocaditos" || $producto["nombreMenu"] == "Pastas" || $producto["nombreMenu"] == "Carnes" || $producto["nombreMenu"] == "Crepes y Postres") {

            $htmlPedido .= '
                            <div class="list-group-item">
                                <b><a href="#">1</a>  ' . $producto["nombreProducto"] . '</b> ' . $producto["nombreMenu"] . '.<br>
                                    ';
        } elseif ($producto["nombreMenu"] == "Bebidas") {
            $htmlPedido .= '
                            <div class="list-group-item">
                                <b><a href="#">1</a>  ' . $producto["nombreProducto"] . '</b> ' . $producto["nombreMenu"] . '.<br>
                                    ';
        }

        $htmlPedido .= '<span class="text-muted">' . $producto["precioProducto"] . ' $$</span>
                            </div>
                ';
    }

    $htmlPedido .= '
                        </div>
                    </div>
                </div><div class="col-md-4">
                    <ul class="list-group border-bottom">
                        <li class="list-group-item">SUB TOTAL <span class="badge resumen_subtotal"></span></li>
                        <li class="list-group-item">DESCUENTO <span class="badge badge-danger resumen_descuento"></span></li>
                        <li class="list-group-item">IVA 12(%) <span class="badge badge-info resumen_iva"></span></li>
                        <li class="list-group-item">PAGADO CON <span class="badge badge-success resumen_forma_pago"></span></li>
                        <li class="list-group-item">TOTAL AL PAGAR <span class="badge badge-success resumen_totalapagar"></span></li>
                        <li class="list-group-item">VUELTO A ENTREGAR<span class="badge badge-warning resumen_vuelto"></span></li>
                    </ul>     
                <button type="button" class="btn btn-primary btn-lg" style="margin-top: 16px;" id="facturarpedido_btn"><i class="fa fa-file-text" aria-hidden="true"></i> FACTURAR PEDIDO</button>
                </div>';

    echo $htmlPedido;
}
?>