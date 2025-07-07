// Generate a random alphanumeric ID
function generateCustomerId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const form = document.getElementById('order-form');
const tableBody = document.querySelector('#orders-table tbody');
const nameInput = document.getElementById('customer-name');
const idInput = document.getElementById('customer-id');

// Prevent editing ID manually
idInput.readOnly = true;

// Generate a new ID when typing customer name
nameInput.addEventListener('input', () => {
  if (nameInput.value.trim().length > 0 && idInput.value.trim() === '') {
    idInput.value = generateCustomerId();
  }
});

let orders = JSON.parse(localStorage.getItem('orders')) || [];

function renderOrders() {
  tableBody.innerHTML = '';

  orders.forEach((order, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${order.customerName}</td>
      <td>${order.customerId}</td>
      <td>${order.name}</td>
      <td>${order.priceDollars ? '$' + parseFloat(order.priceDollars).toFixed(2) : '-'}</td>
      <td>${order.priceRobux ? 'R$' + parseInt(order.priceRobux) : '-'}</td>
      <td>${order.priority}</td>
      <td>${order.status}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;

    tableBody.appendChild(row);
  });

  localStorage.setItem('orders', JSON.stringify(orders));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const customerName = nameInput.value.trim();
  const customerId = idInput.value.trim();
  const orderName = document.getElementById('order-name').value.trim();
  const priceDollars = document.getElementById('order-price-dollars').value;
  const priceRobux = document.getElementById('order-price-robux').value;
  const priority = document.getElementById('order-priority').value;
  const status = document.getElementById('order-status').value;

  if (customerName && customerId && orderName) {
    orders.push({
      customerName,
      customerId,
      name: orderName,
      priceDollars,
      priceRobux,
      priority,
      status
    });

    renderOrders();
    form.reset();
    idInput.value = ''; // clear and wait for next auto-generate
  }
});

tableBody.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.dataset.index;
    orders.splice(index, 1);
    renderOrders();
  }
});

renderOrders();
