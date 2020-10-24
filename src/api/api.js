import AnimateSelector from '../constants/animateselector'
import DatesMap from '../constants/dates'

/**
 *
 * Base API params for requests.
 * @key {string} developer key to access API
 * @source {string} base API url
 */
const key = 'a236c5af7ae699c7f8d130a65d025660';
const source = 'https://api.openweathermap.org/data/2.5/onecall';
var cityName;

/**
 * Sync Weather data for selected location - City Name or Geo Coordinates.
 * @location {string} location search query - {city.name} or {lat.lon}
 * @returns {Promise<Object>}
 */
export default function syncWeather(location) {
  const holder = location.split(',');
  cityName = holder[0];
  const locationHolder= {
    lat: holder[1],
    lng: holder[2]
  };
  return getForecastData(locationHolder).then(mapForecastData);
}

/**
 * Make http requests (GET).
 * @url {string} API request address
 * @returns {Promise<Object>}
 */
function httpGet(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.send();

    xhr.onload = function() {
      if (this.status === 200) {
        resolve(JSON.parse(this.response));
      } else {
        const error = new Error(this.statusText);

        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };
  });
}

/**
 * Get weather's current and forecast (7 days) data by location.
 * @location {string} location search query - {city.name} or {lat.lon}
 * @returns {Promise<Object>}
 */
async function getForecastData(location) {
  const url = `${source}?lat=${encodeURIComponent(location.lat)}&lon=${encodeURIComponent(location.lng)}&appid=${key}&units=metric`;
  return await httpGet(url);
}

/**
 * Map weather' current and forecast data from response.
 * @Response {object} JSON response from API.
 *    => @data {object} response object from API
 * @returns {Promise<Object>}
 */
async function mapForecastData(data){
  const current = data.current;
  const forecast = data.daily;
  const hourly = data.hourly;
  if (cityName==="undefined")
    cityName=data.lat+", "+data.lon;
  return {
    location: cityName,
    current: {
      date: getLocalDate(current.dt), // Date format: Sunday, May 18th 2018
      temp_c: Math.round(current.temp), // current temperature C
      temp_f: Math.round((parseFloat(current.temp) * 9/5) + 32), // current temperature F
      condition: {
        text: current.weather[0].description,  // condition text
        icon: getConditionIcon(current.weather[0].id, current.weather[0].icon), //getConditionIcon(current.is_day, current.condition.code), // condition icon
      },
      history: mapHistoryData(forecast[0]),
    },
    forecast: mapForecastDays(forecast.slice(1)),
    hourly: mapHourlyData(hourly)
  };
} 

/**
 * Map forecast data by Days.
 * @forecastDays {array} forecast information for each day.
 * @returns {object}
 */
function mapForecastDays(forecastDays) {
  return forecastDays.map(forecastDay => {
    const date = new Date(forecastDay.dt * 1000);
    return {
      name: DatesMap.dayNames[date.getDay()], // day name
      minTemp: {
        temp_c: Math.round(forecastDay.temp.min), // average temperature C
        temp_f: Math.round((parseFloat(forecastDay.temp.min) * 9/5) + 32), // average temperature F
      },
      maxTemp: {
        temp_c: Math.round(forecastDay.temp.max), // average temperature C
        temp_f: Math.round((parseFloat(forecastDay.temp.max) * 9/5) + 32), // average temperature F
      },
      icon: getConditionIcon(forecastDay.weather[0].id, forecastDay.weather[0].icon), // condition icon
    }
  })
}

/**
 * Map forecast data by Hour.
 * @hourlyData {array} forecast information for every hour.
 * @returns {object}
 */
function mapHourlyData(hourlyData) {
  return hourlyData.map(hourData => {
    let dt = new Date(hourData.dt*1000);
    return {
      time: dt.getHours(),
      temp_c: Math.round(hourData.temp), // average temperature C
      temp_f: Math.round((parseFloat(hourData.temp) * 9/5) + 32), // average temperature F
      tooltp: DatesMap.monthNames[dt.getMonth()]+' '+dt.getDate()
    }
  })
}

/**
 * Find animated Icon from Icons folder.
 * @param {string} iconName the icon name given to you by OpenWeatherMap
 * @param {string} iconCode the icon code given to you by OpenWeatherMap
 * @returns {string}
 */
function getConditionIcon(iconCode, iconName) {
    return AnimateSelector(iconName, parseInt(iconCode));
}

/**
 * Map Day history data by hours.
 * @currentDay {object} forecast information about current day.
 * @returns {object}
 */
function mapHistoryData(currentDay) {
  return {
    morning:  {
        temp_c: Math.round(currentDay.temp.morn),
        temp_f: Math.round((parseFloat(currentDay.temp.morn) * 9/5) + 32),
      },
    day:  {
        temp_c: Math.round(currentDay.temp.day),
        temp_f: Math.round((parseFloat(currentDay.temp.day) * 9/5) + 32),
      },
    evening:  {
        temp_c: Math.round(currentDay.temp.eve),
        temp_f: Math.round((parseFloat(currentDay.temp.eve) * 9/5) + 32),
      },
    night:  {
        temp_c: Math.round(currentDay.temp.night),
        temp_f: Math.round((parseFloat(currentDay.temp.night) * 9/5) + 32),
      },
  }
}

/**
 * Get Date in 'Friday, May 18th 2018' format.
 * @localtime {string} param contains founded location local time (from getForecastData response)
 * @returns {string}
 */
function getLocalDate(localTime) {
  const localDate = new Date(localTime * 1000); // set 'YYYY/MM/DD' format for new Date() support in safari
  const weekday = DatesMap.dayNames[localDate.getDay()];
  const month = DatesMap.monthNames[localDate.getMonth()];
  const date = localDate.getDate();
  const datePrefix = getDayPrefix(date);

  return `${weekday}, ${month} ${date}${datePrefix}`;
}

/**
 * Get Prefix for month's date - 1st / 2nd / 7th ...
 * @day {number} month's date number
 * @returns {string}
 */
function getDayPrefix(date) {
  if(date>3 && date<21) return 'th';
  switch (date % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}