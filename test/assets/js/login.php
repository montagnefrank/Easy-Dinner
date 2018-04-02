<?php

require ("conn.php");

if($_POST){

    $username =$_POST["username"];
    $password = $_POST["password"];

    $query="SELECT * FROM usuario where nombreUsuario ='$username'";
    $result = $conn->query($query);
    if(!$result) die($conn->error);
    $rows = $result->num_rows;
    $result->data_seek(0);
    $row=$result->fetch_array(MYSQLI_ASSOC);

    if(($rows!=0)&&($row['passwordUsuario']==$password)){
        $_SESSION["usuario"] = $row;
        echo json_encode($_SESSION["usuario"]);
    }else{
        echo 'false';
    }

}

