<?php

require ("../conn.php");

$query="SELECT * from pedido p JOIN mesa m on(p.idMesa = m.idMesa) JOIN factura fa on(p.idPedido = fa.idPedido) 
    WHERE estadopagoPedido = 'PAGADO' ORDER BY p.idPedido DESC LIMIT 5";

$result = $conn->query($query);

if(!$result) die($conn->error);

$rows = $result->num_rows;
$pedidos = array();

for($i=0;$i< $rows;$i++){
    $result->data_seek($i);
    $pedidos[] = $result->fetch_array(MYSQLI_ASSOC);
}

if($rows!=0){

    $htmlPedidosCocina = '';
    $i = 0;
    foreach($pedidos as $p){
        if ($p["statusFactura"] == "ACTIVE"){
            $badge = "success";
        } else {
            $badge = "danger";
        }
        $htmlPedidosCocina .= 
                    '<div class="task-item task-success task-complete" style="cursor:default">                                    
                        <div class="task-text ui-sortable-handle"><h2>Mesa '.$p["numeroMesa"].'</h2><a href="?panel=caja.php&verfactura='.$p["idFactura"].'"><span class="badge badge-'.$badge.' verfactura_formadepago">Ver Factura # '.$p["idFactura"].'</span></a></div>
                        <div class="task-footer">
                            <div class="pull-left" style="color:#65728c;"><i class="fa fa-list-alt" aria-hidden="true"></i> Pedido # '.$p["idPedido"].'</div>
                            <div class="pull-right" style="color:#65728c;"><i class="fa fa-check-circle" aria-hidden="true"></i></div> 
                        </div> 
                        <div style="display:none;" class="idmesa">'.$p["idMesa"].'</div>
                        <div style="display:none;" class="numeromesa">'.$p["numeroMesa"].'</div>
                        <div style="display:none;" class="idpedido">'.$p["idPedido"].'</div>
                        <div style="display:none;" class="idpedido">'.$p["idFactura"].'</div>
                    </div>';
    }
    echo $htmlPedidosCocina;
}

