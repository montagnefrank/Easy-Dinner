var longitud;
var sublongitud;
var posicion = 1;
var subposicion = 1;
var estadoCont = 1;

$(document).ready(function () {
    $(".dashboard").removeClass("active");
    $(".pedidos").removeClass("active");
    $(".cocina").addClass("active");

    cargaPedidos();

    $("body").keypress(function (event) {


        navegaPedidos(event.keyCode);

        if (event.keyCode == 101) {
            //5
            if ($(".item" + posicion + " .subitem" + subposicion + " .inputMesa #chk_pedido").is(':checked')) {
                console.log("checkado");
                $(".item" + posicion + " .subitem" + subposicion).css("background", "");
                $(".item" + posicion + " .subitem" + subposicion).css("color", "");
                $(".item" + posicion + " .subitem" + subposicion + " .inputMesa #chk_pedido").prop("checked", false);
            } else {
                console.log("no checkado");

                $(".item" + posicion + " .subitem" + subposicion).css("background", "#337ab7");
                $(".item" + posicion + " .subitem" + subposicion).css("color", "white");
                $(".item" + posicion + " .subitem" + subposicion + " .inputMesa #chk_pedido").prop("checked", true);
            }
            estableceScreenEstado();
        }

        if (event.keyCode == 114 || event.keyCode == 116) {
            //47 / , 42 * , 45 - , 43 +

            if ($(".estadoP").is(":visible")) {
                if (event.keyCode == 114) {
                    if (estadoCont > 3) {
                        $("#rdEstado" + estadoCont).parent().css("background", "");
                        $("#rdEstado" + estadoCont).parent().css("color", "#656C78");
                        $("#rdEstado" + estadoCont).parent().css("box-shadow", "");
                        estadoCont = 1;
                        $("#rdEstado" + estadoCont).parent().css("background", "#ed4444");
                        $("#rdEstado" + estadoCont).parent().css("color", "white");
                        $("#rdEstado" + estadoCont).parent().css("box-shadow", "0px 6px 5px 0px #888888");
                    } else {
                        $("#rdEstado" + estadoCont).parent().css("background", "");
                        $("#rdEstado" + estadoCont).parent().css("color", "#656C78");
                        $("#rdEstado" + estadoCont).parent().css("box-shadow", "");
                        estadoCont++;
                        $("#rdEstado" + estadoCont).parent().css("background", "#ed4444");
                        $("#rdEstado" + estadoCont).parent().css("color", "white");
                        $("#rdEstado" + estadoCont).parent().css("box-shadow", "0px 6px 5px 0px #888888");
                    }
                } else
                    if (event.keyCode == 116) {
                        console.log(estadoCont);


                        var idProductos = [];
                        $.when(
                            $('#chk_pedido:checked').each(function () {
                                idProductos.push(
                                    {
                                        idpedido: ($(this).parent().parent().find(".idpedido").html()),
                                        idpedidoproducto: ($(this).parent().parent().find(".idpedidoproducto").html())
                                    });
                            })
                        ).then(function () {



                            if (estadoCont == 1) {
                                //SOLICITADO 
                                estableceEstado(idProductos, "SOLICITADO");
                            } else
                                if (estadoCont == 2) {
                                    //EN PROCESO *
                                    estableceEstado(idProductos, "EN PROCESO");
                                } else
                                    if (estadoCont == 3) {
                                        //LISTO PARA ENTREGAR -
                                        estableceEstado(idProductos, "LISTO PARA ENTREGAR");
                                    } else
                                        if (estadoCont == 4) {
                                            //ENTREGADO +
                                            estableceEstado(idProductos, "ENTREGADO");
                                        }

                        });


                    }
            } else {
                console.log("invisible");
            }

        }

    });

    $(".page-content").css("height", "");
    $(".page-content").css("padding-bottom", "200px");

});

