<?php

require ("../conn.php");

if($_POST["idpedido"]){

    $idpedido = $_POST["idpedido"];

    $query="SELECT * FROM pedidoproducto pp join producto p on(p.idProducto = pp.idProducto) join submenu sm on(p.idSubMenu = sm.idSubMenu) join menu m on (sm.idMenu = m.idMenu) WHERE pp.idPedido= '$idpedido' AND pp.estadoPedidoproducto != 'ENTREGADO'";
    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $productos = array();

    for($i=0;$i< $rows;$i++){
        $result->data_seek($i);
        $productos[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    $htmlPedido = "";
    $contador = 1;
    $index = $_POST["index"];

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
            if(($contador == 1) && ($index == 1)){
                $htmlPedido .= 
                    '<div class="tile tile-'.$estado.' col-md-10 col-md-offset-1 subitem'.$contador.'" style="text;display: block;white-space:inherit;border: 5px solid #BBB;padding:4px;min-height: 50px;" tabindex="-1">
                    <div style="display:none;" class="inputMesa"><input type="checkbox" id="chk_pedido" name="chk_pedido" autocomplete="off" value="1"></div>
                    '.'<div style="position: absolute;top: -20px;right: 5px;">'.$icon.'</div>'.'
                    <div class="idpedido" hidden>'.$producto["idPedido"].'</div>
                    <div class="idpedidoproducto" hidden>'.$producto["idPedidoproducto"].'</div>
                <div class="label-form col-md-12 " style="font-weight: bold;color:black;">
                <p style="text-align: center;font-size: 25px;">'.$producto["nombreProducto"].'</p><br>
                <p style="text-align: center;font-size: 20px;padding: 10px;">'.$producto["descripcionPedidoproducto"].'</p>';

            }else{
                $htmlPedido .= 
                    '<div class="tile tile-'.$estado.' col-md-10 col-md-offset-1 subitem'.$contador.'" style="text;display: block;white-space:inherit;border: 1px solid white;min-height: 50px;" tabindex="-1">
                    <div style="display:none;" class="inputMesa"><input type="checkbox" id="chk_pedido" name="chk_pedido" autocomplete="off" value="1"></div>
                     '.'<div style="position: absolute;top: -20px;right: 5px;">'.$icon.'</div>'.'
                    <div class="idpedido" hidden>'.$producto["idPedido"].'</div>
                    <div class="idpedidoproducto" hidden>'.$producto["idPedidoproducto"].'</div>
                <div class="label-form col-md-12 " style="font-weight: bold;color:black;">
                <p style="text-align: center;font-size: 25px;">'.$producto["nombreProducto"].'</p><br>
                <p style="text-align: center;font-size: 20px;padding: 10px;">'.$producto["descripcionPedidoproducto"].'</p>';
            }

            $htmlPedido .= '</div>';

            $htmlPedido .='<div class="col-md-12"><div class="panel panel-primary" style="border-bottom: 1px solid white;font-weight: bold;color:black;background:rgba(255, 255, 255,0.5);"><p style="font-size: 20px;">Pizza '.$producto["nombreSubmenu"].'</p>';

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
                foreach ($ingredientesProducto as $ingrediente) {
                    $htmlPedido .= '<div class="btn btn-primary" style="margin: 1px;border-color: #f5f5f5;font-size: 20px;white-space:pre-wrap;">';
                    if($ingrediente["opPedprod_ing"] == "agrega"){
                        $htmlPedido .= '(+'.$ingrediente["cantidadPedProd_ing"].') '.$ingrediente["nombreIngrediente"]; 
                    }else
                        if($ingrediente["opPedprod_ing"] == "quita"){
                            $htmlPedido .= '(-'.$ingrediente["cantidadPedProd_ing"].') '.$ingrediente["nombreIngrediente"];
                        }
                    $htmlPedido .= '</div>';
                }
            }

            $htmlPedido .= '</div></div>';

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

                    $htmlPedido .='<div class="col-md-12"><div class="panel panel-primary" style="border-bottom: 1px solid white;font-weight: bold;color:black;background: rgba(255, 255, 255,0.5);"><p style="font-size: 20px;">Pizza '.$productocombinado["nombreSubmenu"].' '.$detalle.'</p>';
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

                    foreach ($ingredientesProductoCombinado as $ingrediente) {
                        $htmlPedido .='<div class="btn btn-primary" style="margin: 1px;border-color: #f5f5f5;font-size: 20px;white-space:pre-wrap;">';
                        if($ingrediente["opPedprodcomb_ing"] == "agrega"){
                            $htmlPedido .= '(+'.$ingrediente["cantidadPedProdcomb_ing"].') '.$ingrediente["nombreIngrediente"]; 
                        }else
                            if($ingrediente["opPedprodcomb_ing"] == "quita"){
                                $htmlPedido .= '(-'.$ingrediente["cantidadPedProdcomb_ing"].') '.$ingrediente["nombreIngrediente"];
                            }
                        $htmlPedido .= '</div>';
                    }
                    $htmlPedido .= '</div></div>';
                }


            }
            $htmlPedido .= '</div>';
            $contador++;
        }
        elseif($producto["nombreMenu"] == "Ensaladas y Bocaditos" || $producto["nombreMenu"] == "Pastas" || $producto["nombreMenu"] == "Carnes" || $producto["nombreMenu"] == "Crepes y Postres"){

            if(($contador == 1) && ($index == 1)){
                $htmlPedido .= 
                    '<div class="tile tile-'.$estado.' col-md-10 col-md-offset-1 subitem'.$contador.'" style="text;display: block;white-space:inherit;border: 5px solid #BBB;min-height: 50px;box-shadow:6px 6px 6px #888888;padding:4px;" tabindex="-1">
                    <div style="display:none;" class="inputMesa"><input type="checkbox" id="chk_pedido" name="chk_pedido" autocomplete="off" value="1"></div>
                     '.'<div style="position: absolute;top: -20px;right: 5px;">'.$icon.'</div>'.'
                    <div class="idpedido" hidden>'.$producto["idPedido"].'</div>
                    <div class="idpedidoproducto" hidden>'.$producto["idPedidoproducto"].'</div>
                <div class="label-form col-md-12 " style="font-weight: bold;color:black;">
                <p style="text-align: center;font-size: 25px;">'.$producto["nombreProducto"].'</p><br>
                <p style="text-align: center;font-size: 20px;">'.$producto["nombreSubmenu"].'</p>';

            }else{
                $htmlPedido .= 
                    '<div class="tile tile-'.$estado.' col-md-10 col-md-offset-1 subitem'.$contador.'" style="text;display: block;white-space:inherit;border: 1px solid white;min-height: 50px;" tabindex="-1">
                    <div style="display:none;" class="inputMesa"><input type="checkbox" id="chk_pedido" name="chk_pedido" autocomplete="off" value="1"></div>
                     '.'<div style="position: absolute;top: -20px;right: 5px;">'.$icon.'</div>'.'
                    <div class="idpedido" hidden>'.$producto["idPedido"].'</div>
                    <div class="idpedidoproducto" hidden>'.$producto["idPedidoproducto"].'</div>
                <div class="label-form col-md-12 " style="font-weight: bold;color:black;">
                <p style="text-align: center;font-size: 25px;">'.$producto["nombreProducto"].'</p><br>
                <p style="text-align: center;font-size: 20px;">'.$producto["nombreSubmenu"].'</p>';

            }

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

                $htmlPedido .='<div class="col-md-12"><br><div class="panel panel-primary" style="border-bottom: 1px solid white;font-weight: bold;color:black;background:rgba(255, 255, 255,0.5);padding:10px;">';
                foreach ($ingredientesProducto as $ingrediente) {
                    $htmlPedido .='<div class="btn btn-primary" style="margin: 1px;border-color: #f5f5f5;font-size: 20px;white-space:pre-wrap;">';
                    if($ingrediente["opPedprod_ing"] == "agrega"){
                        $htmlPedido .= '(+'.$ingrediente["cantidadPedProd_ing"].') '.$ingrediente["nombreIngrediente"].''; 
                    }else
                        if($ingrediente["opPedprod_ing"] == "quita"){
                            $htmlPedido .= '(-'.$ingrediente["cantidadPedProd_ing"].') '.$ingrediente["nombreIngrediente"].'';
                        }
                    $htmlPedido .= '</div>';
                }
                $htmlPedido .= '</div></div>';

            }
            $htmlPedido .= '</div></div>';
            $contador++;
        }

    }

    echo $htmlPedido;
}