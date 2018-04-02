<script type='text/javascript'>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ACTUALIZO LA TABLA DE INGREDIENTES SEGUN EL RESTAURANT

    $('#ingredientes_quitosur_btn').click(function () { /////////////////////////////////////////////QUITO SUR
        ////////////////////////////////////////////////////////////CREAMOS EL SCRIPT DINAMICAMENTE
<?php
$select_ingredientes_list = "SELECT * FROM ingrediente";
$result_ingredientes_list = mysqli_query($conn, $select_ingredientes_list);
$dashboard_i = '0';
while ($row_ingredientes_list = mysqli_fetch_array($result_ingredientes_list)) {

    $random = $row_ingredientes_list['cantidadIngrediente'];
    if ($random <= 24) {
        $progbar_color = 'danger';
    } elseif ($random >= 25 && $random <= 49) {
        $progbar_color = 'warning';
    } elseif ($random >= 50 && $random <= 74) {
        $progbar_color = 'info';
    } elseif ($random >= 75 && $random <= 100) {
        $progbar_color = 'success';
    }
    echo "$('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_bar')
                .css('width', '" . $random . "%')
                .removeClass('progress-bar-danger progress-bar-success progress-bar-info progress-bar-warning')
                .addClass('progress-bar-" . $progbar_color . "'); 
        $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val')
                .html('" . $random . " KG')
                .removeClass('label-danger label-info label-warning label-success')
                .addClass('label-" . $progbar_color . "');";

    $dashboard_i++;
    if ($dashboard_i == '6') {
        break;
    }
}
?>
    });

    $('#ingredientes_villaflora_btn').click(function () { ///////////////////////////////////////////////VILLAFLORA
<?php
$select_ingredientes_list = "SELECT * FROM ingrediente";
$result_ingredientes_list = mysqli_query($conn, $select_ingredientes_list);
$dashboard_i = '0';
while ($row_ingredientes_list = mysqli_fetch_array($result_ingredientes_list)) {

    $random = mt_rand(0, 100);
    if ($random <= 24) {
        $progbar_color = 'danger';
    } elseif ($random >= 25 && $random <= 49) {
        $progbar_color = 'warning';
    } elseif ($random >= 50 && $random <= 74) {
        $progbar_color = 'info';
    } elseif ($random >= 75 && $random <= 100) {
        $progbar_color = 'success';
    }
    echo "$('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_bar')
                .css('width', '" . $random . "%')
                .removeClass('progress-bar-danger progress-bar-success progress-bar-info progress-bar-warning')
                .addClass('progress-bar-" . $progbar_color . "'); 
        $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val')
                .html('" . $random . " KG')
                .removeClass('label-danger label-info label-warning label-success')
                .addClass('label-" . $progbar_color . "');";

    $dashboard_i++;
    if ($dashboard_i == '6') {
        break;
    }
}
?>
    });

    $('#ingredientes_quitonorte_btn').click(function () { ///////////////////////////////////////////////QUITO NORTE
<?php
$select_ingredientes_list = "SELECT * FROM ingrediente";
$result_ingredientes_list = mysqli_query($conn, $select_ingredientes_list);
$dashboard_i = '0';
while ($row_ingredientes_list = mysqli_fetch_array($result_ingredientes_list)) {

    $random = mt_rand(0, 100);
    if ($random <= 24) {
        $progbar_color = 'danger';
    } elseif ($random >= 25 && $random <= 49) {
        $progbar_color = 'warning';
    } elseif ($random >= 50 && $random <= 74) {
        $progbar_color = 'info';
    } elseif ($random >= 75 && $random <= 100) {
        $progbar_color = 'success';
    }
    echo "$('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_bar')
                .css('width', '" . $random . "%')
                .removeClass('progress-bar-danger progress-bar-success progress-bar-info progress-bar-warning')
                .addClass('progress-bar-" . $progbar_color . "'); 
        $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val')
                .html('" . $random . " KG')
                .removeClass('label-danger label-info label-warning label-success')
                .addClass('label-" . $progbar_color . "');";

    $dashboard_i++;
    if ($dashboard_i == '6') {
        break;
    }
}
?>
    });

    $('#ingredientes_quitosur_btn_big').click(function () { /////////////////////////////////////////////QUITO SUR BIG
        ////////////////////////////////////////////////////////////CREAMOS EL SCRIPT DINAMICAMENTE
<?php
$select_ingredientes_list = "SELECT * FROM ingrediente";
$result_ingredientes_list = mysqli_query($conn, $select_ingredientes_list);
while ($row_ingredientes_list = mysqli_fetch_array($result_ingredientes_list)) {

    $random = $row_ingredientes_list['cantidadIngrediente'];
    if ($random <= 24) {
        $progbar_color = 'danger';
    } elseif ($random >= 25 && $random <= 49) {
        $progbar_color = 'warning';
    } elseif ($random >= 50 && $random <= 74) {
        $progbar_color = 'info';
    } elseif ($random >= 75 && $random <= 100) {
        $progbar_color = 'success';
    }
    echo "$('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_bar_big')
                .css('width', '" . $random . "%')
                .removeClass('progress-bar-danger progress-bar-success progress-bar-info progress-bar-warning')
                .addClass('progress-bar-" . $progbar_color . "'); 
        $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val_big')
                .html('" . $random . " KG')
                .removeClass('label-danger label-info label-warning label-success')
                .addClass('label-" . $progbar_color . "');";
}
?>
    });

    $('#ingredientes_villaflora_btn_big').click(function () { ///////////////////////////////////////////////VILLAFLORA BIG
<?php
$select_ingredientes_list = "SELECT * FROM ingrediente";
$result_ingredientes_list = mysqli_query($conn, $select_ingredientes_list);
while ($row_ingredientes_list = mysqli_fetch_array($result_ingredientes_list)) {

    $random = mt_rand(0, 100);
    if ($random <= 24) {
        $progbar_color = 'danger';
    } elseif ($random >= 25 && $random <= 49) {
        $progbar_color = 'warning';
    } elseif ($random >= 50 && $random <= 74) {
        $progbar_color = 'info';
    } elseif ($random >= 75 && $random <= 100) {
        $progbar_color = 'success';
    }
    echo "$('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_bar_big')
                .css('width', '" . $random . "%')
                .removeClass('progress-bar-danger progress-bar-success progress-bar-info progress-bar-warning')
                .addClass('progress-bar-" . $progbar_color . "'); 
        $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val_big')
                .html('" . $random . " KG')
                .removeClass('label-danger label-info label-warning label-success')
                .addClass('label-" . $progbar_color . "');";
}
?>
    });

    $('#ingredientes_quitonorte_btn_big').click(function () { ///////////////////////////////////////////////QUITO NORTE BIG
<?php
$select_ingredientes_list = "SELECT * FROM ingrediente";
$result_ingredientes_list = mysqli_query($conn, $select_ingredientes_list);
while ($row_ingredientes_list = mysqli_fetch_array($result_ingredientes_list)) {

    $random = mt_rand(0, 100);
    if ($random <= 24) {
        $progbar_color = 'danger';
    } elseif ($random >= 25 && $random <= 49) {
        $progbar_color = 'warning';
    } elseif ($random >= 50 && $random <= 74) {
        $progbar_color = 'info';
    } elseif ($random >= 75 && $random <= 100) {
        $progbar_color = 'success';
    }
    echo "$('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_bar_big')
                .css('width', '" . $random . "%')
                .removeClass('progress-bar-danger progress-bar-success progress-bar-info progress-bar-warning')
                .addClass('progress-bar-" . $progbar_color . "'); 
        $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val_big')
                .html('" . $random . " KG')
                .removeClass('label-danger label-info label-warning label-success')
                .addClass('label-" . $progbar_color . "');";
}
?>
    });
