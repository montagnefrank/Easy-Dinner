<?php

require ("../conn.php");

$query="SELECT * FROM pedidoproducto pp "
        . "join pedido pe on(pe.idPedido = pp.idPedido) "
        . "join producto p on(p.idProducto = pp.idProducto) "
        . "join submenu sm on(p.idSubMenu = sm.idSubMenu) "
        . "join menu m on (sm.idMenu = m.idMenu) "
        . "where m.nombreMenu != 'Bebidas' "
        . "ORDER BY pp.idPedido ASC limit 9";

$result = $conn->query($query);
if(!$result) die($conn->error);

$rows = $result->num_rows;
$productos = array();

for($i=0;$i< $rows;$i++){
    $result->data_seek($i);
    $productos[] = $result->fetch_array(MYSQLI_ASSOC);
}

$htmlPedido = '<div class="row"><div class="form-group"><div class="searchable-container">';
$contador = 1;

foreach ($productos as $producto) {
    $contador == 1 ? $htmlPedido .= '<div class="row row-eq-height">' : null ;
    $contador == 4 ? $htmlPedido .= '</div><div class="row row-eq-height">' : null ;
    $contador == 7 ? $htmlPedido .= '</div><div class="row row-eq-height">' : null ;

    $background = "";
    $color = "";

    if($producto["estadoPedidoproducto"] == "SOLICITADO"){
        $background = '#3fbae4';
        $color = 'white';
    }
    else
        if($producto["estadoPedidoproducto"] == "EN PROCESO"){
            $background = '#fea223';
            $color = '#656C78';
        }
    else
        if($producto["estadoPedidoproducto"] == "LISTO PARA ENTREGAR"){
            $background = '#95b75d';
            $color = 'white';
        }
    else
        if($producto["estadoPedidoproducto"] == "ENTREGADO"){
            $background = 'white';
            $color = '#656C78';
        }



    $htmlPedido .=  
        '<div class="items col-xs-12 col-sm-6 col-md-4 col-lg-4" style="padding-top:10px;">'.
        '<div class="info-block block-info clearfix" style="height: 100%;">'.
        '<div data-toggle="buttons" class="btn-group bizmoduleselect" style="height: 100%;">'.
        '<label class="btn-default item'.$contador.'" style="border:1px solid darkgray;height: 100%;border: 1px solid darkgray;height: 100%;padding: 5px;border-radius: 5px;color:'.$color.';background:'.$background.';">'.
        '<div class="bizcontent" style="height: 100%;">'.
        '<input type="checkbox" id="chk_pedido" name="chk_pedido" autocomplete="off" value="1">';


    //ITERACION EN PIZZAS
    if($producto["nombreMenu"] == "Pizzas"){
        $htmlPedido .="<center><p style='font-size: 20px;'>Pizza " .$producto["nombreSubmenu"]." / ".$producto["nombreProducto"]."</p></center>".
            "<div class=\"list-group-controls estado_producto\" style='position: absolute;top: 15px;right: 5px;'>".
            '<div style="display:none;" class="idpedidoproducto">'.$producto["idPedidoproducto"].'</div>'.
            '<div style="display:none;" class="idpedido">'.$producto["idPedido"].'</div>'.
            "</div>";

        $idPedidoProducto = $producto["idPedidoproducto"];
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
            $htmlPedido .= '<div style="padding: 5px;">';
            foreach ($ingredientesProducto as $ingrediente) {
                if($ingrediente["opPedprod_ing"]=="agrega"){
                    $htmlPedido .= 
                        '<div class="btn btn-primary" style="margin: 1px;border-color: #f5f5f5;font-size: 20px;"> + '.
                        $ingrediente["nombreIngrediente"].
                        '</div>';
                }elseif($ingrediente["opPedprod_ing"]=="quita"){
                    $htmlPedido .= 
                        '<div class="btn btn-primary" style="margin: 1px;border-color: #f5f5f5;font-size: 20px;"> - '.
                        $ingrediente["nombreIngrediente"].
                        '</div>';
                }
            }
            $htmlPedido .= '</div>';

        }else{
            $htmlPedido .= '<center>Sin ingredientes personalizados</center>';
        }


        if($producto["descripcionPedidoproducto"] == "Combinada 1/2" || $producto["descripcionPedidoproducto"] == "Combinada 1/4" || $producto["descripcionPedidoproducto"] == "Personalizada"){
            $htmlPedido .= "<center><p style='font-size: 20px;'><b>".$producto["descripcionPedidoproducto"]."</b></p></center>";

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

                $htmlPedido .= "<center><p style='font-size: 20px;'><b>".$productocombinado["nombreSubmenu"]."</b></p></center>";

                //$htmlPedido .= '<tr><td>'.$productocombinado["nombreSubmenu"].'</td>';

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


                $htmlPedido .= '<div style="padding: 5px;">';
                foreach ($ingredientesProductoCombinado as $ingrediente) {
                    if($ingrediente["opPedprodcomb_ing"]=="agrega"){
                        $htmlPedido .= 
                            '<div class="btn btn-primary" style="margin: 1px;border-color: #f5f5f5;font-size: 20px;"> + '.
                            $ingrediente["nombreIngrediente"].
                            '</div>';
                    }elseif($ingrediente["opPedprodcomb_ing"]=="quita"){
                        $htmlPedido .= 
                            '<div class="btn btn-primary" style="margin: 1px;border-color: #f5f5f5;font-size: 20px;"> - '.
                            $ingrediente["nombreIngrediente"].
                            '</div>';
                    }

                }
                $htmlPedido .= '</div>';

                '<td>'.$productocombinado["nombreProducto"].'</td></tr>';
            }


        }
        //$htmlPedido .= '</tbody>'.'</table></div>';



    }elseif($producto["nombreMenu"] == "Ensaladas y Bocaditos" || $producto["nombreMenu"] == "Pastas" || $producto["nombreMenu"] == "Carnes" || $producto["nombreMenu"] == "Crepes y Postres"){

        $htmlPedido .= "<center><p style='font-size: 20px;'>" .$producto["nombreSubmenu"]." / ".$producto["nombreProducto"]."</p></center>".
            "<div class=\"list-group-controls estado_producto\" style='position: absolute;top: 15px;right: 5px;'>".
            '<div style="display:none;" class="idpedidoproducto">'.$producto["idPedidoproducto"].'</div>'.
            '<div style="display:none;" class="idpedido">'.$producto["idPedido"].'</div>'.
            "</div>";

        $idPedidoProducto = $producto["idPedidoproducto"];


        //ASIGNAMIENTO A TABLA DEL PEDIDO PRODUCTO Y DEL PEDIDO PRODUCTO COMBINADO

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
            $htmlPedido .= '<div style="padding: 5px;">';
            foreach ($ingredientesProducto as $ingrediente) {
                if($ingrediente["opPedprod_ing"]=="agrega"){
                    $htmlPedido .= 
                        '<div class="btn btn-primary" style="margin: 1px;border-color: #f5f5f5;font-size: 20px;"> + '.
                        $ingrediente["nombreIngrediente"].
                        '</div>';
                }elseif($ingrediente["opPedprod_ing"]=="quita"){
                    $htmlPedido .= 
                        '<div class="btn btn-primary" style="margin: 1px;border-color: #f5f5f5;font-size: 20px;"> - '.
                        $ingrediente["nombreIngrediente"].
                        '</div>';
                }
            }
            $htmlPedido .= '</div>';
        }else{
            $htmlPedido .= '<div><center>Sin ingredientes personalizados</center></div>';
        }
    }
//        elseif($producto["nombreMenu"] == "Bebidas"){
//    
//            $htmlPedido .= "<center><p style='font-size: 20px;'>" .$producto["nombreSubmenu"]." / ".$producto["nombreProducto"]."</p></center>".
//                "<div class=\"list-group-controls estado_producto\" style='position: absolute;top: 15px;right: 5px;'>".
//                '<div style="display:none;" class="idpedidoproducto">'.$producto["idPedidoproducto"].'</div>'.
//                '<div style="display:none;" class="idpedido">'.$producto["idPedido"].'</div>'.
//                "</div>";
//        }

    $htmlPedido .= '</div>'.
        '</label>'.
        '</div>'.
        '</div>'.
        '</div>';
    $contador == 9 ? $htmlPedido .= '</div></div>' : null ;
    $contador++;

}

$htmlPedido .= '</div></div></div>';



echo $htmlPedido;
