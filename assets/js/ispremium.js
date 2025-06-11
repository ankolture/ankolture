function handleClothChange(value) {
    const isPremium = value === "Premium";

    const genderRadiosContainer = document.getElementById('gender-radios');
    const genderUnisexText = document.getElementById('gender-unisex');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const priceEl = document.querySelector('.act-price');
    const aboutEl = document.querySelector('.about');

    if (!currentProduct) {
        console.error("currentProduct no está definido");
        return;
    }

    if (!priceEl || !aboutEl) {
        console.warn("Elementos .act-price o .about no encontrados en el DOM");
        return;
    }

    if (isPremium) {
        if (genderRadiosContainer) genderRadiosContainer.style.display = "none";
        if (genderUnisexText) genderUnisexText.style.display = "block";

        genderRadios.forEach(r => {
            r.disabled = true;
            r.checked = (r.value === "Unisex");
        });

        priceEl.textContent = '$' + currentProduct.price_premium;
        aboutEl.textContent = currentProduct.description_premium;

    } else {
        if (genderRadiosContainer) genderRadiosContainer.style.display = "block";
        if (genderUnisexText) genderUnisexText.style.display = "none";

        genderRadios.forEach(r => {
            r.disabled = false;
            r.checked = (r.value === "Hombre");
        });

        priceEl.textContent = '$' + currentProduct.price_normal;
        aboutEl.textContent = currentProduct.description_normal;
    }
}

function setupClothSelectionHandler() {
    const clothRadios = document.querySelectorAll('input[name="cloth"]');

    clothRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            handleClothChange(this.value);
        });
    });

    const selected = document.querySelector('input[name="cloth"]:checked');
    if (selected) {
        handleClothChange(selected.value);
    }
}

function waitForCurrentProduct(callback, retries = 10) {
    if (typeof currentProduct !== 'undefined' && currentProduct) {
        callback();
    } else if (retries > 0) {
        setTimeout(() => waitForCurrentProduct(callback, retries - 1), 100);
    } else {
        console.error("currentProduct no se cargó a tiempo.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    waitForCurrentProduct(setupClothSelectionHandler);
});

