let cartCount = 0;

const cartIcon = document.getElementById('winkelmandje');
const addButtons = document.querySelectorAll('.card__button'); 
const removeButtons = document.querySelectorAll('.card__button--remove');



function Lightmode() {
  var element = document.body;
  element.classList.toggle("light-mode");
}



addButtons.forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    updateCartDisplay();
  });
});

removeButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (cartCount > 0) {
      cartCount--;
      updateCartDisplay();
    }
  });
});

const producten = [{
  naam : 'White T-shirt',
  prijs: 9.99,
  afbeelding: 'white.jpeg',
},
  {
    naam: 'Black T-shirt',
    prijs: 9.99,
    afbeelding: 'black.jpeg'
  },

  {
    naam: 'Blue T-shirt',
    prijs: 6.99,
    afbeelding: 'blue.jpeg'
  }
  ,  
  {naam: 'Red T-shirt',
    prijs: 6.99,
    afbeelding: 'red.jpeg'
  },
  {
    naam: 'Green T-shirt',
    prijs: 6.99,
    afbeelding: 'green.jpeg'
  },
  {
    naam: 'Yellow T-shirt',
    prijs: 6.99,
    afbeelding: 'yellow.jpeg'
  },
  {
    naam: 'Light Jeans',
    prijs: 19.99,
    afbeelding: 'jeans.jpeg'
  },
  {
  naam: 'Dark Jeans',
  prijs: 19.99,
  afbeelding: 'dark-jeans.jpeg'
  },
  
  {
    naam: 'Jacket',
    prijs: 49.99,
    afbeelding: 'jacket.jpeg'
  },
  {
    naam: 'Hat',
    prijs: 14.99,
    afbeelding: 'hat.jpeg'
  },
  {
    naam: 'Baggy Joggers',
    prijs: 27.49,
    afbeelding: 'joggers.jpeg'
    
  },
  
  

];
const gridContainer = document.getElementById('grid-container');
const gridContainerItem = document.getElementById('grid-container__item');
gridContainerItem.remove();

producten.forEach((product, index) => {
  // Clone the template and remove display: none
  const clone = gridContainerItem.cloneNode(true);

  clone.classList.add('grid-item--product');

  // Fill in product details
  clone.querySelector('.card__product-title').innerText = product.naam;
  clone.querySelector('.card__product-price').innerText = `${product.prijs} €`;
  clone.querySelector('.card__product-page').innerText = ("href", "product.html?product=" + index);


  clone.querySelector('.card__img').setAttribute("src","img/" + product.afbeelding );

  clone.querySelector('.card__img').alt = product.naam;

  // Add button event listeners
  clone.querySelector('.card__button').addEventListener('click', () => {
    cartCount++;
    updateCartDisplay();
  });

  clone.querySelector('.card__button--remove').addEventListener('click', () => {
    if (cartCount > 0) {
      cartCount--;
      updateCartDisplay();
    }

   console.log('Product removed from cart'); 
  });

  // Add to grid
  gridContainer.appendChild(clone);
});



function updateCartDisplay() {
  cartIcon.setAttribute('data-items', cartCount);
}
