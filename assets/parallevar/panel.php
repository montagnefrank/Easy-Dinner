<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
    <li><a href="index.php?panel=domicilio.php">Domicilio</a></li>
    <li id="showmodal">Pedido para llevar</li>
</ul>
<!-- FIN BREADCRUMB -->
<div class="page-content-wrap">
    <div class="col-md-9">
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="page-title">                    
                    <h2><span class="fa fa-cutlery"></span> Nuevo pedido para llevar</h2>
                </div>
                <center>
                    <h2 class="numeroMesa"></h2>
                </center>
                <center>
                    <h5 class="idPedido"></h5>
                </center>
                <div class="invoice">
                    <div class="row">
                        <div class="col-md-12 border-primary" style="border: 1px solid ;border-radius: 6px;padding: 20px;">
                            <div class="col-md-12">
                                <h3>1. Selección de cliente</h3>
                            </div>
                            <div class="col-md-12">
                                <div class="col-md-6">
                                    <label for="cedula_cliente" class="col-md-3 control-label" style="padding: 5px;text-align: right;">Cédula/RUC</label>
                                    <div class="col-md-9" style="padding: 5px;">
                                        <input type="text" class="form-control" id="cedula_cliente" placeholder="Ingrese la cédula de identidad del cliente">
                                        <input type="hidden" class="form-control" id="id_cliente" placeholder="Ingrese la cédula de identidad del cliente">
                                    </div>
                                    <label for="telefono_cliente" class="col-md-3 control-label" style="padding: 5px;text-align: right;">Teléfono</label>
                                    <div class="col-md-9" style="padding: 5px;">
                                        <input type="text" class="form-control" id="telefono_cliente" placeholder="Teléfono" >
                                    </div>
                                    <label for="email_cliente" class="col-md-3 control-label" style="padding: 5px;text-align: right;">Email</label>
                                    <div class="col-md-9" style="padding: 5px;">
                                        <input type="email" class="form-control" id="email_cliente" placeholder="Email" disabled>
                                    </div>

                                </div>
                                <div class="col-md-6">
                                    <label for="nombre_cliente" class="col-md-3 control-label" style="padding: 5px;text-align: right;">Cliente</label>
                                    <div class="col-md-9" style="padding: 5px;">
                                        <input type="text" class="form-control" id="nombre_cliente" placeholder="Nombre del cliente" required>
                                    </div>
                                    <label for="direccion_cliente" class="col-md-3 control-label" style="padding: 5px;text-align: right;">Dirección</label>
                                    <div class="col-md-9" style="padding: 5px;">
                                        <input type="text" class="form-control" id="direccion_cliente" placeholder="Dirección del cliente" disabled>
                                    </div>
                                    <label for="fecha_actual" class="col-md-3 control-label" style="padding: 5px;text-align: right;">Fecha</label>
                                    <div class="col-md-9" style="padding: 5px;">
                                        <input type="text" class="form-control input-sm" id="fecha_actual" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="push-down-10 pull-right">
                                <button class="btn btn-default btnEliminaCliente" style="display:none;" data-toggle="modal" data-target="#eliminaCliente">
                                    <i class="fa fa-trash" aria-hidden="true"></i> Eliminar cliente
                                </button>
                                <button class="btn btn-default btnEditaCliente" style="display:none;" data-toggle="modal" data-target="#editaCliente">
                                    <i class="fa fa-edit" aria-hidden="true"></i> Editar cliente
                                </button>
                                <button type="button" class="btn btn-default" data-toggle="modal" data-target="#nuevoCliente">
                                    <span class="glyphicon glyphicon-user"></span> Nuevo cliente
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <br>
                        <div class="col-md-12 border-primary" style="border: 1px solid;border-radius: 6px;padding: 20px;">
                            <div class="col-md-12">
                                <h3>2. Selección de productos</h3>
                            </div>
                            <div class="col-md-12">
                                <center>
                                    <div class="btn-group radioSeleccionproductos" data-toggle="buttons">
                                        <label class="btn btn-primary active">
                                            <input type="radio" name="options" value="" autocomplete="off" checked="">Seleccione ..</label>
                                        <label class="btn btn-primary">
                                            <input type="radio" name="options" id="codigo" value="codigo" autocomplete="off">Código de producto
                                        </label>
                                        <label class="btn btn-primary">
                                            <input type="radio" name="options" id="dom_mostrarmenu" value="menu" autocomplete="off">Menú de productos
                                        </label>
                                    </div>
                                </center>
                                <div class="col-md-8 col-md-offset-2 dom_codigoproducto" style="margin-top: 32px;" hidden>
                                    <label for="email_cliente" class="col-md-4 control-label" style="padding: 5px;text-align: right;">C&oacute;digo del producto</label>
                                    <div class="col-md-8" style="padding: 5px;">
                                        <input type="text" class="form-control" id="parallevar_cod_dirulo" placeholder="Ingrese el c&oacute;digo de producto aquí">
                                    </div>
                                    <br><br>
                                </div>
                                <div id="menuwizard" class="panel panel-default displaynone dom_menupanel ">
                                    <div class="panel-body">
                                        <br>
                                        <center><h4>Seleccione los pedidos del men&uacute;</h4></center>
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


                                <!---------------------------------------------------------------------->

                                <div id="ModalSeleccionaProducto" class="displaynone" >
                                    <div class="panel panel-default">
                                        <!-- Modal content-->
                                        <div class="panel-content">
                                            <div class="modal-header label-primary">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                <h4 class="modal-title tituloSeleccionaProducto" style="color:white;"></h4>
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

                                <div id="ModalPreferencias" class="displaynone" >
                                    <div class="panel panel-default">
                                        <!-- Modal content-->
                                        <div class="panel-content">
                                            <div class="modal-header label-primary">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                <h4 class="modal-title tituloModalPreferencias" style="color:white;"></h4>
                                            </div>
                                            <div class="panel-body contentModalPreferencias">
                                            </div>
                                            <div class="modal-footer label-primary">
                                                <button type="button" class="btn btn-default closePreferencias" data-dismiss="modal"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>
                                                <button type="button" class="btn btn-primary btnguardapropiedades" style="border: 1px solid;"><i class="fa fa-plus-circle" aria-hidden="true"></i> Añadir al pedido</button>
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
                                                <h4 class="modal-title" style="color:white;text-align:center;">Confirmación de pedido</h4>
                                            </div>
                                            <div class="panel-body contenidoModalConfirmacion">
                                            </div>
                                            <div class="modal-footer label-primary">
                                                <button type="button" class="btn btn-default closeConfirmacion" data-dismiss="modal">Cerrar</button>
                                                <button type="button" class="btn btn-primary btnEnviaPedido" style="border: 1px solid;display: none;"><i class="fa fa-cutlery" aria-hidden="true"></i> Enviar pedido a cocina</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <!--MODAL PARA LAS PIZZAS--> 
                                <div id="ModalSeleccionPizza" class="displaynone">
                                    <div class="panel panel-default">
                                        <!-- Modal content-->
                                        <div class="panel-content">
                                            <div class="modal-header label-primary">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                <h4 class="modal-title tituloSeleccionPizza" style="color:white;"></h4>
                                            </div>
                                            <div class="panel-body contenidoSeleccionPizza">
                                            </div>
                                            <div class="panel-body label-primary contentIngredientes" hidden>
                                            </div>
                                            <div class="panel-footer label-primary">
                                                <button type="button" class="btn btn-primary pull-right btnEnviaSeleccion" style="border: 1px solid;display: none;"><i class="fa fa-plus-circle" aria-hidden="true"></i> Añadir al pedido</button>
                                                <button type="button" class="btn btn-default pull-right closepizzas"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <!--MODAL PARA SELECCIONAR LOS INGREDIENTES-->
                                <div id="ModalSeleccionaIngredientes" class="displaynone" >
                                    <div class="panel panel-default">
                                        <!-- Modal content-->
                                        <div class="panel-content">
                                            <div class="modal-header label-primary">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
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
                                <!---------------------------------------------------------------------->
                                <br><br>
                                <div id="resumen_pedido" class="panel-body">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <br>
                        <div class="col-md-12 border-primary" style="border: 1px solid ;border-radius: 6px;padding: 20px;">
                            <div class="col-md-12">
                                <h3>3. Sección de pagos</h3>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <br>
                                    <h4>Metodos de pago</h4>
                                    <div class="paymant-table" id="payment_methods_table">
                                        <div class="col-md-12 payment_method_single" style="align-items: center;-webkit-box-align: center;display: flex;">
                                            <div class="col-md-2">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" class="chkMetodoPago" value="EFECTIVO" id="checkbox_efectivo">
                                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <a>
                                                    <img src="img/cards/efectivo.png"> Efectivo
                                                    <p>PAGO MONETARIO</p>
                                                </a>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="table-responsive valorEfectivo" hidden>
                                                    <table class="table">
                                                        <tbody class="contentEfectivo">
                                                            <tr>
                                                                <td style="width:25%;padding:2px;">
                                                                    <div class="form-group">
                                                                        <label for="valor" class="control-label">$$</label>
                                                                        <input type="text" onkeypress="return validateFloatKeyPress(this, event);" class="form-control monto_a_pagar" id="valorefectivo" name="valorvisa" placeholder="$0.00" required>
                                                                    </div>
                                                                </td>
                                                                <td style="width:65%;padding:2px;">
                                                                    <div class="form-group">
                                                                        <label for="valor" class="control-label">$$ a devolver</label>
                                                                        <input type="text" style="color: black;" readonly="readonly" class="form-control" id="monto_devuelto" placeholder="Monto devuelto" required>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 payment_method_single" style="align-items: center;-webkit-box-align: center;display: flex;">
                                            <div class="col-md-2">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" class="chkMetodoPago" value="VISA" id="checkbox_tdc">
                                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <a>
                                                    <img src="img/cards/visa.png"> Visa
                                                    <p>TARJETA CREDITO/DEBITO</p>
                                                </a>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="table-responsive tablaVisa" hidden>
                                                    <table class="table">
                                                        <tbody class="contentVisa">
                                                            <tr>
                                                                <td style="width:25%;padding:2px;">
                                                                    <div class="form-group">
                                                                        <label for="valor" class="control-label">$$</label>
                                                                        <input type="text" onkeypress="return validateFloatKeyPress(this, event);" class="form-control monto_a_pagar" id="valorvisa" name="valorvisa" placeholder="$0.00" required>
                                                                    </div>
                                                                </td>
                                                                <td style="width:40%;padding:2px;">
                                                                    <div class="form-group">
                                                                        <label for="valor" class="control-label"># Ref</label>
                                                                        <input type="text" class="form-control id_formadepago" id="vouchervisa" name="vouchervisa" placeholder="Referencia" required>
                                                                    </div>
                                                                </td>
                                                                <td style="width:25%;padding:2px;">
                                                                    <div class="form-group">
                                                                        <label for="valor" class="control-label"># Lote</label>
                                                                        <input type="text" class="form-control id_formadepago" id="vouchervisa" name="vouchervisa" placeholder="Lote" required>
                                                                    </div>
                                                                </td>
                                                                <td style="width:10%;padding:2px;">
                                                                    <div style="padding-top: 30px;">
                                                                    </div>
                                                                    <span class="fa fa-plus agregavoucher" aria-hidden="true" style="cursor:pointer;" data-toggle="tooltip" data-placement="top" title="Añade un voucher"></span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 payment_method_single" style="align-items: center;-webkit-box-align: center;display: flex;">
                                            <div class="col-md-2">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" class="chkMetodoPago" value="CHEQUE" id="checkbox_cheque">
                                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <a>
                                                    <img src="img/cards/cheque.png"> Cheque
                                                    <p>DOCUMENTO DE VALOR</p>
                                                </a>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="table-responsive tablaCheque" hidden>
                                                    <table class="table">
                                                        <tbody class="contentCheque">
                                                            <tr>
                                                                <td style="width:25%;padding:2px;">
                                                                    <div class="form-group">
                                                                        <label for="valorcheque" class="control-label">$$</label>
                                                                        <input type="text" onkeypress="return validateFloatKeyPress(this, event);" class="form-control monto_a_pagar" id="valorCheque" name="valorCheque" placeholder="$0.00" required>
                                                                    </div>
                                                                </td>
                                                                <td style="width:65%;padding:2px;">
                                                                    <div class="form-group">
                                                                        <label for="nrocheque" class="control-label"># Cheque</label>
                                                                        <input type="text" class="form-control id_formadepago" id="nrocheque" name="nrocheque" placeholder="# Cheque" required>
                                                                    </div>
                                                                </td>
                                                                <td style="width:10%;padding:2px;">
                                                                    <div style="padding-top: 30px;">
                                                                    </div>
                                                                    <span class="fa fa-plus agregacheque" aria-hidden="true" style="cursor:pointer;" data-toggle="tooltip" data-placement="top" title="Añade un cheque"></span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <h4>DETALLE DE PAGO</h4>
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <td width="200"><strong>SUB TOTAL:</strong></td>
                                        <td class="text-right subtotalFactura"></td>
                                    </tr>
                                    <tr>
                                        <td><strong>DESCUENTO:</strong></td>
                                        <td class="text-right descuentoFactura">
                                            <input style="width: 50%" type="text" id="descuento_factura" class="form-control pull-right" placeholder="$$" required>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>IVA (12%):</strong></td>
                                        <td class="text-right ivaFactura"></td>
                                    </tr>
                                    <tr class="total">
                                        <td>TOTAL A PAGAR :</td>
                                        <td class="text-right totalapagarFactura"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-12">
                        <div class="pull-right push-down-20">
                            <button class="btn btn-success" id="payment_checkout"><span class="fa fa-credit-card"></span> Proceder al Pago</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3" id="panel_infocliente">
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="panel-title-box">
                    <h3>Resumen del cliente</h3>
                    <span id="ultimosmeses_resumen">Datos de las &uacute;ltimas operaciones del cliente</span>
                </div>
            </div>
            <div class="panel-body" >
                <div class="col-md-12 displaynone" id="fact_top1">                        
                    <a href="#" class="tile tile-info tile-valign">
                        <div class="informer informer-default dir-tl">
                            <span class="fa fa-plus-square"></span> El m&aacute;s pedido
                        </div>
                        <div class="informer informer-default dir-bl">
                            <span class="fa fa-shopping-cart"></span> Total <span class="top1cant">45</span>
                        </div>
                        <span class="top1">Texto</span>
                    </a>                        
                </div>
                <div class="col-md-12 fontx1-5 displaynone">
                    <b>Total Comprado:</b>
                    <span class="label label-primary comprado">$1.111</span>
                </div>
                <div class="col-md-12 displaynone">
                    <div class="widget widget-success widget-carousel">
                        <div class="owl-carousel" >
                            <div id="last1">    
                                <div class="widget-title">1</div>                                                                                                     
                                <div class="widget-subtitle">1</div>
                                <div class="widget-int">1</div>
                            </div>
                            <div id="last2">      
                                <div class="widget-title">2</div>                              
                                <div class="widget-subtitle">2</div>
                                <div class="widget-int">2</div>
                            </div>
                            <div id="last3">   
                                <div class="widget-title">3</div>                                 
                                <div class="widget-subtitle">3</div>
                                <div class="widget-int">3</div>
                            </div>
                        </div>                                 
                    </div>
                </div>
                <div class="col-md-12 displaynone" id="fact_comentario">
                    <div class="form-group">
                        <label>Comentario</label>
                        <textarea class="form-control comentario" rows="3" disabled></textarea>
                        <button class="btn btn-primary pull-right" id="coment_edit"><i class="fa fa-edit" aria-hidden="true"></i>Editar </button>
                        <button class="btn btn-success pull-right displaynone2" id="coment_save"><i class="fa fa-save" aria-hidden="true"></i> Actualizar</button>
                    </div>   
                </div>
            </div>
        </div>
    </div>
