import cloudy from './animated/cloudy.svg';
import cloudyDay1 from './animated/cloudy-day-1.svg';
import cloudyDay2 from './animated/cloudy-day-2.svg';
import cloudyDay3 from './animated/cloudy-day-3.svg';
import cloudyNight1 from './animated/cloudy-night-1.svg';
import cloudyNight2 from './animated/cloudy-night-2.svg';
import cloudyNight3 from './animated/cloudy-night-3.svg';
import day from './animated/day.svg';
import night from './animated/night.svg';
import rainy1 from './animated/rainy-1.svg';
import rainy2 from './animated/rainy-2.svg';
import rainy3 from './animated/rainy-3.svg';
import rainy4 from './animated/rainy-4.svg';
import rainy5 from './animated/rainy-5.svg';
import rainy6 from './animated/rainy-6.svg';
import rainy7 from './animated/rainy-7.svg';
import snowy4 from './animated/snowy-4.svg';
import snowy5 from './animated/snowy-5.svg';
import snowy6 from './animated/snowy-6.svg';
import thunder from './animated/thunder.svg';


/**
 * Selects the name for an image
 * @param {string} name the icon name given to you by OpenWeatherMap
 * @param {string} code the icon code given to you by OpenWeatherMap
 * @returns {string} returns the string for the image
 */
const AnimateSelector = (name, code) => {
    let image = day;
    switch (name) {
        case '01d':
          return day;
        case '01n':
          return night;
        case '02d':
          return cloudyDay1;
        case '02n':
          return cloudyNight1;
        case '03d':
          return cloudyDay2;
        case '03n':
          return cloudyNight2;
        case '04d':
          if (code===803)
            return cloudyDay3;
          else
            return cloudy;
        case '04n':
          if (code===804)
            return cloudyNight3;
          else
            return cloudy;
        case '09d':
          if (code===520)
            return rainy4;
          else if (code===522 || code===531)
            return rainy6;
          else
            return rainy5;
        case '10d':
          if (code<500)
            return rainy7;
          else if(code===500 || code===501)
            return rainy1;
          else if (code===503 || code===504)
            return rainy3;
          else
            return rainy2;
        case '10n':
          if (code<500)
            return rainy7;
          else if(code===500 || code===501)
            return rainy1;
          else if (code===503 || code===504)
            return rainy3;
          else
            return rainy2;
        case '11d':
          return thunder;
        case '11n':
          return thunder;
        case '13d':
          if (code===600 || code===615 || code===620)
            return snowy4;
          else if(code===602 || code===622)
            return snowy5;
          else
            return snowy6;
        case '13n':
          if (code===600 || code===615 || code===620)
            return snowy4;
          else if(code===602 || code===622)
            return snowy5;
          else
            return snowy6;
        case '50d':
          return cloudy;
        case '50n':
          return cloudy;
        default:
          image = day;
    }
    return image;
};

export default AnimateSelector;
