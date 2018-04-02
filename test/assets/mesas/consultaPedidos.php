<?php

require ("../conn.php");


$query="SELECT * FROM pedido pe join mesa m on(m.idMesa=pe.idMesa) 
                        INNER join pedidoproducto pp ON(pe.idPedido = pp.idPedido) 
                        INNER join producto p on(p.idProducto = pp.idProducto) 
                        INNER join submenu sm on(p.idSubMenu = sm.idSubMenu) 
                        INNER join menu me on (sm.idMenu = me.idMenu) 
                        GROUP BY(pe.idPedido)
                        HAVING m.estadoMesa = 'OCUPADA' AND pe.estadopagoPedido != 'PAGADO'
                        ORDER BY pe.idPedido ASC";

$result = $conn->query($query);
if(!$result) die($conn->error);

$rows = $result->num_rows;
$pedidos = array();

for($i=0;$i< $rows;$i++){
    $result->data_seek($i);
    $pedidos[] = $result->fetch_array(MYSQLI_ASSOC);
}

echo json_encode($pedidos);