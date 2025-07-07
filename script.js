const form = document.getElementById('order-form');
const tableBody = document.querySelector('#orders-table tbody');

let orders = JSON.parse(localStorage.getItem('orders')) || [];

function renderOrders() {
  tableBody.innerHTML = '';

  orders.forEach((order, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${order.name}</td>
      <td>$${parseFloat(order.price).toFixed(2)}</td>
      <td>${order.priority}</td>
      <td>${order.status}</td>
    `;

    tableBody.appendChild(row);
  });

  localStorage.setItem('orders', JSON.stringify(orders));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('order-name').value.trim();
  const price = document.getElementById('order-price').value;
  const priority = document.getElementById('order-priority').value;
  const status = document.getElementById('order-status').value;

  if (name && price) {
    orders.push({ name, price, priority, status });
    renderOrders();
    form.reset();
  }
});

renderOrders();
