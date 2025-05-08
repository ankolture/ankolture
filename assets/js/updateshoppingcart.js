function actualizarContadorCarrito() {
    const cartCount = document.querySelectorAll('.cart-count');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cartCount.textContent = carrito.length;


    const totalProductos = carrito.reduce((sum, prod) => sum + prod.cantidad, 0);
    cartCount.forEach(el => el.textContent = totalProductos);

    const btnHola = document.getElementById('btnHola');
    if (btnHola) { 
        if (carrito.length > 0) {
            btnHola.style.display = 'inline-block';
        } else {
            btnHola.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);
