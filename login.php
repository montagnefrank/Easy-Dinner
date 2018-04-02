<?php
/////////////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
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
            <img src="img/logo_rec.png" />
            <form method="post">
                <input type="text" name="username" class="username" placeholder="Usuario">
                <input type="password" name="password" class="password" placeholder="Contraseña">
                <button type="submit">Iniciar Sesión</button>
                <div class="error"><span>+</span></div>
                <div class="notificacion" hidden></div>
            </form>
        </div>
        <!-- Javascript -->
        <script src="assets/js/jquery-1.8.2.min.js"></script>
        <script src="assets/js/supersized.3.2.7.min.js"></script>
        <script src="assets/js/supersized-init.js"></script>
        <script src="assets/js/scripts.js"></script>
    </body>

</html>





