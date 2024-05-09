fetch('http://10.120.32.92/app/menu')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const container = document.querySelector('.container');

    for (const category in data.menu) {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = category;

      const categoryTitle = document.createElement('h1');
      categoryTitle.textContent = category;
      categoryDiv.appendChild(categoryTitle);

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

        categoryDiv.appendChild(itemDiv);
      });

      container.appendChild(categoryDiv);
    }
  })
  .catch(error => console.error('Error:', error));
