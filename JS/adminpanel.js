function openTab(evt, tabName) {
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

async function fetchAndDisplayData() {
  const reservationsResponse = await fetch('http://127.0.0.1:3000/reservations');
  const reservations = await reservationsResponse.json();
  const reservationsTable = document.getElementById('reservationsTable').getElementsByTagName('tbody')[0];
  reservations.forEach(reservation => {
    const row = reservationsTable.insertRow();
    row.innerHTML = `
      <td>${reservation.reservation_id}</td>
      <td>${reservation.customer_count}</td>
      <td>${new Date(reservation.date).toLocaleDateString()}</td>
      <td>${reservation.ajankohta}</td>
      <td>${reservation.asiakas_id}</td>
      <td>
        <button class="editButton">Muokkaa</button>
        <button class="deleteButton" data-id="${reservation.reservation_id}">Poista</button>
      </td>
    `;

    row.querySelector('.deleteButton').addEventListener('click', async function() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/reservations/${this.getAttribute('data-id')}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          row.remove();
        } else {
          console.error('Error deleting reservation:', response.status);
        }
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    });
  });
}

async function fetchUsers() {
  const usersResponse = await fetch('http://127.0.0.1:3000/users');
  const users = await usersResponse.json();
  const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];

  users.forEach(user => {
    const row = usersTable.insertRow();
    row.innerHTML = `
      <td>${user.asiakas_id}</td>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
      <td>${user.role}</td>
      <td>
        <button class="editButton">Muokkaa</button>
        <button class="deleteButton" data-id="${user.asiakas_id}">Poista</button>
      </td>
    `;

    console.log('Row added:', row); // Add this line

    row.querySelector('.deleteButton').addEventListener('click', async function() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/users/${this.getAttribute('data-id')}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          row.remove();
        } else {
          console.error('Error deleting user:', response.status);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    });
  });
}

async function fetchOrders() {
  const ordersResponse = await fetch('http://127.0.0.1:3000/orders');
  const orders = await ordersResponse.json();
  const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
  orders.forEach(order => {
    const row = ordersTable.insertRow();
    row.innerHTML = `
      <td>${order.asiakas_id}</td>
      <td>${order.tila}</td>
      <td>${new Date(order.paivamaara).toLocaleDateString()}</td>
      <td>${order.tuotteet}</td>
      <td>
        <button class="editButton">Muokkaa</button>
        <button class="deleteButton" data-id="${order.asiakas_id}">Poista</button>
      </td>
    `;

    row.querySelector('.deleteButton').addEventListener('click', async function() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/orders/${this.getAttribute('data-id')}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          row.remove();
        } else {
          console.error('Virhe poistaessa tilausta:', response.status);
        }
      } catch (error) {
        console.error('Virhe poistaessa tilausta:', error);
      }
    });
  });
}

document.getElementById('deleteAllOrdersButton').addEventListener('click', async function() {
  try {
    const response = await fetch('http://127.0.0.1:3000/orders', {
      method: 'DELETE'
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      fetchOrders();
    } else {
      console.error('Error deleting all orders:', response.status);
    }
  } catch (error) {
    console.error('Error deleting all orders:', error);
  }
});


document.getElementById('backButton').addEventListener('click', function() {
  window.location.href = 'index.html';
});

window.onload = function() {
  fetchOrders();
  fetchUsers();
  fetchAndDisplayData();
};
