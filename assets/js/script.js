// Variables and selects
const apiKey = "b86fe0dd63399eb5ad4afad09ad8e22f";
const apiCountryURL  = "https://countryflagsapi.com/png/";
const apiKeyU = "0ToJTYu_A8yDCBq1jNxAk9iyLaK3YFa4CXZWTU2tDwk";

const qS = element => document.querySelector(element);

let cityInput        = qS("#city-input");
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
const loadEelement   = qS("#load-data");
const bodyElement    = qS("body");

// Functions
const getweatherData = (city) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}&lang=pt_br`
    swicthWalpaper(city);
    showLoading();
    const dataRequest = axios.get(apiWeatherURL)
        .then((response) => {
            hideLoading();
            return response.data;
        })
        .catch((error) =>{
            return error.response;
        });

    return dataRequest;
};

const showWeatherData = async (city) =>{
    try {
        const data = await getweatherData(city);
        divUnknow.style.cssText = "";
        cityElement.innerText = data.name;
        countryElement.setAttribute("src", apiCountryURL + data.sys.country);
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        humiElement.innerText = `${data.main.humidity}%`
        windElement.innerText = `${data.wind.speed.toLocaleString('pt-BR')}km/h` 
        divWeather.classList.remove("hide")
        divUnknow.classList.add("hide");
        cityInput.value = "";
    }catch (err) {
        divWeather.classList.add("hide")
        divUnknow.classList.remove("hide");
        divUnknow.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-top: 1.5rem;
        `
        cityInput.value = "";
        divUnknow.querySelector("h3").innerHTML = "Não foi possível localizar este local,<br/>Por favor tente novamente!";
        hideLoading()
    }
};

const getUnsPlashData = (city) =>{
    const apiUnsPlashURL = "https://api.unsplash.com/search/photos?per_page=1";

    const dataRequest = axios.get(`${apiUnsPlashURL}&client_id=${apiKeyU}&query=${city}`)
        .then((response) => {
            return response.data;
        })
    return dataRequest;
}

const swicthWalpaper = async (city) =>{
    try {
        const data = await getUnsPlashData(city);
        bodyElement.style.backgroundImage = `url(${data.results[0].urls.full})`;
    } catch (error) {
        bodyElement.style.background = "linear-gradient(180deg, var(--color-bg1) 0%, var(--color-bg2) 100%)";
    }
}


const showLoading = () => loadEelement.classList.remove("hide");
const hideLoading = () => loadEelement.classList.add("hide");

// Events
btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    
    const city = cityInput.value;
    showWeatherData(city);
    divWeather.classList.add("hide");

});

cityInput.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
        divWeather.classList.add("hide");
    }
});


