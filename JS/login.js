let loginButton = document.querySelector('.login-form form');
async function loginUser(event) {
  event.preventDefault();
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  const response = await fetch('http://127.0.0.1:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const user = await response.json();
    console.log("Kirjautuminen onnistui", user);
  } else {
    console.log("Login failed with status code: ", response.status);
    const responseBody = await response.json();
    console.log("Response body: ", responseBody);
  }
}
loginButton.addEventListener('submit', loginUser);
