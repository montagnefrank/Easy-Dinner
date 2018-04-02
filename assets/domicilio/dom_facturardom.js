var idMesa,numeroMesa,idPedido,estadoPedido;

$(document).on('click', '.modal_facturarpedido_btn', function () {
    resumenfactura();
});

////////////////////////////////////////////////////////////////////////////////VENTANA MODAL CON EL RESUMEN DE LA FACTURA
function resumenfactura() {

    $(".tituloFactura").html("Factura de Pedido # "+idPedido +" (DOMICILIO)");

    $("#factura_checkout").modal("show");
    $.ajax({
        url: 'assets/factura/resumenfacturadom.php',
        type: 'POST',
        data: {
            idpedido: idPedido,
        },
        success: function (html) {

            $("#factura_checkout .modal-dialog .modal-content .modal-body").html(html);
            //$("#resumen_nombrecliente").html("<span class='fa fa-user'></span> " + $("#nombre_cliente").val());
            if (numeroMesa != '999') {
                $(".resumen_numeromesa").html("<span class='fa fa-thumb-tack'></span> Mesa " + numeroMesa);
            } else {
                $(".resumen_numeromesa").html("<span class='fa fa-thumb-tack'></span> Domicilio");
            }
            $(".resumen_numeromesa").html("<span class='fa fa-thumb-tack'></span> Mesa " + numeroMesa);
            $(".resumen_numerodepedido").html("Pedido # <span id='id_pedido'>" + idPedido + "</span>");
            $(".resumen_subtotal").html($(".subtotalFactura").html());
            var descuento = $("#descuento_factura").val();
            if (descuento === "") {
                $(".resumen_descuento").html("$0.00" + descuento);
            } else {
                $(".resumen_descuento").html("$" + descuento);
            }
            $(".resumen_iva").html($(".ivaFactura").html());
            var pagadocon = "";
            $("#payment_methods_table input[type=checkbox]").each(function () {/////////////VALIDAMOS QUE NO EXISTAN CAMPOS VACIOS EN LOS METODOS DE PAGO
                if ($(this).is(':checked')) {
                    var formadepago = $(this).val();
                    pagadocon += formadepago + "|";
                }
            });
            pagadocon = pagadocon.slice(0, -1);
            $(".resumen_forma_pago").html(pagadocon);
            $(".resumen_totalapagar").html($(".totalapagarFactura").html());
            $(".resumen_vuelto").html($("#monto_devuelto").val());
        },
        error: function (error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log('Petición realizada');
        }
    });
}

