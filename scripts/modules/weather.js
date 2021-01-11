import { api_key } from '../key.js';
export default class WeatherService {
  constructor(form, input) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.getSearch = this.getSearch.bind(this);
  }

  init() {
    this.form.addEventListener('submit', this.getSearch);
  }

  getSearch(event) {
    event.preventDefault();
    this.getWeatherData(this.input.value);
  }

  async getWeatherData(city) {
    const encodedCity = encodeURI(city);
    const dadosResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${api_key}`);
    const dadosJSON = await dadosResponse.json();
    console.log(dadosJSON);
    let { temp, humidity, temp_min } = dadosJSON.main;
    let cityName = dadosJSON.name;
    let iconCode = dadosJSON.weather[0].icon;
    let weatherIcon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    console.log(iconCode)
    temp = this.convertKelvinToCelsius(temp);
    temp_min = this.convertKelvinToCelsius(temp_min);
    document.querySelector('[data-city]').innerText = cityName;
    document.querySelector('[data-temp]').innerText = `${temp}°C`;
    document.querySelector('.weather-icon img').src = weatherIcon;
  }

  convertKelvinToCelsius(value) {
    return Math.round(value - 273.15);
  }
 
}