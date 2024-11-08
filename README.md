# ClimaTracker

ClimaTracker é um projeto desenvolvido como parte do trabalho final do 3º trimestre, onde os alunos foram desafiados a explorar novas tecnologias no desenvolvimento web. Nosso objetivo foi criar uma aplicação interativa que permite aos usuários rastrear o clima de qualquer cidade, exibindo informações como temperatura, umidade, velocidade do vento e condições gerais do clima.

## Objetivo do Projeto

O projeto visa aplicar e consolidar conhecimentos em desenvolvimento web, incluindo o uso de APIs para consumo de dados externos, técnicas de responsividade e estilização avançada para uma interface de usuário intuitiva e atraente. Escolhemos o tema de rastreamento climático por ser relevante e uma ótima oportunidade para explorar APIs públicas, além de oferecer uma aplicação prática e acessível aos usuários.

## Funcionalidades

- **Busca por Cidade**: Permite ao usuário digitar o nome de qualquer cidade e visualizar informações detalhadas sobre o clima atual.
- **Localização Padrão**: Inicia com a localização de Campo Mourão, exibindo o clima atual e as informações meteorológicas dessa cidade.
- **Mapas Interativos**: Mapa embutido que ajusta a visualização para a cidade buscada, utilizando a biblioteca Leaflet.
- **Responsividade**: Layout adaptável para dispositivos móveis e desktop.
- **Temática de Clima Neutro**: Interface com cores suaves, inspirada em tons de céu nublado.

## Tecnologias Utilizadas

- **HTML5**: Estrutura básica e elementos semânticos.
- **CSS3**: Estilização avançada, com transições e design responsivo.
- **JavaScript**: Lógica de busca, consumo da API e manipulação do DOM.
- **WeatherAPI**: Fonte de dados climáticos.
- **Leaflet**: Biblioteca de mapas interativos para exibir a localização da cidade selecionada.

## Requisitos de Instalação

Para executar o ClimaTracker localmente, siga as etapas abaixo:

1. **Clone este repositório**:
    ```bash
    git clone https:https://github.com/GabrielRegel/ClimaTracker.git
    ```
2. **Navegue até o diretório**:
    ```bash
    cd ClimaTracker
    ```
3. **Abra o arquivo `index.html` em um navegador** para visualizar a aplicação.

## Configuração de API

O ClimaTracker utiliza a **WeatherAPI** para obter informações climáticas. Para configurar a API:

1. Crie uma conta em [WeatherAPI](https://www.weatherapi.com/) e obtenha sua chave de API.
2. Substitua a variável `apiKey` no arquivo `script.js` pela sua chave:
    ```javascript
    const apiKey = 'SUA_CHAVE_DE_API';
    ```

## Estrutura de Arquivos

```plaintext
ClimaTracker/
├── index.html           # Estrutura da página web
├── styles.css           # Estilos e layout do projeto
├── script.js            # Lógica de busca e integração com a API
└── Imagens/             # Imagens usadas no projeto (ex: ícone)
