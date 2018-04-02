<?php

require ("../conn.php");


if($_POST){

    $tipoIngrediente = $_POST["tipoIngrediente"];

    if($tipoIngrediente =="Crepes y Postres"){
        $query="SELECT * FROM ingrediente where tipoIngrediente = '$tipoIngrediente' order by nombreIngrediente ASC";
    }else{
        $query="SELECT * FROM ingrediente where tipoIngrediente = 'General' or tipoIngrediente = '$tipoIngrediente' order by nombreIngrediente ASC";
    }

    
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

