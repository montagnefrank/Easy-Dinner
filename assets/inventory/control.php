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
        echo "<tr class='singleing_row'>
                <td class='ing_nombreproducto text-bold'>" . $row_ingredientes_list['nombreIngrediente'] . "</td>
                <td class=' text-bold'><span id=\"ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val\" class=\"label label-" . $progbar_color . "\">" . $row_ingredientes_list['cantidad1'] . " </span></td>
                <td class='ing_codigo text-bold'>" . $row_ingredientes_list['codigoIngrediente'] . "</td>
                <td class='ing_precio text-bold'>" . $row_ingredientes_list['precioIngrediente'] . "</td>
                <td class='ing_unidad text-bold'>" . $row_ingredientes_list['unidadIngrediente'] . "</td>
                <td class=' text-bold'><span class=\"label label-" . $labelEstatus . "\">" . $texto . "</span></td>
                <td class='ing_fecha text-bold'>" . $row_ingredientes_list['editadoIngredinete'] . "</td>
                <td class='ing_tipo text-bold'>" . $row_ingredientes_list['tipoIngrediente'] . "</td>
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

?>