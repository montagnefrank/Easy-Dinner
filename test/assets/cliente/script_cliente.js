$(document).ready(function() {

    $('.btnRegistraCliente').click(function(){

        if($("form[name='guardar_cliente']").valid()){

            $.ajax({
                // Verificacion de los datos introducidos
                url : 'assets/cliente/registraCliente.php',
                data : { 
                    cedula : $("form[name='guardar_cliente'] #cedula").val(),
                    nombre : $("form[name='guardar_cliente'] #nombre").val(),
                    telefono : $("form[name='guardar_cliente'] #telefono").val(),
                    email : $("form[name='guardar_cliente'] #email").val(),
                    direccion : $("form[name='guardar_cliente'] #direccion").val()
                },
                type : 'POST',
                success : function(cliente) {
                    if(cliente){
                        $("#nuevoCliente").modal("hide");
                        $.notify("Cliente "+$("form[name='guardar_cliente'] #cedula").val()+" registrado exitosamente.", "success");
                        $("form[name='guardar_cliente']")[0].reset();
                    }else{
                        $.notify("El cliente con cédula/RUC "+$("form[name='guardar_cliente'] #cedula").val()+" ya se encuentra registrado.", "error");
                    }
                },
                error : function(error) {
                    console.log('Disculpe, existió un problema');
                    console.log(error);
                },
                complete : function(xhr, status) {
                    console.log('Petición realizada');
                }
            });
        }

    });

    $('#nuevoCliente').on('hidden.bs.modal', function () {
        $("form[name='guardar_cliente']")[0].reset();
    });

    $('.btnEditarCliente').click(function(){
        console.log("click");
        if($("form[name='editar_cliente']").valid()){
            $.ajax({
                // Verificacion de los datos introducidos
                url : 'assets/cliente/editaCliente.php',
                dataType:"json",
                data : { 
                    cedula : $("form[name='editar_cliente'] #cedula").val(),
                    nombre : $("form[name='editar_cliente'] #nombre").val(),
                    telefono : $("form[name='editar_cliente'] #telefono").val(),
                    email : $("form[name='editar_cliente'] #email").val(),
                    direccion : $("form[name='editar_cliente'] #direccion").val()
                },
                type : 'POST',
                success : function(cliente) {
                    if(cliente){
                        $("#editaCliente").modal("hide");
                        $.notify("Cliente "+$("form[name='editar_cliente'] #cedula").val()+" editado exitosamente.", "success");
                        $("#nombre_cliente").val(cliente.nombreCliente);
                        $("#telefono_cliente").val(cliente.telefonoCliente);
                        $("#email_cliente").val(cliente.emailCliente);
                        $("#direccion_cliente").val(cliente.direccionCliente);
                    }
                },
                error : function(error) {
                    console.log('Disculpe, existió un problema');
                    console.log(error);
                },
                complete : function(xhr, status) {
                    console.log('Petición realizada');
                }
            });

        }

    });

    $('.btnEliminaCliente').click(function(){
        $('.contenidoElimina').html("<center><h3>Desea realmente eliminar el cliente con cédula/RUC</h3><br><h2>"+$("form[name='editar_cliente'] #cedula").val()+"</h2></center>");
    });

    $('.btnConfirmaEliminaCliente').click(function(){
        $.ajax({
            // Verificacion de los datos introducidos
            url : 'assets/cliente/eliminaCliente.php',
            dataType:"json",
            data : { 
                cedula : $("form[name='editar_cliente'] #cedula").val(),
            },
            type : 'POST',
            success : function(respuesta) {
                if(respuesta){
                    $("#editaCliente").modal("hide");
                    
                    $("#cedula_cliente").val("");
                    $("#nombre_cliente").val("");
                    $("#telefono_cliente").val("");
                    $("#email_cliente").val("");
                    $("#direccion_cliente").val("");

                    $.notify("Cliente "+$("form[name='editar_cliente'] #cedula").val()+" eliminado exitosamente.", "success");
                    
                    $("form[name='editar_cliente'] #cedula").val("");
                    $("form[name='editar_cliente'] #nombre").val("");
                    $("form[name='editar_cliente'] #telefono").val("");
                    $("form[name='editar_cliente'] #email").val("");
                    $("form[name='editar_cliente'] #direccion").val("");
                    
                    $("#eliminaCliente").modal("hide");

                }
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





});