import { weatherData } from './utils/httpReqs.js'
import { getWeekDay } from './utils/customDate.js'
const inputEl = document.querySelector(".inp-data").querySelector("input")
const srcBtn = document.querySelector(".inp-data").querySelector("button")
const weatherDiv = document.querySelector("#weather");
const locaionIcon = document.querySelector("#location-icon");
const forecastContainer = document.querySelector("#forecast");





const searchHandler = async() => {
    const cityName = inputEl.value
    if(!cityName){
        showModal("Please enter city")
        return
    }
    weatherDiv.innerHTML = `<span id="loader"></span>`
    const currentData = await weatherData("current",cityName)
    const forcastData = await weatherData("forecast",cityName)
    showCurrntWeather(currentData)
    showForecastData(forcastData)

    
}
const showCurrntWeather = data =>{
    
    if(!data) return;
    
    if(data.cod === 200){
        
        const currentJsx = `
            <h1>${data.name}, ${data.sys.country}</h1>
            <div id="main" >
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon" />
                <span>${data.weather[0].main}</span>
                <p>${Math.round(data.main.temp)} °C</p>
            </div>
            <div id="info" >
                <p>Humidity: <span>${data.main.humidity} %</span></p>
                <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
            </div>
        `
        weatherDiv.innerHTML = currentJsx
    }else{
        showModal(data.message)
    }

}

const showForecastData = (data) => {
    forecastContainer.innerHTML = ""
    if(data.cod === '200'){
        data = data.list.filter(obj => obj.dt_txt.endsWith("12:00:00"))
        data.map(item => {
             const forecastJSX = `
             <div>
                 <img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="weather icon" />
                 <h3>${getWeekDay(item.dt)}</h3>
                 <p>${Math.round(item.main.temp)} °C</p>
                 <span>${item.weather[0].main}</span>
             </div>
             `;
             forecastContainer.innerHTML += forecastJSX
        })
    }else{
        showModal(data.message)
    }
    
}
const locationHandler = () => {
    weatherDiv.innerHTML = `<span id="loader"></span>`
    forecastContainer.innerHTML = ""
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(successCallback,errorCallback)
    } else {
        showModal("your browser dose not support !")
    }
}

const successCallback = async (position) => {
     
    const {latitude, longitude} = position.coords;
    const cuurentData = await weatherData("current",{lat:latitude,lon:longitude})
    const fiveDayForecastByCoor = await weatherData("forecast",{lat:latitude,lon:longitude})
    
    showCurrntWeather(cuurentData)
    showForecastData(fiveDayForecastByCoor)
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };


srcBtn.addEventListener("click",searchHandler)

locaionIcon.addEventListener("click",locationHandler)

document.addEventListener("DOMContentLoaded",async () =>{
    const defultData = await weatherData("current","tehran")
    const defaultForecastData = await weatherData("forecast", "tehran")
    showCurrntWeather(defultData)
    showForecastData(defaultForecastData)
})

