<?php

require ("../conn.php");

$query="SELECT * FROM menu where estadoMenu='ACTIVO'";
$result = $conn->query($query);
if(!$result) die($conn->error);

$rows = $result->num_rows;
$menu = array();

for($i=0;$i< $rows;$i++){
    $result->data_seek($i);
    $menu[] = $result->fetch_array(MYSQLI_ASSOC);
}

if($rows!=0){
    echo json_encode($menu);
}else{
    echo 'No se ha encontrado menús';
}
