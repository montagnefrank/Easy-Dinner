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
        success: function (html) {
            $("#pedidosCocina").html(html);
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
            window.location.href = "index.php?panel=caja.php&verfactura=" +idfactura[0];
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
    $('#facturaimpresa').css("display", "block");
    $('#facturaimpresa').tableExport({type:'pdf',escape:'false'});
}
/////////////////////////////////////////////////////////////////////////////DEBUG VENTANAMODAL DE FACTURAS
//$(document).on('click', '#showmodal', function () {
//    $('#modal_consultar_factura').modal('toggle');
//});
