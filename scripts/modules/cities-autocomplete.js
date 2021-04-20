export default class AutocompleteCities {
    constructor(input, datalist) {
        this.input = document.querySelector(input);
        this.citiesDatalist = document.querySelector(datalist)
        this.getAllBrazilianCities = this.getAllBrazilianCities.bind(this)
        this.createDataList = this.createDataList.bind(this);
        this.loadOptionsOnInputChange = this.loadOptionsOnInputChange.bind(this);
        this.cities = [];
    }
  
    createDataList() {
        this.cities.map(city => {
            let newCityOption = document.createElement('option');
            newCityOption.value = city;
            this.citiesDatalist.appendChild(newCityOption);
        })
    }

    loadOptionsOnInputChange() {
        this.input.addEventListener('input', e => {
            console.log("entrou")
            e.target.value ?
                e.target.setAttribute('list', 'brazilian-cities-data')
                :
                e.target.setAttribute('list', '')
        })
    }

    async getAllBrazilianCities() {
        const res = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios");
        const resJSON = await res.json();
        resJSON.map(city => {
            this.cities.push(`${city.nome}`);
        })
        this.createDataList();
    }

    init() {
        this.loadOptionsOnInputChange();
        this.getAllBrazilianCities();
    }
}

