<?php

require ("../conn.php");

if($_POST["idpedido"]){

    $idpedido = $_POST["idpedido"];

    $query="SELECT * FROM pedidoproducto pp join producto p on(p.idProducto = pp.idProducto) join submenu sm on(p.idSubMenu = sm.idSubMenu) join menu m on (sm.idMenu = m.idMenu) WHERE pp.idPedido= '$idpedido'";
    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $productos = array();

    for($i=0;$i< $rows;$i++){
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
        if($producto["nombreMenu"] == "Pizzas"){
            $htmlPedido .='
                            <div class="list-group-item">
                                <b><a href="#">1</a>  '.$producto["nombreProducto"].' - '.$producto["nombreSubmenu"].'</b> '.$producto["descripcionPedidoproducto"].'.<br>
                                
                        ';
        }
        elseif($producto["nombreMenu"] == "Ensaladas y Bocaditos" || $producto["nombreMenu"] == "Pastas" || $producto["nombreMenu"] == "Carnes" || $producto["nombreMenu"] == "Crepes y Postres"){

            $htmlPedido .='
                            <div class="list-group-item">
                                <b><a href="#">1</a>  '.$producto["nombreProducto"].'</b> '.$producto["nombreMenu"].'.<br>
                                    ';
        }elseif($producto["nombreMenu"] == "Bebidas"){
            $htmlPedido .='
                            <div class="list-group-item">
                                <b><a href="#">1</a>  '.$producto["nombreProducto"].'</b> '.$producto["nombreMenu"].'.<br>
                                    ';
        }

        $htmlPedido .=     '<span class="text-muted">'.$producto["precioProducto"].' $$</span>
                            </div>
                ';

    }
    
    $htmlPedido .=     '
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