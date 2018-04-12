var nombre, precio, id, idSubmenu, nombreSubmenu, idmenu, nombreMenu, producto, selectedOption;

var idSubmenu, pizzaTemporal, arrayProductos = [], descripcionPedido = [],
        entera, media1, media2, cuarto1, cuarto2, per1, per2, per3, per4;

var arrayProductos = [], descripcionPedido = [];
var idsubmenu, detalle, idMenu, peditoTipo;

//Función PRincipal que inicializa el menu
function start_menu(op) {
    pedidoTipo = op;
    entera = Math.floor(getRandomArbitrary(1, 8));
    media1 = Math.floor(getRandomArbitrary(1, 8));
    media2 = Math.floor(getRandomArbitrary(1, 8));
    cuarto1 = Math.floor(getRandomArbitrary(1, 8));
    cuarto2 = Math.floor(getRandomArbitrary(1, 8));
    per1 = Math.floor(getRandomArbitrary(1, 8));
    per2 = Math.floor(getRandomArbitrary(1, 8));
    per3 = Math.floor(getRandomArbitrary(1, 8));
    per4 = Math.floor(getRandomArbitrary(1, 8));
    if (op == 'mesas') {
        // aca muestra solo el menu principal para pedidos desde una mesa
        menu_productos();
    } else {
        // por pedidos a domicilio o para llevar
        // muestra el radio button para seleccionar los menus o por codigo de producto
        radio_y_codigo();
        autocompleteCodigo();
    }
    ;
    creaSubDialogos();
}

//PARA CUANDO EL USUARIO ESCRIBE EN EL TEXTBOX EL CODIGO DEL PRODUCTO PARA ENCONTRARLO Y SELECCIONARLO
function autocompleteCodigo() {
    var options = {
        url: function (phrase) {
            return "assets/parallevar/parallevar_controller.php";
        },
        getValue: function (element) {
            return "<b>" + element.codProducto + ":" + element.nombreProducto + "</b>" + "<p>" + element.nombreSubmenu + "</p>";
        },
        ajaxSettings: {
            dataType: "json",
            method: "POST",
            data: {
                dataType: "json"
            }
        },
        preparePostData: function (data) {
            data.cod_busqueda = $("#parallevar_cod_dirulo").val();
            return data;
        },
        requestDelay: 100,
        list: {
            onClickEvent: function () {

                var res = $("#parallevar_cod_dirulo").val().split(":");
                var n = (res[0]).match(/\d/g);
                n = n.join("");
                $("#parallevar_cod_dirulo").val(n);
                estableceProducto($("#parallevar_cod_dirulo").val());
            },
            onKeyEnterEvent: function () {
                var res = $("#parallevar_cod_dirulo").val().split(":");
                var n = (res[0]).match(/\d/g);
                n = n.join("");
                $("#parallevar_cod_dirulo").val(n);
                estableceProducto($("#parallevar_cod_dirulo").val());
            }
        }
    };
    $("#parallevar_cod_dirulo").easyAutocomplete(options);
    $(".easy-autocomplete").css("width", "");
}

