import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import getCurrentWeather from './modules/fetch-data';
import './styles/reset.css';
import './styles/index.css';

function SearchForm(props) {
  const { location, handleSubmit, handleValueChange } = props;
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="location">
        City:
        <input
          className="input"
          id="location"
          name="location"
          type="text"
          value={location}
          onChange={handleValueChange}
          required
        />
      </label>
      <input className="submit" type="submit" value="Search" />
    </form>
  );
}
SearchForm.propTypes = {
  location: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired,
};

function WeatherReport(props) {
  const { weatherData, errorMsg } = props;
  const { location, sky, temperature, humidity, pressure } = weatherData;

  if (errorMsg) {
    return (
      <div className="error">
        <p>{errorMsg}</p>
      </div>
    );
  }

  // Prevent printing the card if no data has been provided yet
  if (Object.keys(weatherData).length === 0) {
    return null;
  }

  return (
    <div className="weather-card">
      <ul>
        <li>
          City:<span>{location}</span>
        </li>
        <li>
          Sky:<span>{sky}</span>
        </li>
        <li>
          Temperature:<span>{temperature} ºC</span>
        </li>
        <li>
          Humidity:<span>{humidity} %</span>
        </li>
        <li>
          Pressure:<span>{pressure} hPa</span>
        </li>
      </ul>
    </div>
  );
}
WeatherReport.propTypes = {
  weatherData: PropTypes.shape({
    location: PropTypes.string,
    sky: PropTypes.string,
    temperature: PropTypes.number,
    humidity: PropTypes.number,
    pressure: PropTypes.number,
  }).isRequired,
  errorMsg: PropTypes.string.isRequired,
};

function WeatherApp() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await getCurrentWeather(location);
    if (!response.ok) {
      if (response.status === 404) {
        setErrorMsg('The provided location could not be found');
      } else {
        setErrorMsg('Ups, something went wrong');
      }
    } else {
      const data = await response.json();
      setWeatherData({
        location: data.name,
        sky: data.weather[0].description,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
      });
    }
  }

  function handleValueChange(event) {
    const { target } = event;
    setLocation(target.value);
  }

  return (
    <div className="weather-app">
      <WeatherReport weatherData={weatherData} errorMsg={errorMsg} />
      <SearchForm
        location={location}
        handleSubmit={handleSubmit}
        handleValueChange={handleValueChange}
      />
    </div>
  );
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'));
