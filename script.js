const form = document.getElementById('order-form');
const tableBody = document.querySelector('#orders-table tbody');

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
    `;

    tableBody.appendChild(row);
  });

  localStorage.setItem('orders', JSON.stringify(orders));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const customerName = document.getElementById('customer-name').value.trim();
  const customerId = document.getElementById('customer-id').value.trim();
  const name = document.getElementById('order-name').value.trim();
  const priceDollars = document.getElementById('order-price-dollars').value;
  const priceRobux = document.getElementById('order-price-robux').value;
  const priority = document.getElementById('order-priority').value;
  const status = document.getElementById('order-status').value;

  if (customerName && customerId && name) {
    orders.push({ customerName, customerId, name, priceDollars, priceRobux, priority, status });
    renderOrders();
    form.reset();
  }
});

renderOrders();
