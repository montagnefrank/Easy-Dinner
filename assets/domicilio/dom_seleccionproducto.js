var nombre, precio, id, idSubmenu, nombreSubmenu, idmenu, nombreMenu, producto, selectedOption;


$(document).ready(function(){
     start_menu('domicilio');//se inicia con la opcion (mesas/para llevar/domicilio)
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////********************************************************************************************//////////////////////////////////
///////////////////////////******************************SCRIPT DE LA SECCION PARA LLEVAR EN DOMICILIO******************************//////////////////////////////////


////////////////////////////////////////////////////////////////////////////IMPRIMIR EL DOMICILIO
$(document).on('click', '.pedido_imprimir', function () {
    var mesa_nro = $("#ModalEstadoPedido .modal-body h3:eq(0)").html();
    var pedido_nro = $("#ModalEstadoPedido .modal-header h4:eq(0)").html();
    var pedidos = $("#ModalEstadoPedido .modal-body").children("div");
    var output = "";
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    output += "<tr><td> Pedido a Domicilio  <br /></td></tr> \n\ ";
    output += "<tr><td> " + pedido_nro + " <br /></td></tr> \n\ ";
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    $(pedidos).each(function (index, value) {
        var ped = $(value).find(".nombrepedidoproducto").html();
        var cat = $(value).find(".submenupedidoproducto").html();
        var table = $(value).children("table").html();
        var table_obj = $(value).children("table");
        var mealtype = $(value).find(".descripcionpedidoproducto").html();
        if (table == null) {
            output += "<tr><td> " + ped + " - " + cat + " <br /></td></tr> \n\ ";
            output += "<tr><td> --------------------- <br /></td></tr> \n\ ";
        } else {
            if (mealtype == 'entera') {
                output += "<tr><td> " + ped + " - " + cat + " <br /></td></tr> \n\ ";
                $(table_obj).find("tbody tr td ul li").each(function (index, value) {
                    var ing = $(value).html();
                    output += "<tr><td> " + ing + " <br /></td></tr> \n\ ";
                });
                output += "<tr><td> --------------------- <br /></td></tr> \n\ ";
            } else if (mealtype == 'Combinada 1/2' || mealtype == 'Combinada 1/4' || mealtype == 'Personalizada') {
                output += "<tr><td> " + ped + " - " + mealtype + " <br /></td></tr> \n\ ";
                $(table_obj).find("tbody tr").each(function (index, value) {
                    output += "<tr><td> " + $(value).find("td:eq(0)").html() + " <br /></td></tr> \n\ ";
                    $(value).find("td ul li").each(function (index, value) {
                        var ing = $(value).html();
                        output += "<tr><td> " + ing + " <br /></td></tr> \n\ ";
                    });
                });
                output += "<tr><td> --------------------- <br /></td></tr> \n\ ";
            }
        }
    });
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    $("body").append("<table id='pedido_imprimir'><tbody> " + output + " </tbody></table>");
    $('#pedido_imprimir').tableExport({type: 'pdf', escape: 'false'});
    $('#pedido_imprimir').remove();
});


/*$(document).on("click", "#dom_mostrarmenu", function (event) {
    $(".dom_menupanel").toggle(1000);
});*/


//verificar la funcion
function asignaPedido(idpedido) {

    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/mesas/consultaProductos.php',
        type: 'POST',
        data: {
            idpedido: idpedido,
        },
        success: function (pedidos) {
            $(".contenidoEstadoPedido").html(
                    "<center><h3> Domicilio </h3></center>" +
                    pedidos
                    );
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



$(document).on('click', '.modal_facturarpedido_btn', function () {
    window.location.href = "index.php?panel=caja.php";
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////********************************************************************************************//////////////////////////////////
///////////////////////////*************************SCRIPT DEL PANEL DE NUEVO PEDIDO DOMICILIO*************************//////////////////////////////////
///////////////////////////********************************************************************************************//////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////VARIABLES PUBLICAS PARA EL MANEJO DE LA INFORMACION
var idclientesel;
        
////////////////////////////////////////////////////////////////////////////////AL CARGAR LA PAGINA
$(document).ready(function () {
   
    $(".form-control[disabled]").css("color", "black");
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
////////////////////////////////////////////////////////////////////////////////ELIMINAMOS LAS CAJAS ADICIONALES
$(document).on('click', '.eliminavoucher', function () {
    ($(this).parent().parent()).hide('slow', function () {
        $(this).remove();
        calcularVuelto();
    });
});
////////////////////////////////////////////////////////////////////////////////CALCULAMOS EL DESCUENTO OTORGADO
$('#descuento_factura').on('keyup', function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
    var descuento = parseFloat($(this).val());
    var subtotal = $(".subtotalFactura").html();
    var valorsubtotal = parseFloat(subtotal);
    ////////////////////////////////////////////////////////////////////////////SI EL DESCUENTO ES MAYOR AL SUBTOTAL
    if (descuento > valorsubtotal) {
        $('#descuento_factura').val("");
        $("#monto_devuelto").val("");
        var nuevosubtotal = valorsubtotal;
        var iva = parseFloat((parseFloat(nuevosubtotal.toFixed(2)) * 0.12).toFixed(2));
        var nuevototal = nuevosubtotal + iva;
        $(".ivaFactura").html(iva.toFixed(2));
        $(".totalapagarFactura").html(nuevototal.toFixed(2));
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
        $(".ivaFactura").html(iva.toFixed(2));
        $(".totalapagarFactura").html(nuevototal.toFixed(2));
        ////////////////////////////////////////////////////////////////////////CALCULAMOS TAMBIEN EL NUEVO VUELTO A ENTREGAR
        calcularVuelto();
    } else { ////////////////////////////////////////////////////////////////////SINO, RECALCULAMOS EL IVA Y EL TOTAL DE LA FACTURA
        var nuevosubtotal = valorsubtotal - descuento;
        var iva = parseFloat((parseFloat(nuevosubtotal.toFixed(2)) * 0.12).toFixed(2));
        var nuevototal = nuevosubtotal + iva;
        $(".ivaFactura").html(iva.toFixed(2));
        $(".totalapagarFactura").html(nuevototal.toFixed(2));
        ////////////////////////////////////////////////////////////////////////CALCULAMOS TAMBIEN EL NUEVO VUELTO A ENTREGAR
        calcularVuelto();
    }
});
////////////////////////////////////////////////////////////////////////////////EFECTIVO CALCULA EL VUELTO AUTOMATICAMENTE
$('#valorefectivo').on('keyup', function () {
////////////////////////////////////////////////////////////////////////////SOLO NUMEROS
    calcularVuelto();
    if (event.which != 13) {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
            event.preventDefault();
        }
    }
});
////////////////////////////////////////////////////////////////////////////////ACTUALIZAR COMENTARIOS DEL CLIENTE
$(document).on('click', '#coment_edit', function () {
    $(this).hide();
    $('#coment_save').show();
    $('.comentario').removeAttr("disabled");
    $('.comentario').html("");
});
////////////////////////////////////////////////////////////////////////////////GUARDAMOS UN NUEVO COMENTARIO
$(document).on('click', '#coment_save', function () {
    var comment = $(".comentario").val();
    $.ajax({
        url: 'assets/domicilio/dom_controller.php',
        type: 'POST',
        data: {
            dom_newcom: idclientesel,
            comment: comment,
        },
        success: function (html) {
            infocliente(idclientesel);
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
////////////////////////////////////////////////////////////////////////////////ACCIONES DEL BOTON DE PROCEDER AL PAGO
$(document).on('click', '#payment_checkout', function () {
    var cliente = $.trim($("#email_cliente").val());
    var efectivo = $.trim($("#efectivo").val());
    var renglones = 0;
    $("#resumen_pedido div.list-group-item").each(function () {
        renglones++;
    });
    ///////////////////////////////////////////////////////////////////////////VALIDAMOS QUE EL CLIENTE NO ESTE VACIO
    if (renglones > 0) {
        if (cliente.length > 0) {
//////////////////////////////////////////////////////////////////////VALIDAMOS QUE LOS METODOS DE PAGO NO ESTEN VACIOS
            if ($("#checkbox_efectivo").prop('checked') == true || $("#checkbox_tdc").prop('checked') == true || $("#checkbox_cheque").prop('checked') == true) {
                var validate_each = true;
                $("#payment_methods_table input[type=text]").each(function () { /////////////VALIDAMOS QUE NO EXISTAN CAMPOS VACIOS EN LOS METODOS DE PAGO
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
                        if ($("#checkbox_efectivo").prop('checked') == false && montofaltante > 0) { /////////////////////////VERIFICO QUE NO SE PUEDA DAR VUELTO SI NO PAGO CON EFECTIVO
                            $('#factura_checkout .modal-dialog .modal-content .modal-header .modal-title').html('<i class="fa fa-exclamation-circle"></i> Alerta</h4>');
                            $('#factura_checkout .modal-dialog .modal-content .modal-body').html('<p></p>');
                            $('#factura_checkout .modal-dialog .modal-content .modal-body p').html('Cuando no se ha seleccionado el pago con EFECTIVO, El monto pagado no puede ser mayor al monto de la factura');
                            $('#factura_checkout').modal('toggle');
                            return false;
                        } else {
                            //Proceso de confirmacion del pedido
                            //***************************mostrar modal confirmacion


                            $.when($("#selProd_name,#seccion_pagos,#seccion_cliente,#menuwizard,.radioSeleccionproductos,#payment_checkout,#detalle_pago,.codigoproducto,#codigoproducto,#panel_infocliente,#resumen_pedido").slideUp("slow")).then(function () {
                                $("#ModalConfirmacion").slideDown("slow");
                            });

                            var htmlTablaPedidos = "";
                            var total = 0;
                            $.when(
                                    $(arrayProductos).each(function (index, value) {
                                if (value.nombreMenu == "Pizzas") {
                                    htmlTablaPedidos +=
                                            "<tr>" +
                                            "<td><h4>" + value.pizza + " " + value.nombreProducto + "</h4><p><i>Pizza " + value.descripcionPedido + "</p></i></td>" +
                                            "<td>" + value.nombreMenu + "</td>";
                                    if (value.descripcionPedido == "entera") {
                                        htmlTablaPedidos += "<td style='width:40%'>";
                                        if (value.ingredientes.length != 0) {
                                            htmlTablaPedidos += "<p style='font-weight: bold;padding: 5px;'>Ingredientes " + value.nombreProducto + "</p>";
                                            $(value.ingredientes).each(function (index, v) {
                                                htmlTablaPedidos += "<li>" + v.nombreIngrediente + "</li>";
                                            });
                                        }
                                        htmlTablaPedidos += "</td>";
                                        htmlTablaPedidos += "<td>" + value.observacion + "</td>";
                                        htmlTablaPedidos += "<td>" + value.cantidad + "</td>";
                                    } else
                                    if (value.descripcionPedido == "Combinada 1/2") {
                                        htmlTablaPedidos += "<td style='width:40%'>";
                                        if (value.ingredientes.length != 0) {
                                            htmlTablaPedidos += "<p style='font-weight: bold;padding: 5px;'>Ingredientes " + value.nombreProducto + "</p>";
                                            $(value.ingredientes).each(function (index, v) {
                                                htmlTablaPedidos += "<li>" + v.nombreIngrediente + "</li>";
                                            });
                                        }
                                        htmlTablaPedidos += "<p style='font-weight: bold;padding: 5px;color: red;'>Combinada 1/2 - Pizza " + value.nombreProductoMedio + "</p>";
                                        if (value.ingredientesMedio.length != 0) {
                                            htmlTablaPedidos += "<p style='font-weight: bold;padding: 5px;'>Ingredientes " + value.nombreProductoMedio + "</p>";
                                            $(value.ingredientesMedio).each(function (index, v) {
                                                htmlTablaPedidos += "<li>" + v.nombreIngrediente + "</li>";
                                            });
                                        }
                                        htmlTablaPedidos += "</td>";
                                        htmlTablaPedidos += "<td>" + value.observacion + "</td>";
                                        htmlTablaPedidos += "<td>" + value.cantidad + "</td>";
                                    } else
                                    if (value.descripcionPedido == "Combinada 1/4") {
                                        htmlTablaPedidos += "<td style='width:40%'>";
                                        if (value.ingredientes.length != 0) {
                                            htmlTablaPedidos += "<p style='font-weight: bold;padding: 5px;'>Ingredientes " + value.nombreProducto + "</p>";
                                            $(value.ingredientes).each(function (index, v) {
                                                htmlTablaPedidos += "<li>" + v.nombreIngrediente + "</li>";
                                            });
                                        }
                                        htmlTablaPedidos += "<p style='font-weight: bold;padding: 5px;color: red;'>Combinada 1/4 - Pizza " + value.nombreProductoCuarto + "</p>";
                                        if (value.ingredientesCuarto.length != 0) {
                                            htmlTablaPedidos += "<p style='font-weight: bold;padding: 5px;'>Ingredientes " + value.nombreProductoCuarto + "</p>";
                                            $(value.ingredientesCuarto).each(function (index, v) {
                                                htmlTablaPedidos += "<li>" + v.nombreIngrediente + "</li>";
                                            });
                                        }
                                        htmlTablaPedidos += "</td>";
                                        htmlTablaPedidos += "<td>" + value.observacion + "</td>";
                                        htmlTablaPedidos += "<td>" + value.cantidad + "</td>";
                                    } else
                                    if (value.descripcionPedido == "Personalizada") {
                                        htmlTablaPedidos += "<td style='width:40%'>";
                                        if (value.ingredientes.length != 0) {
                                            htmlTablaPedidos += "<p style='font-weight: bold;padding: 5px;'>Ingredientes " + value.nombreProducto + "</p>";
                                            $(value.ingredientes).each(function (index, v) {
                                                htmlTablaPedidos += "<li>" + v.nombreIngrediente + "</li>";
                                            });
                                        }
                                        htmlTablaPedidos += "<p style='font-weight: bold;padding-top: 16px;color: red;'>Combinada Personalizada - Pizza " + value.nombreProductoPersonalizado1 + "</p>";
                                        if (value.ingredientesPersonalizado1.length != 0) {
                                            htmlTablaPedidos += "<p style='font-weight: bold;padding: 5px;'>Ingredientes " + value.nombreProductoPersonalizado1 + "</p>";
                                            $(value.ingredientesPersonalizado1).each(function (index, v) {
                                                htmlTablaPedidos += "<li>" + v.nombreIngrediente + "</li>";
                                            });
                                        }

                                        htmlTablaPedidos += "<p style='font-weight: bold;padding-top: 16px;color: red;'>Combinada Personalizada - Pizza " + value.nombreProductoPersonalizado2 + "</p>";
                                        if (value.ingredientesPersonalizado2.length != 0) {
                                            htmlTablaPedidos += "<p style='font-weight: bold;padding: 5px;'>Ingredientes " + value.nombreProductoPersonalizado2 + "</p>";
                                            $(value.ingredientesPersonalizado2).each(function (index, v) {
                                                htmlTablaPedidos += "<li>" + v.nombreIngrediente + "</li>";
                                            });
                                        }
                                        htmlTablaPedidos += "<p style='font-weight: bold;padding-top: 16px;color: red;'>Combinada Personalizada - Pizza " + value.nombreProductoPersonalizado3 + "</p>";
                                        if (value.ingredientesPersonalizado3.length != 0) {

                                            htmlTablaPedidos += "<p style='font-weight: bold;padding: 5px;'>Ingredientes " + value.nombreProductoPersonalizado3 + "</p>";
                                            $(value.ingredientesPersonalizado3).each(function (index, v) {
                                                htmlTablaPedidos += "<li>" + v.nombreIngrediente + "</li>";
                                            });
                                        }
                                        htmlTablaPedidos += "</td>";
                                        htmlTablaPedidos += "<td>" + value.observacion + "</td>";
                                        htmlTablaPedidos += "<td>" + value.cantidad + "</td>";
                                    }
                                } else {
                                    htmlTablaPedidos +=
                                            "<tr>" +
                                            "<td><h4>" + value.nombreProducto + "</h4></td>" +
                                            "<td>" + value.nombreMenu + "</td>";
                                    if (value.ingredientesProducto.length != 0) {
                                        htmlTablaPedidos += "<td style='width:40%'><p style='font-weight: bold;padding-top: 10px;'>Ingredientes</p>";
                                        $(value.ingredientesProducto).each(function (index, v) {
                                            htmlTablaPedidos += "<li>" + v.nombreIngrediente + "</li>";
                                        });
                                        htmlTablaPedidos += "</td>";
                                    } else {
                                        htmlTablaPedidos += "<td></td>";
                                    }
                                    htmlTablaPedidos += "<td>" + value.observacion + "</td>";
                                    htmlTablaPedidos += "<td>" + value.cantidad + "</td>";
                                }

                                htmlTablaPedidos += "<td style='text-align: right;'>$" + value.precioProducto + "</td>";
                                htmlTablaPedidos += "<td style='text-align: right;'>$" + (value.precioProducto * value.cantidad).toFixed(2) + "</td>";
                                total = total + parseFloat(value.precioProducto * value.cantidad);
                                htmlTablaPedidos += "</tr>";
                            })
                                    ).then(function () {
                                $(".contenidoModalConfirmacion").html(
                                        "<center><h4>Esta seguro de enviar los siguientes pedidos a la cocina ?</h4></center><br>" +
                                        "<div class='table-responsive'>" +
                                        "<table class='table table-bordered'>" +
                                        "<tr>" +
                                        "<th>Nombre</th>" +
                                        "<th>Menú</th> " +
                                        "<th style='width:45%'>Descripción</th>" +
                                        "<th>Observación</th> " +
                                        "<th>Cantidad</th> " +
                                        "<th>Valor unitario</th> " +
                                        "<th>Valor total</th> " +
                                        "</tr>" +
                                        htmlTablaPedidos +
                                        "<tr>" +
                                        "<td></td>" +
                                        "<td></td>" +
                                        "<td></td>" +
                                        "<td></td>" +
                                        "<td></td>" +
                                        "<td style='text-align: right;font-weight: bold;'>IVA 12 %</td>" +
                                        "<td><h4 style='text-align: right;'>$" + (total * 0.12).toFixed(2) + "</h4></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td></td>" +
                                        "<td></td>" +
                                        "<td></td>" +
                                        "<td></td>" +
                                        "<td></td>" +
                                        "<td style='text-align: right;font-weight: bold;'>Total a Pagar</td>" +
                                        "<td><h4 style='text-align: right;'>$" + (total * 1.12).toFixed(2) + "</h4></td>" +
                                        "</tr>" +
                                        "</table>" +
                                        "</div>"
                                        );
                                $(".btnEnviaPedido").show();
                            });
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
    } else {
        $('#factura_checkout .modal-dialog .modal-content .modal-header .modal-title').html('<i class="fa fa-exclamation-circle"></i> Alerta</h4>');
        $('#factura_checkout .modal-dialog .modal-content .modal-body').html('<p></p>');
        $('#factura_checkout .modal-dialog .modal-content .modal-body p').html('No has ingresado ning&uacute;n pedido para facturar');
        $('#factura_checkout').modal('toggle');
    }
});


////////////////////////////////////////////////////////////////////////////////INGRESAR PEDIDO AL PRESIONAR ENTER
$("#dom_cod_dirulo").keypress(function (event) {
////////////////////////////////////////////////////////////////////////////SOLO NUMEROS
    if (event.which != 13) {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
            event.preventDefault();
        }
    }
    if (event.keyCode == 13) {
        dom_nuevoitem($(this).val());
    }
});
////////////////////////////////////////////////////////////////////////////////BOTON DE INGRESAR PEDIDO
$(document).on('click', '#ingresar_pedido', function () {
    dom_nuevoitem($("#dom_cod_dirulo").val());
});


















////////////////////////////////////////////////////////////////////////////////FUINCION TOMA EL CODIGO INGRESADO Y BUSCA EN LA DB EL PRODUCTO ASIGNADO Y LO AGREGA AL PEDIDO
function dom_nuevoitem(codigo) {
    var codigo = $("#dom_cod_dirulo").val().replace(/\s+/g, '');
    if (codigo !== "") {
////////////////////////////////////////////////////////////////////////PRIMERO BUSCAMOS EN LA DB EL ITEM
        $.ajax({
// Verificacion de los datos introducidos
            url: 'assets/domicilio/dom_controller.php',
            type: 'POST',
            dataType: "json",
            data: {
                dom_newprod: codigo,
            },
            success: function (event) {
                if (event.status == "empty") {
                    $.notify('El código "' + codigo + '" no existe en sistema ', "error");
                    $("#dom_cod_dirulo").val("");
                } else {
                    $("#dom_cod_dirulo").val("");
                    nombre = event.nombreProducto;
                    precio = event.precioProducto;
                    id = event.idProducto;
                    idSubmenu = event.idSubmenu;
                    nombreSubmenu = event.nombreSubmenu;
                    idmenu = event.idMenu;
                    nombreMenu = event.nombreMenu;
                    if (idmenu == "1" || idmenu == "2" || idmenu == "3" || idmenu == "5") {
                        $(".tituloSeleccionaIngredientes").html("Ingredientes " + nombre);
                        asignaIngredientes(nombreMenu);
                        //****************Muestra modal Seleccion Ingredientes
                        $("#ModalSeleccionaIngredientes").modal("show");
                        /*
                         $.when($("#ModalSeleccionaProducto").slideUp("slow")).then(function () {
                         $("#ModalSeleccionaIngredientes").slideDown("slow");
                         });                          
                         */
                    } else if (idmenu == "4") {
                        idMenu = idmenu;
                        $(".tituloSeleccionPizza").html("<center>Pizza " + nombreSubmenu + "</center>");
                        $(".contenidoSeleccionPizza").html("");
                        $.ajax({
                            // Verificacion de los datos introducidos
                            url: 'assets/hacerpedido/getProductos.php',
                            type: 'POST',
                            dataType: "json",
                            data: {
                                idsubmenu: idSubmenu,
                            },
                            success: function (productos) {
                                var htmlselect = '<center><div class="btn-group radioTipopizzas" data-toggle="buttons">' +
                                        '<label class="btn btn-primary active">' +
                                        '<input type="radio" name="options" value="" autocomplete="off" checked>Seleccione ..' +
                                        '</label>';
                                $.when(
                                        $(productos).each(function (index, value) {
                                    htmlselect += '<label class="btn btn-primary">' +
                                            '<input type="radio" name="options" id="' + value.idProducto + '" value="' + value.idProducto + '" autocomplete="off">' + value.nombreProducto +
                                            "<div class='nombreproducto' style='display: none;'>" + value.nombreProducto + "</div>" +
                                            "<div class='precioproducto' style='display: none;'>" + value.precioProducto + "</div>" +
                                            "<div class='idproducto' style='display: none;'>" + value.idProducto + "</div>" +
                                            "<div class='idsubmenu' style='display: none;'>" + value.idSubmenu + "</div>" +
                                            "<div class='nombresubmenu' style='display: none;'>" + nombreSubmenu + "</div>" +
                                            "<div class='nombremenu' style='display: none;'>" + nombreMenu + "</div>" +
                                            "<div class='idmenu' style='display: none;'>" + idMenu + "</div>" +
                                            '</label>';
                                })
                                        ).then(function () {
                                    htmlselect += '</div>' +
                                            '</center><br>' +
                                            '<div id="contentPizzasPrincipal"></div>';
                                    $(".contenidoSeleccionPizza").append(htmlselect);
                                    //$(".contenidoSeleccionaProducto").html(htmlsubmenu);
                                });
                            },
                            error: function (error) {
                                console.log('Disculpe, existió un problema al consultar los productos');
                                console.log(error);
                            },
                            complete: function (xhr, status) {
                                console.log('Petición realizada');
                            }
                        });
                        //***************mostrar modal de pizza
                        $("#ModalSeleccionPizza").modal("show");
                        $(".contentIngredientes").hide("slow");
                        /*
                         $.when($("#menuwizard").slideUp("slow")).then(function () {
                         $("#ModalSeleccionPizza").slideDown("slow");
                         });
                         */
                    } else if (idmenu == "6") {
                        enviaProducto([], "");
                    } else {
                        console.log("NO HUBO COINCIDENCIA" + idmenu);
                    }
                }
            },
            error: function (error) {
                console.log('Disculpe, existió un problema llamando los datos del item');
                console.log(error);
            },
            complete: function (xhr, status) {
                console.log('Llamando Nombre del menu: LISTO');
            }
        });
    }
    $("#dom_cod_dirulo").focus();
}








////////////////////////////////////////////////////////////////////////////////VENTANA MODAL CON EL RESUMEN DE LA FACTURA
function resumenfactura() {
    var renglones = 0;
    var renglones_datos = new Array();
    $(".contenTablaPedido tr").each(function () {
        if (renglones != 0) {
            renglones_datos.push("" + $(this).html() + "");
        }
        renglones++;
    });
    $.ajax({
        url: 'assets/domicilio/dom_controller.php',
        type: 'POST',
        data: {
            dom_resumen: renglones,
        },
        success: function (html) {
            $("#factura_checkout .modal-dialog .modal-content .modal-body").html(html);
            $("#resumen_nombrecliente").html("<span class='fa fa-user'></span> " + $("#nombre_cliente").val());
            $(".resumen_numeromesa").html("<span class='fa fa-thumb-tack'></span> Domicilio ");
            $(".resumen_numerodepedido").html("Pedido # <span id='id_pedido'> Nuevo </span>");
            $(".resumen_fecha").html("<span class='fa fa-clock-o'></span>" + $("#fecha_actual").val());
            $(".resumen_subtotal").html($(".subtotalFactura").html());
            var descuento = $("#descuento_factura").val();
            if (descuento === "") {
                $(".resumen_descuento").html("$0.00" + descuento);
            } else {
                $(".resumen_descuento").html("$" + descuento);
            }
            $(".resumen_iva").html($(".ivaFactura").html());
            var pagadocon = "";
            $("#payment_methods_table input[type=checkbox]").each(function () { /////////////VALIDAMOS QUE NO EXISTAN CAMPOS VACIOS EN LOS METODOS DE PAGO
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

////////////////////////////////////////////////////////////////////////////////FECHA AUTOMATICA PARA EL PEDIDO
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

////////////////////////////////////////////////////////////////////////////////AUTOCOMPLETE DE LOS INPUTS
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

function calcularVuelto() {
    var montocaumulado = 0;
    var totalapagar = $(".totalapagarFactura").html();
    var valortotalapagar = parseFloat(totalapagar);
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

function detalledelpago() {
    var subtotal = 0, precio;
    $("#resumen_pedido div.list-group-item").each(function () {
        precio = $(this).find(".list-group-controls .precio").html().substring(1);
        subtotal += parseFloat(precio);
    });
    $(".subtotalFactura").html(subtotal.toFixed(2));
    $(".ivaFactura").html((subtotal * 0.12).toFixed(2));
    $(".totalapagarFactura").html((subtotal * 1.12).toFixed(2));
    calcularVuelto();
}



//////////////////////////////////////////////////////////////////////////////////DEBUG CLICK
//$(document).on('click', '#showmodal', function() {
//    detalledelpago();
//});