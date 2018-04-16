<?php

require ("../conn.php");

if($_POST){

    $productos = $_POST["productos"];
    $estadoproducto = $_POST["estadoproducto"];

    foreach ($productos as $producto) {        
        $idpedido = $producto["idpedido"];
        $idpedidoproducto = $producto["idpedidoproducto"];

        $query="UPDATE `pedidoproducto` SET `estadoPedidoproducto`= '$estadoproducto' WHERE idPedido = '$idpedido' and idPedidoproducto = '$idpedidoproducto'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al ingresar. ' . $conn->error;
        }else{
            //ALGORITMO PARA REDUCIR LOS INGREDIENTES DEL PRODUCTO

            if($estadoproducto === "EN PROCESO"){
                //OBTENGO EL PEDIDO PRODUCTO ESPECIFICO

                $query="SELECT * FROM pedidoproducto pp join producto p on(p.idProducto = pp.idProducto) join submenu sm on(p.idSubMenu = sm.idSubMenu) join menu m on (sm.idMenu = m.idMenu) WHERE pp.idPedido= '$idpedido' and pp.idPedidoproducto = '$idpedidoproducto' and m.nombreMenu != 'Bebidas'";

                $result = $conn->query($query);
                if(!$result) die($conn->error);

                $rows = $result->num_rows;
                $pedidoproducto = array();

                for($i=0;$i<$rows;$i++){
                    $result->data_seek($i);
                    $pedidoproducto[] = $result->fetch_array(MYSQLI_ASSOC);
                }

                print_r($pedidoproducto);

                foreach ($pedidoproducto as $pp) {

                    print_r("Pedido Producto");
                    print_r($pp);

                    $idproducto = $pp["idProducto"];

                    //OBTENGO LOS INGREDIENTES DEL PEDIDO PRODUCTO

                    $query = "SELECT * FROM ingrediente i join productoingrediente pi 
                    on(i.idIngrediente = pi.idIngrediente) 
                    where pi.idProducto = '$idproducto'";

                    $result = $conn->query($query);
                    if(!$result) die($conn->error);

                    $rows = $result->num_rows;
                    $ingredientep = array();

                    for($i=0;$i<$rows;$i++){
                        $result->data_seek($i);
                        $ingredientep[] = $result->fetch_array(MYSQLI_ASSOC);
                    }

                    if($rows != 0){
                        foreach ($ingredientep as $ip) {
                            print_r("Ingrediente producto");
                            print_r($ip);
                            $idIngrediente = $ip["idIngrediente"];
                            $cantidad = intval($ip["cantidadIngrediente"]) - 1;

                            $query="UPDATE `ingrediente` SET `cantidadIngrediente`= '$cantidad' WHERE idIngrediente = '$idIngrediente'";
                            $res = $conn->query($query);

                            if(!$res){
                                echo $res = 'Error al ingresar. ' . $conn->error;
                            }
                        }
                    }

                    $idPedidoProducto = $pp["idPedidoproducto"] ;

                    //ANALIZO LOS PEDPRODING

                    $query = "SELECT * FROM pedprod_ing ppi join ingrediente i on(ppi.idIngrediente = i.idIngrediente) WHERE idPedidoproducto = '$idPedidoProducto'";

                    $result = $conn->query($query);
                    if(!$result) die($conn->error);

                    $rows = $result->num_rows;
                    $pedproding = array();

                    for($i=0;$i<$rows;$i++){
                        $result->data_seek($i);
                        $pedproding[] = $result->fetch_array(MYSQLI_ASSOC);
                    }

                    if($rows != 0){
                        foreach ($pedproding as $ppi) {
                            print_r("pedproding");
                            print_r($ppi);
                            $idIngrediente = $ppi["idIngrediente"];
                            $cantidad = 0 ;
                            if($ppi["opPedprod_ing"] =="agrega"){
                                $cantidad = intval($ppi["cantidadIngrediente"]) - 1;
                            }
                            else
                                if($ppi["opPedprod_ing"] =="quita"){
                                    $cantidad = intval($ppi["cantidadIngrediente"]) + 1;
                                }

                            $query="UPDATE `ingrediente` SET `cantidadIngrediente`= '$cantidad' WHERE idIngrediente = '$idIngrediente'";
                            $res = $conn->query($query);

                            if(!$res){
                                echo $res = 'Error al ingresar. ' . $conn->error;
                            }
                        }

                    }


                    //ANALIZO LOS PEDPRODCOMBING

                    $query = "SELECT * FROM pedidoproductocombinado ppc join producto p on(p.idProducto = ppc.idProducto) WHERE idPedidoproducto = '$idPedidoProducto'";

                    $result = $conn->query($query);
                    if(!$result) die($conn->error);

                    $rows = $result->num_rows;
                    $pedprodcomb = array();

                    for($i=0;$i<$rows;$i++){
                        $result->data_seek($i);
                        $pedprodcomb[] = $result->fetch_array(MYSQLI_ASSOC);
                    }

                    if($rows != 0){

                        foreach ($pedprodcomb as $ppc) {

                            print_r("pedidoproductocombinado");
                            print_r($ppc);

                            $idproducto = $ppc["idProducto"];

                            //OBTENGO LOS INGREDIENTES DEL PEDIDO PRODUCTO

                            $query = "SELECT * FROM ingrediente i join productoingrediente pi 
                    on(i.idIngrediente = pi.idIngrediente) 
                    where pi.idProducto = '$idproducto'";

                            $result = $conn->query($query);
                            if(!$result) die($conn->error);

                            $rows = $result->num_rows;
                            $ingredientep = array();

                            for($i=0;$i<$rows;$i++){
                                $result->data_seek($i);
                                $ingredientep[] = $result->fetch_array(MYSQLI_ASSOC);
                            }

                            if($rows != 0){
                                foreach ($ingredientep as $ip) {
                                    print_r("Ingrediente producto");
                                    print_r($ip);
                                    $idIngrediente = $ip["idIngrediente"];
                                    $cantidad = intval($ip["cantidadIngrediente"]) - 1;

                                    $query="UPDATE `ingrediente` SET `cantidadIngrediente`= '$cantidad' WHERE idIngrediente = '$idIngrediente'";
                                    $res = $conn->query($query);

                                    if(!$res){
                                        echo $res = 'Error al ingresar. ' . $conn->error;
                                    }
                                }
                            }

                            $idPedidoproductocombinado = $ppc["idPedidoproductocombinado"] ;


                            $query = "SELECT * FROM pedprodcomb_ing ppi join ingrediente i on(ppi.idIngrediente = i.idIngrediente) WHERE idPedidoproductocombinado = '$idPedidoproductocombinado'";

                            $result = $conn->query($query);
                            if(!$result) die($conn->error);

                            $rows = $result->num_rows;
                            $pedprodcombing = array();

                            for($i=0;$i<$rows;$i++){
                                $result->data_seek($i);
                                $pedprodcombing[] = $result->fetch_array(MYSQLI_ASSOC);
                            }

                            if($rows != 0){
                                foreach ($pedprodcombing as $ppi) {
                                    print_r("pedprodcombing");
                                    print_r($ppi);
                                    $idIngrediente = $ppi["idIngrediente"];
                                    $cantidad = 0 ;
                                    if($ppi["opPedprod_ing"] =="agrega"){
                                        $cantidad = intval($ppi["cantidadIngrediente"]) - 1;
                                    }
                                    else
                                        if($ppi["opPedprod_ing"] =="quita"){
                                            $cantidad = intval($ppi["cantidadIngrediente"]) + 1;
                                        }

                                    $query="UPDATE `ingrediente` SET `cantidadIngrediente`= '$cantidad' WHERE idIngrediente = '$idIngrediente'";
                                    $res = $conn->query($query);

                                    if(!$res){
                                        echo $res = 'Error al ingresar. ' . $conn->error;
                                    }
                                }

                            }
                        }

                    }
                }

            }
        }



        //ANALISIS DEL ESTADO DE LA MESA

        $query="SELECT * FROM pedidoproducto pp join producto p on(p.idProducto = pp.idProducto) join submenu sm on(p.idSubMenu = sm.idSubMenu) join menu m on (sm.idMenu = m.idMenu) WHERE pp.idPedido= '$idpedido' ";

        $result = $conn->query($query);
        if(!$result) die($conn->error);

        $rows = $result->num_rows;
        $pedidoproducto = array();

        for($i=0;$i<$rows;$i++){
            $result->data_seek($i);
            $pedidoproducto[] = $result->fetch_array(MYSQLI_ASSOC);
        }


        $solicitado = 0;
        $enproceso = 0;
        $listoentrega = 0;
        $entregado = 0;

        foreach ($pedidoproducto as $pp) {
            if($pp["estadoPedidoproducto"] =="SOLICITADO"){
                $solicitado++;
            }

            if($pp["estadoPedidoproducto"] =="EN PROCESO"){
                $enproceso++;
            }

            if($pp["estadoPedidoproducto"] =="LISTO PARA ENTREGAR"){
                $listoentrega++;
            }

            if($pp["estadoPedidoproducto"] =="ENTREGADO"){
                $entregado++;
            }
        }

        $query="UPDATE `pedido` SET `estadoPedido`= 'ENTREGADO' WHERE idPedido = '$idpedido'";
        $res = $conn->query($query);
        //ALGORITMOS DE VERDAD PARA CALCULAR AUTOMATICAMENTE EL ESTADO DE LA MESA

        if(($solicitado != 0) && ($enproceso == 0) && ($listoentrega == 0)&& ($entregado == 0)){
            $query="UPDATE `pedido` SET `estadoPedido`= 'SOLICITADO' WHERE idPedido = '$idpedido'";
            $res = $conn->query($query);
        }
        else
            if(($solicitado != 0) && ($enproceso == 0) && ($listoentrega == 0)&& ($entregado != 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'SOLICITADO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        else
            if(($solicitado != 0) && ($enproceso == 0) && ($listoentrega != 0)&& ($entregado == 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'SOLICITADO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        else
            if(($solicitado != 0) && ($enproceso == 0) && ($listoentrega != 0)&& ($entregado != 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'SOLICITADO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        if(($solicitado != 0) && ($enproceso != 0) && ($listoentrega == 0)&& ($entregado == 0)){
            $query="UPDATE `pedido` SET `estadoPedido`= 'SOLICITADO' WHERE idPedido = '$idpedido'";
            $res = $conn->query($query);
        }
        else
            if(($solicitado != 0) && ($enproceso != 0) && ($listoentrega == 0)&& ($entregado != 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'SOLICITADO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        else
            if(($solicitado != 0) && ($enproceso != 0) && ($listoentrega != 0)&& ($entregado == 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'SOLICITADO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        else
            if(($solicitado != 0) && ($enproceso != 0) && ($listoentrega != 0)&& ($entregado != 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'SOLICITADO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }

        else
            if(($solicitado == 0) && ($enproceso != 0) && ($listoentrega == 0)&& ($entregado == 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'EN PROCESO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        else
            if(($solicitado == 0) && ($enproceso != 0) && ($listoentrega == 0)&& ($entregado != 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'EN PROCESO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        else
            if(($solicitado == 0) && ($enproceso != 0) && ($listoentrega != 0)&& ($entregado == 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'EN PROCESO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        else
            if(($solicitado == 0) && ($enproceso != 0) && ($listoentrega != 0)&& ($entregado != 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'EN PROCESO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        else
            if(($solicitado == 0) && ($enproceso == 0) && ($listoentrega != 0)&& ($entregado == 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'LISTO PARA ENTREGAR' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        else
            if(($solicitado == 0) && ($enproceso == 0) && ($listoentrega != 0)&& ($entregado != 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'LISTO PARA ENTREGAR' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        else
            if(($solicitado == 0) && ($enproceso == 0) && ($listoentrega == 0)&& ($entregado != 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'ENTREGADO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
        else
            if(($solicitado == 0) && ($enproceso == 0) && ($listoentrega == 0)&& ($entregado == 0)){
                $query="UPDATE `pedido` SET `estadoPedido`= 'ENTREGADO' WHERE idPedido = '$idpedido'";
                $res = $conn->query($query);
            }
    }

    echo true; 

}