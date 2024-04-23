fetch('../menu.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.container');

    const ruoatDiv = document.createElement('div');
    ruoatDiv.className = 'ruoat';
    const ruoatTitle = document.createElement('h1');
    ruoatTitle.textContent = 'Ruoat';
    ruoatDiv.appendChild(ruoatTitle);

    const juomatDiv = document.createElement('div');
    juomatDiv.className = 'juomat';
    const juomatTitle = document.createElement('h1');
    juomatTitle.textContent = 'Juomat';
    juomatDiv.appendChild(juomatTitle);

    for (const category in data.menu) {
      const categoryDiv = category === 'Juomat' ? juomatDiv : ruoatDiv;

      data.menu[category].forEach(item => {
        const itemDiv = document.createElement('div');

        const itemName = document.createElement('h2');
        itemName.textContent = item.nimi;
        itemDiv.appendChild(itemName);

        if (item.kuvaus) {
          const itemDescription = document.createElement('p');
          itemDescription.textContent = item.kuvaus;
          itemDiv.appendChild(itemDescription);
        }

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `${item.hinta} €`;
        itemDiv.appendChild(itemPrice);

        const itemCheckbox = document.createElement('input');
        itemCheckbox.type = 'checkbox';
        itemCheckbox.name = category;
        itemCheckbox.value = item.nimi;
        itemDiv.appendChild(itemCheckbox);

        categoryDiv.appendChild(itemDiv);
      });
    }

    container.appendChild(ruoatDiv);
    container.appendChild(juomatDiv);

    const orderButton = document.createElement('button');
    orderButton.textContent = 'Tilaa';
    orderButton.addEventListener('click', () => {
      const ruoatSelected = document.querySelectorAll('.ruoat input[type="checkbox"]:checked').length > 0;
      const juomatSelected = document.querySelectorAll('.juomat input[type="checkbox"]:checked').length > 0;

      if (ruoatSelected && juomatSelected) {
        alert('Tilaus valmis!');
      } else {
        alert('Valitse ruoka ja juoma.');
      }
    });

    container.appendChild(orderButton);
  })
  .catch(error => console.error('Error:', error));
