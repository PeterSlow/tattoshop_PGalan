document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".nav-menu").classList.toggle("show");
});

ScrollReveal().reveal('.showcase');
ScrollReveal().reveal('.tattoo-cards', { delay: 500 });
ScrollReveal().reveal('.cards-banner-one', { delay: 500 });
ScrollReveal().reveal('.cards-banner-two', { delay: 500 });

// Lista de elementos del carrito en el almacenamiento local
var cartItemsLocal = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

// Lista de usuarios registrados en el almacenamiento local
var usuariosRegistrados = localStorage.getItem('usuarios') ? JSON.parse(localStorage.getItem('usuarios')) : [];

function toggleCart() {
  var cartPopup = document.getElementById('cartPopup');
  cartPopup.style.display = cartPopup.style.display === 'none' ? 'block' : 'none';

  updateCartView();  // Actualiza la vista del carrito
}

function addToCart(product, price, image) {
  var existingItem = cartItemsLocal.find(item => item.product === product);

  if (existingItem) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      existingItem.quantity++;
  } else {
      // Si es un nuevo producto, agrégalo al carrito con cantidad 1
      cartItemsLocal.push({ product: product, price: price, image: image, quantity: 1 });
  }

  updateCartView();
  saveCartToLocal(); // Guarda los cambios en el almacenamiento local
}

function updateCartView() {
  var cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';

  var total = 0;

  for (var i = 0; i < cartItemsLocal.length; i++) {
      var cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      var itemTotalPrice = cartItemsLocal[i].price * cartItemsLocal[i].quantity;
      total += itemTotalPrice;

      cartItem.innerHTML = `
          <img src="${cartItemsLocal[i].image}" alt="${cartItemsLocal[i].product}">
          <span class="remove-item" data-index=${i}>x</span>
          <span>${cartItemsLocal[i].product} - $${cartItemsLocal[i].price} x 
              <button class="quantity-btn" data-index=${i} data-increment=true>+</button>
              ${cartItemsLocal[i].quantity}
              <button class="quantity-btn" data-index=${i} data-increment=false>-</button>
              = $${itemTotalPrice.toFixed(2)}
          </span>`;
      cartItemsContainer.appendChild(cartItem);
  }

  // Muestra el precio total
  cartItemsContainer.innerHTML += `<div>Total: $${total.toFixed(2)}</div>`;

  // Agrega event listeners para los botones de cantidad
  var quantityBtns = document.querySelectorAll('.quantity-btn');
  quantityBtns.forEach(btn => {
      btn.addEventListener('click', updateQuantity);
  });
}

function updateQuantity(e) {
  const ind = e.target.dataset.index;
  const increment = e.target.dataset.increment === 'true';

  if (increment) {
      cartItemsLocal[ind].quantity++;
  } else {
      if (cartItemsLocal[ind].quantity > 1) {
          cartItemsLocal[ind].quantity--;
      }
  }

  updateCartView();
  saveCartToLocal();
}

function saveCartToLocal() {
  localStorage.setItem('carrito', JSON.stringify(cartItemsLocal));
}

// Agrega un event listener para el contenedor del carrito
document.getElementById('cartItems').addEventListener('click', removeCartItem);

function removeCartItem(e) {
  if (e.target.matches('span.remove-item')) {
      const ind = e.target.dataset.index;
      cartItemsLocal.splice(ind, 1);
      updateCartView();
      saveCartToLocal();
  }
}

function finalizarCompra() {
  // Redirige a la página de checkout con los datos del carrito como parámetro en la URL
  window.location.href = 'checkout.html?carrito=' + encodeURIComponent(JSON.stringify(cartItemsLocal));
}

// Función para mostrar u ocultar el formulario de registro
function toggleFormularioRegistro() {
  // Oculta el carrito si está abierto
  document.getElementById('cartPopup').style.display = 'none';

  // Alterna la visibilidad del formulario de registro
  var registroForm = document.getElementById('registroForm');
  registroForm.style.display = registroForm.style.display === 'none' ? 'block' : 'none';
}

