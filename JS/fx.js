const buttons = document.querySelectorAll('.button');
const menuButton = document.querySelector('.button[href="menu.html"]'); // Select the specific button
menuButton.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = "menu.html";
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location = link.href;
        }, 1);
    });
});

window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect();

        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            const distanceFromTop = rect.top / window.innerHeight;

            element.style.transform = `translateY(${distanceFromTop * 50}px)`;

            element.style.opacity = Math.max(0, 1 - Math.max(0, distanceFromTop - 0.5) * 3);
        } else if (rect.top > window.innerHeight) {

            element.style.opacity = 1;
        }
    });
});

let maxScrollReached = 0;

window.addEventListener('scroll', function() {
    const title = document.querySelector('#title');
    const scrollPosition = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
    const baseFontSize = 20;
    const scaleFactor = 0.1;
    const maxScroll = 300;

    if (scrollPosition > maxScrollReached) {
        maxScrollReached = scrollPosition;
    }

    let newFontSize;
    if (maxScrollReached <= maxScroll) {
        newFontSize = baseFontSize + (maxScrollReached * scaleFactor);
    } else {
        newFontSize = baseFontSize + (maxScroll * scaleFactor);
    }

    title.style.fontSize = `${newFontSize}px`;
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location = link.href;
        }, 1);
    });
});