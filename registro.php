<?php
// Agrega un campo para el rol durante el registro. Podría ser "user" o "admin".
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role']; // Asegúrate de agregar esto en tu formulario HTML.

    // En un entorno de producción, realiza la inserción en la base de datos.
    // Aquí se utiliza una simulación simple.
    $response = ['success' => true, 'message' => 'Usuario registrado correctamente.'];

    echo json_encode($response);
} else {
    header('Location: registro.html');
}
?>
