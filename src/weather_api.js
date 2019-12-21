// declaring initial variables
let latitude;
let longitude;
let weatherIntervalId;
let city = undefined;

// once graded convert into an environment variable and remove from GitHub
let apiKey = "AIzaSyB26JkKXhfeiFTxd4lbvihcnpBH9LG5SCE";

// set latitude and longitude and make initial getCity and getWeather functions.
function setCoordinates(position) {
  latitude = '' + position.coords.latitude;
  longitude = '' + position.coords.longitude;
  getCity();
  getWeather();
}

// displayTime creates a clock and updates it every second.
function displayTime() {
  class Clock
  {
    run() {
      this.timer = setInterval(this.update.bind(this), 1000);
    }

    update() {
      let clock = document.getElementById('clock');
      clock.innerHTML = (new Date()).toLocaleTimeString();
    }

  }

  (new Clock()).run();
}

// round numbers correctly.
function roundNumbers(temp, decimalPlace) {
  // use scientific notation to ensure that rounding works as expected.
  return Number(Math.round(temp+'e'+decimalPlace)+'e-'+decimalPlace);
}

// getCity find the current city and state using the latitude and longitude
// recieved from the event listener.
function getCity() {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let count = 1;
      let data = JSON.parse(this.responseText)
      // console.log(data);
      city = ` in ${data.results[0].address_components[2].long_name}, ${data.results[0].address_components[4].long_name}`;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

// getWeather openweathermap api call for local data.
async function getWeather() {
  let widget = document.getElementById('weather');
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&APPID=e678773f4207ae073e4238b073d11024`;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let count = 1;
      let data = JSON.parse(this.responseText)
      // console.log(data);
      // console.log(roundNumbers(data.main.temp, 0));
        widget.innerHTML = `${roundNumbers(data.main.temp, 0)} &#8457 ${city}`;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

// Event listener for api call
document.addEventListener('DOMContentLoaded', () => {
  let widget = document.getElementById('weather-widget');
  if (window.isSecureContext) {
    navigator.geolocation.getCurrentPosition(setCoordinates);
    cityIntervalID = setInterval(async () => {
      await getCity();
    }, 60000);
    weatherIntervalID = setInterval(async () => {
      await getWeather();
    }, 60000);
  }
  displayTime();
});
