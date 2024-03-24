document.getElementById("weather_check").addEventListener("click", function () {
  const country = document.getElementById("country");
  const weather_location = document.getElementById("weather_location");
  const weather_image = document.getElementById("weather_image");

  const city_input = document.getElementById("city_input").value; // city input for search the weather

  const weather_description = document.getElementById("weather_description");
  const weather_temperature = document.getElementById("weather_temperature");
  const weather_feels_like = document.getElementById("weather_feels_like");
  const max_temp = document.getElementById("max_temp");
  const min_temp = document.getElementById("min_temp");
  const atm_pressure = document.getElementById("atm_pressure");
  const weather_humidity = document.getElementById("weather_humidity");
  const wind_speed = document.getElementById("wind_speed");

  const city = city_input || "Kolkata";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=apikey`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const sky = data.weather[0].description;

      country.innerText = data.sys.country;
      weather_location.innerText = data.name;
      // weather_image.innerText =

      if (sky == "clear sky") {
        weather_image.innerHTML = '<i class="fa-solid fa-sun"></i>';
      } else if (sky == "few clouds" || sky == "haze") {
        weather_image.innerHTML = '<i class="fa-solid fa-cloud-sun"></i>';
      } else if (sky == "scattered clouds") {
        weather_image.innerHTML = '<i class="fa-solid fa-cloud"></i>';
      } else if (sky == "broken clouds" || sky == "smoke") {
        weather_image.innerHTML = '<i class="fa-solid fa-smog"></i>';
      } else if (sky == "shower rain") {
        weather_image.innerHTML = '<i class="fa-solid fa-cloud-meatball"></i>';
      } else if (sky == "rain") {
        weather_image.innerHTML = '<i class="fa-solid fa-cloud-sun-rain"></i>';
      } else if (sky == "thunderstorm") {
        weather_image.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
      } else if (sky == "snow") {
        weather_image.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
      } else if (sky == "mist") {
        weather_image.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
      } else {
        weather_image.innerHTML = '<i class="fa-solid fa-water"></i>';
      }

      weather_description.innerText = "Description : " + sky;
      weather_temperature.innerText =
        "Temperature : " + Number(data.main.temp - 273.15).toFixed(2) + "°C";
      weather_feels_like.innerText =
        "Feels Like : " +
        Number(data.main.feels_like - 273.15).toFixed(2) +
        "°C";
      max_temp.innerText =
        "Max Temperature : " +
        Number(data.main.temp_max - 273.15).toFixed(2) +
        "°C";
      min_temp.innerText =
        "Min Temperature : " +
        Number(data.main.temp_min - 273.15).toFixed(2) +
        "°C";
      atm_pressure.innerText = "Atmospheric Pressure : " + data.main.pressure;
      weather_humidity.innerText = "Humidity : " + data.main.humidity;
      wind_speed.innerText = "Wind Speed : " + data.wind.speed + "km/hr";
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
    });
});

// news api fetch
// const News_apiUrl =
//   "https://newsapi.org/v2/top-headlines?country=us&apiKey=apikey";

// fetch(News_apiUrl)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     // Do something with the data, like display it on your webpage
//     const currentNews = document.getElementById("current_News");
//     currentNews.innerText = data.articles[0].content;
//     // console.log(data.articles[0].content);
//   })
//   .catch((error) => {
//     // console.log('There was a problem with the fetch operation:', error);
//     const currentNews = document.getElementById("current_News");
//     (currentNews.innerText = "There was a problem with the fetch operation:"),
//       error;
//   });
