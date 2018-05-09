
<script>
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////********************************************************************************************//////////////////////////////////
///////////////////////////**************** CONTROLADOR DLE MODULO DE CARTA                          ******************//////////////////////////////////
///////////////////////////********************************************************************************************//////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////VARIABLES PUBLICAS PARA EL MANEJO DE LA INFORMACION
    var menuObj,
            r1 = random_range(1, 4),
            r2 = random_range(1, 4),
            r3 = random_range(1, 4),
            r4 = random_range(1, 4);

    ////////////////////////////////////////////////////////////////////////////////EJECUTAR AL TERMINAR DE CARGAR LA PAGINA
    $(document).ready(function () {
        menuObj = $(".newo_menuContainer").first();
        newo_build_menu(menuObj);  // CONSTRUIMOS EL NUEVO MENU

        ////////////////////////////////////////////////////////////////////////MOSTRAMOS EL LISTADO DE INGREDIENTES
        $(document).on("click", ".menuItem_btn", function (event) {
            var item = this;
            newo_build_ing(item);
            $.when(
                    $("#menuwizard").slideUp("slow")
                    ).then(function () {
                $("#newo_ing_panel").slideDown("slow");
            });
        });

        ////////////////////////////////////////////////////////////////////////SI QUEREMOS EDITAR UN PEDIDO CARGADO A LA LISTA 
        $(document).on("click", ".menuList_edit_btn", function (event) {
            var item = $(this).parent().find('.item_metadata_cont').first();
            newo_build_ing(item);
            $.when(
                    $("#menuwizard").slideUp("slow")
                    ).then(function () {
                $("#newo_ing_panel").slideDown("slow");
            });
        });

        ////////////////////////////////////////////////////////////////////////OCULTAMOS TODO Y MOSTRAMOS EL PANEL DEL MENU
        $(document).on("click", ".mostrarCarta", function (event) {
            $.when(
                    $("#newo_ing_panel").slideUp("slow")
                    ).then(function () {
                $("#menuwizard").slideDown("slow");
            });
        });

        ////////////////////////////////////////////////////////////////////////DESPUES DE AGREGAR CANTIDADES E INGREDIENTES, SE AGREGA EL PRODUCTO AL HACER CLIC EN AÑADIR
        $(document).on("click", ".newo_addtolist_btn", function (event) {
            var pedido = $(".newo_ing_container").first();
            newo_addtolist(pedido);
        });
    });

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
            dataType: "json",
            success: function (json) {
                $.each(json, function (index, value) {
                    tabs += "<li><a href='#tab-" + value.idMenu + "' role='tab' data-toggle='tab' menuindex='" + value.idMenu + "' class='newo_menuTabs'>" + value.nombreMenu + "</a></li>";
                });
                html += '<div id="menuwizard" class="panel panel-default" >' +
                        '   <div class="panel-heading">' +
                        '       <h3>Pedido <span class="newo_reqType"></span></h3>' +
                        '   </div>' +
                        '   <div class="panel-body">' +
                        '       <div class="wizard">' +
                        '           <ul>' +
                        '               <li>' +
                        '                   <a href="#step-1">' +
                        '                       <span class="stepNumber">1</span>' +
                        '                       <span class="stepDesc">Tomar pedido<br /><small>Elaborar el pedido</small></span>' +
                        '                   </a>' +
                        '               </li>' +
                        '               <li>' +
                        '                   <a href="#step-2">' +
                        '                       <span class="stepNumber">2</span>' +
                        '                       <span class="stepDesc">Procesar pedidos<br /><small>Enviar a la cocina</small></span>' +
                        '                   </a>' +
                        '               </li>' +
                        '           </ul>' +
                        '           <div id="step-1" style="padding-top:100px;">' +
                        '               <h4>Seleccione los pedidos del men&uacute;</h4>' +
                        '               <div class="col-md-12">' +
                        '                   <div class="panel panel-default tabs">' +
                        '                       <ul class="nav nav-tabs newo_tabMenu" role="tablist">' +
                        tabs +
                        '                       </ul>' +
                        '                   </div>' +
                        '                   <div class="panel-body tab-content newo_tabContent">' +
                        '                   </div>' +
                        '               </div>' +
                        '           </div>' +
                        '           <div id="step-2">' +
                        '               <div class="panel panel-default pushtop_32">' +
                        '                   <div class="panel-heading">' +
                        '                       <h3 class="panel-title">Pedido total</h3>' +
                        '                   </div>' +
                        '                   <div class="col-md-12">' +
                        '                       <div id="resumen_pedido" class="panel-body list-group list-group-contacts">' +
                        '                       </div>' +
                        '                   </div>' +
                        '               </div>' +
                        '           </div>' +
                        '       </div>' +
                        '   </div>' +
                        '</div>' +
                        '<div id="newo_ing_panel" class="displaynone" >' +
                        '   <div class="panel panel-default">' +
                        '       <div class="panel-heading">' +
                        '           <h4> Seleccione los Ingredientes para <b><span class="newo_ingPanel_product"></span></b></h4>' +
                        '       </div>' +
                        '       <div class="panel-body">' +
                        '           <div class="row">' +
                        '               <div class="col-md-12 newo_ing_container">' +
                        '               </div>' +
                        '           </div>' +
                        '       </div>' +
                        '       <div class="panel-footer">' +
                        '           <button type="button" class="btn btn-primary newo_addtolist_btn pull-right" style="border: 1px solid;"><i class="fa fa-plus-circle" aria-hidden="true"></i> Añadir al pedido</button>' +
                        '           <button type="button" class="btn btn-default pull-right mostrarCarta" ><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>' +
                        '       </div>' +
                        '   </div>' +
                        '</div>';
                $(container).append(html); ////////////////////////CONSTRUIMOS EL NUEVO MENU
                $('.newo_menuTabs').each(function (index, singleTab) {
                    newo_build_items(singleTab);  //////////////////////////////DESPUES DE CREAR EL WIZARD DEL MENU, RELLENAMOS CON LOS ITEMS DEL MENU
                });
                rewizard();  /////////////////////////ARMAMOS EL WIZZARD CON EL PLUIGIN
            },
            error: function (error) {
                console.log(error);
                console.log('ERROR OBTENIENDO MENU');
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////LLAMAMOS A TODOS LOS PRODUCTOS Y LOS CONSTRUIMOS DENTRO DEL MENU
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
            dataType: "json",
            success: function (json) {
                items = '';
                $.each(json, function (index, v) {
                    if (v.idMenu == '4') {///////////////////////////////////////////////////CUANDO ES PIZZA MUESTRA UN MENU DISTINTO ANTES DE LOS INGREDINETES
                        items += "<button class='btn btn-primary btn-men pizzaItem_btn'>";
                    } else {
                        items += "<button class='btn btn-primary btn-men menuItem_btn'>";
                    }
                    items += "<div><h4 style='color:white;padding-top: 8px;' id='nombreProducto'>" + v.nombreSubmenu + ": " + v.nombreProducto + "</h4>" +
                            "<div class='precioproducto hidethis' >" + v.precioProducto + "</div>" +
                            "<div class='idproducto hidethis' >" + v.idProducto + "</div>" +
                            "<div class='idsubmenu hidethis' >" + v.idSubmenu + "</div>" +
                            "<div class='nombresubmenu hidethis'  >" + v.nombreSubmenu + "</div>" +
                            "<div class='idmenu hidethis'  >" + v.idMenu + "</div>" +
                            "<div class='nombremenu hidethis'  >" + v.nombreMenu + "</div>" +
                            "</button>";
                });
                tab += "<div class='tab-pane' id='tab-" + menuindex + "'>" + items + "</div>";
                $('.newo_tabContent').append(tab); ////////////////////////CONSTRUIMOS EL CONTENIDO DEL TAB ACTUAL DEL MENU
            },
            error: function (error) {
                console.log(error);
                console.log('ERROR OBTENIENDO ITEMS DEL MENU');
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////CONSTRUIMOS EL SELECTOR PARA AGREGAR Y QUITAR INGREDIENTES
    function newo_build_ing(menuObj) {
        var itemId = $(menuObj).find('.idproducto').html(),
                menuId = $(menuObj).find('.idmenu').html(),
                itemName = $(menuObj).find('#nombreProducto').html(),
                formData = new FormData(),
                HTMLIngredientes = '',
                receta = '',
                adicionales = '';
        formData.append('buildIngredients', 'true');
        formData.append('idProducto', itemId);
        formData.append('idMenu', menuId);
        $.ajax({
            url: 'assets/carta/control.php',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (json) {
                $(json.receta).each(function (index, value) {/////////////////////////////////////////////GUARDAMOS LOS INGREDIENTES DE LA RECETA PARA LUEGO INSERTARLOS EN PANTALLA
                    receta += '<div class="col-md-12 contenedorIngrediente" style="padding:5px;">' +
                            '<div class="col-md-12 btn-primary" style="text-align: center;font-size: 12px;padding: 5px;word-wrap: break-word;color: white;border: 0.5px solid;border-radius: 4px;">' +
                            value.nombreIngrediente +
                            "<div class='nombreingrediente' style='display: none;'>" + value.nombreIngrediente + "</div>" +
                            "<div class='idingrediente' style='display: none;'>" + value.idIngrediente + "</div>" +
                            '</div>' +
                            '</div>';
                });
                $(json.extras).each(function (index, value) {/////////////////////////////////////////////GUARDAMOS LOS INGREDIENTES ADICIONALES PARA LUEGO INSERTARLOS EN PANTALLA
                    adicionales += '<div class="col-md-12 contenedorIngrediente" style="padding:5px;">' +
                            '<div class="col-md-12 btn-primary" style="text-align: center;font-size: 12px;padding: 5px;word-wrap: break-word;color: white;border: 0.5px solid;border-radius: 4px;">' +
                            value.nombreIngrediente +
                            "<div class='nombreingrediente' style='display: none;'>" + value.nombreIngrediente + "</div>" +
                            "<div class='idingrediente' style='display: none;'>" + value.idIngrediente + "</div>" +
                            '</div>' +
                            '</div>';
                });

                HTMLIngredientes += " " + ////////////////////////////////////////////////////////// CONSTRUIMOS EL CONTENIDO DE LA VENTANA DE INGREDINETES
                        "   <div class='row'>" +
                        "       <div class='col-md-12'>" +
                        "           <div class='col-md-6 col-sm-6 col-xs-6 txt-primary'> Receta" +
                        "               <div class='col-md-12 rightIngrediente border-primary' style='height:250px; overflow: auto ;border: 1px solid; border-radius: 6px; padding: 15px;'>" +
                        receta +
                        '               </div>' +
                        '           </div>' +
                        "           <div class='col-md-6 col-sm-6 col-xs-6 txt-primary'> Ingredientes Adicionales" +
                        "               <div class='col-md-12 leftIngrediente border-primary' style='height:250px; overflow: auto ;border: 1px solid; border-radius: 6px; padding: 15px;'>" +
                        adicionales +
                        '               </div>' +
                        '           </div>' +
                        '       </div>' +
                        '       <div class="col-md-12">' + //////////////////////////////////////////AGREGAR CANTIDADES Y COMENTARIOS
                        '           <br><br>' +
                        '           <div class="col-md-5">' +
                        '               <h4 style="padding-top: 12px;" class="tituloCantidad txt-primary">Cantidad producto :</h4>' +
                        '           </div>' +
                        '           <div class="col-md-7">' +
                        '               <div class="col-md-9 col-md-offset-3">' +
                        '                   <div class="form-group">' +
                        '                       <div class="center">' +
                        '                           <p></p>' +
                        '                           <div class="input-group">' +
                        '                               <span class="input-group-btn">' +
                        '                                   <button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">' +
                        '                                       <span class="glyphicon glyphicon-minus"></span>' +
                        '                                   </button>' +
                        '                               </span>' +
                        '                               <input type="number" name="quant[1]" class="form-control input-number" value="1" min="1" max="100" style="color:black;font-weight: bold;text-align:center;" disabled>' +
                        '                               <span class="input-group-btn">' +
                        '                                   <button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">' +
                        '                                       <span class="glyphicon glyphicon-plus"></span>' +
                        '                                   </button>' +
                        '                               </span>' +
                        '                           </div>' +
                        '                       </div>' +
                        '                   </div>' +
                        '                   <br>' +
                        '               </div>' +
                        '           </div>' +
                        '           <div class="col-md-12">' +
                        '               <div class="form-group">' +
                        '                   <h4 class="txt-primary">Observacion del producto :</h4>' +
                        '                   <textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aqu&iacute; la observacion para este pedido."></textarea>' +
                        '               </div>' +
                        '           </div>' +
                        '           <div class="col-md-12 hidethis parsed_menuItem_html">' +
                        $(menuObj).html() +
                        '           </div>' +
                        '       </div>' +
                        '   </div>';
                $(".newo_ing_container").html(HTMLIngredientes);
                $(".newo_ingPanel_product").html(itemName);

                ////////////////////////////////////////////////////////////////CONSTRUIMOS EL SELECTOR DE INGREDIENTES  DE ARRASTRAR Y SOLTAR
                dragula([document.querySelector('.leftIngrediente'), document.querySelector('.rightIngrediente')], {
                    isContainer: function (el) {
                        return false;
                    },
                    moves: function (el, source, handle, sibling) {
                        return true;
                    },
                    accepts: function (el, target, source, sibling) {
                        return true;
                    },
                    invalid: function (el, handle) {
                        return false;
                    },
                    direction: 'vertical',
                    copy: true,
                    copySortSource: false,
                    revertOnSpill: false,
                    removeOnSpill: false,
                    mirrorContainer: document.body,
                    ignoreInputTextSelection: true
                });
                dragula([document.querySelector('.rightIngrediente')], {
                    removeOnSpill: true,
                    accepts: function (el, target, source, sibling) {
                        return false;
                    }
                });

                editCantidades(); //////////////////////////////////////////////CORREMOS LA FUNCION DE ADMINISTRAR LAS CANTIDADES
            },
            error: function (error) {
                console.log(error);
                console.log('ERROR OBTENIENDO ITEMS DEL MENU');
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////AGREGAMOS EL PEDIDO AL LISTADO PARA ENVIAR
    function newo_addtolist(pedidoObj) {
        var ingredientes = '',
                pedido = '',
                comentarios = '';

        if ($(".rightIngrediente .contenedorIngrediente").length > 0) {
            ingredientes += '<div class="form-group"><label class="col-md-4 col-xs-5 control-label">Ingredientes </label><div class="col-md-8 col-xs-7 line-height-30"><ul class="list-tags">';
            $(".rightIngrediente .contenedorIngrediente").each(function (index) { //////////////////////////////ITERAMOS LOS INGREDIENTES SELECCIONADOS Y LOS GUARDAMOS EN UNA VARIABLE
                ingredientes += '<li><a class=" pedido_sigle_ing" href="#" idingrdiente="' +
                        $(this).find(".idingrediente").html() + '"><span class="fa fa-plus"></span> ' +
                        $(this).find(".nombreingrediente").html() + '</a></li>'
            });
            ingredientes += '</ul></div></div>';
        }


        if ($(pedidoObj).find(".observacionProducto").val() != '') {
            comentarios = '           <div class="form-group">' +
                    '               <label class="col-md-4 col-xs-5 control-label">Comentarios</label>' +
                    '               <div class="col-md-8 col-xs-7 line-height-30"> ' + $(pedidoObj).find(".observacionProducto").val() + ' </div>' +
                    '           </div>';
        }

        pedido = '<div class="col-md-4 pushtop_16 menuList_item">' +
                '   <button class=\"btn btn-danger menuList_del_btn\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button>' +
                '   <button class=\"btn btn-info menuList_edit_btn\"><i class=\"fa fa-edit\" aria-hidden=\"true\"></i></button>' +
                '   <div class="panel panel-default form-horizontal bggreen txtwhite list_box">' +
                '       <div class="panel-body">' +
                '           <h3 style="width: 70%"><span class="txtwhite"> <span class="fa fa-info-circle"></span> ' + $(pedidoObj).find("#nombreProducto").html() + '</span></h3>' +
                '           <p>' + $(pedidoObj).find(".nombremenu").html() + '</p>' +
                '       </div>' +
                '       <div class="panel-body form-group-separated">  ' + ingredientes +
                '           <div class="form-group">' +
                '               <label class="col-md-4 col-xs-5 control-label">Cantidad </label>' +
                '               <div class="col-md-8 col-xs-7 line-height-30"> ' + $(pedidoObj).find(".input-number").val() + ' </div>' +
                '           </div>' +
                '           <div class="form-group">' +
                '               <label class="col-md-4 col-xs-5 control-label">Precio </label>' +
                '               <div class="col-md-8 col-xs-7 line-height-30"> ' + $(pedidoObj).find(".precioproducto").html() + ' </div>' +
                '           </div>' + comentarios +
                '       </div>' +
                '   </div>' +
                '   <div class="hidethis item_metadata_cont">' + $(pedidoObj).find(".parsed_menuItem_html").html() +
                '   </div>' +
                '</div>';

        $("#resumen_pedido").append(pedido);
        $.notify('Se agregó "' + $(pedidoObj).find("#nombreProducto").html() + '" al pedido ', "success");
        $.when(
                $("#newo_ing_panel").slideUp("slow")
                ).then(function () {
            $("#menuwizard").slideDown("slow");
        });
    }

    ////////////////////////////////////////////////////////////////////////////////DEVUELVE UN NUMERO ALEATORIO DEL RANGO INGRESADO
    function random_range(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    ////////////////////////////////////////////////////////////////////////////EJECUTAMOS LA FUNCION PARA CONSTRUIR EL WIZZARD
    function rewizard() {
        $(".wizard").smartWizard({
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
            },
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
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////EDITOR DE CANTIDADES PARA EL MENU
    function editCantidades() {
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

</script>