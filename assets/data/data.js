import React from 'react'
import {View} from 'react-native'


const ApiReader = () => {

    const apiKey = 'e0a82fe697dc85291bdc9349e26e8cfc'

    const lat = 38
    
    const long = -122.08

    const cityName  = 'rouen' 
    
    
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    
    console.log(url)

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })

return (

<View></View>

)
}

export default ApiReader