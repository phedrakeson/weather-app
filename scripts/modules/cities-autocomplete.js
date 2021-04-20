export default class AutocompleteCities {
    constructor(input) {
        this.input = document.querySelector(input);
        this.getAllBrazilianCities = this.getAllBrazilianCities.bind(this)
        this.cities = [];
    }
  
    autocomplete() {
        console.log("autocomplete function");
    }

    async getAllBrazilianCities() {
        const res = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios");
        const resJSON = await res.json();
        resJSON.map(city => {
            this.cities.push(`${city.nome} - ${city.microrregiao.mesorregiao.UF.sigla}`)
        })
    }

    init() {
        this.getAllBrazilianCities();
    }
}

