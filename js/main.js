const cartIcon = document.getElementById('winkelmandje');
const gridContainer = document.getElementById('grid-container');
const gridContainerItem = document.getElementById('grid-container__item');

function Lightmode() {
  document.body.classList.toggle("light-mode");
}

const producten = [
  { naam: 'White T-shirt', prijs: 9.99, afbeelding: 'white.jpeg' },
  { naam: 'Black T-shirt', prijs: 9.99, afbeelding: 'black.jpeg' },
  { naam: 'Blue T-shirt', prijs: 6.99, afbeelding: 'blue.jpeg' },
  { naam: 'Red T-shirt', prijs: 6.99, afbeelding: 'red.jpeg' },
  { naam: 'Green T-shirt', prijs: 6.99, afbeelding: 'green.jpeg' },
  { naam: 'Yellow T-shirt', prijs: 6.99, afbeelding: 'yellow.jpeg' },
  { naam: 'Light Jeans', prijs: 19.99, afbeelding: 'jeans.jpeg' },
  { naam: 'Dark Jeans', prijs: 19.99, afbeelding: 'dark-jeans.jpeg' },
  { naam: 'Jacket', prijs: 49.99, afbeelding: 'jacket.jpeg' },
  { naam: 'Hat', prijs: 14.99, afbeelding: 'hat.jpeg' },
  { naam: 'Baggy Joggers', prijs: 27.49, afbeelding: 'joggers.jpeg' },
  {naam: 'Sneakers', prijs: 79.99, afbeelding: 'sneakers.jpeg' },
  {naam: 'belt', prijs: 19.99, afbeelding: 'belt.jpeg' },
  {naam: 'Socks', prijs: 4.99, afbeelding: 'socks.jpeg' },
];

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.aantal, 0);
}

function updateCartDisplay() {
  const count = getCartCount();
  cartIcon.setAttribute('data-items', count);
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(p => p.naam === product.naam);
  if (existing) {
    existing.aantal++;
  } else {
    cart.push({ ...product, aantal: 1 });
  }
  saveCart(cart);
  updateCartDisplay();
}

function removeFromCart(product) {
  let cart = getCart();
  const existing = cart.find(p => p.naam === product.naam);
  if (existing) {
    existing.aantal--;
    if (existing.aantal <= 0) {
      cart = cart.filter(p => p.naam !== product.naam);
    }
    saveCart(cart);
    updateCartDisplay();
  }
}

function renderProducts(maxPrijs, search) {
  console.log(search)
  // Verwijder eerder gerenderde producten
  document.querySelectorAll('.grid-container__item:not(#grid-container__item)').forEach(el => el.remove());

  const filtered = producten.filter(product => product.prijs <= maxPrijs)
  .filter(product => product.naam.toLowerCase().includes(search.toLowerCase()));

  filtered.forEach(product => {
    const clone = gridContainerItem.cloneNode(true);
    clone.style.display = 'grid';
    clone.removeAttribute('id');
    clone.querySelector('.card__product-title').innerText = product.naam;
    clone.querySelector('.card__product-price').innerText = `${product.prijs.toFixed(2)} €`;
    clone.querySelector('.card__img').src = 'img/' + product.afbeelding;
    clone.querySelector('.card__img').alt = product.naam;

    clone.querySelector('.card__button').addEventListener('click', () => addToCart(product));
    clone.querySelector('.card__button--remove').addEventListener('click', () => removeFromCart(product));

    gridContainer.appendChild(clone);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();

  const slider = document.getElementById("slider");
  const searchbar = document.getElementById("searchbar");
  renderProducts(slider.value, searchbar.value);

  slider.addEventListener("input", () => {
    renderProducts(slider.value, searchbar.value);
  });
  searchbar.addEventListener("input", () => {
    renderProducts(slider.value, searchbar.value);
  });
});
