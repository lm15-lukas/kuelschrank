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

// Warenkorb aus localStorage laden, wenn vorhanden
const storedCart = JSON.parse(localStorage.getItem("cart"));
if (storedCart && storedCart.items) {
    cart = storedCart.items;
    total = storedCart.total;

    // Anzeigen im Modal aktualisieren
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
}

function saveCartToLocalStorage(items, total) {
    const cartData = {
        items,
        total
    };
    localStorage.setItem("cart", JSON.stringify(cartData));
}

addToCartBtn.addEventListener('click', () => {
    const itemName = "Easy Fridge";
    const itemPrice = 2999.99;

    const item = { name: itemName, price: itemPrice };
    cart.push(item);
    saveCartToLocalStorage(cart, total + itemPrice);

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

    total += itemPrice;
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
