// Inicializamos las variables para la contrucciones de la interfaz de manera dinamica con Javascript//

var google_ptm_map = 0;  // contador Contenedor del Mapa

var base1 = 0; //  contador base

var date1 = 0; // contador date

var icon1 = 0; // contador icon

var itemContent1 = 0; // contador item

var padding1 = 0; // contador padding

var timelineHeading1 = 0; // contador timeline




//***-- Realizamos la peticiòn Ajax para optener el numero de pedidos a domicilio existentes por entregar --***//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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


                if(value.estadoPedido == "LISTO PARA ENTREGAR"){
                    /*tile = "tile-success";
                    icon = '<i class="fa fa-check" style="font-size:20px;color:white;" aria-hidden="true"></i>';*/

                   /* else if(value.estadoPedido == "ENTREGADO"){
                        tile = "tile-default";
                        icon = '<i class="fa fa-thumbs-o-up" aria-hidden="true" style="font-size:20px;color:black;"></i>';
                    }*/


                    /*$(".contenedorPedido").append(
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
                    );*/

                    if(value.estadoMesa == "DOMICILIO"){

                        /*$(".timeline").append(
                            '<div class="timeline-item timeline-item-right">'+
                            '<div class="timeline-item-info ontime">02 Oct 2017</div>'+
                            '<div class="timeline-item-icon"><span class="fa fa-map-marker"></span></div>'+
                            '<div class="timeline-item-content">'+
                            '<div class="timeline-body padding-0">'+
                            '<div id="google_ptm_map-'+google_ptm_map+' " style="width: 100%; height: 150px;"></div>'+
                            '</div>'+
                            '<div class="timeline-heading">'+
                            '<img src="img/loading.gif"/> <a href="#">Pedido '+ value.idPedido + '</a> Pizza Familiar Dirulo <a href="#">Alfonso Jaramillo</a><br />'+
                            '<a href="#">No asignado</a>'+
                            '</div>'+
                            '</div>'+
                            '</div>'
                        )*/


                        var myDiv = document.createElement('div');
                        myDiv.className = 'timeline-item timeline-item-right';
                        myDiv.id = "base"+base1;
                        document.getElementById("timeline").appendChild(myDiv);

                        var myDiv = document.createElement('div');
                        myDiv.className = 'timeline-item-info ontime';
                        myDiv.id = "date"+date1;
                        document.getElementById("base"+base1).appendChild(myDiv);

                        var myDiv = document.createElement('div');
                        myDiv.className = 'timeline-item-icon';
                        myDiv.id = "icon"+icon1;
                        document.getElementById("base"+base1).appendChild(myDiv);

                        var myDiv = document.createElement('span');
                        myDiv.className = 'fa fa-map-marker';
                        document.getElementById("icon"+icon1).appendChild(myDiv);

                        var myDiv = document.createElement('div');
                        myDiv.className = 'timeline-item-content';
                        myDiv.id = "item-content"+itemContent1;
                        document.getElementById("base"+base1).appendChild(myDiv);

                        var myDiv = document.createElement('div');
                        myDiv.className = 'timeline-body padding-0';
                        myDiv.id = "padding-0"+padding1;
                        document.getElementById("item-content"+itemContent1).appendChild(myDiv);

                        var myDiv = document.createElement('div');
                        myDiv.id = "google_ptm_map"+google_ptm_map;
                        myDiv.style = "width: 100%; height: 150px;"
                        document.getElementById("padding-0"+padding1).appendChild(myDiv);

                        var myDiv = document.createElement('div');
                        myDiv.className = 'timeline-heading';
                        myDiv.id = "timeline-heading"+timelineHeading1;
                        document.getElementById("item-content"+itemContent1).appendChild(myDiv);

                        $("#timeline-heading"+timelineHeading1).append(
                            '<img src="img/loading.gif"/> <a href="#">Pedido ' +value.idPedido+ '</a> Pizza Familiar Dirulo <a href="#">Alfonso Jaramillo</a><br />'+
                            '<a href="#">No asignado</a>'
                        );


                            var mapOptions = {
                                zoom: 12,
                                scrollwheel: false,
                                center: new google.maps.LatLng(-0.238978, -78.5231),
                                styles: [{"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "simplified"}, {"hue": "#00afff"}, {"saturation": "100"}, {"lightness": "0"}, {"weight": "4.03"}, {"gamma": "0.50"}]},
                                    {"featureType": "poi.business", "elementType": "all", "stylers": [{"visibility": "on"}, {"hue": "#00afff"}, {"weight": "0.50"}]},
                                    {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "on"}, {"hue": "#00afff"}, {"saturation": "67"}, {"lightness": "57"}]}]};

                            var mapElement_VF = document.getElementById('google_ptm_map'+google_ptm_map);

                            var map_VF = new google.maps.Map(mapElement_VF, mapOptions);

                            var LatLng_VF = {lat: -0.238707, lng: -78.523078};
                            var image_VF = {url: "img/delivery_marker.png", scaledSize: new google.maps.Size(150, 112)};
                            var marker_VF = new google.maps.Marker({position: LatLng_VF, map: map_VF, title: 'Di Rulo Villaflora!', icon: image_VF});



                        google_ptm_map++;
                        base1++;
                        icon1++;
                        padding1++;
                        timelineHeading1++;
                        itemContent1++;
                        date1++;

                    }
                }
            });
        } else if (pedidos.length == 0) {
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
//***-- FIN Realizamos la peticiòn Ajax para optener el numero de pedidos a domicilio existentes por entregar --***//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////



$(document).on('click','#modal_entregar_btn', function (event) {
    $('#entregas_modal').modal('toggle');
});

////////////////////////////////////////////////////////////////////////////////google MAPS
window.onload = function(){
var mapOptions = {
    zoom: 12,
    scrollwheel: false,
    center: new google.maps.LatLng(-0.238978, -78.5231),
    styles: [{"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "simplified"}, {"hue": "#00afff"}, {"saturation": "100"}, {"lightness": "0"}, {"weight": "4.03"}, {"gamma": "0.50"}]},
        {"featureType": "poi.business", "elementType": "all", "stylers": [{"visibility": "on"}, {"hue": "#00afff"}, {"weight": "0.50"}]},
        {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "on"}, {"hue": "#00afff"}, {"saturation": "67"}, {"lightness": "57"}]}]};

var mapElement_VF = document.getElementById('google_ptm_map-0');
/*var mapElement_QN = document.getElementById('google_ptm_map2');
var mapElement_QS = document.getElementById('google_ptm_map3');*/

var map_VF = new google.maps.Map(mapElement_VF, mapOptions);
/*var map_QN = new google.maps.Map(mapElement_QN, mapOptions);
var map_QS = new google.maps.Map(mapElement_QS, mapOptions);*/

var LatLng_VF = {lat: -0.238707, lng: -78.523078};
var image_VF = {url: "img/delivery_marker.png", scaledSize: new google.maps.Size(150, 112)};
var marker_VF = new google.maps.Marker({position: LatLng_VF, map: map_VF, title: 'Di Rulo Villaflora!', icon: image_VF});

/*var LatLng_QN = {lat: -0.122556, lng: -78.491738};
var image_QN = {url: "img/delivery_marker.png", scaledSize: new google.maps.Size(150, 112)};
var marker_QN = new google.maps.Marker({position: LatLng_QN, map: map_QN, title: 'Di Rulo Quito Norte!', icon: image_QN});

var LatLng_QS = {lat: -0.256418, lng: -78.532873};
var image_QS = {url: "img/delivery_marker.png", scaledSize: new google.maps.Size(150, 112)};
var marker_QS = new google.maps.Marker({position: LatLng_QS, map: map_QS, title: 'Di Rulo Quito Sur!', icon: image_QS});*/

};