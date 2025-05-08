function mostrarModal() {
    const tela = document.querySelector('input[name="cloth"]:checked')?.value;
    const genero = document.querySelector('input[name="gender"]:checked')?.value;
    const talla = document.querySelectorAll('input[name="size"]')[1].checked ? "M" :
        document.querySelectorAll('input[name="size"]')[2].checked ? "L" :
            document.querySelectorAll('input[name="size"]')[3].checked ? "XL" : "S";
    const color = document.querySelector('input[name="color"]:checked')?.value;


    document.getElementById("modal-tela").textContent = tela;
    document.getElementById("modal-genero").textContent = genero;
    document.getElementById("modal-talla").textContent = talla;
    document.getElementById("modal-color").textContent = color;


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