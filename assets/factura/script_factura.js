var idclientesel;
$(document).ready(function () {

    $(".form-control[disabled]").css("color", "black");

    cargaMesaPedido();
    autocompleteCedula();
    autocompleteCliente();
    autocompleteTel();
    asignaFecha();

    $("#cedula_cliente").keyup(function (event) {
        if (event.which != 13) {
            resetFormClienteC();
            $("#panel_infocliente .displaynone").css("display", "none");
        }
    });

    $("#nombre_cliente").keyup(function (event) {
        if (event.which != 13) {
            resetFormClienteN();
            $("#panel_infocliente .displaynone").css("display", "none");
        }
    });

    $("#telefono_cliente").keyup(function (e) {
        if (e.which != 13) {
            resetFormClienteT();
            $("#panel_infocliente .displaynone").css("display", "none");
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                    // Allow: Ctrl+A, Command+A
                            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                            // Allow: home, end, left, right, down, up
                                    (e.keyCode >= 35 && e.keyCode <= 40)) {
                        // let it happen, don't do anything
                        return;
                    }
                    // Ensure that it is a number and stop the keypress
                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                        $(this).val("");
                    }
                }
            });

    $('.chkMetodoPago').change(function () {
        console.log($(this).val());

        if ($(this).val() == "EFECTIVO") {
            if ($(this).is(":checked")) {
                $(".valorEfectivo").show("slow");
                $("#efectivo").focus();
            } else {
                $(".valorEfectivo").hide("slow");
                $("#efectivo").val("");
                $("#valorefectivo").val("");
                calcularVuelto();
            }
        } else
        if ($(this).val() == "VISA") {
            if ($(this).is(":checked")) {
                $(".tablaVisa").show("slow");
                $("#valorvisa").focus();
            } else {
                $(".tablaVisa").hide("slow");
                $("#valorvisa").val("");
                $("#vouchervisa").val("");
                $(".visa_newinput").remove();
                calcularVuelto();
            }

        } else
        if ($(this).val() == "CHEQUE") {
            if ($(this).is(":checked")) {
                $(".tablaCheque").show("slow");
                $("#valorCheque").focus();
            } else {
                $(".tablaCheque").hide("slow");
                $("#valorCheque").val("");
                $("#nrocheque").val("");
                $(".cheque_newinput").remove();
                calcularVuelto();
            }
        }
    });

    $('.agregavoucher').click(function () {
        $(".contentVisa").append(
                '<tr class="visa_newinput">' +
                '<td style="width:25%;padding:2px;" class="colValor">' +
                '<div class="form-group">' +
                '<label for="valor" class="control-label">$$</label>' +
                '<input type="text" onkeypress="return validateFloatKeyPress(this,event);" class="form-control monto_a_pagar" id="valorvisa" name="valorvisa" placeholder="$0.00" required>' +
                '</div>' +
                '</td>' +
                '<td style="width:40%;padding:2px;" class="colVoucher">' +
                '<div class="form-group">' +
                '<label for="valor" class="control-label"># Ref</label>' +
                '<input type="text" class="form-control id_formadepago" id="vouchervisa" name="vouchervisa" placeholder="Referencia" required>' +
                '</div>' +
                '</td>' +
                '<td style="width:25%;padding:2px;" class="colVoucher">' +
                '<div class="form-group">' +
                '<label for="valor" class="control-label"># Voucher</label>' +
                '<input type="text" class="form-control id_formadepago" id="vouchervisa" name="vouchervisa" placeholder="Lote" required>' +
                '</div>' +
                '</td>' +
                '<td style="width:10%;padding:2px;" class="colAccion">' +
                '<div style="padding-top: 30px;">' +
                '</div>' +
                '<span class="fa fa-minus eliminavoucher" aria-hidden="true" style="cursor:pointer;">' +
                '</span>' +
                '</td>' +
                '</tr>'
                );
        $(".tablaVisa tr:last").find(".colValor input").focus();
    });

    $('.agregacheque').click(function () {

        $(".contentCheque").append(
                '<tr class="cheque_newinput">' +
                '<td style="width:25%;padding:2px;" class="colValor">' +
                '<div class="form-group">' +
                '<label for="valor" class="control-label">$$</label>' +
                '<input type="text" onkeypress="return validateFloatKeyPress(this,event);" class="form-control monto_a_pagar" id="valorvisa" name="valorvisa" placeholder="$0.00" required>' +
                '</div>' +
                '</td>' +
                '<td style="width:65%;padding:2px;" class="colVoucher">' +
                '<div class="form-group">' +
                '<label for="valor" class="control-label"># Cheque</label>' +
                '<input type="text" class="form-control id_formadepago" id="vouchervisa" name="vouchervisa" placeholder="# Cheque" required>' +
                '</div>' +
                '</td>' +
                '<td style="width:10%;padding:2px;" class="colAccion">' +
                '<div style="padding-top: 30px;">' +
                '</div>' +
                '<span class="fa fa-minus eliminavoucher" aria-hidden="true" style="cursor:pointer;">' +
                '</span>' +
                '</td>' +
                '</tr>'
                );

        $(".tablaVisa tr:last").find(".colValor input").focus();
    });

});

