export function renderWeatherInfo(DOMElement: HTMLElement, jsonData: string, tempType: string = 'C') {
    DOMElement.innerHTML = '';

    // console.log(jsonData);
    let cityData = JSON.parse(jsonData);

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