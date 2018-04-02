<?php
///////////////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

require ("../conn.php");

if ($_POST["reportedeventas"] == "2"){//////////////////////////////////////////ESTABLECIMIENTO VILLAFLORA
    if ($_POST["reportede"] == "1"){/////////////////////////////////////////////VENTAS DIARIAS
        $select_ventasdiarias = "SELECT * FROM factura INNER JOIN cliente ON cliente.idCliente = factura.idCliente WHERE idEstablecimiento = '2' AND fechaFactura = '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
        $result_ventasdiarias = mysqli_query($conn, $select_ventasdiarias);
        if (mysqli_num_rows($result_ventasdiarias)==0) {
            /////////////////////////////////////////////////////////////NO SE HACE NADA YA QUE EL PLUGIN DETECTA SI LA TALBA ESTA VACIA
        } else {
            $totales = array();
            while ($row_ventasdiarias = mysqli_fetch_array($result_ventasdiarias)){
                $totales['subtotal'] += $row_ventasdiarias["subtotalFactura"];
                $totales['descuento'] += $row_ventasdiarias["descuentoFactura"];
                $totales['iva'] += $row_ventasdiarias["ivaFactura"];
                $totales['total'] += $row_ventasdiarias["totalFactura"];
                echo "<tr><td>".$row_ventasdiarias["idFactura"]."</td><td>".$row_ventasdiarias["idPedido"]."</td><td>".$row_ventasdiarias["nombreCliente"]."</td><td>".$row_ventasdiarias["fechaFactura"]."</td><td>".$row_ventasdiarias["formadepagoFactura"]."</td><td>".$row_ventasdiarias["subtotalFactura"]."</td><td>".$row_ventasdiarias["descuentoFactura"]."</td><td>".$row_ventasdiarias["ivaFactura"]."</td><td>".$row_ventasdiarias["totalFactura"]."</td></tr>";
            }
            echo "<tr><td></td><td></td><td></td><td></td><td><strong>TOTALES</strong></td><td><strong>".$totales["subtotal"]."</strong></td><td><strong>".$totales["descuento"]."</strong></td><td><strong>".$totales["iva"]."</strong></td><td><strong>".$totales["total"]."</strong></td></tr>";
        }
    } elseif ($_POST["reportede"] == "2") {
        $week = date('Y-m-d', strtotime(date('Y-m-d') . ' -1 week'));
        $select_ventassemanales = "SELECT * FROM factura INNER JOIN cliente ON cliente.idCliente = factura.idCliente WHERE idEstablecimiento = '2' AND fechaFactura BETWEEN '" . $week . "' AND '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
        $result_ventassemanales = mysqli_query($conn, $select_ventassemanales);
        if (mysqli_num_rows($result_ventassemanales)==0) {
            echo "No se encuentran resultados para mostrar";
        } else {
            $totales = array();
            while ($row_ventassemanales = mysqli_fetch_array($result_ventassemanales)){
                $totales['subtotal'] += $row_ventassemanales["subtotalFactura"];
                $totales['descuento'] += $row_ventassemanales["descuentoFactura"];
                $totales['iva'] += $row_ventassemanales["ivaFactura"];
                $totales['total'] += $row_ventassemanales["totalFactura"];
                echo "<tr><td>".$row_ventassemanales["idFactura"]."</td><td>".$row_ventassemanales["idPedido"]."</td><td>".$row_ventassemanales["nombreCliente"]."</td><td>".$row_ventassemanales["fechaFactura"]."</td><td>".$row_ventassemanales["formadepagoFactura"]."</td><td>".$row_ventassemanales["subtotalFactura"]."</td><td>".$row_ventassemanales["descuentoFactura"]."</td><td>".$row_ventassemanales["ivaFactura"]."</td><td>".$row_ventassemanales["totalFactura"]."</td></tr>";
            }
            echo "<tr><td></td><td></td><td></td><td></td><td><strong>TOTALES</strong></td><td><strong>".$totales["subtotal"]."</strong></td><td><strong>".$totales["descuento"]."</strong></td><td><strong>".$totales["iva"]."</strong></td><td><strong>".$totales["total"]."</strong></td></tr>";
        }
    } elseif ($_POST["reportede"] == "3") {
        $month = date('Y-m-d', strtotime(date('Y-m-d') . ' -1 month'));
        $select_ventasmes = "SELECT * FROM factura INNER JOIN cliente ON cliente.idCliente = factura.idCliente WHERE idEstablecimiento = '2' AND fechaFactura BETWEEN '" . $month . "' AND '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
        $result_ventasmes = mysqli_query($conn, $select_ventasmes);
        if (mysqli_num_rows($result_ventasmes)==0) {
            echo "No se encuentran resultados para mostrar";
        } else {
            $totales = array();
            while ($row_ventasmes = mysqli_fetch_array($result_ventasmes)){
                $totales['subtotal'] += $row_ventasmes["subtotalFactura"];
                $totales['descuento'] += $row_ventasmes["descuentoFactura"];
                $totales['iva'] += $row_ventasmes["ivaFactura"];
                $totales['total'] += $row_ventasmes["totalFactura"];
                echo "<tr><td>".$row_ventasmes["idFactura"]."</td><td>".$row_ventasmes["idPedido"]."</td><td>".$row_ventasmes["nombreCliente"]."</td><td>".$row_ventasmes["fechaFactura"]."</td><td>".$row_ventasmes["formadepagoFactura"]."</td><td>".$row_ventasmes["subtotalFactura"]."</td><td>".$row_ventasmes["descuentoFactura"]."</td><td>".$row_ventasmes["ivaFactura"]."</td><td>".$row_ventasmes["totalFactura"]."</td></tr>";
            }
            echo "<tr><td></td><td></td><td></td><td></td><td><strong>TOTALES</strong></td><td><strong>".$totales["subtotal"]."</strong></td><td><strong>".$totales["descuento"]."</strong></td><td><strong>".$totales["iva"]."</strong></td><td><strong>".$totales["total"]."</strong></td></tr>";
        }
    }
} elseif ($_POST["reportedeventas"] == "1") {//////////////////////////////////////////////ESTABLECIMIENTO QUITOSUR
    if ($_POST["reportede"] == "1"){
        
    } elseif ($_POST["reportede"] == "2") {
        
    } elseif ($_POST["reportede"] == "3") {
        
    }
} elseif ($_POST["reportedeventas"] == "3") {//////////////////////////////////////////////////ESTABLECIMIENTO QUITONORTE
    if ($_POST["reportede"] == "1"){
        
    } elseif ($_POST["reportede"] == "2") {
        
    } elseif ($_POST["reportede"] == "3") {
        
    }
}
?>