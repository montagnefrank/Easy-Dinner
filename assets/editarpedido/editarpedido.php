<?php

require("../conn.php");

if($_POST["productos"]){

    session_start();
    $idmesa = $_SESSION["idmesa"];
    $idusuario = $_SESSION['usuario']['idUsuario'];
    $idPedido = $_POST["idpedido"];

    if(isset($_POST["idpedidoproductocombinado3"])){
        $idpedidoproductocombinado3 = $_POST["idpedidoproductocombinado3"];

        //eliminacion de ingredientes de pedido producto combinado 3
        $query="DELETE FROM pedprodcomb_ing WHERE idPedidoproductocombinado = '$idpedidoproductocombinado3'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al eliminar. ' . $conn->error;
        }

        //eliminacion de pedido producto combinado 3
        $query="DELETE FROM pedidoproductocombinado WHERE idPedidoproductocombinado = '$idpedidoproductocombinado3'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al ingresar. ' . $conn->error;
        }
    }

    if(isset($_POST["idpedidoproductocombinado2"])){
        $idpedidoproductocombinado2 = $_POST["idpedidoproductocombinado2"];

        //eliminacion de ingredientes de pedido producto combinado 2
        $query="DELETE FROM pedprodcomb_ing WHERE idPedidoproductocombinado = '$idpedidoproductocombinado2'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al eliminar. ' . $conn->error;
        }

        //eliminacion de pedido producto combinado 2
        $query="DELETE FROM pedidoproductocombinado WHERE idPedidoproductocombinado = '$idpedidoproductocombinado2'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al ingresar. ' . $conn->error;
        }
    }


    if(isset($_POST["idpedidoproductocombinado1"])){
        $idpedidoproductocombinado1 = $_POST["idpedidoproductocombinado1"];

        //eliminacion de ingredientes de pedido producto combinado 1
        $query="DELETE FROM pedprodcomb_ing WHERE idPedidoproductocombinado = '$idpedidoproductocombinado1'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al eliminar. ' . $conn->error;
        }

        //eliminacion de pedido producto combinado 1
        $query="DELETE FROM pedidoproductocombinado WHERE idPedidoproductocombinado = '$idpedidoproductocombinado1'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al ingresar. ' . $conn->error;
        }
    }

    if(isset($_POST["idpedidoproducto"])){
        $idpedidoproducto = $_POST["idpedidoproducto"];

        //ELIMINACION DEL PEDIDO PRODUCTO
        //eliminacion de ingredientes de pedido producto combinado 1
        $query="DELETE FROM pedprod_ing WHERE idPedidoproducto = '$idpedidoproducto'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al eliminar. ' . $conn->error;
        }

        $query="DELETE FROM pedidoproducto WHERE idPedidoproducto = '$idpedidoproducto'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al ingresar. ' . $conn->error;
        }
    }

    foreach ($_POST["productos"] as $producto) {     
        $idproducto = $producto["idProducto"];
        $cantidad = $producto["cantidad"];
        $observacion = $producto["observacion"];

        if(isset($producto["descripcionPedido"])){
            $descripcionPedido = $producto["descripcionPedido"];

            if($descripcionPedido == "entera"){
                $q = "INSERT INTO pedidoproducto(idPedido,idProducto,descripcionPedidoproducto,estadoPedidoproducto,cantidadPedidoproducto,observacionPedidoproducto) VALUES ('$idPedido', '$idproducto', '$descripcionPedido', 'SOLICITADO','$cantidad','$observacion')";  
                $res = $conn->query($q);

                if(!$res){
                    $res = 'Error al ingresar.' . $conn->error;
                } else {
                    $idPedidoProducto = $conn->insert_id;
                    //aqui va los ingredientes
                    if(isset($producto["ingredientes"])){
                        registraIngrediente($producto["ingredientes"],$idproducto,$idPedidoProducto,$conn,"normal");
                    }
                }

            }
            elseif($descripcionPedido == "Combinada 1/2"){
                $q = "INSERT INTO pedidoproducto(idPedido,idProducto,descripcionPedidoproducto,estadoPedidoproducto,cantidadPedidoproducto,observacionPedidoproducto) VALUES ('$idPedido', '$idproducto', '$descripcionPedido', 'SOLICITADO','$cantidad','$observacion')";  
                $res = $conn->query($q);

                if(!$res){
                    $res = 'Error al ingresar.' . $conn->error;
                } else {
                    $idPedidoProducto = $conn->insert_id;
                    //aqui va los ingredientes
                    if(isset($producto["ingredientes"])){
                        registraIngrediente($producto["ingredientes"],$idproducto,$idPedidoProducto,$conn,"normal");
                    }

                    $idProductoMedio = $producto["idProductoMedio"];

                    $q = "INSERT INTO pedidoproductocombinado(idPedidoproducto,idProducto,descripcionPedidoproducto,estadoPedidoproducto,cantidadPedidoproducto,observacionPedidoproducto) VALUES ('$idPedidoProducto', '$idProductoMedio', '$descripcionPedido', 'SOLICITADO','$cantidad','$observacion')";
                    $ress = $conn->query($q);

                    if(!$ress){
                        $ress = 'Error al ingresar.' . $conn->error;
                    }

                    $idPedidoProductoCombinado = $conn->insert_id;
                    //aqui va los ingredientes
                    if(isset($producto["ingredientesMedio"])){
                        registraIngrediente($producto["ingredientesMedio"],$idProductoMedio,$idPedidoProductoCombinado,$conn,"combinado");
                    }

                }

            }
            elseif($descripcionPedido == "Combinada 1/4"){

                $q = "INSERT INTO pedidoproducto(idPedido,idProducto,descripcionPedidoproducto,estadoPedidoproducto,cantidadPedidoproducto,observacionPedidoproducto) VALUES ('$idPedido', '$idproducto', '$descripcionPedido', 'SOLICITADO','$cantidad','$observacion')";  
                $res = $conn->query($q);

                if(!$res){
                    $res = 'Error al ingresar.' . $conn->error;
                } else {
                    $idPedidoProducto = $conn->insert_id;
                    //aqui va los ingredientes
                    if(isset($producto["ingredientes"])){
                        registraIngrediente($producto["ingredientes"],$idproducto,$idPedidoProducto,$conn,"normal");
                    }

                    $idProductoCuarto = $producto["idProductoCuarto"];

                    $q = "INSERT INTO pedidoproductocombinado(idPedidoproducto,idProducto,descripcionPedidoproducto,estadoPedidoproducto) VALUES ('$idPedidoProducto', '$idProductoCuarto', '$descripcionPedido', 'SOLICITADO')";
                    $ress = $conn->query($q);

                    if(!$ress){
                        $ress = 'Error al ingresar.' . $conn->error;
                    }

                    $idPedidoProductoCombinado = $conn->insert_id;


                    //aqui va los ingredientes
                    if(isset($producto["ingredientesCuarto"])){
                        registraIngrediente($producto["ingredientesCuarto"],$idProductoCuarto,$idPedidoProductoCombinado,$conn,"combinado");
                    }

                }

            }
            elseif($descripcionPedido == "Personalizada"){

                $q = "INSERT INTO pedidoproducto(idPedido,idProducto,descripcionPedidoproducto,estadoPedidoproducto,cantidadPedidoproducto,observacionPedidoproducto) VALUES ('$idPedido', '$idproducto', '$descripcionPedido', 'SOLICITADO','$cantidad','$observacion')";  
                $res = $conn->query($q);

                if(!$res){
                    $res = 'Error al ingresar.' . $conn->error;
                } else {
                    $idPedidoProducto = $conn->insert_id;

                    //aqui va los ingredientes
                    if(isset($producto["ingredientes"])){
                        registraIngrediente($producto["ingredientes"],$idproducto,$idPedidoProducto,$conn,"normal");
                    }

                    $idProductoPersonalizado1 = $producto["idProductoPersonalizado1"];

                    $q = "INSERT INTO pedidoproductocombinado(idPedidoproducto,idProducto,descripcionPedidoproducto,estadoPedidoproducto) VALUES ('$idPedidoProducto', '$idProductoPersonalizado1', '$descripcionPedido', 'SOLICITADO')";
                    $resp1 = $conn->query($q);

                    if(!$resp1){
                        $resp1 = 'Error al ingresar.' . $conn->error;
                    }

                    $idPedidoProductoCombinado = $conn->insert_id;

                    //aqui va los ingredientes
                    if(isset($producto["ingredientesPersonalizado1"])){
                        registraIngrediente($producto["ingredientesPersonalizado1"],$idProductoPersonalizado1,$idPedidoProductoCombinado,$conn,"combinado");
                    }

                    $idProductoPersonalizado2 = $producto["idProductoPersonalizado2"];

                    $q = "INSERT INTO pedidoproductocombinado(idPedidoproducto,idProducto,descripcionPedidoproducto,estadoPedidoproducto) VALUES ('$idPedidoProducto', '$idProductoPersonalizado2', '$descripcionPedido', 'SOLICITADO')";
                    $resp1 = $conn->query($q);

                    if(!$resp1){
                        $resp1 = 'Error al ingresar.' . $conn->error;
                    }

                    $idPedidoProductoCombinado = $conn->insert_id;

                    //aqui va los ingredientes
                    if(isset($producto["ingredientesPersonalizado2"])){
                        registraIngrediente($producto["ingredientesPersonalizado2"],$idProductoPersonalizado2,$idPedidoProductoCombinado,$conn,"combinado");
                    }

                    $idProductoPersonalizado3 = $producto["idProductoPersonalizado3"];

                    $q = "INSERT INTO pedidoproductocombinado(idPedidoproducto,idProducto,descripcionPedidoproducto,estadoPedidoproducto) VALUES ('$idPedidoProducto', '$idProductoPersonalizado3', '$descripcionPedido', 'SOLICITADO')";
                    $resp1 = $conn->query($q);

                    if(!$resp1){
                        $resp1 = 'Error al ingresar.' . $conn->error;
                    }

                    $idPedidoProductoCombinado = $conn->insert_id;


                    //aqui va los ingredientes
                    if(isset($producto["ingredientesPersonalizado3"])){
                        registraIngrediente($producto["ingredientesPersonalizado3"],$idProductoPersonalizado3,$idPedidoProductoCombinado,$conn,"combinado");
                    }

                }

            }

        }else{
            $q = "INSERT INTO pedidoproducto(idPedido,idProducto,descripcionPedidoproducto,estadoPedidoproducto,cantidadPedidoproducto,observacionPedidoproducto) VALUES ('$idPedido', '$idproducto', 'Unitario', 'SOLICITADO','$cantidad','$observacion')";
            $res = $conn->query($q);

            if(!$res){
                $res = 'Error al ingresar.' . $conn->error;
            } else {
                $idPedidoProducto = $conn->insert_id;

                //aqui va los ingredientes
                if(isset($producto["ingredientesProducto"])){
                    registraIngrediente($producto["ingredientesProducto"],$idproducto,$idPedidoProducto,$conn,"normal");
                }
            }
        }

    }

    if($idmesa < 900 ){
        $query = "UPDATE mesa SET estadoMesa='OCUPADA' WHERE idMesa='$idmesa'";
        $res1 = $conn->query($query);

        if(!$res1){
            $res1 = 'Error al ingresar.' . $conn->error;
        }
    }


    echo "true";


}

