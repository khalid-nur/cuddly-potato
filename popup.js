const btnEl = document.querySelector(".btn");
const show = document.querySelector(".show");
const inputEL = document.querySelector(".search-input");
const currentuserInputEL = document.querySelector(".current-userInput");
const prayerTimeList = document.querySelector(".time-prayer-lists");
const prayerTimeSection = document.querySelector(".section-time-prayer ");
const currentTimeEL = document.querySelector(".time-box");

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
  console.log(data.title);
  console.log(data.city);

  if (data.title === null) {
    console.log(data.status_error);
  }
  // if (userInput === "") {
  //   prayerTimeSection.classList.remove("show");
  // } else {
  //   prayerTimeSection.classList.add("show");
  // }
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
