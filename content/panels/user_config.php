<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
    <li class="active">Configuración</li>
</ul>
<!-- BREADCRUMB -->
<div class="page-title">                    
    <h2><span class="fa fa-cog"></span> Editar configuración de la cuenta</h2>
</div>
<div class="page-content-wrap">  
    <?php
    if (isset($_SESSION['msg'])) {
        echo '
                <div class="row notificactionbox">
                    <div class="col-md-12">
                        <div class="widget widget-';
        echo $_SESSION['box'];
        echo ' widget-item-icon">
                            <div class="widget-item-left">
                                <span class="fa fa-exclamation"></span>
                            </div>
                            <div class="widget-data">
                                <div class="widget-title">Notificación</div>
                                <div class="widget-subtitle">
                                    <div role="alert">
                                        ' . $_SESSION['msg'] . '
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
        ';
        unset($_SESSION['msg']);
    }
    ?>
    <div class="col-md-4">
        <div class="panel panel-default">                                
            <div class="panel-body">
                <h3><span class="fa fa-user"></span> <?php echo $_SESSION["usuario"]["nombreUsuario"]." ".$_SESSION["usuario"]["apellidosUsuario"]; ?></h3>
                <p><span class="fa fa-industry"></span> <?php echo $_SESSION["usuario"]["idPerfil"]; ?></p>
                <div class="text-center fotoPerfil">
                    <img src="<?php
                              $isavatar = "img/users/" . $_SESSION["usuario"]["nombreUsuario"] . ".jpg";
                              if (file_exists($isavatar)) {
                                  echo "img/users/" . $_SESSION["usuario"]["nombreUsuario"];
                                  $avatar = "img/users/" . $_SESSION["usuario"]["nombreUsuario"] .".jpg"; 
                              } else {
                                  echo  "img/users/user";
                                  $avatar = "img/users/user.jpg";
                              }
                              ?>.jpg" class="img-thumbnail">
                </div>                                    
            </div>
            <div class="panel-body form-group-separated">
                <div class="form-group">                                        
                    <div class="col-md-12 col-xs-12">
                        <a href="#" class="btn btn-info btn-block btn-rounded" data-toggle="modal" data-target="#modal_change_photo">Cambiar Foto</a>
                    </div>
                </div>
                <div class="form-group">                                        
                    <div class="col-md-12 col-xs-12">
                        <a href="#" class="btn btn-danger btn-block btn-rounded" data-toggle="modal" data-target="#modal_change_password">Cambiar contraseña</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">                       
        <a class="tile tile-primary widgetEstablecimiento" style="cursor:pointer" data-toggle="tooltip" title="Haga click para cambiar de establecimiento">
            <h1 class="nombreEstablecimiento" style="color:white;"><?php echo $_SESSION["usuario"]["nombreEstablecimiento"]." ".$_SESSION["usuario"]["sectorEstablecimiento"]; ?></h1>  
            <p>Establecimiento</p>                            
            <div class="informer informer-default"><span class="fa fa-home"></span></div>
        </a>  
    </div>
</div>

<div id="modal_change_photo" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title tituloModalPreferencias" style="color:white;"><center><i class="fa fa-file-image-o" aria-hidden="true"></i> Cambiar foto de perfil</center></h4>
            </div>
            <div class="modal-body">

                <form id="formImagen" name="formImagen">
                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-1">
                            <input type="file" class="filestyle" data-placeholder="Ninguna imagen establecida." data-text="Seleccionar imagen.." data-btnClass="btn-primary" accept="image/*" name="fileImagen" id="fileImagen" required>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>
                <button type="button" class="btn btn-primary btnSubeImagen" style="border: 1px solid;"><i class="fa fa-upload" aria-hidden="true"></i> Cambiar foto de perfil</button>
            </div>
        </div>

    </div>
</div>

