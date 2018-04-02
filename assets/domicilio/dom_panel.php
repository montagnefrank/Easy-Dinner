<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
    <li><a href="index.php?panel=domicilio.php">Domicilio</a></li>
</ul>
<!-- FIN BREADCRUMB -->
<div class="page-title">      
    <div class="col-md-12 col-sm-12">
        <div class="col-md-6 col-sm-6">
            <h2 style="text-align: center;"><span class="fa fa-list-alt"></span> Informaci&oacute;n de los domicilios</h2>
        </div>
        <div class="col-md-6 col-sm-6">
            <button class="btn btn-success btn-block mesas-disp" style="font-size: 16px;">
            </button>  
        </div>
    </div>
</div>
<div class="col-md-12">
    <div class="panel panel-default">  
        <div id="autoscroll" class="panel-body panel-body-image" style="background-image: url('img/resumenmesas.jpg');height: 600px;">
            <!--<img src="img/resumenmesas.jpg" alt="Landing Page banner">-->
            <div class="col-md-12 contenedorPedido" style="padding: 30px;">
                <div class="col-md-4">
                    <form id="newdom_form" style="display: none;" method="POST" action="index.php?panel=domicilio.php">
                        <input type="hidden" name="nuevodmicilio" value="nuevodmicilio">
                    </form>
                    <div class="widget widget-primary widget-item-icon" id="newdom_btn">
                        <div class="widget-item-right">
                            <a href="index.php?panel=nuevodomicilio.php" style="color: white;" class="btnNuevoPedido">
                                <span class="fa fa-plus-square"></span>
                            </a>
                        </div>                             
                        <div class="widget-data-left">
                            <div class="widget-int num-count">Nuevo Domicilio</div>
                        </div>                                     
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="widget widget-primary widget-item-icon">
                        <div class="widget-item-right">
                            <a href="index.php?panel=parallevar.php" style="color: white;" class="btnNuevoPedido">
                                <span class="fa fa-plus-square"></span>
                            </a>
                        </div>                             
                        <div class="widget-data-left">
                            <div class="widget-int num-count">Para llevar</div>
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
                <button type="button" class="btn btn-primary btnAnadirPedido"><i class="fa fa-plus" aria-hidden="true"></i> Editar Pedido</button>
                <button type="button" class="btn btn-primary modal_facturarpedido_btn"><i class="fa fa-list-ul" aria-hidden="true"></i> Facturar pedido</button>
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
<!-- MODAL CHECKOUT FACTURA-->
<div id="factura_checkout" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title tituloFactura" style="color:white;text-align: center;"></h4>
            </div>
            <div class="modal-body" style="text-align: center">

            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div class="message-box animated fadeIn" id="mb-loading">
    <div class="mb-container">
        <div class="mb-middle">
            <div class="mb-title"><span class="fa fa-bell"></span> Estamos procesando su solicitud</div>
            <div class="mb-content" style="text-align: center;">
                <img id="pizza_loading" src="img/loading.gif" style="width:25%; margin: auto;" />
                <div id="success_icon" class="svg" style="display:none; text-align: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 30%; margin: auto;" viewBox="-263.5 236.5 26 26">
                        <g class="svg-success">
                            <circle cx="-250.5" cy="249.5" r="12"/>
                            <path d="M-256.46 249.65l3.9 3.74 8.02-7.8"/>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>
<table class="table table-striped" id="prefacturar" style="display: none;" >
    <tbody>

    </tbody>
</table>