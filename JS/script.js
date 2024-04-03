const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

const menuButton = document.querySelector('.button[href="menu.html"]'); // Select the specific button
menuButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    window.location.href = "menu.html"; // Redirect to the menu page
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location = link.href;
        }, 5000); // same duration as the fade-out animation
    });
});