function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function displayWeatherCondition(response) {
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    celsiusTemperature = response.data.main.temp;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(
      celsiusTemperature
    );
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    
    getProjected(response.data.name);
  }
  
  function searchCity(city) {
    let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }

  function formatDay(timestamp) {
    
    let date = new Date(timestamp * 1000);
    console.log(timestamp,date)
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];

  }
  
  function searchLocation(position) {
    let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  function displayFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature); 
  }

  function displayCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }

  let celsiusTemperature = null;


  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  

  


  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", displayFahrenheit);

  let celsuisLink = document.querySelector("#celsius");
  celsuisLink.addEventListener("click", displayCelsius);




function getProjected(city) {
  let apiKey = "fo870519041f3000e04aab3636t32527";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayProjected);
}



function displayProjected(response) {  
  
  console.log(response.data);
  let projectedElement = document.querySelector("#projected");
  
  
  let projectedHtml = '<div class = "row">';

  console.log('response.data.daily',response.data.daily)

  response.data.daily.forEach(function(day, index) {

   if (index < 5) { 
   projectedHtml = 
     projectedHtml +
     `
       <div class="col-2">
        <div class="weather-forecast-date">${formatDay(day.time)}
        </div>
        <div class="weather-forecast-icon">
            <img
             src=${day.condition.icon_url}
             alt=""
             width="42"
             />
        </div>
        <div class="weather-forecast-temp">
              <span class="wft-min">
                ${Math.round(day.temperature.minimum)}
              </span>
              <span class="wft-max">
                ${Math.round(day.temperature.maximum)}
              </span>
        </div>
      </div>
  
    `;
   }
  });
  
  projectedElement.innerHTML = projectedHtml;

}

searchCity("Lisbon");



