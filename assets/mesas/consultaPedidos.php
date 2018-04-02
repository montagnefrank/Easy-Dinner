<?php

require ("../conn.php");


session_start();
$idEstablecimiento = $_SESSION['usuario']['idEstablecimiento'];

$query="SELECT * FROM pedido pe "
        . "INNER JOIN mesa m on(m.idMesa=pe.idMesa) "
        . "INNER JOIN pedidoproducto pp ON(pe.idPedido = pp.idPedido) "
        . "INNER JOIN producto p on(p.idProducto = pp.idProducto) "
        . "INNER JOIN submenu sm on(p.idSubMenu = sm.idSubMenu) "
        . "INNER JOIN menu me on (sm.idMenu = me.idMenu) "
        . "GROUP BY(pe.idPedido) "
        . "HAVING m.estadoMesa = 'OCUPADA' AND pe.estadopagoPedido != 'PAGADO' AND m.idEstablecimiento = '$idEstablecimiento' "
        . "ORDER BY pe.idPedido ASC";

$result = $conn->query($query);
if(!$result) die($conn->error);

$rows = $result->num_rows;
$pedidos = array();

for($i=0;$i< $rows;$i++){
    $result->data_seek($i);
    $pedidos[] = $result->fetch_array(MYSQLI_ASSOC);
}

//    $pedidos[] = var_dump($_SESSION);
//    $pedidos[] = $query;

echo json_encode($pedidos);