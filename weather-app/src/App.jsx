import React, { useEffect, useState } from 'react';
import Temperature from './Components/Temperature';
import Highlights from './Components/Highlights';

const App = () => {
  const [city, setCity] = useState('New Delhi');
  const [weatherData, setWeatherData] = useState(null);

  const apiURL = `https://api.weatherapi.com/v1/current.json?key=b95dd2e334ef406684662900242706&q=${city}&aqi=no`;

  useEffect(() => {
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiURL, city]);

  return (
    <div className="bg-[#1f213a] min-h-screen flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="mt-8 w-full sm:w-3/5 lg:w-1/2 xl:w-2/5">
        {weatherData && (
          <Temperature
            setCity={setCity}
            stats={{
              temp: weatherData.current.temp_c,
              condition: weatherData.current.condition.text,
              isDay: weatherData.current.is_day,
              location: weatherData.location.name,
              time: weatherData.location.localtime,
            }}
          />
        )}
      </div>

      <div className="mt-8 w-full sm:w-3/5 lg:w-1/2 xl:w-2/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <h2 className="text-slate-200 text-xl sm:text-2xl col-span-2 ml-[30%] text-transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out">Today's Highlights</h2>
        {weatherData && (
          <>
            <Highlights
              stats={{
                title: 'Wind Status',
                value: weatherData.current.wind_mph,
                unit: 'mph',
                direction: weatherData.current.wind_dir,
              }}
            />
            <Highlights
              stats={{
                title: 'Humidity',
                value: weatherData.current.humidity,
                unit: '%',
              }}
            />
            <Highlights
              stats={{
                title: 'Visibility',
                value: weatherData.current.vis_miles,
                unit: 'miles',
              }}
            />
            <Highlights
              stats={{
                title: 'Air Pressure',
                value: weatherData.current.pressure_mb,
                unit: 'mb',
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
