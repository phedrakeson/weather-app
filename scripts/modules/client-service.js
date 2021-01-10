import { response } from 'express';
import WeatherService from './weather.js';

const search = document.querySelector('.search input')

export default class ClientService {
  static submit(event) {
    event.preventDefault();
    WeatherService.getWeather(search.value);
  }
}