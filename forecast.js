let forecastData;

function displayMinTemp(data) {
  if (currentUnit === "Celsius") {
    return `${data.day.mintemp_c}° Celsius`;
  }
  return `${data.day.mintemp_f}° Fahrenheit`;
}

function displayMaxTemp(data) {
  if (currentUnit === "Celsius") {
    return `${data.day.maxtemp_c}° Celsius`;
  }
  return `${data.day.maxtemp_f}° Fahrenheit`;
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function displayNextDay(data) {
  const container = document.createElement("div");
  container.classList.add("next_day");

  const date = document.createElement("p");
  date.textContent = data.date;

  const condition = document.createElement("p");
  condition.textContent = data.day.condition.text;

  const img = document.createElement("img");
  img.src = data.day.condition.icon;
  img.classList.add("future_icon");

  const maxTemp = document.createElement("p");
  maxTemp.textContent = `Max Temp: ${displayMaxTemp(data)}`;

  const minTemp = document.createElement("p");
  minTemp.textContent = `Min Temp: ${displayMinTemp(data)}`;

  fahrenheitBtn.addEventListener("click", () => {
    maxTemp.textContent = `Max Temp: ${displayMaxTemp(data)}`;
    minTemp.textContent = `Min Temp: ${displayMinTemp(data)}`;
  });
  celsiusBtn.addEventListener("click", () => {
    maxTemp.textContent = `Max Temp: ${displayMaxTemp(data)}`;
    minTemp.textContent = `Min Temp: ${displayMinTemp(data)}`;
  });

  const humidity = document.createElement("p");
  humidity.textContent = `Average humidity : ${data.day.avghumidity}`;

  container.appendChild(date);
  container.appendChild(condition);
  container.appendChild(img);
  container.appendChild(maxTemp);
  container.appendChild(minTemp);
  container.appendChild(humidity);
  return container;
}

function displayForecast(data) {
  const mainContainer = document.querySelector(".forecast");
  clearElement(mainContainer);
  const forecast = data.forecast.forecastday;
  for (let i = 1; i < forecast.length; i++) {
    mainContainer.appendChild(displayNextDay(forecast[i]));
  }
}

async function getForecast(name = "laghouat") {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=fd6c3350dfb74824819173848232308&q=${name}&days=3`,
      { mode: "cors" },
    );
    forecastData = await response.json();
    displayForecast(forecastData);
  } catch (err) {
    alert("enter a valid city name !!");
  }
}

getForecast();
