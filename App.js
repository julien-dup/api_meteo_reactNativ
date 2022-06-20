import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ApiReader from './assets/data/data';
import HomeScreen from './assets/src/screen/homeScreen';
import {Provider as PaperProvider}  from 'react-native-paper'
import Home from './assets/src/screen/Home';

export default function App() {
  return (
    <PaperProvider>
   <Home />   
   </PaperProvider>
  );
}


