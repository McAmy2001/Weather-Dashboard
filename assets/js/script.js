const cityBtnEl = document.getElementById("cityBtn");
const chooseCityEl = document.getElementById("choose-city");
const cityInputEl = document.getElementById("city");
const chosenCityEl = document.getElementById("chosenCity");
const currentWeatherDisplay = document.getElementById("current-weather");
const forecastDisplayEl = document.getElementById("forecast-weather");
const pastCityListEl = document.getElementById("past-city-list");


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
  console.log(forecastArray[0].dt);

  for (var i = 0; i < 5; i++) {
    console.log(forecastArray[i].temp.day);
    var forecastBoxEl = document.createElement("div");
    forecastBoxEl.className = "forecast-display-div";
    forecastDisplayEl.appendChild(forecastBoxEl);

    var futureDateDisplay = document.createElement("p");
    var timeMilleseconds = forecastArray[i].dt * 1000;
    var dateObject = new Date(timeMilleseconds);
    var formattedDate = dateObject.toLocaleString("en-US", {weekday: "long"}) + ", " + dateObject.toLocaleString("en-US", {month: "long"}) + " " + dateObject.toLocaleString("en-US", {day: "numeric"}) + ", " + dateObject.toLocaleString("en-US", {year: "numeric"});
    futureDateDisplay.textContent = formattedDate;
    forecastDisplayEl.appendChild(futureDateDisplay);

    var forecastTempEl = document.createElement("p");
    forecastTempEl.innerHTML = "Temperature: " + forecastArray[i].temp.day + "&#8457";
    forecastTempEl.className = "forecast-list-item";
    forecastDisplayEl.appendChild(forecastTempEl);

    var forecastHumidityEl = document.createElement("p");
    forecastHumidityEl.innerHTML = "Humidity: " + forecastArray[i].humidity + "%";
    forecastHumidityEl.className = "forecast-list-item";
    forecastDisplayEl.appendChild(forecastHumidityEl);

    var forecastWindSpeedEl = document.createElement("p");
    forecastWindSpeedEl.innerHTML = "Wind Speed: " + forecastArray[i].wind_speed + "mph";
    forecastWindSpeedEl.className = "forecast-list-item";
    forecastDisplayEl.appendChild(forecastWindSpeedEl);

    var forecastUVIEl = document.createElement("p");
    forecastUVIEl.innerHTML = "UV Index: " + forecastArray[i].uvi;
    forecastUVIEl.className = "forecast-list-item";
    forecastDisplayEl.appendChild(forecastUVIEl);
  }
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

var saveCity = function(cityInput) {
  console.log("went to save function");
  const storageCities = localStorage.getItem("savedCities");
  const currentCity = {city: cityInput};

  if (storageCities === null) {
    localStorage.setItem("savedCities", JSON.stringify([currentCity]));
  } else {
    var citiesArray = JSON.parse(storageCities);
    citiesArray.push(currentCity);
    localStorage.setItem("savedCities", JSON.stringify(citiesArray));
  }
};


var weatherByCity = function(city) {
  chosenCityEl.textContent = city;
  var apiUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b8646725b8d223e6d4478a73d1089c53");
  
  fetch(apiUrl).then(function(response) {
    //console.log(response);
    if (response.ok) {
      //console.log(response);
      response.json().then(function(data) {
      var cityInput = data.name;
      console.log(city);
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
      saveCity(cityInput);
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
  
  weatherByCity(city);
  cityInputEl.value = ''; 
}

var listCities = function() {
  const storageCities = localStorage.getItem("savedCities");const listedCities = JSON.parse(storageCities);
  console.log(listedCities);

  for (var i = 0; i < listedCities.length; i++) {
    var cityListEl = document.createElement("button");
    cityListEl.className = "past-city-btn";
    cityListEl.textContent = listedCities[i].city;
    pastCityListEl.appendChild(cityListEl);
  }
  };
  listCities();

var pastCityBtnHandler = function(e) {
  console.log(e.target);
  var city = e.target.textContent;
  console.log(city);
  weatherByCity(city);
};

chooseCityEl.addEventListener("submit", cityBtnHandler);
pastCityListEl.addEventListener("click", pastCityBtnHandler);

//weatherByCity("Oakdale");