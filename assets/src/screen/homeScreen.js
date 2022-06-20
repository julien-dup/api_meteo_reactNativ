import React , {useState, useEffect}from "react";
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native'
import { Formik } from 'formik';
import { TextInput, Button } from 'react-native-paper';


const HomeScreen = () => {

    const [image, setImage] = useState('../../img/cielnuageux.jpg')
    console.log(image)
    const [city, setCity] = useState(null);
    const [temp, setTemp] = useState(null);
    const [desc, setDesc] = useState(null);
    const [tempMin, setTempMin] = useState(null);
    const [tempRes, setTempRes] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [windDir, setWindDirection] = useState(null);
    const [sunrise, setSunrise] =useState(null)
    const [sunset, setSunset] =useState(null)
    const [icon, setIcon] =useState(null)
    const [dt, setDt] = useState(null)



    switch (icon) {
        case "01d":
            console.log("Oranges : 0.59 € le kilo.")
            break;
          case "02d":
            console.log("Pommes : 0.32 € le kilo.");
            break;
          case "03d":
            console.log("Bananes : 0.48 € le kilo.");
            break;
          case "04d":
            console.log("Cerises : 3.00 € le kilo.");
            break;
          case "09d":
          case "10d":
            console.log("Mangues et papayes : 2.79 € le kilo.");
            break;
          default:
            console.log("Désolé, nous n'avons plus de " + icon + ".");
      }

    const [textCity, setTextCity] = useState('rouen')

    const apiKey = 'e0a82fe697dc85291bdc9349e26e8cfc'
    const apiKey2 = '45d94b209791f444d49afdcab5067371'

    const cityName  = textCity
    
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    
    console.log(url)

    const test = new Date (dt * 1000)
    console.log(test)
    const test2 = new Date (sunset *1000)
    console.log(test2)
    const hour = new Date(sunrise * 1000).getHours()
    const mn = new Date(sunrise * 1000).getMinutes()
    const hourMNSunrise = (hour + 'h' + mn)
    console.log(hour + 'h' + mn)

    const hourSunset = new Date(sunset * 1000).getHours()
    const mnSunset = new Date(sunset * 1000).getMinutes()
    const hourMNSunset = (hourSunset + 'h' + mnSunset)
    console.log(hourSunset)
    


    // const response = await fetch(url)
    // const data = await response.json()
    // console.log(data)

    React.useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        
        setCity(data.name)
        setTemp(data.main.temp)
        setDesc(data.weather[0].description)
        setTempMin(data.main.feels_like)
        setTempRes(data.main.temp_min)
        setWindSpeed(data.wind.speed)
        setWindDirection(data.wind.deg)
        setSunrise(data.sys.sunrise)
        setSunset(data.sys.sunset)
        setIcon(data.weather[0].icon)
        setDt(data.dt)

       console.log(data)
      
    })
}, [url])
    
    return (
        
        <View style={{flex: 1, justifyContent: 'center'}}>
            <ImageBackground source={require('../../img/skyblue.jpg')} resizeMode= 'cover'>
            <View style ={{alignItems: 'center', marginTop: 16}}>
            <Text style={styles.text}>Votre météo à {city}</Text>
            </View>
            <TextInput
      label="Votre ville"
      value={textCity}
      onChangeText={text => setTextCity(text)}
      style={{borderRadius: 10, backgroundColor: '', marginTop: 32}}
    /> 
            
            <View style={{alignItems: 'center', marginTop: 16, height: 300}}>
                
                <Text>Il fait {temp} °C</Text>
                <Icon name='wi-thermometer'></Icon>
                <Text>Le temps est {desc}</Text>
                <Text>La température ressenties est de  {tempRes}°C</Text>
                <Text>température minimun {tempMin} °C</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 32}}>
                <View style={{flex: 1}}>
                     <Image source={{uri: `http://openweathermap.org/img/wn/${icon}@2x.png`}} style={styles.icon}></Image>
                </View>
                <View style={{ flex: 3}}>
                      <Text>Il fait {temp}°C</Text>
                      <Text>le vent est de {windSpeed} km/h {windDir} deg</Text>
                      <Text>le soleil se lève à {hourMNSunrise}</Text>
                      <Text>le soleil se couche à {hourMNSunset}</Text>
                      <Text>le soleil se lève à {sunrise}</Text>
                      <Text>le soleil se couche à {sunset}</Text>
                      <Text> {dt}</Text>
                 </View>
            </View>
            </ImageBackground>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 32, 
    },
    icon: {
        width:80,
        height: 80
    }
})