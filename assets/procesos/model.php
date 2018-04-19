<script type="text/javascript" src="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.min.js"></script>
<script>

    var longitud;
    var sublongitud;
    var posicion = 1;
    var subposicion = 1;
    var estadoCont = 1;

    $(document).ready(function () {

        cargaPedidos();

        //////////////////////////////////////////////////////////////////SETEAMOS LOS ESTILOS PARA LA VENTANA DE COCINA
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
        var formData = new FormData();
        formData.append('getpedidos', 'true');
        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/procesos/control.php',
            type: 'POST',
            data: formData,
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            success: function (pedidos) {
                posicion = 1;
                $(".contenedorCocina").html("");
                var sliderpedidos = '', previewpedidos = '';
                if (pedidos.length != 0) {
                    $(pedidos).each(function (index, value) {
                        var tile, icon, enunciadoMesa;
                        switch (value.estadoPedido) {
                            case "SOLICITADO":
                                tile = "bgblue";
                                icon = '<i class="fas fa-asterisk fa-spin fa-5x"></i> ';
                                break;
                            case "EN PROCESO":
                                tile = "bgorange";
                                icon = '<i class="fas fa-sync-alt fa-spin fa-5x"></i> ';
                                break;
                            case "LISTO PARA ENTREGAR":
                                tile = "bggreen";
                                icon = '<i class="fas fa-check  fa-5x"></i> ';
                                break;
                            case "ENTREGADO":
                                tile = "bgdark";
                                icon = '<i class="fas fa-thumbs-up fa-spin fa-5x"></i> ';
                                break;
                        }
                        if (value.numeroMesa == 999) {
                            enunciadoMesa = value.estadoMesa;
                        } else {
                            enunciadoMesa = "Mesa " + value.numeroMesa;
                        }

                        sliderpedidos += '<div>' +
                                '    <div class="widget ' + tile + ' widget-item-icon">' +
                                '        <div class="widget-item-left">' +
                                '          ' + icon + '  ' +
                                '        </div>' +
                                '        <div class="widget-data">' +
                                '            <div class="widget-int num-count">' + enunciadoMesa + '</div>' +
                                '            <div class="widget-title">Pedido # ' + value.idPedido + '</div>' +
                                '        </div>              ' +
                                '    </div>' +
                                '</div>';

                        $.ajax({
                            // Verificacion de los datos introducidos
                            url: 'assets/procesos/control.php',
                            type: 'POST',
                            data: {
                                getpedidos: value.idPedido,
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

                        previewpedidos += '<div>' +
                                '   <div class="col-md-4">' +
                                '       <div class="panel panel-default">' +
                                '           <div class="panel-heading ' + tile + '">' +
                                '               <center>' +
                                '                   <h2 class="pull-left txtwhite"><b>' + enunciadoMesa + '</b></h2>' +
                                '               </center>' +
                                '           </div>' +
                                '           <div class="panel-body listadopedidos' + value.idPedido + '">' +
                                '               <div class="list-group border-bottom">' +
                                '                   <a href="#" class="font200 list-group-item active">Pizza 4 estaciones</a>' +
                                '               </div> ' +
                                '           </div>' +
                                '           <div class="panel-footer ' + tile + ' pull-right">' +
                                '               <center>' +
                                '                   <h3 class="pull-right txtwhite">Pedido # ' + value.idPedido + '</h3>' +
                                '               </center>' +
                                '           </div>' +
                                '      </div>' +
                                '   </div>' +
                                '</div>';
                    });
                    //////////////////////////////////////////////////////////////////CONSTRUIMOS LOS SLIDERS DE LOS PEDIDOS
                    $('.slider-nav').html(sliderpedidos);
                    $('.slider-for').html(previewpedidos);
                    $('.slider-nav').slick({
                        slidesToShow: 5, slidesToScroll: 1, asNavFor: '.slider-for', dots: false, centerMode: true, focusOnSelect: true, centerPadding: '60px'
                    });
                    $('.slider-for').slick({
                        slidesToShow: 1, slidesToScroll: 1, arrows: false, fade: true, asNavFor: '.slider-nav'
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
        var mesa_nro = $(this).parent().parent().html().slice(0, 7).replace('<', '');
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

    $(document).keypress(function (event) {

        ///////////////////////////////////////////////////////////////// CUANDO EL OPERADOR NAVEGA HACIA LOS LATERALES
        if (event.keyCode == 100) {
            $('.slider-nav').slick('slickNext');
        }
        if (event.keyCode == 97) {
            $('.slider-nav').slick('slickPrev');
        }
        console.log(event.keyCode);
    });
</script>