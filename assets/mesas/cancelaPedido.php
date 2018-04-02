<?php

require ("../conn.php");

if($_POST["idpedidoproducto"]){


    $idpedidoproducto = $_POST["idpedidoproducto"];
    $descripcionpedidoproducto = $_POST["descripcionpedidoproducto"];
    $menupedidoproducto = $_POST["menupedidoproducto"];
    $numeromesa = $_POST["numeromesa"];
    $idpedido = $_POST["idpedido"];


    if($menupedidoproducto != "Bebidas"){

        if($descripcionpedidoproducto =="Combinada 1/2" || $descripcionpedidoproducto =="Combinada 1/4"){

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
        else
            if($descripcionpedidoproducto =="Personalizada"){

                $idpedidoproductocombinado1 = $_POST["idpedidoproductocombinado1"];
                $idpedidoproductocombinado2 = $_POST["idpedidoproductocombinado2"];
                $idpedidoproductocombinado3 = $_POST["idpedidoproductocombinado3"];

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
        else
            if($descripcionpedidoproducto =="Unitario" || $descripcionpedidoproducto =="entera"){

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

    }else{

        //ELIMINACION DEL PEDIDO PRODUCTO

        $query="DELETE FROM pedidoproducto WHERE idPedidoproducto = '$idpedidoproducto'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al ingresar. ' . $conn->error;
        }

    }


    $query="SELECT * from mesa m JOIN pedido p on(m.idMesa = p.idMesa) JOIN pedidoproducto pp on(pp.idPedido = p.idPedido) WHERE p.idPedido = '$idpedido'";

    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;

    if($rows==0){

        //ELIMINACION DEL PEDIDO PRODUCTO
        $query="DELETE FROM pedido WHERE idPedido = '$idpedido'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al ingresar. ' . $conn->error;
        }

        //HABILITACION DE LA MESA
        $query="UPDATE `mesa` SET `estadoMesa`= 'HABILITADA' WHERE numeroMesa = '$numeromesa'";
        $res = $conn->query($query);

        if(!$res){
            echo $res = 'Error al ingresar. ' . $conn->error;
        }

    }

    echo $rows;

}

