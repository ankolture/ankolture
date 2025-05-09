
const btnSumar = document.getElementById('sumar');
const btnRestar = document.getElementById('restar');
const cantidadSpan = document.getElementById('cantidad');

let cantidadd = 1;


btnSumar.addEventListener('click', (event) => {
    event.preventDefault();
    cantidadd++;
    cantidadSpan.textContent = cantidadd;
    btnRestar.disabled = false;
});


btnRestar.addEventListener('click', (event) => {
    event.preventDefault();
    if (cantidadd > 1) {
        cantidadd--;
        cantidadSpan.textContent = cantidadd;
        if (cantidadd === 1) {
            btnRestar.disabled = true;
        }
    }
});



function agregarAlCarrito() {

    const name = document.querySelector('.tshirt-name').textContent;
    const tela = document.querySelector('input[name="cloth"]:checked')?.value;
    const genero = document.querySelector('input[name="gender"]:checked')?.value;
    const talla = document.querySelectorAll('input[name="size"]')[1].checked ? "M" :
        document.querySelectorAll('input[name="size"]')[2].checked ? "L" :
            document.querySelectorAll('input[name="size"]')[3].checked ? "XL" : "S";
    const color = document.querySelector('input[name="color"]:checked')?.value;
    const cantidad = parseInt(cantidadSpan.textContent);

    const url_image = document.getElementById("main-image").src;
    const image = reemplazarParteDeURL(url_image, genero, color);


    const price = document.querySelector('.act-price').textContent;
    const cleanPrice = parseInt(price.replace(/\$/g, "").replace(/\./g, ""), 10);

    const url = window.location.pathname + window.location.search;



    if (!talla || !color || cantidad <= 0) {
        console.log("Por favor, selecciona una talla, un color y una cantidad.");
        return;
    }

    const producto = {
        id: id,
        name: name,
        image: image,
        url: url,
        tela: tela,
        genero: genero,
        talla: talla,
        color: color,
        price: cleanPrice
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    const productoExistente = carrito.find(p => p.id === producto.id && p.tela === producto.tela && p.genero === producto.genero && p.talla === producto.talla && p.color === producto.color && p.price === producto.price);

    if (productoExistente) {

        productoExistente.cantidad += cantidad;
    } else {

        producto.cantidad = cantidad;
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarContadorCarrito();

    window.cantidad = 1;
    cantidadd = 1;
    cantidadSpan.textContent = 1;
    btnRestar.disabled = true;

    const mensajeCompartir = document.getElementById("mensaje-compartir");
    mensajeCompartir.style.display = "block";


    setTimeout(() => {
        mensajeCompartir.style.display = "none";
    }, 2000);

}



function reemplazarParteDeURL(url, genero, color) {
    let nuevoValor = "";

    if (genero === "Hombre" && color === "Blanco") {
        nuevoValor = "men-white";
    }
    if (genero === "Hombre" && color === "Negro") {
        nuevoValor = "men-black";
    }
    if (genero === "Mujer" && color === "Blanco") {
        nuevoValor = "women-white";
    }
    if (genero === "Mujer" && color === "Negro") {
        nuevoValor = "women-black";
    }
    if (genero === "Unisex" && color === "Blanco") {
        nuevoValor = "men-white";
    }
    if (genero === "Unisex" && color === "Negro") {
        nuevoValor = "men-black";
    }
    if (genero === "Unisex" && color === "Blanco") {
        nuevoValor = "women-white";
    }
    if (genero === "Unisex" && color === "Negro") {
        nuevoValor = "women-black";
    }

    const nuevaURL = url.replace(/-[a-zA-Z]+-[a-zA-Z]+\.jpg$/, `-${nuevoValor}.jpg`);

    console.log(nuevaURL);
    return nuevaURL;
}
