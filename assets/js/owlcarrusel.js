$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ["‹", "›"],
        responsive: {
          0: {
            items: 3,     // 👈 Forzamos 3 en móvil
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