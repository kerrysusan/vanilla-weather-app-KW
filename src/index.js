function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let dateTimeElement = document.querySelector("#current-date-time");
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  let days = ["Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2"><div class="weather-forecast-day">${day}</div>
<img src="https://openweathermap.org/img/wn/10d@2x.png" alt="icon showing current weather" width="38"/>
<div class="weather-forecast-temperatures">
  <span class="weather-forecast-temp-max">
    18°
  </span>
  <span class="weather-forecast-temp-min">
    12°
  </span>
</div>
</div>`;
  });
  forecastHTML = forecastHTML + `<\div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dateTimeElement = document.querySelector("#current-date-time");
  let iconElement = document.querySelector("#icon");
  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].desrcription);
  console.log(response.data.coord);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (27 * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function searchWeather(city) {
  let apiKey = "c7656c96607e5bf046bfb0c99196fe2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchWeather(cityInputElement.value);
  console.log(cityInputElement.value);
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

displayForecast();
