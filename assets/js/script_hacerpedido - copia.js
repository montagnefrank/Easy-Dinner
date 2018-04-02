$(document).ready(function () {

    //Para consultar el menu existente de la pizzeria
    $.ajax({
        // Verificacion de los datos introducidos
        url: 'assets/hacerpedido/menu.php',
        dataType: "json",
        type: 'GET',
        success: function (menu) {
            asignaMenu(menu);
        },
        error: function (error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log('Consulta de menú realizada con exito');
        }
    });

    //Para establecer los menus existentes en la pantalla
    function asignaMenu(menu) {

        htmlmenu = "";
        htmlcontent = "";

        $.when(
                //iteracion del menu
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
            $(".tabMenu").html(htmlmenu);

        });
    }

    //Para cuando se ha concretado la seleccion del pedido
    $("#btnFinalizar").click(function () {

        console.log(arrayProductos);

        if (arrayProductos.length != 0) {

            //Proceso de confirmacion del pedido
            $("#ModalConfirmacion").modal("show");

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



        } else {

            $.notify('No existe productos seleccionados. \n Seleccionelos y vuelva a intentarlo', "error");
            $(".contenidoModalConfirmacion").html("");
            $(".btnEnviaPedido").hide();
        }
    });

    //Pedido confirmado
    $(".btnEnviaPedido").click(function () {
        console.log(arrayProductos);

        $.ajax({
            // Verificacion de los datos introducidos
            url: 'assets/hacerpedido/registraPedido.php',
            type: 'POST',
            data: {
                productos: arrayProductos,
            },
            success: function (respuesta) {
                console.log(respuesta);
                if (respuesta == "true") {
                    $("#ModalConfirmacion").modal("hide");
                    window.location.replace("index.php?panel=index.php");
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

    });

    //PARA CUANDO EL CLIENTE ENVIA LA PIZZA AL PEDIDO
    $(".btnEnviaSeleccion").click(function () {

        var valorChecked = $(".radioPizzas input[type=radio]:checked").val();

        $.notify('Se agregó "' + nombre + " " + nombreSubmenu + '" al pedido ', "success");
        $("#ModalSeleccionPizza").modal("hide");
        $.when($("#ModalSeleccionaIngredientes,#ModalSeleccionPizza").slideUp("slow")).then(function () {
            $("#menuwizard").slideDown("slow");
        });


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

                    htmlResumenPedido += "<div class=\"list-group-controls\" style='padding-bottom: 15px;'>" +
                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                            "</div>" +
                            "</div> ";
                    $("#resumen_pedido").append(htmlResumenPedido);
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
                        "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                        "</div>" +
                        "</div> ";
                $("#resumen_pedido").append(htmlResumenPedido);



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

                var htmlIngredientes = "";

                $.when(
                        $(pizzaTemporal.ingredientes).each(function (index, value) {
                    htmlIngredientes += "<td style='border: 1px solid;padding: 6px;'>" + value.nombreIngrediente + "</td>";
                })
                        ).then(function () {
                    htmlResumenPedido += "<div style='text-align:-webkit-right;'><table><tr>" +
                            "<td style='padding: 6px;'>" + "Pizza combinada 1/2 :" + "</td>" +
                            "<td style='border: 1px solid;padding: 6px;'>" + pizzaTemporal.nombreMedio + "</td>" +
                            "</tr></table></div>" +
                            "<div style='text-align:-webkit-right;'><table>" +
                            "<tr>" +
                            "<td style='padding: 6px;'>" + "Ingredientes Personalizados :" + "</td>" +
                            htmlIngredientes +
                            "</tr>" +
                            "</table>" +
                            "</div>";
                    if (pizzaTemporal.ingredientesMedio.length != 0) {
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
                                    "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                    "</div>" +
                                    "</div> ";

                            $("#resumen_pedido").append(htmlResumenPedido);
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
                                    "</div>";
                        }
                        htmlResumenPedido +=
                                "<br>" +
                                "<div class=\"list-group-controls\">" +
                                "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                "</div>" +
                                "</div> ";
                        $("#resumen_pedido").append(htmlResumenPedido);

                    }


                });

            } else {
                if (pizzaTemporal.ingredientesMedio.length != 0) {
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
                                "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                "</div>" +
                                "</div> ";

                        $("#resumen_pedido").append(htmlResumenPedido);
                    });

                } else {

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
                            "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                            "</div>" +
                            "</div> ";
                    $("#resumen_pedido").append(htmlResumenPedido);

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
                                    "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                    "</div>" +
                                    "</div> ";

                            $("#resumen_pedido").append(htmlResumenPedido);
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
                                "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                "</div>" +
                                "</div> ";
                        $("#resumen_pedido").append(htmlResumenPedido);

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
                                "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                "</div>" +
                                "</div> ";

                        $("#resumen_pedido").append(htmlResumenPedido);
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
                            "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                            "</div>" +
                            "</div> ";
                    $("#resumen_pedido").append(htmlResumenPedido);

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

                                            htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                                    "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                                    "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                                    "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                                    "</div>" +
                                                    "</div> ";

                                            $("#resumen_pedido").append(htmlResumenPedido);
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

                                        htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                                "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                                "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                                "</div>" +
                                                "</div> ";
                                        $("#resumen_pedido").append(htmlResumenPedido);

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

                                htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                        "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                        "</div>" +
                                        "</div> ";
                                $("#resumen_pedido").append(htmlResumenPedido);

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

                                        htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                                "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                                "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                                "</div>" +
                                                "</div> ";

                                        $("#resumen_pedido").append(htmlResumenPedido);
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

                                    "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                            "</div>" +
                                            "</div> ";
                                    $("#resumen_pedido").append(htmlResumenPedido);

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

                                    htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                            "</div>" +
                                            "</div> ";

                                    $("#resumen_pedido").append(htmlResumenPedido);
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
                                htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                        "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                        "</div>" +
                                        "</div> ";
                                $("#resumen_pedido").append(htmlResumenPedido);
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

                                        htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                                "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                                "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                                "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                                "</div>" +
                                                "</div> ";

                                        $("#resumen_pedido").append(htmlResumenPedido);
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

                                    htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                            "</div>" +
                                            "</div> ";
                                    $("#resumen_pedido").append(htmlResumenPedido);

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

                            htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                    "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                    "</div>" +
                                    "</div> ";
                            $("#resumen_pedido").append(htmlResumenPedido);
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

                                    htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                            "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                            "</div>" +
                                            "</div> ";

                                    $("#resumen_pedido").append(htmlResumenPedido);
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

                                htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                        "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                        "</div>" +
                                        "</div> ";
                                $("#resumen_pedido").append(htmlResumenPedido);
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

                                htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                        "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                        "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                        "</div>" +
                                        "</div> ";

                                $("#resumen_pedido").append(htmlResumenPedido);
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

                            htmlResumenPedido += "<div class=\"list-group-controls\" style='padding: 10px 0px;'>" +
                                    "<button class=\"btn btn-info\"><b>" + $(".input-number").val() + "</b> producto(s) solicitado(s)</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
                                    "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
                                    "</div>" +
                                    "</div> ";
                            $("#resumen_pedido").append(htmlResumenPedido);
                        }
                    }
                }
            }

            $(".observacionProducto").val("");
        }
    });

});

