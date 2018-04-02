$(document).ready(function () {
    asignaPedidosCocina();
    asignaPedidosPorCancelar();
    pedidoscancelados();
});

$(document).on('click', '.Pedido', function () {

    var idmesa = $(this).find(".idmesa").html();
    var idpedido = $(this).find(".idpedido").html();
    var numeromesa = $(this).find(".numeromesa").html();

    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/mesas/asignaMesa.php',
        type: 'POST',
        data: {
            idmesa: idmesa,
            numeromesa: numeromesa,
            idpedido: idpedido,
        },
        success: function (html) {
            window.location.replace("index.php?panel=factura.php");
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
function asignaPedidosCocina() {
    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/caja/pedidoscocina.php',
        type: 'POST',
        dataType: "json",
        data: {
            cocina: "true",
        },
        success: function (html) {
            $("#pedidosCocina").html(html.pedidos);
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
function asignaPedidosPorCancelar() {
    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/caja/pedidosporcancelar.php',
        type: 'POST',
        success: function (html) {
            $("#pedidosPorCancelar").html(html);
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
function pedidoscancelados() {
    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/caja/pedidoscancelados.php',
        type: 'POST',
        success: function (html) {
            $("#pedidoscancelados").html(html);
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
////////////////////////////////////////////////////////////////////////////ACTIVAMOS EL EVENTO DEL BUSCADOR DE FACTURAS
$("#search_pedidos").keyup(function (e) {
    var code = e.which;
    if (code == 13)
        e.preventDefault();
    if (code == 32 || code == 13 || code == 188 || code == 186) {
        var inputvalue = $("#search_pedidos").val();
        inputvalue = inputvalue.split(': ');
        if (inputvalue[3] == null) {
            $('#modal_consultar_factura .modal-dialog .modal-content .modal-header .modal-title').html('<i class="fa fa-exclamation-circle"></i> Alerta</h4>');
            $('#modal_consultar_factura .modal-dialog .modal-content .modal-body').html('<p></p>');
            $('#modal_consultar_factura .modal-dialog .modal-content .modal-body p').html('No se ha seleccionado ninguna factura para mostrar');
            $('#modal_consultar_factura').modal('toggle');
        } else {
            var idfactura = inputvalue[1].split(' - ');
            window.location.href = "index.php?panel=caja.php&verfactura=" + idfactura[0];
        }
    }
});
////////////////////////////////////////////////////////////////////////////FUNCION PARA MOSTRAR EL PEDIDO INGRESADA
function consultarpeddo(idpedido) {
    $.ajax({
        url: 'assets/factura/consultaProductos.php',
        type: 'POST',
        data: {
            idpedido: idpedido,
        },
        success: function (html) {
            $(".tablaconsultarfactura").html(html);
            $(".consultafacturatabla tr:even").css("background-color", "rgba(169, 169, 169, 0.45)");
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
////////////////////////////////////////////////////////////////////////////FUNCION PARA MOSTRAR LA FACTURA INGRESADA
function consultarfactura(idfactura) {
    $.ajax({
        url: 'assets/caja/consultafactura.php',
        type: 'POST',
        data: {
            idfactura: idfactura,
        },
        success: function (html) {
            $("#verfactura_datos").html(html);
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
////////////////////////////////////////////////////////////////////////////////MANDAMOS LA FACTURA A PDF
function exporttopdftable() {
    //    $('.tablaDescripcion table').tableExport({type:'pdf',escape:'false'});
    var output = "";
    output += "<tr><td> =========================================== <br /></td></tr> \n\ ";
    output += "<tr><td> PRODUCTO        | CANT | V.UNIT. | V.TOTAL <br/></td></tr> \n\ ";
    output += "<tr><td> =========================================== <br /></td></tr> \n\ ";
    $(".consultafacturatabla tr").each(function () {
        if ($(this).find('td:eq(0)').length > 0) {
            output += " <tr><td> ";
            output += $(this).find('td:eq(0) strong').html();
            output += " | ";
            output += $(this).find('td:eq(1)').html();
            output += " | ";
            output += $(this).find('td:eq(2)').html();
            output += " | ";
            output += $(this).find('td:eq(3) span').html();
            output += " <br /> \n\ </td></tr>";
        }
    });
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    output += "<tr><td> SUBTOTAL: " + $(".verfactura_subtotal").html() + " <br /></td></tr> \n\ ";
    output += "<tr><td> IVA: " + $(".verfactura_iva").html() + " <br /></td></tr> \n\ ";
    output += "<tr><td> TOTAL: " + $(".verfactura_total").html() + " <br /></td></tr> \n\ ";
//    output += "<tr><td> MESA : " + numeromesa + "<br /></td></tr> \n\ ";
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    output += "<tr><td> ====== GRACIAS POR SU VISITA ====== <br /></td></tr> \n\ ";
    var date = new Date();
    days = parseInt(2);
    var day = date.getDate();
    var month = date.getMonth();
    month = month + 1;
    var year = date.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    $.ajax({
        url: 'assets/factura/getMesaPedido.php',
        dataType: "json",
        success: function (msg) {
            var name = $(".verfactura_nombrecliente").html();
            var ruc = $(".verfactura_ruc").html();
            var namesplit = name.split('>');
            var rucsplit = ruc.split('>');
            $("#facturaimpresa tbody").append("<tr><td> Local: PIZZERIA DIRULO VILLAFLORA | Ruc: 1734230049001 Tel&eacute;fono: ########## </td></tr>");
            $("#facturaimpresa tbody").append("<tr><td> Fecha: " + $(".verfactura_fecha").html() + " </td></tr>");
            $("#facturaimpresa tbody").append("<tr><td> Factura #: " + $(".verfactura_numero").html() + " </td></tr>");
            $("#facturaimpresa tbody").append("<tr><td> Cliente:" + namesplit[2] + "</td></tr>");
            $("#facturaimpresa tbody").append("<tr><td> Ruc:" + rucsplit[2] + "</td></tr>");
            $("#facturaimpresa tbody").append("" + output + "")
            $('#facturaimpresa').css("display", "block");
            $('#facturaimpresa').tableExport({type: 'pdf', escape: 'false'});
            $('#facturaimpresa tbody').html("");
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
/////////////////////////////////////////////////////////////////////////////DEBUG VENTANAMODAL DE FACTURAS
//$(document).on('click', '#showmodal', function () {
//    $('#modal_consultar_factura').modal('toggle');
//});

////////////////////////////////////////////////////////////////////////////////imprimir pedido
$(document).on('click', '.pedido_imprimir', function (e) {
    if (!e)
        var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation)
        e.stopPropagation();
    e.preventDefault();
    var mesa_nro = $(this).parent().parent().find(".numeromesa").html();
    if (mesa_nro == "999") {
        mesa_nro = "Domicilio";
    }
    var pedido_nro = $(this).parent().parent().find(".idpedido").html();
    var output = "";
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    output += "<tr><td> Mesa # " + mesa_nro + "  <br /></td></tr> \n\ ";
    output += "<tr><td> Pedido # " + pedido_nro + " <br /></td></tr> \n\ ";
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/caja/pedidoscocina.php',
        type: 'POST',
        dataType: "json",
        data: {
            cocina: "print",
            pedido: pedido_nro,
        },
        success: function (html) {
            output += " " + html.pedidos + " ";
            console.log("PEDIDO: " + output);
            output += "<tr><td> ======================== <br /></td></tr> \n\ ";
            $("body").append("<table id='pedido_imprimir'><tbody> " + output + " </tbody></table>");
            $('#pedido_imprimir').tableExport({type: 'pdf', escape: 'false'});
            $('#pedido_imprimir').remove();
            console.log(output);
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
