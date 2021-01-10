export default class WeatherService {
  static getWeather(city) {
    const encodedCity = encodeURI(city);
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=768e69da41e399bc86687c8dce514222
    `);
  }
}