$(document).on("click", ".tab-pane .btn-submenu", function (event) {

    nombreSubmenu = $(this).find("#nombreSubmenu").html();
    idSubmenu = $(this).find(".idsubmenu").html();
    nombreMenu = $(this).find(".nombremenu").html();
    idMenu = $(this).find(".idmenu").html();

    var nombreMenu = $(this).find(".nombremenu").html();

    $(".tituloSeleccionaProducto").html("<center>" + nombreSubmenu + "</center>");

    if (nombreMenu == "Pizzas") {

        $(".tituloSeleccionPizza").html("<center>Pizza " + nombreSubmenu + "</center>");
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

//        $("#ModalSeleccionPizza").modal("show");
        $.when($("#menuwizard").slideUp("slow")).then(function () {
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
                            '<button class="tile tile-primary btn-menu"><h4 id="nombreProducto" style="color:white;">' +
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
        $("#ModalSeleccionaProducto").modal("show");
    }
});

var arrayProductos = [], descripcionPedido = [];
var nombre, id, precio, idsubmenu, nombreSubmenu, detalle, nombreMenu, idMenu;
$(document).on("click", ".btn-menu", function (event) {
    nombre = $(this).find("#nombreProducto").html();
    precio = $(this).find(".precioproducto").html();
    id = $(this).find(".idproducto").html();
    idsubmenu = $(this).find(".idsubmenu").html();
    nombreSubmenu = $(this).find(".nombresubmenu").html();
    idmenu = $(this).find(".idmenu").html();
    nombreMenu = $(this).find(".nombremenu").html();



    if (nombreMenu == "Ensaladas y Bocaditos" || nombreMenu == "Pastas" || nombreMenu == "Carnes" || nombreMenu == "Crepes y Postres") {
        $(".tituloSeleccionaIngredientes").html("Seleccione los ingredientes de " + nombre);
        asignaIngredientes(nombreMenu);
        $(".modal").modal("hide");
        $.when($("#menuwizard").slideUp("slow")).then(function () {
            $("#ModalSeleccionaIngredientes").slideDown("slow");
        });

    } else {
        //aqui es la seccion de bebidas

        $(".tituloModalPreferencias").html('<i class="fa fa-bars" aria-hidden="true"></i> Preferencias de ' + nombre);

        $(".contentModalPreferencias").html(
                '<div class="row">' +
                '<div class="col-md-12">' +
                '<div class="col-md-5">' +
                '<h4 style="color: #b64645;padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
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
                '<h4 style="color: #b64645;">Observación del pedido :</h4>' +
                '<textarea class="form-control observacionProducto" rows="3" id="comment" style="resize: none;border-color: #b64645;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
                );
        funcionalidadCantidad();
        $("#ModalPreferencias").modal("show");
    }
});

$(document).on("click", ".closeingredientes", function (event) {
    $.when($("#ModalSeleccionaIngredientes").slideUp("slow")).then(function () {
        $("#menuwizard").slideDown("slow");
    });
});

$(document).on("click", ".closepizzas", function (event) {
    $.when($("#ModalSeleccionPizza").slideUp("slow")).then(function () {
        $("#menuwizard").slideDown("slow");
    });
});
//este modal es exclusivamente para bebidas

$(".btnguardapropiedades").click(function () {
    enviaProducto([], "");
    $("#ModalSeleccionaProducto").modal("hide");
    $("#ModalPreferencias").modal("hide");
});

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
                                    "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                                    "Ingredientes" +
                                    "<div class='col-md-12 rightIngrediente' style='height:250px; overflow: auto ;border: 1px solid; border-radius: 6px; border-color: #b64645;padding: 15px;'>" +
                                    htmlselectIngredientesE +
                                    '</div>' +
                                    '</div>' +
                                    "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                                    "Ingredientes Extras" +
                                    "<div class='col-md-12 leftIngrediente' style='height:250px; overflow: auto ;border: 1px solid; border-radius: 6px; border-color: #b64645;padding: 15px;'>" +
                                    htmlselectIngredientesG +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'
                                    );

                            $(".contenidoSeleccionaIngredientes").append(
                                    '<div class="col-md-12">' +
                                    '<br><br>' +
                                    '<div class="col-md-5">' +
                                    '<h4 style="color: #b64645;padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
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
                                    '<h4 style="color: #b64645;">Observación del producto :</h4>' +
                                    '<textarea class="form-control observacionProducto" rows="3" id="comment" style="resize: none;border-color: #b64645;" placeholder="Ingrese aquí la observación del producto actual."></textarea>' +
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
                                ignoreInputTextSelection: true     // allows users to select input text, see details below
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


$(".btnEnviaProducto").click(function () {

    var Ingredientes = [];
    var ingtablehtml = "<center><table><tr><td style='padding: 6px;'>Ingredientes</td>";
    $.when(
            $(".rightIngrediente .contenedorIngrediente").each(function (index) {
        Ingredientes.push({idIngrediente: $(this).find(".idingrediente").html(), nombreIngrediente: $(this).find(".nombreingrediente").html()});
        ingtablehtml += "<td style='border: 1px solid;padding: 6px;'>" + $(this).find(".nombreingrediente").html() + "</td>";
    })
            ).then(function () {
        ingtablehtml += "</tr></table></center>";
        enviaProducto(Ingredientes, ingtablehtml);
    });

});


function enviaProducto(listaIngredientes, htmlIngredientes) {

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

        if ($("#ModalPreferencias .observacionProducto").val() != "") {
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
            "<button class=\"btn btn-info\">$" + (precio * $(".input-number").val()).toFixed(2) + "</button>&nbsp;&nbsp;" +
            "<button class=\"btn btn-primary eliminar_item\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i><div class='idproducto' style='display: none;'>" + id + "</div></button>" +
            "</div>" +
            "</div> ";

    $("#resumen_pedido").append(htmlPedido);
    $.notify('Se agregó "' + nombre + '" al pedido ', "success");
    $.when($("#ModalSeleccionaIngredientes").slideUp("slow")).then(function () {
        $("#menuwizard").slideDown("slow");
    });
    $("#ModalSeleccionaIngredientes").modal("hide");
}

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

        $(".tituloSeleccionPizza").html("<center>Pizza " + nombreSubmenu + " - " + nombre + "</center>");
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
        $(".tituloSeleccionPizza").html("<center>Pizza " + nombreSubmenu + "</center>");
    }
})

