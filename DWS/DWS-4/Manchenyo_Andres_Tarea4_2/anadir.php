<?php

require_once 'sesiones.php';
comprobar_sesion();
$cod = $_POST["cod"];
$unidades = (int)$_POST["unidades"];
if (isset($_SESSION["carrito"][$cod])) {
    $_SESSION["carrito"][$cod] += $unidades;
} else {
    $_SESSION["carrito"][$cod] = $unidades;
}
header("Location: categorias.php");
