import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
    // Define the API key and URL
    const apiKey = '8PvjAV1hFU739FVOMhEAokrRbMxAGcPW'; // Replace 'YOUR_API_KEY' with your actual API key
    const url1 = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    let url2='http://dataservice.accuweather.com/currentconditions/v1/'
    let placeKey;

    // Create an instance of Axios with the API key
    // Function to fetch weather data
    const fetchPlaceData = async () => {
      const axiosInstance = axios.create({
        // headers: {
        //   'apikey': apiKey,
        // },
        params: {
          'apikey':apiKey,
          'q':'Melbourne',
        },
      });
      try {
        const response = await axiosInstance.get(url1);
        placeKey=(response.data[0].Key);
        console.log(response);
      } catch (error) {
        console.log('eeerror');
      }
    };

    const fetchWeatherData = async () => {
      const axiosInstance2 = axios.create({
        // headers: {
        //   'apikey': apiKey,
        // },
        params: {
          'apikey':apiKey,
          'details':true,
        },
      });
      try {
        const response = await axiosInstance2.get(url2+placeKey);
        // console.log(url2+placeKey);
        console.log(response.data[0]);
      } catch (error) {
        console.log('eeerror');
      }
    };

    // Call the function to fetch data
    async function call (){
    await fetchPlaceData();
    await fetchWeatherData();
    }

    call();
  }

export default App