var pizzaTemporal = {};

$(document).on('change', '.radioPizzas input[type=radio]', function () {
    console.log(nombre);
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
        $(".tituloSeleccionPizza").html("<center>Pizza " + nombreSubmenu + " - " + nombre + "</center>");
        $(".contentIngredientes").html("");
        $(".contentIngredientes").hide();
        $("#contentSeleccion").html("");
    }
    if ($(this).val() == "entera") {

        $(".tituloSeleccionPizza").html("<center>Pizza " + nombreSubmenu + " - " + nombre + " Entera</center>");

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
                            "<div class='row row-space' style='border: 1px solid; border-radius: 6px; border-color: #b64645;'>" +
                            "<div class='col-md-12'>" +
                            "<br>" + "<br>" +
                            "<div class='col-md-12'>" +
                            "<center><img src='img/pizzas/p_entera.png' alt='pizza entera' class='img-responsive imgEntera'>" + "</center>" +
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
                            '<div class="col-md-12">' +
                            '<br><br>' +
                            '<div class="col-md-5">' +
                            '<h4 style="color: #b64645;padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
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
                            '<h4 style="color: #b64645;">Observación del producto :</h4>' +
                            '<textarea class="form-control observacionProducto" rows="3" id="comment" style="resize: none;border-color: #b64645;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
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
        $(".tituloSeleccionPizza").html("<center>Pizza " + nombreSubmenu + " - " + nombre + " Combinada 1/2</center>");
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
                            "<div class='row row-space' style='border: 1px solid; border-radius: 6px; border-color: #b64645;'>" +
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
                            "<center><img src='img/pizzas/p_medio1.png' alt='pizza media' class='img-responsive imgMedio1'></center>" +
                            "</div>" +
                            "<div class='col-md-12'>" +
                            "<center><img src='img/pizzas/p_medio2.png' alt='pizza media' class='img-responsive imgMedio2'></center>" +
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
                            '<div class="col-md-12">' +
                            '<br><br>' +
                            '<div class="col-md-5">' +
                            '<h4 style="color: #b64645;padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
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
                            '<h4 style="color: #b64645;">Observación del producto :</h4>' +
                            '<textarea class="form-control observacionProducto" rows="3" id="comment" style="resize: none;border-color: #b64645;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
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
        $(".tituloSeleccionPizza").html("<center>Pizza " + nombreSubmenu + " - " + nombre + " Combinada 1/4</center>");
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
                            "<div class='row row-space' style='border: 1px solid; border-radius: 6px; border-color: #b64645;'>" +
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
                            "<center><img src='img/pizzas/p_cuarto1.png' alt='pizza media' class='img-responsive imgCuarto1'></center>" +
                            "</div>" +
                            "<div class='col-md-12' style='padding-top: 33px;padding-right: 15px;'>" +
                            "<center><img src='img/pizzas/p_cuarto2.png' alt='pizza media' class='img-responsive imgCuarto2'></center>" +
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
                            '<div class="col-md-12">' +
                            '<br><br>' +
                            '<div class="col-md-5">' +
                            '<h4 style="color: #b64645;padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
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
                            '<h4 style="color: #b64645;">Observación del producto :</h4>' +
                            '<textarea class="form-control observacionProducto" rows="3" id="comment" style="resize: none;border-color: #b64645;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
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
        $(".tituloSeleccionPizza").html("<center>Pizza " + nombreSubmenu + " - " + nombre + " Personalizada</center>");
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
                            "<div class='row row-space' style='border: 1px solid; border-radius: 6px; border-color: #b64645;'>" +
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
                            "<img src='img/pizzas/p_personalizado1.png' alt='pizza media' class='img-responsive imgPersonalizado1'>" +
                            "</div>" +
                            "<img src='img/pizzas/fondopersonalizado.png' class='img-responsive'>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6' style='padding-bottom: 10px;'>" +
                            "<div class='col-md-12' style='position: absolute;top:4px;right: 8px;'>" +
                            "<img src='img/pizzas/p_personalizado2.png' alt='pizza media' class='img-responsive imgPersonalizado2'>" +
                            "</div>" +
                            "<img src='img/pizzas/fondopersonalizado.png' class='img-responsive'>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12' style='position: absolute;bottom:4px;left: 8px;'>" +
                            "<img src='img/pizzas/p_personalizado3.png' alt='pizza media' class='img-responsive imgPersonalizado3'>" +
                            "</div>" +
                            "<img src='img/pizzas/fondopersonalizado.png' class='img-responsive'>" +
                            "</div>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<div class='col-md-12' style='position: absolute;bottom:4px;right: 8px;'>" +
                            "<img src='img/pizzas/p_personalizado4.png' alt='pizza media' class='img-responsive imgPersonalizado4'>" +
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
                            '<div class="col-md-12">' +
                            '<br><br>' +
                            '<div class="col-md-5">' +
                            '<h4 style="color: #b64645;padding-top: 12px;" class="tituloCantidad">Cantidad producto :</h4>' +
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
                            '<h4 style="color: #b64645;">Observación del producto :</h4>' +
                            '<textarea class="form-control observacionProducto" rows="3" id="comment" style="resize: none;border-color: #b64645;" placeholder="Ingrese aquí la observación del pedido actual."></textarea>' +
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
});

