<?php

require ("../conn.php"); 

if($_POST){

    $idsubmenu = $_POST["idsubmenu"];
    
    $query="SELECT * FROM submenu sm join menu m on (m.idMenu=sm.idMenu) where sm.idSubmenu like '$idsubmenu'";
    $result = $conn->query($query);
    if(!$result) die($conn->error);
    $result->data_seek(0);
    $menu = $result->fetch_array(MYSQLI_ASSOC);

    echo json_encode($menu);
    
}

/*

if($_POST){

    $idsubmenu = $_POST["idsubmenu"];

    $query="SELECT * FROM submenu sm join menu m on (m.idMenu=sm.idMenu) where sm.idSubmenu like '$idsubmenu'";
    $result = $conn->query($query);
    if(!$result) die($conn->error);
    $result->data_seek(0);
    $menu = $result->fetch_array(MYSQLI_ASSOC);

    echo json_encode($menu);

}

*/