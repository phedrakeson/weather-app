import WeatherService from './weather.js';

const search = document.querySelector('.search input')

export default class ClientService {
  static async submit(event) {
    event.preventDefault();
    try {
      const res = await WeatherService.getWeather(search.value);
    } catch(err) {
      console.log(err.response.data);
    }
  }
}