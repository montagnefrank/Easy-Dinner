
$(document).ready(function() {

    var existeusuario = false;
    $('.page-container form').submit(function( e ){
        e.preventDefault();
        var username = $(this).find('.username').val();
        var password = $(this).find('.password').val();

        if(username == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '27px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });

            return false;
        }
        if(password == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '96px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }

        //Cuando exista texto en el input usuario y contraseña
        if(username != '' && password != ''){
            var estado = false;
            $.ajax({
                // Verificacion de los datos introducidos
                url : 'assets/login/login.php',
                data : { 
                    username : username,
                    password : password
                },
                dataType:"json",
                type : 'POST',
                success : function(respuesta) {
                    var status =respuesta.statusUsuario;
                    if(respuesta == false){
                        existeusuario = false;
                        $(".notificacion").html('<b style="font-size: 24px;">Error ! </b><p>Nombre de usuario y/o contraseñas incorrectos, intente nuevamente</p>');
                        $(".notificacion").show('slow').delay(4000).hide('slow');
                        $('.username').val('');
                        $('.password').val('');
                    }else{
                        existeusuario = true;
                        
                        if(status == 1){
                          window.location.href = "estableceEstablecimiento.php";  
                        }else{
                            existeusuario = false;
                            $(".notificacion").html('<b style="font-size: 24px;">Error ! </b><p>Usuario desactivado, por favor contacte con el administrador del sistema</p>');
                            $(".notificacion").show('slow').delay(4000).hide('slow');
                            $('.username').val('');
                            $('.password').val('');
                        }
                     //   window.location.href = "estableceEstablecimiento.php";
                        //
                        
                    }
                },
                error : function(error) {
                    console.log('Disculpe, existió un problema');
                    $(".notificacion").html('<b style="font-size: 24px;">Error ! </b><p>Nombre de usuario y/o contraseñas incorrectos, intente nuevamente</p>');
                    console.log(error);
                },
                complete : function(xhr, status) {
                    console.log('Petición realizada');
                }
            });
        }
    });

    $('.page-container form .username, .page-container form .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });

});
