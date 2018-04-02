<?php

require ("../conn.php");

if (isset($_POST["cod_busqueda"])) {

    $q = "SELECT * FROM producto p JOIN submenu s ON s.idSubmenu = p.idSubmenu JOIN menu m ON m.idMenu = s.idMenu WHERE codProducto like '%" . $_POST["cod_busqueda"] . "%'";

    $result = $conn->query($q);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $productos = array();

    for($i=0;$i<$rows;$i++){
        $result->data_seek($i);
        $productos[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    print_r(json_encode($productos));

}

if (isset($_POST["parallevar_newprod"])) {
    $q = "SELECT * FROM producto pro JOIN submenu su ON su.idSubmenu = pro.idSubmenu JOIN menu me ON me.idMenu = su.idMenu WHERE codProducto = '" . $_POST["parallevar_newprod"] . "' LIMIT 1";
    $result = $conn->query($q);
    if (!$result)
        die($conn->error);
    $parallevar_rownum = $result->num_rows;
    if ($parallevar_rownum == 0) {
        echo json_encode(array('status' => 'empty'));
    } else {
        $parallevar_row = $result->fetch_array(MYSQLI_ASSOC);
        echo json_encode($parallevar_row);
    }
}

if (isset($_POST["productos"])) {

    session_start();

    $output = array();

    $idestablecimiento = $_SESSION['usuario']['idEstablecimiento'];

    $query="select idMesa from mesa where idEstablecimiento='$idestablecimiento' and estadoMesa= 'PARA LLEVAR' ";
    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $result->data_seek(0);
    $idmesa = $result->fetch_array(MYSQLI_ASSOC);


    $idmesa = $idmesa["idMesa"];
    $idusuario = $_SESSION['usuario']['idUsuario'];

    $q = "INSERT INTO pedido(estadoPedido,estadopagoPedido,idMesa,idUsuario) VALUES ('SOLICITADO','SIN PAGAR','$idmesa', '$idusuario')";
    $output['0'] = $q;
    $res = $conn->query($q);

    if (!$res) {
        $res = 'Error al ingresar. ' . $conn->error;
    } else {
        $idPedido = $conn->insert_id;
        //Para obtener el id de la ultima insercion

        foreach ($_POST["productos"] as $producto) {
            $idproducto = $producto["idProducto"];
            $cantidadPedido = $producto["cantidad"];
            $observacionPedido = $producto["observacion"];

            if (isset($producto["descripcionPedido"])) {
                $descripcionPedido = $producto["descripcionPedido"];

                if ($descripcionPedido == "entera") {
                    $q = "INSERT INTO pedidoproducto(idPedido,idProducto,descripcionPedidoproducto,estadoPedidoproducto,cantidadPedidoproducto,observacionPedidoproducto) VALUES ('$idPedido', '$idproducto', '$descripcionPedido', 'SOLICITADO','$cantidadPedido','$observacionPedido')";
                    $res = $conn->query($q);
                    $output['1'] = $q;
                    if (!$res) {
                        $res = 'Error al ingresar.' . $conn->error;
                    } else {
                        $idPedidoProducto = $conn->insert_id;
                        //aqui va los ingredientes
                        if (isset($producto["ingredientes"])) {
                            registraIngrediente($producto["ingredientes"], $idproducto, $idPedidoProducto, $conn, "normal");
                        }
                    }
                } elseif ($descripcionPedido == "Combinada 1/2") {
                    $q = "INSERT INTO pedidoproducto(idPedido,idProducto,descripcionPedidoproducto,estadoPedidoproducto,cantidadPedidoproducto,observacionPedidoproducto) VALUES ('$idPedido', '$idproducto', '$descripcionPedido', 'SOLICITADO','$cantidadPedido','$observacionPedido')";
                    $res = $conn->query($q);
                    $output['2'] = $q;
                    if (!$res) {
                        $res = 'Error al ingresar.' . $conn->error;
                    } else {
                        $idPedidoProducto = $conn->insert_id;
                        //aqui va los ingredientes
                        if (isset($producto["ingredientes"])) {
                            registraIngrediente($producto["ingredientes"], $idproducto, $idPedidoProducto, $conn, "normal");
                        }

                        $idProductoMedio = $producto["idProductoMedio"];

                        $q = "INSERT INTO pedidoproductocombinado(idPedidoproducto,idProducto,descripcionPedidoproducto,estadoPedidoproducto) VALUES ('$idPedidoProducto', '$idProductoMedio', '$descripcionPedido', 'SOLICITADO')";
                        $ress = $conn->query($q);
                        $output['3'] = $q;
                        if (!$ress) {
                            $ress = 'Error al ingresar.' . $conn->error;
                        }

                        $idPedidoProductoCombinado = $conn->insert_id;
                        //aqui va los ingredientes
                        if (isset($producto["ingredientesMedio"])) {
                            registraIngrediente($producto["ingredientesMedio"], $idProductoMedio, $idPedidoProductoCombinado, $conn, "combinado");
                        }
                    }
                } elseif ($descripcionPedido == "Combinada 1/4") {

                    $q = "INSERT INTO pedidoproducto(idPedido,idProducto,descripcionPedidoproducto,estadoPedidoproducto,cantidadPedidoproducto,observacionPedidoproducto) VALUES ('$idPedido', '$idproducto', '$descripcionPedido', 'SOLICITADO','$cantidadPedido','$observacionPedido')";
                    $res = $conn->query($q);
                    $output['4'] = $q;
                    if (!$res) {
                        $res = 'Error al ingresar.' . $conn->error;
                    } else {
                        $idPedidoProducto = $conn->insert_id;
                        //aqui va los ingredientes
                        if (isset($producto["ingredientes"])) {
                            registraIngrediente($producto["ingredientes"], $idproducto, $idPedidoProducto, $conn, "normal");
                        }

                        $idProductoCuarto = $producto["idProductoCuarto"];

                        $q = "INSERT INTO pedidoproductocombinado(idPedidoproducto,idProducto,descripcionPedidoproducto,estadoPedidoproducto) VALUES ('$idPedidoProducto', '$idProductoCuarto', '$descripcionPedido', 'SOLICITADO')";
                        $ress = $conn->query($q);
                        $output['5'] = $q;
                        if (!$ress) {
                            $ress = 'Error al ingresar.' . $conn->error;
                        }

                        $idPedidoProductoCombinado = $conn->insert_id;


                        //aqui va los ingredientes
                        if (isset($producto["ingredientesCuarto"])) {
                            registraIngrediente($producto["ingredientesCuarto"], $idProductoCuarto, $idPedidoProductoCombinado, $conn, "combinado");
                        }
                    }
                } elseif ($descripcionPedido == "Personalizada") {

                    $q = "INSERT INTO pedidoproducto(idPedido,idProducto,descripcionPedidoproducto,estadoPedidoproducto,cantidadPedidoproducto,observacionPedidoproducto) VALUES ('$idPedido', '$idproducto', '$descripcionPedido', 'SOLICITADO','$cantidadPedido','$observacionPedido')";
                    $res = $conn->query($q);
                    $output['6'] = $q;
                    if (!$res) {
                        $res = 'Error al ingresar.' . $conn->error;
                    } else {
                        $idPedidoProducto = $conn->insert_id;

                        //aqui va los ingredientes
                        if (isset($producto["ingredientes"])) {
                            registraIngrediente($producto["ingredientes"], $idproducto, $idPedidoProducto, $conn, "normal");
                        }

                        $idProductoPersonalizado1 = $producto["idProductoPersonalizado1"];

                        $q = "INSERT INTO pedidoproductocombinado(idPedidoproducto,idProducto,descripcionPedidoproducto,estadoPedidoproducto) VALUES ('$idPedidoProducto', '$idProductoPersonalizado1', '$descripcionPedido', 'SOLICITADO')";
                        $resp1 = $conn->query($q);
                        $output['7'] = $q;
                        if (!$resp1) {
                            $resp1 = 'Error al ingresar.' . $conn->error;
                        }

                        $idPedidoProductoCombinado = $conn->insert_id;

                        //aqui va los ingredientes
                        if (isset($producto["ingredientesPersonalizado1"])) {
                            registraIngrediente($producto["ingredientesPersonalizado1"], $idProductoPersonalizado1, $idPedidoProductoCombinado, $conn, "combinado");
                        }

                        $idProductoPersonalizado2 = $producto["idProductoPersonalizado2"];

                        $q = "INSERT INTO pedidoproductocombinado(idPedidoproducto,idProducto,descripcionPedidoproducto,estadoPedidoproducto) VALUES ('$idPedidoProducto', '$idProductoPersonalizado2', '$descripcionPedido', 'SOLICITADO')";
                        $resp1 = $conn->query($q);
                        $output['8'] = $q;
                        if (!$resp1) {
                            $resp1 = 'Error al ingresar.' . $conn->error;
                        }

                        $idPedidoProductoCombinado = $conn->insert_id;

                        //aqui va los ingredientes
                        if (isset($producto["ingredientesPersonalizado2"])) {
                            registraIngrediente($producto["ingredientesPersonalizado2"], $idProductoPersonalizado2, $idPedidoProductoCombinado, $conn, "combinado");
                        }

                        $idProductoPersonalizado3 = $producto["idProductoPersonalizado3"];

                        $q = "INSERT INTO pedidoproductocombinado(idPedidoproducto,idProducto,descripcionPedidoproducto,estadoPedidoproducto) VALUES ('$idPedidoProducto', '$idProductoPersonalizado3', '$descripcionPedido', 'SOLICITADO')";
                        $resp1 = $conn->query($q);
                        $output['9'] = $q;
                        if (!$resp1) {
                            $resp1 = 'Error al ingresar.' . $conn->error;
                        }

                        $idPedidoProductoCombinado = $conn->insert_id;


                        //aqui va los ingredientes
                        if (isset($producto["ingredientesPersonalizado3"])) {
                            registraIngrediente($producto["ingredientesPersonalizado3"], $idProductoPersonalizado3, $idPedidoProductoCombinado, $conn, "combinado");
                        }
                    }
                }
            } else {

                ////////////////////////////////////////////////////////////////////////SI ES BEBIDA, GUARDAMOS LOS PEDIDOS COMO ENTREGADOS
                $sel_bebida = "SELECT s.idmenu FROM producto p JOIN submenu s ON s.idSubmenu = p.idSubmenu WHERE idProducto = '" . $idproducto . "'";
                $res_bebida = $conn->query($sel_bebida);
                $row_bebida = $res_bebida->fetch_array(MYSQLI_BOTH);
                $output['10'] = $sel_bebida;
                if($row_bebida[0] == "6"){
                    $estado_pedido = "ENTREGADO";
                } else {
                    $estado_pedido = "SOLICITADO";                    
                }

                $q = "INSERT INTO pedidoproducto(idPedido,idProducto,descripcionPedidoproducto,estadoPedidoproducto,cantidadPedidoproducto,observacionPedidoproducto) VALUES ('$idPedido', '$idproducto', 'Unitario', '$estado_pedido','$cantidadPedido','$observacionPedido')";
                $res = $conn->query($q);
                $output['11'] = $q;
                if (!$res) {
                    $res = 'Error al ingresar.' . $conn->error;
                } else {
                    $idPedidoProducto = $conn->insert_id;

                    //aqui va los ingredientes
                    if (isset($producto["ingredientesProducto"])) {
                        registraIngrediente($producto["ingredientesProducto"], $idproducto, $idPedidoProducto, $conn, "normal");
                    }
                }
            }
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////********************************************************************************************//////////////////////////////////
    ///////////////////////////****************DESPUES DE CARGAR EL PEDIDO, PROCEDEMOS A GENERAR LA FACTURA****************//////////////////////////////////
    ///////////////////////////********************************************************************************************//////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////INSERTAMOS LA FACTURA
    $insert_factura = "INSERT INTO factura (idPedido,idCliente,idEstablecimiento,fechaFactura,horaFactura,subtotalFactura,ivaFactura,totalFactura,descuentoFactura"
        . ",formadepagoFactura,tdc_voucherFactura,cheque_nrochequeFactura,vueltoentregadoFactura,efectivoFactura,tdcFactura,chequeFactura,statusFactura)"
        . "VALUES ('" . $idPedido . "','" . $_POST['idcliente'] . "','2','" . date("Y-m-d") . "','" . date("H:i:s") . "','" . $_POST['subtotal'] .
        "','" . $_POST['iva'] . "','" . $_POST['totalapagar'] . "','" . $_POST['descuento'] . "','" . $_POST['formadepago'] . "','" . $_POST['vouchertdc'] .
        "','" . $_POST['nrocheque'] . "','" . $_POST['vuelto'] . "','" . $_POST['efectivo'] . "','" . $_POST['tdc'] . "','" . $_POST['cheque'] . "','ACTIVE')";
    $result_factura = mysqli_query($conn, $insert_factura);
    //
    //    ////////////////////////////////////////////////////////////////////////////CAMBIAMOS EL PEDIDO A PAGADO
    $update_padago = "UPDATE pedido SET estadopagoPedido = 'PAGADO' WHERE idPedido = '" . $idPedido . "'";
    $result_pagado = mysqli_query($conn, $update_padago);
    //
    //    ////////////////////////////////////////////////////////////////////////////CAMBIAMOS LA MESA A HABILITADA
    //    $select_mesapedido = "SELECT idMesa FROM pedido WHERE idPedido = '" . $_POST['idpedido'] . "'";
    //    $result_mesapedido = mysqli_query($conn, $select_mesapedido);
    //    $row_mesapedido = mysqli_fetch_array($result_mesapedido, MYSQLI_BOTH);

    echo json_encode($output);
}

function registraIngrediente($arrayIngredientes, $idProducto, $idPedidoProducto, $conn, $tipo) {
    //ANALISIS DE LOS INGREDIENTES
    //se registran los ids de los ingredientes a analizar
    $encontrados = [];
    $noencontrados = [];
    $eliminados = [];

    foreach ($arrayIngredientes as $ingrediente) {
        $idIngrediente = $ingrediente["idIngrediente"];
        $nombreIngrediente = $ingrediente["nombreIngrediente"];

        $query = "SELECT * FROM productoingrediente WHERE idProducto = '$idProducto' AND idIngrediente = '$idIngrediente'";
        $result = $conn->query($query);
        if (!$result)
            die($conn->error);

        $rows = $result->num_rows;
        $result->data_seek(0);
        $prod_ing = $result->fetch_array(MYSQLI_ASSOC);

        if ($result) {
            //si el ingrediente pertenece al producto
            //SE PROCEDE A VERIFICAR EL INGREDIENTE
            if ($rows == 0) {
                //no encontro producto
                array_push($noencontrados, $idIngrediente);
            } elseif ($rows == 1) {
                //CUANDO ENCUENTRA EL PRODUCTO
                array_push($encontrados, $prod_ing["idIngrediente"]);
            }
        } else {
            $res = 'Error al ingresar.' . $conn->error;
        }
    }

    //ACCION 
    //Para encontrados
    $arrayne = array_count_values($encontrados);
    foreach ($arrayne as $idIngrediente => $cantidad) {
        if ($cantidad > 1) {
            if ($tipo == "normal") {
                $cantidad = $cantidad - 1;
                $q = "INSERT INTO pedprod_ing(idIngrediente,idPedidoProducto,opPedprod_ing,cantidadPedProd_ing) VALUES ('$idIngrediente', '$idPedidoProducto','agrega','$cantidad')";
                $res2 = $conn->query($q);

                if (!$res2) {
                    $res2 = 'Error al ingresar.' . $conn->error;
                }
            } elseif ($tipo == "combinado") {
                $cantidad = $cantidad - 1;
                $q = "INSERT INTO pedprodcomb_ing(idIngrediente,idPedidoProductocombinado,opPedprodcomb_ing,cantidadPedProdcomb_ing) VALUES ('$idIngrediente', '$idPedidoProducto','agrega','$cantidad')";
                $res2 = $conn->query($q);

                if (!$res2) {
                    $res2 = 'Error al ingresar.' . $conn->error;
                }
            }
        }
    }

    //Para no encontrados
    $arraye = array_count_values($noencontrados);
    foreach ($arraye as $idIngrediente => $cantidad) {
        if ($tipo == "normal") {
            $q = "INSERT INTO pedprod_ing(idIngrediente,idPedidoProducto,opPedprod_ing,cantidadPedProd_ing) VALUES ('$idIngrediente', '$idPedidoProducto','agrega','$cantidad')";
            $res2 = $conn->query($q);

            if (!$res2) {
                $res2 = 'Error al ingresar.' . $conn->error;
            }
        } elseif ($tipo == "combinado") {
            $q = "INSERT INTO pedprodcomb_ing(idIngrediente,idPedidoProductocombinado,opPedprodcomb_ing,cantidadPedProdcomb_ing) VALUES ('$idIngrediente', '$idPedidoProducto','agrega','$cantidad')";
            $res2 = $conn->query($q);

            if (!$res2) {
                $res2 = 'Error al ingresar.' . $conn->error;
            }
        }
    }

    //Para eliminados

    $q = "SELECT * FROM productoingrediente WHERE idProducto = '$idProducto'";

    $result = $conn->query($q);
    if (!$result)
        die($conn->error);

    $rows = $result->num_rows;
    $productoIngrediente = array();

    for ($i = 0; $i < $rows; $i++) {
        $result->data_seek($i);
        $productoIngrediente[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    foreach ($productoIngrediente as $pi) {
        $existe = "no";

        foreach ($arrayIngredientes as $ai) {
            if ($pi["idIngrediente"] == $ai["idIngrediente"]) {
                $existe = "si";
            }
        }

        if ($existe == "no") {
            //ACCION
            if ($tipo == "normal") {
                $idIngrediente = $pi["idIngrediente"];
                $q = "INSERT INTO pedprod_ing(idIngrediente,idPedidoProducto,opPedprod_ing,cantidadPedProd_ing) VALUES ('$idIngrediente', '$idPedidoProducto','quita','1')";
                $res2 = $conn->query($q);

                if (!$res2) {
                    $res2 = 'Error al ingresar.' . $conn->error;
                }
            } elseif ($tipo == "combinado") {
                $idIngrediente = $pi["idIngrediente"];
                $q = "INSERT INTO pedprodcomb_ing(idIngrediente,idPedidoProductocombinado,opPedprodcomb_ing,cantidadPedProdcomb_ing) VALUES ('$idIngrediente', '$idPedidoProducto','quita','1')";
                $res2 = $conn->query($q);

                if (!$res2) {
                    $res2 = 'Error al ingresar.' . $conn->error;
                }
            }
        }
    }
}







