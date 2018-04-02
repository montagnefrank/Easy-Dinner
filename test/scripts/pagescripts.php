<script type="text/javascript" src="js/plugins/jquery/jquery.min.js"></script>
<script type="text/javascript" src="js/plugins/jquery/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/plugins/bootstrap/bootstrap.min.js"></script>  
<script type="text/javascript" src="js/plugins/notify/notify.js"></script>
<script type='text/javascript' src='js/plugins/icheck/icheck.min.js'></script>        
<script type="text/javascript" src="js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js"></script>
<script type="text/javascript" src="js/plugins/morris/raphael-min.js"></script>
<script type="text/javascript" src="js/plugins/morris/morris.min.js"></script>       
<script type="text/javascript" src="js/plugins/rickshaw/d3.v3.js"></script>
<script type="text/javascript" src="js/plugins/rickshaw/rickshaw.min.js"></script>
<script type='text/javascript' src='js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js'></script>
<script type='text/javascript' src='js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js'></script>                
<script type='text/javascript' src='js/plugins/bootstrap/bootstrap-datepicker.js'></script>                
<script type="text/javascript" src="js/plugins/owl/owl.carousel.min.js"></script>
<script type="text/javascript" src="js/plugins/moment.min.js"></script>
<script type="text/javascript" src="js/plugins/daterangepicker/daterangepicker.js"></script>
<script type="text/javascript" src="js/plugins/dropzone/dropzone.min.js"></script>
<script type="text/javascript" src="js/plugins/bootstrap/bootstrap-file-input.js"></script>
<script type="text/javascript" src="js/plugins/form/jquery.form.js"></script>
<script type="text/javascript" src="js/plugins/cropper/cropper.min.js"></script>
<script type='text/javascript' src='js/plugins/jquery-validation/jquery.validate.js'></script>
<script type="text/javascript" src="js/plugins/smartwizard/jquery.smartWizard-2.0.min.js"></script>     
<script type="text/javascript" src="js/plugins/datatables/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/plugins/tableexport/tableExport.js"></script>
<script type="text/javascript" src="js/plugins/tableexport/jquery.base64.js"></script>
<script type="text/javascript" src="js/plugins/tableexport/html2canvas.js"></script>
<script type="text/javascript" src="js/plugins/tableexport/jspdf/libs/sprintf.js"></script>
<script type="text/javascript" src="js/plugins/tableexport/jspdf/jspdf.js"></script>
<script type="text/javascript" src="js/plugins/tableexport/jspdf/libs/base64.js"></script>
<script type="text/javascript" src="js/plugins/bootstrap/bootstrap-timepicker.min.js"></script>
<script type="text/javascript" src="js/plugins/bootstrap/bootstrap-colorpicker.js"></script>
<script type="text/javascript" src="js/plugins/bootstrap/bootstrap-select.js"></script>
<script type="text/javascript" src="js/plugins/tagsinput/jquery.tagsinput.min.js"></script>
<script src="https://cdn.rawgit.com/download/glyphicons/0.1.0/glyphicons.js"></script>
<!--<script type="text/javascript" src="js/settings.js"></script>-->
<script type="text/javascript" src="js/plugins.js"></script>        
<script type="text/javascript" src="js/actions.js"></script>
<script type="text/javascript" src="js/demo_edit_profile.js"></script>
<script type='text/javascript' src='js/plugins/noty/jquery.noty.js'></script>
<script type='text/javascript' src='js/plugins/noty/layouts/topCenter.js'></script>
<script type='text/javascript' src='js/plugins/noty/layouts/topLeft.js'></script>
<script type='text/javascript' src='js/plugins/noty/layouts/topRight.js'></script> 
<script type='text/javascript' src='node_modules/dragula/dist/dragula.min.js'></script>
<script type='text/javascript' src='node_modules/easy-autocomplete/dist/jquery.easy-autocomplete.min.js'></script>
<script type='text/javascript' src='assets/js/modalMultiple.js'></script>

