const request = require('postman-request');
// Weather Stack data
const apiKey = 'f808639d4f87c323fea466b57e48a0c8';
const apiBaseUrl = 'http://api.weatherstack.com/';
// http://api.weatherstack.com/current?access_key=f808639d4f87c323fea466b57e48a0c8&query=Boca%20Raton
// http://api.weatherstack.com/current?access_key=f808639d4f87c323fea466b57e48a0c8&query=26.358,-80.083
const  forecast = (lat, long, callback) => {
    const response = request({
        url: `${apiBaseUrl}forecast?access_key=${apiKey}&units=f&query=${lat},${long}`,//
        json: true
    },
        (error, response, body) => {
            // const data = JSON.parse(response.body);
            // console.log(data.current);
            if (error) {
                callback('The service encountered an error or could not connect: ' + error, undefined);
            } else if (response.body.error) {
                // JSON.stringify(response.body.error);
                callback('The service encountered an error: ' + response.body.error.info, undefined);
            }
            else {
                const cur = response.body.current;
                callback(undefined, {
                    description: cur.weather_descriptions[0],
                    temperature: cur.temperature,
                    feelslike: cur.feelslike
                })
            }
        });
}
module.exports = forecast;