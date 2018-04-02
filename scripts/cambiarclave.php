<?php

////////////////////////////////////////////////////////////////////////////////////DEBUG EN PANTALLA
error_reporting(E_ALL);
ini_set('display_errors', 1);

require ("../assets/conn.php");

session_start();
$user = $_SESSION["usuario"]["nombreUsuario"];
//
//$select_compare = mysqli_query($link, "SELECT passwordUsuario FROM tblusuario WHERE cpuser = '" . $user . "'");
//$row_compare = mysqli_fetch_row($select_compare);
//$compare = $row_compare[0];
//

$query = "SELECT passwordUsuario FROM usuario WHERE nombreUsuario = '" . $user . "'";
$result = $conn->query($query);
$result->data_seek(0);
$row_compare = $result->fetch_array(MYSQLI_BOTH);
$compare = $row_compare[0];

if (isset($_POST["submit"])) {
    if ($_POST["oldpass"] == $compare) {
        $query = "UPDATE usuario SET passwordUsuario = '" . $_POST['newpass'] . "' WHERE nombreUsuario = '" . $user . "'";
        $result = $conn->query($query);
        $msg_pass .= " Contraseña cambiada con éxito. ";
        $box = "primary";
    } else {
        $msg_pass .= " No pudimos validar su contraseña anterior, por favor intenta nuevamente. ";
        $box = "danger";
    }
}
$_SESSION['msg'] = $msg_pass;
$_SESSION['box'] = $box;
header("Location: ../index.php?panel=user_config.php");
?>