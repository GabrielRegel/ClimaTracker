const apiKey = 'f2e1ef3748a14f71bcc00545240711'; // Substitua pela sua chave de API da WeatherAPI
let map; // Variável global para o mapa

async function getWeather() {
    const city = document.getElementById('city').value;
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
            document.getElementById('weather-info').classList.add('visible');

            const cityName = data.location.name;
            const temp = `${data.current.temp_c}°C`;
            const description = data.current.condition.text;
            const humidity = `Umidade: ${data.current.humidity}%`;
            const wind = `Vento: ${data.current.wind_kph} km/h`;

            document.getElementById('city-name').innerText = cityName;
            document.getElementById('temp').innerText = temp;
            document.getElementById('description').innerText = description;
            document.getElementById('humidity').innerText = humidity;
            document.getElementById('wind').innerText = wind;

            // Remove o mapa existente se ele já estiver inicializado
            if (map) {
                map.remove();
            }

            // Cria um novo mapa centralizado na cidade selecionada
            map = L.map('map').setView([data.location.lat, data.location.lon], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([data.location.lat, data.location.lon]).addTo(map)
                .bindPopup(`<b>${cityName}</b>`)
                .openPopup();
        }
    } catch (error) {
        console.log('Erro ao buscar dados da API', error);
    }
}
