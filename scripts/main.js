import WeatherService from './modules/weather.js';
import LoadingScreen from './modules/loading-screen.js'

const weather = new WeatherService('.search', '.search input');
const loadingScreen = new LoadingScreen('.loading-screen');

weather.init();
loadingScreen.init();