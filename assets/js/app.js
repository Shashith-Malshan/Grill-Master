console.log("connected");

let products = [
  { name: "Classic Burger", price: 500, image: "assets/images/classic.jpg" },
  { name: "Cheese Burger", price: 600, image: "assets/images/cheese.jpg" },
  { name: "Veggie Burger", price: 800, image: "assets/images/veggie.jpg" },
  { name: "French Fries", price: 300, image: "assets/images/frenchFries.jpg" },
  { name: "Cola Drink", price: 200, image: "assets/images/cola.jpg" }
];

let order = [];
let customers = [];
let savedOrders = [];

// Render Products
function renderProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((p, index) => {
    productList.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card h-100 shadow">
          <img src="${p.image}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">Rs.${p.price}</p>
            <button class="btn custom-btn" onclick="addToOrder(${index})">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
}

// Add to Order
function addToOrder(index) {
  order.push(products[index]);
  renderOrder();
}

// Render Order
function renderOrder() {
  const orderList = document.getElementById("orderList");
  let total = 0;
  orderList.innerHTML = "";
  order.forEach((item, i) => {
    total += item.price;
    orderList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.name} - Rs.${item.price}
        <button class="btn btn-sm btn-danger" onclick="removeFromOrder(${i})">X</button>
      </li>
    `;
  });
  document.getElementById("totalPrice").innerText = total;
}

// Remove from Order
function removeFromOrder(index) {
  order.splice(index, 1);
  renderOrder();
}

// Checkout
function checkout() {
  if (order.length === 0) return alert("No items in order!");
  savedOrders.push([...order]);
  order = [];
  renderOrder();
  renderOrders();
  alert("Order placed successfully!");
}

// Render Orders
function renderOrders() {
  const ordersList = document.getElementById("ordersList");
  ordersList.innerHTML = "";
  savedOrders.forEach((ord, i) => {
    const total = ord.reduce((sum, item) => sum + item.price, 0);
    ordersList.innerHTML += `<li class="list-group-item">Order #${i + 1} - ${ord.length} items - Rs.${total}</li>`;
  });
}

// Customer CRUD
document.getElementById("customerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;
  customers.push({ name, email });
  renderCustomers();
  e.target.reset();
});

function renderCustomers() {
  const list = document.getElementById("customerList");
  list.innerHTML = "";
  customers.forEach((c, i) => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${c.name} (${c.email})
        <button class="btn btn-sm btn-danger" onclick="deleteCustomer(${i})">Delete</button>
      </li>
    `;
  });
}

function deleteCustomer(i) {
  customers.splice(i, 1);
  renderCustomers();
}

// Product CRUD
document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("prodName").value;
  const price = document.getElementById("prodPrice").value;
  const image = document.getElementById("prodImage").value;
  products.push({ name, price, image });
  renderProducts();
  e.target.reset();
});

function renderProdList() {
  const list = document.getElementById("prodList");
  list.innerHTML = "";
  products.forEach((p, i) => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${p.name} - Rs.${p.price}
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})">Delete</button>
      </li>
    `;
  });
}

function deleteProduct(i) {
  products.splice(i, 1);
  renderProducts();
  renderProdList();
}

// Init
renderProducts();
renderProdList();


