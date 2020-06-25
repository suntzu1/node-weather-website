const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utills/geocode.js');
const forecast = require('./utills/weatherforecast');

const app = express();
// port var is available in Heroku, so it will use it, else use 3000 (local)
const port = process.env.PORT || 3000;
// define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath); // if not explicitly setup, express will look for "views" folder at website root
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Abraham Hayat'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abraham Hayat'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abraham Hayat',
        message: 'Frequently asked questions!!!!'
    });
});

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Weather',
        name: 'Abraham Hayat',
    });
});

app.get('/weather/submit', (req, res) => {
    console.log('Weather request submitted.')
    if (!req.query.address) {
        return res.send({
            error: 'You must specify an address'
        })
    }

    const address = req.query.address;
    geoCode(address, (error, { Lat, Long, Place } = {}) => {
        if (error) {
            return res.send({ error });
        } else {
            forecast(Lat, Long, (error, { description, temperature, feelslike }) => {
                if (error) {
                    return res.send({ error });
                } else {
                    res.send({
                        place: Place,
                        description,
                        temperature,
                        feelslike
                    });
                }
            });
        }
    });
});

function getWeatherForecast(address) {
    // geoCode(address, (error, result) => {

}

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must specify a search term'
        });
    } /*else {*/
    const search = req.query.search;
    let results = [];
    if (search === 'games') {
        results = ["Call of Duty", "Overwatch"];
    }
    res.send({
        products: results
    });
})

// ERROR 404 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'ERROR',
        name: 'Abraham Hayat',
        errMsg: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'ERROR',
        name: 'Abraham Hayat',
        errMsg: '404: Page not found!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
/*
app.get('', (req, res) => {
    res.send('<h1>Hello express!</h1>');
});

app.get('/help', (req, res) => {
    res.send({
        name: 'Abraham', age: 47
    });
});
app.get('/about', (req, res) => {
    res.send('<h2>About</h2>');
});
*/
