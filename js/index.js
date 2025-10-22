document
  .getElementById("getWeatherBtn")
  .addEventListener("click", fetchWeatherData);

async function fetchWeatherData() {
  const cityInput = document.getElementById("cityInput").value;
  const weatherResult = document.getElementById("weatherResult");
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "";
  weatherResult.style.display = "none";

  if (!cityInput) {
    errorMessage.textContent = "Please enter a city name.";
    return;
  }

  try {
    // First fetch
    const geoApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1&language=en&format=json`;
    const geoResponse = await fetch(geoApiUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      errorMessage.textContent = "City not found. Please try again.";
      return;
    }

    const { latitude, longitude } = geoData.results[0];

    // Second fetch
    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&temperature_unit=fahrenheit&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    const weatherResponse = await fetch(weatherApiUrl);
    const weatherData = await weatherResponse.json();

    // Display current weather
    document.getElementById(
      "currentTemp"
    ).textContent = `Temperature: ${weatherData.current_weather.temperature}°F`;
    document.getElementById(
      "currentCondition"
    ).textContent = `Condition Code: ${weatherData.current_weather.weathercode}`; // You can map weather codes to descriptions

    // Display daily forecast
    const dailyForecastList = document.getElementById("dailyForecast");
    dailyForecastList.innerHTML = "";
    for (let i = 0; i < weatherData.daily.time.length; i++) {
      const date = new Date(weatherData.daily.time[i]);
      const maxTemp = weatherData.daily.temperature_2m_max[i];
      const minTemp = weatherData.daily.temperature_2m_min[i];
      const weatherCode = weatherData.daily.weathercode[i];

      const listItem = document.createElement("li");
      listItem.textContent = `${date.toDateString()}: Max ${maxTemp}°F, Min ${minTemp}°F (Code: ${weatherCode})`;
      dailyForecastList.appendChild(listItem);
    }

    weatherResult.style.display = "block";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    errorMessage.textContent =
      "An error occurred while fetching weather data. Please try again later.";
  }
}
