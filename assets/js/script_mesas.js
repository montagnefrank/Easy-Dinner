$(document).ready(function() {
    $(".btnNuevoPedido").click(function() {
        if ($("#selectMesas").val() != "") {
            //Para asignar la mesa a sesion, de esta manera sabremos en que mesa toca realizar el pedido
            $.ajax({
                // Verificacion de los datos introducidos
                url: 'assets/mesas/asignaMesa.php',
                data: {
                    idmesa: $("#selectMesas").val(),
                    numeromesa: $("#selectMesas option:selected").text()
                },
                type: 'POST',
                success: function(idmesa) {
                    window.location.replace("index.php?panel=hacerpedido.php#autoscroll");
                },
                error: function(error) {
                    console.log('Disculpe, existió un problema');
                    console.log(error);
                },
                complete: function(xhr, status) {
                    console.log('Petición realizada');
                }
            });
        } else {
            $.notify('Mesa no seleccionada !\n Seleccione una mesa e intente nuevamente', "error");
        }
    });

    $(".btnAnadirPedido").click(function() {
        window.location.replace("index.php?panel=anadirpedido.php#autoscroll");
    });
});