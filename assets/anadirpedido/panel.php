<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
</ul>
<!-- FIN BREADCRUMB -->

<div class="page-title">                    

</div>
<!--WIZARD PARA PEDIDOS-->
<div class="row">
    <div class="col-md-12" style="background-color:white;">
        <div id="menuwizard" class="panel panel-default" style="border: 1px solid gainsboro;">
            <div class="panel-body">
                <h3>Menú Di Rulo</h3>
                <a id="autoscroll"></a>
                <div class="wizard show-submit">
                    <ul>
                        <li>
                            <a href="#step-1">
                                <span class="stepNumber">1</span>
                                <span class="stepDesc">Tomar pedido<br /><small>Elaborar el pedido</small></span>
                            </a>
                        </li>
                        <li>
                            <a href="#step-2">
                                <span class="stepNumber">2</span>
                                <span class="stepDesc">Procesar pedidos<br /><small>Enviar a la cocina</small></span>
                            </a>
                        </li>
                    </ul>
                    <div id="step-1" style="padding-top:100px;">
                        <h4>Seleccione los pedidos del men&uacute;</h4>
                        <div class="col-md-12">
                            <!-- START TABS -->
                            <div class="panel panel-default tabs">
                                <ul class="nav nav-tabs tabMenu" role="tablist">
                                </ul>
                            </div>
                            <div class="panel-body tab-content tabContent">
                            </div>                                                  
                            <!-- END TABS -->                        
                        </div>
                    </div>
                    <div id="step-2">
                        <!-- PEDIDO -->
                        <div class="col-md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Pedido total</h3> 
                                </div>
                                <div id="resumen_pedido" class="panel-body list-group list-group-contacts">  
                                </div>
                            </div>
                        </div>
                        <!-- FIN PEDIDO -->
                    </div>         
                </div>
            </div>
        </div>   
        <!-- FIN WIZARD -->

        <div class="modal" id="modal_small" tabindex="-1" role="dialog" aria-labelledby="smallModalHead" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button>
                        <h4 class="modal-title" id="smallModalHead">En construcci&oacute;n</h4>
                    </div>
                    <div class="modal-body">
                        Ventana en construcci&oacute;n
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>                        
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade ModalConfirmacion" id="modal_small" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button>
                        <h4 class="modal-title txt-primary" id="smallModalHead">Confirmación de envio de pedido</h4>
                    </div>
                    <div class="modal-body contenidoModalConfirmacion">
                        Ventana en construcción
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>                        
                    </div>
                </div>
            </div>
        </div>  

        <div id="ModalConfirmacion" class="displaynone" >
            <div class="panel panel-default">
                <!-- Modal content-->
                <div class="panel-content">
                    <div class="modal-header label-primary">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title txt-primary" style="text-align:center;">Confirmación de pedido</h4>
                    </div>
                    <div class="modal-body contenidoModalConfirmacion">
                    </div>
                    <div class="modal-footer label-primary">
                       <button type="button" class="btn btn-default closeConfirmacion" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary btnEnviaPedido" style="border: 1px solid;display: none;"><i class="fa fa-cutlery" aria-hidden="true"></i> Enviar pedido a cocina</button>
                    </div>
                </div>

            </div>
        </div>

        <div id="ModalSeleccionPizza" class="displaynone" >
            <div class="panel panel-default">
                <!-- Modal content-->
                <div class="panel-content">
                    <div class="modal-header label-primary">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title tituloSeleccionPizza txt-primary" ></h4>
                    </div>
                    <div class="panel-body contenidoSeleccionPizza">
                    </div>
                    <div class="panel-body contentIngredientes" hidden>
                    </div>
                    <div class="panel-footer label-primary">
                        <button type="button" class="btn btn-primary pull-right btnEnviaSeleccion" style="border: 1px solid;display: none;"><i class="fa fa-plus-circle" aria-hidden="true"></i> Añadir al pedido</button>
                        <button type="button" class="btn btn-default pull-right closepizzas"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>
                    </div>
                </div>

            </div>
        </div>
        <div id="ModalPreferencias" class="displaynone">
            <div class="panel panel-default">
                <!-- Modal content-->
                <div class="panel-content">
                    <div class="modal-header label-primary">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title tituloModalPreferencias txt-primary" ></h4>
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
        <div id="ModalSeleccionaIngredientes" class="displaynone">
            <div class="panel panel-default">
                <!-- Modal content-->
                <div class="panel-heading">
                    <div class="modal-header label-primary">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <center><h4 class="modal-title tituloSeleccionaIngredientes txt-primary" ></h4></center>
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


    </div>
</div>
