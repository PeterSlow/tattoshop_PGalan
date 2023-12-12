<?php

// admin_productos.php

session_start();

// Verifica si el usuario es un administrador
if (!isset($_SESSION['admin_id'])) {
    // Redirige a la página de inicio de sesión si no está autenticado
    header("Location: admin_login.php");
    exit();
}

// Lógica para mostrar la página de administrador aquí
?>