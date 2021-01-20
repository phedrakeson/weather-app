import { api_key } from '../key.js';
export default class WeatherService {
  constructor(form, input) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.getSearch = this.getSearch.bind(this);
    this.calendar = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    this.setClock = this.setClock.bind(this);
    this.lastCity = localStorage.getItem('city');
    this.lastLat = localStorage.getItem('lat');
    this.lastLon = localStorage.getItem('lon');
    this.getTimeAndDate = this.getTimeAndDate.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoError = this.geoError.bind(this);

    this.weatherData = {
      climate: {
        wind: '',
        speed: '',
        temp: '',
        temp_min: '',
        humidity: '',
        iconCode: ''
      },
      location: {
        city: '',
        lat: '',
        lon: '',
        country: ''
      }
    }
  }

  init() {
    this.form.addEventListener('submit', this.getSearch);
    this.verifyGeoPermission();
    this.getTimeAndDate();
    setInterval(this.getTimeAndDate, 5000);
  }

  verifyGeoPermission() {
    this.verifyLastSearch();
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
  }

  geoSuccess(coord) {
    let { latitude, longitude } = coord.coords;
    this.getGeoWeatherData(latitude, longitude);
  }

  geoError(error) {
    console.error(error.message);
  }

  verifyLastSearch() {
    if (this.lastCity === null) {
      this.getWeatherData('Brasilia');
    } else {
      this.getWeatherData(this.lastCity);
    }
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

  async getGeoWeatherData(lat, lon) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`);
    const resJSON = await res.json();
    let { temp, humidity, temp_min } = resJSON.main;
    temp = this.convertKelvinToCelsius(temp);
    temp_min = this.convertKelvinToCelsius(temp_min);
    let { climate, location } = this.weatherData;
    climate.wind = (resJSON.wind.speed * 3.6).toFixed(0);
    climate.temp = temp;
    climate.temp_min = temp_min;
    climate.humidity = humidity;
    climate.iconCode = resJSON.weather[0].icon;

    location.city = resJSON.name;
    location.country = resJSON.sys.country;

    this.displayWeatherData();
  }


  async getWeatherData(city) {
    this.saveLastSearch(city);
    this.encodedCity = encodeURI(city);
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.encodedCity}&appid=${api_key}`);
    const resJSON = await res.json();

    let { temp, humidity, temp_min } = resJSON.main;
    temp = this.convertKelvinToCelsius(temp);
    temp_min = this.convertKelvinToCelsius(temp_min);
    let { climate, location } = this.weatherData;
    climate.wind = (resJSON.wind.speed * 3.6).toFixed(0);
    climate.temp = temp;
    climate.temp_min = temp_min;
    climate.humidity = humidity;
    climate.iconCode = resJSON.weather[0].icon;

    location.city = resJSON.name;
    location.country = resJSON.sys.country;

    this.displayWeatherData();
  }

  async displayWeatherData() {
    let { wind, temp, temp_min, humidity, iconCode } = this.weatherData.climate;
    let { city, country } = this.weatherData.location;
    let weatherIcon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

    document.querySelector('[data-city]').innerText = city;
    document.querySelector('[data-state]').innerText = country;

    document.querySelector('[data-temp]').innerText = `${temp}°`;
    document.querySelector('[data-weather]').src = weatherIcon;
    
    document.querySelector('[data-humidity] p').innerText = `${humidity}%`;
    document.querySelector('[data-wind] p').innerText = `${wind} km/h`;
    document.querySelector('[data-min_temp] p').innerText = `${temp_min}°`;
  }

  saveLastSearch(city) {
    localStorage.setItem('city', city);
  }

  convertKelvinToCelsius(value) {
    return Math.round(value - 273.15);
  }
}
