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
  const reservationsResponse = await fetch('http://10.120.32.92/reservations');
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
        const response = await fetch(`http://10.120.32.92/reservations/${this.getAttribute('data-id')}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          row.remove();
        } else {
          console.error('Virhe poistaessa varausta:', response.status);
        }
      } catch (error) {
        console.error('Virhe poistaessa varausta:', error);
      }
    });
  });
}

async function fetchUsers() {
  const usersResponse = await fetch('http://10.120.32.92/users');
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
        const response = await fetch(`http://10.120.32.92/app/${this.getAttribute('data-id')}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          row.remove();
        } else {
          console.error('Virhe poistaessa tilauksia:', response.status);
        }
      } catch (error) {
        console.error('Virhe poistaessa tilauksia:', error);
      }
    });
  });
}

async function fetchOrders() {
  const ordersResponse = await fetch('http://10.120.32.92/app/orders');
  const orders = await ordersResponse.json();
  const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
  orders.forEach(order => {
    const row = ordersTable.insertRow();
    row.innerHTML = `
      <td>${order.asiakas_id}</td>
      <td>${order.order_id}</td>
      <td>${order.tila}</td>
      <td>${order.tuotteet}</td>
      <td>${new Date(order.paivamaara).toLocaleDateString()}</td>
      <td>
        <button class="editButton">Muokkaa</button>
        <button class="deleteButton" data-id="${order.asiakas_id}">Poista</button>
      </td>
    `;

    row.querySelector('.deleteButton').addEventListener('click', async function() {
      try {
        const response = await fetch(`http://10.120.32.92/app/orders/${this.getAttribute('data-id')}`, {
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
    const response = await fetch('http://10.120.32.92/app/orders', {
      method: 'DELETE'
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      fetchOrders();
    } else {
      console.error('Virhe poistaessa tilauksia:', response.status);
    }
  } catch (error) {
    console.error('Virhe poistaessa tilauksia:', error);
  }
});

async function fetchMenu() {
  const response = await fetch('http://10.120.32.92/app/menu');
  const menu = await response.json();
  const menuForm = document.getElementById('menuForm');
  menuForm.innerHTML = '';

  for (const category in menu.menu) {
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `<h2>${category}</h2>`;
    menuForm.appendChild(categoryDiv);

    if (typeof menu.menu[category] === 'object' && !Array.isArray(menu.menu[category])) {
      for (const subcategory in menu.menu[category]) {
        const subcategoryDiv = document.createElement('div');
        subcategoryDiv.innerHTML = `<h3>${subcategory}</h3>`;
        categoryDiv.appendChild(subcategoryDiv);

        menu.menu[category][subcategory].forEach((item, index) => {
          const itemDiv = createItemDiv(item, index, subcategory);
          subcategoryDiv.appendChild(itemDiv);
        });
      }
    } else {
      menu.menu[category].forEach((item, index) => {
        const itemDiv = createItemDiv(item, index, category);
        categoryDiv.appendChild(itemDiv);
      });
    }
  }
}

function createItemDiv(item, index, category) {
  const itemDiv = document.createElement('div');
  itemDiv.innerHTML = `
    <label for="${category}${index}nimi">Nimi:</label>
    <input id="${category}${index}Nimi" type="text" value="${item.nimi}">
    <label for="${category}${index}Price">Hinta:</label>
    <input id="${category}${index}Price" type="number" value="${item.hinta}">
  `;
  return itemDiv;
}

document.getElementById('updateMenuButton').addEventListener('click', async function() {
  const menuForm = document.getElementById('menuForm');
  const newMenu = {};

  for (const categoryDiv of menuForm.children) {
    const category = categoryDiv.querySelector('h2').innerText;
    newMenu[category] = [];

    for (const itemDiv of categoryDiv.querySelectorAll('div')) {
      if (itemDiv.querySelector('h3')) {
        const subcategory = itemDiv.querySelector('h3').innerText;
        newMenu[category][subcategory] = [];

        for (const subItemDiv of itemDiv.querySelectorAll('div')) {
          const name = subItemDiv.querySelector('input[type="text"]').value;
          const price = Number(subItemDiv.querySelector('input[type="number"]').value);
          newMenu[category][subcategory].push({ nimi: name, hinta: price });
        }
      } else {
        const name = itemDiv.querySelector('input[type="text"]').value;
        const price = Number(itemDiv.querySelector('input[type="number"]').value);
        newMenu[category].push({ nimi: name, hinta: price });
      }
    }
  }

  const response = await fetch('http://127.0.0.1:3000/app/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ menu: newMenu })
  });

  if (response.ok) {
    console.log('Menu updated successfully');
    alert("Menun päivitys onnistui.");
  } else {
    console.error('Virhe päivittäessä menua:', await response.text());
  }
});

document.getElementById('backButton').addEventListener('click', function() {
  window.location.href = 'index.html';
});

window.onload = function() {
  fetchOrders();
  fetchUsers();
  fetchAndDisplayData();
  fetchMenu();
};
