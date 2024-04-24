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

        if (ball.firstChild) {
            ball.removeChild(ball.firstChild);
        }
    });
    henkilo.style.fontSize = '60px';
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

const henkiloMaaraElements = [
    document.querySelector('#henkiloMaara'),
    document.querySelector('.pallotStyling'),
    document.querySelector('.valittuMaaraBox')
];

seuraavaSivu.addEventListener('click', function() {
    henkiloMaaraElements.forEach(element => {
        element.classList.add('fade-out');
    });

    setTimeout(() => {
        henkiloMaaraElements.forEach(element => {
            element.style.display = 'none';
        });

        const mainText = document.createElement('h1');
        const datePicker = document.createElement('input');
        const clock = document.querySelector('.clock');

        const digitalClock = document.createElement('div');
        digitalClock.id = 'digitalClock';

        const timeSelect = document.createElement('select');
        timeSelect.id = 'timeSelect';

        for (let i = 18; i <= 22; i += 0.5) {
            const option = document.createElement('option');
            const hours = Math.floor(i);
            const minutes = (i % 1) > 0 ? '30' : '00';
            option.value = `${hours}:${minutes}`;
            option.text = `${hours}:${minutes}`;
            timeSelect.appendChild(option);
        }

        timeSelect.style.opacity = '0';
        mainText.textContent = "Valitse päivämäärä.";
        datePicker.type = 'date';
        datePicker.style.opacity = '0';
        mainText.style.opacity = '0';
        clock.style.opacity = '0';
        clock.style.display = 'flex';

        const mainElement = document.querySelector('main');

        mainElement.appendChild(mainText);
        mainElement.appendChild(datePicker);
        mainElement.appendChild(digitalClock);
        mainElement.appendChild(timeSelect);

        let currentTime = new Date();

        datePicker.addEventListener('change', function() {
            if (datePicker.value) {
                timeSelect.style.opacity = '1';
            } else {
                timeSelect.style.opacity = '0';
                digitalClock.textContent = 'Valittu kellonaika: ' + timeSelect.value;
            }
        });

        timeSelect.addEventListener('change', function() {
            digitalClock.textContent = 'Kellonaikana:'
        });

        setTimeout(() => {
            datePicker.style.opacity = '1';
            mainText.style.opacity = '1';
            clock.style.opacity = '1';
        }, 100);

      timeSelect.addEventListener('change', function() {
        digitalClock.textContent = 'Kellonaikana: ' + timeSelect.value;

        const seuraavaSivu2 = document.createElement('button');
        seuraavaSivu2.textContent = 'Seuraava';
        seuraavaSivu2.style.opacity = '0';
        mainElement.appendChild(seuraavaSivu2);

        setTimeout(() => {
          seuraavaSivu2.style.opacity = '1';
        }, 100);

        seuraavaSivu2.addEventListener('click', function() {
          const user = JSON.parse(localStorage.getItem('user'));

          const reservationDetails = {
            userId: user.id,
            reservationDate: datePicker.value,
            reservationTime: timeSelect.value,
            customerCount: selectedPeopleAmount
          };

          fetch('https:///reservations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationDetails),
          })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);

              // Remove the digital clock, main text, time select, and date picker elements
              mainText.remove();
              datePicker.remove();
              digitalClock.remove();
              timeSelect.remove();

              // Create and display a summary of reservation details
              const summary = document.createElement('div');
              summary.textContent = `Reservation Details: \nUser ID: ${reservationDetails.userId} \nReservation Date: ${reservationDetails.reservationDate} \nReservation Time: ${reservationDetails.reservationTime} \nCustomer Count: ${reservationDetails.customerCount}`;
              mainElement.appendChild(summary);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        });
      });
    }, 1000);
});
fetch('https:///reservations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(reservationDetails),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    document.querySelector('.second-hand').style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    document.querySelector('.minute-hand').style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    document.querySelector('.hour-hand').style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);
setDate();
