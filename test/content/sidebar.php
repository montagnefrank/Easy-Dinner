<div class="page-sidebar page-sidebar-fixed scroll mCustomScrollbar _mCS_1 mCS-autoHide">
    <ul class="x-navigation">
        <li class="xn-logo">
            <a href="index.php?panel=index.php#autoscroll">EBLOOMS</a>
            <a href="#" class="x-navigation-control"></a>
        </li>
        <li class="xn-profile">
            <a href="#" class="profile-mini">
                <img src="img/users/user.jpg"/>
            </a>
            <div class="profile">
                <div class="profile-image">
                    <img src="<?php
                    session_start();
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
                        <?php echo $_SESSION["usuario"]["nombreUsuario"]; ?>
                        <div class="profile-data-title">
                            <?php echo $_SESSION["usuario"]["idPerfil"]; ?>
                        </div>
                    </div>
                    <div class="profile-data-title">
                        Villaflora
                    </div>
                </div>
                <div class="profile-controls">
<!--                    <a href="pages-profile.html" class="profile-control-left"><span class="fa fa-info"></span></a>
                    <a href="pages-messages.html" class="profile-control-right"><span class="fa fa-envelope"></span></a>-->
                </div>
            </div>                                                                        
        </li>
        <li class="xn-title">Menú principal</li>
        <li class="dashboard"><a href="index.php?panel=dashboard.php#autoscroll"><span class="fa fa-tachometer"></span><span class="xn-text"> Dashboard</span></a></li> 
        <li class="pedidos"><a href="index.php?panel=index.php#autoscroll"><span class="fa fa-calendar-minus-o"></span><span class="xn-text"> Pedidos</span></a></li> 
        <li class="cocina"><a href="index.php?panel=cocina.php#autoscroll"><span class="fa fa-cutlery"></span><span class="xn-text"> Cocina</span></a></li>
        <li class="caja"><a href="index.php?panel=caja.php#autoscroll"><span class="fa fa-money"></span><span class="xn-text"> Caja</span></a></li> 
    </ul>
</div>