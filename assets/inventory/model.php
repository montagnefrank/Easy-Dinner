<script type='text/javascript'>

    //////////////////////////////// CUANDO PRESIONAMOS CLIC EN EL BOTON DE AGREGAR NUEVO INGREDIENTE
    $(document).on('click', '.addnew_ing_btn', function (e) {
        e.preventDefault();
        var self;
        self = this;
        $.when($(".ingredientes_lista,.editing_panel").slideUp("slow")).then(function () {
            $(".agregarnuevo_panel").slideDown("slow");
        });
    });

    //////////////////////////////// ACCION AL HACER CLIC EN GUARDAR NEUVO INGREDIENTE
    $(document).on('click', '.savenew_btn', function (e) {
        e.preventDefault();
        var self = this, formData = new FormData(), est;
        pageLoadingFrame("show");
        setTimeout(function () {
            if (
                    $('#guardarIngrediente').valid() &&
                    $('#unidadselect_new,#tiposelect_new,#estselect_new').val() != '0'
                    )
            {
                est = $('#estselect_new').val();
                formData.append('addnewing', 'true');
                formData.append('nombreIngrediente', $('#nombre_new').val());
                formData.append('cantidad', $('#cantidad_new').val());
                formData.append('codigoIngrediente', $('#codigo_new').val());
                formData.append('barcodeIngrediente', $('#barcode_new').val());
                formData.append('unidadIngrediente', $('#unidadselect_new option:selected').val());
                formData.append('tipoIngrediente', $('#tiposelect_new option:selected').val());
                formData.append('ccIngrediente', $('#cuneta_new').val());
                formData.append('detalleIngrediente', $('#detalle_new').val());
                formData.append('bodegaIngrediente', $('#bodega_new').val());
                formData.append('minIngrediente', $('#minimo_new').val());
                formData.append('maxIngrediente', $('#maximo_new').val());
                formData.append('precioIngrediente', $('#precioventa_new').val());
                formData.append('compraIngrediente', $('#preciocompra_new').val());
                formData.append('establecimiento', est);
                if ($("#estado_checkbox").prop('checked') == true) {
                    formData.append('estadoIngrediente', '1');
                } else {
                    formData.append('estadoIngrediente', '0');
                }
                $.ajax({
                    url: 'assets/inventory/control.php',
                    type: 'POST',
                    data: formData,
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 'ok') {
                            pageLoadingFrame("hide");
                            $('.succesmessage_mb').html(data.msg);
                            $('#message-box-success').toggle();
                            $('input[type="text"] , select').val('');
                            console.log(data);
                        }
                        if (data.status == 'error') {
                            pageLoadingFrame("hide");
                            $('.errormessage_mb').html(data.msg);
                            $('#message-box-danger').toggle();
                            console.log(data);
                        }
                    },
                    error: function (error) {
                        pageLoadingFrame("hide");
                        $('.errormessage_mb').html('Error de red, revise su conexi&oacute;n');
                        $('#message-box-danger').toggle();
                        console.log(error);
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            } else {
                pageLoadingFrame("hide");
                $('.errormessage_mb').html('Debe ingresar la informaci&oacute;n en todos los campos');
                $('#message-box-danger').toggle();
            }
        }, 1000);
    });

    //////////////////////////////////// CUANDO QUEREMOS REGRESAR A VER LA LISTA DE INGREDIENTES
    $(document).on('click', '.goback_ing_btn', function (e) {
        e.preventDefault();
        var self;
        self = this;
        $.when($(".agregarnuevo_panel,.editing_panel").slideUp("slow")).then(function () {
            $(".ingredientes_lista").slideDown("slow");
        });
    });

    //////////////////////////////////// DESHABILITAMOS EL SELECT DE EDITAR ESTABLECIMIENTO
    $(document).on('click', '.estselectcontainer', function (e) {
        e.preventDefault();
    });

    ///////////////////////////////////////////////////////////////////// CUANDO HACES CLIC EN UNA COLUMNA PARA EDITAR EL INGREDIENTE
    $(document).on('click', '.singleing_row', function (e) {
        e.preventDefault();
        var self = this,
                nombre = $(self).find(".ing_nombreproducto").html(),
                cantidad = $(self).find(".ing_cantidad").val(),
                codigo = $(self).find(".ing_codigo").html(),
                codebar = $(self).find(".ing_barcode").val(),
                unidad = $(self).find(".ing_unidad").html(),
                tipo = $(self).find(".ing_tipo").html(),
                cuentacont = $(self).find(".ing_cuentacontable").val(),
                detalle = $(self).find(".ing_detalle").val(),
                bodega = $(self).find(".ing_bodega").val(),
                min = $(self).find(".ing_min").val(),
                max = $(self).find(".ing_max").val(),
                venta = $(self).find(".ing_precio").html(),
                compra = $(self).find(".ing_compra").val(),
                estado = $(self).find(".ing_status").val(),
                unidadtext = $("#unidadselect_edit option[value='" + unidad + "']").text(),
                tipotext = $("#tiposelect_edit option[value='" + tipo + "']").text(),
                establecimiento = $("#selected_dinner").val(),
                esttext = $("#estselect_edit option[value='" + establecimiento + "']").text();

        $.when($(".agregarnuevo_panel,.ingredientes_lista").slideUp("slow")).then(function () {
            // Asignacion de valores a ingrediente 
            $("#nombre_edit").val(nombre);
            $("#cantidad_edit").val(cantidad);
            $("#codigo_edit").val(codigo);
            $("#barcode_edit").val(codebar);
            $('#unidadselect_edit').parent().find(' .bootstrap-select .filter-option').text(unidadtext);
            $("#unidadselect_edit").val(unidad);
            $('#tiposelect_edit').parent().find(' .bootstrap-select .filter-option').text(tipotext);
            $("#tiposelect_edit").val(unidad);
            $("#cuneta_edit").val(cuentacont);
            $("#detalle_edit").val(detalle);
            $("#bodega_edit").val(bodega);
            $("#minimo_edit").val(min);
            $("#maximo_edit").val(max);
            $("#precioventa_edit").val(venta);
            $("#preciocompra_edit").val(compra);
//            $(".estnombre_edit").html("Cambio de EStablecimiento");
//            $("#establecimiento_edit").html(establecimiento);
            
            $('#estselect_edit').parent().find(' .bootstrap-select .filter-option').text(esttext);
            $("#estselect_edit").val(establecimiento);
            if (estado == 1) {
                $('#estado_checkbox_edit').attr("checked", "checked");
            } else {
                $('#estado_checkbox_edit').removeAttr("checked");
            }
            //////////////////////////////////////////////////status
            $(".editing_panel").slideDown("slow");

        });
    });

    ////////////////////////////////////////////////// PARA CAMBIAR EL LISTADO A QUITO SUR
    $(document).on('click', '#ingredientes_quitosur_btn', function (e) {
        $.when(
                $("#ingredientes_graph_peq").slideUp("slow")
                ).then(function (e) {
<?php
$select_ingredientes_list = "SELECT * FROM ingrediente";
$result_ingredientes_list = $conn->query($select_ingredientes_list) or die($conn->error);
while ($row_ingredientes_list = $result_ingredientes_list->fetch_array(MYSQLI_ASSOC)) {
    $random = $row_ingredientes_list['cantidad1'];
    if ($random <= 24) {
        $progbar_color = 'danger';
    } elseif ($random >= 25 && $random <= 49) {
        $progbar_color = 'warning';
    } elseif ($random >= 50 && $random <= 74) {
        $progbar_color = 'info';
    } elseif ($random >= 75 && $random <= 100) {
        $progbar_color = 'success';
    }
    echo "
            $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val')
                    .html('" . $random . "')
                    .removeClass('label-danger label-info label-warning label-success')
                    .addClass('label-" . $progbar_color . "'); 
            
            $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_cant')
                    .val('" . $random . "');
             ";
}
?>
            $("#selected_dinner").val("1");
            $("#ingredientes_graph_peq").slideDown("slow");
        });
    });

    ////////////////////////////////////////////////// PARA CAMBIAR EL LISTADO A VILLAFLORA
    $(document).on('click', '#ingredientes_villaflora_btn', function (e) {
        $.when(
                $("#ingredientes_graph_peq").slideUp("slow")
                ).then(function (e) {
<?php
$select_ingredientes_list = "SELECT * FROM ingrediente";
$result_ingredientes_list = $conn->query($select_ingredientes_list) or die($conn->error);
while ($row_ingredientes_list = $result_ingredientes_list->fetch_array(MYSQLI_ASSOC)) {
    $random = $row_ingredientes_list['cantidad2'];
    if ($random <= 24) {
        $progbar_color = 'danger';
    } elseif ($random >= 25 && $random <= 49) {
        $progbar_color = 'warning';
    } elseif ($random >= 50 && $random <= 74) {
        $progbar_color = 'info';
    } elseif ($random >= 75 && $random <= 100) {
        $progbar_color = 'success';
    }
    echo "
                    $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val')
                            .html('" . $random . "')
                            .removeClass('label-danger label-info label-warning label-success')
                            .addClass('label-" . $progbar_color . "'); 
            
            $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_cant')
                    .val('" . $random . "');
             ";
}
?>
            $("#selected_dinner").val("2");
            $("#ingredientes_graph_peq").slideDown("slow");
        });
    });

    ////////////////////////////////////////////////// PARA CAMBIAR EL LISTADO A COTOCOLLAO
    $(document).on('click', '#ingredientes_quitonorte_btn', function (e) {
        $.when(
                $("#ingredientes_graph_peq").slideUp("slow")
                ).then(function (e) {
<?php
$select_ingredientes_list = "SELECT * FROM ingrediente";
$result_ingredientes_list = $conn->query($select_ingredientes_list) or die($conn->error);
while ($row_ingredientes_list = $result_ingredientes_list->fetch_array(MYSQLI_ASSOC)) {
    $random = $row_ingredientes_list['cantidad3'];
    if ($random <= 24) {
        $progbar_color = 'danger';
    } elseif ($random >= 25 && $random <= 49) {
        $progbar_color = 'warning';
    } elseif ($random >= 50 && $random <= 74) {
        $progbar_color = 'info';
    } elseif ($random >= 75 && $random <= 100) {
        $progbar_color = 'success';
    }
    echo "
                    $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val')
                            .html('" . $random . "')
                            .removeClass('label-danger label-info label-warning label-success')
                            .addClass('label-" . $progbar_color . "'); 
            
            $('#ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_cant')
                    .val('" . $random . "');
             ";
}
?>
            $("#selected_dinner").val("3");
            $("#ingredientes_graph_peq").slideDown("slow");
        });
    });
    
    //////////////////////////////// ACCION AL HACER CLIC EN ACTUALIZAR INGREDIENTE
    $(document).on('click', '.saveedit_btn', function (e) {
        e.preventDefault();
        var self = this, formData = new FormData(), est;
        pageLoadingFrame("show");
        setTimeout(function () {
            if (
                    $('#editarIngrediente').valid() &&
                    $('#unidadselect_edit,#tiposelect_edit,#estselect_edit').val() != '0'
                    )
            {
                est = $('#estselect_edit').val();
                formData.append('editIng', 'true');
                formData.append('nombreIngrediente', $('#nombre_edit').val());
                formData.append('cantidad', $('#cantidad_edit').val());
                formData.append('codigoIngrediente', $('#codigo_edit').val());
                formData.append('barcodeIngrediente', $('#barcode_edit').val());
                formData.append('unidadIngrediente', $('#unidadselect_edit option:selected').val());
                formData.append('tipoIngrediente', $('#tiposelect_edit option:selected').val());
                formData.append('ccIngrediente', $('#cuneta_edit').val());
                formData.append('detalleIngrediente', $('#detalle_edit').val());
                formData.append('bodegaIngrediente', $('#bodega_edit').val());
                formData.append('minIngrediente', $('#minimo_edit').val());
                formData.append('maxIngrediente', $('#maximo_edit').val());
                formData.append('precioIngrediente', $('#precioventa_edit').val());
                formData.append('compraIngrediente', $('#preciocompra_edit').val());
                formData.append('establecimiento', est);
                if ($("#estado_checkbox_edit").prop('checked') == true) {
                    formData.append('estadoIngrediente', '1');
                } else {
                    formData.append('estadoIngrediente', '0');
                }
                $.ajax({
                    url: 'assets/inventory/control.php',
                    type: 'POST',
                    data: formData,
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 'ok') {
                            pageLoadingFrame("hide");
                            $('.succesmessage_mb').html(data.msg);
                            $('#message-box-success').toggle();
                            $('input[type="text"] , select').val('');
                            console.log(data);
                        }
                        if (data.status == 'error') {
                            pageLoadingFrame("hide");
                            $('.errormessage_mb').html(data.msg);
                            $('#message-box-danger').toggle();
                            console.log(data);
                        }
                    },
                    error: function (error) {
                        pageLoadingFrame("hide");
                        $('.errormessage_mb').html('Error de red, revise su conexi&oacute;n');
                        $('#message-box-danger').toggle();
                        console.log(error);
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            } else {
                pageLoadingFrame("hide");
                $('.errormessage_mb').html('Debe ingresar la informaci&oacute;n en todos los campos');
                $('#message-box-danger').toggle();
            }
        }, 1000);
    });
</script>