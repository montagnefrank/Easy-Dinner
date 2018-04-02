$(document).ready(function() {

    $("form[name='guardar_cliente']").validate({
        rules: {
            cedula: {
                required: true,
                number: true,
                minlength:10,
                maxlength:13
            },
            nombre: "required",
            telefono: {
                required: true,
                number: true,
                minlength:6,
            },
            direccion: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            cedula: {
                required: "Ingrese la Cédula/RUC del cliente",
                number: "Ingrese solo números",
                minlength:"Ingrese un número de cédula de al menos 10 dígitos",
                maxlength:"Ingrese un número de cédula/RUC máximo de 13 dígitos"
            },
            nombre: "Ingrese el nombre y apellido del cliente",
            telefono: {
                required: "Ingrese el teléfono del cliente",
                number: "Ingrese solo números",
                minlength: "Ingrese un número telefónico de al menos 6 dígitos",
            },
            direccion: "Ingrese la dirección del cliente",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            email: {
                required: "Ingrese el email del cliente",
                email: "Ingrese un email valido"
            }
        }
    });

    $("form[name='editar_cliente']").validate({
        rules: {
            cedula: {
                required: true,
                number: true,
                minlength:10,
                maxlength:13
            },
            nombre: "required",
            telefono: {
                required: true,
                number: true,
                minlength:6,
            },
            direccion: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            cedula: {
                required: "Ingrese la Cédula/RUC del cliente",
                number: "Ingrese solo números",
                minlength:"Ingrese un número de cédula de al menos 10 dígitos",
                maxlength:"Ingrese un número de cédula/RUC máximo de 13 dígitos"
            },
            nombre: "Ingrese el nombre y apellido del cliente",
            telefono: {
                required: "Ingrese el teléfono del cliente",
                number: "Ingrese solo números",
                minlength: "Ingrese un número telefónico de al menos 6 dígitos",
            },
            direccion: "Ingrese la dirección del cliente",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            email: {
                required: "Ingrese el email del cliente",
                email: "Ingrese un email valido"
            }
        }
    });

});