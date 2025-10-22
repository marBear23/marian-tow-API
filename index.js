//document.addEventListener("DOMContentLoaded", () => {
//  const button = document.getElementById("myButton");
//  const messageParagraph = document.getElementById("message");

//  button.addEventListener("click", () => {
//    messageParagraph.textContent = "Button was clicked! Hello from JavaScript!";
//    messageParagraph.style.color = "green";
//  });
//});
const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&temperature_unit=fahrenheit`;
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch weather data. Please try again later.");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching forecast:", error);
  });