$(document).on('click', '.eliminavoucher', function () {
    ($(this).parent().parent()).hide('slow', function () {
        $(this).remove();
        calcularVuelto();
    });
});

function asignaFecha() {
    var fecha = new Date();
    var hours, minutes, seconds;
    if (fecha.getSeconds() < 10) {
        seconds = "0" + fecha.getSeconds();
    } else {
        seconds = fecha.getSeconds();
    }
    if (fecha.getMinutes() < 10) {
        minutes = "0" + fecha.getMinutes();
    } else {
        minutes = fecha.getMinutes();
    }
    if (fecha.getHours() < 10) {
        hours = "0" + fecha.getHours();
    } else {
        hours = fecha.getHours();
    }
    $("#fecha_actual").val(fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + " ");
}

function resetFormClienteC() {
    $("#nombre_cliente").val("");
    $("#telefono_cliente").val("");
    $("#email_cliente").val("");
    $("#direccion_cliente").val("");

    $(".btnEditaCliente").hide();
    $(".btnEliminaCliente").hide();
}

function resetFormClienteN() {
    $("#cedula_cliente").val("");
    $("#id_cliente").val("");
    $("#telefono_cliente").val("");
    $("#email_cliente").val("");
    $("#direccion_cliente").val("");

    $("form[name='editar_cliente'] #cedula").val("");
    $("form[name='editar_cliente'] #nombre").val("");
    $("form[name='editar_cliente'] #telefono").val("");
    $("form[name='editar_cliente'] #email").val("");
    $("form[name='editar_cliente'] #direccion").val("");

    $(".btnEditaCliente").hide();
    $(".btnEliminaCliente").hide();
}

function resetFormClienteT() {
    $("#cedula_cliente").val("");
    $("#id_cliente").val("");
    $("#nombre_cliente").val("");
    $("#email_cliente").val("");
    $("#direccion_cliente").val("");

    $("form[name='editar_cliente'] #cedula").val("");
    $("form[name='editar_cliente'] #nombre").val("");
    $("form[name='editar_cliente'] #telefono").val("");
    $("form[name='editar_cliente'] #email").val("");
    $("form[name='editar_cliente'] #direccion").val("");

    $(".btnEditaCliente").hide();
    $(".btnEliminaCliente").hide();
}

function autocompleteCedula() {
    var options = {
        url: function (phrase) {
            return "assets/cliente/consultaClienteC.php";
        },
        getValue: function (element) {
            return element.cedulaCliente;
        },
        ajaxSettings: {
            dataType: "json",
            method: "POST",
            data: {
                dataType: "json"
            }
        },
        preparePostData: function (data) {
            data.cedula = $("#cedula_cliente").val();
            return data;
        },
        requestDelay: 100,
        list: {
            onClickEvent: function () {
                estableceClienteC($("#cedula_cliente").val());
            },
            onKeyEnterEvent: function () {
                estableceClienteC($("#cedula_cliente").val());
            }
        }
    };

    $("#cedula_cliente").easyAutocomplete(options);
    $(".easy-autocomplete").css("width", "");

}

