$(document).ready(function () {

    $(".btnGenerarReporte").click(function(){
        if($("form[name='formreporte']").valid()){

            $.ajax({
                url: 'assets/reporteventa/reporteventa_controller.php',
                type: 'POST',
                data: {
                    tipoReporte: $("#selectReporte").val(),
                    fechaInicio: $("#fechaInicioreporte").val(),
                    fechaFin: $("#fechaFinreporte").val(),
                },
                success: function (reporte) {

                    if($("#selectReporte").val() == "reporteProductos"){
                        $(".tituloReporte").html("Reporte de productos vendidos (Del <b style='color:red;'>"+convertDate($("#fechaInicioreporte").val())+"</b> al <b style='color:red;'>"+convertDate($("#fechaFinreporte").val())+"</b>) ");
                    }

                    $(".contenedorReporte").html(reporte);

                    $('.contenedorReporte .table').DataTable({
                        "pageLength": 5,
                        "bLengthChange": false,
                        "language": {
                            "search": "BUSCAR:"
                        }
                    });

                    $(".opcionesReporte").show();



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

});

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()+1), pad(d.getMonth()+1), d.getFullYear()].join('/');
}