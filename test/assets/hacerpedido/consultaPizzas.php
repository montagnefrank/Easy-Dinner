<?php

require ("../conn.php");


if($_POST["nombreProducto"]){
    
    $nombreProducto = $_POST["nombreProducto"];
    
    $query="SELECT * FROM submenu sb join menu m on(sb.idMenu=m.idMenu) join producto p on(p.idSubmenu = sb.idSubmenu) where m.nombreMenu = 'Pizzas' and p.nombreProducto = '$nombreProducto'";
    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $pizzas = array();

    for($i=0;$i< $rows;$i++){
        $result->data_seek($i);
        $pizzas[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    if($rows!=0){
        echo json_encode($pizzas);
    }else{
        echo 'No se ha encontrado contenido de tal menú';
    }
}

