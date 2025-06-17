

const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Toon producten in winkelwagen
function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p class='cta-card__text'>Je winkelwagen is leeg.</p>";
    totalPriceElement.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach((product, index) => {
    total += product.prijs * product.aantal;

    const item = document.createElement("div");
    item.className = "cta-card";
    item.innerHTML = `
      <h2 class="cta-card__title">${product.naam}</h2>
      <p class="cta-card__text">Prijs: €${product.prijs.toFixed(2)}</p>
      <p class="cta-card__text">Aantal: ${product.aantal}</p>
      <p class="cta-card__text">Subtotaal: €${(product.prijs * product.aantal).toFixed(2)}</p>
      <button class="card__button--remove" data-index="${index}">Verwijder</button>
    `;

    item.querySelector("button").addEventListener("click", () => {
      removeFromCart(index);
    });

    cartItemsContainer.appendChild(item);
  });

  totalPriceElement.textContent = `Totaalprijs: €${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
