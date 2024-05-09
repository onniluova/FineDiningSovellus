fetch('http://127.0.0.1:3000/menu')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    const container = document.querySelector('.container');

    for (const category in data.menu) {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = category.toLowerCase();
      const categoryTitle = document.createElement('h1');
      categoryTitle.textContent = category;
      categoryDiv.appendChild(categoryTitle);

      if (category === 'Juomat') {
        data.menu[category].forEach(item => {
          const itemDiv = createItemDiv(item);
          categoryDiv.appendChild(itemDiv);
        });
      } else {
        data.menu[category].forEach(item => {
          const itemDiv = createItemDiv(item);
          categoryDiv.appendChild(itemDiv);
        });
      }

      container.appendChild(categoryDiv);
    }

    const orderButton = document.createElement('button');
    orderButton.textContent = 'Ostoskoriin';

    orderButton.addEventListener('click', () => {
      const alkuruokaSelected = document.querySelectorAll('.alkuruoka input[type="checkbox"]:checked');
      const paaruokaSelected = document.querySelectorAll('.pääruoka input[type="checkbox"]:checked');
      const juomatSelected = document.querySelectorAll('.juomat input[type="checkbox"]:checked');
      const jalkiruokaSelected = document.querySelectorAll('.jälkiruoka input[type="checkbox"]:checked');

      const selectedItems = [...alkuruokaSelected, ...paaruokaSelected, ...juomatSelected, ...jalkiruokaSelected].map(item => item.value);

      sessionStorage.setItem('selectedItems', JSON.stringify(selectedItems));

      window.location.href = 'ostoskori.html';
    });

    container.appendChild(orderButton);
  })
  .catch(error => console.error('Error:', error));

function createItemDiv(item) {
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
  itemCheckbox.name = item.nimi;
  itemCheckbox.value = item.nimi;
  itemDiv.appendChild(itemCheckbox);

  return itemDiv;
}
