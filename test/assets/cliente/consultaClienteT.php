<?php

require("../conn.php");


$tel = "";

if($_POST['tel'] != ""){
    $tel = $_POST['tel'];
} else {
    $tel = "CAMPOVACIO";
}

$q = "SELECT * FROM cliente where telefonoCliente like '%$tel%'";

$result = $conn->query($q);
if(!$result) die($conn->error);

$rows = $result->num_rows;
$clientes = array();

for($i=0;$i<$rows;$i++){
    $result->data_seek($i);
    $clientes[] = $result->fetch_array(MYSQLI_ASSOC);
}

print_r(json_encode($clientes));