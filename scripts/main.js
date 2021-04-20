import WeatherService from './modules/weather.js';
import LoadingScreen from './modules/loading-screen.js'
import DynamicBackground from './modules/dynamic-background.js';
import CitiesAutocomplete from './modules/cities-autocomplete.js'

const citiesAutocomplete = new CitiesAutocomplete('.search input', 'datalist')
const weather = new WeatherService('.search', '.search input');
const loadingScreen = new LoadingScreen('.loading-screen');
const dynamicBackground = new DynamicBackground('body');

dynamicBackground.init();
weather.init();
loadingScreen.init();
citiesAutocomplete.init();