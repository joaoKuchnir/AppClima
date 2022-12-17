// Variables and selects
const apiKey = "b86fe0dd63399eb5ad4afad09ad8e22f";
const apiCountryURL = "https://countryflagsapi.com/png/"

const qS = element => document.querySelector(element);

let cityInput      = qS("#city-input");
const btnSearch      = qS("#search");
const cityElement    = qS("#city");
const countryElement = qS("#country");
const tempElement    = qS("#temperature span");
const descElement    = qS("#description");
const iconElement    = qS("#weather-icon");
const humiElement    = qS("#humidity span");
const windElement    = qS("#wind span");
const divWeather     = qS("#weather-data");
const divUnknow      = qS("#weather-unknow");

// Functions
const getweatherData = (city) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}&lang=pt_br`
    const dataRequest = axios.get(apiWeatherURL)
        .then((response) => {
            return response.data;
        })
        .catch((error) =>{
            return error.toJSON();
        });

    return dataRequest;
};

const showWeatherData = async (city) =>{
    const data = await getweatherData(city);
    try {
        cityElement.innerText = data.name;
        countryElement.setAttribute("src", apiCountryURL + data.sys.country);
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        humiElement.innerText = `${data.main.humidity}%`
        windElement.innerText = `${data.wind.speed.toLocaleString('pt-BR')}km/h` 
        divWeather.classList.remove("hide")
        setTimeout(() =>{
            divWeather.style.opacity = "1";
        }, 500);
        cityInput.value = "";
    } catch (err) {
        divUnknow.classList.remove("hide");
        divUnknow.querySelector("h3").innerText = "1234";
    }
};

// Events
btnSearch.addEventListener("click", (e) => {
    e.preventDefault()
    
    let city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const city = e.target.value;
        showWeatherData(city)
    }
});


