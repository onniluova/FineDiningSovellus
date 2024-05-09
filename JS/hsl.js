


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

/**
 * Asynchronously fetches bike station data for a list of station IDs and adds markers to the map for each station.
 * Each marker's popup contains the station's name, the number of bikes available, and the number of spaces available.
 *
 * @async
 * @function
 * @throws Will throw an error if the fetch operation fails or if the server returns a non-OK HTTP status.
 */
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


/**
 * Asynchronously fetches all bike station data from the HSL API.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} A promise that resolves to an array of bike station objects.
 * @throws {Error} Will throw an error if the fetch operation fails or if the server returns a non-OK HTTP status.
 */

async function getBikeStations() {
  try {
    const response = await fetch('http://10.120.32.92/app/reititys');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const bikeStations = await response.json();
    return bikeStations;
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
  }
}

/**
 * Asynchronously fetches data for a specific bike station from the HSL API.
 *
 * @async
 * @function
 * @param {string} id - The ID of the bike station.
 * @returns {Promise<Object>} A promise that resolves to a bike station object.
 * @throws {Error} Will throw an error if the fetch operation fails or if the server returns a non-OK HTTP status.
 */
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

/**
 * Initializes the application by fetching data for all bike stations and for a specific bike station.
 *
 * @function
 */
window.onload = function() {
  getBikeStations();
  getBikeStationById("070");
}

/**
 * Adds an event listener to the 'show-map-button' that displays the map when the button is clicked.
 *
 * @function
 */
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
export {getBikeStations, getBikeStationById, addMarkersToMap}
