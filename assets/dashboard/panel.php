<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
    <li id="showmodal">Dashboard </li>
</ul>
<!-- FIN BREADCRUMB -->

<!--WIDGETS RESTAURANTES-->
<div class="col-md-3">                      
    <a href="#" class="tile tile-success tile-valign sidebar-toggle " id="villaflora_sidebar">$ <span class="ventdia_villaflora">0.00</span>
        <div class="informer informer-default dir-tr"><span class="fa fa-align-right"></span></div>
        <div class="informer informer-default dir-bl">Restaurant Villaflora</div>
    </a>                                                    
</div>
<div class="col-md-3">                        
    <a href="#" class="tile tile-success tile-valign sidebar-toggle" id="quitonorte_sidebar">$ <span class="ventdia_quitonorte">0.00</span>
        <div class="informer informer-default dir-tr"><span class="fa fa-align-right"></span></div>
        <div class="informer informer-default dir-bl">Restaurant Av. del Maestro</div>
    </a>                                                    
</div>
<div class="col-md-3">                        
    <a href="#" class="tile tile-success tile-valign sidebar-toggle" id="quitosur_sidebar">$ <span class="ventdia_quitosur">0.00</span>
        <div class="informer informer-default dir-tr"><span class="fa fa-align-right"></span></div>
        <div class="informer informer-default dir-bl">Restaurant Quito Sur</div>
    </a>                                                    
</div>
<div class="col-md-3">
    <div class="widget widget-danger widget-padding-sm">
        <div class="widget-big-int plugin-clock">00:00</div>                            
        <div class="widget-subtitle plugin-date">Loading...</div>
        <div class="widget-controls">                                
            <a href="#" class="widget-control-right widget-remove" data-toggle="tooltip" data-placement="left" title="Remove Widget"><span class="fa fa-times"></span></a>
        </div>                            
        <div class="widget-buttons widget-c3">
            <div class="col">
                <a href="#"><i class="fas fa-clock"></i></a>
            </div>
            <div class="col">
                <a href="#"><span class="fa fa-bell"></span></a>
            </div>
            <div class="col">
                <a href="#"><span class="fa fa-calendar"></span></a>
            </div>
        </div>                            
    </div>                          
</div>
<!--FIN WIDGETS RESTAURANTES-->
<!-- MAP WIDGET -->
<div class="col-md-4">
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="panel-title-box">
                <h3>Entregas a domicilio</h3>
                <span id="ultimosmeses_resumen">Resumen geográfico de pedidos</span>
            </div>
            <ul class="panel-controls" style="margin-top: 2px;">
                <li><a id="mapadelivery_toggle_graph" href="#" class="panel-fullscreen"><span class="fa fa-expand"></span></a></li>
                <li><a href="#" class="panel-collapse"><span class="fa fa-angle-down"></span></a></li>
                <li><a href="#" class="panel-remove"><span class="fa fa-times"></span></a></li>                                       
            </ul>
        </div>
        <div class="panel-body" >
            <div id="map_small" style="height:400px;"></div>
            <div id="delivery_table" style="top: 16px;right: 16px;width: 75%; position: absolute; display: none;">
                <!-- START CONTENT FRAME BODY -->
                <div class="messages messages-img">
                    <div class="item">
                        <div class="image">
                            <img src="assets/images/users/user.jpg" alt="Dmitry Ivaniuk">
                        </div>                                
                        <div class="text">
                            <div class="heading">
                                <a href="#">Pedido #1234</a>
                                <span class="date">08:39</span>
                            </div>                                    
                            Pizza Dirulo, Gaseosa Pequeña (x5)
                        </div>
                    </div>
                    <div class="item">
                        <div class="image">
                            <img src="assets/images/users/user.jpg" alt="Dmitry Ivaniuk">
                        </div>                                
                        <div class="text">
                            <div class="heading">
                                <a href="#">Pedido #1234</a>
                                <span class="date">08:39</span>
                            </div>                                    
                            Pizza Dirulo, Gaseosa Pequeña (x5)
                        </div>
                    </div>
                    <div class="item">
                        <div class="image">
                            <img src="assets/images/users/user.jpg" alt="Dmitry Ivaniuk">
                        </div>                                
                        <div class="text">
                            <div class="heading">
                                <a href="#">Pedido #1234</a>
                                <span class="date">08:39</span>
                            </div>                                    
                            Pizza Dirulo, Gaseosa Pequeña (x5)
                        </div>
                    </div>
                    <div class="item">
                        <div class="image">
                            <img src="assets/images/users/user.jpg" alt="Dmitry Ivaniuk">
                        </div>                                
                        <div class="text">
                            <div class="heading">
                                <a href="#">Pedido #1234</a>
                                <span class="date">08:39</span>
                            </div>                                    
                            Pizza Dirulo, Gaseosa Pequeña (x5)
                        </div>
                    </div>
                </div>     
                <!-- END CONTENT FRAME BODY -->  
            </div>
        </div>
        <div class="panel-footer">
            <h3><span class="fa fa-map-marker"></span> Entregas a domicilio</h3>
            <p>Ciudad de Quito</p>
        </div>
    </div>
