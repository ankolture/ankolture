function mostrarModal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const resumenDiv = document.getElementById('modal-resumen-carrito');
    const totalProductosSpan = document.getElementById('modal-total-productos');
    const totalPrecioSpan = document.getElementById('modal-total-precio');

    resumenDiv.innerHTML = ''; // Limpiar antes de renderizar

    let totalProductos = 0;
    let totalPrecio = 0;

    carrito.forEach(producto => {
        const itemHTML = `
      <div class="border-bottom py-2">
        <p class="mb-1"><strong>${producto.name} T-SHIRT</strong></p>
        <p class="mb-1">
          <strong>Tela:</strong> ${producto.tela} | 
          <strong>Género:</strong> ${producto.genero} | 
          <strong>Talla:</strong> ${producto.talla} | 
          <strong>Color:</strong> ${producto.color}
        </p>
        <p class="mb-1">Cantidad: ${producto.cantidad} | Subtotal: $${(producto.price * producto.cantidad).toLocaleString('es-ES')}</p>
      </div>
    `;
        resumenDiv.innerHTML += itemHTML;
        totalProductos += producto.cantidad;
        totalPrecio += producto.price * producto.cantidad;
    });

    totalProductosSpan.textContent = totalProductos;
    totalPrecioSpan.textContent = totalPrecio.toLocaleString('es-ES');

    const modal = new bootstrap.Modal(document.getElementById('addToCartModal'));
    modal.show();
}

document.getElementById("confirmAdd").addEventListener("click", function () {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "¡Hola! Quiero realizar el siguiente pedido:%0A%0A";
    let totalProductos = 0;
    let totalPrecio = 0;

    carrito.forEach(producto => {
        mensaje += `👕 *${producto.name} T-SHIRT*%0A (${producto.id})`;
        mensaje += `Tela: ${producto.tela} | Género: ${producto.genero}%0A`;
        mensaje += `Talla: ${producto.talla} | Color: ${producto.color}%0A`;
        mensaje += `Cantidad: ${producto.cantidad} | Subtotal: $${(producto.price * producto.cantidad).toLocaleString('es-ES')}%0A%0A`;
        totalProductos += producto.cantidad;
        totalPrecio += producto.price * producto.cantidad;
    });

    mensaje += `🧮 *Total de productos:* ${totalProductos}%0A`;
    mensaje += `💰 *Total a pagar:* $${totalPrecio.toLocaleString('es-ES')}%0A`;

    const longitudMensaje = mensaje.length;
    console.log(`La longitud del mensaje es: ${longitudMensaje} caracteres`);

    const phoneNumber = "573233398124";
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${mensaje}`;

    window.open(url);
});
