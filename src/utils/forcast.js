const request = require('request')

const forcast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/e884ac3452dc817c44c63535ec3bbfab/' + latitude + ',' + longitude

    request({ url, json: true},(error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error) {
            callback('check co-ordinates',undefined)
        } else {
            callback(undefined, {
                current_temperature: body.currently.temperature,
                current_precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forcast