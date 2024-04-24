let loginForm = document.querySelector('.login-form form');
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

    localStorage.setItem('user', JSON.stringify(user));

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
