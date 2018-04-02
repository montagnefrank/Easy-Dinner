<?php

require ("../conn.php");

if($_POST){
    
    $idproducto = $_POST["idproducto"];
    
    $query="SELECT * FROM ingrediente i join productoingrediente ip on(i.idIngrediente = ip.idIngrediente) where ip.idProducto like '$idproducto'";
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
        echo 'No se ha encontrado contenido de tal menú';
    }
}
