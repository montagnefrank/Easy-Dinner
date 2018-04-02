<?php

require ("../conn.php");

//RECOPILACION DE PEDIDOS PARA COCINA
//ANALISIS CONCRETO PARA PEDIDOS QUE TIENEN O NO BEBIDAS
//OBTENCION DE TODOS LOS PEDIDOS SOLICITADOS

session_start();

$idestablecimiento = $_SESSION['usuario']['idEstablecimiento'];
$query="SELECT p.idPedido FROM pedido p join mesa m on(p.idMesa = m.idMesa) WHERE idEstablecimiento = '$idestablecimiento' ORDER BY idPedido ASC";

$result = $conn->query($query);
if(!$result) die($conn->error);

$rows = $result->num_rows;
$pedidos = array();

for($i=0;$i< $rows;$i++){
    $result->data_seek($i);
    $pedidos[] = $result->fetch_array(MYSQLI_ASSOC);
}

$arraypedidos = [];

foreach($pedidos as $p){
    $idpedido = $p["idPedido"];
    //VERIFICACION DEL MENU CORRESPONDIENTE
    $query="SELECT me.nombreMenu FROM pedidoproducto pp JOIN producto p on(p.idProducto = pp.idProducto) join submenu sm on(p.idSubMenu = sm.idSubMenu) join menu me on (sm.idMenu = me.idMenu) WHERE idPedido = '$idpedido';";

    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $menu = array();

    for($i=0;$i< $rows;$i++){
        $result->data_seek($i);
        $menu[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    $contador = 0;
    if($rows>0){
        foreach($menu as $m){
            if($m["nombreMenu"] != "Bebidas"){
                $contador++;
            }
        }

        if($contador != 0){
            //PASA LA PRUEBA
            $query="SELECT me.nombreMenu, pp.estadoPedidoproducto FROM pedido pe join pedidoproducto pp on(pe.idPedido = pp.idPedido)
                        JOIN mesa m on(m.idMesa=pe.idMesa) 
                        JOIN producto p on(p.idProducto = pp.idProducto) 
                        JOIN submenu sm on(p.idSubMenu = sm.idSubMenu) 
                        JOIN menu me on (sm.idMenu = me.idMenu)
                        where (m.estadoMesa ='OCUPADA' OR m.estadoMesa ='PARA LLEVAR' OR m.estadoMesa ='DOMICILIO') AND pe.idPedido = '$idpedido'";

            $result = $conn->query($query);
            if(!$result) die($conn->error);

            $rows = $result->num_rows;
            $pedidoproducto = array();

            for($i=0;$i< $rows;$i++){
                $result->data_seek($i);
                $pedidoproducto[] = $result->fetch_array(MYSQLI_ASSOC);
            }

            $contPedidoproducto = 0;
            foreach($pedidoproducto as $pp){
                if(($pp["estadoPedidoproducto"] != "ENTREGADO") && ($pp["nombreMenu"] != "Bebidas")){
                    $contPedidoproducto++;
                }
            }

            if($contPedidoproducto != 0){
                $query="SELECT * FROM pedido pe join mesa m on(m.idMesa=pe.idMesa) where (m.estadoMesa ='OCUPADA' OR m.estadoMesa ='PARA LLEVAR' OR m.estadoMesa ='DOMICILIO') AND pe.idPedido = '$idpedido'";

                $result = $conn->query($query);
                if(!$result) die($conn->error);

                $rows = $result->num_rows;

                if($rows == 1){
                    $result->data_seek(0);
                    $pedido = $result->fetch_array(MYSQLI_ASSOC);
                    array_push($arraypedidos,$pedido);
                }
            }

        }
    }
}

if(count($arraypedidos)>9){
    $longitud = count($arraypedidos);
    for($i=$longitud;$i>8;$i--){
        array_splice($arraypedidos,$i);
    }
}

echo json_encode($arraypedidos);