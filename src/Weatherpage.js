import "./App.css";
import React, { useState } from "react";
import heatindexchart from "./images/heatindexchart.jpg";
import Navbar from "./Navbar";

const Weatherpage = () => {
  const [cityName, setCityName] = useState(""); // City name, to be passed into urlCity
  const [tempData, setTempData] = useState(null); // Temperature data which will be fetched from the API

  // URL to access API
  const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=imperial`;

  // Retrieve temperature data from OpenWeatherAPI
  const retrieveTempData = () => {
    if (cityName.length !== 0) {
      console.log(urlCity);
      fetch(urlCity)
        .then((res) => res.json())
        .then((data) => setTempData(data))
        .catch((err) => alert(err));
      console.log(tempData); // cityName is case-sensitive for console.log data to appear
    } else {
      alert("Please enter a city name"); // Alerts user if input for cityName is empty
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="App-container">
        <div>
          <h1>Cohere Camping Creator</h1>
          <h2>-Weather Page-</h2>
          <div className="weather-form-container">
            <label>Input a City Name</label>
            <input
              value={cityName}
              placeholder="City Name"
              onChange={(e) => setCityName(e.target.value)}
            />
            <button onClick={retrieveTempData}>
              Retrieve Temperature Data
            </button>
          </div>
          {!tempData ? (
            <div>
              <p>Click on the button above to retrieve weather information</p>
            </div>
          ) : (
            <div>
              {tempData.main !== undefined || tempData !== null ? (
                <div>
                  <p>Humidity: {tempData.main.humidity}</p>
                  <p>Temperature (Current): {tempData.main.temp}</p>
                  <p>
                    Max Temp: {tempData.main.temp_max} | Min Temp:{" "}
                    {tempData.main.temp_min}{" "}
                  </p>
                  <p>
                    Description: {tempData.weather[0].main},{" "}
                    {tempData.weather[0].description}
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
          <div className="heat-index-container">
            <h2>Heat Index</h2>
            <p>
              Heat Index is the perceived or apparent temperature that a human
              feels when combining the air temperature with relative humidity.
            </p>
            <p>
              For example, if the air temperature is 100F and the relative
              humdity is 50%, the heat index / perceived temperature is 124F!
            </p>
            <p>
              As the relative humdity increases, the hotter the perceived
              temeprature is.
            </p>
            <p>
              For camping / travelling, it is important to be aware, since heat
              strokes can be severely dangerous.
            </p>
            <img src={heatindexchart} alt="heat index chart" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weatherpage;
