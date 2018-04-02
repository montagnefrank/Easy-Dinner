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

    $htmlPedido =  '<div class="row">'.
        '<div class="form-group">'.
        '<div class="searchable-container">';


    foreach ($productos as $producto) {

        $htmlPedido .=  
            '<div class="items col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-top:10px;">'.
            '<div class="info-block block-info clearfix">'.
            '<div data-toggle="buttons" class="btn-group bizmoduleselect">'.
            '<label class="btn btn-default" style="border:1px solid darkgray;">'.
            '<div class="bizcontent">'.
            '<input type="checkbox" id="chk_pedido" name="chk_pedido" autocomplete="off" value="1">'.
            '<span class="glyphicon glyphicon-ok glyphicon-lg" style="position: absolute;top: 5px;right: 5px;"></span>';

        if($producto["nombreMenu"] == "Pizzas"){
            $htmlPedido .="<div class=\"list-group-status status-online\"></div>".
                "<span class=\"contacts-title\" style='display: flex;'>Pizza " .$producto["nombreSubmenu"]."</span>".
                "<p style='text-align: left;'>".$producto["nombreProducto"]."</p>";

            $htmlPedido .=
                "<div style='position:absolute;bottom: 0px;left: 15px;' class='estado_producto'>".
                '<p>PRODUCTO '.$producto["estadoPedidoproducto"]."</p>".

                '<div style="display:none;" class="idpedidoproducto">'.$producto["idPedidoproducto"].'</div>'.
                '<div style="display:none;" class="idpedido">'.$producto["idPedido"].'</div>'.
                "</div>";

            //ASIGNAMIENTO A TABLA DEL PEDIDO PRODUCTO Y DEL PEDIDO PRODUCTO COMBINADO
            $htmlPedido .=
                '<table class="table table-bordered">'.
                '<thead>'.
                '<tr>'.
                '<th>Pizza</th>'.
                '<th>Ingredientes</th>'.
                '</tr>'.
                '</thead>'.
                '<tbody>';


            $idPedidoProducto = $producto["idPedidoproducto"];
            $htmlPedido .= '<tr><td>'.$producto["nombreSubmenu"].'</td>';
            $q = "SELECT * FROM pedprod_ing ppi join ingrediente i on(ppi.idIngrediente = i.idIngrediente) WHERE ppi.idPedidoproducto = '$idPedidoProducto'";

            $result = $conn->query($q);
            if(!$result) die($conn->error);

            $rows = $result->num_rows;
            $ingredientesProducto = array();

            for($i=0;$i< $rows;$i++){
                $result->data_seek($i);
                $ingredientesProducto[] = $result->fetch_array(MYSQLI_ASSOC);
            }

            if($rows != 0){
                $htmlPedido .=
                    '<td>'.
                    '<ul>';

                foreach ($ingredientesProducto as $ingrediente) {
                    $htmlPedido .= '<li>'.$ingrediente["nombreIngrediente"].'</li>';
                }
                $htmlPedido .= '</ul>'.
                    '</td>';
            }else{
                $htmlPedido .= '<td><center>Sin ingredientes personalizados</center></td>';
            }


            if($producto["descripcionPedidoproducto"] == "Combinada 1/2" || $producto["descripcionPedidoproducto"] == "Combinada 1/4" || $producto["descripcionPedidoproducto"] == "Personalizada"){
                $htmlPedido .= "<center><p><b>".$producto["descripcionPedidoproducto"]."</b></p></center>";

                //PARA CONSULTAR LOS PEDIDOS PRODUCTOS COMBINADOS DE LA PIZZA
                $q = "SELECT * FROM pedidoproductocombinado ppc join producto p on(p.idProducto = ppc.idProducto) join submenu sm on(p.idSubMenu = sm.idSubMenu) join menu m on (sm.idMenu = m.idMenu) WHERE ppc.idPedidoproducto = '$idPedidoProducto'";
                $result = $conn->query($q);
                if(!$result) die($conn->error);

                $rows = $result->num_rows;
                $productosCombinados = array();

                for($i=0;$i< $rows;$i++){
                    $result->data_seek($i);
                    $productosCombinados[] = $result->fetch_array(MYSQLI_ASSOC);
                }

                foreach ($productosCombinados as $productocombinado) {

                    $htmlPedido .= '<tr><td>'.$productocombinado["nombreSubmenu"].'</td>';


                    $idPedidoproductocombinado = $productocombinado["idPedidoproductocombinado"];


                    $q = "SELECT * FROM pedprodcomb_ing ppci join ingrediente i on(ppci.idIngrediente = i.idIngrediente) WHERE ppci.idPedidoproductocombinado = '$idPedidoproductocombinado'";

                    $result = $conn->query($q);
                    if(!$result) die($conn->error);

                    $rows = $result->num_rows;
                    $ingredientesProductoCombinado = array();

                    for($i=0;$i< $rows;$i++){
                        $result->data_seek($i);
                        $ingredientesProductoCombinado[] = $result->fetch_array(MYSQLI_ASSOC);
                    }

                    $htmlPedido .='<td><ul>';

                    foreach ($ingredientesProductoCombinado as $ingrediente) {
                        $htmlPedido .= '<li>'.$ingrediente["nombreIngrediente"].'</li>';
                    }
                    $htmlPedido .= '</ul></td>';
                    '<td>'.$productocombinado["nombreProducto"].'</td></tr>';
                }


            }
        }elseif($producto["nombreMenu"] == "Ensaladas y Bocaditos" || $producto["nombreMenu"] == "Pastas" || $producto["nombreMenu"] == "Carnes" || $producto["nombreMenu"] == "Crepes y Postres"){

            $htmlPedido .= "<div class=\"list-group-status status-online\"></div>".
                "<span class=\"contacts-title\" style='display: flex;'>" .$producto["nombreProducto"]."</span>".
                "<p style='text-align: left;'>".$producto["nombreSubmenu"]."</p>";

            $htmlPedido .=
                "<div style='position:absolute;bottom: 0px;left: 15px;' class='estado_producto'>".
                '<p>PRODUCTO '.$producto["estadoPedidoproducto"]."</p>".

                '<div style="display:none;" class="idpedidoproducto">'.$producto["idPedidoproducto"].'</div>'.
                '<div style="display:none;" class="idpedido">'.$producto["idPedido"].'</div>'.
                "</div>";

            $idPedidoProducto = $producto["idPedidoproducto"];


            //ASIGNAMIENTO A TABLA DEL PEDIDO PRODUCTO Y DEL PEDIDO PRODUCTO COMBINADO
            $htmlPedido .=
                '<table class="table table-bordered">'.
                '<thead>'.
                '<tr>'.
                '<th>Pizza</th>'.
                '<th>Ingredientes</th>'.
                '</tr>'.
                '</thead>'.
                '<tbody>';

            $htmlPedido .= '<tr><td>'.$producto["nombreSubmenu"].'</td>';
            $q = "SELECT * FROM pedprod_ing ppi join ingrediente i on(ppi.idIngrediente = i.idIngrediente) WHERE ppi.idPedidoproducto = '$idPedidoProducto'";

            $result = $conn->query($q);
            if(!$result) die($conn->error);

            $rows = $result->num_rows;
            $ingredientesProducto = array();

            for($i=0;$i< $rows;$i++){
                $result->data_seek($i);
                $ingredientesProducto[] = $result->fetch_array(MYSQLI_ASSOC);
            }

            if($rows != 0){
                $htmlPedido .=
                    '<td>'.
                    '<ul>';

                foreach ($ingredientesProducto as $ingrediente) {
                    $htmlPedido .= '<li>'.$ingrediente["nombreIngrediente"].'</li>';
                }
                $htmlPedido .= '</ul>'.
                    '</td>';
            }else{
                $htmlPedido .= '<td><center>Sin ingredientes personalizados</center></td>';
            }
        }elseif($producto["nombreMenu"] == "Bebidas"){

            $htmlPedido .= "<div class=\"list-group-status status-online\"></div>".
                "<span class=\"contacts-title\"  style='display: flex;'>" .$producto["nombreProducto"]."</span>".
                "<p style='text-align: left;'>".$producto["nombreSubmenu"]."</p>";
            $htmlPedido .=
                "<div style='position:absolute;bottom: 0px;left: 15px;' class='estado_producto'>".
                '<p>PRODUCTO '.$producto["estadoPedidoproducto"]."</p>".

                '<div style="display:none;" class="idpedidoproducto">'.$producto["idPedidoproducto"].'</div>'.
                '<div style="display:none;" class="idpedido">'.$producto["idPedido"].'</div>'.
                "</div>";
        }

        $htmlPedido .= '</tbody>'.'</table>';


        $htmlPedido .= "<div class=\"list-group-controls\">".
            "<button class=\"btn btn-info\">$" .$producto["precioProducto"]. "</button>&nbsp;&nbsp;".
            "</div>".
            '</div>'.
            '</label>'.
            '</div>'.
            '</div>'.
            '</div>';


    }

    $htmlPedido .= '</div>'.
        '</div>'.
        '</div>';



    echo $htmlPedido;

}