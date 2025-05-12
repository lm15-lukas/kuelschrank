// Lese die Daten aus dem localStorage
const cartData = JSON.parse(localStorage.getItem("cart"));

if (cartData && cartData.items.length > 0) {
    const checkoutItemsList = document.getElementById("checkout-cart-items");
    const checkoutTotal = document.getElementById("checkout-cart-total");

    cartData.items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price.toFixed(2)} €`;
        checkoutItemsList.appendChild(li);
    });

    checkoutTotal.textContent = `Gesamtsumme: ${cartData.total.toFixed(2)} €`;
} else {
    document.getElementById("checkout-cart-items").textContent = "Dein Warenkorb ist leer.";
}
