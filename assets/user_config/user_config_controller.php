<?php

require ("../conn.php");

//Para cuando se desea obtener el establecimiento del usuario
if(isset($_GET["establecimiento"])){

    session_start();
    $valor;
    
    if($_SESSION["usuario"]["idEstablecimiento"] == 1){
        $valor = "quitosur";
    }elseif($_SESSION["usuario"]["idEstablecimiento"] == 2){
        $valor = "villaflora";
    }elseif($_SESSION["usuario"]["idEstablecimiento"] == 3){
        $valor = "avmaestro";
    }
    
    echo $valor;
}

//Para cuando se desea cambiar la imagen del usuario
if(isset($_POST["imagenNueva"])){

    session_start();
    $data = $_POST["imagenNueva"];
    $target_dir = "../../img/users/";
    file_put_contents($target_dir.$_SESSION["usuario"]["nombreUsuario"].'.jpg', base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data)));
    echo true;
}

//Para establecer el establecimiento del usuario
if(isset($_POST["establecimiento"])){

    session_start();
    //echo json_encode($_SESSION["usuario"]);

    $idestablecimiento;

    if($_POST["establecimiento"] == "avmaestro"){
        $idestablecimiento = 3;
    }elseif($_POST["establecimiento"] == "quitosur"){
        $idestablecimiento = 1;
    }elseif($_POST["establecimiento"] == "villaflora"){
        $idestablecimiento = 2;
    }

    $idusuario = $_SESSION['usuario']['idUsuario'];

    $query="UPDATE usuario SET idEstablecimiento = '$idestablecimiento' WHERE idUsuario = '$idusuario'";


    $result = $conn->query($query);
    if(!$result) die($conn->error);

    //PARA ACTUALIZAR EL ESTABLECIMIENTO
    
    $query="SELECT * FROM establecimiento where idEstablecimiento like '$idestablecimiento'";
    $result = $conn->query($query);
    if(!$result) die($conn->error);
    $rows = $result->num_rows;
    $result->data_seek(0);
    $establecimiento=$result->fetch_array(MYSQLI_ASSOC);

     $_SESSION["usuario"]["idEstablecimiento"] = $idestablecimiento;
    $_SESSION["usuario"]["nombreEstablecimiento"] =  $establecimiento["nombreEstablecimiento"] ;
    $_SESSION["usuario"]["ciudadEstablecimiento"] = $establecimiento["ciudadEstablecimiento"];
    $_SESSION["usuario"]["telefonoEstablecimiento"] = $establecimiento["telefonoEstablecimiento"];
    $_SESSION["usuario"]["sectorEstablecimiento"] = $establecimiento["sectorEstablecimiento"];

    $_SESSION["usuario"]["nombreEstablecimiento"] = quitar_tildes($_SESSION["usuario"]["nombreEstablecimiento"]);
    $_SESSION["usuario"]["ciudadEstablecimiento"] = quitar_tildes($_SESSION["usuario"]["ciudadEstablecimiento"]);
    $_SESSION["usuario"]["sectorEstablecimiento"] = quitar_tildes($_SESSION["usuario"]["sectorEstablecimiento"]);

    echo json_encode($_SESSION["usuario"]);
}

function quitar_tildes($cadena) {
    $no_permitidas= array ("á","é","í","ó","ú","Á","É","Í","Ó","Ú","ñ","À","Ã","Ì","Ò","Ù","Ã™","Ã ","Ã¨","Ã¬","Ã²","Ã¹","ç","Ç","Ã¢","ê","Ã®","Ã´","Ã»","Ã‚","ÃŠ","ÃŽ","Ã”","Ã›","ü","Ã¶","Ã–","Ã¯","Ã¤","«","Ò","Ã","Ã„","Ã‹");
    $permitidas= array ("a","e","i","o","u","A","E","I","O","U","n","N","A","E","I","O","U","a","e","i","o","u","c","C","a","e","i","o","u","A","E","I","O","U","u","o","O","i","a","e","U","I","A","E");
    $texto = str_replace($no_permitidas, $permitidas ,$cadena);
    return $texto;
}

?>