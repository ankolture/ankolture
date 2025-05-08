document.querySelectorAll('input[name="cloth"]').forEach(function (radio) {
    radio.addEventListener('change', function () {

        const isPremium = this.value === "Premium";

        const genderRadiosContainer = document.getElementById('gender-radios');
        const genderUnisexText = document.getElementById('gender-unisex');
        const genderRadios = document.querySelectorAll('input[name="gender"]');

        if (isPremium) {

            genderRadiosContainer.style.display = "none";
            genderUnisexText.style.display = "block";
            genderRadios.forEach(r => {
                r.disabled = true;
                r.checked = (r.value === "Unisex");
            });

            document.querySelector('.act-price').textContent = '$' + currentProduct.price_premium;
            document.querySelector('.about').textContent = currentProduct.description_premium;
        } else {

            genderRadiosContainer.style.display = "block";
            genderUnisexText.style.display = "none";
            genderRadios.forEach(r => {
                r.disabled = false;
                r.checked = (r.value === "Hombre");
            });

            document.querySelector('.act-price').textContent = '$' + currentProduct.price_normal;
            document.querySelector('.about').textContent = currentProduct.description_normal;
        }
    });
});