<div class="page-sidebar mCustomScrollbar _mCS_1 mCS-autoHide  scroll">
    <ul class="x-navigation" id="barralateral">
        <li class="xn-logo">
            <a href="index.php?panel=index.php#autoscroll">Dirulo</a>
            <a href="#" class="x-navigation-control"></a>
        </li>
        <li class="xn-profile">
            <a href="#" class="profile-mini fotoPerfil">
                <img src="<?php
                $isavatar = "img/users/" . $_SESSION["usuario"]["nombreUsuario"] . ".jpg";
                if (file_exists($isavatar)) {
                    echo "img/users/" . $_SESSION["usuario"]["nombreUsuario"];
                } else {
                    echo "img/users/user";
                }
                ?>.jpg" alt="User"/>
            </a>
            <div class="profile">
                <div class="profile-image fotoPerfil">
                    <img src="<?php
                    $isavatar = "img/users/" . $_SESSION["usuario"]["nombreUsuario"] . ".jpg";
                    if (file_exists($isavatar)) {
                        echo "img/users/" . $_SESSION["usuario"]["nombreUsuario"];
                    } else {
                        echo "img/users/user";
                    }
                    ?>.jpg" alt="User"/>
                </div>
                <div class="profile-data">
                    <div class="profile-data-name">
                        <?php echo $_SESSION["usuario"]["nombresUsuario"] . "<br>" . $_SESSION["usuario"]["apellidosUsuario"]; ?>
                        <div class="profile-data-title">
                            <?php echo $_SESSION["usuario"]["idPerfil"]; ?>
                        </div>
                    </div>
                    <div class="profile-data-title nombreEstablecimiento">                        
                        <?php echo $_SESSION["usuario"]["nombreEstablecimiento"] . " " . $_SESSION["usuario"]["sectorEstablecimiento"]; ?>
                    </div>
                </div>
                <div class="profile-controls">
                    <!--                    <a href="pages-profile.html" class="profile-control-left"><span class="fa fa-info"></span></a>
<a href="pages-messages.html" class="profile-control-right"><span class="fa fa-envelope"></span></a>-->
                </div>
            </div>                                                                        
        </li>
        <li class="xn-title">Menú principal</li>

        <?php
        if ($_SESSION["usuario"]["idPerfil"] == "ADMINISTRADOR DE LOCALES / ESTABLECIMIENTOS" || $_SESSION["usuario"]["idPerfil"] == "GERENTE / AFINES" || $_SESSION["usuario"]["idPerfil"] == "SOPORTE TECNICO") {
            echo '
            <li class="dashboard"><a href="index.php?panel=dashboard.php#autoscroll"><i class="fas fa-tachometer-alt"></i><span class="xn-text"> Dashboard</span></a></li> 
        <li class="pedidos"><a href="index.php?panel=index.php#autoscroll"><i class="fas fa-clipboard-list"></i><span class="xn-text"> Pedidos</span></a></li> 
        <li class="domicilio"><a href="index.php?panel=domicilio.php#autoscroll"><span class="fa fa-motorcycle"></span><span class="xn-text"> Domicilios</span></a></li> 
        <li class="cocina"><a href="index.php?panel=cocina.php#autoscroll"><i class="fas fa-fire"></i><span class="xn-text"> Cocina</span></a></li>
        <li class="caja"><a href="index.php?panel=caja.php#autoscroll"><i class="fas fa-credit-card"></i><span class="xn-text"> Caja</span></a></li> 
        <li class="entregas"><a href="index.php?panel=entregas.php"><span class="fa fa-truck"></span><span class="xn-text"> Entregas</span></a></li> 
        <li class="entregas"><a href="index.php?panel=inventory.php"><i class="fas fa-sort-amount-up"></i><span class="xn-text"> Inventario</span></a></li> 
        <li class="reporte"><a href="index.php?panel=reporte.php"><i class="fas fa-chart-pie"></i><span class="xn-text"> Reportes</span></a></li>
        <li class="entregas"><a href="index.php?panel=user.php#autoscroll"><i class="fa fa-users"></i><span class="xn-text"> Usuarios</span></a></li>
        <li class="entregas"><a href="index.php?panel=procesos.php#autoscroll"><i class="fas fa-clipboard-list"></i><span class="xn-text"> Producci&oacute;n</span></a></li>
            ';
        } elseif ($_SESSION["usuario"]["idPerfil"] == "SALONERO") {
            echo '
        <li class="pedidos"><a href="index.php?panel=index.php#autoscroll"><span class="fa fa-calendar-minus-o"></span><span class="xn-text"> Pedidos</span></a></li>';
        } elseif ($_SESSION["usuario"]["idPerfil"] == "CAJERO CERTIFICADO") {
            echo ' 
        <li class="caja"><a href="index.php?panel=caja.php#autoscroll"><span class="fa fa-money"></span><span class="xn-text"> Caja</span></a></li> 
        ';
        } elseif ($_SESSION["usuario"]["idPerfil"] == "MENSAJERO / REPARTIDOR") {
            echo '

        <li class="entregas"><a href="index.php?panel=entregas.php"><span class="fa fa-truck"></span><span class="xn-text"> Entregas</span></a></li>
            ';
        } elseif ($_SESSION["usuario"]["idPerfil"] == "CONSERJE") {
            echo '

            ';
        }
        ?>




    </ul>
</div>