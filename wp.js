    function openPage() {
        window.location.href = 'payment.html';
    }

    const lat = parseFloat(prompt("Enter latitude:"));
    const lon = parseFloat(prompt("Enter longitude:"));

    const apiKey = '3780bd09b9ccf7e98d5a87e796577503';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Update the existing HTML elements dynamically
        document.getElementById('place').textContent = data.name;
        document.getElementById('weather').textContent = data.weather[0].main;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('temperature').textContent = Math.round(data.main.temp - 273.15) + '°C';
        document.getElementById('maxTemperature').textContent = Math.round(data.main.temp_max - 273.15) + '°C';
        document.getElementById('minTemperature').textContent = Math.round(data.main.temp_min - 273.15) + '°C';
        document.getElementById('humidity').textContent = data.main.humidity + '%';
        document.getElementById('groundLevel').textContent = data.main.grnd_level + ' mtrs';
        document.getElementById('seaLevel').textContent = data.main.sea_level + ' mtrs';
        document.getElementById('visibility').textContent = (data.visibility / 1000) + ' Km';
        document.getElementById('windSpeed').textContent =  data.wind.speed + ' m/s';
        document.getElementById('windDegree').textContent = data.wind.deg + '°';
        document.getElementById('windGust').textContent = data.wind.gust + ' knots';
    })
    .catch(error => {
        console.error('Error fetching weather data, API might not be working', error);
        // Update an existing element with an error message
        document.getElementById('error-message').textContent = 'Error fetching weather data, API might not be working: ' + error;
    });