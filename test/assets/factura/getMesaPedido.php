<?php

session_start();

echo json_encode(array('idpedido' => $_SESSION["idpedido"],'idmesa' => $_SESSION["idmesa"],'numeromesa' => $_SESSION["numeromesa"]));