function seleccionaMesaPedido() {

    $(".item" + posicion).css("border", "5px solid #000000");
    $(".item" + posicion).css("box-shadow", "6px 6px 6px #888888");
    $(".item" + posicion).parent().css("padding", "4px");

    $(".item" + posicion + " .subitem" + subposicion).css("border", "5px solid #000000");
    $(".item" + posicion + " .subitem" + subposicion).css("box-shadow", "6px 6px 6px #888888");
    $(".item" + posicion + " .subitem" + subposicion).css("padding", "4px");

    $('html, body').animate({
        scrollTop: $(".item" + posicion + " .subitem" + subposicion).offset().top - 150
    }, 250);
}

function deseleccionaMesaPedido() {
    $(".item" + posicion).css("border", "1px solid darkgray");
    $(".item" + posicion).css("box-shadow", "");
    $(".item" + posicion).parent().css("padding", "8px");

    $(".item" + posicion + " .tile").css("border", "1px solid white");
    $(".item" + posicion + " .tile").css("box-shadow", "");
    $(".item" + posicion + " .tile").css("padding", "");
}

function navegaMesas(codigo) {
    if ((posicion > 0) && (posicion < longitud)) {
        if (codigo == 115) {
            //2

            if ((posicion + 3) <= longitud) {
                deseleccionaMesaPedido();
                posicion = posicion + 3;
                seleccionaMesaPedido();
            } else {


            }
        } else
            if (codigo == 97) {
                //4
                deseleccionaMesaPedido();
                posicion != 1 ? posicion-- : null;
                seleccionaMesaPedido();

            } else
                if (codigo == 100) {
                    //6
                    deseleccionaMesaPedido();
                    posicion < longitud ? posicion++ : null;
                    seleccionaMesaPedido();
                } else
                    if (codigo == 119) {
                        //8
                        if ((posicion - 3) >= 1) {
                            deseleccionaMesaPedido();
                            posicion = posicion - 3;
                            seleccionaMesaPedido();
                        }
                    }
    } else
        if (posicion == longitud) {
            if (codigo == 97) {
                //4
                deseleccionaMesaPedido();
                posicion != 1 ? posicion-- : null;
                seleccionaMesaPedido();
            } else
                if (codigo == 119) {
                    //8
                    if ((posicion - 3) >= 1) {
                        deseleccionaMesaPedido();
                        posicion = posicion - 3;
                        seleccionaMesaPedido();
                    }
                }
        }
}

function navegaPedidos(codigo) {
    sublongitud = $(".item" + posicion + " .tile").length;
    if (codigo == 115) {
        //2

        if ((subposicion > 0) && (subposicion < sublongitud)) {

            $(".item" + posicion + " .subitem" + subposicion).css("border", "1px solid white");
            $(".item" + posicion + " .subitem" + subposicion).css("box-shadow", "");
            $(".item" + posicion + " .subitem" + subposicion).css("padding", "");

            subposicion < sublongitud ? subposicion++ : null;

            $(".item" + posicion + " .subitem" + subposicion).css("border", "5px solid #000000");
            $(".item" + posicion + " .subitem" + subposicion).css("box-shadow", "6px 6px 6px #888888");
            $(".item" + posicion + " .subitem" + subposicion).css("padding", "4px");

            if (subposicion > 3) {
                $('html, body').animate({
                    scrollTop: $(".item" + posicion + " .subitem" + subposicion).offset().top - 500
                }, 250);
            } else
                if (subposicion < 4) {
                    $('html, body').animate({
                        scrollTop: $(".item" + posicion + " .subitem1").offset().top - 150
                    }, 250);
                }
        } else
            if ((subposicion == sublongitud) && ((posicion + 3) <= longitud)) {
                subposicion = 1;
                navegaMesas(event.keyCode);
            }
    } else
        if (codigo == 119) {
            //8
            if (subposicion == 1) {
                navegaMesas(event.keyCode);
            } else
                if ((subposicion > 1)) {
                    $(".item" + posicion + " .subitem" + subposicion).css("border", "1px solid white");
                    $(".item" + posicion + " .subitem" + subposicion).css("box-shadow", "");
                    $(".item" + posicion + " .subitem" + subposicion).css("padding", "");

                    subposicion != 1 ? subposicion-- : null;


                    $(".item" + posicion + " .subitem" + subposicion).css("border", "5px solid #000000");
                    $(".item" + posicion + " .subitem" + subposicion).css("box-shadow", "6px 6px 6px #888888");
                    $(".item" + posicion + " .subitem" + subposicion).css("padding", "4px");
                    //                    $('html, body').animate({
                    //                        scrollTop: $(".item"+posicion+" .subitem"+subposicion).offset().top - 150
                    //                    }, 250);


                    if (subposicion > 3) {
                        $('html, body').animate({
                            scrollTop: $(".item" + posicion + " .subitem" + subposicion).offset().top - 500
                        }, 250);
                    } else
                        if (subposicion < 4) {
                            $('html, body').animate({
                                scrollTop: $(".item" + posicion + " .subitem1").offset().top - 150
                            }, 250);
                        }
                }
        } else
            if (codigo == 97) {
                //4
                subposicion = 1;
                navegaMesas(event.keyCode);
            } else
                if (codigo == 100) {
                    //6
                    subposicion = 1;
                    navegaMesas(event.keyCode);
                }
}