</div>

<!-- MODAL NUEVO CLIENTE -->
<div id="nuevoCliente" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" style="color:white;text-align: center;"><i class="glyphicon glyphicon-edit"></i> Agregar nuevo cliente</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" method="post" id="guardar_cliente" name="guardar_cliente">
                    <div class="form-group">
                        <label for="nombre" class="col-sm-3 control-label">Cédula / RUC</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="cedula" name="cedula" placeholder="Ingrese la cédula o RUC del cliente" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="nombre" class="col-sm-3 control-label">Nombre</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingrese el nombre y apellido del cliente" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="telefono" class="col-sm-3 control-label">Teléfono</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="telefono" name="telefono" placeholder="Ingrese el teléfono del cliente" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email" class="col-sm-3 control-label">Email</label>
                        <div class="col-sm-8">
                            <input type="email" class="form-control" id="email" name="email" placeholder="Ingrese el email del cliente" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="direccion" class="col-sm-3 control-label">Dirección</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" id="direccion" name="direccion" maxlength="255" placeholder="Ingrese la dirección del cliente" required></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Cerrar</button>
                <button type="button" class="btn btn-primary btnRegistraCliente" style="border: 1px solid;"><i class="fa fa-user-plus" aria-hidden="true"></i> Registrar Cliente</button>
            </div>
        </div>
    </div>
