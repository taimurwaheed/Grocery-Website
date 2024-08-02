let addToCartButtons = document.querySelectorAll(".cart-btn");
let cartItem = document.querySelector(".cart span");

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartItemCount();
}

function updateCartItemCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartItem.textContent = totalItems;
}

function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((product) => {
    const productElement = document.querySelector(
      `.product[data-id='${product.id}']`
    );
    if (productElement) {
      let incrementBtn = productElement.querySelector(".incrementBtn");
      let decrementBtn = productElement.querySelector(".decrementBtn");
      let counter = productElement.querySelector(".counter");

      if (!incrementBtn && !decrementBtn && !counter) {
        incrementBtn = document.createElement("button");
        decrementBtn = document.createElement("button");
        counter = document.createElement("span");

        incrementBtn.textContent = "+";

        decrementBtn.textContent = "-";
        counter.textContent = product.quantity;

        incrementBtn.classList.add("incrementBtn");
        decrementBtn.classList.add("decrementBtn");
        counter.classList.add("counter");

        productElement.appendChild(incrementBtn);
        productElement.appendChild(decrementBtn);
        productElement.appendChild(counter);

        incrementBtn.style.padding = "3px";
        incrementBtn.style.margin = "10px 5px";
        incrementBtn.style.background = "#007bff";
        decrementBtn.style.padding = "3px";
        decrementBtn.style.margin = "10px 5px";
        decrementBtn.style.background = "red";

        incrementBtn.addEventListener("click", () => {
          product.quantity++;
          counter.textContent = product.quantity;
          cartItem.textContent = parseInt(cartItem.textContent) + 1;
          localStorage.setItem("cart", JSON.stringify(cart));
        });

        decrementBtn.addEventListener("click", () => {
          if (product.quantity > 0) {
            product.quantity--;
            counter.textContent = product.quantity;
            cartItem.textContent = parseInt(cartItem.textContent) - 1;
            if (product.quantity === 0) {
              incrementBtn.remove();
              decrementBtn.remove();
              counter.remove();
              cart.splice(cart.indexOf(product), 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      } else {
        counter.textContent = product.quantity;
      }
    }
  });
}

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const productElement = button.closest(".product");
    const product = {
      id: productElement.dataset.id,
      name: productElement.querySelector("h3").textContent,
      price: parseFloat(
        productElement.querySelector("p").textContent.replace("Price: $", "")
      ),
      image: productElement.querySelector("img").src,
    };
    addToCart(product);
    displayCartItems();
  });
});

updateCartItemCount();
displayCartItems();

document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const searchQuery = document
    .querySelector(".search-input")
    .value.toLowerCase();
  const products = document.querySelectorAll("#products .product");

  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase();

    if (productName.includes(searchQuery)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});
