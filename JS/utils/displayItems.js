fetch('../menu.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.container');

    for (const category in data.menu) {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = category.toLowerCase();
      const categoryTitle = document.createElement('h1');
      categoryTitle.textContent = category;
      categoryDiv.appendChild(categoryTitle);

      if (category === 'Juomat') {
        for (const subcategory in data.menu[category]) {
          const subcategoryDiv = document.createElement('div');
          subcategoryDiv.className = subcategory.toLowerCase();
          const subcategoryTitle = document.createElement('h2');
          subcategoryTitle.textContent = subcategory;
          subcategoryDiv.appendChild(subcategoryTitle);

          data.menu[category][subcategory].forEach(item => {
            const itemDiv = createItemDiv(item);
            subcategoryDiv.appendChild(itemDiv);
          });

          categoryDiv.appendChild(subcategoryDiv);
        }
      } else {
        data.menu[category].forEach(item => {
          const itemDiv = createItemDiv(item);
          categoryDiv.appendChild(itemDiv);
        });
      }

      container.appendChild(categoryDiv);
    }

    const orderButton = document.createElement('button');
    orderButton.textContent = 'Tilaa';
    orderButton.addEventListener('click', () => {
      const alkuruokaSelected = document.querySelectorAll('.alkuruoka input[type="checkbox"]:checked');
      const paaruokaSelected = document.querySelectorAll('.pääruoka input[type="checkbox"]:checked');
      const juomatSelected = document.querySelectorAll('.juomat input[type="checkbox"]:checked');

      console.log('Alkuruoka selected:', alkuruokaSelected.length);
      console.log('Pääruoka selected:', paaruokaSelected.length);
      console.log('Juomat selected:', juomatSelected.length);

      if ((alkuruokaSelected.length > 0 || paaruokaSelected.length > 0) && juomatSelected.length > 0) {
        const date = new Date();
        const formattedDate = date.toISOString().slice(0,10);

        const asiakas_id = localStorage.getItem('asiakas_id');
        const newOrder = {
          asiakas_id: asiakas_id,
          tila: 0,
          paivamaara: formattedDate
        };

        fetch('http://localhost:3000/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newOrder)
        })
          .then(response => response.json())
          .then(data => {
            console.log('Server response:', data);
            if (data.message === 'Tilaus tehty onnistuneesti.') {
              document.getElementById('orderDetails').textContent = JSON.stringify(newOrder);
              document.getElementById('orderModal').style.display = 'block';
            } else {
              alert('Tilauksen tekemisessä ilmeni virhe.');
            }
            document.getElementById('homeButton').addEventListener('click', () => {
              window.location.href = '../HTML/index.html';
            });
          })
          .catch(error => console.error('Error:', error));
      } else {
        alert('Valitse ruoka ja juoma.');
      }
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
