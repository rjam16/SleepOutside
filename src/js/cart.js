import { getLocalStorage } from "./utils.mjs";
import {loadHeaderFooter} from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems){
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    document.querySelector(".checkout-button").computedStyleMap.display = "none";
    document.querySelector(".product-list").innerHTML = "<li>The cart is empty</li>"
  }
}

cart.renderCartContents();

const showTotal = getLocalStorage("so-cart");
if (showTotal.length !== 0) {
  document.querySelector(".cart-footer").classList.remove("hide");
  const cartPrice = localStorage.getItem("so-cart");
  const cartItem = JSON.parse(cartPrice);

  let totalPrice = 0;
  cartItem.forEach(item => {
    const price = item.FinalPrice * item.quantity;
    totalPrice += price;
  })

  document.querySelector(".cart-total").textContent += `$${totalPrice.toFixed(2)}`;

}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryExtraLarge}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
