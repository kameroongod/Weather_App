import React, { useState } from "react";
import Header from "../src/Components/Header";
import Footer from "../src/Components/Footer";
import Weather from "../src/Components/Weather";
import Container from '@mui/material/Container';
import SearchBar from "../src/Components/SearchBar";
import CurrentCityWeather from "./Components/CurrentCityWeather";
import axios from "axios";
import Grid from '@mui/material/Unstable_Grid2';

//API key to query Weather API
const API_Key = "50dc0d8accdb0ed55dc2afa9d799d998";
//const API_Key = "d502c73cb4aa0b29a60156abc1882399";

function App() {

 // Variables to hold and update coordinates of city searched for API query
 const [cityCoords, updateCityData] = useState({lat:"", lon:"", country:"", name:"", state:""});
 const [currentWeather, setCurrentWeather] = useState({description:"", temperature:"", icon:""})
 const [forecasts, setForecasts] = useState([]);
 
  // Function to get weather in current location based on browser geolocation
  async function retrieveCurrentPosition () {
     navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        // With coordinates from browser, query the API to reverse geocode and obtain the city, state, and country
        const reverseCity = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_Key}`);
        const reverseCityData = reverseCity.data[0];
        // Update the cityCoords object with info from browser and reverse geocode API response 
          // if need to use value of state immediately after updating it,
          //Neeed to set use updater function that will use previous values
          updateCityData(prevValues => { 
           prevValues.lat=reverseCityData.lat;
           prevValues.lon=reverseCityData.lon;
           prevValues.name=reverseCityData.name;
           prevValues.country=reverseCityData.country;
           prevValues.state=reverseCityData.state;
            
           //Set the input values to the current city values 
           document.querySelector("[name=city]").value = cityCoords.name;
           document.querySelector("[name=state]").value = cityCoords.state;
           document.querySelector("[name=country]").value = cityCoords.country;
 
           return cityCoords; 
          });    

        // Call the function that retrieve the weather information for a specified city using updated cityCoords object
        await cityWeather();

      } catch (error) {
        console.log(error);
        alert(error);
      }
    })
  }

  // Function that will return the coordinates of the city searched to be used to get temperature and weather forecast for that city
  async function CityCoords (city_name, country_code="", state_code="") {
    try {
    // Get request to the Weather Geocoding API route to retrieve coordinates from city/state/country combination that user inputs
    const cities = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city_name},${state_code},${country_code}&appid=${API_Key}`);
    const city = cities.data[0];
    // Update city coords state
    updateCityData(prevValues => {
        prevValues.lat=city.lat;
        prevValues.lon=city.lon;
        prevValues.name=city.name;
        prevValues.country=city.country;
        prevValues.state= city.state;
        return cityCoords;
        });
    
    } catch (error) {
    console.log(error.response.data.message);
    alert(error.response.data.message);
  }
}

// Function that will retrieve weather of city based of coordinates
async function cityWeather() {
  try {
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityCoords.lat}&lon=${cityCoords.lon}&appid=${API_Key}&units=metric`)
    const weatherData = weather.data;
     // Update city coords state
     setCurrentWeather({
        description:weatherData.weather[0].description,
        temperature:weatherData.main.temp,
        icon:weatherData.weather[0].icon
        });

  } catch (error) {
    console.log(error.response.data.message);
    alert(error.response.data.message);
  }
}

// Function that will retrieve 5-day forecast by 3H interval for coordinates specified
async function GetForecast() {
  try {
    const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/?lat=${cityCoords.lat}&lon=${cityCoords.lon}&appid=${API_Key}&units=metric`);
    const forecastData = forecast.data;

    // Create list to contain the dates in the forecast
    let dateList = [];
    forecastData.list.map((data, index) => {
    const date =  new Date(Date.parse(data.dt_txt)).toDateString()
    dateList.push(date);
    });

    // Return unique dates of that list
    dateList = Array.from(new Set (dateList));
  
    // List to contain the forecasts for each date
    let forecastList = [];
    // For each date, will create an array of all the forecast per 3H for that day
    dateList.map((date, index) => {
      const dateData = forecastData.list.filter((forecast, index) => {
        return new Date(Date.parse(forecast.dt_txt)).toDateString() === date;
      });

      // Creates object to contain the date and the forecasts per 3-hour for that day
      const dateForecast = {[date]:dateData};

      //Update list of dates and their respective forecasts
      forecastList.push(dateForecast);
    });

    //Update our array of forecasts
    setForecasts(forecastList);

  } catch (error) {
    console.log(error);
    alert(error);
  }
}  

  return (
    <Grid container direction="column"> 
   <Grid item height="25vh">
    <Header />
    </Grid>
    <Grid item>
      <Container className="Container" sx={{height:"100%", display:"flex-column", alignContent:"center"}}>
         <SearchBar Coords={CityCoords} Weather={cityWeather} currentCity={retrieveCurrentPosition} forecast={GetForecast} values={cityCoords}/>
          <br/>

          <Container sx={{display:"flex", gap:"10px", justifyContent:"center"}}>
           {currentWeather.description && <CurrentCityWeather 
            city={cityCoords.name} 
            state={cityCoords.state} 
            country={cityCoords.country}
            description={currentWeather.description}
            temp={currentWeather.temperature}
            icon={currentWeather.icon}/>
           }
            </Container>
            <br/>
            
           <Container sx={{display:"flex", gap:"10px", justifyContent:"center"}}>
           {forecasts && forecasts.map((day, index) => {
           return <Weather 
            key={index}
            id={index}
            city={cityCoords.name}
            date={Object.keys(day)[0]}
            forecasts={day}/>
           })}
           </Container>
              </Container>
              </Grid>
              <Grid item height="10vh" alignContent="flex-end">
               <Footer forecast={currentWeather.description}/>
               </Grid>
              </Grid>
  )
}

export default App;