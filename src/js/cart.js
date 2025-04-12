import { getLocalStorage, setLocalStorage} from "./utils.mjs";
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

let delIndex = ""; //declare a variable to store the index of the item to be deleted
 const cartItems = getLocalStorage("so-cart"); // get cart content from localStorage and store in cartItems variable
 
 document.addEventListener("click", function(event){
     if (event.target.classList.contains("deleteBtn")){
         let tagItem = event.target.id; //target the id of the clicked button which shares same id as product id
         cartItems.forEach((item)  => {
             if (item.id == tagItem){ //if the button id matches with product id
                 delIndex = cartItems.findIndex((ele) => ele.id == tagItem) // get the index of item and assign it to earlier
                 return delIndex;                                    //declared delIndex variable 
             }
         });
         cartItems.splice(delIndex, 1);      //use splice method to remove the product from the array
         localStorage.clear();            //clear the localstarage
         setLocalStorage("so-cart", cartItems);     //replace localstarage with the new cartItems array 
         window.location.reload();              // use location reload to display a fresh page.
     }
 })