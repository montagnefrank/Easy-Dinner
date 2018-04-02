<script>
    ////////////////////////////////////////////////////////////////////////////AUTOCOMPLETE DE PEDIDOS FACTURADOS
    $(function () {

        var data_1 = [<?php
$select_facturas = "SELECT idFactura,idPedido,cedulaCliente 
                    FROM factura 
                    INNER JOIN cliente ON cliente.idCliente = factura.idCliente
                    WHERE statusFactura = 'ACTIVE'
                    ORDER BY idFactura";
$result_facturas = mysqli_query($conn, $select_facturas);
while ($row_facturas = mysqli_fetch_array($result_facturas, MYSQLI_BOTH)) {
    echo '"Factura#: ' . $row_facturas["idFactura"] . ' - Pedido#: ' . $row_facturas["idPedido"] . ' - Cliente#: ' . $row_facturas["cedulaCliente"] . '",';
}
?>];

        $("#search_pedidos").autocomplete({
            source: data_1,
            open: function (event, ui) {

                var autocomplete = $(".ui-autocomplete:visible");
                var oldTop = autocomplete.offset().top;
                var newTop = oldTop - $("#prod_ac").height() + 25;
                autocomplete.css("top", newTop);

            }
        });
    });
</script>
<?php
if (isset($_GET["verfactura"])) {
    if ($_GET["verfactura"] == "last") {
        $select_pedido = "SELECT * FROM factura ORDER BY idFactura DESC LIMIT 1";
        $result_pedido = mysqli_query($conn, $select_pedido);
        $row_pedido = mysqli_fetch_array($result_pedido);
         echo "
        <script>
            window.location.href = 'index.php?panel=caja.php&verfactura=".$row_pedido["idFactura"]."';
        </script>";
         goto salidaif;
    } else {
        $select_pedido = "SELECT * FROM factura WHERE idFactura = '" . $_GET["verfactura"] . "' LIMIT 1";
        $result_pedido = mysqli_query($conn, $select_pedido);
        $row_pedido = mysqli_fetch_array($result_pedido);
    }
    echo "
        <script>
        $('#modal_consultar_factura .modal-dialog .modal-content .modal-header .modal-title').html('<i class=\"fa fa-pencil-square-o\"></i> Consultar Factura</h4>');
            $('#modal_consultar_factura .modal-dialog .modal-content .modal-body').html(\"\");
            $('#modal_consultar_factura .modal-dialog .modal-content .modal-body')
                    .append(\"\\n\\
                            <div id='verfactura_datos'>\\n\\
                            </div>\\n\\
                                \");
            var idfactura = '" . $row_pedido["idFactura"] . "';
            consultarfactura(idfactura);
            $('#modal_consultar_factura .modal-dialog .modal-content .modal-body')
                    .append('<table class=\"table consultafacturatabla\" style=\"border:1px solid #d8d8d8;\">\\n\\
                    <tbody class=\"tablaconsultarfactura\">\\n\\
                    </tbody>\\n\\
                </table>');
            var idpedido = '" . $row_pedido["idPedido"] . "';
            consultarpeddo(idpedido);
            ";
    if ($row_pedido["statusFactura"] == "ACTIVE"){
        echo "$('#modal_consultar_factura .modal-dialog .modal-content .modal-body')
                    .append(\"<div class=row'>\\n\\
                        <button onclick='exporttopdftable()' id='imprimir_factura' type='button' class='btn btn-primary btn-lg pull-right' style='margin-top: 16px;margin-right: 16px;'><i class='fa fa-print' aria-hidden='true'></i> Imprimir</button>\\n\\
                        <button id='anular_factura' type='button' class='btn btn-primary btn-lg pull-right' style='margin-top: 16px;margin-right: 16px;'><i class='fa fa-times' aria-hidden='true'></i> Anular Factura</button>\\n\\
                </div>\");
            $('#modal_consultar_factura').modal('toggle');
        </script>
        ";
    } else {
        echo "$('#modal_consultar_factura .modal-dialog .modal-content .modal-body')
                    .append(\"<div class=row'>\\n\\
                        <button id='imprimir_factura' disabled='disabled' type='button' class='btn btn-primary btn-lg pull-right' style='margin-top: 16px;margin-right: 16px;'><i class='fa fa-print' aria-hidden='true'></i> Imprimir</button>\\n\\
                        <button id='reactivar_factura' type='button' class='btn btn-success btn-lg pull-right' style='margin-top: 16px;margin-right: 16px;'><i class='fa fa-check' aria-hidden='true'></i> Reactivar Factura</button>\\n\\
                </div>\");
            $('#modal_consultar_factura').modal('toggle');
        </script>
        ";
    }
}
salidaif:
?>
<script>
    ///////////////////////////////////////////////////////////////////////////AL ANULAR LA FACTURA
    $(document).on('click', '#anular_factura', function () {
        var idFactura = '<?php echo $_GET["verfactura"] ?>'
        $.ajax({
            url: 'assets/caja/anularfactura.php',
            type: 'POST',
            data: {
                idFactura: idFactura,
            },
            success: function (html) {
                window.location.href = "index.php?panel=caja.php&verfactura=" +html;
            },
            error: function (error) {
                console.log('Disculpe, existió un problema');
                console.log(error);
            },
            complete: function (xhr, status) {
                console.log('Petición realizada');
            }
        });
    });
</script>
<script>
    ///////////////////////////////////////////////////////////////////////////AL REACTIVAR LA FACTURA
    $(document).on('click', '#reactivar_factura', function () {
        var idFactura = '<?php echo $_GET["verfactura"] ?>'
        $.ajax({
            url: 'assets/caja/reactivarfactura.php',
            type: 'POST',
            data: {
                idFactura: idFactura,
            },
            success: function (html) {
                window.location.href = "index.php?panel=caja.php&verfactura=" +html;
            },
            error: function (error) {
                console.log('Disculpe, existió un problema');
                console.log(error);
            },
            complete: function (xhr, status) {
                console.log('Petición realizada');
            }
        });
    });
</script>