</div>
<!-- MODAL EDITA CLIENTE -->
<div id="editaCliente" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" style="color:white;text-align: center;"><i class="glyphicon glyphicon-edit"></i> Editar cliente</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" method="post" id="editar_cliente" name="editar_cliente">
                    <div class="form-group">
                        <label for="nombre" class="col-sm-3 control-label">Cédula / RUC</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="cedula" name="cedula" placeholder="Ingrese la cédula o RUC del cliente" required disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="nombre" class="col-sm-3 control-label">Nombre</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingrese el nombre y apellido del cliente" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="telefono" class="col-sm-3 control-label">Teléfono</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="telefono" name="telefono" placeholder="Ingrese el teléfono del cliente" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email" class="col-sm-3 control-label">Email</label>
                        <div class="col-sm-8">
                            <input type="email" class="form-control" id="email" name="email" placeholder="Ingrese el email del cliente" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="direccion" class="col-sm-3 control-label">Dirección</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" id="direccion" name="direccion" maxlength="255" placeholder="Ingrese la dirección del cliente" required></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Cerrar</button>
                <button type="button" class="btn btn-primary btnEditarCliente" style="border: 1px solid;"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar Cliente</button>
            </div>
        </div>
    </div>
</div>
<!-- MODAL ELIMINA CLIENTE -->
<div id="eliminaCliente" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" style="color:white;text-align: center;"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar cliente</h4>
            </div>
            <div class="modal-body contenidoElimina">
            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Cerrar</button>
                <button type="button" class="btn btn-primary btnConfirmaEliminaCliente" style="border: 1px solid;"><i class="fa fa-trash-o" aria-hidden="true"></i> Si, eliminar cliente</button>
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
                <h4 class="modal-title" style="color:white;text-align: center;"><i class="glyphicon glyphicon-edit"></i> Titulo</h4>
            </div>
            <div class="modal-body" style="text-align: center">
                <div class="col-md-8">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <h2><span class="fa fa-list-alt"></span> Pedidos de la mesa</h2>
                            <div class="user">
                                <a href="#" class="name resumen_numerodepedido">Numero de pedido</a>
                                <div class="pull-right" style="width: 100px;">
                                    <button class="btn btn-info btn-block resumen_numeromesa"><span class="fa fa-thumb-tack"></span> Mesa</button>
                                </div>
                                <div class="pull-right" style="width: 100px; margin-right:16px;">
                                    <button class="btn btn-primary btn-block resumen_fecha"><i class="fas fa-clock"></i> Fecha</button>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body list-group">
                            <div class="list-group-item">
                                <b><a href="#">Cantidad</a>  PIZZA DIRULO</b> Combinada.<br/>
                                <span class="text-muted">Precio</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <ul class="list-group border-bottom">
                        <li class="list-group-item">SUB TOTAL <span class="badge resumen_subtotal"></span></li>
                        <li class="list-group-item">DESCUENTO <span class="badge badge-danger resumen_sdescuento"></span></li>
                        <li class="list-group-item">IVA 12(%) <span class="badge badge-info resumen_iva"></span></li>
                        <li class="list-group-item">FORMA DE PAGO <span class="badge badge-success resumen_forma_pago"></span></li>
                        <li class="list-group-item">VUELTO A ENTREGAR<span class="badge badge-warning resumen_vuelto"></span></li>
                    </ul>     
                    <button type="button" class="btn btn-primary btn-lg" style="margin-top: 16px;" id="facturarpedido_btn"><i class="fa fa-file-text" aria-hidden="true"></i> FACTURAR PEDIDO</button>
                </div>
            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Cerrar</button>
            </div>
        </div>
    </div>
</div>
<!--ANIMACION DE CARGANDO FACTURA-->
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
<!--TABLA PARA LA PREFACTURA-->
<table class="table table-striped" id="prefacturar" style="display: none;" >
    <tbody>

    </tbody>
</table>




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