function asignaModal(posicion) {

    var idPedido = $(".item" + posicion).parent().find(".idPedido").html();
    var numeroMesa = $(".item" + posicion).parent().find(".numeroMesa").html();
    $(".tituloEstadoPedido").text("Mesa " + numeroMesa + " Pedido # " + idPedido);

    //$(".contenidoEstadoPedido").html("Mesa "+numeroMesa+" Pedido # "+idPedido);


    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/cocina/consultaProductos.php',

        type: 'POST',
        data: {
            idpedido: idPedido,
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

function estableceEstado(idPedidos, estado) {

    console.log(idPedidos);
    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/cocina/estadoProducto.php',
        type: 'POST',
        data: {
            productos: idPedidos,
            estadoproducto: estado
        },
        success: function (e) {
            console.log(e);
            $(".estadoP").hide("slow");
            cargaPedidos();
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

function cargaPedidos() {
    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/hacerpedido/consultaPedidos.php',
        type: 'POST',
        dataType: "json",
        success: function (pedidos) {
            posicion = 1;
            $(".contenedorCocina").html("");
            if (pedidos.length != 0) {
                longitud = pedidos.length;
                $.when(
                    $(pedidos).each(function (index, value) {
                        console.log(value);
                        var tile, icon;
                        if (value.estadoPedido == "SOLICITADO") {
                            tile = "tile-info";
                            icon = '<i class="fa fa-asterisk fa-2x" style="font-size:25px;color:white;" aria-hidden="true"></i>';
                        } else
                            if (value.estadoPedido == "EN PROCESO") {
                                tile = "tile-warning";
                                icon = '<i class="fa fa-refresh fa-spin fa-2x fa-fw" style="font-size:25px;color:white;"></i>';
                            } else
                                if (value.estadoPedido == "LISTO PARA ENTREGAR") {
                                    tile = "tile-success";
                                    icon = '<i class="fa fa-check" style="font-size:25px;color:white;" aria-hidden="true"></i>';
                                } else
                                    if (value.estadoPedido == "ENTREGADO") {
                                        tile = "tile-default";
                                        icon = '<i class="fa fa-thumbs-o-up" aria-hidden="true" style="font-size:25px;color:black;"></i>';
                                    }
                        var enunciadoMesa;
                        if(value.numeroMesa==999){
                            enunciadoMesa = value.estadoMesa;
                        }else{
                            enunciadoMesa = "Mesa "+value.numeroMesa;
                        }

                        if (index == 0) {
                            $(".contenedorCocina").append(
                                '<div class="col-md-4" style="padding: 8px;">' +
                                '<div href="#" class="tile ' + tile + ' estadoPedido item' + (index + 1) + '" style="padding: 5px;margin-bottom:0px;border:5px solid #000000;box-shadow:6px 6px 6px #888888;font-weight: bold;color:black;">' +
                                enunciadoMesa +
                                '<p> Pedido # ' + value.idPedido + '</p>' +
                                '<div style="position: absolute;top: -20px;right: 5px;">' + icon + '</div>' +
                                '<div style="position: absolute;top: -20px;right: 50px;"><i class="fa fa-print imprimir_pedido" aria-hidden="true" style="font-size:25px;color:white;"></i></div>' +
                                '<div style="position: absolute;top: -10px;left: 5px;"><p style="font-size:50px;color:white;">' + (index + 1) + '</p></div>' +
                                '</div>' +
                                '</div>'
                            );
                        } else {
                            $(".contenedorCocina").append(
                                '<div class="col-md-4" style="padding: 8px;">' +
                                '<div href="#" class="tile ' + tile + ' estadoPedido item' + (index + 1) + '" style="padding: 5px;margin-bottom:0px;font-weight: bold;color:black;">' +
                                enunciadoMesa +
                                '<p> Pedido # ' + value.idPedido + '</p>' +
                                '<div style="position: absolute;top: -20px;right: 5px;">' + icon + '</div>' +
                                '<div style="position: absolute;top: -20px;right: 50px;"><i class="fa fa-print imprimir_pedido" aria-hidden="true" style="font-size:25px;color:white;"></i></div>' +
                                '<div style="position: absolute;top: -10px;left: 5px;"><p style="font-size:50px;color:white;">' + (index + 1) + '</p></div>' +
                                '</div>' +
                                '</div>'
                            );
                        }
                    })
                ).then(function () {
                    asignaPedidos(pedidos);
                });

            } else
                if (pedidos.length == 0) {
                    longitud = 0;
                    $(".page-content").css("height", $(window).height());
                    $(".contenedorCocina").html("<center><h1 style='padding:10px;'><i class='fa fa-check-circle-o' aria-hidden='true'></i> Ningún pedido por atender</h1></center>");
                }
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

function asignaPedidos(pedidos) {
    $.when(
        $(pedidos).each(function (index, value) {
            $.ajax({
                // Verificacion de los datos introducidos
                url: 'assets/cocina/consultaProductos.php',
                type: 'POST',
                data: {
                    idpedido: value.idPedido,
                    index: (index + 1)
                },
                success: function (html) {
                    $(".item" + (index + 1)).append(html);
                },
                error: function (error) {
                    console.log('Disculpe, existió un problema');
                    console.log(error);
                },
                complete: function (xhr, status) {
                    console.log('Petición realizada');
                }
            });
        })
    ).then(function () {


    });
}

function estableceScreenEstado() {
    if ($('#chk_pedido:checked').length != 0) {
        $(".estadoP").show("slow");
        $('#chk_pedido:checked').length == 1 ? $(".tituloP").html("Seleccione el estado del producto seleccionado") : $(".tituloP").html("Seleccione el estado de los productos seleccionados");
    } else {
        $(".estadoP").hide("slow");
    }
}

$(document).on('click', '.imprimir_pedido', function () {
    var mesa_nro = $(this).parent().parent().html().slice(0,7).replace('<', '');
    var pedido_nro = $(this).parent().parent().find("p").html();
    var pedidos = $(this).parent().parent().find(".tile");
    var output = "";
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    output += "<tr><td> " + mesa_nro + "  <br /></td></tr> \n\ ";
    output += "<tr><td> " + pedido_nro + " <br /></td></tr> \n\ ";
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    $(pedidos).each(function (index, value) {
        var ped = $(value).find("p:eq(0)").html();
        var cat = $(value).find("p:eq(1)").html();
        output += "<tr><td> " + ped + " - " + cat + " <br /></td></tr> \n\ ";
    });
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    $("body").append("<table id='peiddo_imprimir'><tbody> " + output + " </tbody></table>");
    $('#peiddo_imprimir').tableExport({type: 'pdf', escape: 'false'});
    $('#peiddo_imprimir').remove();
    console.log(output);
});