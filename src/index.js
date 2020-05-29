import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './styles/reset.css';
import './styles/index.css';

function SearchForm(props) {
  const { city, handleSubmit, handleValueChange } = props;
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="location">
        City:
        <input
          className="input"
          id="location"
          name="location"
          type="text"
          value={city}
          onChange={handleValueChange}
          required
        />
      </label>
      <input className="submit" type="submit" value="Search" />
    </form>
  );
}
SearchForm.propTypes = {
  city: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired,
};

function WeatherApp() {
  const [city, setCity] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleValueChange(event) {
    const { target } = event;
    setCity(target.value);
  }

  return (
    <div className="weather-app">
      <SearchForm
        city={city}
        handleSubmit={handleSubmit}
        handleValueChange={handleValueChange}
      />
    </div>
  );
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'));
