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
    const tela = document.querySelector('input[name="cloth"]:checked')?.value;
    const genero = document.querySelector('input[name="gender"]:checked')?.value;
    const talla = document.querySelectorAll('input[name="size"]')[1].checked ? "M" :
        document.querySelectorAll('input[name="size"]')[2].checked ? "L" :
            document.querySelectorAll('input[name="size"]')[3].checked ? "XL" : "S";
    const color = document.querySelector('input[name="color"]:checked')?.value;

    const message = encodeURIComponent(`¡Hola! Acabo de realizar mi pedido de la camiseta y estoy emocionado de recibirla. Quisiera confirmar que todo está en orden y que el pedido está siendo procesado. Detalles del pedido: Tela: ${tela}, Género: ${genero}, Talla: ${talla}, Color: ${color}`);

    const phoneNumber = '573233398124';
    const pid = document.getElementById("main-image").dataset.pid;
    const pageUrl = `${window.location.origin}${window.location.pathname}?id=${pid}`;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${decodeURIComponent(message)}%20${decodeURIComponent(pageUrl)}`;
    window.open(url);
});