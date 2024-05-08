var map = L.map('map').setView([60.1666052, 24.9430558], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let circle = L.circle([60.166666, 24.945596], {
  color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 10
}).addTo(map);
circle.bindPopup("Olet täällä!");

const bikeStationIDs = ["009", "161", "007", "010", "018", "019", "049", "011", "008", "024"]


async function addMarkersToMap() {
  try {

    const stationsWithDetails = [];
    for (const stationId of bikeStationIDs) {
      const details = await getBikeStationById(stationId);
      stationsWithDetails.push(details);
    }
    //console.log(stationsWithDetails);


    stationsWithDetails.forEach(station => {
      const lat = station.data.bikeRentalStation.lat;
      const lon = station.data.bikeRentalStation.lon;
      const name = station.data.bikeRentalStation.name;
      const bikesAvailable = station.data.bikeRentalStation.bikesAvailable;
      const allowDropoff = station.data.bikeRentalStation.allowDropoff;
      const spacesAvailable = station.data.bikeRentalStation.spacesAvailable;


      const marker = L.marker([lat, lon]).addTo(map);


      const popupContent = `
        <b>Aseman nimi:</b> ${name}<br>
        <b>Polkypyöriä saatavilla:</b> ${bikesAvailable}<br>
        <b>Palautus paikkoja jäljellä:</b> ${spacesAvailable}<br>

      `;

      marker.bindPopup(popupContent);
    });
  } catch (error) {
    console.error(error);
  }
}




async function getBikeStations() {
  try {
    const response = await fetch('http://10.120.32.92/reititys');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const bikeStations = await response.json();
    //console.log("Bikestations",bikeStations);
    return bikeStations
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
  }
}

async function getBikeStationById(id) {
  try {
    const response = await fetch(`http://10.120.32.92/app/reititys/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const bikeStation = await response.json();
    //console.log("Bikestation by id", bikeStation);
    return bikeStation;
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
  }
}

window.onload = function() {
  getBikeStations();
  getBikeStationById("070");
  //addMarkersToMap();
}

document.getElementById('show-map-button').addEventListener('click', function() {
  let mapDiv = document.getElementById('map');
  let button = document.getElementById('show-map-button');
  if (mapDiv.style.display === 'none' || mapDiv.style.display === '') {
    mapDiv.style.display = 'block';
    button.innerHTML = 'Sulje Kartta';
    addMarkersToMap();
    map.invalidateSize();
  } else {
    mapDiv.style.display = 'none';
    button.innerHTML = 'Avaa Kartta';
  }
});
