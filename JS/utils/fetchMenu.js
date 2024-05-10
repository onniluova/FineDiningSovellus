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

      if (Array.isArray(data.menu[category])) {
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

          if (item.allergeenit && item.allergeenit.length > 0) {
            const itemAllergens = document.createElement('p');
            itemAllergens.textContent = `Allergens: ${item.allergeenit.join(', ')}`;
            itemDiv.appendChild(itemAllergens);
          }

          categoryDiv.appendChild(itemDiv);
        });
      } else {
        for (const subcategory in data.menu[category]) {
          const subcategoryDiv = document.createElement('div');
          subcategoryDiv.className = subcategory;

          const subcategoryTitle = document.createElement('h2');
          subcategoryTitle.textContent = subcategory;
          subcategoryDiv.appendChild(subcategoryTitle);

          data.menu[category][subcategory].forEach(item => {
            const itemDiv = document.createElement('div');

            const itemName = document.createElement('h3');
            itemName.textContent = item.nimi;
            itemDiv.appendChild(itemName);

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `${item.hinta} €`;
            itemDiv.appendChild(itemPrice);

            const itemVolume = document.createElement('p');
            itemVolume.textContent = `Volume: ${item.tilavuus}`;
            itemDiv.appendChild(itemVolume);

            subcategoryDiv.appendChild(itemDiv);
          });

          categoryDiv.appendChild(subcategoryDiv);
        }
      }

      container.appendChild(categoryDiv);
    }
  })
  .catch(error => console.error('Error:', error));
