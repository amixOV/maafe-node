const unirest = require("unirest");

let getCovid = () => {
    
    const request =  unirest("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats");
    request.query({
        "country": "All"
    });
    request.headers({
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "df6359d5c3msh31755b2a56b1a69p14c7b6jsn0a9fd72cd8dd"
    });
    return new Promise((resolve, rej) => {
        request.end ( res => {
            if (res.error) {
                console.log(res.error);
                rej (res.error);
                
            }else{
                let api = res.body.data.covid19Stats;
                resolve(api)
            }
        });
    });
 }
 module.exports = getCovid;