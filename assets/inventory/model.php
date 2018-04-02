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
            if ($('#guardarIngrediente').valid()) {
                $.ajax({
                    url: 'assets/inventory/control.php',
                    type: 'POST',
                    data: formData,
                    success: function (data) {

                        console.log('AJAX exitoso');
                        console.log(data);
                    },
                    error: function (error) {
                        pageLoadingFrame("hide");
                        $('.errormessage_mb').html('Error de red, revise su conexi&oacute;n');
                        $('#message-box-danger').toggle();
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