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

// Warenkorb aus localStorage laden – nur wenn Elemente vorhanden sind
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

// Funktion zum Speichern im localStorage
function saveCartToLocalStorage(items, total) {
    const cartData = {
        items,
        total
    };
    localStorage.setItem("cart", JSON.stringify(cartData));
}

// Produkt zum Warenkorb hinzufügen
addToCartBtn.addEventListener('click', () => {
    const itemName = "Easy Fridge";
    const itemPrice = 2999.99;

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

// Warenkorb anzeigen/verstecken
shoppingCartIcon.addEventListener('click', () => {
    cartModal.classList.toggle('hidden');
});

// Warenkorb schließen
closeCartBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

// Zur Checkout-Seite wechseln
checkoutBtn.addEventListener("click", () => {
    window.location.href = "checkout.html";
});
