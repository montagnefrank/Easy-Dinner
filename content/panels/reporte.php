<!-- BREADCRUMB -->
<ul class="breadcrumb">
    <li><a href="index.php?panel=index.php">DiRulo</a></li>
    <li><a>Reportes</a></li>
</ul>

<div class="page-title">                    
    <h2><span class="fa fa-list-alt"></span> Reportes</h2>
</div>

<div class="row">
    <div class="col-md-12">
        <form name="formreporte">
            <div class="col-md-12">
                <h4>Establesca el tipo de reporte, la fecha inicial y final para generar un reporte.</h4>
                <br>
            </div>
            <div class="col-md-3" >
                <div class="form-group">
                    <div class="form_error"></div>
                    <div class="form_label"><label for="selectReporte">Tipo de reporte : </label></div>
                    <div class="form_input">
                        <select class="form-control" id="selectReporte" name="selectReporte">
                            <option value="">Seleccione .. </option>
                            <option value="reporteProductos">Reporte de productos vendidos</option>
                            <option value="reporteIngredientes">Reporte de ingredientes vendidos</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-md-3" >
                <div class="form-group">
                    <div class="form_error"></div>
                    <div class="form_label"><label for="fechaInicioreporte">Fecha inicio:</label></div>
                    <div class="form_input"><input type="date" id="fechaInicioreporte" name="fechaInicioreporte" class="form-control" required></div>
                </div>
            </div>
            <div class="col-md-3" >
                <div class="form-group">
                    <div class="form_error"></div>
                    <div class="form_label"><label for="fechaFinreporte">Fecha fin:</label></div>
                    <div class="form_input"><input type="date" id="fechaFinreporte" name="fechaFinreporte" class="form-control" required></div>
                </div>
            </div>
        </form>
        <div class="col-md-3" >
            <div class="form-group">
                <div class="form_error"></div>
                <div class="form_label"><label><br></label></div>
                <div class="form_input"><button type="button" class="btn btn-block btn-primary btnGenerarReporte">Generar reporte</button></div>
            </div>
        </div>
    </div>

    <div class="col-md-12" style="background-color: #eeeded;">
        <div class="col-md-12">
            <br><br>
            <center><h3 class="tituloReporte"></h3></center>
        </div>
        <div class="col-md-6 contenedorReporte">
        </div>
        <div class="col-md-6 opcionesReporte" hidden>
            <br><br><br><br>
            <div class="col-md-6">                        
                <a href="#" class="tile tile-primary tile-valign"><span class="fa fa-print"></span><br><h5 style="color:white;">Imprimir</h5></a>                        
            </div>
        </div>
    </div>
</div>