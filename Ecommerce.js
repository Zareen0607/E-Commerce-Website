let div = document.getElementById('products');
let cart = [];
const cartSidebar = document.getElementById('cart-sidebar');
const cartCount = document.getElementById('cart-count');
const cartItemsDiv = document.getElementById('cart-items');

async function getApiData() {
  let products = await fetch("https://fakestoreapi.com/products");
  let items = await products.json();

  items.map((item) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('product');
    newDiv.innerHTML = `
      <h5>${item.title}</h5>
      <img src="${item.image}" alt="${item.title}" />
      <h1>${item.category}</h1>
      <p>${item.description}</p>
      <div>
        <span>₹${item.price}</span>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;

    // Add event to the button
    newDiv.querySelector('.add-to-cart').addEventListener('click', () => {
      addToCart(item);
    });

    div.append(newDiv);
  });
}

getApiData();

function addToCart(product) {
  cart.push(product);
  updateCartUI();
}

function updateCartUI() {
  cartCount.innerText = cart.length;
  cartItemsDiv.innerHTML = '';

  cart.forEach((item, index) => {
    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div>
        <h5>${item.title.slice(0, 10)}...</h5>
        <span>₹${item.price}</span>
      </div>
      <button onclick="removeFromCart(${index})">X</button>
    `;
    cartItemsDiv.appendChild(cartItem);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Toggle Cart Sidebar
document.querySelector('.cart-icon').addEventListener('click', () => {
  cartSidebar.classList.toggle('active');
});

document.getElementById('close-cart').addEventListener('click', () => {
  cartSidebar.classList.remove('active');
});
