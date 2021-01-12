import { api_key } from '../key.js';
export default class WeatherService {
  constructor(form, input) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.getSearch = this.getSearch.bind(this);
    this.calendar = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    this.setClock = this.setClock.bind(this);
  }

  init() {
    this.form.addEventListener('submit', this.getSearch);
    this.getWeatherData('Brasília');
    this.getTimeAndDate()
  }

  getSearch(event) {
    event.preventDefault();
    this.getWeatherData(this.input.value);
  }

  getTimeAndDate() {
    const date = new Date();
    this.day = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();

    this.hour = date.getHours();
    this.minutes = date.getMinutes();
    this.setMonth(this.month);
    this.setClock();
  }

  setMonth(monthIndex) {
    return this.month = this.calendar[monthIndex];
  }

  setClock() {
    setInterval(() => {
      document.querySelector('[data-time]').innerText = `${this.hour}:${this.minutes}, ${this.day} de ${this.month}, ${this.year}`;
    }, 1000);
  }


  async getWeatherData(city) {
    const encodedCity = encodeURI(city);
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${api_key}`);
    const resJSON = await res.json();
    let { temp, humidity, temp_min } = resJSON.main;
    let cityName = resJSON.name;
    let iconCode = resJSON.weather[0].icon;
    let weatherIcon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
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