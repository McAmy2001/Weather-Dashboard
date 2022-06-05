const cityBtnEl = document.getElementById("cityBtn");
const chooseCityEl = document.getElementById("choose-city");
const cityInputEl = document.getElementById("city");
const chosenCityEl = document.getElementById("chosenCity");

var weatherByCoordinates = function(latLon) {
  console.log("made it");
  var apiUrl2 = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + latLon + "&units=imperial&exclude=hourly,minutely&appid=b8646725b8d223e6d4478a73d1089c53");
  
  fetch(apiUrl2).then(function(response) {
    console.log(response);
    if (response.ok) {
      response.json().then(function(data) {
      console.log(data);
      var 
      displayCurrentWeather();
      });
    } else {
      alert("Location not found, please try another.");
    }
  })
  .catch(function(error) {
    alert("Unable to connnect to OpenWeather.")
  });
};

var weatherByCity = function(city) {
  var apiUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b8646725b8d223e6d4478a73d1089c53");
  
  fetch(apiUrl).then(function(response) {
    //console.log(response);
    if (response.ok) {
      //console.log(response);
      response.json().then(function(data) {
      console.log(data);
      //var initialData = data;
      var latitude = data.coord.lat;
      var latEdit = latitude.toFixed(2);
      //console.log(latEdit);
      var longitude = data.coord.lon;
      var lonEdit = longitude.toFixed(2);
      //console.log(lonEdit);
      var latLon = (latEdit + "&lon=" + lonEdit);
      console.log(latLon);
      weatherByCoordinates(latLon);
      });
    } else {
      alert("Error: city not found, please try another.");
    }
  })
  .catch(function(error) {
    alert("Unable to connect to OpenWeather.");
});
};

var cityBtnHandler = function(event) {
  event.preventDefault();
  //console.log("Clicked");
  var city = cityInputEl.value.trim();
  console.log(city);
  weatherByCity(city);
  cityInputEl.value = ''; 
}

  
chooseCityEl.addEventListener("submit", cityBtnHandler);
//weatherByCity("Oakdale");