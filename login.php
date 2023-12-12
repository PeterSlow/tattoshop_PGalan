<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Realiza la autenticación en la base de datos.
    // Aquí se omite la validación de seguridad para mantener el ejemplo simple.
    $hashed_password = password_hash('admin_password', PASSWORD_DEFAULT);
    $role = ($username === 'admin' && password_verify($password, $hashed_password)) ? 'admin' : 'user';

    if ($role === 'admin') {
        $_SESSION['username'] = $username;
        $_SESSION['role'] = $role;
        header('Location: tienda_admin.html');
        exit();
    } else {
        echo "Nombre de usuario o contraseña incorrectos.";
    }
}
?>