$(document).on('click', '.imgEntera', function () {
    if ($(".inp_entera").is(":checked")) {
        //Regreso a la normalidad
        $(".contentIngredientes").html("");
        $(".contentIngredientes").hide();
        $('.imgEntera').attr('src', 'img/pizzas/p_entera.png');
        $(".inp_entera").prop('checked', false);
        $(".inp_entera").parent().removeClass("active");
    } else {
        //Asigna ingredientes Pizza
        $('.imgEntera').attr('src', 'img/pizzas/p_entera_s.png');
        $(".inp_entera").prop('checked', true);
        $(".inp_entera").parent().addClass("active");
        asignaIngredientesPizza($("#lblEntera").html(), "Entera");
    }
});

$(document).on('change', '.inp_entera', function () {
    if ($(".inp_entera").is(":checked")) {
        $('.imgEntera').attr('src', 'img/pizzas/p_entera_s.png');
        asignaIngredientesPizza($("#lblEntera").html());
    } else {
        $('.imgEntera').attr('src', 'img/pizzas/p_entera.png');
        $(".contentIngredientes").html("");
        $(".contentIngredientes").hide();
    }
});

$(document).on('click', '.imgMedio1', function () {
    deschekaMedio2();
    if ($(".inp_medio1").is(":checked")) {

        deschekaMedio1();

    } else {
        asignaIngredientesPizza($("#lblMitad1").html(), "Medio2");
        $('.imgMedio1').attr('src', 'img/pizzas/p_medio1_s.png');
        $(".inp_medio1").prop('checked', true);
        $(".inp_medio1").parent().addClass("active");
    }
});

