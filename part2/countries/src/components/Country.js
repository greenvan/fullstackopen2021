import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherIcons = ({ weatherList }) =>
    weatherList.map((weatherItem) => {
        const iconSrc = "http://openweathermap.org/img/wn/" + weatherItem.icon + "@2x.png"
        return <p key={weatherItem.icon}>{weatherItem.main} <br /><img alt="Weather icon" src={iconSrc} /></p>
    })

const Weather = ({ country }) => {

    const [weather, setWeather] = useState('');

    const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.alpha3Code}&units=metric&appid=${api_key}`

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setWeather(response.data)

            })
    }, [url]) //https://betterprogramming.pub/stop-lying-to-react-about-missing-dependencies-10612e9aeeda

    if (weather===''){
        return <p>No weather info</p>;
    }
    if (weather!=='')
    
    return <>
        <h3>Weather in {country.capital}</h3>
        <WeatherIcons weatherList={weather.weather}/>
        <p>Temperature: {weather.main.temp} &deg;C</p>
        <p>min:{weather.main.temp_min} &deg;C  max: {weather.main.temp_max} &deg;C </p> 
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} km/h</p>
    </>

}

const LanguageList = ({ languages }) =>
    languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)

const Country = ({ country }) =>
    <>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Spoken languages:</h3>
        <ul>
            <LanguageList languages={country.languages} />
        </ul>
        <img src={country.flag} alt="Flag" width="300" />
        <Weather country={country} />
    </>

export default Country