const buttons = document.querySelectorAll('.button');
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
        }, 1); // same duration as the fade-out animation
    });
});

window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect();

        // Check if element is within the viewport
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            // Element is within the viewport
            const distanceFromTop = rect.top / window.innerHeight; // How far from the top

            // Apply parallax translation
            element.style.transform = `translateY(${distanceFromTop * 50}px)`; // Changed to positive for reverse effect

            // Fade out effect, start fading out only after the element has moved 50% past the top of the viewport
            element.style.opacity = Math.max(0, 1 - Math.max(0, distanceFromTop - 0.5) * 3);
        } else if (rect.top > window.innerHeight) { // Check if element is above the viewport
            // Restore opacity for the fade-out on subsequent scrolls
            element.style.opacity = 1;
        }
    });
});

let maxScrollReached = 0; // Keep track of the maximum scroll position reached

window.addEventListener('scroll', function() {
    const title = document.querySelector('#title'); // Select the title element
    const scrollPosition = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
    const baseFontSize = 20; // Base font size in pixels
    const scaleFactor = 0.1; // How much the font size should increase per pixel scrolled
    const maxScroll = 500; // Maximum scroll position for increasing font size

    // Update maxScrollReached if the current scroll position is higher
    if (scrollPosition > maxScrollReached) {
        maxScrollReached = scrollPosition;
    }

    // Calculate new font size based on maxScrollReached
    let newFontSize;
    if (maxScrollReached <= maxScroll) {
        newFontSize = baseFontSize + (maxScrollReached * scaleFactor);
    } else {
        newFontSize = baseFontSize + (maxScroll * scaleFactor);
    }

    // Apply new font size to title
    title.style.fontSize = `${newFontSize}px`;
});