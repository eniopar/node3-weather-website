const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZW5pb3BhciIsImEiOiJjazI4bmo3eG0wMG9xM2NycGg0ZHJ6cjcyIn0.z863u5PgPtfPJWedeylxhg&limit=1'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Location not found!', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode