const path = require('path')  // built-in node module
const express = require('express')
const hbs = require('hbs') // *

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// All express exports is a function!
const app = express()

const port = process.env.PORT || 3000  // env var PORT provided by Heroku

// Server configuration

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath) // *

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Previsioni del tempo',
        name: 'Arturo Biscazzaglia'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ME',
        name: 'Arturo Biscazzaglia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Arturo Biscazzaglia',
        message: 'Pioggia vento e gelo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address not provided"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = { }) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })

        })

    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('not_found', {
        title: 'Error 404',
        name: 'Arturo Biscazzaglia',
        message: 'Help page not found!'
    })
})

app.get('*', (req, res) => {
    res.render('not_found', {
        title: 'Error 404',
        name: 'Arturo Biscazzaglia',
        message: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log("Server listening on port " + port)
})