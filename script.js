const apiKey = 'f2e1ef3748a14f71bcc00545240711'; // Substitua pela sua chave de API da WeatherAPI

async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') return;

    // URL para obter dados da WeatherAPI
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=pt`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Verifica se houve erro na resposta (cidade não encontrada)
        if (data.error) {
            document.getElementById('error').classList.remove('hidden');
            document.getElementById('weather-info').classList.add('hidden');
        } else {
            // Exibe as informações do clima
            document.getElementById('error').classList.add('hidden');
            document.getElementById('weather-info').classList.remove('hidden');
            document.getElementById('weather-info').classList.add('visible'); // Torna o conteúdo visível

            const cityName = data.location.name;
            const temp = `${data.current.temp_c}°C`; // Temperatura em Celsius
            const description = data.current.condition.text; // Descrição do clima
            const humidity = `Umidade: ${data.current.humidity}%`; // Umidade
            const wind = `Vento: ${data.current.wind_kph} km/h`; // Velocidade do vento

            // Atualiza os elementos HTML com as informações
            document.getElementById('city-name').innerText = cityName;
            document.getElementById('temp').innerText = temp;
            document.getElementById('description').innerText = description;
            document.getElementById('humidity').innerText = humidity;
            document.getElementById('wind').innerText = wind;

            // Atualiza o mapa com OpenStreetMap usando Leaflet
            const map = L.map('map').setView([data.location.lat, data.location.lon], 12); // Define a localização da cidade

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([data.location.lat, data.location.lon]).addTo(map) // Adiciona um marcador para a cidade
                .bindPopup(`<b>${cityName}</b>`)
                .openPopup();
        }
    } catch (error) {
        console.log('Erro ao buscar dados da API', error);
    }
}
