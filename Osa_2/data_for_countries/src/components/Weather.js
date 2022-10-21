import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city, apiKey }) => {
    const [weather, setWeather] = useState([])

    const hook = () => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            //console.log(response.data);
            setWeather(response.data);
        })
    }
  
    useEffect(hook)

    if (weather.length === 0) {
        return (
            <>
                Loading weather data...
            </>
        )
    }

    return (
        <>
            <h2>Weather in {city}</h2>
            <div>Temperature {weather.main.temp} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather"/>
            <div>Wind {weather.wind.speed} m/s</div>
        </>
    )
}

export default Weather