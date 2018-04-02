<?php

/////////////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
error_reporting(E_ALL);
ini_set('display_errors', 1);

require ("../conn.php");

if (isset($_POST['cocina']) && $_POST['cocina'] == "true") {


    session_start();
    $idestablecimiento = $_SESSION['usuario']['idEstablecimiento'];

    $query = "SELECT * from pedido p JOIN mesa m on(p.idMesa = m.idMesa) 
    WHERE estadoPedido != 'ENTREGADO' AND estadoPedido != 'DOMICILIO'
    AND estadopagoPedido = 'SIN PAGAR' AND m.idEstablecimiento = '$idestablecimiento'";

    $result = $conn->query($query);
    if (!$result)
        die($conn->error);
    $rows = $result->num_rows;
    $pedidos = array();

    for ($i = 0; $i < $rows; $i++) {
        $result->data_seek($i);
        $pedidos[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    if ($rows != 0) {

        $htmlPedidosCocina = array();
        $htmlPedidosCocina['pedidos'] = '';

        foreach ($pedidos as $p) {
            $htmlPedidosCocina['pedidos'] .= '<div class="task-item task-info task-complete Pedido">                                    
                        <div class="task-text ui-sortable-handle"><h2>Mesa ' . $p["numeroMesa"] . '</h2></div>
                        <div class="task-footer">
                            <div class="pull-left" style="color:#65728c;"><i class="fa fa-list-alt" aria-hidden="true"></i> Pedido # ' . $p["idPedido"] . '</div>     
                            <div class="pull-right btn btn-info pedido_imprimir" style="color:white;"><i class="fa fa-print" aria-hidden="true"></i> Imprimir</div>     
                        </div>            
                        <div style="display:none;" class="idmesa">' . $p["idMesa"] . '</div>
                        <div style="display:none;" class="numeromesa">' . $p["numeroMesa"] . '</div>
                        <div style="display:none;" class="idpedido">' . $p["idPedido"] . '</div>                        
                    </div>';
        }
        echo json_encode($htmlPedidosCocina);
    }
}
if (isset($_POST['cocina']) && $_POST['cocina'] == "print") {

    $output = array();
    $output['pedidos'] = '';
    $pedidoanterior = '';
    $query = "SELECT su.nombreSubmenu menu, pro.nombreProducto nombre, ppi.idPedidoproducto idpedido, ppi.opPedprod_ing ing, ing.nombreIngrediente nombreing, pp.observacionPedidoproducto obs  FROM pedido p 
                JOIN mesa m on(p.idMesa = m.idMesa) 
                JOIN pedidoproducto pp on(p.idPedido = pp.idPedido) 
                JOIN producto pro on(pro.idProducto = pp.idProducto)
                JOIN submenu su on(pro.idSubmenu = su.idSubmenu)
                LEFT JOIN pedprod_ing ppi ON (ppi.idPedidoproducto = pp.idPedidoproducto)
                LEFT JOIN ingrediente ing ON (ing.idIngrediente = ppi.idIngrediente)
                WHERE p.idPedido = '" . $_POST['pedido'] . "'";
    $result = $conn->query($query);
    if (!$result)
        die($conn->error);
    $iii = 0;
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($row['idpedido'] == "") {
            $output['pedidos'] .= "<tr><td> --------------------- <br /></td></tr> \n ";
            $output['pedidos'] .= "<tr><td> " . $row['menu'] . " - " . $row['nombre'] . " <br /></td></tr> \n ";
            $output['pedidos'] .= "<tr><td> Observacion: " . $row['obs'] . " <br /></td></tr> \n ";
            $iii = 0;
        } else {
            if ($row['ing'] == "agrega") {
                $ing = "+";
            } else {
                $ing = "-";
            }
            if ($pedidoanterior != $row['idpedido']) {
                $output['pedidos'] .= "<tr><td> --------------------- <br /></td></tr> \n ";
                $output['pedidos'] .= "<tr><td> Observacion: " . $row['obs'] . " <br /></td></tr> \n ";
                $output['pedidos'] .= "<tr><td> " . $row['menu'] . " - " . $row['nombre'] . " <br /></td></tr> \n ";
                $output['pedidos'] .= "<tr><td> " . $ing . "1 " . $row['nombreing'] . " <br /></td></tr> \n ";
                $iii = 1;
            } else {
                $output['pedidos'] .= "<tr><td> " . $ing . "1 " . $row['nombreing'] . " <br /></td></tr> \n ";
                $iii = 1;
            }
            $pedidoanterior = $row['idpedido'];
        }
    }
    echo json_encode($output);
}