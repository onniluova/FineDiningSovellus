let loginForm = document.querySelector('.login-form form');

/**
 * Asynchronously fetches order data from the server and displays it in a table.
 * Each row in the table contains the order's details.
 *
 * @async
 * @function
 * @throws {Error} Will throw an error if the fetch operation fails or if the server returns a non-OK HTTP status.
 */
async function loginUser(event) {
  event.preventDefault();
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  const response = await fetch('http://10.120.32.92/app/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const user = await response.json();
    console.log("Kirjautuminen onnistui", user);

    localStorage.setItem('user', JSON.stringify(user.user.user));
    localStorage.setItem('asiakas_id', user.user.user.asiakas_id);

    let message = document.createElement('h1');
    message.id = 'successMessage';
    message.textContent = 'Kirjauduttu sisään';
    loginForm.appendChild(message);

    setTimeout(() => {
      message.style.opacity = "1";
    }, 100);

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  } else {
    console.log("Status code: ", response.status);
    const responseBody = await response.json();
    console.log("Response: ", responseBody);
  }
}

loginForm.addEventListener('submit', loginUser);
