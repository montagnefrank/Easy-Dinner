$(document).ready(function() {
    $.ajax({
        // Verificacion de los datos introducidos
        url : 'assets/mesas/getMesa.php',
        type : 'POST',
        success : function(mesa) {
            $(".page-title").html('<h2><span class="fa fa-pencil"></span> Añadir pedido a la mesa # '+mesa+'</h2>');
            $(".breadcrumb").append('<li>Mesa '+mesa+'</li>');
            
        },
        error : function(error) {
            console.log('Disculpe, existió un problema');
            console.log(error);
        },
        complete : function(xhr, status) {
            console.log('Petición realizada');
        }
    });
});