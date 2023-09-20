

import loader from "./assets/loader.svg"
import "./App.css"
import { useState, useEffect } from "react";
import browser from "./assets/browser.svg"

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {
 
  const [weatherData, setWeatherData] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(()=>{
    fetch(`http://api.airvisual.com/v2/nearest_city?lat={{LATITUDE}}&lon={{LONGITUDE}}&key=${APIKEY}`)
    .then(response => {
      console.log(response);
      // 400->499 : Erreurs client,
      // 500->599 : Erreurs serveur
      if(!response.ok) throw new Error(`Error ${response.status}, ${response.statusText}`)
      return response.json();
    })
    .then(responseData =>{
      setWeatherData({
        city: responseData.data.city,
        country: responseData.data.country,
        iconId: responseData.data.current.weather.ic,
        temperature: responseData.data.current.weather.tp,
      })
    })
    .catch(err => {
      console.log(err)
      console.dir(err)
      setErrorInfo(err.message)
    })
  }, [])



  return (

      <main>
        <div className={`loader-container ${(!weatherData && !errorInfo) && "active"}`}>
          <img src={loader} alt="loading icon"/>
        </div>

        {weatherData &&(
        <>
          <p className="city-name">{weatherData.city}</p>
          <p className="country-name">{weatherData.country}</p>
          <p className="temperature">{weatherData.temperature}°</p>
          <div className="info-icon-container">
          <img src={`/icons/${weatherData.iconId}.svg`} alt="weather icon" className="info-icon"/>
        </div>
        </>
        )}
        
        {(errorInfo && !weatherData) && (
          <>
          <p className="error-information">{errorInfo}</p>
          <img src={browser} alt="error icon" />
          </>
        )}
      </main>
  
  );
}

export default App;
