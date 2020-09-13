const { response } = require('express');
const fetch = require('node-fetch');

class ConsultInfected {
    /**
     * 
     * His class will be in charge of consuming a web service that allows bringing a database of those infected with coronavirus. 
     * it will be composed of two methods in charge of consulting the infected by age.
     * 
     * 
     */

    constructor() {
        //The attributes available to the class are defined.
    }

    inRange(x, min, max) {
        return ((x - min) * (x - max) <= 0);
    }


    getInfected() {
        //Method in charge of consuming an API that has a data set with Coronavirus positive patients.
        return fetch('https://www.datos.gov.co/resource/gt2j-8ykr.json?')
            .then(response => {
                return response.json();
            });
    }

    selectedData() {
        /**
         * This method classifies the data received by the public information web service by age and sex, 
         * returning a json with the formatted data.
         */
        const data = (async() => {
            let dataset = await this.getInfected();
            let dict_values_mans = { "age_0_20": 0, "age_20_40": 0, "age_40_60": 0, "age_60_80": 0, "age_80_100": 0 };
            let dict_values_wonders = { "age_0_20": 0, "age_20_40": 0, "age_40_60": 0, "age_60_80": 0, "age_80_100": 0 };

            for (const key in dataset) {
                switch (dataset[key].sexo.toUpperCase()) {
                    case "F":
                        if (this.inRange(Number(dataset[key].edad), 0, 20)) {
                            dict_values_wonders["age_0_20"] += 1;
                        } else {
                            if (this.inRange(Number(dataset[key].edad), 21, 40)) {
                                dict_values_wonders["age_20_40"] += 1;
                            } else {
                                if (this.inRange(Number(dataset[key].edad), 41, 60)) {
                                    dict_values_wonders["age_40_60"] += 1;
                                } else {
                                    if (this.inRange(Number(dataset[key].edad), 61, 80)) {
                                        dict_values_wonders["age_60_80"] += 1;
                                    } else {
                                        dict_values_wonders["age_80_100"] += 1;
                                    }
                                }
                            }
                        }
                    case "M":
                        if (this.inRange(Number(dataset[key].edad), 0, 20)) {
                            dict_values_mans["age_0_20"] += 1;
                        } else {
                            if (this.inRange(Number(dataset[key].edad), 21, 40)) {
                                dict_values_mans["age_20_40"] += 1;
                            } else {
                                if (this.inRange(Number(dataset[key].edad), 41, 60)) {
                                    dict_values_mans["age_40_60"] += 1;
                                } else {
                                    if (this.inRange(Number(dataset[key].edad), 61, 80)) {
                                        dict_values_mans["age_60_80"] += 1;
                                    } else {
                                        dict_values_mans["age_80_100"] += 1;
                                    }
                                }
                            }
                        }
                }
            }
            return { "mens": dict_values_mans, "women": dict_values_wonders };
        })();
        return data.then((response) => {
            return response;
        });
    }
}

module.exports = ConsultInfected;