$(document).on('change', '.inp_medio1', function () {
    deschekaMedio2();
    if ($(".inp_medio1").is(":checked")) {
        $('.imgMedio1').attr('src', 'img/pizzas/p_medio1_s.png');
        asignaIngredientesPizza($("#lblMitad1").html(), "Medio2");
    } else {
        $('.imgMedio1').attr('src', 'img/pizzas/p_medio1.png');
    }
});

function deschekaMedio1() {
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
    $('.imgMedio1').attr('src', 'img/pizzas/p_medio1.png');
    $(".inp_medio1").prop('checked', false);
    $(".inp_medio1").parent().removeClass("active");
}

function deschekaMedio2() {
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
    $('.imgMedio2').attr('src', 'img/pizzas/p_medio2.png');
    $(".inp_medio2").prop('checked', false);
    $(".inp_medio2").parent().removeClass("active");
}

$(document).on('change', '.inp_medio2', function () {
    deschekaMedio1();
    if ($(".inp_medio2").is(":checked")) {
        $('.imgMedio2').attr('src', 'img/pizzas/p_medio2_s.png');
        asignaIngredientesPizza($("#lblMitad2").html(), "Medio1");
    } else {
        $('.imgMedio2').attr('src', 'img/pizzas/p_medio2.png');
    }
});


$(document).on('click', '.imgMedio2', function () {
    deschekaMedio1();
    if ($(".inp_medio2").is(":checked")) {
        deschekaMedio2();
    } else {
        asignaIngredientesPizza($("#lblMitad2").html(), "Medio1");
        $('.imgMedio2').attr('src', 'img/pizzas/p_medio2_s.png');
        $(".inp_medio2").prop('checked', true);
        $(".inp_medio2").parent().addClass("active");

    }
});

//PARA PIZZA 1/4
$(document).on('click', '.imgCuarto1', function () {
    deschekaCuarto2();
    if ($(".inp_cuarto1").is(":checked")) {
        deschekaCuarto1();
    } else {
        asignaIngredientesPizza($("#lblCuarto1").html(), "Cuarto2");
        $('.imgCuarto1').attr('src', 'img/pizzas/p_cuarto1_s.png');
        $(".inp_cuarto1").prop('checked', true);
        $(".inp_cuarto1").parent().addClass("active");
    }
});

$(document).on('change', '.inp_cuarto1', function () {
    deschekaCuarto2();
    if ($(".inp_cuarto1").is(":checked")) {
        asignaIngredientesPizza($("#lblCuarto1").html(), "Cuarto2");
        $('.imgCuarto1').attr('src', 'img/pizzas/p_cuarto1_s.png');
    } else {
        $('.imgCuarto1').attr('src', 'img/pizzas/p_cuarto1.png');
    }
});

function deschekaCuarto1() {
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
    $('.imgCuarto1').attr('src', 'img/pizzas/p_cuarto1.png');
    $(".inp_cuarto1").prop('checked', false);
    $(".inp_cuarto1").parent().removeClass("active");
}

function deschekaCuarto2() {
    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();
    $('.imgCuarto2').attr('src', 'img/pizzas/p_cuarto2.png');
    $(".inp_cuarto2").prop('checked', false);
    $(".inp_cuarto2").parent().removeClass("active");
}


$(document).on('change', '.inp_cuarto2', function () {
    deschekaCuarto1();
    if ($(".inp_cuarto2").is(":checked")) {
        asignaIngredientesPizza($("#lblCuarto2").html(), "Cuarto1");
        $('.imgCuarto2').attr('src', 'img/pizzas/p_cuarto2_s.png');
    } else {
        $('.imgCuarto2').attr('src', 'img/pizzas/p_cuarto2.png');
    }
});


$(document).on('click', '.imgCuarto2', function () {
    deschekaCuarto1();
    if ($(".inp_cuarto2").is(":checked")) {
        deschekaCuarto2();
    } else {
        asignaIngredientesPizza($("#lblCuarto2").html(), "Cuarto1");
        $('.imgCuarto2').attr('src', 'img/pizzas/p_cuarto2_s.png');
        $(".inp_cuarto2").prop('checked', true);
        $(".inp_cuarto2").parent().addClass("active");

    }
});

//PARA PIZZA PERSONALIZADA
//
$(document).on('click', '.imgPersonalizado1', function () {
    deschekaPersonalizados(1);
    if ($(".inp_personalizado1").is(":checked")) {
        $('.imgPersonalizado1').attr('src', 'img/pizzas/p_personalizado1.png');
        $(".inp_personalizado1").prop('checked', false);
        $(".inp_personalizado1").parent().removeClass("active");
    } else {
        asignaIngredientesPizza($("#lblPersonalizado1").html(), "Personalizado1");
        $('.imgPersonalizado1').attr('src', 'img/pizzas/p_personalizado1_s.png');
        $(".inp_personalizado1").prop('checked', true);
        $(".inp_personalizado1").parent().addClass("active");
    }
});

$(document).on('click', '.imgPersonalizado2', function () {
    deschekaPersonalizados(2);
    if ($(".inp_personalizado2").is(":checked")) {
        $('.imgPersonalizado2').attr('src', 'img/pizzas/p_personalizado2.png');
        $(".inp_personalizado2").prop('checked', false);
        $(".inp_personalizado2").parent().removeClass("active");
    } else {
        asignaIngredientesPizza($("#lblPersonalizado2").html(), "Personalizado2");
        $('.imgPersonalizado2').attr('src', 'img/pizzas/p_personalizado2_s.png');
        $(".inp_personalizado2").prop('checked', true);
        $(".inp_personalizado2").parent().addClass("active");
    }
});

