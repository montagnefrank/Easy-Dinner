<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
    <li id="showmodal">Caja</li>
</ul>
<!-- FIN BREADCRUMB -->

<div class="content-frame">     
    <!-- START CONTENT FRAME TOP -->
    <div class="content-frame-top">                        
        <div class="page-title">                    
            <h2 style="text-align: center;"><i class="fa fa-credit-card" aria-hidden="true"></i> Caja</h2>
        </div>   
    </div>                    
    <div class="content-frame-left">                      
        <div class="form-group push-up-10">
            <h4>Buscar Pedidos Facturados:</h4>
            <div class="input-group">
                <div class="input-group-addon"><span class="fa fa-search"></span></div>
                <input id="search_pedidos" type="text" class="form-control" placeholder="Buscar..">
            </div>
        </div>
        <div class="form-group">
            <h4>Pedidos:</h4> 
            <div class="list-group border-bottom" style="border-bottom: 1px solid #711b1b;border-radius: 4px;">
                <a href="#" class="list-group-item"><span class="fa fa-circle text-primary"></span> Por cancelar</a>
                <a href="#" class="list-group-item"><span class="fa fa-circle text-success"></span> Pagados</a>
                <a href="#" class="list-group-item"><span class="fa fa-circle text-info"></span> En cocina</a>
            </div>
        </div>
        <div class="widget widget-primary widget-item-icon">
            <div class="widget-item-right">
                <a href="index.php?panel=nuevodomicilio.php" style="color: white;" >
                    <span class="fa fa-plus-square"></span>
                </a>
            </div>                             
            <div class="widget-data-left">
                <div class="widget-int num-count">Domicilios</div>
                <div class="widget-title">
                    Nuevo pedido
                </div>
            </div>                                     
        </div>
        <div class="widget widget-primary widget-item-icon">
            <div class="widget-item-right">
                <a href="index.php?panel=parallevar.php" style="color: white;" >
                    <span class="fa fa-plus-square"></span>
                </a>
            </div>                             
            <div class="widget-data-left">
                <div class="widget-int num-count">Para llevar</div>
                <div class="widget-title">
                    Nuevo Pedido
                </div>
            </div>                                     
        </div>
    </div>           
    <!-- END CONTENT FRAME TOP -->
    <!-- START CONTENT FRAME BODY -->
    <div class="content-frame-body">
        <div class="row push-up-10">
            <div class="col-md-4">
                <h3>Pedidos Pagados</h3>
                <div class="tasks ui-sortable" id="pedidoscancelados">
                </div>
            </div>
            <div class="col-md-4">
                <h3>Pedidos por cancelar</h3>
                <div class="tasks ui-sortable" id="pedidosPorCancelar">
                </div>
            </div>
            <div class="col-md-4">
                <h3>Pedidos en cocina</h3>
                <div class="tasks ui-sortable" id="pedidosCocina">
                </div>
            </div>
        </div>
    </div>
    <!-- END CONTENT FRAME BODY -->
</div>
<div id="modal_consultar_factura" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" style="color:white;text-align: center;"><i class="fa fa-pencil-square-o"></i> Consultar Factura</h4>
            </div>
            <div class="modal-body" style="text-align: center">
                <div id="verfactura_datos">
                    <div class="col-md-6">
                        <div class="row">
                            <h1 class="pull-left" style="margin-top: 16px;"> Factura #: 
                                <span style="font-size: 20px;line-height: 30px;" class="badge badge-info verfactura_numero">FACTURA</span>
                            </h1>
                        </div>
                        <div class="row">
                            <button type="button" class="btn btn-primary btn-lg pull-left verfactura_nombrecliente" style="margin-top: 16px;">
                                <i class="fa fa-user" aria-hidden="true"></i> NOMBRE DE LA PERSONA
                            </button>
                            <button type="button" class="btn btn-info btn-md pull-left verfactura_ruc" style="margin-top: 16px;margin-left: 6px;">
                                <i class="fa fa-cube" aria-hidden="true"></i> RUC O CEDULA
                            </button>
                        </div>
                        <div class="row">
                            <h2 class="pull-left" style="margin-top: 16px;"> Fecha 
                                <span style="font-size: 20px;line-height: 30px;" class="badge badge-warning verfactura_fecha">FECHA</span>
                            </h2>
                        </div>
                        <div class="row">
                            <h6 class="pull-left" style="margin-top: 16px;"> Forma de Pago: 
                                <span style="font-size: 20px;line-height: 30px;" class="badge badge-success verfactura_formadepago">EFECTIVO</span>&nbsp;
                                <span style="font-size: 20px;line-height: 30px;" class="badge badge-info verfactura_voucher">VOUCHER</span>
                            </h6>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="invoice-address">
                            <h5 class="pull-left">Lugar: </h5>
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <td width="200">Subtotal:</td>
                                        <td class="text-right verfactura_subtotal">123123</td>
                                    </tr>
                                    <tr>
                                        <td width="200">Descuento:</td>
                                        <td class="text-right verfactura_decuento">123123</td>
                                    </tr>
                                    <tr>
                                        <td>IVA 12%:</td>
                                        <td class="text-right verfactura_iva">123123</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Total:</strong></td>
                                        <td class="text-right verfactura_total"><strong>$2,697.64</strong></td>
                                    </tr>
                                </tbody>
                            </table>   
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Cerrar</button>
            </div>
        </div>
    </div>
</div>

<table class="table table-striped" id="facturaimpresa" style="display: none;" >
    <tbody>
        
    </tbody>
</table>  