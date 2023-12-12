// login.js
$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault();

        var username = $('#loginUsername').val();
        var password = $('#loginPassword').val();

        // En un entorno de producción, envía estos datos al servidor para la autenticación.
        // Aquí se utiliza una simulación simple.
        var role = (username === 'admin' && password === 'admin') ? 'admin' : 'user';

        alert(`Inicio de sesión exitoso:\nUsuario: ${username}\nRol: ${role}`);

        // Puedes almacenar el rol en una cookie o en el almacenamiento local para futuras comprobaciones.
    });
});