$(document).on('click', '.imgPersonalizado3', function () {
    deschekaPersonalizados(3);
    if ($(".inp_personalizado3").is(":checked")) {
        $('.imgPersonalizado3').attr('src', 'img/pizzas/p_personalizado3.png');
        $(".inp_personalizado3").prop('checked', false);
        $(".inp_personalizado3").parent().removeClass("active");
    } else {
        asignaIngredientesPizza($("#lblPersonalizado3").html(), "Personalizado3");
        $('.imgPersonalizado3').attr('src', 'img/pizzas/p_personalizado3_s.png');
        $(".inp_personalizado3").prop('checked', true);
        $(".inp_personalizado3").parent().addClass("active");
    }
});

$(document).on('click', '.imgPersonalizado4', function () {
    deschekaPersonalizados(4);

    if ($(".inp_personalizado4").is(":checked")) {
        $('.imgPersonalizado4').attr('src', 'img/pizzas/p_personalizado4.png');
        $(".inp_personalizado4").prop('checked', false);
        $(".inp_personalizado4").parent().removeClass("active");
    } else {
        asignaIngredientesPizza($("#lblPersonalizado4").html(), "Personalizado4");
        $('.imgPersonalizado4').attr('src', 'img/pizzas/p_personalizado4_s.png');
        $(".inp_personalizado4").prop('checked', true);
        $(".inp_personalizado4").parent().addClass("active");
    }
});

function deschekaPersonalizados(numero) {

    $(".contentIngredientes").html("");
    $(".contentIngredientes").hide();

    if (numero == 1) {
        $('.imgPersonalizado2').attr('src', 'img/pizzas/p_personalizado2.png');
        $(".inp_personalizado2").prop('checked', false);
        $(".inp_personalizado2").parent().removeClass("active");

        $('.imgPersonalizado3').attr('src', 'img/pizzas/p_personalizado3.png');
        $(".inp_personalizado3").prop('checked', false);
        $(".inp_personalizado3").parent().removeClass("active");

        $('.imgPersonalizado4').attr('src', 'img/pizzas/p_personalizado4.png');
        $(".inp_personalizado4").prop('checked', false);
        $(".inp_personalizado4").parent().removeClass("active");

    } else
    if (numero == 2) {

        $('.imgPersonalizado1').attr('src', 'img/pizzas/p_personalizado1.png');
        $(".inp_personalizado1").prop('checked', false);
        $(".inp_personalizado1").parent().removeClass("active");

        $('.imgPersonalizado3').attr('src', 'img/pizzas/p_personalizado3.png');
        $(".inp_personalizado3").prop('checked', false);
        $(".inp_personalizado3").parent().removeClass("active");

        $('.imgPersonalizado4').attr('src', 'img/pizzas/p_personalizado4.png');
        $(".inp_personalizado4").prop('checked', false);
        $(".inp_personalizado4").parent().removeClass("active");

    } else
    if (numero == 3) {

        $('.imgPersonalizado2').attr('src', 'img/pizzas/p_personalizado2.png');
        $(".inp_personalizado2").prop('checked', false);
        $(".inp_personalizado2").parent().removeClass("active");

        $('.imgPersonalizado1').attr('src', 'img/pizzas/p_personalizado1.png');
        $(".inp_personalizado1").prop('checked', false);
        $(".inp_personalizado1").parent().removeClass("active");

        $('.imgPersonalizado4').attr('src', 'img/pizzas/p_personalizado4.png');
        $(".inp_personalizado4").prop('checked', false);
        $(".inp_personalizado4").parent().removeClass("active");

    } else
    if (numero == 4) {

        $('.imgPersonalizado2').attr('src', 'img/pizzas/p_personalizado2.png');
        $(".inp_personalizado2").prop('checked', false);
        $(".inp_personalizado2").parent().removeClass("active");

        $('.imgPersonalizado3').attr('src', 'img/pizzas/p_personalizado3.png');
        $(".inp_personalizado3").prop('checked', false);
        $(".inp_personalizado3").parent().removeClass("active");

        $('.imgPersonalizado1').attr('src', 'img/pizzas/p_personalizado1.png');
        $(".inp_personalizado1").prop('checked', false);
        $(".inp_personalizado1").parent().removeClass("active");

    }

}

$(document).on('change', '.inp_personalizado1', function () {
    deschekaPersonalizados(1);
    if ($(".inp_personalizado1").is(":checked")) {
        asignaIngredientesPizza($("#lblPersonalizado1").html(), "Personalizado1");
        $('.imgPersonalizado1').attr('src', 'img/pizzas/p_personalizado1_s.png');
    } else {
        $('.imgPersonalizado1').attr('src', 'img/pizzas/p_personalizado1.png');
    }
});

