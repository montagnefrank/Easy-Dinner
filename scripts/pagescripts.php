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
<script type="text/javascript" src="js/plugins.js"></script>        
<script type="text/javascript" src="js/actions.js"></script>
<script type="text/javascript" src="js/demo_edit_profile.js"></script>
<script type='text/javascript' src='js/plugins/noty/jquery.noty.js'></script>
<script type='text/javascript' src='js/plugins/noty/layouts/topCenter.js'></script>
<script type='text/javascript' src='js/plugins/noty/layouts/topLeft.js'></script>
<script type='text/javascript' src='js/plugins/noty/layouts/topRight.js'></script> 
<script type='text/javascript' src='node_modules/dragula/dist/dragula.min.js'></script>
<script type='text/javascript' src='node_modules/easy-autocomplete/dist/jquery.easy-autocomplete.min.js'></script>
<script type='text/javascript' src='js/plugins/filestyle/bootstrap-filestyle.min.js'></script>
<script type='text/javascript' src='assets/js/modalMultiple.js'></script>
<script type='text/javascript' src='assets/salir/script_salir.js'></script>
<script defer src="https://use.fontawesome.com/releases/v5.0.8/js/solid.js" integrity="sha384-+Ga2s7YBbhOD6nie0DzrZpJes+b2K1xkpKxTFFcx59QmVPaSA8c7pycsNaFwUK6l" crossorigin="anonymous"></script>
<script defer src="https://use.fontawesome.com/releases/v5.0.8/js/fontawesome.js" integrity="sha384-7ox8Q2yzO/uWircfojVuCQOZl+ZZBg2D2J5nkpLqzH1HY0C1dHlTKIbpRz/LG23c" crossorigin="anonymous"></script>
<script>
////////////////////////CERRAMOS LA VENTNA DE NOTIFICACION CON CLIC EN CUALQUIER PARTE DE LA PAGINA
    $(document).on('click', function (e) {
        $('#message-box-success,#message-box-danger').hide();
        $(".notificactionbox,.customalert").animate({width: 'hide'}, 600);
    });

    $('.numonly').bind('keyup blur', function () {
        var node = $(this);
        node.val(node.val().replace(/[^0-9-]/g, ''));
    });

    $('.alphanumonly').bind('keyup blur', function () {
        var node = $(this);
        node.val(node.val().replace(/[^0-9a-zA-Z-]/g, ''));
    });

    $('.alphaonly').bind('keyup blur', function () {
        var node = $(this);
        node.val(node.val().replace(/[^a-zA-Z\-\s]/g, ''));
    });
</script>


<?php
switch ($panel) {///////////////////////////////////////////////////////////////SELECTOR DE PANEL, DEPENDIENDO DEL PANEL HACE LAS LLAMADAS A LOS ARCHIVOS CORRESPONDINETES
    case "index.php":
        echo "<script type='text/javascript' src='assets/js/script_mesas.js'></script>";
        echo "<script type='text/javascript' src='assets/js/script_consultapedido.js'></script>";
        echo "<script type='text/javascript' src='assets/js/script_editapedido.js'></script>";
        break;
    case "cocina.php":
        echo "<script type='text/javascript' src='assets/cocina/scriptcocina.js'></script>";
        break;
    case "procesos.php":
        require ("assets/procesos/model.php");
        break;
    case "hacerpedido.php":
        echo "<script type='text/javascript' src='assets/js/script_hacerpedido.js'></script>";
        //estos scripts son los que inicializan el menu y el que lo crea y maneja
        //echo "<script type='text/javascript' src='assets/js/script_menu_seleccion_productos.js'></script>";
        //echo "<script type='text/javascript' src='assets/js/script_start_menu_pedido.js'></script>";
        break;
    case "anadirpedido.php":
        echo "<script type='text/javascript' src='assets/js/script_anadirpedido.js'></script>";
        echo "<script type='text/javascript' src='assets/anadirpedido/script_anadirpedido.js'></script>";
        break;
    case "dashboard.php":
        echo "<script type=\"text/javascript\" src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyA_s9AhhJurXNx1UHeK_6hm6CdSB8AR14c\"></script>";
        echo "<script type='text/javascript' src='assets/dashboard/dashboard.js'></script>";
        echo "<script type='text/javascript' src=\"assets/dashboard/echarts/dist/echarts.js\"></script>";
        require ("assets/dashboard/dashboardscripts.php");
        break;
    case "caja.php":
        echo "<script type='text/javascript' src='assets/caja/script_caja.js'></script>";
        require ("assets/caja/caja_scripts.php");
        break;
    case "factura.php":
        echo "<script type='text/javascript' src='assets/factura/script_factura.js'></script>";
        echo "<script type='text/javascript' src='assets/cliente/script_cliente.js'></script>";
        echo "<script type='text/javascript' src='assets/cliente/script_validacionCliente.js'></script>";
        echo "<script type='text/javascript' src='assets/js/script_validaMoney.js'></script>";
        break;
    case "domicilio.php":
        require ("assets/domicilio/dom_scripts.php");
        echo "<script type='text/javascript' src='assets/domicilio/dom_facturardom.js'></script>";
        break;
    case "nuevodomicilio.php":
        echo "<script type='text/javascript' src='assets/js/script_menu_seleccion_productos.js'></script>";
        echo "<script type='text/javascript' src='assets/domicilio/dom_seleccionproducto.js'></script>";
        echo "<script type='text/javascript' src='assets/js/script_validaMoney.js'></script>";
        echo "<script type='text/javascript' src='assets/cliente/script_cliente.js'></script>";
        echo "<script type='text/javascript' src='assets/cliente/script_validacionCliente.js'></script>";
        break;
    case "parallevar.php":
        echo "<script type='text/javascript' src='assets/cliente/script_cliente.js'></script>";
        echo "<script type='text/javascript' src='assets/cliente/script_validacionCliente.js'></script>";
        echo "<script type='text/javascript' src='assets/js/script_validaMoney.js'></script>";
        echo "<script type='text/javascript' src='assets/js/script_menu_seleccion_productos.js'></script>";
        echo "<script type='text/javascript' src='assets/parallevar/script_seleccionproductos.js'></script>";
        break;
    case "reporte.php":
        echo '<script type="text/javascript" charset="utf8" src="js/datatables/datatables.js"></script>';
        echo "<script type='text/javascript' src='assets/reporteventa/script_validacionReporte.js'></script>";
        echo "<script type='text/javascript' src='assets/reporteventa/script_reporteventa.js'></script>";
        break;
    case "user_config.php":
        echo '<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.js"></script>';
        echo '<script type="text/javascript" src="assets/user_config/script_user_config.js"></script>';
        break;
    case "entregas.php":
        echo "<script type=\"text/javascript\" src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyA_s9AhhJurXNx1UHeK_6hm6CdSB8AR14c\"></script>";
        echo "<script type='text/javascript' src='assets/entregas/ent_scripts.js'></script>";
        echo "<script type='text/javascript' src='assets/entregas/ent_scripts.php'></script>";
        require ("assets/entregas/ent_scripts.php");
        break;
    case "inventory.php":
        require ("assets/inventory/model.php");
        break;
    case "user.php":
        require ("assets/users/model.php");
        break;
}
?>
