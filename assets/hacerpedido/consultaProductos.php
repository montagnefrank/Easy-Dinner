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

    $htmlPedido = "";

    foreach ($productos as $producto) {

        $estado = "";
        $icon = "";
        if($producto["estadoPedidoproducto"]=="SOLICITADO"){
            $estado = "info";
            $icon = '<i class="fa fa-asterisk fa-2x" style="font-size:25px;color:white;" aria-hidden="true"></i>';
        }elseif($producto["estadoPedidoproducto"]=="EN PROCESO"){
            $estado = "warning";
            $icon = '<i class="fa fa-refresh fa-spin fa-2x fa-fw" style="font-size:25px;color:white;"></i>';
        }elseif($producto["estadoPedidoproducto"]=="LISTO PARA ENTREGAR"){
            $estado = "success";
            $icon = '<i class="fa fa-check" style="font-size:25px;color:white;" aria-hidden="true"></i>';
        }elseif($producto["estadoPedidoproducto"]=="ENTREGADO"){
            $estado = "default";
            $icon = '<i class="fa fa-thumbs-o-up" aria-hidden="true" style="font-size:25px;color:black;"></i>';
        }




        if($producto["nombreMenu"] == "Pizzas"){
            $htmlPedido .= '<div class="list-group-item btn-'.$estado.'" style="font-weight:bold;border: 2px solid #7a7a7a; color:#434a54;">'.
                "<p style='font-size:25px;'>" .$producto["nombreProducto"]."</p>".
                "<p style='font-size:15px;font-weight:bold;'>".$producto["descripcionPedidoproducto"]."</p>".
                "<p style='position:absolute;top:12px;right:10px;'>".$icon."</p>";

            //ASIGNAMIENTO A TABLA DEL PEDIDO PRODUCTO Y DEL PEDIDO PRODUCTO COMBINADO
            $htmlPedido .=
                '<table class="table table-bordered">'.
                '<thead>'.
                '<tr>'.
                '<th style="background: rgba(255, 255, 255,0.4);color: black;">Pizza</th>'.
                '<th style="background: rgba(255, 255, 255,0.4);color: black;">Ingredientes</th>'.
                '</tr>'.
                '</thead>'.
                '<tbody>';


            $idPedidoProducto = $producto["idPedidoproducto"];
            $htmlPedido .= '<tr><td style="background: rgba(255, 255, 255,0.2);color: black;">'.$producto["nombreSubmenu"].'</td>';
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
                    '<td style="background: rgba(255, 255, 255,0.2);color: black;">'.
                    '<ul style="list-style-type: none;">';

                foreach ($ingredientesProducto as $ingrediente) {
                    if($ingrediente["opPedprod_ing"] == "agrega"){
                        $htmlPedido .= '<li> (+) '.$ingrediente["nombreIngrediente"].'</li>'; 
                    }else
                        if($ingrediente["opPedprod_ing"] == "quita"){
                            $htmlPedido .= '<li> (-) '.$ingrediente["nombreIngrediente"].'</li>';
                        }
                }
                $htmlPedido .= '</ul>'.
                    '</td>';
            }else{
                $htmlPedido .= '<td style="background: rgba(255, 255, 255,0.2);color: black;"><center>Sin ingredientes personalizados</center></td>';
            }


            if($producto["descripcionPedidoproducto"] == "Combinada 1/2" || $producto["descripcionPedidoproducto"] == "Combinada 1/4" || $producto["descripcionPedidoproducto"] == "Personalizada"){

                $detalle = "";

                if($producto["descripcionPedidoproducto"] == "Combinada 1/2"){
                    $detalle = "(1/2)";
                }
                else
                    if($producto["descripcionPedidoproducto"] == "Combinada 1/4"){
                        $detalle = "(1/4)";
                    }
                else
                    if($producto["descripcionPedidoproducto"] == "Personalizada"){
                        $detalle = "(Pers.)";
                    }

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

                    $htmlPedido .= '<tr><td style="background: rgba(255, 255, 255,0.2);color: black;">'.$productocombinado["nombreSubmenu"]." ".$detalle.'</td>';


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

                    if($rows != 0){

                        $htmlPedido .='<td style="background: rgba(255, 255, 255,0.2);color: black;"><ul style="list-style-type: none;">';

                        foreach ($ingredientesProductoCombinado as $ingrediente) {
                            if($ingrediente["opPedprodcomb_ing"] == "agrega"){
                                $htmlPedido .= '<li> (+) '.$ingrediente["nombreIngrediente"].'</li>'; 
                            }else
                                if($ingrediente["opPedprodcomb_ing"] == "quita"){
                                    $htmlPedido .= '<li> (-) '.$ingrediente["nombreIngrediente"].'</li>';
                                }
                        }
                        $htmlPedido .= '</ul></td>';
                        '<td>'.$productocombinado["nombreProducto"].'</td></tr>';
                    }else{
                        $htmlPedido .= '<td style="background: rgba(255, 255, 255,0.2);color: black;"><center>Sin ingredientes personalizados</center></td>'; 
                    }
                }


            }
        }elseif($producto["nombreMenu"] == "Ensaladas y Bocaditos" || $producto["nombreMenu"] == "Pastas" || $producto["nombreMenu"] == "Carnes" || $producto["nombreMenu"] == "Crepes y Postres"){

            $htmlPedido .= '<div class="list-group-item btn-'.$estado.'" style="border: 2px solid #7a7a7a;color:#434a54;">'.
                "<p style='font-size:25px;font-weight:bold;'>" .$producto["nombreProducto"]."</p>".
                "<p style='position:absolute;top:12px;right:10px;'>".$icon."</p>";

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

                //ASIGNAMIENTO A TABLA DEL PEDIDO PRODUCTO Y DEL PEDIDO PRODUCTO COMBINADO
                $htmlPedido .=
                    '<table class="table table-bordered">'.
                    '<thead>'.
                    '<tr>'.
                    '<th style="background: rgba(255, 255, 255,0.4);color: black;">Producto</th>'.
                    '<th style="background: rgba(255, 255, 255,0.4);color: black;">Ingredientes</th>'.
                    '</tr>'.
                    '</thead>'.
                    '<tbody>';

                $htmlPedido .= '<tr><td style="background: rgba(255, 255, 255,0.2);color: black;">'.$producto["nombreProducto"].'</td>';

                $htmlPedido .=
                    '<td style="background: rgba(255, 255, 255,0.2);color: black;">'.
                    '<ul style="list-style-type: none;">';

                foreach ($ingredientesProducto as $ingrediente) {
                    if($ingrediente["opPedprod_ing"] == "agrega"){
                        $htmlPedido .= '<li> (+) '.$ingrediente["nombreIngrediente"].'</li>'; 
                    }else
                        if($ingrediente["opPedprod_ing"] == "quita"){
                            $htmlPedido .= '<li> (-) '.$ingrediente["nombreIngrediente"].'</li>';
                        }
                }
                $htmlPedido .= '</ul>'.
                    '</td>';
            }
            
        }elseif($producto["nombreMenu"] == "Bebidas"){

            $htmlPedido .= '<div class="list-group-item btn-'.$estado.'" style="border: 2px solid #7a7a7a;color:#434a54;">'.
                "<p style='font-size:25px;font-weight:bold;'>" .$producto["nombreProducto"]."</p>".
                "<p style='position:absolute;top:12px;right:10px;'>".$icon."</p>";

        }

        $htmlPedido .= '</tbody>'.'</table>';


        $htmlPedido .= "<div class=\"list-group-controls\" style='text-align:center;'>".
            "<button class=\"btn btn-primary\" style=\"border: 1px solid;\"><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Editar pedido</button>".
            "<button class=\"btn btn-primary\" style=\"border: 1px solid;\"><i class='fa fa-thumbs-o-up' aria-hidden='true'></i> Pedido entregado</button>".
            "</div>";






        $htmlPedido .="</div>";


    }



    echo $htmlPedido;

}