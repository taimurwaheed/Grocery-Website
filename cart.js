function renderCartItems() {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
      `;
    cartItemsContainer.appendChild(itemElement);
    totalPrice += item.price * item.quantity;
  });

  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

renderCartItems();

document.querySelector(".checkout-btn").addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length > 0) {
    alert("Purchase Successful");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  } else {
    alert("Nothing in the cart");
  }
});
