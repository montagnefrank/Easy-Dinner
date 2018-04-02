
<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
    <li id="showmodal">entregas</li>
</ul>
<div class="col-md-8">
    <!-- START TIMELINE -->
    <div class="timeline timeline-right" id="timeline">

        <!-- START TIMELINE ITEM -->
        <!--<div class="timeline-item timeline-item-right">
            <div class="timeline-item-info ontime">02 Oct 2017</div>
            <div class="timeline-item-icon"><span class="fa fa-map-marker"></span></div>
            <div class="timeline-item-content">                                        
                <div class="timeline-body padding-0">
                    <div id="google_ptm_map" style="width: 100%; height: 150px;"></div>
                </div>                         
                <div class="timeline-heading">
                    <img src="img/loading.gif"/> <a href="#">Pedido 415</a> Pizza Familiar Dirulo <a href="#">Alfonso Jaramillo</a><br />
                    <a href="#">Repartidor 013</a> Salida: 08:36 p.m. <a href="#">Pedido 405, 408, 412</a>
                </div>
            </div>
        </div>-->
        <!-- END TIMELINE ITEM -->

        <!-- START TIMELINE ITEM -->
       <!-- <div class="timeline-item timeline-item-right">
            <div class="timeline-item-info delayed">02 Oct 2017</div>
            <div class="timeline-item-icon"><span class="fa fa-map-marker"></span></div>
            <div class="timeline-item-content">                                        
                <div class="timeline-body padding-0">
                    <div id="google_ptm_map2" style="width: 100%; height: 150px;"></div>
                </div>                         
                <div class="timeline-heading">
                    <img src="img/loading.gif"/> <a href="#">Pedido 427</a> Costillas Ahumadas <a href="#">Miguel Mendez</a><br />
                    <a href="#">Repartidor 001</a> Salida: 08:12 p.m. <a href="#">Pedido 422, 418, 427</a>
                </div>
            </div>
        </div>-->
        <!-- END TIMELINE ITEM -->

        <!-- START TIMELINE ITEM -->
        <!--<div class="timeline-item timeline-item-right">
            <div class="timeline-item-info late">02 Oct 2017</div>
            <div class="timeline-item-icon"><span class="fa fa-map-marker"></span></div>
            <div class="timeline-item-content">                                        
                <div class="timeline-body padding-0">
                    <div id="google_ptm_map3" style="width: 100%; height: 150px;"></div>
                </div>                         
                <div class="timeline-heading">
                    <img src="img/loading.gif"/> <a href="#">Pedido 432</a> Chuletas de cerdo <a href="#">Gustavo Perez</a><br />
                    <a href="#">Repartidor 021</a> Salida: 08:50 p.m. <a href="#">Pedido 432, 411, 433</a>
                </div>
            </div>
        </div>-->
        <!-- END TIMELINE ITEM -->
    </div>
    <!-- END TIMELINE -->
</div>

<div class="col-md-4">
    <!-- START CONTENT FRAME RIGHT -->
    <div class="content-frame-right">
        <div class="block">
            <h4>Status</h4>
            <div class="list-group list-group-simple">                                
                <a href="#" class="list-group-item"><span class="fa fa-circle text-success"></span> Pedido a tiempo</a>
                <a href="#" class="list-group-item"><span class="fa fa-circle text-warning"></span> tarde</a>
                <a href="#" class="list-group-item"><span class="fa fa-circle text-danger"></span> muy tarde</a>                                
            </div>
        </div>
        <div class="col-md-12" id="modal_entregar_btn">                        
            <a href="#" class="tile tile-info tile-">Finalizar entrega
                <div class="informer informer-default dir-bl"><span class="fa fa-truck"></span> Repartidor regresa</div>
            </a>                        
        </div>
        <div class="col-md-12" id="modal_entregar_btn">                        
            <a href="#" class="tile tile-info tile-">Administrar agentes
                <div class="informer informer-default dir-bl"><span class="fa fa-users"></span> Equipo de entregas</div>
            </a>                        
        </div>
    </div>
    <!-- END CONTENT FRAME RIGHT -->
</div>
<!--MODAL -->
<div id="entregas_modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header label-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <center><h4 class="modal-title tituloSeleccionaIngredientes" style="color:white;"> Confirmar estatus de la entrega</h4></center>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer label-primary">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>

    </div>
</div>