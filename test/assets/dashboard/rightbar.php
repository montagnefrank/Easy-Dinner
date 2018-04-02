<div id="sidebar_restaurantes" class="sidebar" style="z-index: 999">            
    <div class="sidebar-wrapper scroll">
        <div class="sidebar-tabs">
            <a href="#sidebar_1" class="sidebar-tab active"><span class="fa fa-file-pdf-o"></span> Resumen</a>
            <a href="#sidebar_2" class="sidebar-tab "><span class="fa fa-sliders"></span> Restaurant</a>
        </div>
        <div class="sidebar-tab-content active" id="sidebar_1">
            <div class="sidebar-title" >
                <i class="fa fa-line-chart" aria-hidden="true"></i> Resumen de ingresos <button class="btn btn-primary" id="title_resumen_ingresos"></button></div>
            <ul class="list-group">
                <li class="list-group-item">
                    <a href="#"><span class="status status-online"></span> Ingresos del d&iacute;a</a>
                    <p><input type="text" class="btn btn-primary btn-lg" id="sidebar_ingresosdeldia" value=""></p>
                    <small class="text-muted" id="sidebar_ingresosdeldia_pedidos"></small>
                </li>
                <li class="list-group-item">
                    <a href="#"><span class="status status-online"></span> Ingresos de la semana</a>
                    <p><input type="text" class="btn btn-primary btn-lg" id="sidebar_ingresossemana"  value=""></p>
                    <small class="text-muted" id="sidebar_ingresossemana_pedidos"></small>
                </li>
                <li class="list-group-item">
                    <a href="#"><span class="status status-online"></span> Ingresos del mes</a>
                    <p><input type="text" class="btn btn-primary btn-lg" id="sidebar_ingresosdelmes" value=""></p>
                    <small class="text-muted" id="sidebar_ingresosdelmes_pedidos"></small>
                </li>
            </ul>

            <div class="sidebar-title">Empleados: <strong>6</strong></div>
            <div class="list-group list-group-contacts" id="sidebar_listado_empleados">      
            </div>
        </div>
        <div class="sidebar-tab-content form-horizontal " id="sidebar_2">
            <div class="sidebar-title">Configuraci&oacute;n r&aacute;pida</div>                    
            <div class="form-group">
                <label class="col-md-8 col-xs-8 control-label text-left">Inventario Negativo</label>
                <div class="col-md-4 col-xs-4">
                    <label class="switch">
                        <input type="checkbox" class="switch" value="1" checked/>
                        <span></span>
                    </label>                                            
                </div>                        
            </div>                                    
            <div class="form-group">
                <label class="col-md-8 col-xs-8 control-label text-left">De Turno</label>
                <div class="col-md-4 col-xs-4">
                    <label class="switch">
                        <input type="checkbox" class="switch" value="1" checked/>
                        <span></span>
                    </label>
                </div>                                                              
            </div>
            <div class="form-group">
                <label class="col-md-8 col-xs-8 control-label text-left">Servicio a domicilio</label>
                <div class="col-md-4 col-xs-4">
                    <label class="switch">
                        <input type="checkbox" class="switch" value="1"/>
                        <span></span>
                    </label>
                </div>                                                               
            </div>
            <div class="form-group pull-right" style="margin-right: 16px;">
                <button class="btn btn-primary">
                    <span class="fa fa-save"></span> Guardar
                </button>
            </div>
            <div class="sidebar-title">Informaci&oacute;n</div>
            <div class="sidebar-block">
                <div class="owl-carousel">
                    <div id="sidebar_img_rest"></div>
                    <div id="sidebar_img_info"></div>
                </div>
            </div>
        </div>
    </div>            
</div>