
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var Spotify = require("node-spotify-api")
var moment = require("moment")
var dotenv = require("dotenv")

//spotify
// var spotify = new Spotify({
//     id: "92d1898bda5e4d55a3f98a0fcf0c5119",
//     secret: "b7026579bf47480983aa8e655b0e061d",
//   });
   
spotify.search({ type: 'track', query: 'umbrella' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

//axios call to omdb
movieName = "the matrix"
axios.get("http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy").then( 
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
