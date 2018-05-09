<?php

require ("../conn.php");

if (isset($_POST['buildMenu'])) {///////////////////////////////////////////////CONSTRUIMOS EL MENU
    $menu = array();

    $query = "SELECT * FROM menu where estadoMenu='ACTIVO'";
    $result = $conn->query($query);
    if (!$result)
        die($conn->error);

    $rows = $result->num_rows;

    for ($i = 0; $i < $rows; $i++) {
        $result->data_seek($i);
        $menu[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    if ($rows != 0) {
        echo json_encode($menu);
    } else {
        echo 'No se ha encontrado elementos activos en el men&uacute;';
    }
}

if (isset($_POST['buildItems'])) { /////////////////////////////////////////////CONSTRUIMOS LOS ITEMS DEL MENU
    $items = array();
    $idmenu = $_POST["tabIndex"];

    $query = "SELECT * FROM producto pr INNER JOIN submenu sm ON pr.idSubmenu = sm.idSubmenu INNER JOIN menu me ON sm.idMenu = me.idMenu WHERE me.idMenu = '$idmenu'";
    $result = $conn->query($query);
    if (!$result)
        die($conn->error);

    $rows = $result->num_rows;

    for ($i = 0; $i < $rows; $i++) {
        $result->data_seek($i);
        $items[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    if ($rows != 0) {
        echo json_encode($items);
    } else {
        echo 'No se ha encontrado elementos para ese menu' . $query;
    }
}

if (isset($_POST['buildIngredients'])) {//////////////////////////////////////// LLAMAMOS DE LA BASE TODO EL CONTENIDO DEL PANEL DE CLIENTES
    $ingredientes = array();
    $ingredientes['receta'] = array();
    $ingredientes['extras'] = array();
    $idproducto = $_POST["idProducto"];
    $idmenu = $_POST["idMenu"];

    ////////////////////////////////////////////////////////////////////////////LLAMAMOIS A LOS INGREDIENTES A MOSTRAR EN LA RECETA
    $query = "SELECT * FROM ingrediente i JOIN productoingrediente ip ON (i.idIngrediente = ip.idIngrediente) WHERE ip.idProducto = '$idproducto' ORDER BY nombreIngrediente ASC";
    $result = $conn->query($query);
    if (!$result)
        die($conn->error);

    $rows = $result->num_rows;

    for ($i = 0; $i < $rows; $i++) {
        $result->data_seek($i);
        $ingredientes['receta'][] = $result->fetch_array(MYSQLI_ASSOC);
    }

    //////////////////////////////////////////////////////////////////////////// LLAMAMOS A LOS INGREDIENTES ADICIONALES PARA ESE MENU
    $query = "SELECT * FROM ingrediente WHERE tipoIngrediente = '$idmenu' ORDER BY nombreIngrediente ASC";
    $result = $conn->query($query);
    if (!$result)
        die($conn->error);

    $rows2 = $result->num_rows;

    for ($i = 0; $i < $rows2; $i++) {
        $result->data_seek($i);
        $ingredientes['extras'][] = $result->fetch_array(MYSQLI_ASSOC);
    }

    echo json_encode($ingredientes);
}
?>