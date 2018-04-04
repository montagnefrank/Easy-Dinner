<script type='text/javascript'>

    $(document).on('click', '.addnew_ing_btn', function (e) {
        e.preventDefault();
        var self;
        self = this;
        $.when($(".ingredientes_lista,.editing_panel").slideUp("slow")).then(function () {
            $(".agregarnuevo_panel").slideDown("slow");
        });
    });

    $(document).on('click', '.savenew_btn', function (e) {
        e.preventDefault();
        var self = this;
        pageLoadingFrame("show");
        setTimeout(function () {
            if (
                    $('#guardarIngrediente').valid() &&
                    $('#unidadselect_new,#tiposelect_new').val() != '0'
                    )
            {
                var formData = new FormData();
                formData.append('addnewing', 'true');
                formData.append('nombreIngrediente', $('#nombre_new').val());
                formData.append('cantidadIngrediente', $('#cantidad_new').val());
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

    $(document).on('click', '.goback_ing_btn', function (e) {
        e.preventDefault();
        var self;
        self = this;
        $.when($(".agregarnuevo_panel,.editing_panel").slideUp("slow")).then(function () {
            $(".ingredientes_lista").slideDown("slow");
        });
    });

    $(document).on('click', '.singleing_row', function (e) {
        e.preventDefault();
        var self;
        self = this;
        $.when($(".agregarnuevo_panel,.ingredientes_lista").slideUp("slow")).then(function () {
            $(".editing_panel").slideDown("slow");
            console.log(self);

            // guardo los valores en variables..
            var producto = $("td.producto").html(),
                    codigo = $("td.codigo").html(),
                    precio = $("td.precio").html(),
                    unidad = $("td.unidad").html(),
                    fecha = $("td.fecha").html(),
                    tipo = $("td.tipo").html(),
                    cantidad = $("td.cantidad .label-info").html(),
                    estado = $("td.estado").html();

            // Asignacion de valores a ingrediente 
            $("#nombre_edit").val(producto);
            $("#codigo_edit").val(codigo);
            $("#precio_edit").val(precio);
            $("#unidad_edit").val(unidad);
            $("#fecha_edit").val(fecha);
            $("#tipo_edit").val(tipo);
            $("#estado_edit").val(estado);
            $("#cantidad_edit").val(cantidad);

            console.log("estado: " + $("td.estado").html());
            console.log("cantidad: " + $("td.cantidad").html());

        });
    });
</script>