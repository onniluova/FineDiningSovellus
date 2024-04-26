let user = JSON.parse(localStorage.getItem('user'));
let loginButton = document.getElementById('login');
let registerButton = document.getElementById('register');

if (user) {
  console.log("User object: ", user);
  loginButton.style.display = 'none';
  registerButton.style.display = 'none';

  let userBox = document.createElement('div');
  userBox.id = 'userBox';
  userBox.innerHTML = `
    <p>Email: ${user.email}</p>
    <button id="logoutButton">Logout</button>
    <button id="viewReservationsButton">View Reservations</button>
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

  document.getElementById('viewReservationsButton').addEventListener('click', async () => {
    let asiakas_id = localStorage.getItem('asiakas_id');
    const response = await fetch(`http://127.0.0.1:3001/reservations/${asiakas_id}`);
    if (response.ok) {
      const reservations = await response.json();
      console.log(reservations);
      // Display reservations to the user...
    } else {
      console.log("Error fetching reservations: ", response.status);
    }
  });
}
