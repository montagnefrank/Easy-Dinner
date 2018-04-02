/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////********************************************************************************************//////////////////////////////////
///////////////////////////****************SCRIPT CONTROLADOR DEL PANEL DASHBOARD PARA SISTEMA DIRULO******************//////////////////////////////////
///////////////////////////********************************************************************************************//////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////********************************************      AGREGAMOS LA NUEVA FUNCION PARA INTERCAMBIAR EL EVENETO DE LOS CLICS
$.fn.clicktoggle = function (a, b) {
    return this.each(function () {
        var clicked = false;
        $(this).click(function () {
            if (clicked) {
                clicked = false;
                return b.apply(this, arguments);
            }
            clicked = true;
            return a.apply(this, arguments);
        });
    });
};

///////////********************************************     GRAFICO DE MESAS ATENDIDAS POR MES 
var mesasatendidas = Morris.Line({
    element: 'mesasatendicas_graphline',
    data: [{y: '2017-01', a: 152, b: 228, c: 381}, {y: '2017-02', a: 313, b: 478, c: 357},
        {y: '2017-03', a: 354, b: 574, c: 423}, {y: '2017-04', a: 475, b: 568, c: 641},
        {y: '2017-05', a: 547, b: 725, c: 868}, {y: '2017-06', a: 654, b: 792, c: 721}
    ],
    xkey: 'y',
    ykeys: ['a', 'b', 'c'],
    labels: ['Quito Sur', 'Quito Norte', 'Villaflora'],
    resize: true,
    hideHover: true,
    xLabels: 'month',
    gridTextSize: '10px',
    lineColors: ['#3FBAE4', '#33414E', '#459e42'],
    gridLineColor: '#E5E5E5'
});





 ///////////////////////////////////////////////QUITONORTE
$('#quitonorte_sidebar').click(function () {
    $('#title_resumen_ingresos').html("Av. del Maestro");
    $('#sidebar_ingresosdeldia').val("$ 1,586");
    $('#sidebar_ingresosdeldia_pedidos').html("86 pedidos facturados");
    $('#sidebar_ingresossemana').val("$ 8,451");
    $('#sidebar_ingresossemana_pedidos').html("425 pedidos facturados");
    $('#sidebar_ingresosdelmes').val("$ 32,284");
    $('#sidebar_ingresosdelmes_pedidos').html("1985 pedidos facturados");
    $('#sidebar_listado_empleados').html("");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-online\"></div><img src=\"assets/images/users/user.jpg\" class=\"pull-left\" alt=\"Luis Cordero\"><span class=\"contacts-title\">Luis Cordero</span><p>Mesero</p></a>");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-offline\"></div><img src=\"assets/images/users/user7.jpg\" class=\"pull-left\" alt=\"Daniel Tamayo\"><span class=\"contacts-title\">Daniel Tamayo</span><p>Cajero</p></a>");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-away\"></div><img src=\"assets/images/users/user3.jpg\" class=\"pull-left\" alt=\"Andreina Jaramillo\"><span class=\"contacts-title\">Andreina Jaramillo</span><p>Mesera</p></a>");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-away\"></div><img src=\"assets/images/users/user8.jpg\" class=\"pull-left\" alt=\"Elisa Ramirez\"><span class=\"contacts-title\">Elisa Ramirez</span><p>Mesera</p></a>");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-online\"></div><img src=\"assets/images/users/user2.jpg\" class=\"pull-left\" alt=\"Manuel Su&aacute;rez\"><span class=\"contacts-title\">Manuel Su&aacute;rez</span><p>Mesero</p></a>");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-away\"></div><img src=\"assets/images/users/user9.jpg\" class=\"pull-left\" alt=\"Angela Coruña\"><span class=\"contacts-title\">Angela Coruña</span><p>Mesera</p></a> ");
    $('#sidebar_img_rest').html(" ");
    $('#sidebar_img_info').html(" ");
    $('#sidebar_img_rest').append("<img style=\"width: 100%;height: 100%;\" src=\"img/locales/sucursal-norte-dirulo.png\" />");
    $('#sidebar_img_info').append("<img style=\"width: 100%;height: 100%;\" src=\"img/locales/sucursal-norte-dirulo.jpg\" />");
});

