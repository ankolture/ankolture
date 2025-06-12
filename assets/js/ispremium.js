let autoClickInProgress = false;

function getTargetGender() {
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    if (!selectedGender) return null;

    const genderValue = selectedGender.value.toLowerCase();
    if (genderValue === "hombre") return "men";
    if (genderValue === "mujer") return "women";
    return "unisex";
}

function getTargetColor() {
    const selectedColor = document.querySelector('input[name="color"]:checked');
    if (!selectedColor) return null;

    return selectedColor.value.toLowerCase() === "negro" ? "black.webp" : "white.webp";
}

function autoClickTargetImage(gender, color) {
    if (autoClickInProgress || !gender || !color) return;

    const targetImg = document.querySelector(`#thumbnail-container img[data-gender="${gender}"][data-color="${color}"]`);
    if (targetImg) {
        autoClickInProgress = true;
        targetImg.click();
        setTimeout(() => {
            autoClickInProgress = false;
        }, 100);
    }
}

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
        genderRadiosContainer?.style?.setProperty('display', 'none');
        genderUnisexText?.style?.setProperty('display', 'block');

        genderRadios.forEach(r => {
            r.disabled = true;
            r.checked = (r.value === "Unisex");
        });

        priceEl.textContent = `$${currentProduct.price_premium}`;
        aboutEl.textContent = currentProduct.description_premium;

    } else {
        genderRadiosContainer?.style?.setProperty('display', 'block');
        genderUnisexText?.style?.setProperty('display', 'none');

        genderRadios.forEach(r => {
            r.disabled = false;
            r.checked = (r.value === "Hombre");
        });

        priceEl.textContent = `$${currentProduct.price_normal}`;
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

function seleccionarTipo() {
    autoClickTargetImage("unisex", getTargetColor());
}

function seleccionarGenero() {
    autoClickTargetImage(getTargetGender(), getTargetColor());
}

function seleccionarColor() {
    autoClickTargetImage(getTargetGender(), getTargetColor());
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    waitForCurrentProduct(setupClothSelectionHandler);
});

document.querySelectorAll('input[name="cloth"]').forEach(radio => {
    radio.addEventListener("change", seleccionarTipo);
});

document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener("change", seleccionarGenero);
});

document.querySelectorAll('input[name="color"]').forEach(radio => {
    radio.addEventListener("change", seleccionarColor);
});

