/* ----------------------------- Curent weather fetch api call---------------------------- */

async function apiCallCurrentWeather(city) {
  try {
    const api_key = "f07a46ea8bb698753db05db0b391c793";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
/* ----------------------------- five day weather fetch api call---------------------------- */

async function apiWeatherForcast(city) {
  try {
    const api_key = "f07a46ea8bb698753db05db0b391c793";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
/* ----------------------------- Event ---------------------------- */

let buttonInp = document.getElementById("search");
buttonInp.addEventListener("click", async () => {
  let textInp = document.getElementById("text_input");
  let cityVal = textInp.value;

  let currentData = await apiCallCurrentWeather(cityVal);
  let error = document.querySelector(".error");
  let main = document.querySelector(".main");
  let extra = document.querySelector(".days");
  if (currentData.cod == 404) {
    error.style.display = "flex";
    main.style.display = "none";
    extra.style.display = "none";
  } else if (currentData.cod == 400) {
    error.style.display = "flex";
    main.style.display = "none";
    extra.style.display = "none";
  } else {
    main.style.display = "flex";
    extra.style.display = "flex";
    error.style.display = "none";
  }
  /* ----------------------------- current weather data---------------------------- */

  if (currentData) {
    console.log(currentData);
    const bodyimg = document.getElementById("body");
    // if (currentData.weather[0].main == "Clouds") {
    //   bodyimg.style.backgroundImage = "url(./image/bacwk.jpg)";
    // }

    const currentimg = document.getElementById("image");
    if (currentData.weather[0].main == "Clouds") {
      currentimg.src = "./image/cloud.png";
    } else if (currentData.weather[0].main == "Snow") {
      currentimg.src = "./image/snow.png";
    } else if (currentData.weather[0].main == "Rain") {
      currentimg.src = "./image/rain.png";
    } else if (currentData.weather[0].main == "Mist") {
      currentimg.src = "./image/mist.png";
    } else if (currentData.weather[0].main == "Clear") {
      currentimg.src = "./image/clear.png";
    } else if (currentData.weather[0].main == "Haze") {
      currentimg.src = "./image/haze.png";
    }
    const cel = document.getElementById("cel");
    cel.innerHTML = `${Math.round(currentData.main.temp - 273.15)}`;
    const far = document.getElementById("far");
    far.innerHTML = ` ${currentData.main.temp}`;
    const hum = document.getElementById("hum");
    hum.innerHTML = `${currentData.main.humidity}%`;
    const wind = document.getElementById("wind");
    wind.innerHTML = `${currentData.wind.speed}`;
    const city = document.getElementById("city");
    city.innerHTML = `${currentData.name}`;
    const feel = document.getElementById("feel");
    feel.innerHTML = `${currentData.weather[0].description}`;
  }
  /* ----------------------------- 5 day forecast weather---------------------------- */

  const fiveDayForecast = await apiWeatherForcast(cityVal);
  const apidata = fiveDayForecast.list;
  const uniqueDate = [];
  const forcastData = [];
  console.log(forcastData);
  if (fiveDayForecast) {
    for (let i = 1; i < apidata.length; i++) {
      const data = apidata[i];
      const date = new Date(data.dt_txt).getDate();
      //   console.log(date);
      if (!uniqueDate.includes(date)) {
        uniqueDate.push(date);
        forcastData.push(data);
      }
    }
    const daysDiv = document.getElementsByClassName("days");
    daysDiv[0].innerHTML = "";
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (let i = 0; i < forcastData.length; i++) {
      const data = forcastData[i];
      const date = new Date(data.dt_txt).getDay();
      var dayName = days[date];
      let image_day;
      if (data.weather[0].main == "Rain") {
        image_day = "rain.png";
      } else if (data.weather[0].main == "Mist") {
        image_day = "mist.png";
      } else if (data.weather[0].main == "Clouds") {
        image_day = "cloud.png";
      } else if (data.weather[0].main == "Snow") {
        image_day = "snow.png";
      } else if (data.weather[0].main == "Haze") {
        image_day = "haze.png";
      } else if (data.weather[0].main == "Clear") {
        image_day = "clear.png";
      }
      dataget(dayName, image_day, Math.round(data.main.temp_max - 273.15));
    }
  }
});
function dataget(day_name, url, max) {
  let daysdiv = ` <div class="day">
  
        <p>${day_name}</p>
        <img src="./image/${url}" width="100px" alt="" />
        <p><span>${max}</span></p>
      </div>`;
  document.querySelector(".days").innerHTML =
    document.querySelector(".days").innerHTML + daysdiv;
}
