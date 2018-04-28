<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
    <li id="showmodal">inventario </li>
</ul>
<!-- FIN BREADCRUMB -->
<div class="col-md-12 col-sm-12">
    <h2><span class="fa fa-list-alt"></span> Gestionar la existencia de inventario</h2>
</div>
<div class="row quickreg_drawer hidethis">
    <div class="col-md-12">
        <div class="widget widget-primary widget-item-icon">
            <div class="widget-item-left">
                <i class="fas fa-pencil-alt fa-5x"></i>
            </div>
            <div class="widget-data">
                <div class="widget-title">Modificar Inventario</div>
                <div class="widget-subtitle">
                    <div role="alert" class="">
                        <button class="btn btn-danger pushtop_32 cancel_btn_newreg" ><i class="fas fa-times"></i> Cancelar</button>
                        <button class="btn btn-success pushtop_32 btn_newreg" ><i class="fas fa-save"></i> Guardar</button>
                    </div>
                </div>
            </div>                            
        </div>
    </div>
</div>

<?php //<!--INGREDIENTES RESUMEN-->?>
<div class="col-md-12 ingredientes_lista">
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="panel-title-box">
                <h3>Ingredientes</h3>
                <span>Resumen de inventario</span> <button class="btn btn-info addnew_ing_btn" style="margin-left: 16px;"><i class="fa fa-plus-square fa-lg"></i> Nuevo</button>
                 <button class="btn btn-warning listadohistorico_btn" style="margin-left: 16px;"><i class="fa fa-list fa-lg"></i> Listado</button>
            </div>                                    
            <ul class="panel-controls" style="margin-top: 2px;">
                <li><a id="ingredientes_toggle_list" href="#" class="panel-fullscreen"><span class="fa fa-expand"></span></a></li>
                <li><a href="#" class="panel-collapse"><span class="fa fa-angle-down"></span></a></li>
                <li><a href="#" class="panel-remove"><span class="fa fa-times"></span></a></li>                                 
            </ul>
        </div>
        <div id="ingredientes_botonera_small" class="panel-footer text-center">                                                                                                                                                                                                           
            <div class="btn-group">
                <button id="ingredientes_quitosur_btn" class="btn btn-primary">Quito Sur</button>
                <button id="ingredientes_villaflora_btn" class="btn btn-primary">Villaflora</button>                                                
                <button id="ingredientes_quitonorte_btn" class="btn btn-primary">Quito Norte</button>                                        
            </div>     
        </div> 
        <div id="ingredientes_graph_peq" class="panel-body panel-body-table" >
            <div class="table-responsive" >
                <input id="selected_dinner" type='hidden' value="1">
                <table class="table table-condensed table-bordered table-striped">
                    <thead>
                        <tr>
                            <th width="15%">Producto</th>
                            <th width="10%">Cantidad</th>
                            <th width="10%">Modificar</th>
                            <th width="10%">Codigo</th>
                            <th width="10%">Precio</th>
                            <th width="5%">Unidad</th>
                            <th width="10%">Estado</th>
                            <th width="10%">Fecha</th>
                            <th width="10%">Tipo</th>
                            <th width="10%">Editar</th>
                        </tr>
                    </thead>
                    <tbody class="listadeingredientes">
                    </tbody>
                </table>
            </div>
        </div>      
    </div>
</div>

