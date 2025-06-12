let autoClickInProgress = false;

const colorMap = {
    "negro": "black.webp",
    "blanco": "white.webp"
};

const genderMap = {
    "hombre": "men",
    "mujer": "women",
    "unisex": "unisex"
};

function autoSelectThumbnail() {
    if (autoClickInProgress) return;

    const selectedColor = document.querySelector('input[name="color"]:checked');
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    if (!selectedColor || !selectedGender) return;

    const colorValue = colorMap[selectedColor.value.toLowerCase()];
    const genderValue = genderMap[selectedGender.value.toLowerCase()];
    if (!colorValue || !genderValue) return;

    const targetImg = document.querySelector(`#thumbnail-container img[data-gender="${genderValue}"][data-color="${colorValue}"]`);
    if (targetImg) {
        autoClickInProgress = true;
        targetImg.click();
        setTimeout(() => {
            autoClickInProgress = false;
        }, 100);
    } else {
        console.warn("No se encontró una imagen para:", genderValue, colorValue);
    }
}

function handleClothChange(value) {
    const isPremium = value === "Premium";

    const genderRadiosContainer = document.getElementById('gender-radios');
    const genderUnisexText = document.getElementById('gender-unisex');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const priceEl = document.querySelector('.act-price');
    const aboutEl = document.querySelector('.about');

    if (!currentProduct || !priceEl || !aboutEl) {
        console.error("Faltan elementos necesarios.");
        return;
    }

    if (isPremium) {
        genderRadiosContainer?.style.setProperty("display", "none");
        genderUnisexText?.style.setProperty("display", "block");

        genderRadios.forEach(r => {
            r.disabled = true;
            r.checked = (r.value === "Unisex");
        });

        priceEl.textContent = '$' + currentProduct.price_premium;
        aboutEl.textContent = currentProduct.description_premium;
    } else {
        genderRadiosContainer?.style.setProperty("display", "block");
        genderUnisexText?.style.setProperty("display", "none");

        genderRadios.forEach(r => {
            r.disabled = false;
            r.checked = (r.value === "Hombre");
        });

        priceEl.textContent = '$' + currentProduct.price_normal;
        aboutEl.textContent = currentProduct.description_normal;
    }

    autoSelectThumbnail();
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

document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener("change", autoSelectThumbnail);
});

document.querySelectorAll('input[name="color"]').forEach(radio => {
    radio.addEventListener("change", autoSelectThumbnail);
});
