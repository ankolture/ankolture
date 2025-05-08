
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
    const tela = document.querySelector('input[name="cloth"]:checked')?.value;
    const genero = document.querySelector('input[name="gender"]:checked')?.value;
    const talla = document.querySelectorAll('input[name="size"]')[1].checked ? "M" :
        document.querySelectorAll('input[name="size"]')[2].checked ? "L" :
            document.querySelectorAll('input[name="size"]')[3].checked ? "XL" : "S";
    const color = document.querySelector('input[name="color"]:checked')?.value;
    const cantidad = parseInt(cantidadSpan.textContent);

    if (!talla || !color || cantidad <= 0) {
        console.log("Por favor, selecciona una talla, un color y una cantidad.");
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

    window.cantidad = 1;
    cantidadd = 1;
    cantidadSpan.textContent = 1;
    btnRestar.disabled = true;
}

