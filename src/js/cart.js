import { getLocalStorage } from "./utils.mjs";
import {loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter()

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