<?php //<!-- AGREGAR INGREDIENTE --> ?>
<div class="col-md-8 agregarnuevo_panel" style="display:none;">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3><i class="fa fa-plus-circle"></i> Nuevo ingrediente</h3>
        </div>
        <div class="panel-body">
            <form role="form" method="post" id="guardarIngrediente" name="guardarIngrediente">
                <div class="form-group col-md-4">
                    <label class="control-label">Nombre</label>
                    <input type="text" class="form-control textinput" id="nombre_new" name="nombre" placeholder="Nombre del ingrediente" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Cantidad</label>
                    <input type="text" class="form-control textinput numonly" id="cantidad_new" name="cantidad" placeholder="Cantidad a modificar" required>
                </div>                                     
                <div class="form-group col-md-4">
                    <label class="control-label">C&oacute;digo</label>
                    <input type="text" class="form-control textinput" id="codigo_new" name="codigo" placeholder="Identifcador " required>
                </div>                          
                <div class="form-group col-md-4">
                    <label class="control-label">Codigo de Barras</label>
                    <input type="text" class="form-control textinput" id="barcode_new" name="barcode" placeholder="Codigo de barras" required>
                </div>                                                                            
                <div class="form-group col-md-4">
                    <label class="control-label">Unidad</label>
                    <select class="form-control select" data-style="btn-primary" id="unidadselect_new">
                        <option value='0'>Seleccione</option>
                        <option value='1'>Unidad</option>
                        <option value='2'>KG</option>
                        <option value='3'>0.25KG</option>
                    </select>
                </div>                                                                          
                <div class="form-group col-md-4">
                    <label class="control-label">Tipo de Ingrediente</label>
                    <select class="form-control select" data-style="btn-primary" id="tiposelect_new">
                        <option value='0'>Grupo del menu</option>
                        <option value='1'>General</option>
                        <option value='2'>Pastas</option>
                        <option value='3'>Carnes</option>
                        <option value='4'>Pizzas</option>
                        <option value='5'>Crepes & Postres</option>
                        <option value='6'>Bebidas</option>
                        <option value='7'>Ensaladas & Bocaditos</option>
                    </select>
                </div>  
                <div class="form-group col-md-4">
                    <label class="control-label">Cuenta contable</label>
                    <input type="text" class="form-control textinput" id="cuneta_new" name="cuneta" placeholder="Cuenta contable del producto" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Detalle</label>
                    <input type="text" class="form-control textinput" id="detalle_new" name="detalle" placeholder="Detalle del producto" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Bodega</label>
                    <input type="text" class="form-control textinput" id="bodega_new" name="bodega" placeholder="Bodega a Almacenar" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Inventario Minimo</label>
                    <input type="text" class="form-control textinput numonly" id="minimo_new" name="minimo" placeholder="Inventario Minimo" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Inventario Maximo</label>
                    <input type="text" class="form-control textinput numonly" id="maximo_new" name="maximo" placeholder="Inventario Maximo" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Precio de Venta</label>
                    <input type="text" class="form-control" id="precioventa_new" name="precioventa" placeholder="Precio de venta" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Precio de Compra</label>
                    <input type="text" class="form-control" id="preciocompra_new" name="preciocompra" placeholder="Precio de Compra" required>
                </div>                                                                          
                <div class="form-group col-md-4">
                    <label class="control-label">Establecimiento</label>
                    <select class="form-control select" data-style="btn-primary" id="estselect_new">
                        <option value='0'>Seleccione</option>
                        <option value='1'>Quito Sur</option>
                        <option value='2'>Villaflora</option>
                        <option value='3'>Cotocollao</option>
                    </select>
                </div> 
                <div class="form-group col-md-4">
                    <label class="control-label">Estado</label>
                    <div class="col-md-12">
                        <label class="switch">
                            <input type="checkbox" class="switch" id="estado_checkbox" name="estado" value="1" checked="">
                            <span></span>
                        </label>     
                    </div>                                         
                </div>
            </form>
        </div>
        <div class="panel-footer">
            <button class="btn btn-info goback_ing_btn" style="margin-left: 16px; margin-bottom: 16px;"><i class="fa fa-reply"></i> Regresar</button>
            <button class="btn btn-success savenew_btn pull-right" style="margin-left: 16px; margin-bottom: 16px;"><i class="fa fa-save"></i> Guardar</button>
        </div>
    </div>
</div>

<?php //<!--HISTORCIO-->?>
<div class="col-md-12 historico_lista hidethis">
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="panel-title-box">
                <button class="btn btn-info goback_ing_btn" style="margin-left: 16px; margin-bottom: 16px;"><i class="fa fa-reply"></i> Regresar</button>
            </div>                                    
            <ul class="panel-controls" style="margin-top: 2px;">
                <li><a href="#" class="panel-fullscreen"><span class="fa fa-expand"></span></a></li>
                <li><a href="#" class="panel-collapse"><span class="fa fa-angle-down"></span></a></li>
                <li><a href="#" class="panel-remove"><span class="fa fa-times"></span></a></li>                                 
            </ul>
        </div> 
        <div class="panel-body panel-body-table" >
            <div class="table-responsive" >
                <input id="selected_dinner" type='hidden' value="1">
                <table class="table table-condensed table-bordered table-striped">
                    <thead>
                        <tr>
                            <th width="15%">Producto</th>
                            <th width="10%">Valor Orginal</th>
                            <th width="10%">Transacci&oacute;n</th>
                            <th width="10%">Tipo</th>
                            <th width="10%">Fecha</th>
                            <th width="5%">Usuario</th>
                            <th width="10%">Establecimiento</th>
                        </tr>
                    </thead>
                    <tbody class="listahistorico">
                    </tbody>
                </table>
            </div>
        </div>      
    </div>
</div>

