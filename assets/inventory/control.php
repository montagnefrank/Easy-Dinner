<?php

/////////////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

require ("../conn.php");

if (isset($_POST["addnewing"])) {
    $json = array();
    $select = "SELECT codigoIngrediente FROM ingrediente WHERE codigoIngrediente = '" . $_POST['codigoIngrediente'] . "';";
    $result = $conn->query($select) or die($conn->error);
    $row_cnt = $result->num_rows;

    if ($row_cnt > 0) {
        $json['status'] = "error";
        $json['msg'] = " Ya existe el ingrediente en sistema, por favor seleccione un codigo diferente.";
        echo json_encode($json);
    } else {
        $query = "INSERT INTO ingrediente (nombreIngrediente,cantidad" . $_POST['establecimiento'] . ",codigoIngrediente,barcodeIngrediente,unidadIngrediente,tipoIngrediente,ccIngrediente,detalleIngrediente,bodegaIngrediente,minIngrediente,maxIngrediente,precioIngrediente,compraIngrediente,editadoIngredinete,estadoIngrediente) "
                . " VALUES ('" . $_POST['nombreIngrediente'] . "','" . $_POST['cantidad'] . "','" . $_POST['codigoIngrediente'] . "','" . $_POST['barcodeIngrediente'] . "','" . $_POST['unidadIngrediente'] . "','" . $_POST['tipoIngrediente'] . "','" . $_POST['ccIngrediente'] . "','" . $_POST['detalleIngrediente'] . "','" . $_POST['bodegaIngrediente'] . "','" . $_POST['minIngrediente'] . "','" . $_POST['maxIngrediente'] . "','" . $_POST['precioIngrediente'] . "','" . $_POST['compraIngrediente'] . "','" . date('Y-m-d') . "','" . $_POST['estadoIngrediente'] . "')";
//        echo $query;
        $val_result = $conn->query($query) or die($conn->error);

        if ($val_result) {
            $json['status'] = "ok";
            $json['msg'] = " Nuevo ingrediente agregado en sistema ";
            echo json_encode($json);
        } else {
            $json['status'] = "error";
            $json['msg'] = " Error al crear el ingrediente, consulte con su departamento de soporte. ";
            echo json_encode($json);
        }
    }
}

if (isset($_POST["editIng"])) {
    $json = array();

    $query = "UPDATE ingrediente SET nombreIngrediente ='" . $_POST['nombreIngrediente'] . "', "
            . "cantidad" . $_POST['establecimiento'] . " = '" . $_POST['cantidad'] . "', "
            . "barcodeIngrediente = '" . $_POST['barcodeIngrediente'] . "', "
            . "unidadIngrediente = '" . $_POST['unidadIngrediente'] . "', "
            . "tipoIngrediente = '" . $_POST['tipoIngrediente'] . "', "
            . "ccIngrediente = '" . $_POST['ccIngrediente'] . "', "
            . "detalleIngrediente = '" . $_POST['detalleIngrediente'] . "', "
            . "bodegaIngrediente = '" . $_POST['bodegaIngrediente'] . "', "
            . "minIngrediente = '" . $_POST['minIngrediente'] . "', "
            . "maxIngrediente = '" . $_POST['maxIngrediente'] . "', "
            . "precioIngrediente = '" . $_POST['precioIngrediente'] . "', "
            . "compraIngrediente = '" . $_POST['compraIngrediente'] . "', "
            . "editadoIngredinete = '" . date('Y-m-d') . "', "
            . "estadoIngrediente = '" . $_POST['estadoIngrediente'] . "' "
            . "WHERE codigoIngrediente = '" . $_POST['codigoIngrediente'] . "'";
    $val_result = $conn->query($query) or die($conn->error);

    if ($val_result) {
        $json['status'] = "ok";
        $json['msg'] = " Ingrediente actualizado exitosamente ";
        echo json_encode($json);
    } else {
        $json['status'] = "error";
        $json['msg'] = " Error al actualizar el ingrediente, consulte con su departamento de sistemas. ";
        echo json_encode($json);
    }
}

if (isset($_POST['deleteIng'])) {
    $val_select = "DELETE FROM ingrediente WHERE codigoIngrediente = '" . $_POST['deleteid'] . "'";
    $val_result = $conn->query($val_select) or die($conn->error);

    echo " Ingrediente Eliminado exitosamente. ";
}

