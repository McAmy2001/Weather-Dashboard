//Declare DOM elements
const cityBtnEl = document.getElementById("cityBtn");
const chooseCityEl = document.getElementById("choose-city");
const cityInputEl = document.getElementById("city");
const chosenCityEl = document.getElementById("chosenCity");
const currentWeatherDisplay = document.getElementById("current-weather");
const forecastDisplayEl = document.getElementById("forecast-weather");
const pastCityListEl = document.getElementById("past-city-list");
const clearCityHistoryEl = document.getElementById("clear-saved-cities");
const iconContainerEl = document.getElementById("icon-container");

//Current Weather display
var displayCurrentWeather = function(weatherArray) {
  var currentDate = document.createElement("p");
  const day = moment().format('dddd');
  const date = moment().format('MMMM Do YYYY');
  currentDate.textContent = day + ", " + date;
  currentDate.className = ("current-list-item");
  currentWeatherDisplay.appendChild(currentDate);

  var currentTemp = document.createElement("p");
  currentTemp.innerHTML = "Temperature: " + weatherArray[0] + "&#8457";
  currentTemp.className = ("current-list-item");
  currentWeatherDisplay.appendChild(currentTemp);

  var currentHumidity = document.createElement("p");
  currentHumidity.textContent = "Humidity: " + weatherArray[1] + "%";
  currentHumidity.className = ("current-list-item");
  currentWeatherDisplay.appendChild(currentHumidity);

  var currentUVI = document.createElement("p");
  currentUVI.innerHTML = "UV Index: <span>" + weatherArray[2] + "</span>";
  currentUVI.className = ("current-list-item");
  // Color code UVI for low, mod, high, very high
  if (weatherArray[2] < 3.00) {
    currentUVI.classList.add("uv-low");
  } else if (weatherArray[2] >= 3.00 && weatherArray[2] < 6.00) {
    currentUVI.classList.add("uv-moderate");
  } else if (weatherArray[2] >= 6.00 && weatherArray[2] < 8.00) {
    currentUVI.classList.add("uv-high");
  } else {
    currentWeather[2].classList[2].add("uv-very-high");
  }
  currentWeatherDisplay.appendChild(currentUVI);

  var currentWindSpeed = document.createElement("p");
  currentWindSpeed.textContent = "Wind speed: " + weatherArray[3] + "mph";
  currentWindSpeed.className = ("current-list-item");
  currentWeatherDisplay.appendChild(currentWindSpeed);

  currentWeatherDisplay.classList.add("current-box");

  var icon = weatherArray[4];
  var iconImg = document.createElement("img");
  iconImg.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  iconImg.className = ("current-icon");
  iconContainerEl.appendChild(iconImg);
};

// Forecast display
var displayForecast = function(forecastArray) {
  // Loop through array for each day
  for (var i = 1; i < 6; i++) {
    var forecastBoxEl = document.createElement("div");
    forecastBoxEl.className = "forecast-display-div";

    var futureDateDisplay = document.createElement("p");
    var timeMilleseconds = forecastArray[i].dt * 1000;
    var dateObject = new Date(timeMilleseconds);
    var formattedDate = dateObject.toLocaleString("en-US", {month: "long"}) + " " + dateObject.toLocaleString("en-US", {day: "numeric"}) + ", " + dateObject.toLocaleString("en-US", {year: "numeric"});
    futureDateDisplay.textContent = formattedDate;
    forecastBoxEl.appendChild(futureDateDisplay);

    
    var icon = forecastArray[i].weather[0].icon;
    var iconImg = document.createElement("img");
    iconImg.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    forecastBoxEl.appendChild(iconImg);

    var forecastTempEl = document.createElement("p");
    forecastTempEl.innerHTML = "Temperature: " + forecastArray[i].temp.day + "&#8457";
    forecastTempEl.className = "forecast-list-item";
    forecastBoxEl.appendChild(forecastTempEl);

    var forecastHumidityEl = document.createElement("p");
    forecastHumidityEl.innerHTML = "Humidity: " + forecastArray[i].humidity + "%";
    forecastHumidityEl.className = "forecast-list-item";
    forecastBoxEl.appendChild(forecastHumidityEl);

    var forecastWindSpeedEl = document.createElement("p");
    forecastWindSpeedEl.innerHTML = "Wind Speed: " + forecastArray[i].wind_speed + "mph";
    forecastWindSpeedEl.className = "forecast-list-item";
    forecastBoxEl.appendChild(forecastWindSpeedEl);

    var forecastUVIEl = document.createElement("p");
    forecastUVIEl.innerHTML = "UV Index: " + forecastArray[i].uvi;
    forecastUVIEl.className = "forecast-list-item";
    if (forecastArray[i].uvi < 3.00) {
      forecastUVIEl.classList.add("uv-low");
    } else if (forecastArray[i].uvi >= 3.00 && forecastArray[i].uvi < 6.00) {
      forecastUVIEl.classList.add("uv-moderate");
    } else if (forecastArray[i].uvi >= 6.00 && forecastArray[i].uvi < 8.00) {
      forecastUVIEl.classList.add("uv-high");
    } else {
      forecastUVIEl.classList.add("uv-very-high");
    }
    forecastBoxEl.appendChild(forecastUVIEl);

    forecastDisplayEl.appendChild(forecastBoxEl);
  }
}

// Search by Lat and Lon coordinates from city search
var weatherByCoordinates = function(latLon) {
  var apiUrl2 = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + latLon + "&units=imperial&exclude=hourly,minutely&appid=b8646725b8d223e6d4478a73d1089c53");
  
  fetch(apiUrl2).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
      var currentWeather = [
        data.current.temp,
        data.current.humidity,
        data.current.uvi,
        data.current.wind_speed,
        data.current.weather[0].icon]
        console.log(currentWeather);
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

//Save cities searched in local storage
var saveCity = function(cityInput) {
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

// Search Open Weather by city to get Lat and Lon coordinates
var weatherByCity = function(city) {
  chosenCityEl.textContent = city;
  var apiUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b8646725b8d223e6d4478a73d1089c53");
  
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
      var cityInput = data.name;
      console.log(city);
      var latitude = data.coord.lat;
      var latEdit = latitude.toFixed(2);
      var longitude = data.coord.lon;
      var lonEdit = longitude.toFixed(2);
      var latLon = (latEdit + "&lon=" + lonEdit);
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
  var city = cityInputEl.value.trim();
  
  weatherByCity(city);
  cityInputEl.value = ''; 
}

// List past city searches on page initialization
var listCities = function() {
  const storageCities = localStorage.getItem("savedCities");const listedCities = JSON.parse(storageCities);

  if (listedCities) {
  for (var i = 0; i < listedCities.length; i++) {
    var cityListEl = document.createElement("button");
    cityListEl.className = "past-city-btn";
    cityListEl.textContent = listedCities[i].city;
    pastCityListEl.appendChild(cityListEl);
  }
}
};
listCities();

var pastCityBtnHandler = function(e) {
  var city = e.target.textContent;
  weatherByCity(city);
};

// Clear past city search history
var clearHistory = function() {
  localStorage.clear();
  while (pastCityListEl.hasChildNodes()) {
    pastCityListEl.removeChild(pastCityListEl.firstChild);
  }
};

// Event Handlers
chooseCityEl.addEventListener("submit", cityBtnHandler);
pastCityListEl.addEventListener("click", pastCityBtnHandler);
clearCityHistoryEl.addEventListener("click", clearHistory);
