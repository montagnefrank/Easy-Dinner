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

    $htmlPedido = '<tr>
                    <th>Descripción de Producto</th>
                    <th class="text-center">Precio Unitario</th>
                    <th class="text-center">Cantidad</th>
                    <th class="text-center">Total</th>
                  </tr>';

    foreach ($productos as $producto) {
        if($producto["nombreMenu"] == "Pizzas"){
            $htmlPedido .='<tr>
                                <td>
                                    <strong>'.$producto["nombreProducto"].' '.$producto["nombreSubmenu"].'</strong>
                                    <p>'.$producto["descripcionPedidoproducto"].'</p>';
        }
        elseif($producto["nombreMenu"] == "Ensaladas y Bocaditos" || $producto["nombreMenu"] == "Pastas" || $producto["nombreMenu"] == "Carnes" || $producto["nombreMenu"] == "Crepes y Postres"){

            $htmlPedido .='<tr>
                                <td>
                                    <strong>'.$producto["nombreProducto"].'</strong>
                                    <p>'.$producto["nombreMenu"].'</p>';
        }elseif($producto["nombreMenu"] == "Bebidas"){
            $htmlPedido .='<tr>
                                <td style="cursor:pointer;">
                                    <strong>'.$producto["nombreProducto"].'</strong>
                                    <p>'.$producto["nombreMenu"].'</p>';
        }

        $htmlPedido .=     '</td>
                                <td class="text-center">$'.$producto["precioProducto"].'</td>
                                <td class="text-center">'.$producto["cantidadPedidoproducto"].'</td>
                                <td class="text-center">$ <span class="totalProducto">'.number_format(($producto["precioProducto"]*$producto["cantidadPedidoproducto"]), 2, '.', '').'</span></td>
                           </tr>';

    }

    echo $htmlPedido;
}