</div>
<!-- FIN MAP WIDGET -->
<!--TOP 5 MAS PEDIDOS-->
<div class="col-md-4">              
    <div class="panel panel-default tabs">
        <ul class="nav nav-tabs nav-justified">
            <li class="active" ><a href="#tab8" data-toggle="tab">Villaflora</a></li>
            <li ><a href="#tab9" data-toggle="tab">Av. del Maestro</a></li>
            <li ><a href="#tab10" data-toggle="tab">Quito Sur</a></li>
        </ul>
        <div class="panel-body tab-content">
            <div class="tab-pane active" id="tab8">
                <div id="top5_chart_villaflora" style="height:350px;"></div>
            </div>
            <div class="tab-pane" id="tab9">
                <div id="top5_chart_quitonorte" style="height:350px;"></div>
            </div>
            <div class="tab-pane" id="tab10">
                <div id="top5_chart_quitosur" style="height:350px;"></div> 
            </div>                        
        </div>
    </div>                         
</div>
<!--FIN TOP 5 MAS PEDIDOS-->

<!--RESUMEN MESAS ATENDIDAS-->
<div class="col-md-4">
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="panel-title-box">
                <h3>Mesas atendidas</h3>
                <span id="ultimosmeses_resumen">Resumen mensual (&Uacute;ltimos 6 meses)</span>
            </div>
            <ul class="panel-controls" style="margin-top: 2px;">
                <li><a id="mesasatendidas_toggle_graph" href="#" class="panel-fullscreen"><span class="fa fa-expand"></span></a></li>
                <li><a href="#" class="panel-collapse"><span class="fa fa-angle-down"></span></a></li>
                <li><a href="#" class="panel-remove"><span class="fa fa-times"></span></a></li>                                       
            </ul>
        </div>
        <div class="panel-body padding-0">
            <div class="chart-holder" id="mesasatendicas_graphline" style="height: 200px;"></div>
        </div>
    </div>
