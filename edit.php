<script>
    $.ajax({
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
                                    "<div class='col-md-6 col-sm-6 col-xs-6 txt-primary'>" +
                                    "Ingredientes" +
                                    "<div class='col-md-12 rightIngrediente border-primary' style='height:250px; overflow: auto ;border: 1px solid; border-radius: 6px; padding: 15px;'>" +
                                    htmlselectIngredientesE +
                                    '</div>' +
                                    '</div>' +
                                    "<div class='col-md-6 col-sm-6 col-xs-6 txt-primary'>" +
                                    "Ingredientes Extras" +
                                    "<div class='col-md-12 leftIngrediente border-primary' style='height:250px; overflow: auto ;border: 1px solid; border-radius: 6px; padding: 15px;'>" +
                                    htmlselectIngredientesG +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'
                                    );

                            $(".contenidoSeleccionaIngredientes").append(
                                    '<div class="col-md-12">' +
                                    '<br><br>' +
                                    '<div class="col-md-5">' +
                                    '<h4 style="padding-top: 12px;" class="tituloCantidad txt-primary">Cantidad producto :</h4>' +
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
                                    '<h4 class="txt-primary">Observacion del producto :</h4>' +
                                    '<textarea class="form-control observacionProducto border-primary" rows="3" id="comment" style="resize: none;" placeholder="Ingrese aquÃ­ la observacion del producto actual."></textarea>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'
                                    );

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

                        })
                    },
                    error: function (error) {
                        console.log('Disculpe, existió un problema');
                        console.log(error);
                    }
                });

            });
        },
        error: function (error) {
            console.log('No pudimos traer los ingredientes del producto');
            console.log(error);
        }
    });

</script>