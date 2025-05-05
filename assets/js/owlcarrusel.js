$(document).ready(function () {

  var items = document.querySelectorAll('.owl-carousel .item'); // Selecciona todos los elementos con la clase item del carousel
    
  // Convierte los elementos NodeList a un array para poder ordenarlos
  var itemsArray = Array.prototype.slice.call(items);

  // Aleatoriza el array de elementos
  itemsArray.sort(function() {
    return 0.5 - Math.random();
  });

  // Reorganiza los elementos aleatorios en el DOM
  var carousel = document.querySelector('.owl-carousel');
  itemsArray.forEach(function(item) {
    carousel.appendChild(item);
  });

    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: true,            // ✅ Activa el movimiento automático
        autoplayTimeout: 5000,     // ⏱️ Tiempo entre cambios (milisegundos)
        autoplayHoverPause: true,  // 🛑 Pausa si el mouse está encima
        navText: ["‹", "›"],
        responsive: {
          0: {
            items: 1,     // 👈 Forzamos 3 en móvil
            center: false
          },
          600: {
            items: 3
          },
          1000: {
            items: 3
          }
        }
      });
});