const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//to set handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views' , viewspath)
hbs.registerPartials(partialsPath)

// setup static directory to fetch static content 
app.use(express.static(publicDirectoryPath))


app.get('' , (req,res) =>{

    res.render('index' , {

        title: 'Weather App',
        name: 'Siddharth'

    })
})

app.get('/about' , (req,res) =>{

    res.render('about' , {

        title: 'About page',
        name: 'Sid'

    })
})

app.get('/help' , (req,res) =>{

    res.render('help' , {

        title: 'Help page',
        name: 'Sid'

    })
})

app.get('/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide a valid address'
        })
    }

    geocode(req.query.address , (error, {latitude,longitude,location} = {}) => {

        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
                
    })
})
})

    //res.send({

      //  location: 'Mumbai',
        //forecast: 'No rain',
        //address : req.query.address
    //})
//})
// pracice
app.get('/product' , (req,res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({

        product :[]
    })
})


app.get('/help/*' , (req,res) => {

    res.render('error' , {
        title: ' Help page not found',
        name: 'Sid'

    })

})

app.get('*' , (req,res) => {

    res.render('error' , {
        title: 'Page not found . 404 error',
        name : 'Sid'
    })
})
//app.com
//app.com/about
//app.com/help

app.listen(port, () => {

    console.log('Server is up and running on port' + port)
})
