<?php
/////////////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

session_start();
if(isset($_SESSION["usuario"])){
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
    <head>
        <meta charset="utf-8">
        <title>Di Rulo - Sistema de gestión de pedidos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <!-- CSS -->
        <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=PT+Sans:400,700'>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="assets/css/reset.css">
        <link rel="stylesheet" href="assets/css/supersized.css">
        <link rel="stylesheet" href="assets/css/style.css">
        <link rel="stylesheet" href="assets/css/estilo.css">
    </head>
    <body>
        <div class="page-container">
            <div class="col-md-12">
                <img src="img/logo_rec.png" />
            </div>
            <div class="col-md-6">
                <div class="col-md-8 col-md-offset-2">
                    <div class="btn-group-vertical radioEstablecimiento" data-toggle="buttons" style="width: 100%;">
                        <h2 class="select_location">Seleccione un establecimiento para continuar..</h2>
                        <label class="btn btn-danger">
                            <input type="radio" name="options" id="option2" autocomplete="off" value="avmaestro"><img src="img/establecimientos/sucursal-norte-dirulo.png" alt="Imagen anterior" class="mCS_img_loaded" width="100" height="100"> <h3 style="color:white;">Pizzería Di Rulo Av. del Maestro</h3>
                        </label>
                        <label class="btn btn-danger">
                            <input type="radio" name="options" id="option3" autocomplete="off" value="quitosur"><img src="img/establecimientos/sucursal-sur-dirulo.png" alt="Imagen anterior" class="mCS_img_loaded" width="100" height="100"> <h3 style="color:white;">Pizzería Di Rulo Quito Sur</h3>
                        </label>
                        <label class="btn btn-danger">
                            <input type="radio" name="options" id="option4" autocomplete="off" value="villaflora"><img src="img/establecimientos/sucursal-villaflora-dirulo.png" alt="Imagen anterior" class="mCS_img_loaded" width="100" height="100"> <h3 style="color:white;">Pizzería Di Rulo Villaflora</h3>
                        </label>
                    </div>
                    <br>
                    <br>
                    <br>
                    <br>
                </div>
            </div>
            <div class="col-md-6">
                <button class="btn btn-danger continuar">Continuar</button>
                <br>
                <button class="btn btn-danger salir">Salir del sistema</button>
                <br>
                <br>
            </div>
            <!-- MENSAJE DE SALIDA-->
        </div>
        <!-- Javascript -->
        <script src="assets/js/jquery-1.8.2.min.js"></script>
        <script type="text/javascript" src="js/plugins/jquery/jquery.min.js"></script>
        <script type="text/javascript" src="js/plugins/jquery/jquery-ui.min.js"></script>
        <script src="assets/js/supersized.3.2.7.min.js"></script>
        <script src="assets/js/supersized-init.js"></script>

        <script type="text/javascript" src="js/plugins/bootstrap/bootstrap.min.js"></script>  
        <script type="text/javascript" src="js/plugins/notify/notify.js"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                $(".page-container").css("margin","30px auto 0 auto");

                estableceEstablecimiento();

                function estableceEstablecimiento(){
                    $.ajax({
                        url: 'assets/user_config/user_config_controller.php',
                        type: 'GET',
                        data: {
                            establecimiento: true,
                        },
                        success: function (respuesta) {
                            $(".radioEstablecimiento .btn-danger").each(function(index,value) {
                                console.log($(this).html());
                                $(this).removeClass("active");
                                if($(this).find("input[type='radio']").val() == respuesta){
                                    $(this).addClass("active");
                                    $(this).find("input[type='radio']").prop("checked",true);
                                }
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

                }});



            $(".continuar").click(function(){
                //ESTA CHEKADO
                if($(".radioEstablecimiento input:radio:checked").val() != ""){
                    $.ajax({
                        url: 'assets/user_config/user_config_controller.php',
                        type: 'POST',
                        dataType : "json",
                        data: {
                            establecimiento: $(".radioEstablecimiento input:radio:checked").val(),
                        },
                        success: function (respuesta) {

                            if(respuesta){
                                window.location.href = "index.php?panel=index.php#autoscroll";
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
                }else{
                    $.notify("Error \nSeleccione un establecimiento para entrar al sistema !", "error");
                }
            });

            $(".salir").click(function(){
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

        </script>
    </body>

</html>
<?php
}else{
    header("Location:login.php");
    exit();
}
?>
