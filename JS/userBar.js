let user = JSON.parse(localStorage.getItem('user'));
let loginButton = document.getElementById('login');
let registerButton = document.getElementById('register');

/**
 * If the user object exists, the login and register buttons are hidden and a new user box is created.
 * The user box contains the user's email and a 'Logout' and 'View Reservations' button.
 * Clicking the 'Logout' button removes the user object and the customer ID from local storage, shows the login and register buttons, and reloads the page.
 * If the user is an admin, an 'Open Admin View' button is added to the user box.
 * Clicking the 'View Reservations' button fetches the user's reservations from the server and logs them to the console.
 */
if (user) {
  console.log("User object: ", user);
  loginButton.style.display = 'none';
  registerButton.style.display = 'none';

  let userBox = document.createElement('div');
  userBox.id = 'userBox';
  userBox.innerHTML = `
    <p>${user.email}</p>
    <button id="logoutButton">Kirjaudu ulos</button>
    <button id="viewReservationsButton">Varaukset</button>
  `;

  let heroSection = document.querySelector('.hero');
  heroSection.appendChild(userBox);

  document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('user');
    localStorage.removeItem('asiakas_id');
    loginButton.style.display = 'block';
    registerButton.style.display = 'block';
    location.reload();
  });

  if (user && user.role === 'admin') {
    let adminPanelButton = document.createElement('button');
    adminPanelButton.id = 'adminPanelButton';
    adminPanelButton.textContent = 'Avaa admin näkymä';
    adminPanelButton.addEventListener('click', () => {
      window.location.href = 'adminpanel.html';
    });
    userBox.appendChild(adminPanelButton);
  }

  document.getElementById('viewReservationsButton').addEventListener('click', async () => {
    let asiakas_id = localStorage.getItem('asiakas_id');
    const response = await fetch(`http://10.120.32.92/app/reservations/${asiakas_id}`);
    if (response.ok) {
      const reservations = await response.json();
      console.log(reservations);
      reservations.sort((a, b) => new Date(a.date) - new Date(b.date));

      if (reservations.length === 0) {
        alert("No reservations found");
        return;
      }

      let dialog = document.createElement('dialog');
      dialog.id = 'reservationsDialog';
      dialog.innerHTML = '<button id="closeDialogButton">×</button>';

      reservations.forEach(reservation => {
        let reservationDiv = document.createElement('div');
        reservationDiv.innerHTML = `
                <h2>Varaus ID: ${reservation.reservation_id}</h2>
                <p>Asiakasmäärä: ${reservation.customer_count}</p>
                <p>Päivämäärä: ${new Date(reservation.date).toLocaleDateString()}</p>
                <p>Aika: ${reservation.ajankohta}</p>
                <p>Asiakkaan ID: ${reservation.asiakas_id}</p>
                <button class="cancelButton" data-id="${reservation.reservation_id}">Peru</button>
                <hr>
            `;
        dialog.appendChild(reservationDiv);
      });
      document.body.appendChild(dialog);
      dialog.showModal();

      document.getElementById('closeDialogButton').addEventListener('click', () => {
        dialog.close();
      });

      document.querySelectorAll('.cancelButton').forEach(button => {
        button.addEventListener('click', async (event) => {
          const reservationId = event.target.getAttribute('data-id');
          const response = await fetch(`http://10.120.32.92/app/reservations/${reservationId}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            console.log(`Reservation ${reservationId} cancelled`);
            event.target.parentElement.remove();
          } else {
            console.log("Error cancelling reservation: ", response.status);
          }
        });
      });
    } else {
      console.log("Error fetching reservations: ", response.status);
    }
  });
}
