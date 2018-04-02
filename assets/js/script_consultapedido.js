$(document).ready(function() {

    $( ".dashboard" ).removeClass("active");
    $( ".pedidos" ).addClass("active");
    $( ".cocina" ).removeClass("active");

    $.ajax({
        // Verificacion de los datos introducidos
        url : 'assets/mesas/consultaPedidos.php',
        dataType: "json",
        type : 'POST',
        success : function(pedidos) {
            console.log(pedidos);
            $(".mesas-ocu").text(pedidos.length + " ocupadas");
            if(pedidos.length != 0){
                $(pedidos).each(function(index,value) {
                    var tile, icon;
                    if(value.estadoPedido == "SOLICITADO"){
                        tile = "tile-info";
                        icon = '<i class="fa fa-asterisk fa-2x" style="font-size:20px;color:white;" aria-hidden="true"></i>';
                    }
                    else
                        if(value.estadoPedido == "EN PROCESO"){
                            tile = "tile-warning";
                            icon = '<i class="fa fa-refresh fa-spin fa-2x fa-fw" style="font-size:20px;color:white;"></i>';
                        }
                    else
                        if(value.estadoPedido == "LISTO PARA ENTREGAR"){
                            tile = "tile-success";
                            icon = '<i class="fa fa-check" style="font-size:20px;color:white;" aria-hidden="true"></i>';
                        }
                    else
                        if(value.estadoPedido == "ENTREGADO"){
                            tile = "tile-default";
                            icon = '<i class="fa fa-thumbs-o-up" aria-hidden="true" style="font-size:20px;color:black;"></i>';
                        }

                    $(".contenedorPedido").append(                     
                        '<div class="col-md-3">'+
                        '<a href="#" class="tile '+tile+' estadoPedido" style="padding: 22px;">'+
                        'Mesa '+value.numeroMesa+
                        '<p> Pedido # '+value.idPedido+'</p>'+                       
                        '<div style="position: absolute;top: -24px;right: 2px;">'+icon+'</div>'+
                        '<div style="position: absolute;top: -5px;left: 7px;"><p style="font-size:25px;color:white;">'+(index+1)+'</p></div>'+
                        '<div style="display:none;" class="idMesa">'+value.idMesa+'</div>'+
                        '<div style="display:none;" class="numeroMesa">'+value.numeroMesa+'</div>'+
                        '<div style="display:none;" class="idPedido">'+value.idPedido+'</div>'+
                        '<div style="display:none;" class="estadoPedido">'+value.estadoPedido+'</div>'+
                        '</a>'+
                        '</div>'
                    );
                });
            }else
                if(pedidos.length == 0){
                    $(".listaPedidos").append("<center><p style='padding:10px;color:white;'>Ningun pedido por atender</p></center>");
                }
        },
        error : function(error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete : function(xhr, status) {
            console.log('Petición realizada');
        }
    });
});

cargaSelectNuevoPedido();

var idMesa, numeroMesa, idPedido, estadoPedido;
$(document).on('click','.estadoPedido', function(e) {

    idMesa = $(this).find(".idMesa").html();
    numeroMesa = $(this).find(".numeroMesa").html();
    idPedido = $(this).find(".idPedido").html();
    estadoPedido = $(this).find(".estadoPedido").html();


    $.ajax({
        // Verificacion de los datos introducidos
        url : 'assets/mesas/asignaMesa.php',
        data : { 
            idmesa : idMesa,
            numeromesa : numeroMesa,
            idpedido : idPedido
        },
        type : 'POST',
        success : function(idmesa) {
            asignaPedido(idPedido);
            $("#ModalEstadoPedido").modal("show");
        },
        error : function(error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete : function(xhr, status) {
            console.log('Petición realizada');
        }
    });
});



function asignaPedido(idpedido){

    $.ajax({
        // Verificacion de los datos introducidos
        url : 'assets/mesas/consultaProductos.php',
        type : 'POST',
        data : { 
            idpedido : idpedido,
        },
        success : function(pedidos) {

            $(".tituloEstadoPedido").html("<center>Pedido # "+idPedido+" en Mesa "+numeroMesa+"</center>");


            $(".contenidoEstadoPedido").html(
                pedidos
            );
            $("#ModalEstadoPedido").modal("show");
        },
        error : function(error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete : function(xhr, status) {
            console.log('Petición realizada');
        }
    });
}


var idpedidoproducto,
    idpedidoproductocombinado1,
    idpedidoproductocombinado2,
    idpedidoproductocombinado3,
    descripcionpedidoproducto,
    menupedidoproducto;
//PARA CANCELAR EL PEDIDO
$(document).on('click','.cancelarPedido', function(e) {

    idpedidoproducto = $(this).parent().parent().find(".idpedidoproducto").html();
    var nombrepedidoproducto = $(this).parent().parent().find(".nombrepedidoproducto").html();
    var submenupedidoproducto = $(this).parent().parent().find(".submenupedidoproducto").html();
    descripcionpedidoproducto = $(this).parent().parent().find(".descripcionpedidoproducto").html();
    menupedidoproducto = $(this).parent().parent().find(".menupedidoproducto").html();

    var html = "<br>"+
        "<div style='padding: 20px;'><div class='tile tile-primary' style='padding: 20px;'>"+
        "<p style='font-size: 20px;text-align: center;'><b>"+nombrepedidoproducto+"</b></p>";

    if((descripcionpedidoproducto != "Unitario" && descripcionpedidoproducto !== "entera")){
        if(descripcionpedidoproducto =="Combinada 1/2"){
            idpedidoproductocombinado1 = $(this).parent().parent().find(".idpedidoproductocombinado1").html();
            html += "<p style='font-size: 20px;text-align: center;'>"+submenupedidoproducto+"</p>";
            html += "<p style='font-size: 20px;text-align: center;'>"+$(this).parent().parent().find(".nombrepedidoproductocombinado1").html()+"</p>";
        }
        else
            if(descripcionpedidoproducto =="Combinada 1/4"){
                idpedidoproductocombinado1 = $(this).parent().parent().find(".idpedidoproductocombinado1").html();
                html += "<p style='font-size: 20px;text-align: center;'>"+submenupedidoproducto+"</p>";
                html += "<p style='font-size: 20px;text-align: center;'>"+$(this).parent().parent().find(".nombrepedidoproductocombinado1").html()+"</p>";
            }
        else
            if(descripcionpedidoproducto =="Personalizada"){
                idpedidoproductocombinado1 = $(this).parent().parent().find(".idpedidoproductocombinado1").html();
                idpedidoproductocombinado2 = $(this).parent().parent().find(".idpedidoproductocombinado2").html();
                idpedidoproductocombinado3 = $(this).parent().parent().find(".idpedidoproductocombinado3").html();

                html += "<p style='font-size: 20px;text-align: center;'>"+submenupedidoproducto+"</p>";
                html += "<p style='font-size: 20px;text-align: center;'>"+$(this).parent().parent().find(".submenupedidoproductocombinado1").html()+"</p>";
                html += "<p style='font-size: 20px;text-align: center;'>"+$(this).parent().parent().find(".submenupedidoproductocombinado2").html()+"</p>";
                html += "<p style='font-size: 20px;text-align: center;'>"+$(this).parent().parent().find(".submenupedidoproductocombinado3").html()+"</p>";
            }
        html += "<p style='font-size: 15px;text-align: center;padding-top: 15px;font-style: italic;'>"+descripcionpedidoproducto+"</p>";
    }else{
        if(menupedidoproducto != "Bebidas"){
            html += "<p style='font-size: 20px;text-align: center;'>"+submenupedidoproducto+"</p>";
        }
    }

    html +="</div></div>"+
        "<br>"+
        "<p style='font-size: 20px;text-align: center;'> Desea realmente cancelar el pedido actual ?</p>";
    $(".contenidoCancelar").html(html);
    $(".modalCancelar").modal("show");

});

//CONFIRMACION DE CANCELACION DE PEDIDO
$(document).on('click','.confirmaCancelaPedido', function(e) {

    $.ajax({
        // Verificacion de los datos introducidos
        url : 'assets/mesas/cancelaPedido.php',
        type : 'POST',
        data : { 
            idpedidoproducto : idpedidoproducto,
            idpedidoproductocombinado1 : idpedidoproductocombinado1,
            idpedidoproductocombinado2 : idpedidoproductocombinado2,
            idpedidoproductocombinado3 : idpedidoproductocombinado3,
            descripcionpedidoproducto : descripcionpedidoproducto,
            menupedidoproducto : menupedidoproducto,
            numeromesa : numeroMesa,
            idpedido : idPedido
        },
        success : function(nropedidos) {
            if(parseInt(nropedidos) > 0 ){
                asignaPedido(idPedido);
                $(".modalCancelar").modal("hide");
            }
            else
                if(parseInt(nropedidos) == 0){
                    $(".modalCancelar").modal("hide");
                    $("#ModalEstadoPedido").modal("hide");

                    $(".estadoPedido .numeroMesa").each(function( index ) {
                        if($(this).text() == numeroMesa){
                            $(this).parent().remove();
                        }
                    });

                    actualizaTabla();
                    cargaSelectNuevoPedido();
                }
        },
        error : function(error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete : function(xhr, status) {
            console.log('Petición realizada');
        }
    });

});


function actualizaTabla(){

    $.ajax({
        // Verificacion de los datos introducidos
        url : 'assets/mesas/consultaPedidos.php',
        dataType: "json",
        type : 'POST',
        success : function(pedidos) {
            $(".mesas-ocu").text(pedidos.length + " ocupadas");
        },
        error : function(error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete : function(xhr, status) {
            console.log('Petición realizada');
        }
    });
}

function cargaSelectNuevoPedido(){
    //Para consultar las mesas existentes acorde al establecimiento
    $.ajax({
        // Verificacion de los datos introducidos
        url : 'assets/mesas/mesas.php',
        dataType:"json",
        data : { 
            idestablecimiento : true,
        },
        type : 'GET',
        success : function(mesas) {
            $(".mesas-disp").text(mesas.length+ " disponibles");
            var htmlcontent = "<option value=''>Seleccione un # de mesa ..</option>";
            $.when(
                $(mesas).each(function(ind,val) {
                    htmlcontent += "<option value='"+val.idMesa+"'>Mesa "+val.numeroMesa+"</option>";
                })
            ).then(function(){
                $("#selectMesas").html(htmlcontent);
            });
        },
        error : function(error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete : function(xhr, status) {
            console.log('Petición realizada');
        }
    });
}

$(document).on('click', '.pedido_imprimir', function () {
    var mesa_nro = $("#ModalEstadoPedido .modal-body h3:eq(0)").html();
    var pedido_nro = $("#ModalEstadoPedido .modal-header h4:eq(0)").html();
    var pedidos = $("#ModalEstadoPedido .modal-body").children("div");
    var output = "";
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    output += "<tr><td> " + mesa_nro + "  <br /></td></tr> \n\ ";
    output += "<tr><td> " + pedido_nro + " <br /></td></tr> \n\ ";
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    $(pedidos).each(function (index, value) {
        var ped = $(value).find(".nombrepedidoproducto").html();
        var cat = $(value).find(".submenupedidoproducto").html();
        var table = $(value).children("table").html();
        var table_obj = $(value).children("table");
        if (table == null){
            output += "<tr><td> " + ped + " - " + cat + " <br /></td></tr> \n\ ";
        } else {
            output += "<tr><td> " + ped + " - " + cat + " <br /></td></tr> \n\ ";
            $(table_obj).find("tbody tr td ul li").each(function (index, value) {
                var ing = $(value).html();
                output += "<tr><td> " + ing + " <br /></td></tr> \n\ ";
            });
            output += "<tr><td> --------------------- <br /></td></tr> \n\ ";
        }
    });
    output += "<tr><td> ======================== <br /></td></tr> \n\ ";
    $("body").append("<table id='pedido_imprimir'><tbody> " + output + " </tbody></table>");
    $('#pedido_imprimir').tableExport({type: 'pdf', escape: 'false'});
    console.log(output);
});