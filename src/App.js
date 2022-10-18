import './App.css';
import Search from './componets/search/Search';
import  CurrentWeather from'./componets/current-weather/CurrentWeather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';
import ForeCast from './componets/forecast/Forecast';
function App() {

  const [currentWeather, setcurrentWeather] = useState(null);
  const [forecast, setForeCast] = useState(null);


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    const forecastFetch = fetch(`${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setcurrentWeather({ city: searchData.label, ...weatherResponse });
        setForeCast({ city: searchData.label, ...forecastResponse });

      })
      .catch((err) => console.log(err));
  }

  //console.log(currentWeather);
  //console.log(forecast);
  return (
    <div className="container">
      <h1>Weather API App</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast &&<ForeCast data={forecast} />}
    </div>
  );
}

export default App;
