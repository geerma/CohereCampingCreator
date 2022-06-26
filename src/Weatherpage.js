import "./App.css";
import React, { useState } from "react";

const Weatherpage = () => {
  const [cityName, setCityName] = useState("");
  const [tempData, setTempData] = useState(null);

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
      alert("Please enter a city name");
    }
  };

  return (
    <div className="App">
      <div className="App-container">
        <div>
          <h1>Cohere Camping Creator</h1>
          <h1>-Weather Page-</h1>
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
              {tempData.main !== undefined ? (
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
        </div>
      </div>
    </div>
  );
};

export default Weatherpage;
