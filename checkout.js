document.addEventListener("DOMContentLoaded", () => {
  const checkoutList = document.getElementById("checkout-list");
  const totalPrice = document.getElementById("total-price");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = localStorage.getItem("total") || "0.00";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} – ${item.price} €`;
    checkoutList.appendChild(li);
  });

  totalPrice.textContent = `${parseFloat(total).toFixed(2)} €`;
});