<!--///////////////////////////////////////////////////SCRIPTS DE INDEX////////////////////////////////////////-->
<?php
if ($panel == "index.php") {
    echo "<script type='text/javascript' src='assets/js/script_mesas.js'></script>";
    echo "<script type='text/javascript' src='assets/js/script_consultapedido.js'></script>";
    echo "<script type='text/javascript' src='assets/js/script_editapedido.js'></script>";
}
?>
<!--///////////////////////////////////////////////////FIN SCRIPTS INDEX////////////////////////////////////-->

<!--///////////////////////////////////////////////////SCRIPTS DE COCINA////////////////////////////////////////-->
<?php
if ($panel == "cocina.php") {
    echo "<script type='text/javascript' src='assets/cocina/scriptcocina.js'></script>";
}
?>
<!--///////////////////////////////////////////////////FIN SCRIPTS COCINA////////////////////////////////////-->

<!--///////////////////////////////////////////////////SCRIPTS DE HACER PEDIDO////////////////////////////////////////-->
<?php
if ($panel == "hacerpedido.php") {
    echo "<script type='text/javascript' src='assets/js/script_hacerpedido.js'></script>";
}
?>
<!--///////////////////////////////////////////////////FIN SCRIPTS HACER PEDIDO////////////////////////////////////-->

<!--///////////////////////////////////////////////////SCRIPTS DE DASHBOARD////////////////////////////////////////-->
<?php
if ($panel == "dashboard.php") {
    echo "<script type=\"text/javascript\" src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyA_s9AhhJurXNx1UHeK_6hm6CdSB8AR14c\"></script>";
    echo "<script type='text/javascript' src='assets/dashboard/dashboard.js'></script>";
    echo "<script type='text/javascript' src=\"assets/dashboard/echarts/dist/echarts.js\"></script>";
    require ("assets/dashboard/dashboardscripts.php");
}
?>
<!--///////////////////////////////////////////////////FIN SCRIPTS DASHBOARD////////////////////////////////////-->

<!--///////////////////////////////////////////////////SCRIPTS DE AÑADIR PEDIDO////////////////////////////////////////-->
<?php
if ($panel == "anadirpedido.php") {
    echo "<script type='text/javascript' src='assets/js/script_anadirpedido.js'></script>";
    echo "<script type='text/javascript' src='assets/anadirpedido/script_anadirpedido.js'></script>";
}
?>
<!--///////////////////////////////////////////////////FIN SCRIPTS AÑADIR PEDIDO////////////////////////////////////-->
<!--///////////////////////////////////////////////////SCRIPTS DE CAJA////////////////////////////////////////-->
<?php
if ($panel == "caja.php") {
    echo "<script type='text/javascript' src='assets/caja/script_caja.js'></script>";
    require ("assets/caja/caja_scripts.php");
}
?>
<!--///////////////////////////////////////////////////FIN SCRIPTS CAJA////////////////////////////////////-->

<!--///////////////////////////////////////////////////SCRIPTS DE FACTURA////////////////////////////////////////-->
<?php
if ($panel == "factura.php") {
    echo "<script type='text/javascript' src='assets/factura/script_factura.js'></script>";
    echo "<script type='text/javascript' src='assets/cliente/script_cliente.js'></script>";
    echo "<script type='text/javascript' src='assets/cliente/script_validacionCliente.js'></script>";
    echo "<script type='text/javascript' src='assets/js/script_validaMoney.js'></script>";
}
?>
<!--///////////////////////////////////////////////////FIN SCRIPTS FACTURA////////////////////////////////////-->
 
<!--///////////////////////////////////////////////////SCRIPTS DOMICILIO////////////////////////////////////////-->
<?php
if ($panel == "domicilio.php") {
    echo "<script type='text/javascript' src='assets/domicilio/dom_scripts.js'></script>";
    echo "<script type='text/javascript' src='assets/domicilio/dom_scripts.php'></script>";
    echo "<script type='text/javascript' src='assets/cliente/script_cliente.js'></script>";
    echo "<script type='text/javascript' src='assets/cliente/script_validacionCliente.js'></script>";
    echo "<script type='text/javascript' src='assets/js/script_validaMoney.js'></script>";
}
?>
<!--///////////////////////////////////////////////////FIN SCRIPTS DOMICILIO////////////////////////////////////-->
 