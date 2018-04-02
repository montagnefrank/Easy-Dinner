<?php
/////////////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
//
////////////////////////////////////////////////////////////////////////////////////////////CONECTAMOS A LA BASE DE DATOS
require ("assets/conn.php");

////////////////////////////////////////////////////////////////////////////////VALIDAMOS SI EL USUARIO ESTA LOGUEADO
session_start();
if (isset($_SESSION["usuario"])) {
//////////////////////////////////////////////////////////////////////////////////////////OBTENEMOS EL PANEL QUE SE VA A MOSTRAR
    if (isset($_GET['panel'])) {
        $panel = $_GET['panel'];
    } else {
        header("Location:login.php");
    }
} else {
    header("Location:login.php");
}
?>
<!DOCTYPE html>
<html lang="es">
    <head>        
        <title>Di Rulo - Sistema de gestión de pedidos</title>            
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" id="theme" href="css/theme-eblooms-red.css"/>
        <link rel="stylesheet" type="text/css" id="theme" href="css/custom.css"/>
        <link rel="stylesheet" href="node_modules/dragula/dist/dragula.min.css">
        <link rel="stylesheet" href="assets/css/estilo.css">
    </head>
    <body>

<?php
if ($panel == "cocina.php") {
    echo '<div class="page-container page-navigation-top-fixed page-navigation-toggled page-container-wide">';
} else {
    echo '<div class="page-container page-navigation-top-fixed">';
}
?>
        <!-- SIDEBAR -->
        <?php
        require ("content/sidebar.php");
        ?>
        <div class="page-content" style="height: 100%;">
            <!-- STATUSBAR -->
<?php require ("content/statusbar.php"); ?>          
            <!--PANEL A MOSTRAR-->                      
            <?php require ("content/panels/" . $panel); ?>                           
        </div>
    </div>
    <!-- MENSAJE DE SALIDA-->
    <div class="message-box animated fadeIn" data-sound="alert" id="mb-signout">
        <div class="mb-container">
            <div class="mb-middle">
                <div class="mb-title"><span class="fa fa-sign-out"></span> Salir de <strong>Di Rulo Pizzeria</strong> ?</div>
                <div class="mb-content">
                    <p>¿Est&aacute; seguro que desea salir?</p>                    
                    <p>Presione No si desea continuar trabajando. Presione Si para salir.</p>
                </div>
                <div class="mb-footer">
                    <div class="pull-right">
                        <a href="#" class="btn btn-info btn-lg btnSalir">Si</a>
                        <button class="btn btn-default btn-lg mb-control-close">No</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="notificacion" hidden></div>
    <!-- FIN MENSAJE DE SALIDA-->

    <!-- START SIDEBAR -->
<?php
if ($panel == "dashboard.php") {
    require ("assets/dashboard/rightbar.php");
}
?>
    <!-- END SIDEBAR -->        

    <!-- PRELOADS -->
    <audio id="audio-alert" src="audio/alert.mp3" preload="auto"></audio>
    <audio id="audio-fail" src="audio/fail.mp3" preload="auto"></audio>
    <!-- FIN PRELOADS --> 

    <!--SCRIPTS Y PULGINS-->
<?php require ("scripts/pagescripts.php"); ?>
</body>
</html>