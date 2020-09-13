const express = require("express");
const ConsultInfected = require("./services.js");
const app = express();
const port = 8000;


app.get('/infeted', function(req, res) {
    /**
     * operation: GET,
     * path="/infected",
     * description: "his service returns the number of infected with covid-19 
     *  discriminated by age and sex. The number of infected is based on: https://www.datos.gov.co/resource/gt2j-8ykr.json?",
     * summary="the sum of all those infected by COVID-19 for different regions of Colombia 
     *  classified by age and sex."
     * 
     */
    (async() => {
        let obj_covid = new ConsultInfected();
        res.send(await obj_covid.selectedData());
    })();
});

app.get('/', function(req, res) {
    // Testing service
    res.send("ready!!");
});

app.listen(port, () => {
    console.log("EUREKA, app listening on port 8000!");
});