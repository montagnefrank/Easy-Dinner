<?php
///////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
error_reporting(E_ALL);
ini_set('display_errors', 1);

require("../conn.php");

////////////////////////////////////////////////////////////////////////////////ID DEL CLIENTE A BUSCAR
$idCliente = $_POST['id'];
$output = array();

if($_POST){
    
    ////////////////////////////////////////////////////////////////////////////EL MAS PEDIDO DEL CLIENTE
    $sel_top1 = "SELECT COUNT(pp.idProducto) cant,nombreProducto,nombreSubmenu FROM factura fa 
            JOIN pedidoproducto pp ON pp.idPedido = fa.idPedido 
            JOIN producto pro ON pro.idProducto = pp.idProducto 
            JOIN submenu su ON su.idSubmenu = pro.idSubmenu
            WHERE fa.statusFactura = 'ACTIVE' AND fa.idCliente = '" . $idCliente . "' 
            GROUP BY pp.idProducto
            ORDER BY cant DESC
            LIMIT 1 ";
    $res_top1 = $conn->query($sel_top1);
    if(!$res_top1) die($conn->error);
    $row_top1 = $res_top1->fetch_array(MYSQLI_ASSOC);
    $output["top1"] = $row_top1["nombreProducto"] . " | " . $row_top1["nombreSubmenu"];
    $output["top1cant"] = $row_top1["cant"];
    
    ////////////////////////////////////////////////////////////////////////////TOTAL COMPRADO PRO EL CLIENTE
    $sel_comprado = "SELECT SUM(totalFactura) comprado FROM factura fa WHERE fa.statusFactura = 'ACTIVE' AND fa.idCliente = '" . $idCliente . "'";
    $res_comprado = $conn->query($sel_comprado);
    if(!$res_comprado) die($conn->error);
    $row_comprado = $res_comprado->fetch_array(MYSQLI_ASSOC);
    $output["comprado"] = number_format($row_comprado["comprado"], 2, '.', '');
    
    ////////////////////////////////////////////////////////////////////////////ULTIMAS 3 COMRPAS
    $sel_last3 = "SELECT idFactura id, fechaFactura fecha, totalFactura tot FROM factura fa 
                    WHERE fa.statusFactura = 'ACTIVE' AND fa.idCliente = '" . $idCliente . "'
                    ORDER BY fa.idFactura DESC
                    LIMIT 3";
    $res_last3 = $conn->query($sel_last3);
    if(!$res_last3) die($conn->error);
    $res_last3->data_seek(0);
    $row_last1 = $res_last3->fetch_array(MYSQLI_ASSOC);
    $output["last1"] = $row_last1["id"];
    $output["last1date"] = $row_last1["fecha"];
    $output["last1tot"] = $row_last1["tot"];
    $res_last3->data_seek(1);
    $row_last2 = $res_last3->fetch_array(MYSQLI_ASSOC);
    $output["last2"] = $row_last2["id"];
    $output["last2date"] = $row_last2["fecha"];
    $output["last2tot"] = $row_last2["tot"];
    $res_last3->data_seek(2);
    $row_last3 = $res_last3->fetch_array(MYSQLI_ASSOC);
    $output["last3"] = $row_last3["id"];
    $output["last3date"] = $row_last3["fecha"];
    $output["last3tot"] = $row_last3["tot"];
    
    ////////////////////////////////////////////////////////////////////////////OBTENEMOS EL COMENTARIO DEL CLIENTE
    $sel_com = "SELECT textoComentario coment FROM comentarios co
                        WHERE co.statusComentario = 'ACTIVE' AND co.idCliente = '" . $idCliente . "'
                        ORDER BY co.idComentario DESC
                        LIMIT 1";
    $res_com = $conn->query($sel_com);
    if(!$res_com) die($conn->error);
    $row_com = $res_com->fetch_array(MYSQLI_ASSOC);
    $output["com"] = $row_com["coment"];
    
    ////////////////////////////////////////////////////////////////////////////DEVOLVEMOS TODO AL AJAX
    echo json_encode($output);
}
?>