function estableceProducto(codigo) {
    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/parallevar/parallevar_controller.php',
        type: 'POST',
        dataType: "json",
        data: {
            parallevar_newprod: codigo,
        },
        success: function (producto) {

            $("#parallevar_cod_dirulo").val("");

            nombre = producto.nombreProducto;
            precio = producto.precioProducto;
            id = producto.idProducto;
            idSubmenu = producto.idSubmenu;
            nombreSubmenu = producto.nombreSubmenu;
            idmenu = producto.idMenu;
            nombreMenu = producto.nombreMenu;
            if (nombreMenu == "Ensaladas y Bocaditos" ||
                    nombreMenu == "Pastas" ||
                    nombreMenu == "Carnes" ||
                    nombreMenu == "Crepes y Postres") {
                asignaIngredientes(nombreMenu);
                $(".tituloSeleccionaIngredientes").html("Ingredientes " + nombre);

                $.when($("#menuwizard,.codigoproducto").slideUp("slow")).then(function () {
                    $("#ModalSeleccionaIngredientes").slideDown("slow");
                });
            } else if (nombreMenu == "Pizzas") {
                $(".tituloSeleccionPizza").html(nombre + " " + nombreSubmenu);
                $(".contenidoSeleccionPizza").html(
                        '<div id="contentPizzasPrincipal"><center><div class="btn-group radioPizza" data-toggle="buttons">' +
                        '<label class="btn btn-primary active">' +
                        '<input type="radio" name="options" value="" autocomplete="off" checked>Seleccione ..' +
                        '</label>' +
                        '<label class="btn btn-primary">' +
                        '<input type="radio" name="options" id="entera" value="entera" autocomplete="off">Entera' +
                        '</label>' +
                        '<label class="btn btn-primary">' +
                        '<input type="radio" name="options" id="medio" value="medio" autocomplete="off">Combinada 1/2' +
                        '</label>' +
                        '<label class="btn btn-primary">' +
                        '<input type="radio" name="options" id="cuarto" value="cuarto" autocomplete="off">Combinada 1/4' +
                        '</label>' +
                        '<label class="btn btn-primary">' +
                        '<input type="radio" name="options" id="personalizada" value="personalizada" autocomplete="off">Personalizada' +
                        '</label>' +
                        '</div>' +
                        '</center><br>' +
                        "<div class='col-md-12' id='contentSeleccion'></div></div>"
                        );
                //*******mostrar modal de pizzas
                $.when($(".contentIngredientes,.codigoproducto").slideUp("slow")).then(function () {
                    $("#ModalSeleccionPizza").slideDown("slow");
                });
            } else if (nombreMenu == "Bebidas") {
                //aqui es la seccion de bebidas
                $(".tituloModalPreferencias").html('Preferencias de ' + nombre);
                $(".contentModalPreferencias").html(
                        '<div class="row">' +
                        '<div class="col-md-12">' +
                        '<div class="col-md-5">' +
                        '<h4 class="txt-primary" style="padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
                        '</div>' +
                        '<div class="col-md-7">' +
                        '<div class="col-md-9 col-md-offset-3">' +
                        '<div class="form-group">' +
                        '<div class="center">' +
                        '<p></p>' +
                        '<div class="input-group">' +
                        '<span class="input-group-btn">' +
                        '<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                        '<span class="glyphicon glyphicon-minus"></span>' +
                        '</button>' +
                        '</span>' +
                        '<input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                        '<span class="input-group-btn">' +
                        '<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                        '<span class="glyphicon glyphicon-plus"></span>' +
                        '</button>' +
                        '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<br>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-md-12">' +
                        '<div class="form-group">' +
                        '<h4 class="txt-primary" style="">Observación del pedido :</h4>' +
                        '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                        );
                //volver a descomentar luego
                funcionalidadCantidad();
                $.when($("#menuwizard,.codigoproducto").slideUp("slow")).then(function () {
                    $("#ModalPreferencias").slideDown("slow");
                });
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

//RETORNA UN VALOR ALEATORIO
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// crea el radio para seleccion de opcion y el autocomplete
function radio_y_codigo() {
    /* CREA Y DA FUNCIONALIDAD AL RADIO BUTTON DE SELECCION DE 
     * MENU DE PRODUCTOS O PRODUCTO POR CODIGO*/
    //crea radio butons
    content = '<!--DGRA--><center><div  class="btn-group radioSeleccionproductos displaynode" data-toggle="buttons">' +
            '<label class="btn btn-primary active">' +
            '<input type="radio" name="options" value="" autocomplete="off" checked="">Seleccione ..</label>' +
            '<label class="btn btn-primary">' +
            '<input type="radio" name="options" id="codigo" value="codigo" autocomplete="off">Código de producto</label>' +
            '<label class="btn btn-primary">' +
            '<input type="radio" name="options" id="dom_mostrarmenu" value="menu" autocomplete="off">Menú de productos</label>'
    '</div></center>'
    $('#menucontent').append(content);
    //crea input de autocomplete
    content = '<div class="col-md-8 col-md-offset-2 codigoproducto displaynone" >' +
            '<label for="email_cliente" class="col-md-4 control-label" style="padding: 5px;text-align: right;">C&oacute;digo del producto</label>' +
            '<div class="col-md-8" style="padding: 5px;">' +
            '<input type="text" class="form-control" id="parallevar_cod_dirulo" placeholder="Ingrese el c&oacute;digo de producto aquí">' +
            '</div>' +
            '<br><br>' +
            '</div>';
    $('#menucontent').append(content);
    menu_productos();
}

// MENU PRINCIPAL --TABS--
function menu_productos() {
    /* CREA Y DA FUNCIONALIDAD AL MENU PRINCIPAL
     * --TABS-- CON LAS OPCIONES PRINCIPALES */
    //console.log('en menu productos');
    content = '<div id="menuwizard" class="panel panel-default menupanel displaynone content-prods">' +
            '<div class="panel-body">' +
            '<center><h4>Seleccione los pedidos del men&uacute;</h4></center>' +
            '<div class=" tabs">' +
            '<ul id="menuTabs" class="nav nav-tabs" role="tablist">' +
            '</ul>' +
            '</div>' +
            '<div class="panel-body tab-content tabContent">' +
            '</div>' +
            '</div>' +
            '</div>';
    $('#menucontent').append(content);
    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/hacerpedido/menu.php',
        dataType: "json",
        type: 'GET',
        success: function (menu) {
            asignarMenu(menu);
            // console.log(menu);
        },
        error: function (error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log('Consulta de menú realizada con exito');
        }
    });
}

//CREA LAS OPCIONES DE CADA TAB
function asignarMenu(menu) {
    htmlmenu = "";
    htmlcontent = "";
    $.when(
            //foreach de los elementos del menu
            $(menu).each(function (index, value) {
        //analisis de cada menu
        if (value.nombreMenu == "Ensaladas y Bocaditos") {
            $.ajax({
                // Para consultar los submenus de ensaladas y bocaditos
                url: 'assets/hacerpedido/contentMenu.php',
                dataType: "json",
                type: 'POST',
                data: {
                    idmenu: value.idMenu,
                },
                success: function (contenido) {
                    // console.log('ajax ensaladas');
                    // console.log(contenido);
                    htmlcontent += "<div class='tab-pane' id='tab-" + index + "'>";
                    //Iteracion de cada menu para determinar la muestra en la pantalla
                    $.when(
                            $(contenido).each(function (ind, val) {
                        if (val.nombreSubmenu == "Ensaladas") {
                            htmlcontent += "<button class='btn btn-primary btn-men btn-submenu'>" +
                                    "<h4 style='color:white;padding-top: 8px;' id='nombreSubmenu'>" + val.nombreSubmenu + "</h4>" +
                                    "<div class='idsubmenu' style='display: none;'>" + val.idSubmenu + "</div>" +
                                    "<div class='idmenu' style='display: none;'>" + value.idMenu + "</div>" +
                                    "<div class='nombremenu' style='display: none;'>" + value.nombreMenu + "</div>" +
                                    "</button>";
                        } else {
                            //obtiene los productos y los pone en el submenu
                            $.ajax({
                                // Verificacion de los datos introducidos
                                url: 'assets/hacerpedido/getProductos.php',
                                dataType: "json",
                                type: 'POST',
                                data: {
                                    idsubmenu: val.idSubmenu,
                                },
                                success: function (productos) {
                                    var htmlsubmenu = "";
                                    $.when(
                                            $(productos).each(function (index, v) {
                                        htmlsubmenu += "<button class='btn btn-primary btn-men btn-menu'>" +
                                                "<div><h4 style='color:white;padding-top: 8px;' id='nombreProducto'>" + v.nombreProducto + "</h4>" +
                                                "<div class='precioproducto' style='display: none;'>" + v.precioProducto + "</div>" +
                                                "<div class='idproducto' style='display: none;'>" + v.idProducto + "</div>" +
                                                "<div class='idsubmenu' style='display: none;'>" + v.idSubmenu + "</div>" +
                                                "<div class='nombresubmenu' style='display: none;'>" + val.nombreSubmenu + "</div>" +
                                                "<div class='idmenu' style='display: none;'>" + value.idMenu + "</div>" +
                                                "<div class='nombremenu' style='display: none;'>" + value.nombreMenu + "</div>" +
                                                "</button>";
                                    })
                                            ).then(function () {
                                        $("#tab-" + index).append(htmlsubmenu);
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
                        }
                    })
                            ).then(function () {
                        htmlcontent += "</div>";
                        $(".tabContent").append(htmlcontent);
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
        } else
        if (value.nombreMenu == "Pastas" || value.nombreMenu == "Bebidas") {
            $.ajax({
                // Para consultar los submenus del menu establecido
                url: 'assets/hacerpedido/contentMenu.php',
                dataType: "json",
                type: 'POST',
                data: {
                    idmenu: value.idMenu,
                },
                success: function (contenido) {
                    htmlcontent += "<div class='tab-pane' id='tab-" + index + "'>";
                    //Asignacion a la pantalla del menu
                    $.when(
                            $(contenido).each(function (ind, val) {
                        htmlcontent += "<button class='btn btn-primary btn-men btn-submenu'>" +
                                "<div><h4 style='color:white;padding-top: 8px;' id='nombreSubmenu'>" + val.nombreSubmenu + "</h4>" +
                                "<div class='idsubmenu' style='display: none;'>" + val.idSubmenu + "</div>" +
                                "<div class='idmenu' style='display: none;'>" + value.idMenu + "</div>" +
                                "<div class='nombremenu' style='display: none;'>" + value.nombreMenu + "</div>" +
                                "</button>";
                    })
                            ).then(function () {
                        htmlcontent += "</div>";
                        $(".tabContent").append(htmlcontent);
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
        } else
        if (value.nombreMenu == "Carnes") {
            $.ajax({
                // Para consultar los submenus de carnes
                url: 'assets/hacerpedido/contentMenu.php',
                dataType: "json",
                type: 'POST',
                data: {
                    idmenu: value.idMenu,
                },
                success: function (contenido) {
                    htmlcontent += "<div class='tab-pane' id='tab-" + index + "'>";
                    //Iteracion de cada menu para determinar la muestra en la pantalla
                    $.when(
                            $(contenido).each(function (ind, val) {
                        if (val.nombreSubmenu == "Carnes") {
                            //obtiene los productos y los pone en el submenu
                            $.ajax({
                                // Verificacion de los datos introducidos
                                url: 'assets/hacerpedido/getProductos.php',
                                dataType: "json",
                                type: 'POST',
                                data: {
                                    idsubmenu: val.idSubmenu,
                                },
                                success: function (productos) {
                                    var htmlsubmenu = "";
                                    $.when(
                                            $(productos).each(function (index, v) {
                                        htmlsubmenu += "<button class='btn btn-primary btn-men btn-menu'>" +
                                                "<div><h4 style='color:white;padding-top: 8px;' id='nombreProducto'>" + v.nombreProducto + "</h4>" +
                                                "<div class='precioproducto' style='display: none;'>" + v.precioProducto + "</div>" +
                                                "<div class='idproducto' style='display: none;'>" + v.idProducto + "</div>" +
                                                "<div class='idsubmenu' style='display: none;'>" + v.idSubmenu + "</div>" +
                                                "<div class='nombresubmenu' style='display: none;'>" + val.nombreSubmenu + "</div>" +
                                                "<div class='idmenu' style='display: none;'>" + value.idMenu + "</div>" +
                                                "<div class='nombremenu' style='display: none;'>" + value.nombreMenu + "</div>" +
                                                "</button>";
                                    })
                                            ).then(function () {
                                        $("#tab-" + index).append(htmlsubmenu);
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
                        }
                    })
                            ).then(function () {
                        htmlcontent += "</div>";
                        $(".tabContent").append(htmlcontent);
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
        } else
        if (value.nombreMenu == "Pizzas") {
            $.ajax({
                // Para consultar los submenus del menu establecido
                url: 'assets/hacerpedido/contentMenu.php',
                dataType: "json",
                type: 'POST',
                data: {
                    idmenu: value.idMenu,
                },
                success: function (contenido) {
                    htmlcontent += "<div class='tab-pane' id='tab-" + index + "'>";
                    //Asignacion a la pantalla del menu
                    $.when(
                            $(contenido).each(function (ind, val) {
                        htmlcontent += "<button class='btn btn-primary btn-men btn-submenu'>" +
                                "<div><h4 style='color:white;padding-top: 8px;' id='nombreSubmenu'>" + val.nombreSubmenu + "</h4>" +
                                "<div class='idsubmenu' style='display: none;'>" + val.idSubmenu + "</div>" +
                                "<div class='idmenu' style='display: none;'>" + value.idMenu + "</div>" +
                                "<div class='nombremenu' style='display: none;'>" + value.nombreMenu + "</div>" +
                                "</button>";
                    })
                            ).then(function () {
                        htmlcontent += "</div>";
                        $(".tabContent").append(htmlcontent);
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
        } else
        if (value.nombreMenu == "Crepes y Postres") {
            $.ajax({
                // Para consultar los submenus de ensaladas y bocaditos
                url: 'assets/hacerpedido/contentMenu.php',
                dataType: "json",
                type: 'POST',
                data: {
                    idmenu: value.idMenu,
                },
                success: function (contenido) {
                    htmlcontent += "<div class='tab-pane' id='tab-" + index + "'>";
                    //Iteracion de cada menu para determinar la muestra en la pantalla
                    $.when(
                            $(contenido).each(function (ind, val) {

                        if (val.nombreSubmenu == "Crepes" || val.nombreSubmenu == "Ensaladas de Frutas") {
                            htmlcontent += "<button class='btn btn-primary btn-men btn-submenu'>" +
                                    "<h4 style='color:white;padding-top: 8px;' id='nombreSubmenu'>" + val.nombreSubmenu + "</h4>" +
                                    "<div class='idsubmenu' style='display: none;'>" + val.idSubmenu + "</div>" +
                                    "<div class='idmenu' style='display: none;'>" + value.idMenu + "</div>" +
                                    "<div class='nombremenu' style='display: none;'>" + value.nombreMenu + "</div>" +
                                    "</button>";
                        } else
                        {
                            //obtiene los productos y los pone en el submenu
                            $.ajax({
                                // Verificacion de los datos introducidos
                                url: 'assets/hacerpedido/getProductos.php',
                                dataType: "json",
                                type: 'POST',
                                data: {
                                    idsubmenu: val.idSubmenu,
                                },
                                success: function (productos) {
                                    var htmlsubmenu = "";
                                    $.when(
                                            $(productos).each(function (index, v) {
                                        htmlsubmenu += "<button class='btn btn-primary btn-men btn-menu'>" +
                                                "<div><h4 style='color:white;padding-top: 8px;' id='nombreProducto'>" + v.nombreProducto + "</h4>" +
                                                "<div class='precioproducto' style='display: none;'>" + v.precioProducto + "</div>" +
                                                "<div class='idproducto' style='display: none;'>" + v.idProducto + "</div>" +
                                                "<div class='idsubmenu' style='display: none;'>" + v.idSubmenu + "</div>" +
                                                "<div class='nombresubmenu' style='display: none;'>" + val.nombreSubmenu + "</div>" +
                                                "<div class='idmenu' style='display: none;'>" + value.idMenu + "</div>" +
                                                "<div class='nombremenu' style='display: none;'>" + value.nombreMenu + "</div>" +
                                                "</button>";
                                    })
                                            ).then(function () {
                                        $("#tab-" + index).append(htmlsubmenu);
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
                        }
                    })
                            ).then(function () {
                        htmlcontent += "</div>";
                        $(".tabContent").append(htmlcontent);
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
        htmlmenu += "<li><a href='#tab-" + index + "' role='tab' data-toggle='tab'>" + value.nombreMenu + "</a></li>";

    })
            ).then(function () {
        $("#menuTabs").html(htmlmenu);

    });
}

//CREAR PANELS DE SELECCIONAR PRODUCTO, PREFERENCIAS, CONFIRMACION, SELECCION PIZZAS, SELECCION INGREDIENTES
function creaSubDialogos() {
    content = '<div id="ModalSeleccionaProducto" class="displaynone content-prods" >' + //seleccion de productos
            '<div class="panel panel-default">' +
            ' <div class="panel-content">' +
            '<div class="panel-header div-title">' +
            '<h3 class="tituloSeleccionaProducto txt-primary" ></h3>' +
            '</div>' +
            ' <div class="panel-body">' +
            ' <div class="row">' +
            ' <div class="col-md-12 contenidoSeleccionaProducto">' +
            ' </div>' +
            '</div>' +
            '</div>' +
            '<div class="panel-footer  label-primary">' +
            '<button type="button" class="btn btn-default pull-right closeSeleccionProducto"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="ModalPreferencias" class="displaynone content-prods" >' + //preferencias
            '<div class="panel panel-default">' +
            '<!-- Modal content-->' +
            '<div class="panel-content">' +
            '<div class="div-title">' +
            '<h3 class=" tituloModalPreferencias txt-primary" ></h3>' +
            '</div>' +
            '<div class="panel-body contentModalPreferencias">' +
            '</div>' +
            '<div class="panel-footer label-primary" style="text-align: right;">' +
            '<button type="button" class="btn btn-default closePreferencias" data-dismiss="modal"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>' +
            '<button type="button" class="btn btn-primary btnguardapropiedades" style="border: 1px solid;"><i class="fa fa-plus-circle" aria-hidden="true"></i> Añadir al pedido</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="ModalConfirmacion" class="displaynone content-prods" >' + //confirmaciones
            '<div class="panel panel-default">' +
            '<div class="panel-content">' +
            '<div class="panel-body contenidoModalConfirmacion">' +
            '</div>' +
            '<div class="panel-footer label-primary">' +
            '<button type="button" class="btn btn-default closeConfirmacion" data-dismiss="modal">Cerrar</button>' +
            '<button type="button" class="btn btn-primary btnEnviaPedido" style="border: 1px solid;display: none;"><i class="fas fa-utensils" aria-hidden="true"></i> Enviar pedido a cocina</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="ModalSeleccionPizza" class="displaynone content-prods">' + // seleccion de pizzas
            '<div class="panel panel-default">' +
            '<div class="panel-content">' +
            '<div class="panel-header div-title">' +
            '<h3 class="tituloSeleccionPizza txt-primary" ></h3>' +
            '</div>' +
            '<div class="panel-body contenidoSeleccionPizza">' +
            '</div>' +
            '<div class="panel-body contentIngredientes displaynone" >' +
            '</div>' +
            '<div class="panel-footer label-primary">' +
            '<input  id="pizza_value" type="hidden" value="1" />' +
            '<button type="button" class="btn btn-primary pull-right btnEnviaSeleccion" style="border: 1px solid;"><i class="fa fa-plus-circle" aria-hidden="true"></i> Añadir al pedido</button>' +
            '<button type="button" class="btn btn-default pull-right closepizzas"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="ModalSeleccionaIngredientes" class="displaynone content-prods" >' + //seleccion de ingredientes
            ' <div class="panel panel-default">' +
            '<div class="panel-content">' +
            '<div class="panel-header div-title">' +
            '<h3 class="tituloSeleccionaIngredientes txt-primary" ></h3>' +
            '</div>' +
            '<div class="panel-body">' +
            '<div class="row">' +
            '<div class="col-md-12 contenidoSeleccionaIngredientes">' +
            ' </div>' +
            '</div>' +
            '</div>' +
            '<div class="panel-footer">' +
            '<button type="button" class="btn btn-primary btnEnviaProducto pull-right" style="border: 1px solid;"><i class="fa fa-plus-circle" aria-hidden="true"></i> Añadir al pedido</button>' +
            '<button type="button" class="btn btn-default pull-right closeingredientes" ><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    $('#menucontent').append(content);
}


////////////////////////////////////////////////////////////////////////////////CARGAMOS LOS INGREDIENTES CORRESPONDIENTES A ESE PRODUCTO
function asignaIngredientes(nombreMenu) {
    $.ajax({
// Consulta de ingredientes de pizza especificos
        url: 'assets/hacerpedido/consultaIngredientesE.php',
        type: 'POST',
        dataType: "json",
        data: {
            idproducto: id
        },
        success: function (ingredientes) {
            var htmlselectIngredientesE = "";
            $.when(
                    $(ingredientes).each(function (index, value) {
                htmlselectIngredientesE += '<div class="col-md-12 contenedorIngrediente" style="padding:5px;">' +
                        '<div class="col-md-12 btn-primary" style="text-align: center;font-size: 12px;padding: 5px;word-wrap: break-word;color: white;border: 0.5px solid;border-radius: 4px;">' +
                        value.nombreIngrediente +
                        "<div class='nombreingrediente' style='display: none;'>" + value.nombreIngrediente + "</div>" +
                        "<div class='idingrediente' style='display: none;'>" + value.idIngrediente + "</div>" +
                        '</div>' +
                        '</div>';
            })
                    ).then(function () {
                $.ajax({
                    // Consulta de ingredientes de pizza generales
                    url: 'assets/hacerpedido/consultaIngredientesG.php',
                    type: 'POST',
                    dataType: "json",
                    data: {
                        tipoIngrediente: nombreMenu
                    },
                    success: function (ingredientes) {
                        var htmlselectIngredientesG = "";
                        $.when(
                                $(ingredientes).each(function (index, value) {
                            htmlselectIngredientesG += '<div class="col-md-12 contenedorIngrediente" style="padding:5px;">' +
                                    '<div class="col-md-12 btn-primary" style="text-align: center;font-size: 12px;padding: 5px;word-wrap: break-word;color: white;border: 0.5px solid;border-radius: 4px;">' +
                                    value.nombreIngrediente +
                                    "<div class='nombreingrediente' style='display: none;'>" + value.nombreIngrediente + "</div>" +
                                    "<div class='idingrediente' style='display: none;'>" + value.idIngrediente + "</div>" +
                                    '</div>' +
                                    '</div>';
                        })
                                ).then(function () {
                            $(".contenidoSeleccionaIngredientes").html(
                                    "<div class='row'>" +
                                    "<div class='col-md-12'>" +
                                    "<div class='col-md-6 col-sm-6 col-xs-6 '>" +
                                    "<h5 class='txt-primary'>Ingredientes</h5>" +
                                    "<div class='col-md-12 rightIngrediente border-primary' style='height:250px; overflow: auto ;border: 1px solid; border-radius: 6px;padding: 15px;'>" +
                                    htmlselectIngredientesE +
                                    '</div>' +
                                    '</div>' +
                                    "<div class='col-md-6 col-sm-6 col-xs-6 txt-primary'>" +
                                    "<h5 class='txt-primary'>Ingredientes Extras</h5>" +
                                    "<div class='col-md-12 leftIngrediente border-primary' style='height:250px; overflow: auto ;border: 1px solid; border-radius: 6px;padding: 15px;'>" +
                                    htmlselectIngredientesG +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'
                                    );
                            $(".contenidoSeleccionaIngredientes").append(
                                    '<br><div class="row">' +
                                    '<div class="col-md-12">' +
                                    '<div class="col-md-5">' +
                                    '<h4 class="txt-primary" style="padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
                                    '</div>' +
                                    '<div class="col-md-7">' +
                                    '<div class="col-md-9 col-md-offset-3">' +
                                    '<div class="form-group">' +
                                    '<div class="center">' +
                                    '<p></p>' +
                                    '<div class="input-group">' +
                                    '<span class="input-group-btn">' +
                                    '<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                                    '<span class="glyphicon glyphicon-minus"></span>' +
                                    '</button>' +
                                    '</span>' +
                                    '<input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                                    '<span class="input-group-btn">' +
                                    '<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                                    '<span class="glyphicon glyphicon-plus"></span>' +
                                    '</button>' +
                                    '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<br>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-md-12">' +
                                    '<div class="form-group">' +
                                    '<h4 class="txt-primary">Observación del pedido :</h4>' +
                                    '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'
                                    );
                            funcionalidadCantidad();
                            dragula([document.querySelector('.leftIngrediente'), document.querySelector('.rightIngrediente')], {
                                isContainer: function (el) {
                                    return false; // only elements in drake.containers will be taken into account
                                },
                                moves: function (el, source, handle, sibling) {
                                    return true; // elements are always draggable by default
                                },
                                accepts: function (el, target, source, sibling) {
                                    return true; // elements can be dropped in any of the `containers` by default
                                },
                                invalid: function (el, handle) {
                                    return false; // don't prevent any drags from initiating by default
                                },
                                direction: 'vertical', // Y axis is considered when determining where an element would be dropped
                                copy: true, // elements are moved by default, not copied
                                copySortSource: false, // elements in copy-source containers can be reordered
                                revertOnSpill: false, // spilling will put the element back where it was dragged from, if this is true
                                removeOnSpill: false, // spilling will `.remove` the element, if this is true
                                mirrorContainer: document.body, // set the element that gets mirror elements appended
                                ignoreInputTextSelection: true // allows users to select input text, see details below
                            });
                            dragula([document.querySelector('.rightIngrediente')], {
                                removeOnSpill: true, // spilling will `.remove` the element, if this is true
                                accepts: function (el, target, source, sibling) {
                                    return false; // elements can be dropped in any of the `containers` by default
                                }
                            });
                        })
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

//este modal es exclusivamente para bebidas
//Guarda la Bebida seleccionada
$(document).on("click", ".btnguardapropiedades", function (event) {
    $.when($("#ModalPreferencias,ModalSeleccionaProducto").slideUp("slow")).then(function () {
        enviaProducto([], "");
        if (selectedOption == 1) {
            $("#menuwizard").hide("slow");
        } else {
            $(".codigoproducto").hide("slow");
        }
        show_items();
    });
});


////////////////////////////////////////////////////////////////////////////CUANDO HACEMOS CLCI EN EL MODAL DEL SUBMENU
$(document).on("click", ".btn-menu", function (event) {
    nombre = $(this).find("#nombreProducto").html();
    precio = $(this).find(".precioproducto").html();
    id = $(this).find(".idproducto").html();
    idsubmenu = $(this).find(".idsubmenu").html();
    nombreSubmenu = $(this).find(".nombresubmenu").html();
    idmenu = $(this).find(".idmenu").html();
    nombreMenu = $(this).find(".nombremenu").html();
    if (nombreMenu == "Ensaladas y Bocaditos" || nombreMenu == "Pastas" || nombreMenu == "Carnes" || nombreMenu == "Crepes y Postres") {
        $(".tituloSeleccionaIngredientes").html("Ingredientes " + nombre);
        asignaIngredientes(nombreMenu);
        ////***************mostrar modal seleccion de ingredientes
        $.when($("#menuwizard,.codigoproducto,#ModalSeleccionaProducto").slideUp("slow")).then(function () {
            $("#ModalSeleccionaIngredientes").slideDown("slow");
        });

    } else {
//aqui es la seccion de bebidas
        $(".tituloModalPreferencias").html('Preferencias de ' + nombre);
        $(".contentModalPreferencias").html(
                '<div class="row">' +
                '<div class="col-md-12">' +
                '<div class="col-md-5">' +
                '<h4 class="txt-primary" style="padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
                '</div>' +
                '<div class="col-md-7">' +
                '<div class="col-md-9 col-md-offset-3">' +
                '<div class="form-group">' +
                '<div class="center">' +
                '<p></p>' +
                '<div class="input-group">' +
                '<span class="input-group-btn">' +
                '<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                '<span class="glyphicon glyphicon-minus"></span>' +
                '</button>' +
                '</span>' +
                '<input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                '<span class="input-group-btn">' +
                '<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                '<span class="glyphicon glyphicon-plus"></span>' +
                '</button>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<br>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-12">' +
                '<div class="form-group">' +
                '<h4 class="txt-primary">Observación del pedido :</h4>' +
                '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
                );
        funcionalidadCantidad();
        //***************** mostrar modal preferencias
        $.when($("#ModalSeleccionaProducto,#ModalSeleccionaIngredientes").slideUp("slow")).then(function () {
            $("#ModalPreferencias").slideDown("slow");
        });
    }
});

////////////////////////////////////////////////////////////////////////////////COMBINACIONES DE PIZZA POR CODIGO
$(document).on('change', '.radioPizza input[type=radio]', function () {
    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/hacerpedido/getIdperfil.php',
        dataType: "json",
        type: 'POST',
        data: {
            idsubmenu: idSubmenu,
        },
        success: function (menu) {
            Menu = menu;
        },
        error: function (error) {
            console.log('Disculpe, existió un problema al consultar el menu');
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log('Petición realizada');
        }
    });
    pizzaTemporal = {};
    pizzaTemporal.pizza = nombre;
    pizzaTemporal.id = id;
    pizzaTemporal.precio = precio;
    pizzaTemporal.idsubmenu = idSubmenu;
    pizzaTemporal.nombresubmenu = nombreSubmenu;
    pizzaTemporal.idmenu = idmenu;
    pizzaTemporal.nombremenu = nombreMenu;
    //Regreso a la normalidad
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
    $(".btnEnviaSeleccion").hide();
    if ($(this).val() == "") {
        $(".tituloSeleccionPizza").html(nombre + " " + nombreSubmenu);
        $(".contentIngredientes").html("");
        $(".contentIngredientes").hide();
        $("#contentSeleccion").html("");
    }
    if ($(this).val() == "entera") {
        $(".tituloSeleccionPizza").html(nombre + " " + nombreSubmenu);
        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/hacerpedido/consultaPizzas.php',
            type: 'POST',
            dataType: "json",
            data: {
                nombreProducto: nombre,
            },
            success: function (pizzas) {
                var htmlselectPizzas = "<option value=''>Seleccione ..</option>";
                $.when(
                        $(pizzas).each(function (index, value) {
                    if (nombreSubmenu != value.nombreSubmenu) {
                        htmlselectPizzas += "<option value='" + value.idProducto + "'>" + value.nombreSubmenu + "</option>";
                    }
                })
                        ).then(function () {
                    $("#contentSeleccion").html(
                            "<div class='grid'>" +
                            "<div class='row'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-3'>" +
                            "<div class='row row-space border-primary' style='border: 1px solid; border-radius: 6px;'>" +
                            "<div class='col-md-12'>" +
                            "<br>" + "<br>" +
                            "<div class='col-md-12'>" +
                            "<center><img src='img/pizzas/entera/entera" + entera + ".png' alt='pizza entera' class='img-responsive imgEntera'>" + "</center>" +
                            "<br>" + "<br>" +
                            "</div>" +
                            "</div>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:100%">' +
                            '<label class="btn btn-primary btn-block">' +
                            '<input type="checkbox" class="inp_entera" autocomplete="off"><div id="lblEntera">' + nombreSubmenu + '</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                            );
                    $("#contentSeleccion").append(
                            '<br><div class="row">' +
                            '<div class="col-md-12">' +
                            '<div class="col-md-5">' +
                            '<h4 class="txt-primary" style="padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
                            '</div>' +
                            '<div class="col-md-7">' +
                            '<div class="col-md-9 col-md-offset-3">' +
                            '<div class="form-group">' +
                            '<div class="center">' +
                            '<p></p>' +
                            '<div class="input-group">' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-minus"></span>' +
                            '</button>' +
                            '</span>' +
                            '<input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-plus"></span>' +
                            '</button>' +
                            '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<br>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-md-12">' +
                            '<div class="form-group">' +
                            '<h4 class="txt-primary" >Observación del pedido :</h4>' +
                            '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                            );
                    funcionalidadCantidad();
                    pizzaTemporal.tipo = "entera";
                    pizzaTemporal.id = id;
                    pizzaTemporal.nombre = nombreMenu;
                    pizzaTemporal.nombreSubmenu = nombreSubmenu;
                    pizzaTemporal.ingredientes = [];
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
        $(".btnEnviaSeleccion").show();
    } else
    if ($(this).val() == "medio") {
        $(".tituloSeleccionPizza").html(+nombre + " " + nombreSubmenu + " Combinada 1/2");
        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/hacerpedido/consultaPizzas.php',
            type: 'POST',
            dataType: "json",
            data: {
                nombreProducto: nombre,
            },
            success: function (pizzas) {
                var htmlselectPizzas = "<option value=''>Seleccione ..</option>";
                $.when(
                        $(pizzas).each(function (index, value) {
                    if (nombreSubmenu != value.nombreSubmenu) {
                        htmlselectPizzas += "<option value='" + value.idProducto + "'>" + value.nombreSubmenu + "</option>";
                    }
                })
                        ).then(function () {
                    $("#contentSeleccion").html(
                            "<div class='grid'>" +
                            "<div class='row'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='row row-space border-primary' style='border: 1px solid; border-radius: 6px;'>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:100%">' +
                            '<label class="btn btn-primary btn-block">' +
                            '<input type="checkbox" class="inp_medio1" autocomplete="off"><div id="lblMitad1">Mitad</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "<div class='col-md-12'>" +
                            "<br>" + "<br>" +
                            "<div class='col-md-12'>" +
                            "<center><img src='img/pizzas/media/media1_" + media1 + ".png' alt='pizza media' class='img-responsive imgMedio1' style='padding-bottom: 5px;'></center>" +
                            "</div>" +
                            "<div class='col-md-12'>" +
                            "<center><img src='img/pizzas/media/media2_" + media2 + ".png' alt='pizza media' class='img-responsive imgMedio2'></center>" +
                            "<br>" + "<br>" +
                            "</div>" +
                            "</div>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:100%">' +
                            '<label class="btn btn-primary btn-block">' +
                            '<input type="checkbox" class="inp_medio2" autocomplete="off"><div id="lblMitad2">' + nombreSubmenu + '</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Mitad 2</label><br/>" +
                            "<select class='form-control selectPizzaMedio' >" +
                            htmlselectPizzas +
                            "</select>" +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Mitad 1</label><br/>" +
                            nombreSubmenu +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                            );
                    $("#contentSeleccion").append(
                            '<br><div class="row">' +
                            '<div class="col-md-12">' +
                            '<div class="col-md-5">' +
                            '<h4 class="txt-primary" style="padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
                            '</div>' +
                            '<div class="col-md-7">' +
                            '<div class="col-md-9 col-md-offset-3">' +
                            '<div class="form-group">' +
                            '<div class="center">' +
                            '<p></p>' +
                            '<div class="input-group">' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-minus"></span>' +
                            '</button>' +
                            '</span>' +
                            '<input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-plus"></span>' +
                            '</button>' +
                            '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<br>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-md-12">' +
                            '<div class="form-group">' +
                            '<h4 class="txt-primary">Observación del pedido :</h4>' +
                            '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                            );
                    funcionalidadCantidad();
                    pizzaTemporal.tipo = "Combinada 1/2";
                    pizzaTemporal.id = id;
                    pizzaTemporal.nombre = nombreMenu;
                    pizzaTemporal.nombreSubmenu = nombreSubmenu;
                    pizzaTemporal.ingredientes = [];
                    pizzaTemporal.idMedio = "";
                    pizzaTemporal.ingredientesMedio = [];
                    pizzaTemporal.nombreMedio = "";
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
    } else
    if ($(this).val() == "cuarto") {
        $(".tituloSeleccionPizza").html(nombre + " " + nombreSubmenu + " Combinada 1/4");
        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/hacerpedido/consultaPizzas.php',
            type: 'POST',
            data: {
                nombreProducto: nombre,
            },
            dataType: "json",
            success: function (pizzas) {
                var htmlselectPizzas = "<option value=''>Seleccione ..</option>";
                $.when(
                        $(pizzas).each(function (index, value) {
                    if (nombreSubmenu != value.nombreSubmenu) {
                        htmlselectPizzas += "<option value='" + value.idProducto + "'>" + value.nombreSubmenu + "</option>";
                    }
                })
                        ).then(function () {
                    $("#contentSeleccion").html(
                            "<div class='grid'>" +
                            "<div class='row'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='row row-space border-primary' style='border: 1px solid; border-radius: 6px;'>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:100%">' +
                            '<label class="btn btn-primary btn-block">' +
                            '<input type="checkbox" class="inp_cuarto1" autocomplete="off"><div id="lblCuarto1">Cuarto</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "<div class='col-md-12'>" +
                            "<br>" + "<br>" +
                            "<div class='col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2' style='position:absolute;z-index:500;left: 0;right: 0;margin: 0 auto;'>" +
                            "<center><img src='img/pizzas/cuarto/cuarto1_" + cuarto1 + ".png' alt='pizza media' class='img-responsive imgCuarto1' style='padding-right: 5px;'></center>" +
                            "</div>" +
                            "<div class='col-md-12' style='padding-top: 33px;padding-right: 15px;'>" +
                            "<center><img src='img/pizzas/cuarto/cuarto2_" + cuarto2 + ".png' alt='pizza media' class='img-responsive imgCuarto2'></center>" +
                            "<br>" + "<br>" +
                            "</div>" +
                            "</div>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:100%">' +
                            '<label class="btn btn-primary btn-block">' +
                            '<input type="checkbox" class="inp_cuarto2" autocomplete="off"><div id="lblCuarto2">' + nombreSubmenu + '</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" + "<br>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<div class='form-group'>" +
                            "<label for=''>Cuarto</label><br/>" +
                            "<select class='form-control selectPizzaCuarto' >" +
                            htmlselectPizzas +
                            "</select>" +
                            "</div>" +
                            "<div class='form-group'>" +
                            "<label for=''>Pizza</label><br/>" +
                            nombreSubmenu +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                            );
                    $("#contentSeleccion").append(
                            '<br><div class="row">' +
                            '<div class="col-md-12">' +
                            '<div class="col-md-5">' +
                            '<h4 class="txt-primary" style="padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
                            '</div>' +
                            '<div class="col-md-7">' +
                            '<div class="col-md-9 col-md-offset-3">' +
                            '<div class="form-group">' +
                            '<div class="center">' +
                            '<p></p>' +
                            '<div class="input-group">' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-minus"></span>' +
                            '</button>' +
                            '</span>' +
                            '<input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-plus"></span>' +
                            '</button>' +
                            '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<br>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-md-12">' +
                            '<div class="form-group">' +
                            '<h4 class="txt-primary">Observación del pedido :</h4>' +
                            '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                            );
                    funcionalidadCantidad();
                    pizzaTemporal.tipo = "Combinada 1/4";
                    pizzaTemporal.id = id;
                    pizzaTemporal.nombre = nombreMenu;
                    pizzaTemporal.nombreSubmenu = nombreSubmenu;
                    pizzaTemporal.ingredientes = [];
                    pizzaTemporal.idCuarto = "";
                    pizzaTemporal.nombreCuarto = "";
                    pizzaTemporal.ingredientesCuarto = [];
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
    } else
    if ($(this).val() == "personalizada") {
        $(".tituloSeleccionPizza").html(nombre + " " + nombreSubmenu);
        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/hacerpedido/consultaPizzas.php',
            type: 'POST',
            data: {
                nombreProducto: nombre,
            },
            dataType: "json",
            success: function (pizzas) {
                var htmlselectPizzas = "<option value=''>Seleccione ..</option>";
                $.when(
                        $(pizzas).each(function (index, value) {
                    if (nombreSubmenu != value.nombreSubmenu) {
                        htmlselectPizzas += "<option value='" + value.idProducto + "'>" + value.nombreSubmenu + "</option>";
                    }
                })
                        ).then(function () {
                    $("#contentSeleccion").html(
                            "<div class='grid'>" +
                            "<div class='row'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='row row-space border-primary' style='border: 1px solid; border-radius: 6px;'>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:101%">' +
                            '<label class="btn btn-primary" style="width: 50%;">' +
                            '<input type="checkbox" class="inp_personalizado1" autocomplete="off"><div id="lblPersonalizado1">' + nombreSubmenu + '</div>' +
                            ' </label>' +
                            '<label class="btn btn-primary" style="width: 50%;">' +
                            '<input type="checkbox" class="inp_personalizado2" autocomplete="off"><div id="lblPersonalizado2">Personalizada 2</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "<div class='col-md-12 col-sm-12 col-xs-12' style='padding: 40px 0px;'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12' style='position: absolute;top:4px;left: 8px;'>" +
                            "<img src='img/pizzas/per/per1_" + per1 + ".png' alt='pizza media' class='img-responsive imgPersonalizado1'>" +
                            "</div>" +
                            "<img src='img/pizzas/fondopersonalizado.png' class='img-responsive'>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6' style='padding-bottom: 10px;'>" +
                            "<div class='col-md-12' style='position: absolute;top:4px;right: 8px;'>" +
                            "<img src='img/pizzas/per/per2_" + per2 + ".png' alt='pizza media' class='img-responsive imgPersonalizado2'>" +
                            "</div>" +
                            "<img src='img/pizzas/fondopersonalizado.png' class='img-responsive'>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12' style='position: absolute;bottom:4px;left: 8px;'>" +
                            "<img src='img/pizzas/per/per3_" + per3 + ".png' alt='pizza media' class='img-responsive imgPersonalizado3'>" +
                            "</div>" +
                            "<img src='img/pizzas/fondopersonalizado.png' class='img-responsive'>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12' style='position: absolute;bottom:4px;right: 8px;'>" +
                            "<img src='img/pizzas/per/per4_" + per4 + ".png' alt='pizza media' class='img-responsive imgPersonalizado4'>" +
                            "</div>" +
                            "<img src='img/pizzas/fondopersonalizado.png' class='img-responsive'>" +
                            "</div>" +
                            "</div>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:101%">' +
                            '<label class="btn btn-primary" style="width: 50%;">' +
                            '<input type="checkbox" class="inp_personalizado3" autocomplete="off"><div id="lblPersonalizado3">Personalizada 3</div>' +
                            ' </label>' +
                            '<label class="btn btn-primary" style="width: 50%;">' +
                            '<input type="checkbox" class="inp_personalizado4" autocomplete="off"><div id="lblPersonalizado4">Personalizada 4</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Personalizada 1</label><br/>" +
                            nombreSubmenu +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Personalizada 2</label><br/>" +
                            "<select class='form-control selectPizzaPersonalizado2' >" +
                            htmlselectPizzas +
                            "</select>" +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Personalizada 3</label><br/>" +
                            "<select class='form-control selectPizzaPersonalizado3' >" +
                            htmlselectPizzas +
                            "</select>" +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Personalizada 4</label><br/>" +
                            "<select class='form-control selectPizzaPersonalizado4' >" +
                            htmlselectPizzas +
                            "</select>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                            );
                    $("#contentSeleccion").append(
                            '<br><div class="row">' +
                            '<div class="col-md-12">' +
                            '<div class="col-md-5">' +
                            '<h4 class="txt-primary" style="padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
                            '</div>' +
                            '<div class="col-md-7">' +
                            '<div class="col-md-9 col-md-offset-3">' +
                            '<div class="form-group">' +
                            '<div class="center">' +
                            '<p></p>' +
                            '<div class="input-group">' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-minus"></span>' +
                            '</button>' +
                            '</span>' +
                            '<input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-plus"></span>' +
                            '</button>' +
                            '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<br>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-md-12">' +
                            '<div class="form-group">' +
                            '<h4 class="txt-primary">Observación del pedido :</h4>' +
                            '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                            );
                    funcionalidadCantidad();
                    pizzaTemporal.tipo = "Personalizada";
                    pizzaTemporal.ingredientes = [];
                    pizzaTemporal.id = id;
                    pizzaTemporal.nombre = nombreMenu;
                    pizzaTemporal.nombreSubmenu = nombreSubmenu;
                    pizzaTemporal.ingredientes = [];
                    pizzaTemporal.idPizza2 = "";
                    pizzaTemporal.nombrePizza2 = "";
                    pizzaTemporal.ingredientesPizza2 = [];
                    pizzaTemporal.idPizza3 = "";
                    pizzaTemporal.nombrePizza3 = "";
                    pizzaTemporal.ingredientesPizza3 = [];
                    pizzaTemporal.idPizza4 = "";
                    pizzaTemporal.nombrePizza4 = "";
                    pizzaTemporal.ingredientesPizza4 = [];
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
});

//Click en el primer menu para escoger INGRESAR CODIGO DE PRODUCTO o ESCOGER DEL MENU
$(document).on('change', '.radioSeleccionproductos input[type=radio]', function () {
    $(".menupanel").hide("slow");
    $(".codigoproducto").hide("slow");
    $("#ModalSeleccionaProducto").hide("slow");
    $("#ModalPreferencias").hide("slow");
    $("#ModalConfirmacion").hide("slow");
    $("#ModalSeleccionPizza").hide("slow");
    $("#ModalSeleccionaIngredientes").hide("slow");
    if ($(this).val() == "codigo") {
        $(".codigoproducto").show("slow");
        selectedOption = 1;
    } else
    if ($(this).val() == "menu") {
        $(".menupanel").show("slow");
        selectedOption = 2;
    }
});

///////////////////CUANDO HACEMOS CLIC EN UN BOTON DEL MENU
$(document).on("click", ".tab-pane .btn-submenu", function (event) {
    nombreSubmenu = $(this).find("#nombreSubmenu").html();
    idSubmenu = $(this).find(".idsubmenu").html();
    nombreMenu = $(this).find(".nombremenu").html();
    idMenu = $(this).find(".idmenu").html();
    var nombreMenu = $(this).find(".nombremenu").html();
    $(".tituloSeleccionaProducto").html(nombreSubmenu);
    if (nombreMenu == "Pizzas") {
        $(".tituloSeleccionPizza").html("Pizza " + nombreSubmenu);
        $(".contenidoSeleccionPizza").html("");
        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/hacerpedido/getProductos.php',
            dataType: "json",
            type: 'POST',
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
        //***************** mostrar modal seleccion pizza
        $.when($("#menuwizard,.contentIngredientes,.codigoproducto").slideUp("slow")).then(function () {
            $("#ModalSeleccionPizza").slideDown("slow");
        });
    } else {
        $.ajax({
// Verificacion de los datos introducidos
            url: 'assets/hacerpedido/getProductos.php',
            dataType: "json",
            type: 'POST',
            data: {
                idsubmenu: idSubmenu,
            },
            success: function (productos) {
                var htmlsubmenu = "";
                $.when(
                        $(productos).each(function (index, value) {

                    htmlsubmenu += '<div class="col-md-4"> ' +
                            '<button class="tile tile-primary btn-menu"><h4 style="color:white" id="nombreProducto" ">' +
                            value.nombreProducto +
                            '</h4>' +
                            "<div class='precioproducto' style='display: none;'>" + value.precioProducto + "</div>" +
                            "<div class='idproducto' style='display: none;'>" + value.idProducto + "</div>" +
                            "<div class='idsubmenu' style='display: none;'>" + value.idSubmenu + "</div>" +
                            "<div class='nombresubmenu' style='display: none;'>" + nombreSubmenu + "</div>" +
                            "<div class='nombremenu' style='display: none;'>" + nombreMenu + "</div>" +
                            "<div class='idmenu' style='display: none;'>" + idMenu + "</div>" +
                            '</button>' +
                            '</div>';
                })
                        ).then(function () {
                    $(".contenidoSeleccionaProducto").html(htmlsubmenu);
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
        /////******************* mostramos modal selecciona producto
        $.when($("#menuwizard,.codigoproducto").slideUp("slow")).then(function () {
            $("#ModalSeleccionaProducto").slideDown("slow");
        });
    }
});

//////////////////////////////PARA CERRAR LOS MODALS
//********para cerrar menu de ingredientes
$(document).on("click", ".closeingredientes", function (event) {
    $.when($("#ModalSeleccionaIngredientes").slideUp("slow")).then(function () {
        $("#menuwizard").slideDown("slow");
    });
});

//*********para cerrar menu de productos
$(document).on("click", ".closeSeleccionProducto", function (event) {
    $.when($("#ModalSeleccionaProducto").slideUp("slow")).then(function () {
        $("#menuwizard").slideDown("slow");
    });
});

//********para cerrar menu preferencias
$(document).on("click", ".closePreferencias", function (event) {
    $.when($("#ModalPreferencias").slideUp("slow")).then(function () {
        $("#menuwizard").slideDown("slow");
    });
});

//*********para cerrar menu confirmacion
$(document).on("click", ".closeConfirmacion", function (event) {
    $.when($("#ModalConfirmacion").slideUp("slow")).then(function () {
        $("#seccion_pagos").slideDown("slow");
        $("#seccion_cliente").slideDown("slow");
        $("#menuwizard").slideDown("slow");
        $(".radioSeleccionproductos").slideDown("slow");
        $("#payment_checkout").slideDown("slow");
        $("#detalle_pago").slideDown("slow");
        $("#selProd_name").slideDown("slow");
        $("#panel_infocliente").slideDown("slow");
        $("#resumen_pedido").slideDown("slow");
    });
});

//*********para cerrar menu pizzas
$(document).on("click", ".closepizzas", function (event) {
    if ($("#pizza_value").val() == '2') {
        $("#pizza_value").val('1');
        $.when($(".contentIngredientes").slideUp("slow")).then(function () {
            $("#contentSeleccion").slideDown("slow");
        });
    } else {
        $.when($("#ModalSeleccionPizza").slideUp("slow")).then(function () {
            $("#menuwizard").slideDown("slow");
        });
        $("#pizza_value").val('1');
    }
});

////////////////////////////////////////////////////////////////////////////////CARGAMOS EL PEDIDO LA HACER CLICK PIZZA
//Agrega el producto a la lista de productos del pedido --si es una PIZZA--
$(document).on("click", ".btnEnviaSeleccion", function (event) {
    console.log(pizzaTemporal);
    $.when($("#ModalSeleccionPizza").slideUp("slow")).then(function () {
        if (selectedOption == 1) {
            $(".codigoproducto").slideDown("slow");
        } else {
            $("#menuwizard").slideDown("slow");
        }
        show_items();
    });
    var valorChecked;
    if ($(".radioPizzas input[type=radio]:checked").val() == null) {
        valorChecked = $(".radioPizza input[type=radio]:checked").val();
    } else {
        valorChecked = $(".radioPizzas input[type=radio]:checked").val();
    }
    console.log('---->' + valorChecked);
    $.notify('Se agregó "' + nombre + " " + nombreSubmenu + '" al pedido ', "success");
    if (valorChecked == "entera") {
        arrayProductos.push({
            "idProducto": pizzaTemporal.id,
            "pizza": pizzaTemporal.pizza,
            "nombreProducto": pizzaTemporal.nombreSubmenu,
            "precioProducto": pizzaTemporal.precio,
            "nombreMenu": pizzaTemporal.nombre,
            "descripcionPedido": pizzaTemporal.tipo,
            "ingredientes": pizzaTemporal.ingredientes,
            "cantidad": $(".input-number").val(),
            "observacion": $(".observacionProducto").val()
        });
        var htmlResumenPedido = "";
        htmlResumenPedido += "<div class=\"list-group-item\">" +
                "<div class=\"list-group-status status-online\"></div>" +
                "<span class=\"contacts-title\">" + nombre + "</span>" +
                "<p>" + nombreSubmenu + " / " + Menu.nombreMenu + "</p>";
        if (pizzaTemporal.ingredientes.length != 0) {
            var htmlIngredientes = "";
            $.when(
                    $(pizzaTemporal.ingredientes).each(function (index, value) {
                htmlIngredientes += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
            })
                    ).then(function () {
                htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                        "<table>" +
                        "<tr>" +
                        "<td style='padding: 6px;'>" + "Ingredientes Personalizados :" + "</td>" +
                        htmlIngredientes +
                        "</tr>" +
                        "</table>" +
                        "</div>" +
                        "<br>";
                if ($(".observacionProducto").val() != "") {
                    htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                            "<table>" +
                            "<tr>" +
                            "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                            "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                            "</tr>" +
                            "</table>" +
                            "</div>" +
                            "<br>";
                }
                htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                        "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                        "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                        "</div>" +
                        "</div> ";
                $("#resumen_pedido").append(htmlResumenPedido);
                detalledelpago();
            });
        } else {

            if ($(".observacionProducto").val() != "") {
                htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                        "<table>" +
                        "<tr>" +
                        "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                        "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                        "</tr>" +
                        "</table>" +
                        "</div>" +
                        "<br>";
            }

            htmlResumenPedido += "<div class=\"list-group-controls\">" +
                    "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                    "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                    "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                    "</div>" +
                    "</div> ";
            $("#resumen_pedido").append(htmlResumenPedido);
            detalledelpago();
        }

        $(".observacionProducto").val("");
    } else
    if (valorChecked == "medio") {
        arrayProductos.push({
            "idProducto": pizzaTemporal.id,
            "pizza": pizzaTemporal.pizza,
            "idProductoMedio": pizzaTemporal.idMedio,
            "nombreProducto": pizzaTemporal.nombreSubmenu,
            "nombreProductoMedio": pizzaTemporal.nombreMedio,
            "precioProducto": pizzaTemporal.precio,
            "nombreMenu": pizzaTemporal.nombre,
            "descripcionPedido": pizzaTemporal.tipo,
            ingredientes: pizzaTemporal.ingredientes,
            ingredientesMedio: pizzaTemporal.ingredientesMedio,
            "cantidad": $(".input-number").val(),
            "observacion": $(".observacionProducto").val()
        });
        var htmlResumenPedido = "";
        htmlResumenPedido += "<div class=\"list-group-item\">" +
                "<div class=\"list-group-status status-online\"></div>" +
                "<span class=\"contacts-title\">" + nombre + "</span>" +
                "<p>" + nombreSubmenu + " / " + Menu.nombreMenu + "</p>";
        if (pizzaTemporal.ingredientes.length != 0) {
            console.log('if 001');
            var htmlIngredientes = "";
            $.when(
                    $(pizzaTemporal.ingredientes).each(function (index, value) {
                htmlIngredientes += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
            })
                    ).then(function () {
                htmlResumenPedido += "<div style='text-align:-webkit-right;'><table>" +
                        "<tr>" +
                        "<td style='padding: 6px;'>" + "Ingredientes Personalizados :" + "</td>" +
                        htmlIngredientes +
                        "</tr>" +
                        "</table>" +
                        "</div>";
                if (pizzaTemporal.ingredientesMedio.length != 0) {
                    console.log('if 0011');
                    var htmlIngredientes2 = "";
                    $.when(
                            $(pizzaTemporal.ingredientesMedio).each(function (index, value) {
                        htmlIngredientes2 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                    })
                            ).then(function () {
                        htmlResumenPedido +=
                                "<div style='text-align:-webkit-right;'>" +
                                "<table>" +
                                "<tr>" +
                                "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza combinada 1/2) :" + "</td>" +
                                htmlIngredientes2 +
                                "</tr>" +
                                "</table>" +
                                "</div>";
                        if ($(".observacionProducto").val() != "") {
                            htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                    "<table>" +
                                    "<tr>" +
                                    "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                    "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                    "</tr>" +
                                    "</table>" +
                                    "</div>" +
                                    "<br>";
                        }
                        htmlResumenPedido +=
                                "<div class=\"list-group-controls\">" +
                                "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                "</div>" +
                                "</div> ";
                        $("#resumen_pedido").append(htmlResumenPedido);
                        detalledelpago();
                    });
                } else {
                    console.log('else 0011');
                    if ($(".observacionProducto").val() != "") {
                        htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                "<table>" +
                                "<tr>" +
                                "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                "</tr>" +
                                "</table>" +
                                "</div>";
                    }
                    htmlResumenPedido +=
                            "<br>" +
                            "<div class=\"list-group-controls\">" +
                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                            "</div>" +
                            "</div> ";
                    $("#resumen_pedido").append(htmlResumenPedido);
                    detalledelpago();
                }
            });
        } else {
            console.log('else 001');
            if (pizzaTemporal.ingredientesMedio.length != 0) {
                console.log('if 002');
                var htmlIngredientes = "";
                $.when(
                        $(pizzaTemporal.ingredientesMedio).each(function (index, value) {
                    htmlIngredientes += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                })
                        ).then(function () {
                    htmlResumenPedido +=
                            "<div style='text-align:-webkit-right;'><table><tr>" +
                            "<td style='padding: 6px;'>" + "Pizza combinada 1/2 :" + "</td>" +
                            "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombreMedio + "</td>" +
                            "</tr></table></div>" +
                            "<div style='text-align:-webkit-right;'>" +
                            "<table>" +
                            "<tr>" +
                            "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza combinada 1/2) :" + "</td>" +
                            htmlIngredientes +
                            "</tr>" +
                            "</table>" +
                            "</div>";
                    if ($(".observacionProducto").val() != "") {
                        htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                "<table>" +
                                "<tr>" +
                                "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                "</tr>" +
                                "</table>" +
                                "</div>" +
                                "<br>";
                    }
                    htmlResumenPedido += "<div class=\"list-group-controls\">" +
                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                            "</div>" +
                            "</div> ";
                    $("#resumen_pedido").append(htmlResumenPedido);
                    detalledelpago();
                });
            } else {
                console.log('else 002');
                htmlResumenPedido +=
                        "<div style='text-align:-webkit-right;'><table><tr>" +
                        "<td style='padding: 6px;'>" + "Pizza combinada 1/2 :" + "</td>" +
                        "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombreMedio + "</td>" +
                        "</tr></table></div>";
                if ($(".observacionProducto").val() != "") {
                    htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                            "<table>" +
                            "<tr>" +
                            "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                            "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                            "</tr>" +
                            "</table>" +
                            "</div>" +
                            "<br>";
                }
                htmlResumenPedido += "<div class=\"list-group-controls\">" +
                        "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                        "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                        "</div>" +
                        "</div> ";
                $("#resumen_pedido").append(htmlResumenPedido);
                detalledelpago();
            }
        }
        $(".observacionProducto").val("");
    } else
    if (valorChecked == "cuarto") {
        arrayProductos.push({
            "idProducto": pizzaTemporal.id,
            "pizza": pizzaTemporal.pizza,
            "idProductoCuarto": pizzaTemporal.idCuarto,
            "nombreProducto": pizzaTemporal.nombreSubmenu,
            "nombreProductoCuarto": pizzaTemporal.nombreCuarto,
            "precioProducto": pizzaTemporal.precio,
            "nombreMenu": pizzaTemporal.nombre,
            "descripcionPedido": pizzaTemporal.tipo,
            ingredientes: pizzaTemporal.ingredientes,
            ingredientesCuarto: pizzaTemporal.ingredientesCuarto,
            "cantidad": $(".input-number").val(),
            "observacion": $(".observacionProducto").val()
        });
        var htmlResumenPedido = "";
        htmlResumenPedido += "<div class=\"list-group-item\">" +
                "<div class=\"list-group-status status-online\"></div>" +
                "<span class=\"contacts-title\">" + nombre + "</span>" +
                "<p>" + nombreSubmenu + " / " + Menu.nombreMenu + "</p>";
        if (pizzaTemporal.ingredientes.length != 0) {
            var htmlIngredientes = "";
            $.when(
                    $(pizzaTemporal.ingredientes).each(function (index, value) {
                htmlIngredientes += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
            })
                    ).then(function () {
                htmlResumenPedido += "<div style='text-align:-webkit-right;'><table><tr>" +
                        "<td style='padding: 6px;'>" + "Pizza combinada 1/4 :" + "</td>" +
                        "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombreCuarto + "</td>" +
                        "</tr></table></div>" +
                        "<div style='text-align:-webkit-right;'><table>" +
                        "<tr>" +
                        "<td style='padding: 6px;'>" + "Ingredientes Personalizados :" + "</td>" +
                        htmlIngredientes +
                        "</tr>" +
                        "</table>" +
                        "</div>";
                if (pizzaTemporal.ingredientesCuarto.length != 0) {
                    var htmlIngredientes2 = "";
                    $.when(
                            $(pizzaTemporal.ingredientesCuarto).each(function (index, value) {
                        htmlIngredientes2 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                    })
                            ).then(function () {
                        htmlResumenPedido +=
                                "<div style='text-align:-webkit-right;'>" +
                                "<table>" +
                                "<tr>" +
                                "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza combinada 1/4) :" + "</td>" +
                                htmlIngredientes2 +
                                "</tr>" +
                                "</table>" +
                                "</div>";
                        if ($(".observacionProducto").val() != "") {
                            htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                    "<table>" +
                                    "<tr>" +
                                    "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                    "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                    "</tr>" +
                                    "</table>" +
                                    "</div>" +
                                    "<br>";
                        }
                        htmlResumenPedido +=
                                "<div class=\"list-group-controls\">" +
                                "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                "</div>" +
                                "</div> ";
                        $("#resumen_pedido").append(htmlResumenPedido);
                        detalledelpago();
                    });
                } else {
                    if ($(".observacionProducto").val() != "") {
                        htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                "<table>" +
                                "<tr>" +
                                "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                "</tr>" +
                                "</table>" +
                                "</div>" +
                                "<br>";
                    }
                    htmlResumenPedido +=
                            "<div class=\"list-group-controls\">" +
                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                            "</div>" +
                            "</div> ";
                    $("#resumen_pedido").append(htmlResumenPedido);
                    detalledelpago();
                }
            });
        } else {
            if (pizzaTemporal.ingredientesCuarto.length != 0) {
                var htmlIngredientes = "";
                $.when(
                        $(pizzaTemporal.ingredientesCuarto).each(function (index, value) {
                    htmlIngredientes += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                })
                        ).then(function () {
                    htmlResumenPedido +=
                            "<div style='text-align:-webkit-right;'><table><tr>" +
                            "<td style='padding: 6px;'>" + "Pizza combinada 1/4 :" + "</td>" +
                            "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombreCuarto + "</td>" +
                            "</tr></table></div>" +
                            "<div style='text-align:-webkit-right;'>" +
                            "<table>" +
                            "<tr>" +
                            "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza combinada 1/4) :" + "</td>" +
                            htmlIngredientes +
                            "</tr>" +
                            "</table>" +
                            "</div>";
                    if ($(".observacionProducto").val() != "") {
                        htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                "<table>" +
                                "<tr>" +
                                "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                "</tr>" +
                                "</table>" +
                                "</div>" +
                                "<br>";
                    }

                    htmlResumenPedido += "<div class=\"list-group-controls\">" +
                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                            "</div>" +
                            "</div> ";
                    $("#resumen_pedido").append(htmlResumenPedido);
                    detalledelpago();
                });
            } else {
                htmlResumenPedido +=
                        "<div style='text-align:-webkit-right;'><table><tr>" +
                        "<td style='padding: 6px;'>" + "Pizza combinada 1/4 :" + "</td>" +
                        "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombreCuarto + "</td>" +
                        "</tr></table></div>";
                if ($(".observacionProducto").val() != "") {
                    htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                            "<table>" +
                            "<tr>" +
                            "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                            "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                            "</tr>" +
                            "</table>" +
                            "</div>" +
                            "<br>";
                }
                htmlResumenPedido += "<div class=\"list-group-controls\">" +
                        "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                        "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                        "</div>" +
                        "</div> ";
                $("#resumen_pedido").append(htmlResumenPedido);
                detalledelpago();
            }
        }
        $(".observacionProducto").val("");
    } else
    if (valorChecked == "personalizada") {
        arrayProductos.push({
            "idProducto": pizzaTemporal.id,
            "pizza": pizzaTemporal.pizza,
            "idProductoPersonalizado1": pizzaTemporal.idPizza2,
            "idProductoPersonalizado2": pizzaTemporal.idPizza3,
            "idProductoPersonalizado3": pizzaTemporal.idPizza4,
            "nombreProducto": pizzaTemporal.nombreSubmenu,
            "nombreProductoPersonalizado1": pizzaTemporal.nombrePizza2,
            "nombreProductoPersonalizado2": pizzaTemporal.nombrePizza3,
            "nombreProductoPersonalizado3": pizzaTemporal.nombrePizza4,
            "precioProducto": pizzaTemporal.precio,
            "nombreMenu": pizzaTemporal.nombre,
            "descripcionPedido": pizzaTemporal.tipo,
            ingredientes: pizzaTemporal.ingredientes,
            ingredientesPersonalizado1: pizzaTemporal.ingredientesPizza2,
            ingredientesPersonalizado2: pizzaTemporal.ingredientesPizza3,
            ingredientesPersonalizado3: pizzaTemporal.ingredientesPizza4,
            "cantidad": $(".input-number").val(),
            "observacion": $(".observacionProducto").val()
        });
        var htmlResumenPedido = "";
        htmlResumenPedido += "<div class=\"list-group-item\">" +
                "<div class=\"list-group-status status-online\"></div>" +
                "<span class=\"contacts-title\">" + nombre + "</span>" +
                "<p>" + nombreSubmenu + " / " + Menu.nombreMenu + "</p>";
        if (pizzaTemporal.ingredientes.length != 0) {

            var htmlIngredientes1 = "";
            $.when(
                    $(pizzaTemporal.ingredientes).each(function (index, value) {
                htmlIngredientes1 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
            })
                    ).then(function () {

                htmlResumenPedido += "<div style='text-align:-webkit-right;'><table>" +
                        "<tr>" +
                        "<td style='padding: 6px;'>" + "Ingredientes Personalizados :" + "</td>" +
                        htmlIngredientes1 +
                        "</tr>" +
                        "</table>" +
                        "</div>";
                if (pizzaTemporal.ingredientesPizza2.length != 0) {
                    var htmlIngredientes = "";
                    $.when(
                            $(pizzaTemporal.ingredientesPizza2).each(function (index, value) {
                        htmlIngredientes += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                    })
                            ).then(function () {
                        htmlResumenPedido +=
                                "<div style='text-align:-webkit-right;'><table><tr>" +
                                "<td style='padding: 6px;'>" + "Pizza personalizada 2 :" + "</td>" +
                                "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza2 + "</td>" +
                                "</tr></table></div>" +
                                "<div style='text-align:-webkit-right;'>" +
                                "<table>" +
                                "<tr>" +
                                "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 2) :" + "</td>" +
                                htmlIngredientes +
                                "</tr>" +
                                "</table>" +
                                "</div>";
                        if (pizzaTemporal.ingredientesPizza3.length != 0) {
                            var htmlIngredientes2 = "";
                            $.when(
                                    $(pizzaTemporal.ingredientesPizza3).each(function (index, value) {
                                htmlIngredientes2 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                            })
                                    ).then(function () {
                                htmlResumenPedido +=
                                        "<div style='text-align:-webkit-right;'><table><tr>" +
                                        "<td style='padding: 6px;'>" + "Pizza personalizada 3 :" + "</td>" +
                                        "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza3 + "</td>" +
                                        "</tr></table></div>" +
                                        "<div style='text-align:-webkit-right;'>" +
                                        "<table>" +
                                        "<tr>" +
                                        "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 3) :" + "</td>" +
                                        htmlIngredientes2 +
                                        "</tr>" +
                                        "</table>" +
                                        "</div>";
                                if (pizzaTemporal.ingredientesPizza4.length != 0) {
                                    var htmlIngredientes3 = "";
                                    $.when(
                                            $(pizzaTemporal.ingredientesPizza4).each(function (index, value) {
                                        htmlIngredientes3 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                                    })
                                            ).then(function () {
                                        htmlResumenPedido +=
                                                "<div style='text-align:-webkit-right;'><table><tr>" +
                                                "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                                "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                                "</tr></table></div>" +
                                                "<div style='text-align:-webkit-right;'>" +
                                                "<table>" +
                                                "<tr>" +
                                                "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 4) :" + "</td>" +
                                                htmlIngredientes3 +
                                                "</tr>" +
                                                "</table>" +
                                                "</div>";
                                        if ($(".observacionProducto").val() != "") {
                                            htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                                    "<table>" +
                                                    "<tr>" +
                                                    "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                                    "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                                    "</tr>" +
                                                    "</table>" +
                                                    "</div>" +
                                                    "<br>";
                                        }
                                        htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                                "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                                "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                                "</div>" +
                                                "</div> ";
                                        $("#resumen_pedido").append(htmlResumenPedido);
                                        detalledelpago();
                                    });
                                } else {
                                    htmlResumenPedido +=
                                            "<div style='text-align:-webkit-right;'><table><tr>" +
                                            "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                            "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                            "</tr></table></div>";
                                    if ($(".observacionProducto").val() != "") {
                                        htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                                "<table>" +
                                                "<tr>" +
                                                "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                                "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                                "</tr>" +
                                                "</table>" +
                                                "</div>" +
                                                "<br>";
                                    }
                                    htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                            "</div>" +
                                            "</div> ";
                                    $("#resumen_pedido").append(htmlResumenPedido);
                                    detalledelpago();
                                }
                            });
                        } else {
                            htmlResumenPedido +=
                                    "<div style='text-align:-webkit-right;'><table><tr>" +
                                    "<td style='padding: 6px;'>" + "Pizza personalizada 3 :" + "</td>" +
                                    "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza3 + "</td>" +
                                    "</tr></table></div>";
                            if ($(".observacionProducto").val() != "") {
                                htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                        "<table>" +
                                        "<tr>" +
                                        "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                        "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                        "</tr>" +
                                        "</table>" +
                                        "</div>" +
                                        "<br>";
                            }
                            htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                    "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                    "</div>" +
                                    "</div> ";
                            $("#resumen_pedido").append(htmlResumenPedido);
                            detalledelpago();//funcion para el pago, esta en script del tipo de pedido
                        }
                    });
                } else {
                    htmlResumenPedido +=
                            "<div style='text-align:-webkit-right;'><table><tr>" +
                            "<td style='padding: 6px;'>" + "Pizza personalizada 2 :" + "</td>" +
                            "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza2 + "</td>" +
                            "</tr></table></div>";
                    if (pizzaTemporal.ingredientesPizza3.length != 0) {
                        var htmlIngredientes2 = "";
                        $.when(
                                $(pizzaTemporal.ingredientesPizza3).each(function (index, value) {
                            htmlIngredientes2 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                        })
                                ).then(function () {
                            htmlResumenPedido +=
                                    "<div style='text-align:-webkit-right;'><table><tr>" +
                                    "<td style='padding: 6px;'>" + "Pizza personalizada 3 :" + "</td>" +
                                    "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza3 + "</td>" +
                                    "</tr></table></div>" +
                                    "<div style='text-align:-webkit-right;'>" +
                                    "<table>" +
                                    "<tr>" +
                                    "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 3) :" + "</td>" +
                                    htmlIngredientes2 +
                                    "</tr>" +
                                    "</table>" +
                                    "</div>";
                            if (pizzaTemporal.ingredientesPizza4.length != 0) {
                                var htmlIngredientes3 = "";
                                $.when(
                                        $(pizzaTemporal.ingredientesPizza4).each(function (index, value) {
                                    htmlIngredientes3 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                                })
                                        ).then(function () {
                                    htmlResumenPedido +=
                                            "<div style='text-align:-webkit-right;'><table><tr>" +
                                            "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                            "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                            "</tr></table></div>" +
                                            "<div style='text-align:-webkit-right;'>" +
                                            "<table>" +
                                            "<tr>" +
                                            "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 4) :" + "</td>" +
                                            htmlIngredientes3 +
                                            "</tr>" +
                                            "</table>" +
                                            "</div>";
                                    if ($(".observacionProducto").val() != "") {
                                        htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                                "<table>" +
                                                "<tr>" +
                                                "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                                "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                                "</tr>" +
                                                "</table>" +
                                                "</div>" +
                                                "<br>";
                                    }
                                    htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                            "</div>" +
                                            "</div> ";
                                    $("#resumen_pedido").append(htmlResumenPedido);
                                    detalledelpago();
                                });
                            } else {
                                htmlResumenPedido +=
                                        "<div style='text-align:-webkit-right;'><table><tr>" +
                                        "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                        "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                        "</tr></table></div>";
                                if ($(".observacionProducto").val() != "") {
                                    htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                            "<table>" +
                                            "<tr>" +
                                            "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                            "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                            "</tr>" +
                                            "</table>" +
                                            "</div>" +
                                            "<br>";
                                }
                                "<div class=\"list-group-controls\" >" +
                                        "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                        "</div>" +
                                        "</div> ";
                                $("#resumen_pedido").append(htmlResumenPedido);
                                detalledelpago();
                            }
                        });
                    } else {
                        htmlResumenPedido +=
                                "<div style='text-align:-webkit-right;'><table><tr>" +
                                "<td style='padding: 6px;'>" + "Pizza personalizada 3 :" + "</td>" +
                                "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza3 + "</td>" +
                                "</tr></table></div>";
                        if (pizzaTemporal.ingredientesPizza4.length != 0) {
                            var htmlIngredientes3 = "";
                            $.when(
                                    $(pizzaTemporal.ingredientesPizza4).each(function (index, value) {
                                htmlIngredientes3 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                            })
                                    ).then(function () {
                                htmlResumenPedido +=
                                        "<div style='text-align:-webkit-right;'><table><tr>" +
                                        "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                        "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                        "</tr></table></div>" +
                                        "<div style='text-align:-webkit-right;'>" +
                                        "<table>" +
                                        "<tr>" +
                                        "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 4) :" + "</td>" +
                                        htmlIngredientes3 +
                                        "</tr>" +
                                        "</table>" +
                                        "</div>";
                                if ($(".observacionProducto").val() != "") {
                                    htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                            "<table>" +
                                            "<tr>" +
                                            "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                            "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                            "</tr>" +
                                            "</table>" +
                                            "</div>" +
                                            "<br>";
                                }
                                htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                        "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                        "</div>" +
                                        "</div> ";
                                $("#resumen_pedido").append(htmlResumenPedido);
                                detalledelpago();
                            });
                        } else {
                            htmlResumenPedido +=
                                    "<div style='text-align:-webkit-right;'><table><tr>" +
                                    "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                    "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                    "</tr></table></div>";
                            if ($(".observacionProducto").val() != "") {
                                htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                        "<table>" +
                                        "<tr>" +
                                        "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                        "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                        "</tr>" +
                                        "</table>" +
                                        "</div>" +
                                        "<br>";
                            }
                            htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                    "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                    "</div>" +
                                    "</div> ";
                            $("#resumen_pedido").append(htmlResumenPedido);
                            detalledelpago();
                        }
                    }
                }
            });
        } else {
            if (pizzaTemporal.ingredientesPizza2.length != 0) {
                var htmlIngredientes = "";
                $.when(
                        $(pizzaTemporal.ingredientesPizza2).each(function (index, value) {
                    htmlIngredientes += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                })
                        ).then(function () {
                    htmlResumenPedido +=
                            "<div style='text-align:-webkit-right;'><table><tr>" +
                            "<td style='padding: 6px;'>" + "Pizza personalizada 2 :" + "</td>" +
                            "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza2 + "</td>" +
                            "</tr></table></div>" +
                            "<div style='text-align:-webkit-right;'>" +
                            "<table>" +
                            "<tr>" +
                            "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 2) :" + "</td>" +
                            htmlIngredientes +
                            "</tr>" +
                            "</table>" +
                            "</div>";
                    if (pizzaTemporal.ingredientesPizza3.length != 0) {
                        var htmlIngredientes2 = "";
                        $.when(
                                $(pizzaTemporal.ingredientesPizza3).each(function (index, value) {
                            htmlIngredientes2 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                        })
                                ).then(function () {
                            htmlResumenPedido +=
                                    "<div style='text-align:-webkit-right;'><table><tr>" +
                                    "<td style='padding: 6px;'>" + "Pizza personalizada 3 :" + "</td>" +
                                    "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza3 + "</td>" +
                                    "</tr></table></div>" +
                                    "<div style='text-align:-webkit-right;'>" +
                                    "<table>" +
                                    "<tr>" +
                                    "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 3) :" + "</td>" +
                                    htmlIngredientes2 +
                                    "</tr>" +
                                    "</table>" +
                                    "</div>";
                            if (pizzaTemporal.ingredientesPizza4.length != 0) {
                                var htmlIngredientes3 = "";
                                $.when(
                                        $(pizzaTemporal.ingredientesPizza4).each(function (index, value) {
                                    htmlIngredientes3 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                                })
                                        ).then(function () {
                                    htmlResumenPedido +=
                                            "<div style='text-align:-webkit-right;'><table><tr>" +
                                            "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                            "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                            "</tr></table></div>" +
                                            "<div style='text-align:-webkit-right;'>" +
                                            "<table>" +
                                            "<tr>" +
                                            "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 4) :" + "</td>" +
                                            htmlIngredientes3 +
                                            "</tr>" +
                                            "</table>" +
                                            "</div>";
                                    if ($(".observacionProducto").val() != "") {
                                        htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                                "<table>" +
                                                "<tr>" +
                                                "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                                "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                                "</tr>" +
                                                "</table>" +
                                                "</div>" +
                                                "<br>";
                                    }
                                    htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                            "</div>" +
                                            "</div> ";
                                    $("#resumen_pedido").append(htmlResumenPedido);
                                    detalledelpago();
                                });
                            } else {
                                htmlResumenPedido +=
                                        "<div style='text-align:-webkit-right;'><table><tr>" +
                                        "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                        "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                        "</tr></table></div>";
                                if ($(".observacionProducto").val() != "") {
                                    htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                            "<table>" +
                                            "<tr>" +
                                            "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                            "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                            "</tr>" +
                                            "</table>" +
                                            "</div>" +
                                            "<br>";
                                }
                                htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                        "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                        "</div>" +
                                        "</div> ";
                                $("#resumen_pedido").append(htmlResumenPedido);
                                detalledelpago();
                            }
                        });
                    } else {
                        htmlResumenPedido +=
                                "<div style='text-align:-webkit-right;'><table><tr>" +
                                "<td style='padding: 6px;'>" + "Pizza personalizada 3 :" + "</td>" +
                                "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza3 + "</td>" +
                                "</tr></table></div>";
                        if ($(".observacionProducto").val() != "") {
                            htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                    "<table>" +
                                    "<tr>" +
                                    "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                    "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                    "</tr>" +
                                    "</table>" +
                                    "</div>" +
                                    "<br>";
                        }
                        htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                "</div>" +
                                "</div> ";
                        $("#resumen_pedido").append(htmlResumenPedido);
                        detalledelpago();
                    }
                });
            } else {
                htmlResumenPedido +=
                        "<div style='text-align:-webkit-right;'><table><tr>" +
                        "<td style='padding: 6px;'>" + "Pizza personalizada 2 :" + "</td>" +
                        "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza2 + "</td>" +
                        "</tr></table></div>";
                if (pizzaTemporal.ingredientesPizza3.length != 0) {
                    var htmlIngredientes2 = "";
                    $.when(
                            $(pizzaTemporal.ingredientesPizza3).each(function (index, value) {
                        htmlIngredientes2 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                    })
                            ).then(function () {
                        htmlResumenPedido +=
                                "<div style='text-align:-webkit-right;'><table><tr>" +
                                "<td style='padding: 6px;'>" + "Pizza personalizada 3 :" + "</td>" +
                                "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza3 + "</td>" +
                                "</tr></table></div>" +
                                "<div style='text-align:-webkit-right;'>" +
                                "<table>" +
                                "<tr>" +
                                "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 3) :" + "</td>" +
                                htmlIngredientes2 +
                                "</tr>" +
                                "</table>" +
                                "</div>";
                        if (pizzaTemporal.ingredientesPizza4.length != 0) {
                            var htmlIngredientes3 = "";
                            $.when(
                                    $(pizzaTemporal.ingredientesPizza4).each(function (index, value) {
                                htmlIngredientes3 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                            })
                                    ).then(function () {
                                htmlResumenPedido +=
                                        "<div style='text-align:-webkit-right;'><table><tr>" +
                                        "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                        "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                        "</tr></table></div>" +
                                        "<div style='text-align:-webkit-right;'>" +
                                        "<table>" +
                                        "<tr>" +
                                        "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 4) :" + "</td>" +
                                        htmlIngredientes3 +
                                        "</tr>" +
                                        "</table>" +
                                        "</div>";
                                if ($(".observacionProducto").val() != "") {
                                    htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                            "<table>" +
                                            "<tr>" +
                                            "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                            "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                            "</tr>" +
                                            "</table>" +
                                            "</div>" +
                                            "<br>";
                                }
                                htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                        "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                        "</div>" +
                                        "</div> ";
                                $("#resumen_pedido").append(htmlResumenPedido);
                                detalledelpago();
                            });
                        } else {
                            htmlResumenPedido +=
                                    "<div style='text-align:-webkit-right;'><table><tr>" +
                                    "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                    "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                    "</tr></table></div>";
                            if ($(".observacionProducto").val() != "") {
                                htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                        "<table>" +
                                        "<tr>" +
                                        "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                        "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                        "</tr>" +
                                        "</table>" +
                                        "</div>" +
                                        "<br>";
                            }
                            htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                    "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                    "</div>" +
                                    "</div> ";
                            $("#resumen_pedido").append(htmlResumenPedido);
                            detalledelpago();
                        }
                    });
                } else {
                    htmlResumenPedido +=
                            "<div style='text-align:-webkit-right;'><table><tr>" +
                            "<td style='padding: 6px;'>" + "Pizza personalizada 3 :" + "</td>" +
                            "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza3 + "</td>" +
                            "</tr></table></div>";
                    if (pizzaTemporal.ingredientesPizza4.length != 0) {
                        var htmlIngredientes3 = "";
                        $.when(
                                $(pizzaTemporal.ingredientesPizza4).each(function (index, value) {
                            htmlIngredientes3 += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                        })
                                ).then(function () {
                            htmlResumenPedido +=
                                    "<div style='text-align:-webkit-right;'><table><tr>" +
                                    "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                    "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                    "</tr></table></div>" +
                                    "<div style='text-align:-webkit-right;'>" +
                                    "<table>" +
                                    "<tr>" +
                                    "<td style='padding: 6px;'>" + "Ingredientes Personalizados(Pizza personalizada 4) :" + "</td>" +
                                    htmlIngredientes3 +
                                    "</tr>" +
                                    "</table>" +
                                    "</div>";
                            if ($(".observacionProducto").val() != "") {
                                htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                        "<table>" +
                                        "<tr>" +
                                        "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                        "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                        "</tr>" +
                                        "</table>" +
                                        "</div>" +
                                        "<br>";
                            }
                            htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                    "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                    "</div>" +
                                    "</div> ";
                            $("#resumen_pedido").append(htmlResumenPedido);
                            detalledelpago();
                        });
                    } else {
                        htmlResumenPedido +=
                                "<div style='text-align:-webkit-right;'><table><tr>" +
                                "<td style='padding: 6px;'>" + "Pizza personalizada 4 :" + "</td>" +
                                "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombrePizza4 + "</td>" +
                                "</tr></table></div>";
                        if ($(".observacionProducto").val() != "") {
                            htmlResumenPedido += '<div style="text-align:-webkit-right;">' +
                                    "<table>" +
                                    "<tr>" +
                                    "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                                    "<td style='padding: 6px;'>" + $(".observacionProducto").val() + "</td>" +
                                    "</tr>" +
                                    "</table>" +
                                    "</div>" +
                                    "<br>";
                        }
                        htmlResumenPedido += "<div class=\"list-group-controls\" >" +
                                "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                "</div>" +
                                "</div> ";
                        $("#resumen_pedido").append(htmlResumenPedido);
                        detalledelpago();
                    }
                }
            }
        }
        $(".observacionProducto").val("");
    }
});

////////////////////////////////////////////////////////////////////////////////CUANDO CARGAMOS ALGO DISTINTO A PIZZA
//cargamos un producto --DISTINTO A UNA PIZZA-- a la lista de productos del pedido
$(document).on("click", ".btnEnviaProducto", function (event) {
    //crea el html requerido
    var Ingredientes = [];
    var ingtablehtml = "<div style='text-align:-webkit-right'><table><tr><td style='padding: 6px;'>Ingredientes</td>";
    console.log(ingtablehtml);
    console.log(ingtablehtml);
    $.when(
            $(".rightIngrediente .contenedorIngrediente").each(function (index) {
        Ingredientes.push({
            idIngrediente: $(this).find(".idingrediente").html(),
            nombreIngrediente: $(this).find(".nombreingrediente").html()
        });
        ingtablehtml += "<td style='border: 1px solid;padding: 6px;'>" + $(this).find(".nombreingrediente").html() + "</td>";
    })
            ).then(function () {
        ingtablehtml += "</tr></table></div>";
        //carga el listado de productos con el html
        enviaProducto(Ingredientes, ingtablehtml);
        show_items();
    });
})

////////////////////////////////////////////////////////////////////////////////CARGAMOS EN EL LISTADO EL PRODUCTO CON TODOS SUS DATOS
function enviaProducto(listaIngredientes, htmlIngredientes) {
   
    $.when($("#ModalSeleccionaIngredientes").slideUp("slow")).then(function () {
        var htmlPedido = "<div class=\"list-group-item\">" +
                "<div class=\"list-group-status status-online\"></div>" +
                "<span class=\"contacts-title\">" + nombre + "</span>" +
                "<p>" + nombreMenu + "</p>";
        (nombreMenu == "Bebidas") ? null : (listaIngredientes.length != 0) ? htmlPedido += htmlIngredientes : htmlPedido += "<center>Sin Ingredientes</center>";
        if (nombreMenu == "Bebidas") {
            arrayProductos.push({
                "idProducto": id,
                "nombreProducto": nombre,
                "precioProducto": precio,
                "nombreMenu": nombreMenu,
                "ingredientesProducto": listaIngredientes,
                "cantidad": $(".input-number").val(),
                "observacion": $("#ModalPreferencias .observacionProducto").val()
            });
            if ($("#ModalPreferencias  .observacionProducto").val() != "") {
                htmlPedido += '<div style="text-align:-webkit-right;">' +
                        "<table>" +
                        "<tr>" +
                        "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                        "<td style='padding: 6px;'>" + $("#ModalPreferencias .observacionProducto").val() + "</td>" +
                        "</tr>" +
                        "</table>" +
                        "</div>" +
                        "<br>";
            }
        } else {
            arrayProductos.push({
                "idProducto": id,
                "nombreProducto": nombre,
                "precioProducto": precio,
                "nombreMenu": nombreMenu,
                "ingredientesProducto": listaIngredientes,
                "cantidad": $(".input-number").val(),
                "observacion": $("#ModalSeleccionaIngredientes .observacionProducto").val()
            });
            if ($("#ModalSeleccionaIngredientes .observacionProducto").val() != "") {
                htmlPedido += '<div style="text-align:-webkit-right;">' +
                        "<table>" +
                        "<tr>" +
                        "<td style='padding: 6px;'>" + "Observación :" + "</td>" +
                        "<td style='padding: 6px;'>" + $("#ModalSeleccionaIngredientes .observacionProducto").val() + "</td>" +
                        "</tr>" +
                        "</table>" +
                        "</div>" +
                        "<br>";
            }
        }
        htmlPedido +=
                "<div class=\"list-group-controls\">" +
                "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                "<button class=\"btn btn-info precio\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                "</div>" +
                "</div> ";
        $("#resumen_pedido").append(htmlPedido);
        detalledelpago();
        $.notify('Se agregó "' + nombre + '" al pedido ', "success");
        //*********************ocultar menu de ingredientes
        if (selectedOption == 1) {
            $.when($("#menuwizard").slideUp("slow")).then(function () {
                $(".codigoproducto").slideDown("slow");
            });
        } else {
            $.when($(".codigoproducto").slideUp("slow")).then(function () {
                $("#menuwizard").slideDown("slow");
            });
        }
    });
}

////////////////////////////////////////////////////////////////////////////////AL CAMBIAR ENTRE LOS TIPOS TAMA:OS DE PIZZAS
//tamaños de pizzas -- entera   1/2 pizza     1/4 pizza   personalizada
$(document).on('change', '.radioTipopizzas input[type=radio]', function () {
    if ($(this).val() != "") {
        nombre = $(this).parent().find(".nombreproducto").html();
        precio = $(this).parent().find(".precioproducto").html();
        id = $(this).parent().find(".idproducto").html();
        idsubmenu = $(this).parent().find(".idsubmenu").html();
        nombreSubmenu = $(this).parent().find(".nombresubmenu").html();
        idmenu = $(this).parent().find(".idmenu").html();
        nombremenu = $(this).parent().find(".nombremenu").html();
        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/hacerpedido/getIdperfil.php',
            dataType: "json",
            type: 'POST',
            data: {
                idsubmenu: idsubmenu,
            },
            success: function (menu) {
                Menu = menu;
            },
            error: function (error) {
                console.log('Disculpe, existió un problema al consultar el menu');
                console.log(error);
            },
            complete: function (xhr, status) {
                console.log('Petición realizada');
            }
        });
        $(".tituloSeleccionPizza").html("Pizza " + nombreSubmenu + " - " + nombre);
        $("#contentPizzasPrincipal").html(
                '<center><div class="btn-group radioPizzas" data-toggle="buttons">' +
                '<label class="btn btn-primary active">' +
                '<input type="radio" name="options" value="" autocomplete="off" checked>Seleccione ..' +
                '</label>' +
                '<label class="btn btn-primary">' +
                '<input type="radio" name="options" id="entera" value="entera" autocomplete="off">Entera' +
                '</label>' +
                '<label class="btn btn-primary">' +
                '<input type="radio" name="options" id="medio" value="medio" autocomplete="off">Combinada 1/2' +
                '</label>' +
                '<label class="btn btn-primary">' +
                '<input type="radio" name="options" id="cuarto" value="cuarto" autocomplete="off">Combinada 1/4' +
                '</label>' +
                '<label class="btn btn-primary">' +
                '<input type="radio" name="options" id="personalizada" value="personalizada" autocomplete="off">Personalizada' +
                '</label>' +
                '</div>' +
                '</center><br>' +
                "<div class='col-md-12' id='contentSeleccion'></div>"
                );
    } else {
        $(".contentIngredientes").html("");
        $(".contentIngredientes").hide();
        $('#contentPizzasPrincipal').html("");
        $(".tituloSeleccionPizza").html("Pizza " + nombreSubmenu);
    }
});

////////////////////////////////////////////////////////////////////////////////COMBINACIONES DE PIZZAS

$(document).on('change', '.radioPizzas input[type=radio]', function () {
    pizzaTemporal = {};
    pizzaTemporal.pizza = nombre;
    pizzaTemporal.id = id;
    pizzaTemporal.precio = precio;
    pizzaTemporal.idsubmenu = idsubmenu;
    pizzaTemporal.nombresubmenu = nombreSubmenu;
    pizzaTemporal.idmenu = idmenu;
    pizzaTemporal.nombremenu = nombremenu;
    //Regreso a la normalidad
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
    $(".btnEnviaSeleccion").hide();
    if ($(this).val() == "") {
        $(".tituloSeleccionPizza").html("Pizza " + nombreSubmenu + " - " + nombre);
        $(".contentIngredientes").html("");
        $(".contentIngredientes").hide();
        $("#contentSeleccion").html("");
    }
    if ($(this).val() == "entera") {
        $(".tituloSeleccionPizza").html("Pizza " + nombreSubmenu + " - " + nombre + " Entera");
        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/hacerpedido/consultaPizzas.php',
            type: 'POST',
            dataType: "json",
            data: {
                nombreProducto: nombre,
            },
            success: function (pizzas) {
                var htmlselectPizzas = "<option value=''>Seleccione ..</option>";
                $.when(
                        $(pizzas).each(function (index, value) {
                    if (nombreSubmenu != value.nombreSubmenu) {
                        htmlselectPizzas += "<option value='" + value.idProducto + "'>" + value.nombreSubmenu + "</option>";
                    }
                })
                        ).then(function () {
                    $("#contentSeleccion").html(
                            "<div class='grid'>" +
                            "<div class='row'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-3'>" +
                            "<div class='row row-space border-primary' style='border: 1px solid; border-radius: 6px;'>" +
                            "<div class='col-md-12'>" +
                            "<br>" + "<br>" +
                            "<div class='col-md-12'>" +
                            "<center><img src='img/pizzas/entera/entera" + entera + ".png' alt='pizza entera' class='img-responsive imgEntera'>" + "</center>" +
                            "<br>" + "<br>" +
                            "</div>" +
                            "</div>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:100%">' +
                            '<label class="btn btn-primary btn-block">' +
                            '<input type="checkbox" class="inp_entera" autocomplete="off"><div id="lblEntera">' + nombreSubmenu + '</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"

                            );
                    $("#contentSeleccion").append(
                            '<br><div class="row">' +
                            '<div class="col-md-12">' +
                            '<div class="col-md-5">' +
                            '<h4 class="txt-primary" style="padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
                            '</div>' +
                            '<div class="col-md-7">' +
                            '<div class="col-md-9 col-md-offset-3">' +
                            '<div class="form-group">' +
                            '<div class="center">' +
                            '<p></p>' +
                            '<div class="input-group">' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-minus"></span>' +
                            '</button>' +
                            '</span>' +
                            '<input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-plus"></span>' +
                            '</button>' +
                            '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<br>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-md-12">' +
                            '<div class="form-group">' +
                            '<h4 class="txt-primary">Observación del pedido :</h4>' +
                            '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                            );
                    funcionalidadCantidad();
                    pizzaTemporal.tipo = "entera";
                    pizzaTemporal.id = id;
                    pizzaTemporal.nombre = nombremenu;
                    pizzaTemporal.nombreSubmenu = nombreSubmenu;
                    pizzaTemporal.ingredientes = [];
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
        $(".btnEnviaSeleccion").show();
    } else
    if ($(this).val() == "medio") {
        $(".tituloSeleccionPizza").html("Pizza " + nombreSubmenu + " - " + nombre + " Combinada 1/2");
        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/hacerpedido/consultaPizzas.php',
            type: 'POST',
            dataType: "json",
            data: {
                nombreProducto: nombre,
            },
            success: function (pizzas) {
                var htmlselectPizzas = "<option value=''>Seleccione ..</option>";
                $.when(
                        $(pizzas).each(function (index, value) {
                    if (nombreSubmenu != value.nombreSubmenu) {
                        htmlselectPizzas += "<option value='" + value.idProducto + "'>" + value.nombreSubmenu + "</option>";
                    }
                })
                        ).then(function () {
                    $("#contentSeleccion").html(
                            "<div class='grid'>" +
                            "<div class='row'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='row row-space border-primary' style='border: 1px solid; border-radius: 6px;'>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:100%">' +
                            '<label class="btn btn-primary btn-block">' +
                            '<input type="checkbox" class="inp_medio1" autocomplete="off"><div id="lblMitad1">Mitad</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "<div class='col-md-12'>" +
                            "<br>" + "<br>" +
                            "<div class='col-md-12'>" +
                            "<center><img src='img/pizzas/media/media1_" + media1 + ".png' alt='pizza media' class='img-responsive imgMedio1' style='padding-bottom: 5px;'></center>" +
                            "</div>" +
                            "<div class='col-md-12'>" +
                            "<center><img src='img/pizzas/media/media2_" + media2 + ".png' alt='pizza media' class='img-responsive imgMedio2'></center>" +
                            "<br>" + "<br>" +
                            "</div>" +
                            "</div>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:100%">' +
                            '<label class="btn btn-primary btn-block">' +
                            '<input type="checkbox" class="inp_medio2" autocomplete="off"><div id="lblMitad2">' + nombreSubmenu + '</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Mitad 2</label><br/>" +
                            "<select class='form-control selectPizzaMedio' >" +
                            htmlselectPizzas +
                            "</select>" +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Mitad 1</label><br/>" +
                            nombreSubmenu +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                            );
                    $("#contentSeleccion").append(
                            '<br><div class="row">' +
                            '<div class="col-md-12">' +
                            '<div class="col-md-5">' +
                            '<h4 class="txt-primary" style="padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
                            '</div>' +
                            '<div class="col-md-7">' +
                            '<div class="col-md-9 col-md-offset-3">' +
                            '<div class="form-group">' +
                            '<div class="center">' +
                            '<p></p>' +
                            '<div class="input-group">' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-minus"></span>' +
                            '</button>' +
                            '</span>' +
                            '<input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-plus"></span>' +
                            '</button>' +
                            '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<br>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-md-12">' +
                            '<div class="form-group">' +
                            '<h4 class="txt-primary">Observación del pedido :</h4>' +
                            '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                            );
                    funcionalidadCantidad();
                    pizzaTemporal.tipo = "Combinada 1/2";
                    pizzaTemporal.id = id;
                    pizzaTemporal.nombre = nombremenu;
                    pizzaTemporal.nombreSubmenu = nombreSubmenu;
                    pizzaTemporal.ingredientes = [];
                    pizzaTemporal.idMedio = "";
                    pizzaTemporal.nombreMedio = "";
                    pizzaTemporal.ingredientesMedio = [];
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
    } else
    if ($(this).val() == "cuarto") {
        $(".tituloSeleccionPizza").html("Pizza " + nombreSubmenu + " - " + nombre + " Combinada 1/4");
        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/hacerpedido/consultaPizzas.php',
            type: 'POST',
            data: {
                nombreProducto: nombre,
            },
            dataType: "json",
            success: function (pizzas) {
                var htmlselectPizzas = "<option value=''>Seleccione ..</option>";
                $.when(
                        $(pizzas).each(function (index, value) {
                    if (nombreSubmenu != value.nombreSubmenu) {
                        htmlselectPizzas += "<option value='" + value.idProducto + "'>" + value.nombreSubmenu + "</option>";
                    }
                })
                        ).then(function () {
                    $("#contentSeleccion").html(
                            "<div class='grid'>" +
                            "<div class='row'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='row row-space border-primary' style='border: 1px solid; border-radius: 6px;'>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:100%">' +
                            '<label class="btn btn-primary btn-block">' +
                            '<input type="checkbox" class="inp_cuarto1" autocomplete="off"><div id="lblCuarto1">Cuarto</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "<div class='col-md-12'>" +
                            "<br>" + "<br>" +
                            "<div class='col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2' style='position:absolute;z-index:500;left: 0;right: 0;margin: 0 auto;'>" +
                            "<center><img src='img/pizzas/cuarto/cuarto1_" + cuarto1 + ".png' alt='pizza media' class='img-responsive imgCuarto1' style='padding-right: 5px;'></center>" +
                            "</div>" +
                            "<div class='col-md-12' style='padding-top: 33px;padding-right: 15px;'>" +
                            "<center><img src='img/pizzas/cuarto/cuarto2_" + cuarto2 + ".png' alt='pizza media' class='img-responsive imgCuarto2'></center>" +
                            "<br>" + "<br>" +
                            "</div>" +
                            "</div>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:100%">' +
                            '<label class="btn btn-primary btn-block">' +
                            '<input type="checkbox" class="inp_cuarto2" autocomplete="off"><div id="lblCuarto2">' + nombreSubmenu + '</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" + "<br>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<div class='form-group'>" +
                            "<label for=''>Cuarto</label><br/>" +
                            "<select class='form-control selectPizzaCuarto' >" +
                            htmlselectPizzas +
                            "</select>" +
                            "</div>" +
                            "<div class='form-group'>" +
                            "<label for=''>Pizza</label><br/>" +
                            nombreSubmenu +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"

                            );
                    $("#contentSeleccion").append(
                            '<br><div class="row">' +
                            '<div class="col-md-12">' +
                            '<div class="col-md-5">' +
                            '<h4 class="txt-primary" style="padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
                            '</div>' +
                            '<div class="col-md-7">' +
                            '<div class="col-md-9 col-md-offset-3">' +
                            '<div class="form-group">' +
                            '<div class="center">' +
                            '<p></p>' +
                            '<div class="input-group">' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-minus"></span>' +
                            '</button>' +
                            '</span>' +
                            '<input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-plus"></span>' +
                            '</button>' +
                            '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<br>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-md-12">' +
                            '<div class="form-group">' +
                            '<h4 class="txt-primary">Observación del pedido :</h4>' +
                            '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                            );
                    funcionalidadCantidad();
                    pizzaTemporal.tipo = "Combinada 1/4";
                    pizzaTemporal.id = id;
                    pizzaTemporal.nombre = nombremenu;
                    pizzaTemporal.nombreSubmenu = nombreSubmenu;
                    pizzaTemporal.ingredientes = [];
                    pizzaTemporal.idCuarto = "";
                    pizzaTemporal.nombreCuarto = "";
                    pizzaTemporal.ingredientesCuarto = [];
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
    } else
    if ($(this).val() == "personalizada") {
        $(".tituloSeleccionPizza").html("Pizza " + nombreSubmenu + " - " + nombre + " Personalizada");
        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/hacerpedido/consultaPizzas.php',
            type: 'POST',
            data: {
                nombreProducto: nombre,
            },
            dataType: "json",
            success: function (pizzas) {
                var htmlselectPizzas = "<option value=''>Seleccione ..</option>";
                $.when(
                        $(pizzas).each(function (index, value) {
                    if (nombreSubmenu != value.nombreSubmenu) {
                        htmlselectPizzas += "<option value='" + value.idProducto + "'>" + value.nombreSubmenu + "</option>";
                    }
                })
                        ).then(function () {
                    $("#contentSeleccion").html(
                            "<div class='grid'>" +
                            "<div class='row'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='row row-space border-primary' style='border: 1px solid; border-radius: 6px;'>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:101%">' +
                            '<label class="btn btn-primary" style="width: 50%;">' +
                            '<input type="checkbox" class="inp_personalizado1" autocomplete="off"><div id="lblPersonalizado1">' + nombreSubmenu + '</div>' +
                            ' </label>' +
                            '<label class="btn btn-primary" style="width: 50%;">' +
                            '<input type="checkbox" class="inp_personalizado2" autocomplete="off"><div id="lblPersonalizado2">Personalizada 2</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "<div class='col-md-12 col-sm-12 col-xs-12' style='padding: 40px 0px;'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12' style='position: absolute;top:4px;left: 8px;'>" +
                            "<img src='img/pizzas/per/per1_" + per1 + ".png' alt='pizza media' class='img-responsive imgPersonalizado1'>" +
                            "</div>" +
                            "<img src='img/pizzas/fondopersonalizado.png' class='img-responsive'>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6' style='padding-bottom: 10px;'>" +
                            "<div class='col-md-12' style='position: absolute;top:4px;right: 8px;'>" +
                            "<img src='img/pizzas/per/per2_" + per2 + ".png' alt='pizza media' class='img-responsive imgPersonalizado2'>" +
                            "</div>" +
                            "<img src='img/pizzas/fondopersonalizado.png' class='img-responsive'>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12' style='position: absolute;bottom:4px;left: 8px;'>" +
                            "<img src='img/pizzas/per/per3_" + per3 + ".png' alt='pizza media' class='img-responsive imgPersonalizado3'>" +
                            "</div>" +
                            "<img src='img/pizzas/fondopersonalizado.png' class='img-responsive'>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12' style='position: absolute;bottom:4px;right: 8px;'>" +
                            "<img src='img/pizzas/per/per4_" + per4 + ".png' alt='pizza media' class='img-responsive imgPersonalizado4'>" +
                            "</div>" +
                            "<img src='img/pizzas/fondopersonalizado.png' class='img-responsive'>" +
                            "</div>" +
                            "</div>" +
                            '<center>' +
                            '<div class="btn-group" data-toggle="buttons" style="width:101%">' +
                            '<label class="btn btn-primary" style="width: 50%;">' +
                            '<input type="checkbox" class="inp_personalizado3" autocomplete="off"><div id="lblPersonalizado3">Personalizada 3</div>' +
                            ' </label>' +
                            '<label class="btn btn-primary" style="width: 50%;">' +
                            '<input type="checkbox" class="inp_personalizado4" autocomplete="off"><div id="lblPersonalizado4">Personalizada 4</div>' +
                            ' </label>' +
                            "</div>" +
                            '</center>' +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Personalizada 1</label><br/>" +
                            nombreSubmenu +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Personalizada 2</label><br/>" +
                            "<select class='form-control selectPizzaPersonalizado2' >" +
                            htmlselectPizzas +
                            "</select>" +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Personalizada 3</label><br/>" +
                            "<select class='form-control selectPizzaPersonalizado3' >" +
                            htmlselectPizzas +
                            "</select>" +
                            "</div>" +
                            "</div>" +
                            "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                            "<br>" +
                            "<div class='form-group'>" +
                            "<label for=''>Personalizada 4</label><br/>" +
                            "<select class='form-control selectPizzaPersonalizado4' >" +
                            htmlselectPizzas +
                            "</select>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                            );
                    $("#contentSeleccion").append(
                            '<br><div class="row">' +
                            '<div class="col-md-12">' +
                            '<div class="col-md-5">' +
                            '<h4 class="txt-primary" style="padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
                            '</div>' +
                            '<div class="col-md-7">' +
                            '<div class="col-md-9 col-md-offset-3">' +
                            '<div class="form-group">' +
                            '<div class="center">' +
                            '<p></p>' +
                            '<div class="input-group">' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-minus"></span>' +
                            '</button>' +
                            '</span>' +
                            '<input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                            '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                            '<span class="glyphicon glyphicon-plus"></span>' +
                            '</button>' +
                            '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<br>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-md-12">' +
                            '<div class="form-group">' +
                            '<h4 class="txt-primary">Observación del pedido :</h4>' +
                            '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                            );
                    funcionalidadCantidad();
                    pizzaTemporal.tipo = "Personalizada";
                    pizzaTemporal.ingredientes = [];
                    pizzaTemporal.id = id;
                    pizzaTemporal.nombre = nombremenu;
                    pizzaTemporal.nombreSubmenu = nombreSubmenu;
                    pizzaTemporal.ingredientes = [];
                    pizzaTemporal.idPizza2 = "";
                    pizzaTemporal.nombrePizza2 = "";
                    pizzaTemporal.ingredientesPizza2 = [];
                    pizzaTemporal.idPizza3 = "";
                    pizzaTemporal.nombrePizza3 = "";
                    pizzaTemporal.ingredientesPizza3 = [];
                    pizzaTemporal.idPizza4 = "";
                    pizzaTemporal.nombrePizza4 = "";
                    pizzaTemporal.ingredientesPizza4 = [];
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
});
/**
 * Funcionalidades cuando se clickea sobre las imagenes, se asigna ingredientes o se quita
 */
//PIZZA ENTERA
$(document).on('click', '.imgEntera', function () {
    if ($(".inp_entera").is(":checked")) {
//Regreso a la normalidad
        $(".contentIngredientes").html("");
        $(".contentIngredientes").hide();
        $('.imgEntera').attr('src', 'img/pizzas/entera/entera' + entera + '.png');
        $(".inp_entera").prop('checked', false);
        $(".inp_entera").parent().removeClass("active");
    } else {
//Asigna ingredientes Pizza
        $('.imgEntera').attr('src', 'img/pizzas/entera/entera' + entera + '_check.png');
        $(".inp_entera").prop('checked', true);
        $(".inp_entera").parent().addClass("active");
        asignaIngredientesPizza($("#lblEntera").html(), "Entera");
    }
});
$(document).on('change', '.inp_entera', function () {
    if ($(".inp_entera").is(":checked")) {
        $('.imgEntera').attr('src', 'img/pizzas/entera/entera' + entera + '_check.png');
        asignaIngredientesPizza($("#lblEntera").html(), "Entera");
    } else {
        $('.imgEntera').attr('src', 'img/pizzas/entera/entera' + entera + '.png');
        $(".contentIngredientes").html("");
        $(".contentIngredientes").hide();
    }
});
//PARA PIZZA 1/2
$(document).on('click', '.imgMedio1', function () {
    deschekaMedio2();
    if ($(".inp_medio1").is(":checked")) {
        deschekaMedio1();
    } else {
        asignaIngredientesPizza($("#lblMitad1").html(), "Medio2");
        $('.imgMedio1').attr('src', 'img/pizzas/media/media1_' + media1 + '_check.png');
        $(".inp_medio1").prop('checked', true);
        $(".inp_medio1").parent().addClass("active");
    }
});
$(document).on('click', '.imgMedio2', function () {
    deschekaMedio1();
    if ($(".inp_medio2").is(":checked")) {
        deschekaMedio2();
    } else {
        asignaIngredientesPizza($("#lblMitad2").html(), "Medio1");
        $('.imgMedio2').attr('src', 'img/pizzas/media/media2_' + media2 + '_check.png');
        $(".inp_medio2").prop('checked', true);
        $(".inp_medio2").parent().addClass("active");
    }
});
$(document).on('change', '.inp_medio1', function () {
    deschekaMedio2();
    if ($(".inp_medio1").is(":checked")) {
        $('.imgMedio1').attr('src', 'img/pizzas/media/media1_' + media1 + '_check.png');
        asignaIngredientesPizza($("#lblMitad1").html(), "Medio2");
    } else {
        $('.imgMedio1').attr('src', 'img/pizzas/media/media1_' + media1 + '.png');
    }
});
$(document).on('change', '.inp_medio2', function () {
    deschekaMedio1();
    if ($(".inp_medio2").is(":checked")) {
        $('.imgMedio2').attr('src', 'img/pizzas/media/media2_' + media2 + '_check.png');
        asignaIngredientesPizza($("#lblMitad2").html(), "Medio1");
    } else {
        $('.imgMedio2').attr('src', 'img/pizzas/media/media2_' + media2 + '.png');
    }
});
//PARA PIZZA 1/4
$(document).on('click', '.imgCuarto1', function () {
    deschekaCuarto2();
    if ($(".inp_cuarto1").is(":checked")) {
        deschekaCuarto1();
    } else {
        asignaIngredientesPizza($("#lblCuarto1").html(), "Cuarto2");
        $('.imgCuarto1').attr('src', 'img/pizzas/cuarto/cuarto1_' + cuarto1 + '_check.png');
        $(".inp_cuarto1").prop('checked', true);
        $(".inp_cuarto1").parent().addClass("active");
    }
});
$(document).on('click', '.imgCuarto2', function () {
    deschekaCuarto1();
    if ($(".inp_cuarto2").is(":checked")) {
        deschekaCuarto2();
    } else {
        asignaIngredientesPizza($("#lblCuarto2").html(), "Cuarto1");
        $('.imgCuarto2').attr('src', 'img/pizzas/cuarto/cuarto2_' + cuarto2 + '_check.png');
        $(".inp_cuarto2").prop('checked', true);
        $(".inp_cuarto2").parent().addClass("active");
    }
});
$(document).on('change', '.inp_cuarto1', function () {
    deschekaCuarto2();
    if ($(".inp_cuarto1").is(":checked")) {
        asignaIngredientesPizza($("#lblCuarto1").html(), "Cuarto2");
        $('.imgCuarto1').attr('src', 'img/pizzas/cuarto/cuarto1_' + cuarto1 + '_check.png');
    } else {
        $('.imgCuarto1').attr('src', 'img/pizzas/cuarto/cuarto1_' + cuarto1 + '.png');
    }
});
$(document).on('change', '.inp_cuarto2', function () {
    deschekaCuarto1();
    if ($(".inp_cuarto2").is(":checked")) {
        asignaIngredientesPizza($("#lblCuarto2").html(), "Cuarto1");
        $('.imgCuarto2').attr('src', 'img/pizzas/cuarto/cuarto2_' + cuarto2 + '_check.png');
    } else {
        $('.imgCuarto2').attr('src', 'img/pizzas/cuarto/cuarto2_' + cuarto2 + '.png');
    }
});
//PARA PIZZA PERSONALIZADA
$(document).on('click', '.imgPersonalizado1', function () {
    deschekaPersonalizados(1);
    if ($(".inp_personalizado1").is(":checked")) {
        $('.imgPersonalizado1').attr('src', 'img/pizzas/per/per1_' + per1 + '.png');
        $(".inp_personalizado1").prop('checked', false);
        $(".inp_personalizado1").parent().removeClass("active");
    } else {
        asignaIngredientesPizza($("#lblPersonalizado1").html(), "Personalizado1");
        $('.imgPersonalizado1').attr('src', 'img/pizzas/per/per1_' + per1 + '_check.png');
        $(".inp_personalizado1").prop('checked', true);
        $(".inp_personalizado1").parent().addClass("active");
    }
});
$(document).on('click', '.imgPersonalizado2', function () {
    deschekaPersonalizados(2);
    if ($(".inp_personalizado2").is(":checked")) {
        $('.imgPersonalizado2').attr('src', 'img/pizzas/per/per2_' + per2 + '.png');
        $(".inp_personalizado2").prop('checked', false);
        $(".inp_personalizado2").parent().removeClass("active");
    } else {
        asignaIngredientesPizza($("#lblPersonalizado2").html(), "Personalizado2");
        $('.imgPersonalizado2').attr('src', 'img/pizzas/per/per2_' + per2 + '_check.png');
        $(".inp_personalizado2").prop('checked', true);
        $(".inp_personalizado2").parent().addClass("active");
    }
});
$(document).on('click', '.imgPersonalizado3', function () {
    deschekaPersonalizados(3);
    if ($(".inp_personalizado3").is(":checked")) {
        $('.imgPersonalizado3').attr('src', 'img/pizzas/per/per3_' + per3 + '.png');
        $(".inp_personalizado3").prop('checked', false);
        $(".inp_personalizado3").parent().removeClass("active");
    } else {
        asignaIngredientesPizza($("#lblPersonalizado3").html(), "Personalizado3");
        $('.imgPersonalizado3').attr('src', 'img/pizzas/per/per3_' + per3 + '_check.png');
        $(".inp_personalizado3").prop('checked', true);
        $(".inp_personalizado3").parent().addClass("active");
    }
});
$(document).on('click', '.imgPersonalizado4', function () {
    deschekaPersonalizados(4);
    if ($(".inp_personalizado4").is(":checked")) {
        $('.imgPersonalizado4').attr('src', 'img/pizzas/per/per4_' + per4 + '.png');
        $(".inp_personalizado4").prop('checked', false);
        $(".inp_personalizado4").parent().removeClass("active");
    } else {
        asignaIngredientesPizza($("#lblPersonalizado4").html(), "Personalizado4");
        $('.imgPersonalizado4').attr('src', 'img/pizzas/per/per4_' + per4 + '_check.png');
        $(".inp_personalizado4").prop('checked', true);
        $(".inp_personalizado4").parent().addClass("active");
    }
});
$(document).on('change', '.inp_personalizado1', function () {
    deschekaPersonalizados(1);
    if ($(".inp_personalizado1").is(":checked")) {
        asignaIngredientesPizza($("#lblPersonalizado1").html(), "Personalizado1");
        $('.imgPersonalizado1').attr('src', 'img/pizzas/per/per1_' + per1 + '_check.png');
    } else {
        $('.imgPersonalizado1').attr('src', 'img/pizzas/per/per1_' + per1 + '.png');
    }
});
$(document).on('change', '.inp_personalizado2', function () {
    deschekaPersonalizados(2);
    if ($(".inp_personalizado2").is(":checked")) {
        asignaIngredientesPizza($("#lblPersonalizado2").html(), "Personalizado2");
        $('.imgPersonalizado2').attr('src', 'img/pizzas/per/per2_' + per2 + '_check.png');
    } else {
        $('.imgPersonalizado2').attr('src', 'img/pizzas/per/per2_' + per2 + '.png');
    }
});
$(document).on('change', '.inp_personalizado3', function () {
    deschekaPersonalizados(3);
    if ($(".inp_personalizado3").is(":checked")) {
        asignaIngredientesPizza($("#lblPersonalizado3").html(), "Personalizado3");
        $('.imgPersonalizado3').attr('src', 'img/pizzas/per/per3_' + per3 + '_check.png');
    } else {
        $('.imgPersonalizado3').attr('src', 'img/pizzas/per/per3_' + per3 + '.png');
    }
});
$(document).on('change', '.inp_personalizado4', function () {
    deschekaPersonalizados(4);
    if ($(".inp_personalizado4").is(":checked")) {
        asignaIngredientesPizza($("#lblPersonalizado4").html(), "Personalizado4");
        $('.imgPersonalizado4').attr('src', 'img/pizzas/per/per4_' + per4 + '_check.png');
    } else {
        $('.imgPersonalizado4').attr('src', 'img/pizzas/per/per4_' + per4 + '.png');
    }
});


////////////////////////////////////////////////////////////////////////////////SOLO SE PUEDE COLOCAR ENVIAR CUNADO SE HAYNA SELECCIONADO TODAS LAS PARTES DE LA PIZZA
function verificaSelectMedio() {
    if (($('.selectPizzaMedio').val() != "")) {
        $(".btnEnviaSeleccion").show();
    } else {
        $(".btnEnviaSeleccion").hide();
    }
}

function verificaSelectTercio() {
    if (($('.selectPizzaTercio1').val() != "") && ($('.selectPizzaTercio2').val() != "")) {
        $(".btnEnviaSeleccion").show();
    } else {
        $(".btnEnviaSeleccion").hide();
    }
}

function verificaSelectCuarto() {
    if ($('.selectPizzaCuarto').val() != "") {
        $(".btnEnviaSeleccion").show();
    } else {
        $(".btnEnviaSeleccion").hide();
    }
}

function verificaSelectPersonalizado() {
    if (($('.selectPizzaPersonalizado2').val() != "") && ($('.selectPizzaPersonalizado3').val() != "") && ($('.selectPizzaPersonalizado4').val() != "")) {
        $(".btnEnviaSeleccion").show();
    } else {
        $(".btnEnviaSeleccion").hide();
    }
}

//asigna los ingredientes a una pizza, si es entera/ 1/2 piza / cuarto / personalizada
function asignaIngredientesPizza(nombrePizza, tipoPizza) {
    //asigna ingredientes, solo a la piza seleccionada por defecto(la que se selecciona inicialmente)
    //las demas partes de la pizza, solo puedes seleccionar el tipo de pizza no sus ingredientes 
    console.log(pizzaTemporal);
    if ((nombrePizza.localeCompare("Mitad") != 0) && (nombrePizza.localeCompare("Cuarto") != 0) && (nombrePizza.localeCompare("Personalizada 1") != 0) && (nombrePizza.localeCompare("Personalizada 2") != 0) && (nombrePizza.localeCompare("Personalizada 3") != 0) && (nombrePizza.localeCompare("Personalizada 4") != 0)) {
        if (pizzaTemporal.tipo == "entera") {

            if (tipoPizza == "Entera") {
                if (pizzaTemporal.ingredientes.length == 0) {
                    consultaIngPizzaE(nombrePizza, tipoPizza);
                } else {
                    asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientes);
                }
            }
        } else
        if (pizzaTemporal.tipo == "Combinada 1/2") {

            if (tipoPizza == "Medio1") {
                //  if (pizzaTemporal.ingredientes.length == 0) {
                consultaIngPizzaE(nombrePizza, tipoPizza);
                asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientes);
                // } else {
                //    asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientes);
                //}
            } else
            if (tipoPizza == "Medio2") {
                // if (pizzaTemporal.ingredientesMedio.length == 0) {
                consultaIngPizzaE(nombrePizza, tipoPizza);
                asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientesMedio);
                // } else {
                //    asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientesMedio);
                //}
            }
        } else
        if (pizzaTemporal.tipo == "Combinada 1/4") {
            if (tipoPizza == "Cuarto1") {
                // if (pizzaTemporal.ingredientes.length == 0) {
                consultaIngPizzaE(nombrePizza, tipoPizza);
                asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientes);
                //} else {
                //}
            } else
            if (tipoPizza == "Cuarto2") {
                // if (pizzaTemporal.ingredientesCuarto.length == 0) {
                consultaIngPizzaE(nombrePizza, tipoPizza);
                //} else {
                asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientesCuarto);
                //}
            }
        } else
        if (pizzaTemporal.tipo == "Personalizada") {
            if (tipoPizza == "Personalizado1") {
                // if (pizzaTemporal.ingredientes.length == 0) {
                consultaIngPizzaE(nombrePizza, tipoPizza);
                // } else {
                asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientes);
                // }
            } else
            if (tipoPizza == "Personalizado2") {
                // if (pizzaTemporal.ingredientesPizza2.length == 0) {
                consultaIngPizzaE(nombrePizza, tipoPizza);
                // } else {
                asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientesPizza2);
                // }
            } else
            if (tipoPizza == "Personalizado3") {
                // if (pizzaTemporal.ingredientesPizza3.length == 0) {
                consultaIngPizzaE(nombrePizza, tipoPizza);
                // } else {
                asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientesPizza3);
                // }
            } else
            if (tipoPizza == "Personalizado4") {
                // if (pizzaTemporal.ingredientesPizza4.length == 0) {
                consultaIngPizzaE(nombrePizza, tipoPizza);
                //} else {
                asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientesPizza4);
                //}
            }
        }
    }
}

//Consulta los ingredientes de una pizza especifica
function consultaIngPizzaE(nombrePizza, tipoPizza) {
    console.log('en consultaIngPizzaE');
    $.ajax({
// COnsulta de ingredientes de pizza especificos
        url: 'assets/hacerpedido/consultaIngredientesPizzaE.php',
        type: 'POST',
        dataType: "json",
        data: {
            nombreProducto: nombre,
            nombreSubmenu: nombrePizza
        },
        success: function (ingredientes) {
            var htmlselectIngredientesE = "";
            $.when(
                    $(ingredientes).each(function (index, value) {
                htmlselectIngredientesE += '<div class="col-md-12 contenedorIngrediente" style="padding:5px;">' +
                        '<div class="col-md-12 btn-primary" style="text-align: center;font-size: 12px;padding: 5px;word-wrap: break-word;color: white;border: 0.5px solid;border-radius: 4px;">' +
                        value.nombreIngrediente +
                        "<div class='nombreingrediente' style='display: none;'>" + value.nombreIngrediente + "</div>" +
                        "<div class='idingrediente' style='display: none;'>" + value.idIngrediente + "</div>" +
                        '</div>' +
                        '</div>';
                if (tipoPizza == "Entera" || tipoPizza == "Medio1" || tipoPizza == "Cuarto1" || tipoPizza == "Personalizado1") {
                    pizzaTemporal.ingredientes.push({
                        nombreIngrediente: value.nombreIngrediente,
                        idIngrediente: value.idIngrediente
                    });
                } else
                if (tipoPizza == "Medio2") {
                    pizzaTemporal.ingredientesMedio.push({
                        nombreIngrediente: value.nombreIngrediente,
                        idIngrediente: value.idIngrediente
                    });
                } else
                if (tipoPizza == "Cuarto2") {
                    pizzaTemporal.ingredientesCuarto.push({
                        nombreIngrediente: value.nombreIngrediente,
                        idIngrediente: value.idIngrediente
                    });
                } else
                if (tipoPizza == "Personalizado2") {
                    pizzaTemporal.ingredientesPizza2.push({
                        nombreIngrediente: value.nombreIngrediente,
                        idIngrediente: value.idIngrediente
                    });
                } else
                if (tipoPizza == "Personalizado3") {
                    pizzaTemporal.ingredientesPizza3.push({
                        nombreIngrediente: value.nombreIngrediente,
                        idIngrediente: value.idIngrediente
                    });
                } else
                if (tipoPizza == "Personalizado4") {
                    pizzaTemporal.ingredientesPizza4.push({
                        nombreIngrediente: value.nombreIngrediente,
                        idIngrediente: value.idIngrediente
                    });
                }
            })
                    ).then(function () {
                $.ajax({
                    // COnsulta de ingredientes de pizza generales
                    url: 'assets/hacerpedido/consultaIngredientesPizzaG.php',
                    type: 'POST',
                    dataType: "json",
                    success: function (ingredientes) {
                        var htmlselectIngredientesG = "";
                        $.when(
                                $(ingredientes).each(function (index, value) {
                            htmlselectIngredientesG += '<div class="col-md-12 contenedorIngrediente" style="padding:5px;">' +
                                    '<div class="col-md-12 btn-primary" style="text-align: center;font-size: 12px;padding: 5px;word-wrap: break-word;color: white;border: 0.5px solid;border-radius: 4px;">' +
                                    value.nombreIngrediente +
                                    "<div class='nombreingrediente' style='display: none;'>" + value.nombreIngrediente + "</div>" +
                                    "<div class='idingrediente' style='display: none;'>" + value.idIngrediente + "</div>" +
                                    '</div>' +
                                    '</div>';
                        })
                                ).then(function () {

                            $(".contentIngredientes").html(
                                    "<br><center><h4 class='txt-primary'>Ingredientes Pizza " + nombrePizza + "</h4></center><br>" +
                                    "<div class='row'>" +
                                    "<div class='col-md-12'>" +
                                    "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                                    "<p style='color:white;text-align:center;'>Ingredientes</p>" +
                                    "<div class='col-md-12 rightIng border-primary' style='background: white;height:250px; overflow: auto ;border: 1px solid; border-radius: 6px;padding: 15px;'>" +
                                    htmlselectIngredientesE +
                                    '</div>' +
                                    '</div>' +
                                    "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                                    "<p style='color:white;text-align:center;'>Ingredientes Extras</p>" +
                                    "<div class='col-md-12 leftIng border-primary' style='background: white;height:250px; overflow: auto ;border: 1px solid; border-radius: 6px;padding: 15px;'>" +
                                    htmlselectIngredientesG +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'
                                    );
                            dragula([document.querySelector('.leftIng'), document.querySelector('.rightIng')], {
                                isContainer: function (el) {
                                    return false; // only elements in drake.containers will be taken into account
                                },
                                moves: function (el, source, handle, sibling) {
                                    return true; // elements are always draggable by default
                                },
                                accepts: function (el, target, source, sibling) {
                                    return true; // elements can be dropped in any of the `containers` by default
                                },
                                invalid: function (el, handle) {
                                    return false; // don't prevent any drags from initiating by default
                                },
                                direction: 'vertical', // Y axis is considered when determining where an element would be dropped
                                copy: function (el, handle) {
                                    return true;
                                }, // elements are moved by default, not copied
                                copySortSource: false, // elements in copy-source containers can be reordered
                                revertOnSpill: false, // spilling will put the element back where it was dragged from, if this is true
                                removeOnSpill: false, // spilling will `.remove` the element, if this is true
                                mirrorContainer: document.body, // set the element that gets mirror elements appended
                                ignoreInputTextSelection: true // allows users to select input text, see details below
                            });
                            dragula([document.querySelector('.rightIng')], {
                                removeOnSpill: true, // spilling will `.remove` the element, if this is true
                                accepts: function (el, target, source, sibling) {
                                    return false; // elements can be dropped in any of the `containers` by default
                                },
                            });
                            $('.rightIng').bind("DOMSubtreeModified", function () {
                                if (tipoPizza == "Entera" || tipoPizza == "Medio1" || tipoPizza == "Cuarto1" || tipoPizza == "Personalizado1") {

                                    pizzaTemporal.ingredientes = [];
                                    $(".rightIng .contenedorIngrediente").each(function (index) {
                                        pizzaTemporal.ingredientes.push({
                                            nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                            idIngrediente: $(this).find(".idingrediente").html()
                                        });
                                    })

                                } else
                                if (tipoPizza == "Medio2") {

                                    pizzaTemporal.ingredientesMedio = [];
                                    $(".rightIng .contenedorIngrediente").each(function (index) {
                                        pizzaTemporal.ingredientesMedio.push({
                                            nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                            idIngrediente: $(this).find(".idingrediente").html()
                                        });
                                    })

                                } else
                                if (tipoPizza == "Cuarto2") {

                                    pizzaTemporal.ingredientesCuarto = [];
                                    $(".rightIng .contenedorIngrediente").each(function (index) {
                                        pizzaTemporal.ingredientesCuarto.push({
                                            nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                            idIngrediente: $(this).find(".idingrediente").html()
                                        });
                                    })

                                } else
                                if (tipoPizza == "Personalizado2") {

                                    pizzaTemporal.ingredientesPizza2 = [];
                                    $(".rightIng .contenedorIngrediente").each(function (index) {
                                        pizzaTemporal.ingredientesPizza2.push({
                                            nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                            idIngrediente: $(this).find(".idingrediente").html()
                                        });
                                    })

                                } else
                                if (tipoPizza == "Personalizado3") {

                                    pizzaTemporal.ingredientesPizza3 = [];
                                    $(".rightIng .contenedorIngrediente").each(function (index) {
                                        pizzaTemporal.ingredientesPizza3.push({
                                            nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                            idIngrediente: $(this).find(".idingrediente").html()
                                        });
                                    })

                                } else
                                if (tipoPizza == "Personalizado4") {

                                    pizzaTemporal.ingredientesPizza4 = [];
                                    $(".rightIng .contenedorIngrediente").each(function (index) {
                                        pizzaTemporal.ingredientesPizza4.push({
                                            nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                            idIngrediente: $(this).find(".idingrediente").html()
                                        });
                                    })

                                }
                            });
                            //************Mostrar contenido de Ingredientes
                            //$.when($("#contentSeleccion").slideUp("slow")).then(function () {
                            $(".contentIngredientes").slideDown("slow");
                            $("#pizza_value").val('2');
                            //$(".btnEnviaSeleccion").show();
                            //});

                        })
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

function asignaIngPizzaE(nombrePizza, tipoPizza, ingredientes) {
    console.log('sssssssss');
    console.log(ingredientes);
    console.log(tipoPizza);
    var htmlselectIngredientesE = "";
    $.when(
            $(ingredientes).each(function (index, value) {
        htmlselectIngredientesE += '<div class="col-md-12 contenedorIngrediente" style="padding:5px;">' +
                '<div class="col-md-12 btn-primary" style="text-align: center;font-size: 12px;padding: 5px;word-wrap: break-word;color: white;border: 0.5px solid;border-radius: 4px;">' +
                value.nombreIngrediente +
                "<div class='nombreingrediente' style='display: none;'>" + value.nombreIngrediente + "</div>" +
                "<div class='idingrediente' style='display: none;'>" + value.idIngrediente + "</div>" +
                '</div>' +
                '</div>';
    })
            ).then(function () {
        $.ajax({
// COnsulta de ingredientes de pizza generales
            url: 'assets/hacerpedido/consultaIngredientesPizzaG.php',
            type: 'POST',
            dataType: "json",
            success: function (ingredientes) {
                var htmlselectIngredientesG = "";
                $.when(
                        $(ingredientes).each(function (index, value) {
                    htmlselectIngredientesG += '<div class="col-md-12 contenedorIngrediente" style="padding:5px;">' +
                            '<div class="col-md-12 btn-primary" style="text-align: center;font-size: 12px;padding: 5px;word-wrap: break-word;color: white;border: 0.5px solid;border-radius: 4px;">' +
                            value.nombreIngrediente +
                            "<div class='nombreingrediente' style='display: none;'>" + value.nombreIngrediente + "</div>" +
                            "<div class='idingrediente' style='display: none;'>" + value.idIngrediente + "</div>" +
                            '</div>' +
                            '</div>';
                })
                        ).then(function () {

                    $(".contentIngredientes").html(
                            "<br><h3 class='txt-primary'>Ingredientes Pizza " + nombrePizza + "</h3><br>" +
                            "<div class='row'>" +
                            "<div class='col-md-12'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<p style='color:white;text-align:center;'>Ingredientes</p>" +
                            "<div class='col-md-12 rightIng border-primary' style='background: white;height:250px; overflow: auto ;border: 1px solid; border-radius: 6px;padding: 15px;'>" +
                            htmlselectIngredientesE +
                            '</div>' +
                            '</div>' +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<p style='color:white;text-align:center;'>Ingredientes Extras</p>" +
                            "<div class='col-md-12 leftIng border-primary' style='background: white;height:250px; overflow: auto ;border: 1px solid; border-radius: 6px;padding: 15px;'>" +
                            htmlselectIngredientesG +
                            '</div>' +
                            '</div>' +
                            '</div>'
                            );
                    dragula([document.querySelector('.leftIng'), document.querySelector('.rightIng')], {
                        isContainer: function (el) {
                            return false; // only elements in drake.containers will be taken into account
                        },
                        moves: function (el, source, handle, sibling) {
                            return true; // elements are always draggable by default
                        },
                        accepts: function (el, target, source, sibling) {
                            return true; // elements can be dropped in any of the `containers` by default
                        },
                        invalid: function (el, handle) {
                            return false; // don't prevent any drags from initiating by default
                        },
                        direction: 'vertical', // Y axis is considered when determining where an element would be dropped
                        copy: true, // elements are moved by default, not copied
                        copySortSource: false, // elements in copy-source containers can be reordered
                        revertOnSpill: false, // spilling will put the element back where it was dragged from, if this is true
                        removeOnSpill: false, // spilling will `.remove` the element, if this is true
                        mirrorContainer: document.body, // set the element that gets mirror elements appended
                        ignoreInputTextSelection: true // allows users to select input text, see details below
                    });
                    dragula([document.querySelector('.rightIng')], {
                        removeOnSpill: true, // spilling will `.remove` the element, if this is true
                        accepts: function (el, target, source, sibling) {
                            return false; // elements can be dropped in any of the `containers` by default
                        }
                    });
                    $('.rightIng').bind("DOMSubtreeModified", function () {

                        if (tipoPizza == "Entera" || tipoPizza == "Medio1" || tipoPizza == "Cuarto1" || tipoPizza == "Personalizado1") {

                            pizzaTemporal.ingredientes = [];
                            $(".rightIng .contenedorIngrediente").each(function (index) {
                                pizzaTemporal.ingredientes.push({
                                    nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                    idIngrediente: $(this).find(".idingrediente").html()
                                });
                            })

                        } else
                        if (tipoPizza == "Medio2") {

                            pizzaTemporal.ingredientesMedio = [];
                            $(".rightIng .contenedorIngrediente").each(function (index) {
                                pizzaTemporal.ingredientesMedio.push({
                                    nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                    idIngrediente: $(this).find(".idingrediente").html()
                                });
                            })

                        } else
                        if (tipoPizza == "Cuarto2") {

                            pizzaTemporal.ingredientesCuarto = [];
                            $(".rightIng .contenedorIngrediente").each(function (index) {
                                pizzaTemporal.ingredientesCuarto.push({
                                    nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                    idIngrediente: $(this).find(".idingrediente").html()
                                });
                            })

                        } else
                        if (tipoPizza == "Personalizado2") {

                            pizzaTemporal.ingredientesPizza2 = [];
                            $(".rightIng .contenedorIngrediente").each(function (index) {
                                pizzaTemporal.ingredientesPizza2.push({
                                    nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                    idIngrediente: $(this).find(".idingrediente").html()
                                });
                            })
                        } else
                        if (tipoPizza == "Personalizado3") {

                            pizzaTemporal.ingredientesPizza3 = [];
                            $(".rightIng .contenedorIngrediente").each(function (index) {
                                pizzaTemporal.ingredientesPizza3.push({
                                    nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                    idIngrediente: $(this).find(".idingrediente").html()
                                });
                            })
                        } else
                        if (tipoPizza == "Personalizado4") {

                            pizzaTemporal.ingredientesPizza4 = [];
                            $(".rightIng .contenedorIngrediente").each(function (index) {
                                pizzaTemporal.ingredientesPizza4.push({
                                    nombreIngrediente: $(this).find(".nombreingrediente").html(),
                                    idIngrediente: $(this).find(".idingrediente").html()
                                });
                            })
                        }
                    });
                    //    $.when($("#contentSeleccion").slideUp("slow")).then(function () {
                    $(".contentIngredientes").slideDown("slow");
                    $('#pizza_value').val('2');
                    // $(".btnEnviaSeleccion").show();
                    //aqui
                    //  });
                })
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
}

//Funciones de Deschequeo, cambia las imagenes de las pizzas
function deschekaPersonalizados(numero) {
    $(".contentIngredientes").html("");
    // $(".contentIngredientes").hide("slow");
    if (numero == 1) {
        $('.imgPersonalizado2').attr('src', 'img/pizzas/per/per2_' + per2 + '.png');
        $(".inp_personalizado2").prop('checked', false);
        $(".inp_personalizado2").parent().removeClass("active");
        $('.imgPersonalizado3').attr('src', 'img/pizzas/per/per3_' + per3 + '.png');
        $(".inp_personalizado3").prop('checked', false);
        $(".inp_personalizado3").parent().removeClass("active");
        $('.imgPersonalizado4').attr('src', 'img/pizzas/per/per4_' + per4 + '.png');
        $(".inp_personalizado4").prop('checked', false);
        $(".inp_personalizado4").parent().removeClass("active");
    } else
    if (numero == 2) {
        $('.imgPersonalizado1').attr('src', 'img/pizzas/per/per1_' + per1 + '.png');
        $(".inp_personalizado1").prop('checked', false);
        $(".inp_personalizado1").parent().removeClass("active");
        $('.imgPersonalizado3').attr('src', 'img/pizzas/per/per3_' + per3 + '.png');
        $(".inp_personalizado3").prop('checked', false);
        $(".inp_personalizado3").parent().removeClass("active");
        $('.imgPersonalizado4').attr('src', 'img/pizzas/per/per4_' + per4 + '.png');
        $(".inp_personalizado4").prop('checked', false);
        $(".inp_personalizado4").parent().removeClass("active");
    } else
    if (numero == 3) {
        $('.imgPersonalizado2').attr('src', 'img/pizzas/per/per2_' + per2 + '.png');
        $(".inp_personalizado2").prop('checked', false);
        $(".inp_personalizado2").parent().removeClass("active");
        $('.imgPersonalizado1').attr('src', 'img/pizzas/per/per1_' + per1 + '.png');
        $(".inp_personalizado1").prop('checked', false);
        $(".inp_personalizado1").parent().removeClass("active");
        $('.imgPersonalizado4').attr('src', 'img/pizzas/per/per4_' + per4 + '.png');
        $(".inp_personalizado4").prop('checked', false);
        $(".inp_personalizado4").parent().removeClass("active");
    } else
    if (numero == 4) {
        $('.imgPersonalizado2').attr('src', 'img/pizzas/per/per2_' + per2 + '.png');
        $(".inp_personalizado2").prop('checked', false);
        $(".inp_personalizado2").parent().removeClass("active");
        $('.imgPersonalizado3').attr('src', 'img/pizzas/per/per3_' + per3 + '.png');
        $(".inp_personalizado3").prop('checked', false);
        $(".inp_personalizado3").parent().removeClass("active");
        $('.imgPersonalizado1').attr('src', 'img/pizzas/per/per1_' + per1 + '.png');
        $(".inp_personalizado1").prop('checked', false);
        $(".inp_personalizado1").parent().removeClass("active");
    }

}

function deschekaCuarto1() {
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
    $('.imgCuarto1').attr('src', 'img/pizzas/cuarto/cuarto1_' + cuarto1 + '.png');
    $(".inp_cuarto1").prop('checked', false);
    $(".inp_cuarto1").parent().removeClass("active");
}

function deschekaCuarto2() {
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
    $('.imgCuarto2').attr('src', 'img/pizzas/cuarto/cuarto2_' + cuarto2 + '.png');
    $(".inp_cuarto2").prop('checked', false);
    $(".inp_cuarto2").parent().removeClass("active");
}

function deschekaMedio1() {
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
    $('.imgMedio1').attr('src', 'img/pizzas/media/media1_' + media1 + '.png');
    $(".inp_medio1").prop('checked', false);
    $(".inp_medio1").parent().removeClass("active");
}

function deschekaMedio2() {
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
    $('.imgMedio2').attr('src', 'img/pizzas/media/media2_' + media2 + '.png');
    $(".inp_medio2").prop('checked', false);
    $(".inp_medio2").parent().removeClass("active");
}


//VERIFICACION DE SELECTS CUANDO ESTA EN LA SECCION PIZZA Y VERIFICANDO LOS INGREDIENTES:
$(document).on('change', '.selectPizzaMedio', function () {
    pizzaTemporal.ingredientesMedio = [];

    if ($(this).val() == "") {
        $("#lblMitad1").text("Mitad");
        pizzaTemporal.nombreMedio = "";
        pizzaTemporal.idMedio = "";
    } else {
        $("#lblMitad1").text($(".selectPizzaMedio option:selected").text());
        pizzaTemporal.nombreMedio = $(".selectPizzaMedio option:selected").text();
        pizzaTemporal.idMedio = $(".selectPizzaMedio option:selected").val();
    }
    verificaSelectMedio();
});
$(document).on('change', '.selectPizzaCuarto', function () {
    pizzaTemporal.ingredientesCuarto = [];
    if ($(this).val() == "") {
        $("#lblCuarto1").html("Cuarto");
        pizzaTemporal.nombreCuarto = "";
        pizzaTemporal.idCuarto = "";
    } else {
        $("#lblCuarto1").html($(".selectPizzaCuarto option:selected").text());
        pizzaTemporal.nombreCuarto = $(".selectPizzaCuarto option:selected").text();
        pizzaTemporal.idCuarto = $(".selectPizzaCuarto option:selected").val();
    }
    verificaSelectCuarto();
});
$(document).on('change', '.selectPizzaPersonalizado1', function () {
    pizzaTemporal.ingredientesPizza1 = [];
    if ($(this).val() == "") {
        $("#lblPersonalizado1").html("Ingrediente 1");
    } else {
        $("#lblPersonalizado1").html($(".selectPizzaPersonalizado1 option:selected").text());
        pizzaTemporal.nombrePizza1 = $(".selectPizzaPersonalizado1 option:selected").text();
        pizzaTemporal.idPizza1 = $(".selectPizzaPersonalizado1 option:selected").val();
    }
    verificaSelectPersonalizado();
});
$(document).on('change', '.selectPizzaPersonalizado2', function () {
    pizzaTemporal.ingredientesPizza2 = [];
    if ($(this).val() == "") {
        $("#lblPersonalizado2").html("Ingrediente 2");
    } else {
        $("#lblPersonalizado2").html($(".selectPizzaPersonalizado2 option:selected").text());
        pizzaTemporal.nombrePizza2 = $(".selectPizzaPersonalizado2 option:selected").text();
        pizzaTemporal.idPizza2 = $(".selectPizzaPersonalizado2 option:selected").val();
    }
    verificaSelectPersonalizado();
});
$(document).on('change', '.selectPizzaPersonalizado3', function () {
    pizzaTemporal.ingredientesPizza3 = [];
    if ($(this).val() == "") {
        $("#lblPersonalizado3").html("Ingrediente 3");
    } else {
        $("#lblPersonalizado3").html($(".selectPizzaPersonalizado3 option:selected").text());
        pizzaTemporal.nombrePizza3 = $(".selectPizzaPersonalizado3 option:selected").text();
        pizzaTemporal.idPizza3 = $(".selectPizzaPersonalizado3 option:selected").val();
    }
    verificaSelectPersonalizado();
});
$(document).on('change', '.selectPizzaPersonalizado4', function () {
    pizzaTemporal.ingredientesPizza4 = [];
    if ($(this).val() == "") {
        $("#lblPersonalizado4").html("Ingrediente 4");
    } else {
        $("#lblPersonalizado4").html($(".selectPizzaPersonalizado4 option:selected").text());
        pizzaTemporal.nombrePizza4 = $(".selectPizzaPersonalizado4 option:selected").text();
        pizzaTemporal.idPizza4 = $(".selectPizzaPersonalizado4 option:selected").val();
    }
    verificaSelectPersonalizado();
});

function funcionalidadCantidad() {
//PARA LA FUNCIONALIDAD DE LA CANTIDAD DEL PRODUCTO
    $('.btn-number').click(function (e) {
        e.preventDefault();
        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        var input = $("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {
                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }
            } else if (type == 'plus') {
                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }
            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());
        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }
    });
    $(".input-number").keydown(function (e) {
// Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                // Allow: Ctrl+A
                        (e.keyCode == 65 && e.ctrlKey === true) ||
                        // Allow: home, end, left, right
                                (e.keyCode >= 35 && e.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
    //FIN ----FUNCIONALIDAD DE LA CANTIDAD DEL PRODUCTO
}

////////////////////////////////////////////////////////////////////////////////ELIMINAR UN ITEM DE LA LISTA.
$(document).on("click", ".eliminar_item", function () {
    $(this).parent().parent().remove();
    id = $(this).find(".idproducto").html();
    //Para cuando el usuario da click sobre eliminar item
    for (var i = 0; i < arrayProductos.length; i++) {
        if (arrayProductos[i].idProducto == id) {
            arrayProductos.splice(i, 1);
            break;
        }
    }
    $.notify('El pedido "' + $(this).parent().parent().find(".contacts-title").html() + '" ha sido eliminado ', "error");
    detalledelpago();
});


$('#ModalSeleccionPizza').on('hidden.bs.modal', function () {
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
    $(".btnEnviaSeleccion").hide();
    $(".input-number").val(1);
});

$('#ModalSeleccionaIngredientes').on('hidden.bs.modal', function () {
    $(".contenidoSeleccionaIngredientes").html("");
    $(".input-number").val(1);
});

$('#ModalPreferencias').on('hidden.bs.modal', function () {
    $(".contentModalPreferencias").html("");
    $(".input-number").val(1);
});

$('#ModalSeleccionPizza').on('hidden.bs.modal', function () {
    $(".btnEnviaSeleccion").hide();
});

$('#ModalSeleccionPizza').on('hidden.bs.modal', function () {
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
})

$('#ModalSeleccionPizza').on('hidden.bs.modal', function () {
    $(".btnEnviaSeleccion").hide();
})


///////////////////////////////////////////////////////////////// ENVIAR PEDIDOS A COCINA
$(document).on("click", ".btnEnviaPedido", function () {
    var idpedido, idcliente, subtotal, descuento, iva, formadepago, totalapagar, vuelto, efectivo, tdc, cheque, vouchertdc, nrocheque, pagadocon = "", formadepago;
    $("#payment_methods_table input[type=checkbox]").each(function () {/////////////VALIDAMOS QUE NO EXISTAN CAMPOS VACIOS EN LOS METODOS DE PAGO
        if ($(this).is(':checked')) {
            formadepago = $(this).val();
            pagadocon += formadepago + "|";
        }
    });
    $('#mb-loading').modal('toggle');
    idcliente = $("#id_cliente").val();
    subtotal = $(".subtotalFactura").html();
    descuento = $("#descuento_factura").val();
    if (descuento.length == 0) {
        descuento = "0.00"
    }
    iva = $(".ivaFactura").html();
    formadepago = pagadocon;
    totalapagar = $(".totalapagarFactura").html();
    vuelto = $("#monto_devuelto").val();
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

    //************** envio a controlador pedido
    dir = "";
    if (pedidoTipo == "domicilio") {
        dir = "assets/domicilio/dom_controller.php";
    }
    ;
    if (pedidoTipo == "para llevar") {
        dir = "assets/parallevar/parallevar_controller.php";
    }
    ;
    if (pedidoTipo == "mesas") {
        dir = "'assets/hacerpedido/registraPedido.php'";
    }
    ;
    $.ajax({
        // Verificacion de los datos introducidos
        url: dir,
        type: 'POST',
        dataType: "json",
        data: {
            productos: arrayProductos,
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
        success: function (response) {
            $('#pizza_loading').delay(1000).hide('slow');
            setTimeout(function () {
                $('#mb-loading .mb-title').html('<span class="fa fa-check-circle"></span> Solicitud procesada!');
            }, 1000);
            $('#success_icon').delay(1500).fadeIn(500);
            setTimeout(function () {
                $('#mb-loading').modal('toggle');
            }, 2000);
            console.log(response);
            setTimeout(function () {
                window.location.href = window.location.href;
            }, 2000);
        },
        error: function (error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log('Petición realizadaaaaa');
        }
    });
});

//muestra la lista de productos del pedido
function show_items() {
    $('#resumen_pedido').removeClass('displaynone');
}
;