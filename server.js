require('dotenv').config(); // Needs to be first to load envs

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var unirest = require("unirest");
var cors = require('cors');


const port_number = process.env.PORT_NUMBER;
const api_key = process.env.API_KEY;
const api_host = process.env.API_HOST;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.get('/getLocation/:cityName', function(req, res) {
  // res.write('<p>search results: </p>');
  // res.write(makeFlightQuery("Stockholm"));
  // console.log(makeFlightQuery("Stockholm"))
  // makeFlightQuery("Stockholm");
  if(!req.params) {
    res.send("Empty");
  }
  const name_of_city = req.params.cityName;
  makeLocationQuery(name_of_city).then((body) => {
    res.send(body.Places);
    // res.send();
  }).catch((error) => {
    console.log("error: ", error);
    res.write("API request unsuccesful.");
    res.send();
  });

});

app.get('/search', function(req, res) {

  console.log("Quote query...");

  getQuotes(req.query.originID, req.query.destinationID, req.query.departureDate, req.query.arrivalDate).then((body) => {
    res.send(body);
    console.log(body);
    // res.send();
  }).catch((error) => {
    console.log("error: ", error);
    res.write("API request unsuccesful.");
    res.send();
  });

});



app.listen(port_number);
console.log("listening on port: " + port_number);


function makeLocationQuery(city_string) {
  return new Promise(function(resolve, reject) {
    var req = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/");
    req.query({
      "query": city_string
    });

    req.headers({
      "x-rapidapi-key": api_key,
      "x-rapidapi-host": api_host,
      "useQueryString": true
    });

    req.end(function(res) {

      if (res.error) {
        return reject(res.error)
      }
      return resolve(res.body);
    });
  }); //End of promise
}

function getQuotes(originID, destinationID, departureDate, arrivalDate) {

  return new Promise(function(resolve, reject) {

    var req = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/"+ originID +"/" + destinationID + "/" + departureDate);
    req.query({
      "inboundpartialdate": arrivalDate
    });

    req.headers({
      "x-rapidapi-key": api_key,
      "x-rapidapi-host": api_host,
      "useQueryString": true
    });

    req.end(function(res) {

      if (res.error) {
        return reject(res.error)
      }
      return resolve(res.body);
    });
  }); //End of promise

}
