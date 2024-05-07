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
  // Fetch all reservations
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
        <button class="editButton">Edit</button>
        <button class="deleteButton" data-id="${reservation.reservation_id}">Delete</button>
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
        <button class="deleteButton">Poista</button>
      </td>
    `;
  });
}

document.getElementById('backButton').addEventListener('click', function() {
  window.location.href = 'index.html';
});

fetchAndDisplayData();
