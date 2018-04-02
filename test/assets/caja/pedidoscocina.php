<?php

require ("../conn.php");

$query="SELECT * from pedido p JOIN mesa m on(p.idMesa = m.idMesa) 
    WHERE (estadoPedido != 'ENTREGADO') 
    AND estadopagoPedido = 'SIN PAGAR'";

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

    foreach($pedidos as $p){
        $htmlPedidosCocina .= '<div class="task-item task-info task-complete Pedido">                                    
                        <div class="task-text ui-sortable-handle"><h2>Mesa '.$p["numeroMesa"].'</h2></div>
                        <div class="task-footer">
                            <div class="pull-left" style="color:#65728c;"><i class="fa fa-list-alt" aria-hidden="true"></i> Pedido # '.$p["idPedido"].'</div>     
                        </div>            
                        <div style="display:none;" class="idmesa">'.$p["idMesa"].'</div>
                        <div style="display:none;" class="numeromesa">'.$p["numeroMesa"].'</div>
                        <div style="display:none;" class="idpedido">'.$p["idPedido"].'</div>                        
                    </div>';
                    
    }
    echo $htmlPedidosCocina;
}