<?php //<!-- EDITAR INGREDIENTE --> ?>
<div class="col-md-8 editing_panel" style="display:none;">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3><i class="fa fa-edit"></i> Editar ingrediente</h3>
            <button class="btn btn-danger deleteitem_btn pull-right" ><i class="fas fa-trash"></i> Eliminar</button>
        </div>
        <div class="panel-body">
            <form role="form" method="post" id="editarIngrediente" name="guardarIngrediente">
                <div class="form-group col-md-4">
                    <label class="control-label">Nombre</label>
                    <input type="text" class="form-control textinput" id="nombre_edit" name="nombre" placeholder="Nombre del ingrediente" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Cantidad</label>
                    <input readonly="readonly" type="text" class="form-control textinput numonly" id="cantidad_edit" name="cantidad" placeholder="Cantidad a modificar" required>
                </div>                                     
                <div class="form-group col-md-4">
                    <label class="control-label">C&oacute;digo</label>
                    <input type="text" class="form-control textinput" id="codigo_edit" name="codigo" placeholder="Identifcador " required>
                </div>                          
                <div class="form-group col-md-4">
                    <label class="control-label">Codigo de Barras</label>
                    <input type="text" class="form-control textinput" id="barcode_edit" name="barcode" placeholder="Codigo de barras" required>
                </div>                                                                            
                <div class="form-group col-md-4">
                    <label class="control-label">Unidad</label>
                    <select class="form-control select" data-style="btn-primary" id="unidadselect_edit">
                        <option value='0'>Seleccione</option>
                        <option value='1'>Unidad</option>
                        <option value='2'>KG</option>
                        <option value='3'>0.25KG</option>
                    </select>
                </div>                                                                          
                <div class="form-group col-md-4">
                    <label class="control-label">Tipo de Ingrediente</label>
                    <select class="form-control select" data-style="btn-primary" id="tiposelect_edit">
                        <option value='0'>Grupo del menu</option>
                        <option value='1'>General</option>
                        <option value='2'>Pastas</option>
                        <option value='3'>Carnes</option>
                        <option value='4'>Pizzas</option>
                        <option value='5'>Crepes & Postres</option>
                        <option value='6'>Bebidas</option>
                        <option value='7'>Ensaladas & Bocaditos</option>
                    </select>
                </div>  
                <div class="form-group col-md-4">
                    <label class="control-label">Cuenta contable</label>
                    <input type="text" class="form-control textinput" id="cuneta_edit" name="cuneta" placeholder="Cuenta contable del producto" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Detalle</label>
                    <input type="text" class="form-control textinput" id="detalle_edit" name="detalle" placeholder="Detalle del producto" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Bodega</label>
                    <input type="text" class="form-control textinput" id="bodega_edit" name="bodega" placeholder="Bodega a Almacenar" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Inventario Minimo</label>
                    <input type="text" class="form-control textinput numonly" id="minimo_edit" name="minimo" placeholder="Inventario Minimo" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Inventario Maximo</label>
                    <input type="text" class="form-control textinput numonly" id="maximo_edit" name="maximo" placeholder="Inventario Maximo" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Precio de Venta</label>
                    <input type="text" class="form-control" id="precioventa_edit" name="precioventa" placeholder="Precio de venta" required>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Precio de Compra</label>
                    <input type="text" class="form-control" id="preciocompra_edit" name="preciocompra" placeholder="Precio de Compra" required>
                </div>                                                                          
                <div class="form-group col-md-4 estselectcontainer">
                    <label class="control-label">Establecimiento</label>
                    <select class="form-control select estselectcontainer" data-style="btn-primary" id="estselect_edit" disabled>
                        <option value='1'>Quito Sur</option>
                        <option value='2'>Villaflora</option>
                        <option value='3'>Cotocollao</option>
                    </select>
                </div> 
                <div class="form-group col-md-4">
                    <label class="control-label">Estado</label>
                    <div class="col-md-12">
                        <label class="switch">
                            <input type="checkbox" class="switch" id="estado_checkbox_edit" name="estado" value="1" >
                            <span></span>
                        </label>     
                    </div>                                         
                </div>
                <input type="hidden" id="estado_input_edit" value="" >
            </form>
        </div>
        <div class="panel-footer">
            <button class="btn btn-info goback_ing_btn" style="margin-left: 16px; margin-bottom: 16px;"><i class="fa fa-reply"></i> Regresar</button>
            <button class="btn btn-success saveedit_btn pull-right" style="margin-left: 16px; margin-bottom: 16px;"><i class="fas fa-sync-alt"></i> Actualizar</button>
        </div>
    </div>
</div>

<!--MODAL SUCCESS -->
<div class="message-box message-box-success animated fadeIn" id="message-box-success">
    <div class="mb-container">
        <div class="mb-middle">
            <div class="mb-title"><span class="fa fa-check"></span> Ingresado a Sistema</div>
            <div class="mb-content">
                <p class="succesmessage_mb"></p>
            </div>
            <div class="mb-footer">
            </div>
        </div>
    </div>
</div>

<!--MODAL ERROR -->
<div class="message-box message-box-danger animated fadeIn" id="message-box-danger">
    <div class="mb-container">
        <div class="mb-middle">
            <div class="mb-title"><span class="fa fa-times"></span> error</div>
            <div class="mb-content">
                <p class="errormessage_mb"></p>
            </div>
            <div class="mb-footer">
            </div>
        </div>
    </div>
</div>