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
    "X-RapidAPI-Key": "83cadd429amsha663c55328f5108p1a3945jsn29a934929275",
    "X-RapidAPI-Host": "muslimsalat.p.rapidapi.com",
  },
};

// btnEl.addEventListener("click", function () {
//   fetch("https://muslimsalat.p.rapidapi.com/minnesota.json")
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response);
//       navigator.geolocation.getCurrentPosition(
//         function (position) {
//           display(position);
//         },
//         function () {
//           console.log("could not get position");
//         }
//       );
//     })
//     .catch((err) => console.error(err));
// });

// window.addEventListener("load", function () {
//   api();
//   // input();
// });

const api = function () {
  const userInput = inputEL.value;

  fetch(`https://muslimsalat.p.rapidapi.com/${userInput}.json`, options)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      console.log(data);

      openTimePrayer(userInput, data);
      // getPrayerTime(data, userInput);
    })
    .catch((err) => console.error(err));
};

btnEl.addEventListener("click", api);

// const getPrayerTime = function (data, userInput) {
//   const { fajr, shurooq, dhuhr, asr, maghrib, isha } = data.items[0];
//   console.log(fajr, shurooq, dhuhr, asr, maghrib, isha);
// };

const openTimePrayer = function (userInput, data) {
  const title = data.title.slice(0, data.title.indexOf(","));
  const { country, city } = data;

  if (data.title === null) {
    console.log(data.status_error);
  }

  /**
   * TODO: Make this condition a lot more simpler
   */
  if (
    userInput === title.toLowerCase() ||
    userInput === title ||
    userInput === city.toLowerCase() ||
    userInput === city ||
    userInput === country.toLowerCase() ||
    userInput === country
  ) {
    prayerTimeSection.classList.add("show");
    currentCity.innerHTML = title;
    showPrayerTime(data);
  }

  inputEL.value = "";
  // if (userInput === "") {
  //   prayerTimeSection.classList.remove("show");
  // } else {
  //   prayerTimeSection.classList.add("show");
  // }
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

const getCurrentTime = function () {
  const date = new Date();
  const locale = navigator.language;
  const currentDate = date.toLocaleTimeString(`${locale}`);

  currentTimeEL.innerHTML = currentDate;

  setTimeout(() => {
    getCurrentTime();
  }, 1000);
};

getCurrentTime();

// const display = function (position) {
//   const latitude = position.coords.latitude;
//   const longitude = position.coords.longitude;
//   show.innerHTML = `latitude ${latitude}`;
// };
// const input = function (data) {
//   btnEl.addEventListener("click", function (e) {
//     e.preventDefault;

//     const userInput = inputEL.value;
//     currentuserInputEL.innerHTML = userInput;
//     api(userInput);
//     console.log(data);
//   });
// };

// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     // display(position);
//     input(data, position);
//   },
//   function () {
//     console.log("could not get position");
//   }
// );