if (isset($_POST['getList'])) {
    $select_ingredientes_list = "SELECT * FROM ingrediente";
    $result_ingredientes_list = mysqli_query($conn, $select_ingredientes_list);
    while ($row_ingredientes_list = mysqli_fetch_array($result_ingredientes_list)) {
        if ($row_ingredientes_list['cantidad1'] <= 24) {
            $progbar_color = 'danger';
        } elseif ($row_ingredientes_list['cantidad1'] >= 25 && $row_ingredientes_list['cantidad1'] <= 49) {
            $progbar_color = 'warning';
        } elseif ($row_ingredientes_list['cantidad1'] >= 50 && $row_ingredientes_list['cantidad1'] <= 74) {
            $progbar_color = 'info';
        } elseif ($row_ingredientes_list['cantidad1'] >= 75 && $row_ingredientes_list['cantidad1'] <= 100) {
            $progbar_color = 'success';
        }
        if ($row_ingredientes_list['estadoIngrediente'] == 1) {
            $labelEstatus = "success";
            $texto = "DISPONIBLE";
        } else {
            $labelEstatus = "danger";
            $texto = "NO DISPONIBLE";
        }
        echo "<tr>
                <td class='ing_nombreproducto text-bold'>" . $row_ingredientes_list['nombreIngrediente'] . "</td>
                <td class=' text-bold'><span id=\"ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val\" class=\"pushtop_6 font110 label label-" . $progbar_color . "\">" . $row_ingredientes_list['cantidad1'] . " </span></td>
                <td class=' text-bold'>
                    <button class='ing_quickedit_plus btn btn-success pull-left w50'><i class='fas fa-plus'></i></button>
                    <button class='ing_quickedit_minus btn btn-danger pull-right w50'><i class='fas fa-minus'></i></button>
                    <div class=' cant_input_plus hidethis'><div class='input-group'><span class='input-group-addon'> + </span><input type='text' class='form-control cant_input_plus_val' placeholder='Valor'/></div></div>
                    <div class='form-group cant_input_minus hidethis'><div class='input-group'><input type='text' class='form-control cant_input_minus_val' placeholder='Valor'/><span class='input-group-addon'> - </span></div></div>
                </td>
                <td class='ing_codigo text-bold'>" . $row_ingredientes_list['codigoIngrediente'] . "</td>
                <td class='ing_precio text-bold'>" . $row_ingredientes_list['precioIngrediente'] . "</td>
                <td class='ing_unidad text-bold'>" . $row_ingredientes_list['unidadIngrediente'] . "</td>
                <td class=' text-bold'><span class=\"label label-" . $labelEstatus . "\">" . $texto . "</span></td>
                <td class='ing_fecha text-bold'>" . $row_ingredientes_list['editadoIngredinete'] . "</td>
                <td class='ing_tipo text-bold'>" . $row_ingredientes_list['tipoIngrediente'] . "</td>
                <td class='edit_rowbtn text-bold singleing_row'> <button class='btn btn-info pull-left'><i class='fas fa-edit'></i> Editar</button> </td>
                <input class='ing_id' type='hidden' value='" . $row_ingredientes_list['idIngrediente'] . "'>
                <input class='ing_cantidad' id='ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_cant' type='hidden' value='" . $row_ingredientes_list['cantidad1'] . "'>
                <input class='ing_barcode' type='hidden' value='" . $row_ingredientes_list['barcodeIngrediente'] . "'>
                <input class='ing_cuentacontable' type='hidden' value='" . $row_ingredientes_list['ccIngrediente'] . "'>
                <input class='ing_detalle' type='hidden' value='" . $row_ingredientes_list['detalleIngrediente'] . "'>
                <input class='ing_bodega' type='hidden' value='" . $row_ingredientes_list['bodegaIngrediente'] . "'>
                <input class='ing_min' type='hidden' value='" . $row_ingredientes_list['minIngrediente'] . "'>
                <input class='ing_max' type='hidden' value='" . $row_ingredientes_list['maxIngrediente'] . "'>
                <input class='ing_compra' type='hidden' value='" . $row_ingredientes_list['compraIngrediente'] . "'>
                <input class='ing_status' type='hidden' value='" . $row_ingredientes_list['estadoIngrediente'] . "'>
            </tr>";
    }
}

if (isset($_POST['getTrans'])) {

    $query = "SELECT * FROM transactions ORDER BY idTrans DESC";
    $result = $conn->query($query);
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($row['prevStockTrans'] <= 24) {
            $progbar_color = 'danger';
        } elseif ($row['prevStockTrans'] >= 25 && $row['prevStockTrans'] <= 49) {
            $progbar_color = 'warning';
        } elseif ($row['prevStockTrans'] >= 50 && $row['prevStockTrans'] <= 74) {
            $progbar_color = 'info';
        } elseif ($row['prevStockTrans'] >= 75 && $row['prevStockTrans'] <= 100) {
            $progbar_color = 'success';
        }
        if ($row['typeTrans'] == 'AGREGAR') {
            $labelEstatus = "success";
            $texto = "AGREGAR";
        } else {
            $labelEstatus = "danger";
            $texto = "EXTRAER";
        }
        echo "<tr>
                <td class=' text-bold'>" . $row['nomIngTrans'] . "</td>
                <td class=' text-bold'><span  class=\"pushtop_6 font110 label label-" . $progbar_color . "\">" . $row['prevStockTrans'] . " </span></td>
                <td class=' text-bold'>" . $row['valTrans'] . "</td>
                <td class=' text-bold'><span class=\"label label-" . $labelEstatus . "\">" . $texto . "</span></td>
                <td class=' text-bold'>" . $row['dateTrans'] . "</td>
                <td class=' text-bold'>" . $row['userTrans'] . "</td>
                <td class=' text-bold'>" . $row['sucursalTrans'] . "</td>
            </tr>";
    }
}

