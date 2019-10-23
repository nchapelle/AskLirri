
require("dotenv").config();
var key = require("./key.js");

var axios = require("axios");
var Spotify = require("node-spotify-api")
var moment = require("moment")
var dotenv = require("dotenv")
var inquirer = require("inquirer")
var spotify = new Spotify(key.spotify);


//spotify
// var spotify = new Spotify({
//     id: "92d1898bda5e4d55a3f98a0fcf0c5119",
//     secret: "b7026579bf47480983aa8e655b0e061d",
//   });
function spotifythis(){
  inquirer.prompt([
    {
      type: "input",
      name: "songName",
      message: "Which song do you want to know the info of?"
    }
  ]).then(function (searchSong) {
    songName = searchSong.songName;
    spotify.search({ type: 'track', query: songName }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      // console.log("------------")
      // console.log("1: "+songName);
      console.log("------------") 
      console.log(data.tracks.items[0].name); 
      console.log("------------")      
      console.log(data.tracks.items[0].artists[0].name);
      console.log("------------") 
      console.log(data.tracks.items[0].external_urls); 



      // console.log("---------------")
      restartLirri();
    });
});
};
function concertThis(){
  console.log("We made it this far!");
  inquirer.prompt([
    {
      type: "input",
      name: "bandName",
      message: "Which artist's live event schedule do you want to know?"
    }
  ]).then(function (searchEvent) {
    bandName = searchEvent.bandName;
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(
      function (response) {
        arrLength = response.data.length;
      for (i=0; i<arrLength; i++) {
        console.log(response.data[i].datetime);
        console.log(response.data[i].venue.name + "\n" +response.data[i].venue.city+","+response.data[i].venue.country);
        console.log("------------------");
      }
      
      restartLirri()
      })
      .catch(function (error) {
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

  });

};
function moviethis() {
  //axios call to omdb
  //movieName = "the matrix"
  //user inquire to ask for a movie name, in the then create a new obj to pass into the axios.get
  inquirer.prompt([
    {
      type: "input",
      name: "movieName",
      message: "Which movie do you want to know the rating of?"
    }
  ]).then(function (searchMovie) {
    movieName = searchMovie.movieName;
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
      function (response) {
        console.log(response.data.TItle)
        console.log("The movie's rating is: " + response.data.imdbRating);
        console.log("Year Released: "+response.data.Released)
        console.log("Synopsis: "+ response.data.Plot);
        restartLirri();
      })
      .catch(function (error) {
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
  });
};


  
function lirriStart() {
  inquirer.prompt([
    {
      type: "checkbox",
      name: "user_input",
      message: "What are searching for. ??",
      choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
    },
  ]).then(function (startLirri) {
    // console.log(startLirri.user_input);
    // console.log(startLirri.user_input == "concert-this");
    // console.log("starting switch");
    switch (startLirri.user_input[0]) {
      case "concert-this":
        concertThis();
        break;
      case "spotify-this-song":
        console.log("inside spotify fx");
        spotifythis();
        break;
      case "movie-this":
        moviethis();
        break;
      default:
        console.log("I am sorry that was an invalid input, please try again.");
        restartLirri();
    }
    // console.log("switch is complete");


  });


}

function restartLirri(){
  inquirer.prompt([
    {
      type: "confirm",
      name: "startOver",
      message: "Do you want to ask another question?"
    }
  ]).then(function (restart){
    console.log(restart.startOver)
    if (restart.startOver){
      lirriStart();
    }
    else {
      console.log("You have to pick yes.")
      // restartLirri();
    }
  });

};

lirriStart();