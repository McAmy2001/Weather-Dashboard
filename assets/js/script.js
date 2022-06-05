const cityBtnEl = document.getElementById("cityBtn");

var weatherByCoordinates = function(latLon) {
  console.log("made it");
  var apiUrl2 = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + latLon + "&units=imperial&exclude=hourly,minutely&appid=b8646725b8d223e6d4478a73d1089c53");
  
  fetch(apiUrl2).then(function(response) {
    console.log(response);
    
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
    };
  });
};

//      fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latEdit + "&lon=" + lonEdit + "&units=imperial&exclude=hourly,minutely&appid=b8646725b8d223e6d4478a73d1089c53");
//      console.log(response);
//      if (response.ok) {
//        console.log(response);
//        response.json().then(function(data) {
//        console.log(data);
    
    //
    //}
    //else {
    //  console.log("response not ok");
    //}
  //}.then(function(data) {
  
  //}).then(function(response) {
  //  if (response.ok) {
  //    return response.json();
  //  }
  //  else {
  //    console.log("response 2 not ok");
  //  }
  //}).then(function() {
  //  var finalData = data;
  //  console.log(finalData);
  //}).catch(function(error) {
  //  console.log("Error");
  //});
//};//
  
//cityBtnEl.addEventListener("click", getWeather(city));
weatherByCity("Oakdale");