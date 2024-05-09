const selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || [];
const mainElement = document.querySelector('main');

/**
 * Asynchronously fetches menu data from the server and calculates the total price of the selected items.
 * The total price is then displayed in a new paragraph element that is appended to the main element.
 *
 * @async
 * @function
 * @throws {Error} Will throw an error if the fetch operation fails or if the server returns a non-OK HTTP status.
 */
fetch('../menu.json')
  .then(response => response.json())
  .then(menuData => {

    const selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || [];

    let totalPrice = 0;

    for (const selectedItem of selectedItems) {

      for (const category in menuData.menu) {
        if (category === 'Juomat') {
          for (const subcategory in menuData.menu[category]) {
            const item = menuData.menu[category][subcategory].find(item => item.nimi === selectedItem);
            if (item) {
              totalPrice += parseFloat(item.hinta);
              break;
            }
          }
        } else {
          const item = menuData.menu[category].find(item => item.nimi === selectedItem);
          if (item) {
            totalPrice += parseFloat(item.hinta);
            break;
          }
        }
      }
    }

    const totalPriceElement = document.createElement('p');
    totalPriceElement.textContent = `Hinta: ${totalPrice.toFixed(2)} €`;
    document.querySelector('main').appendChild(totalPriceElement);
  })
  .catch(error => console.error('Error:', error));

selectedItems.forEach(item => {

  const itemElement = document.createElement('p');
  itemElement.textContent = item;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Poista';
  removeButton.addEventListener('click', () => {
    const index = selectedItems.indexOf(item);
    if (index > -1) {
      selectedItems.splice(index, 1);
      sessionStorage.setItem('selectedItems', JSON.stringify(selectedItems));
      mainElement.removeChild(itemElement);
    }
  });

  itemElement.appendChild(removeButton);
  mainElement.appendChild(itemElement);
});

if (selectedItems.length > 0) {
  const orderButton = document.createElement('button');
  orderButton.textContent = 'Tilaa';
  orderButton.className = 'order-button';
  orderButton.addEventListener('click', async () => {
    const asiakas_id = localStorage.getItem('asiakas_id');
    const date = new Date();
    const formattedDate = date.toISOString().slice(0,10);

    if (!asiakas_id) {
      alert('Sinun täytyy kirjautua sisään ennen tilauksen tekoa.');
      return;
    }

    const newOrder = {
      asiakas_id: asiakas_id,
      tila: 0,
      paivamaara: formattedDate,
      tuotteet: selectedItems
    };

    try {
      const response = await fetch('http://10.120.32.92/app/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);

      selectedItems.length = 0;
      sessionStorage.setItem('selectedItems', JSON.stringify(selectedItems));

      while (mainElement.firstChild) {
        mainElement.removeChild(mainElement.firstChild);
      }

      const orderSummary = document.createElement('div');
      orderSummary.textContent = 'Tilaus onnistui!';
      orderSummary.className = 'order-success';
      mainElement.appendChild(orderSummary);

      const backButton = document.createElement('button');
      backButton.textContent = 'Takaisin etusivulle';
      backButton.className = 'back-button';

      backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
      mainElement.appendChild(backButton);

    } catch (error) {
      console.error('Error:', error);
    }
  });

  mainElement.appendChild(orderButton);
} else {
  const emptyCartMessage = document.createElement('p');
  emptyCartMessage.textContent = 'Ostoskori on tyhjä.';
  mainElement.appendChild(emptyCartMessage);
}
