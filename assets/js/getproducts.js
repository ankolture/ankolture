


let currentProduct = null;

const params = new URLSearchParams(window.location.search);
const collection = params.get("collection");
const id = params.get("id");


if (collection && id) {
    document.querySelector(".tshirt-id").textContent = "SKU: " + id;


    fetch(`/collections/${collection}.json`)
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar la colección');
            return response.json();
        })
        .then(data => {
          
            const productos = data[collection];

            let found = false;

            for (const [folderName, items] of Object.entries(productos)) {
                const match = items.find(item => String(item.id) === id);
                if (match) {

                    currentProduct = match;

                    const imagePath = "/assets/img/collection/" + collection +"/" + folderName + "/" + match.name;
                    document.getElementById("main-image").src = imagePath;
                    document.getElementById("main-image").dataset.pid = id;

                    const attribtshirtt = match.name.split('-');

                    document.getElementById("main-image").dataset.name = attribtshirtt[0];
                    document.getElementById("main-image").dataset.gender = attribtshirtt[1];
                    document.getElementById("main-image").dataset.color = attribtshirtt[2];

                    document.querySelector('.act-price').textContent = '$' + match.price_premium;
                    document.querySelector('.about').textContent = match.description_premium;

                    document.querySelector('.act-price').textContent = '$' + match.price_normal;
                    document.querySelector('.about').textContent = match.description_normal;

                    document.querySelector("a[href='#'] i.fab.fa-instagram").parentElement.href = match.url_instagram;


                    document.querySelectorAll(".tshirt-name").forEach(function (el) {
                        el.textContent = folderName.toUpperCase();
                    });

                    const thumbnailContainer = document.getElementById("thumbnail-container");
                    thumbnailContainer.innerHTML = "";

                    items.forEach(item => {

                        const thumb = document.createElement("img");
                        const attribtshirt = item.name.split('-');
                        thumb.src = "/assets/img/collection/"+ collection + "/" + folderName + "/" + item.name;
                        thumb.width = 70;
                        thumb.style.cursor = "pointer";
                        thumb.dataset.name = attribtshirt[0];
                        thumb.dataset.gender = attribtshirt[1];
                        thumb.dataset.color = attribtshirt[2];

                        thumb.onclick = function () {
                            document.getElementById("main-image").dataset.pid = item.id;
                            document.getElementById("main-image").dataset.name = attribtshirt[0];
                            document.getElementById("main-image").dataset.gender = attribtshirt[1];
                            document.getElementById("main-image").dataset.color = attribtshirt[2];
                            document.querySelector(".tshirt-id").textContent = "SKU: " + item.id;
                            change_image(this);
                        };
                        thumbnailContainer.appendChild(thumb);


                    });

                    found = true;
                    break;
                }
            }

            if (!found) {
                console.warn("Imagen no encontrada para ID:", id);
            }


        })
        .catch(error => {
            console.error(error);

        });

}


function change_image(image) {
    document.getElementById("main-image").src = image.src;

    const gender = document.getElementById("main-image").dataset.gender;
    const color = document.getElementById("main-image").dataset.color;

    const selectedCloth = document.querySelector('input[name="cloth"]:checked');
    const isPremium = selectedCloth && selectedCloth.value === "Premium";

    if (!isPremium) {
        const genderMap = {
            women: "Mujer",
            men: "Hombre"
        };

        const genderRadio = document.querySelector(
            `input[name="gender"][value="${genderMap[gender]}"]`
        );

        if (genderRadio) {
            genderRadio.checked = true;
        }
    }


    const colorMap = {
        "white.jpg": "Blanco",
        "black.jpg": "Negro"
    };

    const colorRadio = document.querySelector(
        `input[name="color"][value="${colorMap[color]}"]`
    );

    if (colorRadio) {
        colorRadio.checked = true;
    }
}