</script>
<script type='text/javascript'>
//////////////////**************************************************        VENTAS DIARIAS VILLAFLORA
<?php
$select_ventasdiariasVF = "SELECT SUM(totalFactura),COUNT(idFactura) FROM factura WHERE idEstablecimiento = '2' AND fechaFactura = '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
$result_ventasdiariasVF = mysqli_query($conn, $select_ventasdiariasVF);
$row_ventasdiariasVF = mysqli_fetch_array($result_ventasdiariasVF);
?>
    $(".ventdia_villaflora").html("<?php echo $row_ventasdiariasVF[0]; ?>");
    $('.ventdia_villaflora').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'easeOutExpo',
            step: function (now) {
                $(this).text(Math.ceil(now * 100) / 100);
            }
        });
    });

/////////////////********************************************************* VENTAS DIARIAS QUITO NORTE
<?php
$select_ventasdiariasQN = "SELECT SUM(totalFactura),COUNT(idFactura) FROM factura WHERE idEstablecimiento = '3' AND fechaFactura = '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
$result_ventasdiariasQN = mysqli_query($conn, $select_ventasdiariasQN);
$row_ventasdiariasQN = mysqli_fetch_array($result_ventasdiariasQN);
?>
    $(".ventdia_quitonorte").html("<?php echo $row_ventasdiariasQN[0]; ?>");
    $('.ventdia_quitonorte').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 5000,
            easing: 'easeOutExpo',
            step: function (now) {
                $(this).text(Math.ceil(now * 100) / 100);
            }
        });
    });