if (isset($_POST["editInventory"])) {
    session_start();
    $json = array();
//    var_dump($_SESSION);die;
    ////////////////////////////////////////////////////////////////////////////MODIFICAMOS TODOS LOS QUE SON AGREGAR
    $entradas = json_decode($_POST["plusamounts"], true);
    foreach ($entradas as $element) {

        ////////////////////////////////////////////////////////////////////////LLAMAMOS AL VALOR ACTUAL DEL INVENTARIO
        $select = "SELECT cantidad" . $_POST['location'] . " FROM ingrediente WHERE codigoIngrediente = '" . $element['codigo'] . "'";
        $result = $conn->query($select);
        $row = $result->fetch_array(MYSQLI_NUM);

        ////////////////////////////////////////////////////////////////////////ACTUALIZAMOS AL NUEVO VALOR
        $prevstock = $row['0'];
        $newstock = $prevstock + $element['cantidad'];
        $query = "UPDATE ingrediente SET cantidad" . $_POST['location'] . " = '" . $newstock . "' WHERE codigoIngrediente = '" . $element['codigo'] . "'";
        $val_result = $conn->query($query) or die($conn->error);
//        $json['msg'] .= $select . $query;
        ////////////////////////////////////////////////////////////////////////AGREGAMOS EL REGISTRO EN HISTORICO
        if ($_POST['location'] == 1){
            $est = "Quito Sur";
        }
        if ($_POST['location'] == 2){
            $est = "Villaflora";
        }
        if ($_POST['location'] == 3){
            $est = "Cotocollao";
        }
        $query = "INSERT INTO transactions (userTrans,codIngTrans,dateTrans,prevStockTrans,valTrans,typeTrans,sucursalTrans,nomIngTrans) "
                . " VALUES ('" . $_SESSION["usuario"]["nombreUsuario"] . "','" . $element['codigo'] . "','" . date('Y-m-d H:i:s') . "','" . $prevstock . "','" . $element['cantidad'] . "','AGREGAR','" . $est . "','" . $element['nombre'] . "')";
//        $json['msg'] .= $select . $query;
        $val_result = $conn->query($query) or die($conn->error);
    }

    ////////////////////////////////////////////////////////////////////////////MODIFICAMOS TODOS LOS QUE SON QUITAR
    $entradas = json_decode($_POST["lessamounts"], true);
    foreach ($entradas as $element) {

        ////////////////////////////////////////////////////////////////////////LLAMAMOS AL VALOR ACTUAL DEL INVENTARIO
        $select = "SELECT cantidad" . $_POST['location'] . " FROM ingrediente WHERE codigoIngrediente = '" . $element['codigo'] . "'";
        $result = $conn->query($select);
        $row = $result->fetch_array(MYSQLI_NUM);

        ////////////////////////////////////////////////////////////////////////ACTUALIZAMOS AL NUEVO VALOR
        $prevstock = $row['0'];
        $newstock = $prevstock - $element['cantidad'];
        $query = "UPDATE ingrediente SET cantidad" . $_POST['location'] . " = '" . $newstock . "' WHERE codigoIngrediente = '" . $element['codigo'] . "'";
        $val_result = $conn->query($query) or die($conn->error);
//        $json['msg'] .= $select . $query;
        ////////////////////////////////////////////////////////////////////////AGREGAMOS EL REGISTRO EN HISTORICO
        if ($_POST['location'] == 1){
            $est = "Quito Sur";
        }
        if ($_POST['location'] == 1){
            $est = "Villaflora";
        }
        if ($_POST['location'] == 1){
            $est = "Cotocollao";
        }
        $query = "INSERT INTO transactions (userTrans,codIngTrans,dateTrans,prevStockTrans,valTrans,typeTrans,sucursalTrans,nomIngTrans) "
                . " VALUES ('" . $_SESSION["usuario"]["nombreUsuario"] . "','" . $element['codigo'] . "','" . date('Y-m-d H:i:s') . "','" . $prevstock . "','" . $element['cantidad'] . "','EXTRAER','" . $est . "','" . $element['nombre'] . "')";
//        $json['msg'] .= $select . $query;
        $val_result = $conn->query($query) or die($conn->error);
    }

    if ($val_result) {
        $json['status'] = "ok";
        $json['msg'] .= " Ingrediente actualizado exitosamente ";
        echo json_encode($json);
    } else {
        $json['status'] = "error";
        $json['msg'] = " Error al actualizar el ingrediente, consulte con su departamento de sistemas. ";
        echo json_encode($json);
    }
}
?>