///////////////////////////////////////////////QUITOSUR
$('#quitosur_sidebar').click(function () { 
    $('#title_resumen_ingresos').html("Quito Sur");
    $('#sidebar_ingresosdeldia').val("$ 2,723");
    $('#sidebar_ingresosdeldia_pedidos').html("74 pedidos facturados");
    $('#sidebar_ingresossemana').val("$ 7,741");
    $('#sidebar_ingresossemana_pedidos').html("685 pedidos facturados");
    $('#sidebar_ingresosdelmes').val("$ 24,413");
    $('#sidebar_ingresosdelmes_pedidos').html("1036 pedidos facturados");
    $('#sidebar_listado_empleados').html("");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-away\"></div><img src=\"assets/images/users/user8.jpg\" class=\"pull-left\" alt=\"Elisa Ramirez\"><span class=\"contacts-title\">Elisa Ramirez</span><p>Mesera</p></a>");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-online\"></div><img src=\"assets/images/users/user2.jpg\" class=\"pull-left\" alt=\"Manuel Su&aacute;rez\"><span class=\"contacts-title\">Manuel Su&aacute;rez</span><p>Mesero</p></a>");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-online\"></div><img src=\"assets/images/users/user.jpg\" class=\"pull-left\" alt=\"Luis Cordero\"><span class=\"contacts-title\">Luis Cordero</span><p>Mesero</p></a>");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-offline\"></div><img src=\"assets/images/users/user7.jpg\" class=\"pull-left\" alt=\"Daniel Tamayo\"><span class=\"contacts-title\">Daniel Tamayo</span><p>Cajero</p></a>");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-away\"></div><img src=\"assets/images/users/user9.jpg\" class=\"pull-left\" alt=\"Angela Coruña\"><span class=\"contacts-title\">Angela Coruña</span><p>Mesera</p></a> ");
    $('#sidebar_listado_empleados').append("<a href=\"#\" class=\"list-group-item\"><div class=\"list-group-status status-away\"></div><img src=\"assets/images/users/user3.jpg\" class=\"pull-left\" alt=\"Andreina Jaramillo\"><span class=\"contacts-title\">Andreina Jaramillo</span><p>Mesera</p></a>");
    $('#sidebar_img_rest').html(" ");
    $('#sidebar_img_info').html(" ");
    $('#sidebar_img_rest').append("<img style=\"width: 100%;height: 100%;\" src=\"img/locales/sucursal-sur-dirulo.png\" />");
    $('#sidebar_img_info').append("<img style=\"width: 100%;height: 100%;\" src=\"img/locales/sucursal-sur-dirulo.jpg\" />");
});

/////////////////////////////////////////////////////////////////////////////////////////////////Google Maps Api {
var mapOptions = {
    zoom: 12,
    scrollwheel: false,
    center: new google.maps.LatLng(-0.238978, -78.5231), // 9440 Northwest 12th Street, Doral, FL 33172, EE. UU
    styles: [{"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "simplified"}, {"hue": "#00afff"}, {"saturation": "100"}, {"lightness": "0"}, {"weight": "4.03"}, {"gamma": "0.50"}]},
        {"featureType": "poi.business", "elementType": "all", "stylers": [{"visibility": "on"}, {"hue": "#00afff"}, {"weight": "0.50"}]},
        {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "on"}, {"hue": "#00afff"}, {"saturation": "67"}, {"lightness": "57"}]}]};

var mapElement_VF = document.getElementById('map_small');

var map_VF = new google.maps.Map(mapElement_VF, mapOptions);

var LatLng_VF = {lat: -0.238707, lng: -78.523078};
var image_VF = {url: "img/locales/villaflora_marker.png", scaledSize: new google.maps.Size(150, 112)};
var marker_VF = new google.maps.Marker({position: LatLng_VF, map: map_VF, title: 'Di Rulo Villaflora!', icon: image_VF});