/////////////************************************************************** VENTAS DIARIAS QUITO SUR
<?php
$select_ventasdiariasQS = "SELECT SUM(totalFactura),COUNT(idFactura) FROM factura WHERE idEstablecimiento = '3' AND fechaFactura = '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
$result_ventasdiariasQS = mysqli_query($conn, $select_ventasdiariasQS);
$row_ventasdiariasQS = mysqli_fetch_array($result_ventasdiariasQS);
?>
    $(".ventdia_quitosur").html("<?php echo $row_ventasdiariasQS[0]; ?>");
    $('.ventdia_quitosur').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 6000,
            easing: 'easeOutExpo',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
</script>
<script type='text/javascript'>
/////////////////////////////////////////////////////////////////////////////////////////ACTUALIZO EL SIDEBAR DEPENDIENDO DEL WIDGET CLICKEADO
///////////////////////////////////////////////VILLAFLORA
<?php
////////////////////////////////////////////////////////////////////////////CALCULAR LOS MONTOS POR SEMANA
$week = date('Y-m-d', strtotime(date('Y-m-d') . ' -1 week'));

$select_ventassemanaVF = "SELECT SUM(totalFactura),COUNT(idFactura) FROM factura WHERE idEstablecimiento = '2' AND fechaFactura BETWEEN '" . $week . "' AND '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
$result_ventassemanaVF = mysqli_query($conn, $select_ventassemanaVF);
$row_ventassemanaVF = mysqli_fetch_array($result_ventassemanaVF);

$select_ventassemanaQN = "SELECT SUM(totalFactura),COUNT(idFactura) FROM factura WHERE idEstablecimiento = '3' AND fechaFactura BETWEEN '" . $week . "' AND '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
$result_ventassemanaQN = mysqli_query($conn, $select_ventassemanaQN);
$row_ventassemanaQN = mysqli_fetch_array($result_ventassemanaQN);

$select_ventassemanaQS = "SELECT SUM(totalFactura),COUNT(idFactura) FROM factura WHERE idEstablecimiento = '1' AND fechaFactura BETWEEN '" . $week . "' AND '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
$result_ventassemanaQS = mysqli_query($conn, $select_ventassemanaQS);
$row_ventassemanaQS = mysqli_fetch_array($result_ventassemanaQS);

////////////////////////////////////////////////////////////////////////////CALCULAR LOS MONTOS POR MES
$month = date('Y-m-d', strtotime(date('Y-m-d') . ' -1 month'));

$select_ventasmesVF = "SELECT SUM(totalFactura),COUNT(idFactura) FROM factura WHERE idEstablecimiento = '2' AND fechaFactura BETWEEN '" . $month . "' AND '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
$result_ventasmesVF = mysqli_query($conn, $select_ventasmesVF);
$row_ventasmesVF = mysqli_fetch_array($result_ventasmesVF);

$select_ventasmesQN = "SELECT SUM(totalFactura),COUNT(idFactura) FROM factura WHERE idEstablecimiento = '3' AND fechaFactura BETWEEN '" . $month . "' AND '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
$result_ventasmesQN = mysqli_query($conn, $select_ventasmesQN);
$row_ventasmesQN = mysqli_fetch_array($result_ventasmesQN);

