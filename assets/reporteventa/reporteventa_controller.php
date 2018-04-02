<?php

require ("../conn.php");

//PARA GENERAR LOS REPORTES
if (isset($_POST["tipoReporte"]) && isset($_POST["fechaInicio"]) && isset($_POST["fechaFin"])) {

    if($_POST["tipoReporte"] == "reporteProductos"){
        $q = "SELECT nombreProducto, SUM(cantidadProducto) as cantidadProducto from (SELECT p.nombreProducto , pp.cantidadPedidoproducto AS cantidadProducto from factura f JOIN pedidoproducto pp on(f.idPedido = pp.idPedido) JOIN producto p on(p.idProducto = pp.idProducto) WHERE f.fechaFactura BETWEEN '".$_POST["fechaInicio"]."' AND '".$_POST["fechaFin"]."' ) AS TablaReporte GROUP BY nombreProducto ASC";
    }

    $result = $conn->query($q);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $productos = array();

    for($i=0;$i<$rows;$i++){
        $result->data_seek($i);
        $productos[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    $html = "<br><br>
    <table class='table table-inverse cell-border' style='background-color: #ed4444;' cellspacing='0' width='100%'>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>CANTIDAD</th>
          </tr>
        </thead>
        <tbody>
      ";

    foreach ($productos as $producto) {
        $html .= "
                    <tr>
                        <td>".$producto["nombreProducto"]."</td>
                        <td>".$producto["cantidadProducto"]."</td>
                    </tr>
                 ";
    }




     

        $html .= "</tbody></table>";


    print_r($html);

}