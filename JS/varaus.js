const balls = document.querySelectorAll('.pallotStyling div');
const henkilo = document.querySelector('#henkiloMaara');
let henkiloMaara = document.querySelector('#valittuMaara');
let henkiloMaaraText = document.querySelector('#henkiloMaaraText');
let seuraavaSivu = document.querySelector('#seuraava1');
let selected = false;
let selectedPeopleAmount = 0;

henkiloMaara.style.opacity = '0';
henkiloMaaraText.style.opacity = '0';
seuraavaSivu.style.opacity = '0';

function changeOtherBalls(e) {
    const hoveredBallNumber = parseInt(e.target.id.replace('pallo', ''));

    if (selected === false) {
        balls.forEach(ball => {
            const currentBallNumber = parseInt(ball.id.replace('pallo', ''));
            if (currentBallNumber <= hoveredBallNumber) {
                let currentFontSize = parseInt(window.getComputedStyle(henkilo).fontSize);
                henkilo.style.fontSize = (currentFontSize + 2) + 'px';
                ball.style.backgroundColor = '#091235';
                ball.style.width = '110px';
                ball.style.height = '110px';

                const ballNumberText = document.createElement('span');
                ballNumberText.textContent = currentBallNumber.toString();
                ballNumberText.style.color = '#cbbca4';
                ballNumberText.style.top = '50%';
                ballNumberText.style.left = '50%';
                ballNumberText.style.transform = 'translate(-50%, -50%)';
                ballNumberText.style.fontSize = '40px';
                ball.appendChild(ballNumberText);

            } else {
                ball.style.backgroundColor = '#cbbca4';
                ball.style.width = '100px';
                ball.style.height = '100px';
            }
        });
    }
}

function resetBalls() {
    balls.forEach(ball => {
        ball.style.backgroundColor = '#cbbca4';
        ball.style.width = '100px';
        ball.style.height = '100px';

        // If the ball has a text node (the ball number), remove it
        if (ball.firstChild) {
            ball.removeChild(ball.firstChild);
        }
    });
    henkilo.style.fontSize = '60px'; // Reset the font size
}

function selectNumberOfPeople(ball) {
    const currentBallNumber = parseInt(ball.id.replace('pallo', ''));

    if (selected === false) {
        ball.style.backgroundColor = '#091235';
        ball.style.width = '130px';
        ball.style.height = '130px';
        henkiloMaara.textContent = currentBallNumber.toString();
        selected = true;
        henkiloMaara.style.opacity = '1';
        henkiloMaaraText.style.opacity = '1';
        seuraavaSivu.style.opacity = '1';
        selectedPeopleAmount = currentBallNumber;
        henkiloMaara.textContent = currentBallNumber.toString();
        console.log(selectedPeopleAmount);

        // Remove event listeners to lock the styling
        balls.forEach(b => {
            b.removeEventListener('mouseenter', changeOtherBalls);
            b.removeEventListener('mouseleave', resetBalls);
        });
    } else {
        ball.style.backgroundColor = '#cbbca4';
        ball.style.width = '100px';
        ball.style.height = '100px';
        henkiloMaara.textContent = '';
        selected = false;
        henkiloMaara.style.opacity = '0';
        henkiloMaaraText.style.opacity = '0';
        seuraavaSivu.style.opacity = '0';

        // Add event listeners back
        balls.forEach(b => {
            b.addEventListener('mouseenter', changeOtherBalls);
            b.addEventListener('mouseleave', resetBalls);
        });
    }
}

balls.forEach(ball => {
    ball.addEventListener('click', () =>  selectNumberOfPeople(ball));
    ball.addEventListener('mouseenter', changeOtherBalls);
    ball.addEventListener('mouseleave', resetBalls);
});