////////////////////////////////////////////////////////////////////////////////PREFACTURAR
function prefactura_generar() {

    $.ajax({
        url: 'assets/domicilio/dom_controller.php',
        type: 'POST',
        data: {
            idpedidoFactura: idPedido,
        },
        success: function (factura) {
            console.log("factura");
            console.log(factura);
        },
        error: function (error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log('Petición realizada');
        }
    });

    var output = "";
    output += "<tr><td> ======================================= <br /></td></tr> \n\ ";
    output += "<tr><td> PRODUCTO  | V. UNIT. | CANT |  V. TOTAL <br /></td></tr> \n\ ";
    output += "<tr><td> ======================================= <br /></td></tr> \n\ ";
    //    $(".tablaDescripcion table tr").each(function () {
    //        if ($(this).find('td:eq(0)').length > 0) {
    //            output += " <tr><td> ";
    //            output += $(this).find('td:eq(0) strong').html();
    //            output += " | ";
    //            output += $(this).find('td:eq(1)').html();
    //            output += " | ";
    //            output += $(this).find('td:eq(2)').html();
    //            output += " | ";
    //            output += $(this).find('td:eq(3) span').html();
    //            output += " <br /> \n\ </td></tr>";
    //        }
    //    });
    //    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    //    output += "<tr><td> SUBTOTAL: " + $(".subtotalFactura").html() + " <br /></td></tr> \n\ ";
    //    output += "<tr><td> IVA: " + $(".ivaFactura").html() + " <br /></td></tr> \n\ ";
    //    output += "<tr><td> TOTAL: " + $(".totalapagarFactura").html() + " <br /></td></tr> \n\ ";
    //    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    //    output += "<tr><td> ====== GRACIAS POR SU VISITA ====== <br /></td></tr> \n\ ";
    //    output += "<tr><td> ====== EXIJA SU COMPROBANTE ====== <br /></td></tr> \n\ ";
    //    output += "<tr><td> Nombre: _____________________________ <br /></td></tr> \n\ ";
    //    output += "<tr><td> Direccion: _____________________________ <br /></td></tr> \n\ ";
    //    output += "<tr><td> Telefono: _____________________________ <br /></td></tr> \n\ ";
    //    output += "<tr><td> RUC / CI: _____________________________ <br /></td></tr> \n\ ";
    //    output += "<tr><td> Propina: _____________________________ <br /></td></tr> \n\ ";
    //    output += "<tr><td> Email: _____________________________ <br /></td></tr> \n\ ";
    //    output += "<tr><td> Cumpleaños: _____________________________ <br /></td></tr> \n\ ";
    //    var date = new Date();
    //    days = parseInt(2);
    //    var day = date.getDate();
    //    var month = date.getMonth();
    //    month = month + 1;
    //    var year = date.getFullYear();
    //    if (day < 10) {
    //        day = "0" + day;
    //    }
    //    if (month < 10) {
    //        month = "0" + month;
    //    }
    //    $.ajax({
    //        url: 'assets/factura/getMesaPedido.php',
    //        dataType: "json",
    //        success: function (msg) {
    //            $("#prefacturar tbody").append("<tr><td> Comprobante de Caja </td></tr>");
    //            $("#prefacturar tbody").append("<tr><td> Fecha: " + year + "-" + month + "-" + day + " </td></tr>");
    //            $("#prefacturar tbody").append("<tr><td> Pedido: " + msg.idpedido + " </td></tr>");
    //            if (msg.numeromesa != '999') {
    //                $("#prefacturar tbody").append("<tr><td> Mesa: " + msg.numeromesa + " </td></tr>");
    //            } else {
    //                $("#prefacturar tbody").append("<tr><td> Domicilio </td></tr>");
    //            }
    //            $("#prefacturar tbody").append("" + output + "")
    //            $('#prefacturar').css("display", "block");
    //            $('#prefacturar').tableExport({type: 'pdf', escape: 'false'});
    //            $('#prefacturar tbody').html("");
    //        },
    //        error: function (error) {
    //            console.log('Disculpe, existió un problema');
    //            console.log(error);
    //        },
    //        complete: function (xhr, status) {
    //            console.log('Petición realizada');
    //        }
    //    });

    $("#prefacturar tbody").append("" + output + "")
    $('#prefacturar').css("display", "block");
    $('#prefacturar').tableExport({type: 'pdf', escape: 'false'});
    $('#prefacturar').html("");
    $('#prefacturar').css("display", "none");
}

////////////////////////////////////////////////////////////////////////////VENTANA MODAL DE EDITAR PEDIDO
$(document).on('click', '.estadoPedido', function (e) {

    idMesa = $(this).find(".idMesa").html();
    numeroMesa = $(this).find(".numeroMesa").html();
    idPedido = $(this).find(".idPedido").html();
    estadoPedido = $(this).find(".estadoPedido").html();
    tipoPedido = $(this).find(".tipoPedido").html();


    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/mesas/asignaMesa.php',
        data: {
            idmesa: idMesa,
            numeromesa: numeroMesa,
            idpedido: idPedido
        },
        type: 'POST',
        success: function (idmesa) {
            $("#ModalEstadoPedido").modal("show");
            asignaPedido(idPedido);
            $(".tituloEstadoPedido").html("<center>Pedido # " + idPedido+" - "+tipoPedido);
        },
        error: function (error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log('Petición realizada');
        }
    });
});

function asignaPedido(idpedido) {

    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/mesas/consultaProductos.php',
        type: 'POST',
        data: {
            idpedido: idpedido,
        },
        success: function (pedidos) {
            $(".contenidoEstadoPedido").html(pedidos);
        },
        error: function (error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log('Petición realizada');
        }
    });
}