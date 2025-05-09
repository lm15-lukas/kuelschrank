document.addEventListener('DOMContentLoaded', () => {
  const cartList = document.getElementById('checkout-list');
  const totalPriceElem = document.getElementById('total-price');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

  cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price.toFixed(2)} €`;
      cartList.appendChild(li);
      total += item.price;
  });

  totalPriceElem.textContent = `${total.toFixed(2)} €`;
});
