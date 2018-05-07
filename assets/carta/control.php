<?php

require ("../conn.php");

if (isset($_POST['buildMenu'])) {
    
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

if (isset($_POST['buildItems'])) {
    
    $items = array();
    $idmenu = $_POST["tabIndex"];
    
    $query="SELECT * FROM producto pr INNER JOIN submenu sm ON pr.idSubmenu = sm.idSubmenu WHERE idMenu = '$idmenu'";
    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;

    for($i=0;$i< $rows;$i++){
        $result->data_seek($i);
        $items[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    if($rows!=0){
        echo json_encode($items);
    }else{
        echo 'No se ha encontrado elementos para ese menu' . $query;
    }


}


?>