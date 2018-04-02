$(document).ready(function () {
    estableceEstablecimiento();
    //VALIDACION DEL FORM INPUT FILE
    $( "form[name='formImagen']" ).validate({
        rules: {
            "fileImagen": {
                required: true,
                extension: "jpeg|png|jpg|gif"
            }
        },
        messages: {
            "fileImagen": {
                required : "Seleccione una imagen.",
                extension : "Solo imagenes de tipo jpg son permitidas."
            }
        }
    });

    $(".btnSubeImagen").click(function(){
        //CUANDO LA IMAGEN ESTA CORRECTA
        if($("form[name='formImagen']").valid()){
            $("#confirmacionCambioFoto").modal("show");

        }

    });

    //Confirmacion de guardado de imagen
    $(".btnConfirmaImagen").click(function(){
        $.ajax({
            url: 'assets/user_config/user_config_controller.php',
            type: 'POST',
            data: {
                imagenNueva: imagen,
            },
            success: function (respuesta) {
                if(respuesta){                    
                    $(".fotoPerfil img").attr("src",imagen);
                    $(".fotoAntigua img").attr("src",imagen);
                    $("#confirmacionCambioFoto").modal("hide");
                    $("#modal_change_photo").modal("hide");

                    $.notify("Foto de perfil actualizada con exito !", "success");
                }
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

    $("#fileImagen").change(function(){
        readURL(this);
    });

    var imagen;
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.nuevaImagen').attr('src', e.target.result);
                imagen = e.target.result ;
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    /* Para establecimiento */ 

    $(".widgetEstablecimiento").click(function(){
        $("#modal_change_establecimiento").modal("show");
    });

    $(".btnEstableceEstablecimiento").click(function(){

        //ESTA CHEKADO
        if($(".radioEstablecimiento input:radio:checked").val() != ""){
            $.ajax({
                url: 'assets/user_config/user_config_controller.php',
                type: 'POST',
                dataType : "json",
                data: {
                    establecimiento: $(".radioEstablecimiento input:radio:checked").val(),
                },
                success: function (respuesta) {

                    if(respuesta){
                        $("#modal_change_establecimiento").modal("hide");

                        $(".nombreEstablecimiento").text(respuesta.nombreEstablecimiento+" "+respuesta.sectorEstablecimiento);
                        $.notify(respuesta.nombreEstablecimiento+" "+respuesta.sectorEstablecimiento+" establecido con exito !", "success");
                    }

                },
                error: function (error) {
                    console.log('Disculpe, existió un problema');
                    console.log(error);
                },
                complete: function (xhr, status) {
                    console.log('Petición realizada');
                }
            });
        }else{
            $.notify("Error \nSeleccione un establecimiento para la asignación del mismo !", "error");
        }
    });

    function estableceEstablecimiento(){
        $.ajax({
            url: 'assets/user_config/user_config_controller.php',
            type: 'GET',
            data: {
                establecimiento: true,
            },
            success: function (respuesta) {
                
                $(".radioEstablecimiento .btn-primary").each(function(index,value) {
                    $(this).removeClass("active");
                    if($(this).find("input[type='radio']").val() == respuesta){
                        $(this).addClass("active");
                        $(this).find("input[type='radio']").prop("checked",true);
                    }
                });

            },
            error: function (error) {
                console.log('Disculpe, existió un problema');
                console.log(error);
            },
            complete: function (xhr, status) {
                console.log('Petición realizada');
            }
        });

    }
    
    /* Para el cambio de contraseña */ 

});