$select_ventasmesQS = "SELECT SUM(totalFactura),COUNT(idFactura) FROM factura WHERE idEstablecimiento = '1' AND fechaFactura BETWEEN '" . $month . "' AND '" . date("Y-m-d") . "' AND statusFactura = 'ACTIVE'";
$result_ventasmesQS = mysqli_query($conn, $select_ventasmesQS);
$row_ventasmesQS = mysqli_fetch_array($result_ventasmesQS);
?>
    $('#villaflora_sidebar').click(function () {
        $('#title_resumen_ingresos').html("Villaflora");
        $('#title_resumen_ingresos').val("2");
        $('#sidebar_ingresosdeldia').val("$ <?php if ($row_ventasdiariasVF[0] == 0) {    echo "0";} else {    echo $row_ventasdiariasVF[0];} ?>");
        $('#sidebar_ingresosdeldia_pedidos').html("<?php if ($row_ventasdiariasVF[1] == 0) {    echo "0";} else {    echo $row_ventasdiariasVF[1];} ?> pedidos facturados");
        $('#sidebar_ingresossemana').val("$ <?php if ($row_ventassemanaVF[0] == 0) {    echo "0";} else {    echo $row_ventassemanaVF[0];} ?>");
        $('#sidebar_ingresossemana_pedidos').html("<?php if ($row_ventassemanaVF[1] == 0) {    echo "0";} else {    echo $row_ventassemanaVF[1];} ?> pedidos facturados");
        $('#sidebar_ingresosdelmes').val("$ <?php if ($row_ventasmesVF[0] == 0) {    echo "0";} else {    echo number_format($row_ventasmesVF[0], 2, '.', '');} ?>");
        $('#sidebar_ingresosdelmes_pedidos').html("<?php if ($row_ventasmesVF[1] == 0) {    echo "0";} else {    echo $row_ventasmesVF[1];} ?> pedidos facturados");
        $('#sidebar_listado_empleados').html("");
        $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-online\"></div><img src=\"assets/images/users/user2.jpg\" class=\"pull-left\" alt=\"Manuel Su&aacute;rez\"><span class=\"contacts-title\">Manuel Su&aacute;rez</span><p>Mesero</p></a>");
        $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-online\"></div><img src=\"assets/images/users/user.jpg\" class=\"pull-left\" alt=\"Luis Cordero\"><span class=\"contacts-title\">Luis Cordero</span><p>Mesero</p></a>");
        $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-away\"></div><img src=\"assets/images/users/user3.jpg\" class=\"pull-left\" alt=\"Andreina Jaramillo\"><span class=\"contacts-title\">Andreina Jaramillo</span><p>Mesera</p></a>");
        $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-offline\"></div><img src=\"assets/images/users/user7.jpg\" class=\"pull-left\" alt=\"Daniel Tamayo\"><span class=\"contacts-title\">Daniel Tamayo</span><p>Cajero</p></a>");
        $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-away\"></div><img src=\"assets/images/users/user8.jpg\" class=\"pull-left\" alt=\"Elisa Ramirez\"><span class=\"contacts-title\">Elisa Ramirez</span><p>Mesera</p></a>");
        $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-away\"></div><img src=\"assets/images/users/user9.jpg\" class=\"pull-left\" alt=\"Angela Coruña\"><span class=\"contacts-title\">Angela Coruña</span><p>Mesera</p></a> ");
        $('#sidebar_img_rest').html(" ");
        $('#sidebar_img_info').html(" ");
        $('#sidebar_img_rest').append("<img style=\"width: 100%;height: 100%;\" src=\"img/locales/sucursal-villaflora-dirulo.png\" />");
        $('#sidebar_img_info').append("<img style=\"width: 100%;height: 100%;\" src=\"img/locales/sucursal-villaflora-dirulo.jpg\" />");
    });
</script>

<script type='text/javascript'>
    ////////////////////////////////////////////////////////////////////////////REPORTE DE VENTAS DIARIAS
    $(document).on('click', '#sidebar_ingresosdeldia', function () {
        var establecimiento = $("#title_resumen_ingresos").val();
        var ventasde = 1; /////////////// 1: ventas del dia, 2:ventas de la semaa, 3: ventas del mes
        $.ajax({
            url: 'assets/dashboard/dashboard_controller.php',
            type: 'POST',
            data: {
                reportedeventas: establecimiento,
                reportede: ventasde,
            },
            success: function (html) {
                $("#reporte_ventas tbody").html(html);
//                dt = $('#reporte_ventas').dataTable().api();
//                dt.clear().draw();
//                dt.rows.add(html); // Add new data
//                dt.columns.adjust().draw(); // Redraw the DataTable
            },
            error: function (error) {
                console.log('Disculpe, existió un problema');
                console.log(error);
            },
            complete: function (xhr, status) {
                console.log('Petición realizada');
            }
        });        
        $('#dashboard_modal').modal('toggle');
    });
    ////////////////////////////////////////////////////////////////////////////REPORTE DE VENTAS SEMANALES
    $(document).on('click', '#sidebar_ingresossemana', function () {
        var establecimiento = $("#title_resumen_ingresos").val();
        var ventasde = 2; /////////////// 1: ventas del dia, 2:ventas de la semaa, 3: ventas del mes
        $.ajax({
            url: 'assets/dashboard/dashboard_controller.php',
            type: 'POST',
            data: {
                reportedeventas: establecimiento,
                reportede: ventasde,
            },
            success: function (html) {
                $("#reporte_ventas tbody").html(html);
            },
            error: function (error) {
                console.log('Disculpe, existió un problema');
                console.log(error);
            },
            complete: function (xhr, status) {
                console.log('Petición realizada');
            }
        });
        $('#dashboard_modal').modal('toggle');
    });
    ////////////////////////////////////////////////////////////////////////////REPORTE DE VENTAS MENSUALES
    $(document).on('click', '#sidebar_ingresosdelmes', function () {
        var establecimiento = $("#title_resumen_ingresos").val();
        var ventasde = 3; /////////////// 1: ventas del dia, 2:ventas de la semaa, 3: ventas del mes
        $.ajax({
            url: 'assets/dashboard/dashboard_controller.php',
            type: 'POST',
            data: {
                reportedeventas: establecimiento,
                reportede: ventasde,
            },
            success: function (html) {
                $("#reporte_ventas tbody").html(html);
            },
            error: function (error) {
                console.log('Disculpe, existió un problema');
                console.log(error);
            },
            complete: function (xhr, status) {
                console.log('Petición realizada');
            }
        });
        $('#dashboard_modal').modal('toggle');
    });
</script>