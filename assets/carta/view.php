<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
    <li><a href="index.php?panel=index.php">Carta</a></li>
    <li>Nuevo pedido</li>

</ul>
<!-- FIN BREADCRUMB -->

<div class="page-title">                    
    <h2><span class="fas fa-pencil-alt"></span> Nuevo pedido en <b><?php echo $_SESSION["numeromesa"]; ?></b></h2>
</div>
<!--WIZARD PARA PEDIDOS-->
<div class="row">
    <div class="col-md-12 newo_menuContainer">
          

        <div id="ModalSeleccionaIngredientes" class="displaynone" >
            <div class="panel panel-default">
                <!-- Modal content-->
                <div class="panel-heading">
                    <div class="modal-header label-primary">
                        <button type="button" class="close closeingredientes" >&times;</button>
                        <center><h4 class="modal-title tituloSeleccionaIngredientes" style="color:white;"></h4></center>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12 contenidoSeleccionaIngredientes">
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <button type="button" class="btn btn-primary btnEnviaProducto pull-right" style="border: 1px solid;"><i class="fa fa-plus-circle" aria-hidden="true"></i> Añadir al pedido</button>
                        <button type="button" class="btn btn-default pull-right closeingredientes" ><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>
                    </div>
                </div>

            </div>
        </div>

        <div id="ModalSeleccionPizza" class="displaynone">
            <div class="panel panel-default">
                <!-- Modal content-->
                <div class="panel-content">
                    <div class="modal-header label-primary">
                        <button type="button" class="close closepizzas" >&times;</button>
                        <h4 class="modal-title tituloSeleccionPizza txt-primary" ></h4>
                    </div>
                    <div class="panel-body contenidoSeleccionPizza">
                    </div>
                    <div class="panel-body contentIngredientes" hidden>
                    </div>
                    <div class="panel-footer label-primary">
                        <button type="button" class="btn btn-primary pull-right btnEnviaSeleccion" style="border: 1px solid;display: none;"><i class="fa fa-plus-circle" aria-hidden="true"></i> Añadir al pedido</button>
                        <button type="button" class="btn btn-default pull-right closepizzas">
                          
                            
                            <i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar </button>
                    </div>
                </div>

            </div>
        </div>

        <!-- TODO -->
        <div id="ModalConfirmacion" class="displaynone" >
            <div class="panel panel-default">
                <!-- Modal content-->
                <div class="panel-content">
                    <div class="modal-header label-primary">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" style="color:white;text-align:center;">Confirmación de pedido</h4>
                    </div>
                    <div class="modal-body contenidoModalConfirmacion">
                    </div>
                    <div class="modal-footer label-primary">
                        <button type="button" class="btn btn-default closeConfirmacion" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary btnEnviaPedido" style="border: 1px solid;display: none;"><i class="fas fa-utensils" aria-hidden="true"></i> Enviar pedido a cocina</button>
                    </div>
                </div>

            </div>
        </div>
        <!-- TODO -->

        <div id="ModalPreferencias" class="displaynone" >
            <div class="panel panel-default">
                <!-- Modal content-->
                <div class="panel-content">
                    <div class="modal-header label-primary">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title tituloModalPreferencias" style="color:white;"></h4>
                    </div>
                    <div class="modal-body contentModalPreferencias">
                    </div>
                    <div class="modal-footer label-primary">
                        <button type="button" class="btn btn-default closePreferencias" data-dismiss="modal"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>
                        <button type="button" class="btn btn-primary btnguardapropiedades" style="border: 1px solid;"><i class="fa fa-plus-circle" aria-hidden="true"></i> Añadir al pedido</button>
                    </div>
                </div>

            </div>
        </div>

        <!-- TODO -->
        <div id="ModalSeleccionaProducto" class="displaynone">
            <div class="panel panel-default">
                <!-- Modal content-->
                <div class="panel-content">
                    <div class="modal-header label-primary">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title tituloSeleccionaProducto txt-primary" ></h4>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12 contenidoSeleccionaProducto">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer  label-primary">
                        <button type="button" class="btn btn-default pull-right closeSeleccionProducto"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>









