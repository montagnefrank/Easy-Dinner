/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////********************************************************************************************//////////////////////////////////
///////////////////////////******************************SCRIPT DEL TABLERO DE DOMICILIOS******************************//////////////////////////////////
///////////////////////////********************************************************************************************//////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$.ajax({
    // Verificacion de los datos introducidos
    url: 'assets/domicilio/dom_controller.php',
    dataType: "json",
    type: 'POST',
    data: {
        dom_dashboard: "active",
    },
    success: function (pedidos) {
        $(".mesas-disp").text(pedidos.length + " Pedidos");
        if (pedidos.length != 0) {
            $(pedidos).each(function (index, value) {
                console.log(value);
                var tile, icon;
                if(value.estadoPedido == "SOLICITADO"){
                    tile = "tile-info";
                    icon = '<i class="fa fa-asterisk fa-2x" style="font-size:20px;color:white;" aria-hidden="true"></i>';
                }
                else if(value.estadoPedido == "EN PROCESO"){
                        tile = "tile-warning";
                        icon = '<i class="fa fa-refresh fa-spin fa-2x fa-fw" style="font-size:20px;color:white;"></i>';
                }
                else if(value.estadoPedido == "LISTO PARA ENTREGAR"){
                        tile = "tile-success";
                        icon = '<i class="fa fa-check" style="font-size:20px;color:white;" aria-hidden="true"></i>';
                }
                else if(value.estadoPedido == "ENTREGADO"){
                        tile = "tile-default";
                        icon = '<i class="fa fa-thumbs-o-up" aria-hidden="true" style="font-size:20px;color:black;"></i>';
                }

                var tipopedido;



                if(value.estadoMesa == "DOMICILIO"){
                    $(".contenedorPedido").append(
                        '<div class="col-md-3">' +
                        '<a href="#" class="tile ' + tile + ' estadoPedido" style="padding: 22px;font-size: 28px;">' +
                        "PEDIDO A DOMICILIO" +
                        '<p> Pedido # ' + value.idPedido + '</p>' +
                        '<div style="position: absolute;top: -24px;right: 2px;">' + icon + '</div>' +
                        '<div style="position: absolute;top: -5px;left: 7px;"><p style="font-size:25px;color:white;">' + (index + 1) + '</p></div>' +
                        '<div style="display:none;" class="idMesa">' + value.idMesa + '</div>' +
                        '<div style="display:none;" class="numeroMesa">' + value.numeroMesa + '</div>' +
                        '<div style="display:none;" class="idPedido">' + value.idPedido + '</div>' +
                        '<div style="display:none;" class="estadoPedido">' + value.estadoPedido + '</div>' +
                        '<div style="display:none;" class="tipoPedido">' + value.estadoMesa + '</div>' +
                        '</a>' +
                        '</div>'
                    );

                }else{
                    $(".contenedorPedido").append(
                        '<div class="col-md-3">' +
                        '<a href="#" class="tile ' + tile + ' estadoPedido" style="padding: 22px;font-size: 28px;">' +
                        "PED. PARA LLEVAR" +
                        '<p> Pedido # ' + value.idPedido + '</p>' +
                        '<div style="position: absolute;top: -24px;right: 2px;">' + icon + '</div>' +
                        '<div style="position: absolute;top: -5px;left: 7px;"><p style="font-size:25px;color:white;">' + (index + 1) + '</p></div>' +
                        '<div style="display:none;" class="idMesa">' + value.idMesa + '</div>' +
                        '<div style="display:none;" class="numeroMesa">' + value.numeroMesa + '</div>' +
                        '<div style="display:none;" class="idPedido">' + value.idPedido + '</div>' +
                        '<div style="display:none;" class="estadoPedido">' + value.estadoPedido + '</div>' +
                        '<div style="display:none;" class="tipoPedido">' + value.estadoMesa + '</div>' +
                        '</a>' +
                        '</div>'
                    );
                }


            });
        } else
            if (pedidos.length == 0) {
                $(".listaPedidos").append("<center><p style='padding:10px;color:white;'>Ningun pedido por atender</p></center>");
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





////////////////////////////////////////////////////////////////////////////BOTON DE NUEVO PEDIDO
$(document).on('click', '#newdom_btn', function () {
    $("#newdom_form").submit();
});



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

$(document).on("click", "#dom_mostrarmenu", function (event) {
    $(".dom_menupanel").toggle(1000);
});


