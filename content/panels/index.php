<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
    <li>Mesas </li>
</ul>
<!-- FIN BREADCRUMB -->
<div class="page-title">      
    <div class="col-md-12 col-sm-12">
        <div class="col-md-6 col-sm-6">
            <h2 style="text-align: center;"><span class="fa fa-list-alt"></span> Informaci&oacute;n de las mesas</h2>
        </div>
        <div class="col-md-3 col-sm-3">
            <button class="btn btn-success btn-block mesas-disp" style="font-size: 16px;">
            </button>  
        </div>
        <div class="col-md-3 col-sm-3">
            <button class="btn btn-primary btn-block mesas-ocu" style="font-size: 16px;">
            </button>  
        </div>
    </div>
</div>
<div class="col-md-12">
    <div class="panel panel-default">  
        <div id="autoscroll" class="panel-body panel-body-image" style="background-image: url('img/resumenmesas.jpg');height: 600px;">
            <!--<img src="img/resumenmesas.jpg" alt="Landing Page banner">-->
            <div class="col-md-12 contenedorPedido" style="padding: 30px;">
                <div class="col-md-6">
                    <div class="widget widget-primary widget-item-icon">
                        <div class="widget-item-right">
                            <a href="#" style="color: white;" class="btnNuevoPedido">
                                <i class="fas fa-plus-square fa-5x"></i>
                            </a>
                        </div>                             
                        <div class="widget-data-left">
                            <div class="widget-int num-count">Nuevo Pedido</div>
                            <div class="widget-title">
                                <div class="form-group">
                                    <select class="form-control" id="selectMesas">
                                    </select>
                                </div>
                            </div>
                            <div class="widget-subtitle">Seleccione la mesa</div>
                        </div>                                     
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="ModalEstadoPedido" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title tituloEstadoPedido" style="color:white;"></h4>
            </div>
            <div class="modal-body contenidoEstadoPedido">
            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-primary pedido_imprimir"><i class="fa fa-print" aria-hidden="true"></i> Imprimir</button>
                <button type="button" class="btn btn-primary btnAnadirPedido"><i class="fa fa-plus" aria-hidden="true"></i> Añadir Pedido</button>
                <button type="button" class="btn btn-primary"><i class="fa fa-circle-o" aria-hidden="true"></i> Mesa habilitada</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>

    </div>
</div>
<div class="modal fade modalCancelar" id="modal_small" tabindex="-1" role="dialog" aria-labelledby="smallModalHead" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content ">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button>
                <h4 class="modal-title" id="smallModalHead" style="color:white;"><center>Cancelar pedido</center></h4>
            </div>
            <div class="modal-body contenidoCancelar">



            </div>
            <div class="modal-footer label-primary">
                <center>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>  
                    <button type="button" class="btn btn-primary confirmaCancelaPedido" style="border: 1px solid;"><i class="fa fa-times" aria-hidden="true"></i> Cancelar pedido</button>
                </center>
            </div>
        </div>
    </div>
</div>
<div id="ModalEditaIngredientes" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <center><h4 class="modal-title tituloEditaIngredientes" style="color:white;"></h4></center>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 contenidoEditaIngredientes">
                    </div>
                </div>
            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Cerrar</button>
                <button type="button" class="btn btn-primary btnEnviaProducto" style="border: 1px solid;"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar pedido</button>
            </div>
        </div>
    </div>
</div>
<div id="ModalEditaPizza" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title tituloEditaPizza" style="color:white;"></h4>
            </div>
            <div class="modal-body contenidoEditaPizza">
            </div>
            <div class="modal-body label-primary contentIngredientes" hidden>
            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Cerrar</button>
                <button type="button" class="btn btn-primary btnEnviaSeleccion" style="border: 1px solid;"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar pedido</button>
            </div>
        </div>

    </div>
</div>


