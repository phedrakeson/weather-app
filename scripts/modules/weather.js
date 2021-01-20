import { api_key } from '../key.js';
export default class WeatherService {
  constructor(form, input) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.getSearch = this.getSearch.bind(this);
    this.calendar = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    this.setClock = this.setClock.bind(this);
    this.lastCity = localStorage.getItem('city');
    this.getTimeAndDate = this.getTimeAndDate.bind(this);
  }

  verifyFirstAcess() {
    if (this.lastCity === null) {
      this.getWeatherData('Brasilia');
    } else {
      this.getWeatherData(this.lastCity);
    }
  }

  init() {
    this.form.addEventListener('submit', this.getSearch);
    this.verifyFirstAcess();
    this.getTimeAndDate();
    setInterval(this.getTimeAndDate, 5000);
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
    if(this.minutes < 10) {
      document.querySelector('[data-time]').innerText = `${this.hour}:0${this.minutes}, ${this.day} de ${this.month}, ${this.year}`;
    } else {
      document.querySelector('[data-time]').innerText = `${this.hour}:${this.minutes}, ${this.day} de ${this.month}, ${this.year}`;
    }
  }


  async getWeatherData(city) {
    this.saveLastSearch(city);
    this.encodedCity = encodeURI(city);
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.encodedCity}&appid=${api_key}`);
    const resJSON = await res.json();
    let wind = (resJSON.wind.speed * 3.6).toFixed(0);
    let country = resJSON.sys.country;
    let { temp, humidity, temp_min } = resJSON.main;
    let cityName = resJSON.name;
    let iconCode = resJSON.weather[0].icon;
    let weatherIcon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    temp = this.convertKelvinToCelsius(temp);
    temp_min = this.convertKelvinToCelsius(temp_min);

    const weatherData = { cityName, country, temp, weatherIcon, humidity, wind, temp_min };

    this.displayWeatherData(weatherData)
  }

  async displayWeatherData(data) {
    const { cityName, country, temp, weatherIcon, humidity, wind, temp_min } = data;
    document.querySelector('[data-city]').innerText = cityName;
    document.querySelector('[data-state]').innerText = country;

    document.querySelector('[data-temp]').innerText = `${temp}°`;
    document.querySelector('[data-weather]').src = weatherIcon;
    
    document.querySelector('[data-humidity] p').innerText = `${humidity}%`;
    document.querySelector('[data-wind] p').innerText = `${wind} km/h`;
    document.querySelector('[data-min_temp] p').innerText = `${temp_min}°`;
  }

  convertKelvinToCelsius(value) {
    return Math.round(value - 273.15);
  }

  saveLastSearch(city) {
    localStorage.setItem('city', city);
  }

 
}
