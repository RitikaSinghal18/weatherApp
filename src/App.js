import React,{useState} from 'react';
const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "http://api.openweathermap.org/data/2.5/"
}

function App(){
    const [query,setQuery] = useState('');
    const [weather,setWeather] = useState({});

    const search = (e) => {
      if(e.key === "Enter"){
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather((result));
          setQuery('');
        });
      }
    }
    const dateBuilder = (d) => {
      let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      let date = d.getDate();
      let day = days[d.getDay()];
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      let currentDate = date<10? `0${date}`:`${date}`;

      return `${day} ${currentDate} ${month},${year}`
    }
    const timeBuilder = (d) => {
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      let currentHours = hours<10? `0${hours}`:`${hours}`;
      let currentMinutes = minutes<10? `0${minutes}`:`${minutes}`;
      let currentSeconds = seconds<10? `0${seconds}`:`${seconds}`;
      return `${currentHours}:${currentMinutes}:${currentSeconds}`;
    }

    return(
      
      <div className={(typeof weather.main != "undefined")?((weather.main.temp > 16) ? 'warm' : 'cold') : 'default'}>
        <div className="container-fluid">
            <h4 className="header">Enter city name to get the weather information</h4>
            <div className="input-group mb-3 searchbox">
              <input type="text" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} className="form-control search-bar" aria-label="Search" placeholder="Search..." />
            </div>
            
            {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
                <div className="time">{timeBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}&deg;C
                </div>
                <div className="weather">
                  {weather.weather[0].main}
                </div>
              </div>
            </div>
            ): ('')}
        </div>
            
      </div>
    );
}

export default App;
