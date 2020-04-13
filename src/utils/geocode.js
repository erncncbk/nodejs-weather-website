const fetch = require("node-fetch");

const geocode = async (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiZXJuY25jYmsiLCJhIjoiY2s4dTB6NWdkMDBlazNlbzRoYjQyMzYyNyJ9.1cPCSvvyUx8dWrmrRpI3Tw";

  try {
    const response = await fetch(url);
    const data = await response.json();

    callback(undefined, {
      latitude: data.features[0].center[1],
      longitude: data.features[0].center[0],
      location: data.features[0].place_name,
    });
  } catch (err) {
    if (err) {
      callback("Unable to find location. Try another search");
    } else if (data.features.length === 0) {
      callback("Unable to find location. Try another search");
    }
  }
};
module.exports = geocode;
