import WeatherService from './modules/weather.js';

const weather = new WeatherService('.search', '.search input');

weather.init();