function estableceClienteC(cedula) {
    $.ajax({
        url: 'assets/cliente/estableceClienteC.php',
        type: 'POST',
        dataType: "json",
        data: {
            cedula: cedula,
        },
        success: function (cliente) {
            //asignacion de valores a cliente
            $("#nombre_cliente").val(cliente.nombreCliente);
            $("#id_cliente").val(cliente.idCliente);
            $("#telefono_cliente").val(cliente.telefonoCliente);
            $("#email_cliente").val(cliente.emailCliente);
            $("#direccion_cliente").val(cliente.direccionCliente);

            $("form[name='editar_cliente'] #cedula").val(cliente.cedulaCliente);
            $("form[name='editar_cliente'] #nombre").val(cliente.nombreCliente);
            $("form[name='editar_cliente'] #telefono").val(cliente.telefonoCliente);
            $("form[name='editar_cliente'] #email").val(cliente.emailCliente);
            $("form[name='editar_cliente'] #direccion").val(cliente.direccionCliente);

            $(".btnEditaCliente").show();
            $(".btnEliminaCliente").show();
            infocliente(cliente.idCliente);

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

function autocompleteCliente() {
    var options = {
        url: function (phrase) {
            return "assets/cliente/consultaClienteN.php";
        },
        getValue: function (element) {
            return element.nombreCliente;
        },
        ajaxSettings: {
            dataType: "json",
            method: "POST",
            data: {
                dataType: "json"
            }
        },
        preparePostData: function (data) {
            data.nombre = $("#nombre_cliente").val();
            return data;
        },
        requestDelay: 100,
        list: {
            onClickEvent: function () {
                estableceClienteN($("#nombre_cliente").val());
            },
            onKeyEnterEvent: function () {
                estableceClienteN($("#nombre_cliente").val());
            }
        }
    };

    $("#nombre_cliente").easyAutocomplete(options);
    $(".easy-autocomplete").css("width", "");
}

function estableceClienteN(nombre) {
    $.ajax({
        url: 'assets/cliente/estableceClienteN.php',
        type: 'POST',
        dataType: "json",
        data: {
            nombre: nombre,
        },
        success: function (cliente) {
            //asignacion de valores a cliente
            $("#cedula_cliente").val(cliente.cedulaCliente);
            $("#id_cliente").val(cliente.idCliente);
            $("#telefono_cliente").val(cliente.telefonoCliente);
            $("#email_cliente").val(cliente.emailCliente);
            $("#direccion_cliente").val(cliente.direccionCliente);

            $("form[name='editar_cliente'] #cedula").val(cliente.cedulaCliente);
            $("form[name='editar_cliente'] #nombre").val(cliente.nombreCliente);
            $("form[name='editar_cliente'] #telefono").val(cliente.telefonoCliente);
            $("form[name='editar_cliente'] #email").val(cliente.emailCliente);
            $("form[name='editar_cliente'] #direccion").val(cliente.direccionCliente);

            $(".btnEditaCliente").show();
            $(".btnEliminaCliente").show();
            infocliente(cliente.idCliente);
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

function autocompleteTel() {
    var options = {
        url: function (phrase) {
            return "assets/cliente/consultaClienteT.php";
        },
        getValue: function (element) {
            return element.telefonoCliente;
        },
        ajaxSettings: {
            dataType: "json",
            method: "POST",
            data: {
                dataType: "json"
            }
        },
        preparePostData: function (data) {
            data.tel = $("#telefono_cliente").val();
            return data;
        },
        requestDelay: 100,
        list: {
            onClickEvent: function () {
                estableceClienteT($("#telefono_cliente").val());
            },
            onKeyEnterEvent: function () {
                estableceClienteT($("#telefono_cliente").val());
            }
        }
    };

    $("#telefono_cliente").easyAutocomplete(options);
    $(".easy-autocomplete").css("width", "");
}

function estableceClienteT(tel) {
    $.ajax({
        url: 'assets/cliente/estableceClienteT.php',
        type: 'POST',
        dataType: "json",
        data: {
            tel: tel,
        },
        success: function (cliente) {
            //asignacion de valores a cliente
            $("#cedula_cliente").val(cliente.cedulaCliente);
            $("#id_cliente").val(cliente.idCliente);
            $("#nombre_cliente").val(cliente.nombreCliente);
            $("#email_cliente").val(cliente.emailCliente);
            $("#direccion_cliente").val(cliente.direccionCliente);

            $("form[name='editar_cliente'] #cedula").val(cliente.cedulaCliente);
            $("form[name='editar_cliente'] #nombre").val(cliente.nombreCliente);
            $("form[name='editar_cliente'] #telefono").val(cliente.telefonoCliente);
            $("form[name='editar_cliente'] #email").val(cliente.emailCliente);
            $("form[name='editar_cliente'] #direccion").val(cliente.direccionCliente);

            $(".btnEditaCliente").show();
            $(".btnEliminaCliente").show();
            infocliente(cliente.idCliente);
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
var numeromesa;
function cargaMesaPedido() {

    $.ajax({
        url: 'assets/factura/getMesaPedido.php',
        dataType: "json",
        success: function (msg) {
            numeromesa = msg.numeromesa;
            if (msg.numeromesa != '999') {
                $(".numeroMesa").html("Mesa " + msg.numeromesa);
            } else {
                $(".numeroMesa").html("Domicilio");
            }
            $(".idPedido").html("Pedido # " + msg.idpedido);
            asignaProductos(msg.idpedido);
            setCliente(msg.idpedido);

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

function asignaProductos(idpedido) {
    $.ajax({
        url: 'assets/factura/consultaProductos.php',
        type: 'POST',
        data: {
            idpedido: idpedido,
        },
        success: function (html) {
            $(".contenTablaPedido").html(html);
            $(".tablaDescripcion tr:even").css("background-color", "rgba(169, 169, 169, 0.45)");

            var subtotal = 0,
                    iva = 0,
                    totalapagar = 0;
            $.when(
                    $(".contenTablaPedido .totalProducto").each(function (index) {
                console.log(index + ": " + $(this).text());
                subtotal = subtotal + parseFloat($(this).text());
            })
                    ).then(function () {
                subtotal = parseFloat(subtotal.toFixed(2));
                iva = parseFloat((parseFloat(subtotal.toFixed(2)) * 0.12).toFixed(2));
                totalapagar = parseFloat((subtotal + iva).toFixed(2));
                console.log(subtotal);
                console.log(iva);
                $(".subtotalFactura").html("$" + subtotal.toFixed(2));
                $(".ivaFactura").html("$" + iva.toFixed(2));
                $(".totalapagarFactura").html("$" + totalapagar.toFixed(2));
            });
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

function setCliente(idpedido) {
    $.ajax({
        url: 'assets/factura/getClienteFactura.php',
        type: 'POST',
        dataType: "json",
        data: {
            idpedido: idpedido,
        },
        success: function (cliente) {

            console.log(cliente);

            if (cliente) {

                $("#cedula_cliente").val(cliente.cedulaCliente);
                estableceClienteC(cliente.cedulaCliente);

            }


            //            $(".contenTablaPedido").html(html);
            //            $(".tablaDescripcion tr:even").css("background-color", "rgba(169, 169, 169, 0.45)");
            //
            //            var subtotal = 0,
            //                iva = 0,
            //                totalapagar = 0;
            //            $.when(
            //                $(".contenTablaPedido .totalProducto").each(function (index) {
            //                    console.log(index + ": " + $(this).text());
            //                    subtotal = subtotal + parseFloat($(this).text());
            //                })
            //            ).then(function () {
            //                subtotal = parseFloat(subtotal.toFixed(2));
            //                iva = parseFloat((parseFloat(subtotal.toFixed(2)) * 0.12).toFixed(2));
            //                totalapagar = parseFloat((subtotal + iva).toFixed(2));
            //                console.log(subtotal);
            //                console.log(iva);
            //                $(".subtotalFactura").html("$" + subtotal.toFixed(2));
            //                $(".ivaFactura").html("$" + iva.toFixed(2));
            //                $(".totalapagarFactura").html("$" + totalapagar.toFixed(2));
            //            });
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

////////////////////////////////////////////////////////////////////////////////CALCULAMOS EL VUELTO A ENTREGAR
function calcularVuelto() {
    var montocaumulado = 0;
    var totalapagar = $(".totalapagarFactura").html();
    var valortotalapagar = parseFloat(totalapagar.substring(1));
    var vueltoaentregar = 0;
    $(".monto_a_pagar").each(function () {
        if ($(this).val().length > 0) {
            montocaumulado += parseFloat($(this).val());
        }
    });
    montocaumulado = parseFloat(montocaumulado.toFixed(2));
    vueltoaentregar = montocaumulado - valortotalapagar;
    if (vueltoaentregar > 0) {
        $("#monto_devuelto").val(parseFloat(vueltoaentregar.toFixed(2)) + " $$");
    } else {
        $("#monto_devuelto").val("0 $$");
    }
    return parseFloat(vueltoaentregar.toFixed(2));
}

////////////////////////////////////////////////////////////////////////////////RECALCULAMOS EL VUELTO AL MISMO TIEMPO QUE SE INGRESA EL VALOR
$('#payment_methods_table').on('keyup', '.monto_a_pagar', calcularVuelto);

////////////////////////////////////////////////////////////////////////////////CALCULAMOS EL DESCUENTO OTORGADO
$('#descuento_factura').on('keyup', function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
    var descuento = parseFloat($(this).val());
    var subtotal = $(".subtotalFactura").html();
    var valorsubtotal = parseFloat(subtotal.substring(1));
    ////////////////////////////////////////////////////////////////////////////SI EL DESCUENTO ES MAYOR AL SUBTOTAL
    if (descuento > valorsubtotal) {
        $('#descuento_factura').val("");
        $("#monto_devuelto").val("");
        var nuevosubtotal = valorsubtotal;
        var iva = parseFloat((parseFloat(nuevosubtotal.toFixed(2)) * 0.12).toFixed(2));
        var nuevototal = nuevosubtotal + iva;
        $(".ivaFactura").html("$" + iva.toFixed(2));
        $(".totalapagarFactura").html("$" + nuevototal.toFixed(2));
        ////////////////////////////////////////////////////////////////////////CALCULAMOS TAMBIEN EL NUEVO VUELTO A ENTREGAR
        calcularVuelto();
        $('#factura_checkout .modal-dialog .modal-content .modal-header .modal-title').html('<i class="fa fa-exclamation-circle"></i> Alerta</h4>');
        $('#factura_checkout .modal-dialog .modal-content .modal-body').html('<p></p>');
        $('#factura_checkout .modal-dialog .modal-content .modal-body p').html('El descuento no puede ser mayor al Subtotal');
        $('#factura_checkout').modal('toggle');
        return false;
    } else if ($(this).val().length < 1) { /////////////////////////////////////////SI EL DESCEUNTO ESTA VACIO
        var nuevosubtotal = valorsubtotal;
        var iva = parseFloat((parseFloat(nuevosubtotal.toFixed(2)) * 0.12).toFixed(2));
        var nuevototal = nuevosubtotal + iva;
        $(".ivaFactura").html("$" + iva.toFixed(2));
        $(".totalapagarFactura").html("$" + nuevototal.toFixed(2));

        ////////////////////////////////////////////////////////////////////////CALCULAMOS TAMBIEN EL NUEVO VUELTO A ENTREGAR
        calcularVuelto();
    } else { ////////////////////////////////////////////////////////////////////SINO, RECALCULAMOS EL IVA Y EL TOTAL DE LA FACTURA
        var nuevosubtotal = valorsubtotal - descuento;
        var iva = parseFloat((parseFloat(nuevosubtotal.toFixed(2)) * 0.12).toFixed(2));
        var nuevototal = nuevosubtotal + iva;
        $(".ivaFactura").html("$" + iva.toFixed(2));
        $(".totalapagarFactura").html("$" + nuevototal.toFixed(2));

        ////////////////////////////////////////////////////////////////////////CALCULAMOS TAMBIEN EL NUEVO VUELTO A ENTREGAR
        calcularVuelto();
    }
});

////////////////////////////////////////////////////////////////////////////////ACCIONES DEL BOTON DE PROCEDER AL PAGO
$(document).on('click', '#payment_checkout', function () {
    var cliente = $.trim($("#email_cliente").val());
    var efectivo = $.trim($("#efectivo").val());
    ///////////////////////////////////////////////////////////////////////////VALIDAMOS QUE EL CLIENTE NO ESTE VACIO
    if (cliente.length > 0) {
        //////////////////////////////////////////////////////////////////////VALIDAMOS QUE LOS METODOS DE PAGO NO ESTEN VACIOS
        if ($("#checkbox_efectivo").prop('checked') == true || $("#checkbox_tdc").prop('checked') == true || $("#checkbox_cheque").prop('checked') == true) {
            var validate_each = true;
            $("#payment_methods_table input[type=text]").each(function () {/////////////VALIDAMOS QUE NO EXISTAN CAMPOS VACIOS EN LOS METODOS DE PAGO
                if (this.value == '') {
                    var method = $(this).closest('.payment_method_single').find('[type=checkbox]').val();
                    if ($(this).closest('.payment_method_single').find('[type=checkbox]').is(':checked')) {
                        $('#factura_checkout .modal-dialog .modal-content .modal-header .modal-title').html('<i class="fa fa-exclamation-circle"></i> Alerta</h4>');
                        $('#factura_checkout .modal-dialog .modal-content .modal-body').html('<p></p>');
                        $('#factura_checkout .modal-dialog .modal-content .modal-body p').html('Se han encontrado campos vac&iacute;os en el pago con ' + method);
                        $('#factura_checkout').modal('toggle');
                        validate_each = false;
                        return false;
                    }
                }
            });
            if (validate_each == true) {
                var montofaltante = calcularVuelto();
                if (montofaltante < 0) { /////////////////////////////////////////VALIDAMOS QUE LOS MONTOS INGRESADOS EN LOS PAGOS SEAN MAYOR AL MONTO DE LA FACTURA
                    montofaltante = Math.abs(montofaltante);
                    $('#factura_checkout .modal-dialog .modal-content .modal-header .modal-title').html('<i class="fa fa-exclamation-circle"></i> Alerta</h4>');
                    $('#factura_checkout .modal-dialog .modal-content .modal-body').html('<p></p>');
                    $('#factura_checkout .modal-dialog .modal-content .modal-body p').html('Para poder pagar la factura faltan ' + montofaltante + ' $$ que deben ser ingresados en los m&eacute;todos de pago');
                    $('#factura_checkout').modal('toggle');
                    return false;
                } else {
                    if ($("#checkbox_efectivo").prop('checked') == false && montofaltante > 0) {/////////////////////////VERIFICO QUE NO SE PUEDA DAR VUELTO SI NO PAGO CON EFECTIVO
                        $('#factura_checkout .modal-dialog .modal-content .modal-header .modal-title').html('<i class="fa fa-exclamation-circle"></i> Alerta</h4>');
                        $('#factura_checkout .modal-dialog .modal-content .modal-body').html('<p></p>');
                        $('#factura_checkout .modal-dialog .modal-content .modal-body p').html('Cuando no se ha seleccionado el pago con EFECTIVO, El monto pagado no puede ser mayor al monto de la factura');
                        $('#factura_checkout').modal('toggle');
                        return false;
                    } else {
                        $('#factura_checkout .modal-dialog .modal-content .modal-header .modal-title').html('<i class="fa fa-credit-card"></i> Resumen de la factura</h4>');
                        $('#factura_checkout .modal-dialog .modal-content .modal-body').html("");
                        resumenfactura();
                        $('#factura_checkout').modal('toggle');
                    }
                }
            }
        } else {
            $('#factura_checkout .modal-dialog .modal-content .modal-header .modal-title').html('<i class="fa fa-exclamation-circle"></i> Alerta</h4>');
            $('#factura_checkout .modal-dialog .modal-content .modal-body').html('<p></p>');
            $('#factura_checkout .modal-dialog .modal-content .modal-body p').html('No has seleccionado ning&uacute;n m&eacute;todo de pago');
            $('#factura_checkout').modal('toggle');
        }
    } else {
        $('#factura_checkout .modal-dialog .modal-content .modal-header .modal-title').html('<i class="fa fa-exclamation-circle"></i> Alerta</h4>');
        $('#factura_checkout .modal-dialog .modal-content .modal-body').html('<p></p>');
        $('#factura_checkout .modal-dialog .modal-content .modal-body p').html('No se ha seleccionado ning&uacute;n cliente para facturar');
        $('#factura_checkout').modal('toggle');
    }
});

////////////////////////////////////////////////////////////////////////////////VENTANA MODAL CON EL RESUMEN DE LA FACTURA
function resumenfactura() {

    $.ajax({
        url: 'assets/factura/getMesaPedido.php',
        dataType: "json",
        success: function (msg) {
            var idpedido = msg.idpedido;
            console.log(idpedido);
            $.ajax({
                url: 'assets/factura/resumenfactura.php',
                type: 'POST',
                data: {
                    idpedido: idpedido,
                },
                success: function (html) {
                    $("#factura_checkout .modal-dialog .modal-content .modal-body").html(html);
                    $("#resumen_nombrecliente").html("<span class='fa fa-user'></span> " + $("#nombre_cliente").val());
                    if (msg.numeromesa != '999') {
                        $(".resumen_numeromesa").html("<span class='fa fa-thumb-tack'></span> Mesa " + msg.numeromesa);
                    } else {
                        $(".resumen_numeromesa").html("<span class='fa fa-thumb-tack'></span> Domicilio");
                    }
                    $(".resumen_numeromesa").html("<span class='fa fa-thumb-tack'></span> Mesa " + msg.numeromesa);
                    $(".resumen_numerodepedido").html("Pedido # <span id='id_pedido'>" + msg.idpedido + "</span>");
                    $(".resumen_fecha").html("<span class='fa fa-clock-o'></span>" + $("#fecha_actual").val());
                    $(".resumen_subtotal").html($(".subtotalFactura").html());
                    var descuento = $("#descuento_factura").val();
                    console.log(descuento);
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

/////////////////////////////////////////////////////////////////////////////PROCEDEMOS A FACTURAR Y GUARDAR EN LA BASE DE DATOS
$(document).on('click', '#facturarpedido_btn', function () {
    /////////////////////////////////////////////////////////////////////////ESCONDEMOS EL MODAL Y MOSTRAMOS LA VENTANA DE CARGA
    $('#factura_checkout').modal('toggle');
    $('#mb-loading').modal('toggle');

    var idpedido, idcliente, subtotal, descuento, iva, formadepago, totalapagar, vuelto, efectivo, tdc, cheque, vouchertdc, nrocheque;
    idpedido = $("#id_pedido").html();
    idcliente = $("#id_cliente").val();
    subtotal = $(".resumen_subtotal").html();
    subtotal = subtotal.substring(1);
    descuento = $(".resumen_descuento").html();
    descuento = descuento.substring(1);
    iva = $(".resumen_iva").html();
    iva = iva.substring(1);
    formadepago = $(".resumen_forma_pago").html();
    totalapagar = $(".resumen_totalapagar").html();
    totalapagar = totalapagar.substring(1);
    vuelto = $(".resumen_vuelto").html();
    vuelto = vuelto.slice(0, -3);

    var efectivopagado = 0;
    $(".monto_a_pagar").each(function () {
        if ($(this).val().length > 0) {
            if ($(this).closest('.payment_method_single').find('[type=checkbox]').val() == "EFECTIVO") {
                efectivopagado += parseFloat($(this).val());
            }
        }
    });
    efectivopagado = parseFloat(efectivopagado.toFixed(2));
    efectivo = efectivopagado;

    var tdcpagado = 0;
    $(".monto_a_pagar").each(function () {
        if ($(this).val().length > 0) {
            if ($(this).closest('.payment_method_single').find('[type=checkbox]').val() == "VISA") {
                tdcpagado += parseFloat($(this).val());
            }
        }
    });
    tdcpagado = parseFloat(tdcpagado.toFixed(2));
    tdc = tdcpagado;

    var chequepagado = 0;
    $(".monto_a_pagar").each(function () {
        if ($(this).val().length > 0) {
            if ($(this).closest('.payment_method_single').find('[type=checkbox]').val() == "CHEQUE") {
                chequepagado += parseFloat($(this).val());
            }
        }
    });
    chequepagado = parseFloat(chequepagado.toFixed(2));
    cheque = chequepagado;

    var tdcvoucherpagado = "";
    $(".id_formadepago").each(function () {
        if ($(this).val().length > 0) {
            if ($(this).closest('.payment_method_single').find('[type=checkbox]').val() == "VISA") {
                tdcvoucherpagado += $(this).val() + " | ";
            }
        }
    });
    tdcvoucherpagado = tdcvoucherpagado.slice(0, -2);
    vouchertdc = tdcvoucherpagado;


    var nrochequepagado = "";
    $(".id_formadepago").each(function () {
        if ($(this).val().length > 0) {
            if ($(this).closest('.payment_method_single').find('[type=checkbox]').val() == "CHEQUE") {
                nrochequepagado += $(this).val() + " | ";
            }
        }
    });
    nrochequepagado = nrochequepagado.slice(0, -2);
    nrocheque = nrochequepagado;

    $.ajax({
        url: 'assets/factura/cargarFactura.php',
        type: 'POST',
        data: {
            idpedido: idpedido,
            idcliente: idcliente,
            subtotal: subtotal,
            descuento: descuento,
            iva: iva,
            formadepago: formadepago,
            vouchertdc: vouchertdc,
            nrocheque: nrocheque,
            totalapagar: totalapagar,
            vuelto: vuelto,
            efectivo: efectivo,
            tdc: tdc,
            cheque: cheque,
        },
        success: function (html) {
            $('#pizza_loading').delay(1000).hide('slow');
            setTimeout(function () {
                $('#mb-loading .mb-title').html('<span class="fa fa-check-circle"></span> Solicitud procesada!');
            }, 1000);
            $('#success_icon').delay(1500).fadeIn(500);
            setTimeout(function () {
                window.location.href = "index.php?panel=caja.php&verfactura=last";
            }, 2000);
        },
        error: function (error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log('Factura cargada a la DB');
        }
    });
});

////////////////////////////////////////////////////////////////////////////////PREFACTURAR
function prefactura_generar() {


    var cliente = $.trim($("#email_cliente").val());

    ///////////////////////////////////////////////////////////////////////////VALIDAMOS QUE EL CLIENTE NO ESTE VACIO
    var output = "";
//
//        output += "<tr><td> CLIENTE: "+$("#nombre_cliente").val()+" <br /></td></tr> \n\ ";
//        output += "<tr><td> DIRECCION: "+$("#direccion_cliente").val()+" <br /></td></tr> \n\ ";
//        output += "<tr><td> TELEFONO: "+$("#telefono_cliente").val()+"<br /></td></tr> \n\ ";
//        output += "<tr><td> RUC: "+$("#cedula_cliente").val()+" <br /></td></tr> \n\ ";

    var date = new Date();
    //OBTENCION DEL DIA
    var day = date.getDate();

    if (day < 10) {
        day = "0" + day;
    }

    //OBTENCION DEL MES

    var month = date.getMonth();

    month = month + 1;

    if (month < 10) {
        month = "0" + month;
    }

    //OBTENCION DEL AÑO

    var year = date.getFullYear();

    //OBTENCION DE LA HORA
    var hora = date.getHours();

    if (hora < 10) {
        hora = "0" + hora;
    }

    //OBTENCION DE LOS MINUTOS
    var minutos = date.getMinutes();

    if (minutos < 10) {
        minutos = "0" + minutos;
    }

    //OBTENCION DE LOS SEGUNDOS
    var segundos = date.getSeconds();
    if (segundos < 10) {
        segundos = "0" + segundos;
    }


    output += "<tr><td> FECHA: " + day + "/" + month + "/" + year + " " + hora + ":" + minutos + ":" + segundos + " <br /></td></tr> \n\ ";
    output += "<tr><td> ============================================ <br /></td></tr> \n\ ";
    output += "<tr><td> DESCRIPCION          |CANT| V.UNIT | V.TOTAL <br /></td></tr> \n\ ";
    output += "<tr><td> ============================================ <br /></td></tr> \n\ ";
    var contadorTabla = 0;

    $.when(
            $(".tablaDescripcion table tr").each(function () {
        if ($(this).find('td:eq(0)').length > 0) {

            output += " <tr><td> ";
            //PARA EL NOMBRE DEL PRODUCTO
            if (String($(this).find('td:eq(0) strong').html()).length != 0) {
                var producto = getCleanedString(String($(this).find('td:eq(0) strong').html()));
                if (producto.length == 20) {
                    output += producto;

                } else
                if ((producto.length < 20) && (producto.length > 0)) {
                    var longitudRestante = 20 - producto.length;
                    var text = "";
                    for (var i = 0; i < longitudRestante; i++) {
                        text += " ";
                    }
                    output += producto + text;
                } else
                if (producto.length > 20) {
                    output += producto.substring(0, 20);
                }
                output += " | ";
            }

            //PARA LA CANTIDAD
            if (String($(this).find('td:eq(2)').html()).length != 0) {
                var cantidad = String($(this).find('td:eq(2)').html());
                if (cantidad.length == 2) {
                    output += cantidad;
                } else
                if ((cantidad.length < 2) && (cantidad.length >= 0)) {
                    var longitudRestante = 2 - cantidad.length;
                    var text = "";
                    for (var i = 0; i < longitudRestante; i++) {
                        text += " ";
                    }
                    output += cantidad + text;
                }
                output += " | ";
            }

            //PARA EL VALOR UNITARIO
            if (String($(this).find('td:eq(1)').html()).length != 0) {
                var valorunitario = String($(this).find('td:eq(1)').html());
                if (valorunitario.length == 6) {
                    output += valorunitario;
                } else
                if ((valorunitario.length < 6) && (valorunitario.length >= 0)) {
                    var longitudRestante = 6 - valorunitario.length;
                    var text = "";
                    for (var i = 0; i < longitudRestante; i++) {
                        text += " ";
                    }
                    output += valorunitario + text;
                }
                output += " | ";
            }
            output += "$" + $(this).find('td:eq(3) span').html();
            output += " <br /> \n\ </td></tr>";
        }

        contadorTabla++;
    })
            )
            .then(function () {

                var contadorRestante = 20 - contadorTabla;

                for (var i = 0; i <= contadorRestante; i++) {
                    output += "<tr><td>.<br /></td></tr> \n\ ";
                }

                output += "<tr><td> ============================================ <br /></td></tr> \n\ ";
                output += "<tr><td> .                        SUBTOTAL : " + $(".subtotalFactura").html() + " <br /></td></tr> \n\ ";
                output += "<tr><td> .                        IVA % 12 : " + $(".ivaFactura").html() + " <br /></td></tr> \n\ ";
                output += "<tr><td> .                        TOTAL    : " + $(".totalapagarFactura").html() + " <br /></td></tr> \n\ ";
                output += "<tr><td> .                        SERVICIO : $0.00 <br /></td></tr> \n\ ";
                output += "<tr><td> .                        TOTAL    : " + $(".totalapagarFactura").html() + " <br /></td></tr> \n\ ";
                output += "<tr><td> MESA : " + numeromesa + "<br /></td></tr> \n\ ";
                output += "<tr><td> =========== GRACIAS POR SU VISITA ========== <br /></td></tr> \n\ ";
                output += "<tr><td> ============== www.dirulo.com ============== <br /></td></tr> \n\ ";
                output += "<tr><td> Nombre: _____________________________ <br /></td></tr> \n\ ";
                output += "<tr><td> Direccion: _____________________________ <br /></td></tr> \n\ ";
                output += "<tr><td> Telefono: _____________________________ <br /></td></tr> \n\ ";
                output += "<tr><td> RUC / CI: _____________________________ <br /></td></tr> \n\ ";
                output += "<tr><td> Propina: _____________________________ <br /></td></tr> \n\ ";
                output += "<tr><td> Email: _____________________________ <br /></td></tr> \n\ ";
                output += "<tr><td> Cumpleanos: _____________________________ <br /></td></tr> \n\ ";
                output += "<tr><td> ====== EXIJA SU COMPROBANTE ====== <br /></td></tr> \n\ ";

                $("#prefacturar tbody").append("" + output + "")
                $('#prefacturar').css("display", "block");
                $('#prefacturar').tableExport({type: 'pdf', escape: 'false'});
                $('#prefacturar tbody').html("");

            });

}

function getCleanedString(cadena) {
    // Definimos los caracteres que queremos eliminar
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";

    // Los eliminamos todos
    for (var i = 0; i < specialChars.length; i++) {
        cadena = cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }

    // Lo queremos devolver limpio en minusculas
    cadena = cadena.toLowerCase();

    // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
    cadena = cadena.replace(/á/gi, "a");
    cadena = cadena.replace(/é/gi, "e");
    cadena = cadena.replace(/í/gi, "i");
    cadena = cadena.replace(/ó/gi, "o");
    cadena = cadena.replace(/ú/gi, "u");
    cadena = cadena.replace(/ñ/gi, "n");
    cadena = cadena.toUpperCase();
    return cadena;
}

////////////////////////////////////////////////////////////////////////////////MANDAMOS TODA LA INFO UTIL DEL CLIENTE AL PANEL LATERAL
function infocliente(id) {
    idclientesel = id;
    $("#panel_infocliente .displaynone").css("display", "block");
    $.ajax({
        url: 'assets/factura/infocliente.php',
        type: 'POST',
        dataType: "json",
        data: {
            id: id,
        },
        success: function (html) {
            console.log(html);
            if (html.top1 !== " | ") {
                $(".top1").html(html.top1);
            } else {
                $(".top1").html("Cliente Nuevo");
            }
            if (html.top1cant !== null) {
                $(".top1cant").html(html.top1cant);
            } else {
                $(".top1cant").html("0");
            }
            if (html.comprado !== null) {
                $(".comprado").html("$ " + html.comprado);
            } else {
                $(".comprado").html("$ 0.00");
            }
            if (html.last1 !== null) {
                $("#last1 .widget-title").html("FACTURA # " + html.last1);
            } else {
                $("#last1 .widget-title").html("Cliente Nuevo");
            }
            if (html.last1date !== null) {
                $("#last1 .widget-subtitle").html(html.last1date);
            } else {
                $("#last1 .widget-subtitle").html("No hay ventas");
            }
            if (html.last1tot !== null) {
                $("#last1 .widget-int").html(html.last1tot);
            } else {
                $("#last1 .widget-int").html("0.00");
            }
            if (html.last2 !== null) {
                $("#last2 .widget-title").html("FACTURA # " + html.last2);
            } else {
                $("#last2 .widget-title").html("Sin Datos");
            }
            if (html.last2date !== null) {
                $("#last2 .widget-subtitle").html(html.last2date);
            } else {
                $("#last2 .widget-subtitle").html("No hay mas ventas");
            }
            if (html.last2tot !== null) {
                $("#last2 .widget-int").html(html.last2tot);
            } else {
                $("#last2 .widget-int").html("0.00");
            }
            if (html.last3 !== null) {
                $("#last3 .widget-title").html("FACTURA # " + html.last3);
            } else {
                $("#last3 .widget-title").html("Sin Datos");
            }
            if (html.last3date !== null) {
                $("#last3 .widget-subtitle").html(html.last3date);
            } else {
                $("#last3 .widget-subtitle").html("No hay mas ventas");
            }
            if (html.last3tot !== null) {
                $("#last3 .widget-int").html(html.last3tot);
            } else {
                $("#last3 .widget-int").html("0.00");
            }
            if (html.com !== null) {
                $(".comentario").html(html.com);
            } else {
                $(".comentario").html("Cliente no tiene comentarios");
            }
        },
        error: function (error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log('Info del cliente recolectada');
        }
    });
}

////////////////////////////////////////////////////////////////////////////////ACTUALIZAR COMENTARIOS DEL CLIENTE
$(document).on('click', '#coment_edit', function () {
    $(this).hide();
    $('#coment_save').show();
    $('.comentario').removeAttr("disabled");
    $('.comentario').html("");
});

$(document).on('click', '#coment_save', function () {
    var comment = $(".comentario").val();
    $.ajax({
        url: 'assets/factura/comentarios.php',
        type: 'POST',
        data: {
            idcliente: idclientesel,
            comment: comment,
        },
        success: function (html) {
            infocliente(idclientesel)
            console.log(html);
            $('.comentario').attr("disabled", "disabled");
            $('#coment_save').hide();
            $('#coment_edit').show();
            $.notify('Comentario actualizado con exito ', "success");
        },
        error: function (error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log('Se actualizo el comentario exitosamente');
        }
    });
});

/////////////////////////////////////////////////////////////////////////////DEBUG VENTANAMODAL DE FACTURAS
//$(document).on('click', '#showmodal', function() {
//    $('#mb-loading').modal('toggle');
//});