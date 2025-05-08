

const btnSumar = document.getElementById('sumar');
const btnRestar = document.getElementById('restar');
const cantidadSpan = document.getElementById('cantidad');
const cartCount = document.querySelectorAll('.cart-count');
let cantidadd = 0;


btnSumar.addEventListener('click', (event) => {
    event.preventDefault();
    cantidadd++;
    cantidadSpan.textContent = cantidadd;
    btnRestar.disabled = false;
});


btnRestar.addEventListener('click', (event) => {
    event.preventDefault();
    if (cantidadd > 0) {
        cantidadd--;
        cantidadSpan.textContent = cantidadd;
        if (cantidadd === 0) {
            btnRestar.disabled = true;
        }
    }
});


function agregarAlCarrito() {
    const tela = document.querySelector('input[name="cloth"]:checked')?.value;
    const genero = document.querySelector('input[name="gender"]:checked')?.value;
    const talla = document.querySelectorAll('input[name="size"]')[1].checked ? "M" :
        document.querySelectorAll('input[name="size"]')[2].checked ? "L" :
            document.querySelectorAll('input[name="size"]')[3].checked ? "XL" : "S";
    const color = document.querySelector('input[name="color"]:checked')?.value;
    const cantidad = parseInt(cantidadSpan.textContent);

    if (!talla || !color || cantidad <= 0) {
        alert("Por favor, selecciona una talla, un color y una cantidad.");
        return;
    }

    const producto = {
        id: id,
        name: "",
        tela: tela,
        genero: genero,
        talla: talla,
        color: color,
        price: 0
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    const productoExistente = carrito.find(p => p.id === producto.id && p.tela === producto.tela && p.genero === producto.genere && p.talla === producto.talla && p.color === producto.color && p.price === producto.price);

    if (productoExistente) {

        productoExistente.cantidad += cantidad;
    } else {

        producto.cantidad = cantidad;
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarContadorCarrito();

    window.cantidad = 0;
    cantidadd = 0;
    cantidadSpan.textContent = 0;
    btnRestar.disabled = true;
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cartCount.textContent = carrito.length;


    const totalProductos = carrito.reduce((sum, prod) => sum + prod.cantidad, 0);
    cartCount.forEach(el => el.textContent = totalProductos);

    const btnHola = document.getElementById('btnHola');
    if (carrito.length > 0) {
        btnHola.style.display = 'inline-block';
    } else {
        btnHola.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);