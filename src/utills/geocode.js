const request = require('postman-request');
const geoCodingApiKey = 'pk.eyJ1Ijoic3VuaWx0aG9tYXMiLCJhIjoiY2tiZnVpZ2R1MHo4cDJzb2k1MHU0MHUyOCJ9.6UZrZZtN7nd-v9FRcAznvw';
const geoCodingApi = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{search_text}.json?limit=1&access_token=';
const geoCode = (address, callback) => {
    request({
        url: geoCodingApi.replace('{search_text}', encodeURIComponent(address)) + geoCodingApiKey,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('The service encountered an error or could not connect: ' + error, undefined);
        } else if (!response.body.features) {
            callback('The service encountered an error: ' + response.body.message, undefined);
        } else if (response.body.features.length === 0) {
            callback('No results found for this request', undefined);
        } else {
            const ll = response.body.features[0].center;
            callback(undefined, { Lat: ll[1], Long: ll[0], Place: response.body.features[0].place_name });
        }
    })
}

module.exports = geoCode;