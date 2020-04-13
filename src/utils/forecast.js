const fetch = require("node-fetch");

const forecast = async (lat, lon, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=a9ed50d8a58dc3371908b81241d575a7&units=metric";
  try {
    const response = await fetch(url);
    const data = await response.json();

    callback(undefined, {
      city: data.name,
      temp: data.main.temp,
      weather: data.weather[0].description,
      humidity: data.main.humidity,
    });
  } catch (err) {
    if (err) {
      callback("Unable to connect to weather service!");
    } else if (data.features.length === 0) {
      callback("Unable to find location. Try another search");
    }
  }
};

module.exports = forecast;
