<?php

switch ($panel) {///////////////////////////////////////////////////////////////SELECTOR DE HOJAS DE ESTILO DEPENDIENDO DEL PANEL, DEPENDIENDO DEL PANEL< HACE LAS LLAMADAS A LOS ARCHIVOS CORRESPONDINETES\
    case "procesos.php":
        echo '
            <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.css"/>
            <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick-theme.css"/>
         ';
        break;
}