function registraIngrediente($arrayIngredientes,$idProducto,$idPedidoProducto,$conn,$tipo){
    //ANALISIS DE LOS INGREDIENTES

    //se registran los ids de los ingredientes a analizar
    $encontrados = [];
    $noencontrados = [];
    $eliminados = [];

    foreach ($arrayIngredientes as $ingrediente){ 
        $idIngrediente = $ingrediente["idIngrediente"];
        $nombreIngrediente = $ingrediente["nombreIngrediente"];

        $query = "SELECT * FROM productoingrediente WHERE idProducto = '$idProducto' AND idIngrediente = '$idIngrediente'";
        $result = $conn->query($query);
        if(!$result) die($conn->error);

        $rows = $result->num_rows;
        $result->data_seek(0);
        $prod_ing = $result->fetch_array(MYSQLI_ASSOC);

        if($result){
            //si el ingrediente pertenece al producto
            //SE PROCEDE A VERIFICAR EL INGREDIENTE
            if($rows == 0){
                //no encontro producto
                array_push($noencontrados,$idIngrediente);

            }elseif($rows == 1){
                //CUANDO ENCUENTRA EL PRODUCTO
                array_push($encontrados,$prod_ing["idIngrediente"]);
            }
        }else{
            $res = 'Error al ingresar.' . $conn->error;
        } 
    }

    //ACCION 
    //Para encontrados
    $arrayne = array_count_values($encontrados);
    foreach ($arrayne as $idIngrediente => $cantidad) {
        if($cantidad > 1 ){
            if($tipo =="normal"){
                $cantidad = $cantidad - 1;
                $q = "INSERT INTO pedprod_ing(idIngrediente,idPedidoProducto,opPedprod_ing,cantidadPedProd_ing) VALUES ('$idIngrediente', '$idPedidoProducto','agrega','$cantidad')";
                $res2 = $conn->query($q);

                if(!$res2){
                    $res2 = 'Error al ingresar.' . $conn->error;
                } 
            }elseif($tipo =="combinado"){
                $cantidad = $cantidad - 1;
                $q = "INSERT INTO pedprodcomb_ing(idIngrediente,idPedidoProductocombinado,opPedprodcomb_ing,cantidadPedProdcomb_ing) VALUES ('$idIngrediente', '$idPedidoProducto','agrega','$cantidad')";
                $res2 = $conn->query($q);

                if(!$res2){
                    $res2 = 'Error al ingresar.' . $conn->error;
                } 

            }
        }
    }

    //Para no encontrados
    $arraye = array_count_values($noencontrados);
    foreach ($arraye as $idIngrediente => $cantidad) {
        if($tipo =="normal"){
            $q = "INSERT INTO pedprod_ing(idIngrediente,idPedidoProducto,opPedprod_ing,cantidadPedProd_ing) VALUES ('$idIngrediente', '$idPedidoProducto','agrega','$cantidad')";
            $res2 = $conn->query($q);

            if(!$res2){
                $res2 = 'Error al ingresar.' . $conn->error;
            } 
        }elseif($tipo =="combinado"){
            $q = "INSERT INTO pedprodcomb_ing(idIngrediente,idPedidoProductocombinado,opPedprodcomb_ing,cantidadPedProdcomb_ing) VALUES ('$idIngrediente', '$idPedidoProducto','agrega','$cantidad')";
            $res2 = $conn->query($q);

            if(!$res2){
                $res2 = 'Error al ingresar.' . $conn->error;
            } 
        }
    }

    //Para eliminados

    $q = "SELECT * FROM productoingrediente WHERE idProducto = '$idProducto'";

    $result = $conn->query($q);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $productoIngrediente = array();

    for($i=0;$i< $rows;$i++){
        $result->data_seek($i);
        $productoIngrediente[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    foreach ($productoIngrediente as $pi) {
        $existe = "no";

        foreach ($arrayIngredientes as $ai) {
            if($pi["idIngrediente"] == $ai["idIngrediente"]){
                $existe = "si";
            }
        }

        if($existe == "no"){
            //ACCION
            if($tipo =="normal"){
                $idIngrediente = $pi["idIngrediente"];            
                $q = "INSERT INTO pedprod_ing(idIngrediente,idPedidoProducto,opPedprod_ing,cantidadPedProd_ing) VALUES ('$idIngrediente', '$idPedidoProducto','quita','1')";
                $res2 = $conn->query($q);

                if(!$res2){
                    $res2 = 'Error al ingresar.' . $conn->error;
                } 
            }elseif($tipo =="combinado"){
                $idIngrediente = $pi["idIngrediente"]; 
                $q = "INSERT INTO pedprodcomb_ing(idIngrediente,idPedidoProductocombinado,opPedprodcomb_ing,cantidadPedProdcomb_ing) VALUES ('$idIngrediente', '$idPedidoProducto','quita','1')";
                $res2 = $conn->query($q);

                if(!$res2){
                    $res2 = 'Error al ingresar.' . $conn->error;
                } 

            }
        }
    }
}