var LatLng_QN = {lat: -0.122556, lng: -78.491738};
var image_QN = {url: "img/locales/quitonorte_marker.png", scaledSize: new google.maps.Size(150, 112)};
var marker_QN = new google.maps.Marker({position: LatLng_QN, map: map_VF, title: 'Di Rulo Quito Norte!', icon: image_QN});

var LatLng_QS = {lat: -0.256418, lng: -78.532873};
var image_QS = {url: "img/locales/quitosur_marker.png", scaledSize: new google.maps.Size(150, 112)};
var marker_QS = new google.maps.Marker({position: LatLng_QS, map: map_VF, title: 'Di Rulo Quito Sur!', icon: image_QS});

//}
////////////////////////////////////////////////////////////CAMBIAR EL CENTRO DEL GOOGLE MAPS CUANDO CAMBIO A PANTALLA COMPLETA
function newLocation(newLat, newLng)
{
    map_VF.panTo({
        lat: newLat,
        lng: newLng
    });
    map_VF.setZoom(12);
}

///////////////////////////////INTERCAMBIO EL GRAFICO DE INGREDIENTES ENTRE PANTALLA COMPLETA O RESUMIDA
$('#ingredientes_toggle_list').click(function () { 
    $("#ingredientes_graph_peq, #ingredientes_graph_grande, #ingredientes_botonera_small, #ingredientes_botonera_big").toggle("slow");
});

/////////////////////////////////////////////////////////////////////////INTERCAMBIO EL GOOGLE MAPS API ENTRE PANTALLA COMPLETA O RESUMIDA
$('#mapadelivery_toggle_graph').clicktoggle(
        function () {
            $('#map_small').css("height", "100%");
            $('#map_small').css("width", "20%");
            newLocation(-0.126805, -78.487901);  
            $('#delivery_table').toggle("slow");
        },
        function () {
            $('#map_small').css("height", "400px");
            $('#map_small').css("width", "100%"); 
            newLocation(-0.238978, -78.5231);  
            $('#delivery_table').toggle("slow");
        }
);

//////////////////////////////////////////////////////////////////////////////////INTERCAMBIO EL GRAFICO DE MESAS ATENDIDAS DE 6 MESES A 12 MESES
$('#mesasatendidas_toggle_graph').clicktoggle(
        function () {
            $('#ultimosmeses_resumen').html("Resumen mensual (&Uacute;ltimos 12 meses)");
            mesasatendidas.setData([{y: '2017-01', a: 152, b: 228, c: 381}, {y: '2017-02', a: 313, b: 478, c: 357},
                {y: '2017-03', a: 354, b: 574, c: 423}, {y: '2017-04', a: 475, b: 568, c: 641},
                {y: '2017-05', a: 547, b: 725, c: 868}, {y: '2017-06', a: 654, b: 792, c: 721},
                {y: '2017-07', a: 568, b: 468, c: 542}, {y: '2017-08', a: 659, b: 498, c: 578},
                {y: '2017-09', a: 578, b: 698, c: 758}, {y: '2017-10', a: 754, b: 689, c: 854},
                {y: '2017-11', a: 756, b: 732, c: 821}, {y: '2017-12', a: 832, b: 845, c: 950}]);
        },
        function () {
            $('#ultimosmeses_resumen').html("Resumen mensual (&Uacute;ltimos 6 meses)");
            mesasatendidas.setData([{y: '2017-01', a: 152, b: 228, c: 381}, {y: '2017-02', a: 313, b: 478, c: 357},
                {y: '2017-03', a: 354, b: 574, c: 423}, {y: '2017-04', a: 475, b: 568, c: 641},
                {y: '2017-05', a: 547, b: 725, c: 868}, {y: '2017-06', a: 654, b: 792, c: 721}]);
        }
);

