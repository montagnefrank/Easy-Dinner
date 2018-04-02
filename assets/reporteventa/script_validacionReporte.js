$(document).ready(function () {

    $("form[name='formreporte']").validate({
        rules: {
            selectReporte: {
                required: true,
            },
            fechaInicioreporte: {
                required: true,
            },
            fechaFinreporte: {
                required: true,
            }
        },
        messages: {
            selectReporte: {
                required: "Seleccione un tipo de reporte."
            },
            fechaInicioreporte: {
                required: "Establezca una fecha de inicio.",
            },
            fechaFinreporte: {
                required: "Establezca una fecha fin.",
            }
        }
    });

});