<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
    <li><a href="index.php?panel=index.php">Mesas</a></li>
    <li>Pedido</li>

</ul>
<!-- FIN BREADCRUMB -->

<div class="page-title">                    
    <h2><span class="fas fa-pencil-alt"></span> Nuevo pedido en <b><?php echo $_SESSION["numeromesa"]; ?></b></h2>
</div>
<!--WIZARD PARA PEDIDOS-->
<!-- SELECCION DE PRODUCTOS -->
<div class="row">
    <br>
    <div class="col-md-12 border-primary" style="border: 1px solid;border-radius: 6px;padding: 20px;">

        <div id="menucontent">
            <div class="col col-md-12">
                <h3>2. Selecciòn de productos</h3>
            </div>

        </div>
        <div >
            <div id="resumen_pedido" class="panel panel-default displaynone">
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="pull-right push-down-20">
            <button class="btn btn-success" id="payment_checkout"><span class="fa fa-credit-card"></span> Proceder al Pago</button>
        </div>
    </div>
</div>









