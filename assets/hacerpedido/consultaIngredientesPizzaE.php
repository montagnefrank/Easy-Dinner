<?php

require ("../conn.php");

if($_POST){
    
    $nombreProducto = $_POST["nombreProducto"];
    $nombreSubmenu = $_POST["nombreSubmenu"];
    
    
    $query="SELECT * FROM submenu m join producto p on(m.idSubmenu = p.idSubmenu) where m.nombreSubmenu like '$nombreSubmenu' and p.nombreProducto like '$nombreProducto'";
    
    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    
    $result->data_seek(0);
    $producto = $result->fetch_array(MYSQLI_ASSOC);
    
    
    
    $idproducto = $producto["idProducto"];
    
    $query="SELECT * FROM ingrediente i join productoingrediente ip on(i.idIngrediente = ip.idIngrediente) where ip.idProducto like '$idproducto' order by nombreIngrediente ASC";
    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $ingredientes = array();

    for($i=0;$i< $rows;$i++){
        $result->data_seek($i);
        $ingredientes[] = $result->fetch_array(MYSQLI_ASSOC);
    }

    if($rows!=0){
        echo json_encode($ingredientes);
    }else{
        echo json_encode([]);
    }
    
}