///////////////////////////////////////////////////////////////////////////////////////////////////////GRAFICOS DE TOP5 RESTAURANTES
function init_echarts() {
    if ($('#top5_chart_villaflora').length) {///////////////////////////////////////////////////////////TOP5 VILLAFLORA

        var echartPie = echarts.init(document.getElementById('top5_chart_villaflora'), theme);

        echartPie.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title: {
                show: true,
                text: 'Top 5 Villaflora',
                x: 'left',
                y: 'top'
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: ['Pizza Dirulo', 'Pizza Napolitana', 'Lasaña de Pollo', 'Alitas BBQ', 'Canelon de Carne']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    saveAsImage: {
                        show: true,
                        title: "Save Image"
                    }
                }
            },
            calculable: true,
            series: [{
                    name: 'Los 5 mas pedidos',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '48%'],
                    data: [{value: 1548, name: 'Pizza Dirulo'},
                        {value: 310, name: 'Pizza Napolitana'},
                        {value: 234, name: 'Lasaña de Pollo'},
                        {value: 135, name: 'Alitas BBQ'},
                        {value: 335, name: 'Canelon de Carne'}]
                }]
        });

        var dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        };

        var placeHolderStyle = {
            normal: {
                color: 'rgba(0,0,0,0)',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };

    }
    if ($('#top5_chart_quitonorte').length) {//////////////////////////////////////////////////////////TOP5 QUITONORTE

        var echartPie = echarts.init(document.getElementById('top5_chart_quitonorte'), theme);

        echartPie.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title: {
                show: true,
                text: 'Top 5 Av del Maestro',
                x: 'left',
                y: 'top'
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: ['Ensalada Verde', 'Espagueti Al Pesto', 'Pernil al horno', 'Durazno con Crema', 'Pizza Hawaiana']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    saveAsImage: {
                        show: true,
                        title: "Save Image"
                    }
                }
            },
            calculable: true,
            series: [{
                    name: 'Los 5 mas pedidos',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '48%'],
                    data: [{
                            value: 562,
                            name: 'Ensalada Verde'
                        }, {
                            value: 1658,
                            name: 'Espagueti Al Pesto'
                        }, {
                            value: 962,
                            name: 'Pernil al horno'
                        }, {
                            value: 264,
                            name: 'Durazno con Crema'
                        }, {
                            value: 754,
                            name: 'Pizza Hawaiana'
                        }]
                }]
        });

        var dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        };

        var placeHolderStyle = {
            normal: {
                color: 'rgba(0,0,0,0)',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };

    }
    if ($('#top5_chart_quitosur').length) {//////////////////////////////////////////////////////////TOP5 QUITOSUR

        var echartPie = echarts.init(document.getElementById('top5_chart_quitosur'), theme);

        echartPie.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title: {
                show: true,
                text: 'Top 5 Quito Sur',
                x: 'left',
                y: 'top'
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: ['Nuggets Dirulo', 'Fetuccini Carbonara', 'Costillas Ahumadas', 'Pizza Tocino', 'Pizza Longaniza']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    saveAsImage: {
                        show: true,
                        title: "Save Image"
                    }
                }
            },
            calculable: true,
            series: [{
                    name: 'Los 5 mas pedidos',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '48%'],
                    data: [{
                            value: 254,
                            name: 'Nuggets Dirulo'
                        }, {
                            value: 246,
                            name: 'Fetuccini Carbonara'
                        }, {
                            value: 965,
                            name: 'Costillas Ahumadas'
                        }, {
                            value: 1524,
                            name: 'Pizza Tocino'
                        }, {
                            value: 1652,
                            name: 'Pizza Longaniza'
                        }]
                }]
        });

        var dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        };

        var placeHolderStyle = {
            normal: {
                color: 'rgba(0,0,0,0)',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };

    }
}

////////////////////////////////////////////////////////////////////////////////////CARGO EL top5 AL CARGAR LA PAGINA
$(document).ready(function () {
    init_echarts();
});

///////////////////////////////////////////////////////////////////////////////////VUELVO A CARGAR EL TOP5 EN CASO DE QUE CAMBIE DE TAB
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    init_echarts();
});

/////////////////////////////////////////////////////////////////////////////DEBUG VENTANAMODAL DE FACTURAS
$(document).on('click', '#showmodal', function () {
    $('#dashboard_modal').modal('toggle');
});
