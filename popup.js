import API_KEY from "./apikey.js";

const btnEl = document.querySelector(".btn");
const show = document.querySelector(".show");
const inputEL = document.querySelector(".search-input");

const currentuserInputEL = document.querySelector(".current-userInput");
const prayerTimeSection = document.querySelector(".section-time-prayer ");
const currentTimeEL = document.querySelector(".time-box");
const currentCity = document.querySelector(".current-city");

const fajrEL = document.querySelector(".fajr");
const sunriseEL = document.querySelector(".sunrise");
const dhuhuEL = document.querySelector(".dhuhu");
const asrEL = document.querySelector(".asr");
const maghribEL = document.querySelector(".maghrib");
const ishaEL = document.querySelector(".isha");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${API_KEY}`,
    "X-RapidAPI-Host": "muslimsalat.p.rapidapi.com",
  },
};

const options2 = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${API_KEY}`,
    "X-RapidAPI-Host": "geocodeapi.p.rapidapi.com",
  },
};

const api = function (currentLocation) {
  const userInput = inputEL.value.trim();
  const userCurrentLocation = currentLocation;

  fetch(
    `https://muslimsalat.p.rapidapi.com/${
      userCurrentLocation ?? userInput
    }.json`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      console.log(data);

      openTimePrayer(userInput, data);
      error(data);
      // getPrayerTime(data, userInput);
    })
    .catch((err) => {
      console.error(err);
    });
};

btnEl.addEventListener("click", () => api());

inputEL.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    api();
  }
});

window.addEventListener("load", function () {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);

      fetch(
        `https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=${latitude}&longitude=${longitude}&range=0`,
        options2
      )
        .then((response) => response.json())
        .then((response) => {
          const currentLocation = response[0].City.replace("Saint", "st");
          console.log(response);
          // console.log(currentLocation.replace("Saint", "st"));
          api(currentLocation);
        })
        .catch((err) => console.error(err));
    },
    function (position) {
      warningMessage();
      console.log("could not get position");
    }
  );
});

const openTimePrayer = function (userInput, data) {
  // const title = data.title.slice(0, data.title.indexOf(","));
  const title = data.title;
  const { country, city } = data;

  if (data.status_description === "Success.") {
    prayerTimeSection.classList.add("show");

    currentCity.innerHTML = title || country;
    showPrayerTime(data);
    // console.log(data.status_description != "Failed.");
  }

  inputEL.value = "";
};

const showPrayerTime = function (data) {
  const { fajr, shurooq, dhuhr, asr, maghrib, isha } = data.items[0];
  console.log(fajr, shurooq, dhuhr, asr, maghrib, isha);
  fajrEL.innerHTML = fajr;
  sunriseEL.innerHTML = shurooq;
  dhuhuEL.innerHTML = dhuhr;
  asrEL.innerHTML = asr;
  maghribEL.innerHTML = maghrib;
  ishaEL.innerHTML = isha;
};

const error = function (data) {
  if (data.title === null) {
    prayerTimeSection.classList.remove("show");

    console.log(data.status_error);
  }
};

const warningMessage = function () {
  const alertEL = document.querySelector(".alert");
  const closeBtn = document.querySelector(".close-btn");
  alertEL.classList.remove("close");

  setTimeout(() => {
    alertEL.classList.add("close");
  }, 5000);

  const closeTime = closeBtn.addEventListener("click", () => {
    alertEL.classList.add("close");
  });
};

const getCurrentTime = function () {
  const date = new Date();
  const locale = navigator.language;
  const currentDate = date.toLocaleTimeString(`${locale}`);
  // console.log(currentDate);

  currentTimeEL.innerHTML = currentDate;

  setTimeout(() => {
    getCurrentTime();
  }, 1000);
};

getCurrentTime();
