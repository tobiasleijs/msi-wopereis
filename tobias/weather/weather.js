function drawWeather(d) {
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    var description = d.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById('description').innerHTML = description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = d.name;
}

function weatherBalloon(cityID) {
    var key = '847fd2119e932512fd94c6bbfdc2a283';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
        cityID + '&appid=' + key + '&lang=nl')
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            drawWeather(data); // Call drawWeather
        })
        .catch(function () {
            // catch any errors
        });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    console.log('debounce');
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to be called when input changes, debounced
const debouncedWeatherBalloon = debounce(function (event) {
    weatherBalloon(event.target.value);
}, 1200);


document.getElementById('location-input').addEventListener('input', debouncedWeatherBalloon);

window.onload = function () {
    weatherBalloon("amsterdam");
}