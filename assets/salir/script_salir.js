$(document).ready(function() {
    $(".btnSalir").click(function(){
        $.ajax({
            url: 'assets/salir/salir_controller.php',
            type: 'POST',
            success: function (respuesta) {
                if(respuesta){                    
                    window.location.href = "login.php";
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
});