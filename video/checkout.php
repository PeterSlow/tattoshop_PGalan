<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout</title>

    <!-- Agrega cualquier enlace a tus estilos CSS si es necesario -->
</head>

<body>
    <h1>Resumen de Compra</h1>

    <?php
    // Obtén los datos del carrito de la URL o del almacenamiento local
    $carrito = isset($_GET['carrito']) ? json_decode($_GET['carrito'], true) : [];

    if (empty($carrito)) {
        echo '<p>El carrito está vacío.</p>';
    } else {
        // Muestra los productos y otra información relevante
        echo '<table border="1">
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>';

        $totalCompra = 0;

        foreach ($carrito as $item) {
            $totalProducto = $item['price'] * $item['quantity'];
            $totalCompra += $totalProducto;

            echo '<tr>
                    <td>' . $item['product'] . '</td>
                    <td>$' . $item['price'] . '</td>
                    <td>' . $item['quantity'] . '</td>
                    <td>$' . number_format($totalProducto, 2) . '</td>
                </tr>';
        }

        echo '</table>';

        // Muestra el precio total
        echo '<p>Total de la compra: $' . number_format($totalCompra, 2) . '</p>';

        // Aquí puedes agregar el formulario de pago con tu pasarela de pago
        echo '<h2>Información de Pago</h2>';
        echo '<form action="procesar_pago.php" method="post">';
        echo 'Nombre en la Tarjeta: <input type="text" name="nombre_tarjeta" required><br>';
        echo 'Número de Tarjeta: <input type="text" name="numero_tarjeta" required><br>';
        echo 'Fecha de Expiración: <input type="text" name="fecha_expiracion" required><br>';
        echo 'Código de Seguridad: <input type="text" name="codigo_seguridad" required><br>';
        echo '<input type="submit" value="Pagar">';
        echo '</form>';
    }
    ?>

    <!-- Agrega cualquier otro contenido o script que necesites -->

</body>

</html>
