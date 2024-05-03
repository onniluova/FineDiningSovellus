const selectedItems = JSON.parse(sessionStorage.getItem('selectedItems'));
const mainElement = document.querySelector('main');

selectedItems.forEach(item => {
  const itemElement = document.createElement('p');
  itemElement.textContent = item;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
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

const orderButton = document.createElement('button');
orderButton.textContent = 'Tilaa';
orderButton.addEventListener('click', async () => {
  const asiakas_id = localStorage.getItem('asiakas_id');
  const date = new Date();
  const formattedDate = date.toISOString().slice(0,10);

  const newOrder = {
    asiakas_id: asiakas_id,
    tila: 0,
    paivamaara: formattedDate,
    tuotteet: selectedItems
  };

  try {
    const response = await fetch('http://127.0.0.1:3000/orders', {
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
    backButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
    mainElement.appendChild(backButton);

  } catch (error) {
    console.error('Error:', error);
  }
});

mainElement.appendChild(orderButton);
