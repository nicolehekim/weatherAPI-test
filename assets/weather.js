var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var cityNameEl = document.getElementById("cityname");
var cityHistoryEl = document.getElementById("city-history")
var indexs = [0,7,15,23,31,39];

var cityDayEl = [
  document.getElementById("cityday"),
  document.getElementById("cityday1"),
  document.getElementById("cityday2"),
  document.getElementById("cityday3"),
  document.getElementById("cityday4"),
  document.getElementById("cityday5"),
];

var tempEls = [
  document.getElementById("temp"), 
  document.getElementById("temp1"),
  document.getElementById("temp2"),
  document.getElementById("temp3"),
  document.getElementById("temp4"),
  document.getElementById("temp5"),
];

var humidEls = [
  document.getElementById("humid"), 
  document.getElementById("humid1"),
  document.getElementById("humid2"),
  document.getElementById("humid3"),
  document.getElementById("humid4"),
  document.getElementById("humid5")
];

var windEls = [
  document.getElementById("wind"), 
  document.getElementById("wind1"),
  document.getElementById("wind2"),
  document.getElementById("wind3"),
  document.getElementById("wind4"),
  document.getElementById("wind5")
];

var weatherIconEls = [
  document.getElementById("weather-icon"),
  document.getElementById("weather-icon1"),
  document.getElementById("weather-icon2"),
  document.getElementById("weather-icon3"),
  document.getElementById("weather-icon4"),
  document.getElementById("weather-icon5")
];

var weatherDisplayEl = document.getElementById("displayweather");


var apiKey = "4019261bd78cd50daccdfd0a8e4719ed";
var cities=[];
var city_history=[];
var temps=[6];
var humids=[6];
var winds=[6];
var dates=[6];


function getLocation(city) {
  console.log("hello");
  var locationUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(locationUrl)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0]);
      console.log(data[0].name);
    var lat = data [0].lat;
    var lon =data [0].lon;
    getWeather(lat, lon)
    });
}

function getWeather(lat, lon){
    var weatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric"+"&lang=english"+"&appid="+apiKey;
  fetch(weatherUrl)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      displayWeather(data);
    });
}  

function displayWeather(data) {
  console.log(data);

  var city = data.city.name;
  cityHistoryEl.textcontext= "";
  

  for (let i=0;i<6;i++){
    temps[i] = data.list[indexs[i]].main.temp;
    humids[i] = data.list[indexs[i]].main.humidity;
    winds[i] = data.list[indexs[i]].wind.speed;
    dates[i] = new Date(data.list[indexs[i]].dt * 1000);
  }

  for (let i=0;i<5;i++){
    cities.push(data.list[i]);
  }


  for (let j=0; j<6; j++){
    tempEls[j].textContent = "Temperature: " + temps[j] + "°C";
    humidEls[j].textContent = "Humidity: " + humids[j] + "%";
    windEls[j].textContent = "Wind Speed: " + winds[j] + "KM/H";
    cityDayEl[j].textContent = "Day: " + city + " " + dates[j].toLocaleDateString();
  }
}


searchButtonEl.addEventListener("click", function () {
  var searchInput = searchInputEl.value; 
  getLocation(searchInput);

  if (city_history.length<3){
  console.log(city_history);
  city_history.unshift(searchInput);
  console.log(city_history);
  } else{
    city_history.length= city_history.length-1;
    city_history.unshift(searchInput);
  }
  printCityHistory();
  updateCityHistory(city_history);
});


var city_history = JSON.parse(localStorage.getItem("city_history")) || [];


function printCityHistory() {
  cityHistoryEl.innerHTML = "";
  console.log(cityHistoryEl);
  for (let i = 0; i < city_history.length; i++) {
    const list = document.createElement("li");
    list.setAttribute("id",city_history[i]);
    cityHistoryEl.appendChild(list);
    const container = document.getElementById(city_history[i]);
    const button = document.createElement("button");
    button.setAttribute("value",city_history[i]);
    button.textContent = city_history[i];
    container.appendChild(button);
    button.addEventListener("click", function(event){
    const city = event.target.value;
    console.log(city);
    getLocation(city);
    })
  }
}

function updateCityHistory(searchInput) {
  localStorage.setItem("city_history", JSON.stringify(searchInput));
  printCityHistory();
}

printCityHistory();