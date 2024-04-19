document.addEventListener('DOMContentLoaded', (event) => {
  let registerForm = document.querySelector('.signup form');

  function registerUser(event) {
    event.preventDefault();
    console.log('registerUser called');
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let etunimi = document.getElementById('first_name').value;
    let sukunimi = document.getElementById('last_name').value;

    let newUser = {
      first_name: etunimi,
      last_name: sukunimi,
      email: email,
      password: password,
    };

    console.log(newUser);

    fetch('http://127.0.0.1:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Onnistui:', data);

        let message = document.createElement('h1');
        message.id = 'successMessage';
        message.textContent = 'Käyttäjä luotu';
        registerForm.appendChild(message);

        setTimeout(() => {
          message.style.opacity = "1";
        }, 100);

        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  registerForm.addEventListener('submit', registerUser);
});
