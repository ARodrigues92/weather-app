// imported so the file can be added to .gitignore in order to prevent exposing
// the key

import key from './api-key';

const getCurrentWeather = async (location) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;

  try {
    const response = await fetch(url, {
      mode: 'cors',
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getCurrentWeather;
