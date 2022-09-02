// Import our custom CSS
// import './styles.scss'
import './styles.css';
import * as domFunc from './scripts/renderDOM'

const API_KEY = process.env.WEATHER_APP_API_KEY;

const inputCity = document.querySelector('.input-group .form-control') as HTMLInputElement;
const searchCityBtn = document.querySelector('.input-group button')!;
const weatherDisplay = document.querySelector('.weather-window') as HTMLElement;

let searchedCity: string = '';
let jsonData: string = '';

searchCityBtn.addEventListener('click', async () => {
    if (inputCity.value !== searchedCity && inputCity.value !== '') {
        searchedCity = inputCity.value;

        const fetchedData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&APPID=${API_KEY}`, { mode: 'cors' });
        fetchedData.json().then(function (response) {
            jsonData = response;
            console.log(jsonData);
        });
    };

    if (weatherDisplay.innerHTML === '') {
        domFunc.renderWeatherInfo(weatherDisplay, jsonData);
    };
});


