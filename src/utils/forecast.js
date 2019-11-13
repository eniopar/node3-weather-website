const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6ed50b41017eb48d59b3022333d6cd8d/' + latitude +',' + longitude

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            const currently = body.currently;
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out. There is a ' + currently.precipProbability*100 + '% chance of rain.')
        }
    })
}

module.exports = forecast