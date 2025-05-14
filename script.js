window.addEventListener('DOMContentLoaded', () => {
    selectColor('grey');
});
function changeImage(imageSrc) {
    document.getElementById('main-image').src = imageSrc;
}

const addToCartBtn = document.querySelector('.add-to-cart');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCartBtn = document.getElementById('close-cart');
const shoppingCartIcon = document.querySelector('.shopping-cart');
const checkoutBtn = document.querySelector('.checkout-btn');

let total = 0;
let cart = [];

// Warenkorb aus localStorage laden
const storedCart = JSON.parse(localStorage.getItem("cart"));
if (storedCart && storedCart.items && storedCart.items.length > 0) {
    cart = storedCart.items;
    total = storedCart.total;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price.toFixed(2)} €`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            cartItems.removeChild(li);
            total -= item.price;
            cartTotal.textContent = `Total: ${total.toFixed(2)} €`;
            cart = cart.filter(i => i.name !== item.name);
            saveCartToLocalStorage(cart, total);
        });

        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });

    cartTotal.textContent = `Total: ${total.toFixed(2)} €`;
} else {
    cartTotal.textContent = `Total: 0,00 €`;
}

function saveCartToLocalStorage(items, total) {
    const cartData = { items, total };
    localStorage.setItem("cart", JSON.stringify(cartData));
}

addToCartBtn.addEventListener('click', () => {
    const itemName = "Easy Fridge";
    const itemPrice = 2974.99;

    const item = { name: itemName, price: itemPrice };
    cart.push(item);
    total += itemPrice;
    saveCartToLocalStorage(cart, total);

    const li = document.createElement('li');
    li.textContent = `${itemName} - ${itemPrice.toFixed(2)} €`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
        cartItems.removeChild(li);
        total -= itemPrice;
        cartTotal.textContent = `Total: ${total.toFixed(2)} €`;
        cart = cart.filter(i => i.name !== itemName);
        saveCartToLocalStorage(cart, total);
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    cartTotal.textContent = `Total: ${total.toFixed(2)} €`;
    cartModal.classList.remove('hidden');
});

shoppingCartIcon.addEventListener('click', () => {
    cartModal.classList.toggle('hidden');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

checkoutBtn.addEventListener("click", () => {
    window.location.href = "checkout.html";
});

// Farb-Auswahl und Thumbnails
function selectColor(color) {
    const mainImage = document.getElementById("main-image");
    const selectedColorText = document.getElementById("selected-color");
    const thumbnailContainer = document.querySelector(".thumbnail-buttons");

    // Thumbnails und Main-Bild definieren
    let images = [];

    if (color === "white") {
        images = ["white1.png", "white2.png"];
    } else if (color === "black") {
        images = ["black1.png", "black2.png"];
    } else if (color === "gray") {
        images = ["derkühlschrank.png", "innenansicht.png", "seite.png", "schluss.png"];
    }

    // Hauptbild setzen
    mainImage.src = images[0];

    // Farbe anzeigen
    selectedColorText.textContent = "Selected color: " + color.charAt(0).toUpperCase() + color.slice(1);

    // Thumbnails neu generieren
    thumbnailContainer.innerHTML = "";
    images.forEach(image => {
        const thumb = document.createElement("img");
        thumb.src = image;
        thumb.alt = "Thumbnail";
        thumb.className = "thumbnail";
        thumb.onclick = () => changeImage(image);
        thumbnailContainer.appendChild(thumb);
    });
}

// Farbkreise anklickbar machen
document.querySelectorAll('.color-circle').forEach(circle => {
    circle.addEventListener('click', () => {
        if (circle.classList.contains('black')) selectColor('black');
        else if (circle.classList.contains('white')) selectColor('white');
        else if (circle.classList.contains('gray')) selectColor('gray');
    });
});

// Optional: Grau als Standardfarbe beim Laden
window.addEventListener('DOMContentLoaded', () => {
    selectColor('gray');
});
