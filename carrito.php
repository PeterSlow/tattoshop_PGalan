<?php
// carrito.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibe los datos del carrito desde la solicitud AJAX
    $product = $_POST['product'];
    $price = $_POST['price'];

    // Conecta con tu base de datos (ajusta estos valores según tu configuración)
    $servername = "localhost";
    $username = "root";
    $password = "albarregas";
    $dbname = "tattoshop";

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
echo "intento de conexion";
    // Escapa los datos para evitar inyecciones SQL
    $product = $conn->real_escape_string($product);
    $price = $conn->real_escape_string($price);

    // Inserta los datos en la tabla "carrito" (ajusta según tu esquema de base de datos)
    $sql = "INSERT INTO carrito (product, price) VALUES ('$product', '$price')";

    if ($conn->query($sql) === TRUE) {
        echo "Producto agregado a la base de datos con éxito";
    } else {
        echo "Error al agregar el producto a la base de datos: " . $conn->error;
    }

    $conn->close();
}
?>
