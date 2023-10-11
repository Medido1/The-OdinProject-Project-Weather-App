let currentData;
let currentUnit = "Celsius";

const celsiusBtn = document.querySelector("[data-celsius-btn]");
const fahrenheitBtn = document.querySelector("[data-Fahrenheit-btn]");
const form = document.querySelector("form");

function loading(show) {
  const loading = document.querySelector(".loading");
  loading.style.display = show ? "block" : "none";
  const humidity = document.querySelector(".humidity");
  humidity.style.display = show ? "none" : "block";
}

function displayBackground(currentCondition) {
  const main = document.querySelector(".main");

  const conditionBackgrounds = {
    'Overcast': "url(./images/overcast.jpg)",
    'Sunny': "url(./images/sunny.jpeg)",
    'Mist': "url(./images/mist.jpg)",
    'Partly cloudy': "url(./images/partly_cloudy.jpg)",
    'Clear': "url(./images/clear.jpg)",
    'Moderate rain': "url(./images/moderate_rain.jpg)",
    'Light rain': "url(./images/light_rain.jpg)",
  };

  if (conditionBackgrounds.hasOwnProperty(currentCondition)) {
    main.style.transition = "background-image 1s ease";
    main.style.backgroundImage = conditionBackgrounds[currentCondition];
  }
}

function displayTemperature(data) {
  const temp = document.querySelector(".temp");

  const tempInCelsius = data.current.temp_c;
  const tempInFahrenheit = data.current.temp_f;

  if (currentUnit === "Celsius") {
    temp.textContent = `${tempInCelsius}° Celsius`;
  } else {
    temp.textContent = `${tempInFahrenheit}° Fahrenheit`;
  }
}

function displayCurrentCondition(data) {
  const cityName = document.querySelector(".city_name");
  cityName.textContent = data.location.name;

  const countryName = document.querySelector(".country_name");
  countryName.textContent = data.location.country;

  const localTime = document.querySelector(".local_time");
  localTime.textContent = data.location.localtime.substring(11);

  const currentConditionText = document.querySelector(
    ".current_condition_text",
  );
  currentConditionText.textContent = data.current.condition.text;
  displayBackground(data.current.condition.text);

  const icon = document.querySelector(".icon");
  icon.src = data.current.condition.icon;
  displayTemperature(data);

  const humidity = document.querySelector(".humidity");
  humidity.textContent = `Humidity : ${data.current.humidity}`;
}

async function getData(cityName = "laghouat") {
  loading(true);
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=fd6c3350dfb74824819173848232308&q=${cityName}`,
      { mode: "cors" },
    );
    currentData = await response.json();
    displayCurrentCondition(currentData);
  } catch (err) {
    alert("enter a valid city name!!");
    return;
  }
  loading(false);
}

function changeToCelsius() {
  if (currentUnit === "Celsius") return;
  currentUnit = "Celsius";
  displayTemperature(currentData);
}

function changeToFahrenheit() {
  if (currentUnit === "Fahrenheit") return;
  currentUnit = "Fahrenheit";
  displayTemperature(currentData);
}

function getCityName(e) {
  e.preventDefault();
  const nameInput = document.getElementById("search_city");
  const name = nameInput.value;
  nameInput.value = null;
  getData(name);
  getForecast(name);
}

getData();
celsiusBtn.addEventListener("click", changeToCelsius);
fahrenheitBtn.addEventListener("click", changeToFahrenheit);
form.addEventListener("submit", getCityName);