$(document).on('change', '.inp_personalizado2', function () {
    deschekaPersonalizados(2);
    if ($(".inp_personalizado2").is(":checked")) {
        asignaIngredientesPizza($("#lblPersonalizado2").html(), "Personalizado2");
        $('.imgPersonalizado2').attr('src', 'img/pizzas/p_personalizado2_s.png');
    } else {
        $('.imgPersonalizado2').attr('src', 'img/pizzas/p_personalizado2.png');
    }
});

$(document).on('change', '.inp_personalizado3', function () {
    deschekaPersonalizados(3);
    if ($(".inp_personalizado3").is(":checked")) {
        asignaIngredientesPizza($("#lblPersonalizado3").html(), "Personalizado3");
        $('.imgPersonalizado3').attr('src', 'img/pizzas/p_personalizado3_s.png');
    } else {
        $('.imgPersonalizado3').attr('src', 'img/pizzas/p_personalizado3.png');
    }
});

$(document).on('change', '.inp_personalizado4', function () {
    deschekaPersonalizados(4);
    if ($(".inp_personalizado4").is(":checked")) {
        asignaIngredientesPizza($("#lblPersonalizado4").html(), "Personalizado4");
        $('.imgPersonalizado4').attr('src', 'img/pizzas/p_personalizado4_s.png');
    } else {
        $('.imgPersonalizado4').attr('src', 'img/pizzas/p_personalizado4.png');
    }
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

function asignaIngredientesPizza(nombrePizza, tipoPizza) {

    if ((nombrePizza.localeCompare("Mitad") != 0) && (nombrePizza.localeCompare("Cuarto") != 0) && (nombrePizza.localeCompare("Personalizada 1") != 0) && (nombrePizza.localeCompare("Personalizada 2") != 0) && (nombrePizza.localeCompare("Personalizada 3") != 0) && (nombrePizza.localeCompare("Personalizada 4") != 0)) {

        console.log(tipoPizza);


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
                if (pizzaTemporal.ingredientes.length == 0) {
                    consultaIngPizzaE(nombrePizza, tipoPizza);
                } else {
                    asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientes);
                }
            } else
            if (tipoPizza == "Medio2") {
                if (pizzaTemporal.ingredientesMedio.length == 0) {
                    consultaIngPizzaE(nombrePizza, tipoPizza);
                } else {
                    asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientesMedio);
                }
            }
        } else
        if (pizzaTemporal.tipo == "Combinada 1/4") {

            if (tipoPizza == "Cuarto1") {
                if (pizzaTemporal.ingredientes.length == 0) {
                    consultaIngPizzaE(nombrePizza, tipoPizza);
                } else {
                    asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientes);
                }
            } else
            if (tipoPizza == "Cuarto2") {
                if (pizzaTemporal.ingredientesCuarto.length == 0) {
                    consultaIngPizzaE(nombrePizza, tipoPizza);
                } else {
                    asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientesCuarto);
                }
            }

            console.log(tipoPizza);
            console.log(3);
        } else
        if (pizzaTemporal.tipo == "Personalizada") {

            if (tipoPizza == "Personalizado1") {
                if (pizzaTemporal.ingredientes.length == 0) {
                    consultaIngPizzaE(nombrePizza, tipoPizza);
                } else {
                    asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientes);
                }
            } else
            if (tipoPizza == "Personalizado2") {
                if (pizzaTemporal.ingredientesPizza2.length == 0) {
                    consultaIngPizzaE(nombrePizza, tipoPizza);
                } else {
                    asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientesPizza2);
                }
            } else
            if (tipoPizza == "Personalizado3") {
                if (pizzaTemporal.ingredientesPizza3.length == 0) {
                    consultaIngPizzaE(nombrePizza, tipoPizza);
                } else {
                    asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientesPizza3);
                }
            } else
            if (tipoPizza == "Personalizado4") {
                if (pizzaTemporal.ingredientesPizza4.length == 0) {
                    consultaIngPizzaE(nombrePizza, tipoPizza);
                } else {
                    asignaIngPizzaE(nombrePizza, tipoPizza, pizzaTemporal.ingredientesPizza4);
                }
            }


            console.log(tipoPizza);
            console.log(4);
        }
    }
}