<div id="confirmacionCambioFoto" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title tituloModalPreferencias" style="color:white;"><center><i class="fa fa-file-image-o" aria-hidden="true"></i> Confirmación de cambio de foto</center></h4>
            </div>
            <div class="modal-body">
                <div class="col-md-12">
                    <div class="col-md-12">
                        <center><h4>Esta seguro/a de cambiar esta foto de perfil</h4></center>
                        <div class="profile avatar" style="background:white;">
                            <div class="profile-image fotoAntigua">
                                <img src="<?php echo $avatar; ?>" alt="Imagen anterior" class="mCS_img_loaded" >
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <center><h4>Por esta foto ?</h4></center>
                        <div class="profile avatar" style="background:white;">
                            <div class="profile-image">
                                <img class="nuevaImagen" src="" alt="Nueva imagen" class="mCS_img_loaded" >
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>
                <button type="button" class="btn btn-primary btnConfirmaImagen" style="border: 1px solid;"><i class="fa fa-check" aria-hidden="true"></i> Sí</button>
            </div>
        </div>

    </div>
</div>



<div class="modal animated fadeIn" id="modal_change_password" tabindex="-1" role="dialog" aria-labelledby="smallModalHead" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="passupdate" action="scripts/cambiarclave.php" method="post" enctype="multipart/form-data">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="smallModalHead">Cambiar contraseña</h4>
                </div>
                <div class="modal-body">
                    <p>Por favor introduzca los datos en los formularios a continuación para realizar el cambio de su contraseña</p>
                </div>
                <div class="modal-body form-horizontal form-group-separated">                        
                    <div class="form-group">
                        <label class="col-md-3 control-label">Contraseña anterior</label>
                        <div class="col-md-9">
                            <input name="oldpass" id="oldpass" type="password" class="form-control"/>
                            <span class="help-block">ingrese su contraseña actual</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">Nueva contraseña</label>
                        <div class="col-md-9">
                            <input name="newpass" id="newpass" type="password" class="form-control"/>
                            <span class="help-block">ingrese una contraseña entre 8 a 16</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">Repetir contraseña</label>
                        <div class="col-md-9">
                            <input name="reppass" id="reppass" type="password" class="form-control"/>
                            <span class="help-block">repita la contraseña anterior</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Salir</button>
                    <button name="submit" type="submit" class="btn btn-success" ><span class="fa fa-save"></span> Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div> 

<div id="modal_change_establecimiento" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title tituloModalPreferencias" style="color:white;"><center><i class="fa fa-home" aria-hidden="true"></i> Cambiar establecimiento</center></h4>
            </div>
            <div class="modal-body">
                <div class="col-md-8 col-md-offset-2">
                    <div class="btn-group-vertical radioEstablecimiento" data-toggle="buttons" style="width: 100%;">
                        <label class="btn btn-primary active">
                            <input type="radio" name="options" id="option1" autocomplete="off" value="" checked><br><h3 style="color:white;">Seleccione un establecimiento ..</h3><br>
                        </label>
                        <label class="btn btn-primary">
                            <input type="radio" name="options" id="option2" autocomplete="off" value="avmaestro"><img src="img/establecimientos/sucursal-norte-dirulo.png" alt="Imagen anterior" class="mCS_img_loaded" width="100" height="100"> <h3 style="color:white;">Dirulo Av. del Maestro</h3>
                        </label>
                        <label class="btn btn-primary">
                            <input type="radio" name="options" id="option3" autocomplete="off" value="quitosur"><img src="img/establecimientos/sucursal-sur-dirulo.png" alt="Imagen anterior" class="mCS_img_loaded" width="100" height="100"> <h3 style="color:white;">Dirulo Quito Sur</h3>
                        </label>
                        <label class="btn btn-primary">
                            <input type="radio" name="options" id="option4" autocomplete="off" value="villaflora"><img src="img/establecimientos/sucursal-villaflora-dirulo.png" alt="Imagen anterior" class="mCS_img_loaded" width="100" height="100"> <h3 style="color:white;">Dirulo Villaflora</h3>
                        </label>
                        <!--
                        <label class="btn btn-primary">
                            <input type="radio" name="options" id="option5" autocomplete="off" value="todos" ><img src="img/logo_rec.png" alt="Imagen anterior" class="mCS_img_loaded" width="200" style="padding: 10px 0px;"><h3 style="color:white;">Todos los establecimientos</h3>
                        </label>-->
                    </div>
                </div>

            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>
                <button type="button" class="btn btn-primary btnEstableceEstablecimiento" style="border: 1px solid;"><i class="fas fa-sync-alt" aria-hidden="true"></i> Cambiar establecimiento</button>
            </div>
        </div>

    </div>
</div>