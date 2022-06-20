import React , {useState, useEffect}from "react";
import {View, Text, StyleSheet, ImageBackground, Image, ScrollView} from 'react-native'
import { Formik } from 'formik';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Home = () => {

    const [background, setBackground] =useState (require('../../img/skyblue.jpg'))
    const [color, setColor]= useState ('black')
    
    const [Data, setData] = useState([]);
    const [Data4days, setData4Days] = useState ([])
   
    
    const data = async () => {
       
        let apiKey = '5dd626f3eb3ba9cf9229e81a70218d18'
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&camp&units=metric&lang=fr&appid=${apiKey}&limit=1`);
        console.log(response)
        const json = await response.json();
        console.log(json);
        return json;
    }

    const data4Days = async () => {
        let apiKey = '5dd626f3eb3ba9cf9229e81a70218d18'
        const response4Days = await fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&camp&units=metric&appid=${apiKey}&limit=1`)
        console.log(response4Days)
        const json4day = await response4Days.json()
        console.log(json4day)
        return json4day
    }
    const datainit = async () => {
    await data().then(data => {
            setData(data);
            console.log(data.coord);
          
        }
        ).catch(error => {
            console.log(error);
        }
     )
    }
    const datainit4days = async () => {
        await data4Days().then(data => {
            setData4Days(data)
            console.log(data.city.name)
        }
        ). catch(error => {
            console.log(error)
        }
        )
    }
    useEffect(() => {
        datainit();
    }
    ,[])

    useEffect(() => {
        datainit4days();
    }
    ,[])

    

    const changeBackground = () => {
    const icon = (Data.weather?.[0].icon)
    console.log(icon)
      if (icon==='01d') {
        console.log('01d');
        setBackground(require('../../img/skyblue.jpg'))
        setColor('white')
      } else if (icon==='02d') {
        console.log('02d');
        setBackground(require('../../img/fewClouds.jpg'))
        setColor('white')
      } else if (icon==='03d') {
        console.log('03d');
        setBackground(require('../../img/scaterredClouds.jpg'))
        setColor('black')
      } else if (icon==='04d') {
        console.log('04d');
        setBackground(require('../../img/cielnuageux.jpg'))
        setColor('black')
      } else if (icon==='09d') {
        console.log('09d');
        setBackground(require('../../img/showerRainClouds.jpg'))
        setColor('black')
      } else if (icon==='10d') {
        console.log('10d');
        setBackground(require('../../img/rainClouds.jpg'))
        setColor('white')
      } else if (icon==='11d') {
        console.log('11d');
        setBackground(require('../../img/thunder.png'))
        setColor('white')
      } else if (icon==='13d') {
        console.log('13d');
        setBackground(require('../../img/snow.jpg'))
        setColor('black')
      } else if (icon==='50d') {
        console.log('50d');
        setBackground(require('../../img/mist.jpg'))
        setColor('black')
      } else {
        console.log('01d');
        setBackground(require('../../img/skyblue.jpg'))
        setColor('white')
      }
      
    }

    useEffect(() => {
        changeBackground()
    },[changeBackground])
    

    const [textCity, setTextCity] = useState('caen')
   
    const cityName  = textCity

   const loopHours = []
    for(let i=0; i<9; i++) {
        loopHours.push(
        <View style={{marginLeft: 16, alignItems: 'center'}}>
                    <Text style={{color: (color), fontSize: 16}}>{new Date(Data4days.list?.[i].dt *1000).getHours()}h{new Date (Data.dt *1000).getUTCMinutes()}</Text>
                    <Image source={{uri: `http://openweathermap.org/img/wn/${Data4days.list?.[i].weather[0].icon}@2x.png`}} style={styles.imgPrevious}></Image>
                    <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[i].main.temp} °C</Text>
        </View>
        )
    }

    // const loopDays = []
    // for(let i=9 ; i<30 ; i+8) {
    //     loopDays.push(
    //         <View style={styles.containPrevious}>
    //             <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[i].dt_txt}</Text>
    //             <Image source={{uri: `http://openweathermap.org/img/wn/${Data4days.list?.[i].weather[0].icon}@2x.png`}} style={styles.imgPrevious}></Image>
    //             <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[i].main.temp} °C</Text>
    //         </View>
    //     )
    // }

   
   

    return (

        <ScrollView style={{flex: 1}}>
            <ImageBackground source={background}>
            {(typeof(Data.coord) != "undefined") &&
                
            <View>
           
            <View>
            
            <View style={{alignItems: 'center', marginTop: 8}}>
            <Text style={{color: (color), fontSize: 48}}>{Data.name}</Text>
            </View>
            <View style={{padding: 32}}>
                <TextInput
                icon='glass'
                label="Votre ville"
                value={textCity}
                onChangeText={text => setTextCity(text)}
                onBlur= {()=>datainit()}
                style={{borderRadius: 10, backgroundColor: '#f4f3ee', marginTop: 16, borderRadius: 10}}>
                </TextInput>
            </View>
            </View>
            <View style={{marginTop: 16, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: (color), fontSize: 32}}>Aujourd'hui à {new Date (Data.dt *1000).getHours()}h{new Date (Data.dt *1000).getUTCMinutes()}</Text>
            </View>
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <Image source={{uri: `http://openweathermap.org/img/wn/${Data.weather[0].icon}@2x.png`}} style={styles.img}></Image>
                <View>
                <Text style= {{color: (color), fontSize: 32}}>{Data.main.temp} °C</Text>
                <Text style={{color: (color), fontSize: 16}}>{Data.weather[0].description}</Text>
                </View>
            </View>
            <View style={{}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={styles.containIcon}>
                    <Icon name='temperature-low' color= {color} size={16}></Icon>
                    <Text style={{color: (color), fontSize: 16}}>   {Data.main.temp_min} °C</Text>
                    </View>
                    <View style={styles.containIcon}>
                    <Icon name='temperature-high' color= {color} size={16}></Icon>
                    <Text style={{color: (color), fontSize: 16}}>   {Data.main.temp_max} °C</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 16}}>
                    <Feather name="sunrise" color= {color} size={16}></Feather>
                    <Text style={{color: (color), fontSize: 16}}>  {new Date (Data.sys.sunrise *1000).getHours()}h</Text>
                    <Text style={{color: (color), fontSize: 16}}>{new Date (Data.sys.sunrise *1000).getUTCMinutes()}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 16}}>
                    <Feather name="sunset"color= {color} size={16}></Feather>
                    <Text style={{color: (color), fontSize: 16}}>   {new Date (Data.sys.sunset *1000).getHours()}h</Text>
                    <Text style={{color: (color), fontSize: 16}}>{new Date (Data.sys.sunset *1000).getUTCMinutes()}</Text>
                    </View>
                </View>
                <View style={styles.contain}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Feather name="wind"color= {color} size={16}></Feather>
                        <Text style={{color: (color), fontSize: 16}}>   {Data.wind.speed} km/h </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Feather name="wind"color= {color} size={16}></Feather>
                        <Text style={{color: (color), fontSize: 16}}>   {Data.wind.deg} deg </Text>
                    </View>
                </View>
                <View style={styles.contain}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Feather name="arrow-down"color= {color} size={16}></Feather>
                        <Text style={{color: (color), fontSize: 16}}>   {Data.main.pressure} hP </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Ionicons name='water' color= {color} size={16}></Ionicons>
                        <Text style={{color: (color), fontSize: 16}}>  {Data.main.humidity} % </Text>
                    </View>
                    
                </View>
                
            </View>
            
            <View style={{alignItems: 'center', marginTop: 32}}>
                <Text style={{color: (color), fontSize: 32}}>Prévisions</Text>
            </View>
            <ScrollView horizontal={true} style={{marginTop: 32, marginBottom: 16}}>
                <View  style={{flexDirection: 'row'}}>                    
                    {loopHours}          
                </View>
            </ScrollView>

            {/* {loopDays} */}

            <View style={styles.containPrevious}>
                <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[9].dt_txt}</Text>
                <Image source={{uri: `http://openweathermap.org/img/wn/${Data4days.list?.[9].weather[0].icon}@2x.png`}} style={styles.imgPrevious}></Image>
                <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[9].main.temp} °C</Text>
            </View>

            <View style={styles.containPrevious}>
                <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[17].dt_txt}</Text>
                <Image source={{uri: `http://openweathermap.org/img/wn/${Data4days.list?.[17].weather[0].icon}@2x.png`}} style={styles.imgPrevious}></Image>
                <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[17].main.temp} °C</Text>
            </View>

            <View style={styles.containPrevious}>
                <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[25].dt_txt}</Text>
                <Image source={{uri: `http://openweathermap.org/img/wn/${Data4days.list?.[25].weather[0].icon}@2x.png`}} style={styles.imgPrevious}></Image>
                <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[25].main.temp} °C</Text>
            </View>

            <View style={styles.containPrevious}>
                <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[33].dt_txt}</Text>
                <Image source={{uri: `http://openweathermap.org/img/wn/${Data4days.list?.[33].weather[0].icon}@2x.png`}} style={styles.imgPrevious}></Image>
                <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[33].main.temp} °C</Text>
            </View>

            <View style={styles.containPrevious}>
                <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[39].dt_txt}</Text>
                <Image source={{uri: `http://openweathermap.org/img/wn/${Data4days.list?.[39].weather[0].icon}@2x.png`}} style={styles.imgPrevious}></Image>
                <Text style={{color: (color), fontSize: 16}}>{Data4days.list?.[39].main.temp} °C</Text>
            </View>

            
            </View>
            }
          </ImageBackground>
        </ScrollView>
       
    )
}


export default Home

const styles = StyleSheet.create({
    img: {
        height: 160,
        width: 160
    },
    imgPrevious: {
        height: 80,
        width: 80
    },
    contain: {
        flexDirection: 'row',
        alignItems: 'space-around',
        marginTop: 16
    },
    containPrevious: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        justifyContent: 'space-around',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10, 
        margin: 8
    },
    containIcon: {
        flexDirection: 'row', 
        alignItems: 'center'
    }
})