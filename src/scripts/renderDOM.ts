import { API_KEY } from '../index';
import '../styles.scss';

let nextDaysData: string = '';


export function renderWeatherInfo(DOMElement: HTMLElement, jsonData: string, tempType: string = 'C') {
    DOMElement.innerHTML = '';

    // console.log(jsonData);
    const cityData = JSON.parse(jsonData);

    // TOP PART
    let degrees = calculateTemp(cityData.main.temp, tempType).toFixed(0);
    const topPart = document.createElement('div');
    topPart.classList.add('weather-top-part');
    DOMElement.appendChild(topPart);

    const cityName = document.createElement('h5');
    cityName.innerText = cityData.name;
    topPart.appendChild(cityName);

    const degreeDisplay = document.createElement('div');
    degreeDisplay.classList.add('degree-display');
    topPart.appendChild(degreeDisplay);

    const leftDegreeDisplay = document.createElement('div');
    leftDegreeDisplay.classList.add('left-deg-dis');
    const lddSpan = document.createElement('span');
    lddSpan.innerHTML = `${degrees}&#176;${tempType.toUpperCase()}`;
    degreeDisplay.appendChild(leftDegreeDisplay);
    leftDegreeDisplay.appendChild(lddSpan);

    const rightDegreeDisplay = document.createElement('div');
    rightDegreeDisplay.classList.add('right-deg-dis');
    const ul = document.createElement('ul');
    degreeDisplay.appendChild(rightDegreeDisplay);
    rightDegreeDisplay.appendChild(ul);

    const listOne = document.createElement('li');
    const listTwo = document.createElement('li');
    const listThree = document.createElement('li');

    listOne.innerHTML = `Feels like: ${calculateTemp(cityData.main["feels_like"], tempType).toFixed(2)}&#176;`;
    listTwo.innerText = `Pressure: ${cityData.main.pressure}hPa`;
    listThree.innerText = `Humidity: ${cityData.main.humidity}%`;

    ul.appendChild(listOne);
    ul.appendChild(listTwo);
    ul.appendChild(listThree);
    // ==================

    // BOTTOM PART
    const bottomPart = document.createElement('div');
    bottomPart.classList.add('weather-bottom-part');
    DOMElement.appendChild(bottomPart);


    // FETCH NEXT DAYS DATA
    retrieveNextDaysData(cityData.coord.lon, cityData.coord.lat);
}


async function retrieveNextDaysData(lon: number, lat: number) {
    const retrievedData = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`, { mode: 'cors' });
    retrievedData.json().then(function (response) {
        nextDaysData = JSON.stringify(response);
        renderNextDaysDOM(nextDaysData);
    });
}


function calculateTemp(degrees: number, tempType: string) {
    if (tempType === 'C' || tempType === 'c') {
        return degrees - 273.15;
    }
    else if (tempType === 'F' || tempType === 'f') {
        return 1.8 * (degrees - 273.15) + 32;
    }
    else {
        return degrees;
    }
}

function renderNextDaysDOM(data: string) {
    const daysData = JSON.parse(data);

    // RENDERING
    renderDOM(daysData);
}

function renderDOM(data: any) {
    const container = document.querySelector('.weather-bottom-part') as HTMLElement;


    for (let i = 1; i < data.list.length; i++) {
        const nextDayCard = document.createElement('div');
        nextDayCard.classList.add('next-day-card');
        container.appendChild(nextDayCard);

        // TIMESTAMP ICON
        const timestampIcon = document.createElement('div');
        timestampIcon.classList.add('weather-icon');
        timestampIcon.innerText = data.list[i].weather[0].main;
        nextDayCard.appendChild(timestampIcon);

        // TIMESTAMP DATE
        const timestampDate = document.createElement('div');
        timestampDate.classList.add('day-date');
        const tdDate = document.createElement('div');
        tdDate.innerText = data.list[i]['dt_txt'];
        nextDayCard.appendChild(timestampDate);
        timestampDate.appendChild(tdDate);

        // TIMESTAMP TEMP
        const timestampTemp = document.createElement('div');
        timestampTemp.classList.add('day-temp');
        timestampTemp.innerHTML = `${calculateTemp(data.list[i].main.temp, 'C').toFixed(0)}&#176;`;
        nextDayCard.appendChild(timestampTemp);
    }

}