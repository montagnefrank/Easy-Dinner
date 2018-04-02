<?php

require ("../conn.php");

if($_POST){

    $idsubmenu = $_POST["idsubmenu"];
    
    $query="SELECT * FROM producto where idSubmenu like '$idsubmenu'";
    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $contentMenu = array();

    for($i=0;$i< $rows;$i++){
        $result->data_seek($i);
        $contentMenu[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    if($rows!=0){
        echo json_encode($contentMenu);
    }else{
        echo 'No se ha encontrado contenido de tal menú';
    }


}