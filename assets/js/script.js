const cityBtnEl = document.getElementById("cityBtn");
const chooseCityEl = document.getElementById("choose-city");
const cityInputEl = document.getElementById("city");
const chosenCityEl = document.getElementById("chosenCity");
const currentWeatherDisplay = document.getElementById("current-weather");


var displayCurrentWeather = function(weatherArray) {

  var currentDate = document.createElement("p");
  const day = moment().format('dddd');
  const date = moment().format('MMMM Do YYYY');
  currentDate.textContent = day + ", " + date;
  currentDate.className = ("current-list-item");
  currentWeatherDisplay.appendChild(currentDate);

  var currentTemp = document.createElement("p");
  currentTemp.innerHTML = "Temperature: " + weatherArray[0] + "&#8457";
  //console.log(currentTemp.textContent);
  currentDate.className = ("current-list-item");
  currentWeatherDisplay.appendChild(currentTemp);

  var currentHumidity = document.createElement("p");
  currentHumidity.textContent = "Humidity: " + weatherArray[1] + "%";
  currentDate.className = ("current-list-item");
  currentWeatherDisplay.appendChild(currentHumidity);

  var currentUVI = document.createElement("p");
  currentUVI.textContent = "UV Index: " + weatherArray[2];
  currentDate.className = ("current-list-item");
  currentWeatherDisplay.appendChild(currentUVI);

  var currentWindSpeed = document.createElement("p");
  currentWindSpeed.textContent = "Wind speed: " + weatherArray[3] + "mph";
  currentDate.className = ("current-list-item");
  currentWeatherDisplay.appendChild(currentWindSpeed);

  currentWeatherDisplay.classList.add("current-box");
};

var displayForecast = function(forecastArray) {
  console.log(forecastArray);
}

var weatherByCoordinates = function(latLon) {
  //console.log("made it");
  var apiUrl2 = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + latLon + "&units=imperial&exclude=hourly,minutely&appid=b8646725b8d223e6d4478a73d1089c53");
  
  fetch(apiUrl2).then(function(response) {
    //console.log(response);
    if (response.ok) {
      response.json().then(function(data) {
      var currentWeather = [
        data.current.temp,
        data.current.humidity,
        data.current.uvi,
        data.current.wind_speed]
        //console.log(currentWeeather);
      displayCurrentWeather(currentWeather);

      var forecast = data.daily;
      displayForecast(forecast);
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
      //console.log(data);
      //var initialData = data;
      var latitude = data.coord.lat;
      var latEdit = latitude.toFixed(2);
      //console.log(latEdit);
      var longitude = data.coord.lon;
      var lonEdit = longitude.toFixed(2);
      //console.log(lonEdit);
      var latLon = (latEdit + "&lon=" + lonEdit);
      //console.log(latLon);
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
  //console.log(city);
  chosenCityEl.textContent = city;
  weatherByCity(city);
  cityInputEl.value = ''; 
}

  
chooseCityEl.addEventListener("submit", cityBtnHandler);
//weatherByCity("Oakdale");