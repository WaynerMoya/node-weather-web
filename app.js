const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { send } = require('process')
const geocode = require('./src/utils/geocode')
const forecast = require('./src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public') 
const viewPath = path.join(__dirname , './templates/views')
const partialsPath = path.join(__dirname , './templates/partials')

//Setup handlebars engine and view locations
app.set('view engine', 'hbs');
app.set('views' , viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' , (req , res)=>{
    res.render('index' , {
        title : 'Weather App',
        name : 'Wayner'
    })
})

app.get('/about' , (req , res) =>{
    res.render('about',{
        title : 'About',
        name : "wayner"
    })
})

app.get('/help' , (req , res) =>{
    res.render('help' , {
        helpText : 'This is some helpful text',
        title : 'Help',
        name : 'Wayner'
    })
})

app.get('/weather' , (req, res)=>{
    
    if(!req.query.address){
        return res.send({
            error : 'You must provide a search'
        })
    }

    geocode(req.query.address , (error, {location , latitud , longitud} = {}) => {
        if(error){
            return res.send({ error})
        }
        forecast( location , (error , forescastData) => {
            if(error){
                return res.send({ error }) 
            }
            res.send({
                forecast : forescastData,
                location ,
                address : req.query.address
            })
        })
    })
})

app.get('/products' , (req , res) =>{
    
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search'
        })
    }
    res.send({
        title : "hello"
    })
})

app.get('/help/*' , (req , res )=>{
    res.render('404' , {
        errorMessage : 'Help article not found',
        title : '404',
        name : 'Wayner'
    })
})

app.get('*' , (req , res) =>{
    res.render('404' , {
        errorMessage : 'Page not found',
        title : '404',
        name : 'Wayner'
    })
})

app.listen( port , ()=>{
    console.log('Server is up on port ' + port)
})