</div>
<!--FIN MESAS ATENDIDAS-->
<!--INGREDIENTES RESUMEN-->
<div class="col-md-4">
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="panel-title-box">
                <h3>Ingredientes</h3>
                <span>Resumen de inventario</span>
            </div>                                    
            <ul class="panel-controls" style="margin-top: 2px;">
                <li><a id="ingredientes_toggle_list" href="#" class="panel-fullscreen"><span class="fa fa-expand"></span></a></li>
                <li><a href="#" class="panel-collapse"><span class="fa fa-angle-down"></span></a></li>
                <li><a href="#" class="panel-remove"><span class="fa fa-times"></span></a></li>                                 
            </ul>
        </div>
        <div id="ingredientes_graph_peq" class="panel-body panel-body-table" >
            <div class="table-responsive" >
                <table class="table table-condensed table-bordered table-striped">
                    <thead>
                        <tr>
                            <th width="50%">Producto</th>
                            <th width="20%">Cantidad</th>
                            <th width="30%">Inventario</th>
                        </tr>
                    </thead>
                    <tbody >
                        <?php
                        $select_ingredientes_list = "SELECT * FROM ingrediente";
                        $result_ingredientes_list = mysqli_query($conn, $select_ingredientes_list);
                        $dashboard_i = '0';
                        while ($row_ingredientes_list = mysqli_fetch_array($result_ingredientes_list)) {
                            if ($row_ingredientes_list['cantidadIngrediente'] <= 24) {
                                $progbar_color = 'danger';
                            } elseif ($row_ingredientes_list['cantidadIngrediente'] >= 25 && $row_ingredientes_list['cantidadIngrediente'] <= 49) {
                                $progbar_color = 'warning';
                            } elseif ($row_ingredientes_list['cantidadIngrediente'] >= 50 && $row_ingredientes_list['cantidadIngrediente'] <= 74) {
                                $progbar_color = 'info';
                            } elseif ($row_ingredientes_list['cantidadIngrediente'] >= 75 && $row_ingredientes_list['cantidadIngrediente'] <= 100) {
                                $progbar_color = 'success';
                            }
                            echo "<tr>
                                    <td><strong>" . $row_ingredientes_list['nombreIngrediente'] . "</strong></td>
                                    <td><span id=\"ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val\" class=\"label label-" . $progbar_color . "\">" . $row_ingredientes_list['cantidadIngrediente'] . " KG</span></td>
                                    <td>
                                        <div class=\"progress progress-small progress-striped active\">
                                            <div id=\"ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_bar\" 
                                                    class=\"progress-bar progress-bar-" . $progbar_color . "\" 
                                                    role=\"progressbar\" 
                                                    style=\"width: " . $row_ingredientes_list['cantidadIngrediente'] . "%;\"></div>
                                        </div>
                                    </td>
                                </tr>";


                            $dashboard_i++;
                            if ($dashboard_i == '6') {
                                break;
                            }
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="ingredientes_graph_grande" class="panel-body panel-body-table" style="display: none;">
            <div class="table-responsive" style="overflow-y:scroll; height: 85vh;">
                <table class="table table-condensed table-bordered table-striped">
                    <thead>
                        <tr>
                            <th width="50%">Producto</th>
                            <th width="20%">Cantidad</th>
                            <th width="30%">Inventario</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $result_ingredientes_list = mysqli_query($conn, $select_ingredientes_list);
                        while ($row_ingredientes_list = mysqli_fetch_array($result_ingredientes_list)) {
                            if ($row_ingredientes_list['cantidadIngrediente'] <= 24) {
                                $progbar_color = 'danger';
                            } elseif ($row_ingredientes_list['cantidadIngrediente'] >= 25 && $row_ingredientes_list['cantidadIngrediente'] <= 49) {
                                $progbar_color = 'warning';
                            } elseif ($row_ingredientes_list['cantidadIngrediente'] >= 50 && $row_ingredientes_list['cantidadIngrediente'] <= 74) {
                                $progbar_color = 'info';
                            } elseif ($row_ingredientes_list['cantidadIngrediente'] >= 75 && $row_ingredientes_list['cantidadIngrediente'] <= 100) {
                                $progbar_color = 'success';
                            }
                            echo "<tr>
                                    <td><strong>" . $row_ingredientes_list['nombreIngrediente'] . "</strong></td>
                                    <td><span id=\"ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_val_big\" class=\"label label-" . $progbar_color . "\">" . $row_ingredientes_list['cantidadIngrediente'] . " KG</span></td>
                                    <td>
                                        <div class=\"progress progress-small progress-striped active\">
                                            <div id=\"ingredientes_" . $row_ingredientes_list['idIngrediente'] . "_bar_big\" 
                                                    class=\"progress-bar progress-bar-" . $progbar_color . "\" 
                                                    role=\"progressbar\" 
                                                    style=\"width: " . $row_ingredientes_list['cantidadIngrediente'] . "%;\"></div>
                                        </div>
                                    </td>
                                </tr>";
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="ingredientes_botonera_small" class="panel-footer text-center">                                                                                                                                                                                                           
            <div class="btn-group">
                <button id="ingredientes_quitosur_btn" class="btn btn-primary">Quito Sur</button>
                <button id="ingredientes_villaflora_btn" class="btn btn-primary">Villaflora</button>                                                
                <button id="ingredientes_quitonorte_btn" class="btn btn-primary">Quito Norte</button>                                        
            </div>     
        </div>    
        <div id="ingredientes_botonera_big" class="panel-footer text-center" style="display: none;">                                                                                                                                                                                                           
            <div class="btn-group">
                <button id="ingredientes_quitosur_btn_big" class="btn btn-primary">Quito Sur</button>
                <button id="ingredientes_villaflora_btn_big" class="btn btn-primary">Villaflora</button>                                                
                <button id="ingredientes_quitonorte_btn_big" class="btn btn-primary">Quito Norte</button>                                        
            </div>     
        </div>    
    </div>
</div>
<!--FIN INGREDIENTES RESUMEN-->
<div id="dashboard_modal" class="modal fade" role="dialog">
    <div style="z-index: 100; width: 90vw;" class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" style="color:white;text-align: center;"><i class="fas fa-pencil-alt"></i> Reporte de ventas</h4>
            </div>
            <div class="modal-body" style="text-align: center">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Reporte de ventas Diarias</h3>
                        <div class="btn-group pull-right">
                            <button class="btn btn-danger dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bars"></i> Exportar Tabla</button>
                            <ul class="dropdown-menu">
                                <li><a href="#" onClick ="$('#reporte_ventas').tableExport({type: 'xml', escape: 'false'});"><img src='img/icons/xml.png' width="24"/> XML</a></li>
                                <li class="divider"></li>
                                <li><a href="#" onClick ="$('#reporte_ventas').tableExport({type: 'csv', escape: 'false'});"><img src='img/icons/csv.png' width="24"/> CSV</a></li>
                                <li><a href="#" onClick ="$('#reporte_ventas').tableExport({type: 'excel', escape: 'false'});"><img src='img/icons/xls.png' width="24"/> XLS</a></li>
                                <li class="divider"></li>
                                <li><a href="#" onClick ="$('#reporte_ventas').tableExport({type: 'pdf', escape: 'false'});"><img src='img/icons/pdf.png' width="24"/> PDF</a></li>
                            </ul>
                        </div>                                    

                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table id="reporte_ventas" class="table datatable">
                                <thead>
                                    <tr>
                                        <th># Factura</th>
                                        <th># Pedido</th>
                                        <th>Cliente</th>
                                        <th>Fecha</th>
                                        <th>Forma de pago</th>
                                        <th>Subtotal</th>
                                        <th>Descuento</th>
                                        <th>Iva</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tiger Nixon</td>
                                        <td>System Architect</td>
                                        <td>Edinburgh</td>
                                        <td>61</td>
                                        <td>2011/04/25</td>
                                        <td>$320,800</td>
                                        <td>$320,800</td>
                                        <td>$320,800</td>
                                        <td>$320,800</td>
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