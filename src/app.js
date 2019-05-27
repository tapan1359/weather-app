const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

//console.log(path.join(__dirname,'../public'))


const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir path
app.use(express.static(publicDirPath))


app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name: 'Tapan Parmar'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Tapan Parmar'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help page',
        name: 'Tapan Parmar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address to get the forcast'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {})=>{
        if (error) {
            return res.send({ error})
            }
        forcast (latitude, longitude, (error, forcastData) =>{
            if (error) {
                return res.send({ error })
            }
            res.send({
                forcast: 'It is ' + forcastData.current_temperature + ' degree out',
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404 page',
        message: 'Help article not found',
        name: 'Tapan Parmar'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404 page',
        message: 'Page not found',
        name: 'Tapan Parmar'
    })
})

app.listen(80, () => {
    console.log('Server is starting on port 3000')
})