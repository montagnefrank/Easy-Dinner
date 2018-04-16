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
?>