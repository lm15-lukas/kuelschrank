document.addEventListener("DOMContentLoaded", () => {
    const checkoutList = document.getElementById("checkout-list");
    const totalPrice = document.getElementById("total-price");
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
  
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} – ${item.price} €`;
      checkoutList.appendChild(li);
      total += parseFloat(item.price);
    });
  
    totalPrice.textContent = total.toFixed(2) + " €";
  });
  