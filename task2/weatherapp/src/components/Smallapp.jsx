import React, { useEffect, useRef, useState } from 'react'
import './Smallapp.css'

import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

import clear_day_icon from '../assets/animate/clear-day.gif'
import clear_night_icon from '../assets/animate/clear-night.gif'
import cloudy_day_icon from '../assets/animate/cloudy-day.gif'
import cloudy_night_icon from '../assets/animate/cloudy-night.gif'
import cloudy_icon from '../assets/animate/cloudy.gif'
import drizzle_day_icon from '../assets/animate/drizzle-day.gif'
import drizzle_night_icon from '../assets/animate/rainy.gif'
import rainy_icon from '../assets/animate/rainy.gif'
import stormy_day_icon from '../assets/animate/stormy-day.gif'
import stormy_night_icon from '../assets/animate/stormy-night.gif'
import snowy_icon from '../assets/animate/snowy.gif'
import misty_day_icon from '../assets/animate/foggy.gif'
import misty_night_icon from '../assets/animate/foggy.gif'


const Smallapp = () =>{

    const inputRef = useRef()

    useEffect(()=>{
        var initSearch = localStorage.getItem("savedCity");
        if(initSearch !== null){
            search(JSON.parse(initSearch))
        }
    },[])

    const [weatherData, setWeatherData] = useState(false);

    const icon_Checker = {
        "01d": clear_day_icon,
        "01n": clear_night_icon,
        "02d": cloudy_day_icon,
        "02n": cloudy_night_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "04d": cloudy_icon,
        "04n": cloudy_icon,
        "09d": drizzle_day_icon,
        "09n": drizzle_night_icon,
        "10d": rainy_icon,
        "10n": rainy_icon,
        "11d": stormy_day_icon,
        "11n": stormy_night_icon,
        "13d": snowy_icon,
        "13n": snowy_icon,
        "50d": misty_day_icon,
        "50n": misty_night_icon

    }

    const search = async(city) =>{
        if(city === ""){
            alert("Enter city name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_KEY}&units=metric`;
            const response = await fetch(url);
            const data = await response.json();
            const icon = icon_Checker[data.weather[0].icon] || clear_day_icon
            console.log(data);
            setWeatherData({
                location: data.name,
                icon: icon,
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: Math.floor(data.main.temp)
            });
            localStorage.setItem("savedCity", JSON.stringify(data.name))
        }
        catch(error){
            setWeatherData(false);
            alert("Invalid entry! Try again?");
        }
    }



    return(
        <div className="vertMonitor">
            <div className="search-bar">
                <input ref={inputRef} type="text" name="search" placeholder="Search" />
                <img src={search_icon} alt="search" className='search-icon' onClick={()=>search(inputRef.current.value)}/>
            </div>
            {weatherData?<>
                <div className='weather-display'>
        <img src={weatherData.icon} alt="weather-icon" className="weather-icon"/>
        <p className="temp-read">{weatherData.temperature}°C</p>
        <p className="location-city">{weatherData.location}</p>
        </div>
        <div className='preview-data'>
            <div className="col">
                <img src={humidity_icon} alt="humidity-icon" className="humidity-icon" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">   
                <img src={wind_icon} alt="wind-icon" className="wind-icon"/>
                <div>
                    <p>{weatherData.wind} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        <p className="providedBy">Icons by  <a href="https://www.flaticon.com/authors/freepik">FreePik!</a></p>
        </>:<></>}
        </div>  
    )
}

export default Smallapp; 