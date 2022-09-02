// Import our custom CSS
// import './styles.scss'
import './styles.css';
import * as domFunc from './scripts/renderDOM'

const API_KEY = process.env.WEATHER_APP_API_KEY;

const inputCity = document.querySelector('.input-group .form-control') as HTMLInputElement;
const searchCityBtn = document.querySelector('.input-group button')!;
const weatherDisplay = document.querySelector('.weather-window') as HTMLElement;
const errorMsg = document.querySelector('.app .input-error-msg') as HTMLElement;

let searchedCity: string = '';
let jsonData: string = '';

searchCityBtn.addEventListener('click', async () => {
    if (inputCity.value !== searchedCity && inputCity.value !== '') {
        searchedCity = inputCity.value;

        const fetchedData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&APPID=${API_KEY}`, { mode: 'cors' });
        fetchedData.json().then(function (response) {
            jsonData = JSON.stringify(response);
            domFunc.renderWeatherInfo(weatherDisplay, jsonData);
        });
    };

    // Render weather info in DOM

});







// ERROR message handling
export function setErrorMessage(msg: string) {
    errorMsg.innerText = msg;
}

export function toggleErrorMessage(visible: boolean = true) {
    if (visible === true) {
        errorMsg.classList.remove('error-hidden');
    }
    else {
        if (errorMsg.classList.contains('error-hidden')) {
            return;
        }
        else {
            errorMsg.classList.add('error-hidden');
        }
    }
}


