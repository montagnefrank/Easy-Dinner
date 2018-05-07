<script>
////////////////////////////////////////////////////////////////////////////////VARIABLES PUBLICAS PARA EL MANEJO DE LA INFORMACION
    var menuObj,
            r1 = random_range(1, 4),
            r2 = random_range(1, 4),
            r3 = random_range(1, 4),
            r4 = random_range(1, 4);

////////////////////////////////////////////////////////////////////////////////EJECUTAR AL CARGAR LA PAGINA
    $(document).ready(function () {
        menuObj = $(".newo_menuContainer").first();
        newo_build_menu(menuObj);  // CONSTRUIMOS EL NUEVO MENU
        console.log(menuObj);
    });

////////////////////////////////////////////////////////////////////////////////DEVUELVE UN NUMERO ALEATORIO DEL RANGO INGRESADO
    function random_range(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

////////////////////////////////////////////////////////////////////////////////CONSTRUIMOS EL MENU, EL ARGUMENTO A PASAR ES EL ELEMENTO CONTENEDOR
    function newo_build_menu(container) {
        var html = '',
                tabs = '',
                formData = new FormData();

        formData.append('buildMenu', 'true');
        $.ajax({
            url: 'assets/carta/control.php',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (json) {
                $.each(JSON.parse(json), function (index, value) {
                    tabs += "<li><a href='#tab-" + value.idMenu + "' role='tab' data-toggle='tab' menuindex='" + value.idMenu + "' class='newo_menuTabs'>" + value.nombreMenu + "</a></li>";
                });
                html += '\n\
                    <div id="menuwizard" class="panel panel-default" >\n\
                        <div class="panel-heading">\n\
                            <h3>Pedido <span class="newo_reqType"></span></h3>\n\
                        </div>\n\
                        <div class="panel-body">\n\
                            <div class="wizard">\n\
                                <ul>\n\
                                    <li>\n\
                                        <a href="#step-1">\n\
                                            <span class="stepNumber">1</span>\n\
                                            <span class="stepDesc">Tomar pedido<br /><small>Elaborar el pedido</small></span>\n\
                                        </a>\n\
                                    </li>\n\
                                    <li>\n\
                                        <a href="#step-2">\n\
                                            <span class="stepNumber">2</span>\n\
                                            <span class="stepDesc">Procesar pedidos<br /><small>Enviar a la cocina</small></span>\n\
                                        </a>\n\
                                    </li>\n\
                                </ul>\n\
                                <div id="step-1" style="padding-top:100px;">\n\
                                    <h4>Seleccione los pedidos del men&uacute;</h4>\n\
                                    <div class="col-md-12">\n\
                                        <div class="panel panel-default tabs">\n\
                                            <ul class="nav nav-tabs newo_tabMenu" role="tablist">\n\
                                                ' + tabs + '\n\
                                            </ul>\n\
                                        </div>\n\
                                        <div class="panel-body tab-content newo_tabContent"> \n\
                                        </div> \n\
                                    </div> \n\
                                </div>\n\
                                <div id="step-2">\n\
                                    <div class="panel panel-default"> \n\
                                        <div class="panel-heading"> \n\
                                            <h3 class="panel-title">Pedido total</h3>  \n\
                                        </div> \n\
                                        <div class="col-md-12"> \n\
                                            <div id="resumen_pedido" class="panel-body list-group list-group-contacts">   \n\
                                            </div> \n\
                                        </div> \n\
                                    </div> \n\
                                </div>    \n\
                            </div> \n\
                        </div> \n\
                    </div> \n\
                        ';
                $(container).append(html); ////////////////////////CONSTRUIMOS EL NUEVO MENU
                $('.newo_menuTabs').each(function (index, singleTab) {
                    newo_build_items(singleTab);
                });
                rewizard();  /////////////////////////ARMAMOS EL WIZZARD CON EL PLUIGIN

                // ** DEBUG EN CONSOLA
                console.log(tabs);
                console.log('EXITO OBTENIENDO MENU');
            },
            error: function (error) {
                console.log(error);
                console.log('ERROR OBTENIENDO MENU');
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////EJECUTAMOS LA FUNCION PARA ARMAR EL WIZZARD
    function rewizard() {
        $(".wizard").smartWizard({
            // This part of code can be removed FROM
            onLeaveStep: function (obj) {
                var wizard = obj.parents(".wizard");

                if (wizard.hasClass("wizard-validation")) {

                    var valid = true;

                    $('input,textarea', $(obj.attr("href"))).each(function (i, v) {
                        valid = validator.element(v) && valid;
                    });

                    if (!valid) {
                        wizard.find(".stepContainer").removeAttr("style");
                        validator.focusInvalid();
                        return false;
                    }

                }

                return true;
            }, // <-- TO

            //This is important part of wizard init
            onShowStep: function (obj) {
                var wizard = obj.parents(".wizard");

                if (wizard.hasClass("show-submit")) {

                    var step_num = obj.attr('rel');
                    var step_max = obj.parents(".anchor").find("li").length;

                    if (step_num == step_max) {
                        obj.parents(".wizard").find(".actionBar .btn-primary").css("display", "block");
                    }
                }
                return true;
            }//End
        });
    }

    ////////////////////////////////////////////////////////////////////////////LLAMAMOS A TODOS LOS PRODUCTOS
    function newo_build_items(tab) {
        var formData = new FormData(),
                menuindex = $(tab).attr('menuindex'),
                tab = '',
                items = '';

        formData.append('buildItems', 'true');
        formData.append('tabIndex', menuindex);
        $.ajax({
            url: 'assets/carta/control.php',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (json) {
                items = '';
                $.each(JSON.parse(json), function (index, v) {
                    items += "<button class='btn btn-primary btn-men btn-menu'>" +
                            "<div><h4 style='color:white;padding-top: 8px;' id='nombreProducto'>" + v.nombreProducto + "</h4>" +
                            "<div class='precioproducto' style='display: none;'>" + v.precioProducto + "</div>" +
                            "<div class='idproducto' style='display: none;'>" + v.idProducto + "</div>" +
                            "<div class='idsubmenu' style='display: none;'>" + v.idSubmenu + "</div>" +
                            "<div class='nombresubmenu' style='display: none;'>" + v.nombreSubmenu + "</div>" +
                            "<div class='idmenu' style='display: none;'>" + v.idMenu + "</div>" +
                            "<div class='nombremenu' style='display: none;'>" + v.nombreMenu + "</div>" +
                            "</button>";
                });
                tab += "<div class='tab-pane' id='tab-" + menuindex + "'>" + items + "</div>";
                $('.newo_tabContent').append(tab); ////////////////////////CONSTRUIMOS EL ELEMENTO DEL MENU
            },
            error: function (error) {
                console.log(error);
                console.log('ERROR OBTENIENDO ITEMS DEL MENU');
            }
        });
    }
</script>