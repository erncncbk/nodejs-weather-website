const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and vies location
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "erncncbk",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "erncncbk",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text",
    name: "erncncbk",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address term",
    });
  } else {
    geocode(
      req.query.address,
      (err, { latitude, longitude, location } = {}) => {
        if (err) {
          return res.send({
            error: "Unable to find location. Try another search",
          });
        }
        forecast(latitude, longitude, (err, { city, temp, weather } = {}) => {
          if (err) {
            return res.send({ err });
          }
          res.send({
            forecast: weather,
            temperature: temp,
            location: location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "erncncbk",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "erncncbk",
    errorMessage: "Page not found",
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
