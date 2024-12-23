const apiKey = 'f2e1ef3748a14f71bcc00545240711';
let map;

function initializeMap() {
    const campoMouraoCoords = [-24.0469, -52.378]; // Coordenadas de Campo Mourão
    map = L.map('map').setView(campoMouraoCoords, 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker(campoMouraoCoords).addTo(map);

    const popupContent = '<b>Campo Mourão</b>';
    const popup = L.popup()
        .setContent(popupContent)
        .setLatLng(campoMouraoCoords);

    marker.on('click', () => {
        popup.openOn(map); // Abre o popup quando o marcador é clicado
    });

    map.on('popupclose', () => {
        popup.remove(); // Fecha o popup quando o botão de fechar (X) é clicado
    });
}


function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

async function getWeather() {
    document.getElementById('gif').classList.add('hidden'); 
    const displayCity = document.getElementById('city').value;
    let city = displayCity.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 

    if (city === '') return;

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=pt`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById('error').classList.remove('hidden');
            document.getElementById('weather-info').classList.add('hidden');
        } else {
            document.getElementById('error').classList.add('hidden');
            document.getElementById('weather-info').classList.remove('hidden');

            const temp = `${data.current.temp_c}°C`;
            const description = data.current.condition.text;
            const humidity = `Umidade: ${data.current.humidity}%`;
            const wind = `Vento: ${data.current.wind_kph} km/h`;
            const datetime = formatDate(data.location.localtime); // Formata a data e hora

            document.getElementById('city-name').innerText = displayCity;
            document.getElementById('temp').innerText = temp;
            document.getElementById('description').innerText = description;
            document.getElementById('humidity').innerText = humidity;
            document.getElementById('wind').innerText = wind;
            document.getElementById('datetime').innerText = datetime;

            map.setView([data.location.lat, data.location.lon], 12);
            L.marker([data.location.lat, data.location.lon]).addTo(map)
                .bindPopup(`<b>${displayCity}</b>`)
                .openPopup();
        }
    } catch (error) {
        console.log('Erro:', error);
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('weather-info').classList.add('hidden');
    }
}

async function getLocalWeather() {
    const city = "campo mourao";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=pt`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.error) {
            const temp = `${data.current.temp_c}°C`;
            const cityName = data.location.name;
            const weatherIcon = `https:${data.current.condition.icon}`;

            document.getElementById('local-temp').innerText = temp;
            document.getElementById('local-city').innerText = cityName;
            document.getElementById('weather-icon').src = weatherIcon;

            document.getElementById('localInf').classList.remove('hidden');
        }
    } catch (error) {
        console.log('Erro ao obter dados de Campo Mourão:', error);
    }
}

window.addEventListener('load', () => {
    initializeMap();
    getLocalWeather();

    const cityInput = document.getElementById('city');
    cityInput.addEventListener('keypress', (event) => { // Correção do evento 'keypress'
        if (event.key === 'Enter') {
            getWeather();
        }
    });
});