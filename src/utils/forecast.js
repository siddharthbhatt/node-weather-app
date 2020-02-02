const request = require('request')

const forecast = (latitude , longitude , callback) => {
const url = 'https://api.darksky.net/forecast/826baf39966347a589413f87f57d6d31/' + latitude + ',' + longitude + '?' + 'units=si'

 request({ url, json: true }, (error, {body}) => {
     if (error) {
        callback('Unable to connect to weather services!', undefined)
     } else if (body.error) {
        callback('Unable to find the location information. Try another search.', undefined)
     } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')   

}
 })
}

module.exports = forecast