function consultaIngPizzaE(nombrePizza, tipoPizza) {

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
                    pizzaTemporal.ingredientes.push({nombreIngrediente: value.nombreIngrediente, idIngrediente: value.idIngrediente});

                } else
                if (tipoPizza == "Medio2") {

                    pizzaTemporal.ingredientesMedio.push({nombreIngrediente: value.nombreIngrediente, idIngrediente: value.idIngrediente});

                } else
                if (tipoPizza == "Cuarto2") {

                    pizzaTemporal.ingredientesCuarto.push({nombreIngrediente: value.nombreIngrediente, idIngrediente: value.idIngrediente});

                } else
                if (tipoPizza == "Personalizado2") {

                    pizzaTemporal.ingredientesPizza2.push({nombreIngrediente: value.nombreIngrediente, idIngrediente: value.idIngrediente});

                } else
                if (tipoPizza == "Personalizado3") {

                    pizzaTemporal.ingredientesPizza3.push({nombreIngrediente: value.nombreIngrediente, idIngrediente: value.idIngrediente});

                } else
                if (tipoPizza == "Personalizado4") {

                    pizzaTemporal.ingredientesPizza4.push({nombreIngrediente: value.nombreIngrediente, idIngrediente: value.idIngrediente});

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
                                    "<br><center><h4 style='color:white;'>Ingredientes Pizza " + nombrePizza + "</h4></center><br>" +
                                    "<div class='row'>" +
                                    "<div class='col-md-12'>" +
                                    "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                                    "<p style='color:white;text-align:center;'>Ingredientes</p>" +
                                    "<div class='col-md-12 rightIng' style='background: white;height:250px; overflow: auto ;border: 1px solid; border-radius: 6px; border-color: #b64645;padding: 15px;'>" +
                                    htmlselectIngredientesE +
                                    '</div>' +
                                    '</div>' +
                                    "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                                    "<p style='color:white;text-align:center;'>Ingredientes Extras</p>" +
                                    "<div class='col-md-12 leftIng' style='background: white;height:250px; overflow: auto ;border: 1px solid; border-radius: 6px; border-color: #b64645;padding: 15px;'>" +
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
                                ignoreInputTextSelection: true     // allows users to select input text, see details below
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
                                        pizzaTemporal.ingredientes.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                                    })

                                } else
                                if (tipoPizza == "Medio2") {

                                    pizzaTemporal.ingredientesMedio = [];
                                    $(".rightIng .contenedorIngrediente").each(function (index) {
                                        pizzaTemporal.ingredientesMedio.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                                    })

                                } else
                                if (tipoPizza == "Cuarto2") {

                                    pizzaTemporal.ingredientesCuarto = [];
                                    $(".rightIng .contenedorIngrediente").each(function (index) {
                                        pizzaTemporal.ingredientesCuarto.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                                    })

                                } else
                                if (tipoPizza == "Personalizado2") {

                                    pizzaTemporal.ingredientesPizza2 = [];
                                    $(".rightIng .contenedorIngrediente").each(function (index) {
                                        pizzaTemporal.ingredientesPizza2.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                                    })

                                } else
                                if (tipoPizza == "Personalizado3") {

                                    pizzaTemporal.ingredientesPizza3 = [];
                                    $(".rightIng .contenedorIngrediente").each(function (index) {
                                        pizzaTemporal.ingredientesPizza3.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                                    })

                                } else
                                if (tipoPizza == "Personalizado4") {

                                    pizzaTemporal.ingredientesPizza4 = [];
                                    $(".rightIng .contenedorIngrediente").each(function (index) {
                                        pizzaTemporal.ingredientesPizza4.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                                    })

                                }



                            });
                            console.log(pizzaTemporal);

                            $(".contentIngredientes").show();

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
                            "<br><center><h4 style='color:white;'>Ingredientes Pizza " + nombrePizza + "</h4></center><br>" +
                            "<div class='row'>" +
                            "<div class='col-md-12'>" +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<p style='color:white;text-align:center;'>Ingredientes</p>" +
                            "<div class='col-md-12 rightIng' style='background: white;height:250px; overflow: auto ;border: 1px solid; border-radius: 6px; border-color: #b64645;padding: 15px;'>" +
                            htmlselectIngredientesE +
                            '</div>' +
                            '</div>' +
                            "<div class='col-md-6 col-sm-6 col-xs-6'>" +
                            "<p style='color:white;text-align:center;'>Ingredientes Extras</p>" +
                            "<div class='col-md-12 leftIng' style='background: white;height:250px; overflow: auto ;border: 1px solid; border-radius: 6px; border-color: #b64645;padding: 15px;'>" +
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
                        ignoreInputTextSelection: true     // allows users to select input text, see details below
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
                                pizzaTemporal.ingredientes.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                            })

                        } else
                        if (tipoPizza == "Medio2") {

                            pizzaTemporal.ingredientesMedio = [];
                            $(".rightIng .contenedorIngrediente").each(function (index) {
                                pizzaTemporal.ingredientesMedio.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                            })

                        } else
                        if (tipoPizza == "Cuarto2") {

                            pizzaTemporal.ingredientesCuarto = [];
                            $(".rightIng .contenedorIngrediente").each(function (index) {
                                pizzaTemporal.ingredientesCuarto.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                            })

                        } else
                        if (tipoPizza == "Personalizado2") {

                            pizzaTemporal.ingredientesPizza2 = [];
                            $(".rightIng .contenedorIngrediente").each(function (index) {
                                pizzaTemporal.ingredientesPizza2.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                            })

                        } else
                        if (tipoPizza == "Personalizado3") {

                            pizzaTemporal.ingredientesPizza3 = [];
                            $(".rightIng .contenedorIngrediente").each(function (index) {
                                pizzaTemporal.ingredientesPizza3.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                            })

                        } else
                        if (tipoPizza == "Personalizado4") {

                            pizzaTemporal.ingredientesPizza4 = [];
                            $(".rightIng .contenedorIngrediente").each(function (index) {
                                pizzaTemporal.ingredientesPizza4.push({nombreIngrediente: $(this).find(".nombreingrediente").html(), idIngrediente: $(this).find(".idingrediente").html()});
                            })

                        }

                    });

                    console.log(pizzaTemporal);

                    $(".contentIngredientes").show();

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

