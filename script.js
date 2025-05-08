    function changeImage(imageSrc) {
        document.getElementById('main-image').src = imageSrc;
    }

    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeCartBtn = document.getElementById('close-cart');
    const shoppingCartIcon = document.querySelector('.shopping-cart');

    let total = 0;

    addToCartBtn.addEventListener('click', () => {
        const itemName = "Easy Fridge";
        const itemPrice = 2999.99;

        const li = document.createElement('li');
        li.textContent = `${itemName} - ${itemPrice.toFixed(2)} €`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            cartItems.removeChild(li);
            total -= itemPrice;
            cartTotal.textContent = `Total: ${total.toFixed(2)} €`;
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
    document.querySelector(".checkout-btn").addEventListener("click", () => {
        window.location.href = "checkout.html";
    });
    