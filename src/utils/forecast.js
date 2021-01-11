const request = require('request')

forecast=(addres , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a79bdf513617725787edacb38122a060&%20query='+ 
    encodeURIComponent(addres)+
    '&units=f'
    request({url,  json : true} , (error, {body}) =>{
        if(error){
            callback("Unable to connect to weather services!" , undefined)
        }else if(body.error){
            callback("Unable to find location" , undefined)
        }else{
            

            callback(undefined , {
                weather_descriptions : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feelslike : body.current.feelslike   
            })
        }
    })
}

module.exports = forecast