// Función para registrar un usuario
function registrarUsuario(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const contrasena = document.getElementById('contrasena').value;

  // Guarda la información del usuario en la lista de usuarios
  usuariosRegistrados.push({ nombre, email, contrasena });
  localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

  // Oculta el formulario de registro
  document.getElementById('registroForm').style.display = 'none';

  // Muestra el icono del carrito
  document.querySelector('.cart-icon').style.display = 'block';

  // Actualiza la barra de navegación para mostrar "Cerrar Sesión"
  actualizarBarraNavegacion();
}

// Función para verificar la sesión y actualizar la barra de navegación
function actualizarBarraNavegacion() {
  const navMenuRight = document.querySelector('.nav-menu-right');
  const usuario = verificarSesion();

  if (usuario) {
      // Si hay un usuario, muestra "Cerrar Sesión" y el icono del carrito
      navMenuRight.innerHTML = `
          <li>
              <a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>
          </li>
          <li class="cart-icon" onclick="toggleCart()">
              <i class="fas fa-shopping-cart"></i>
          </li>
          <li>
              <a href="#">
                  <i class="fas fa-search"></i>
              </a>
          </li>`;
  } else {
      // Si no hay un usuario, muestra "Registrarse" y oculta el icono del carrito
      navMenuRight.innerHTML = `
          <li>
              <a href="#" onclick="toggleFormularioRegistro()">Registrarse</a>
          </li>
          <li style="display: none;" class="cart-icon" onclick="toggleCart()">
              <i class="fas fa-shopping-cart"></i>
          </li>
          <li>
              <a href="#" onclick="iniciarSesion()">Iniciar Sesión</a>
          </li>
          <li>
              <a href="#">
                  <i class="fas fa-search"></i>
              </a>
          </li>`;
  }
}

// Función para iniciar sesión (simulada)
function iniciarSesion() {
  const email = prompt("Ingrese su correo electrónico");
  const contrasena = prompt("Ingrese su contraseña");

  // Verifica si las credenciales son correctas comparando con la lista de usuarios registrados
  const usuarioEncontrado = usuariosRegistrados.find(user => user.email === email && user.contrasena === contrasena);

  if (usuarioEncontrado) {
      // Si las credenciales son correctas, muestra un mensaje
      alert(`Bienvenido, ${usuarioEncontrado.nombre}!`);

      // Llama a verificarSesion para actualizar la barra de navegación
      verificarSesion();
  } else {
      // Si las credenciales son incorrectas, muestra un mensaje de error
      alert("Credenciales incorrectas. Inténtelo de nuevo.");
  }
}



// Función para cerrar la sesión
function cerrarSesion() {
  // Elimina la información del usuario de la sesión
  localStorage.removeItem('sesionIniciada');
  // Limpia la información del usuario
  limpiarUsuarioSesion();
  // Actualiza la barra de navegación
  verificarSesion();
}


 // Función para verificar la sesión y actualizar la barra de navegación
 function verificarSesion() {
  const usuario = obtenerUsuarioSesion();

  if (usuario) {
      // Si hay un usuario, muestra "Cerrar Sesión" y el icono del carrito
      document.getElementById('inicioSesionLink').style.display = 'none';
      document.getElementById('cerrarSesion').style.display = 'block';
      document.querySelector('.cart-icon').style.display = 'block';
      // Muestra el nombre del usuario
      document.getElementById('usuario-info').style.display = 'block';
      document.getElementById('usuario-info').innerText = `¡Hola, ${usuario.nombre}!`;
  } else {
      // Si no hay un usuario, muestra "Iniciar Sesión" y oculta el icono del carrito
      document.getElementById('inicioSesionLink').style.display = 'block';
      document.getElementById('cerrarSesion').style.display = 'none';
      document.querySelector('.cart-icon').style.display = 'none';
      // Oculta el nombre del usuario
      document.getElementById('usuario-info').style.display = 'none';
  }
}
function limpiarUsuarioSesion() {
  localStorage.removeItem('usuarioSesion');
}



// Llama a la función para actualizar la barra de navegación al cargar la página
actualizarBarraNavegacion();
