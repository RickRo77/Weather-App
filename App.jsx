import { useState, useEffect } from 'react';
import axios from 'axios';
import MainDisplay from './src/components/MainDisplay';
import SearchBar from './src/components/SearchBar';

function App() {
    const [Location, setLocation] = useState('');
    const [Data, setData] = useState(null);
    const [Forecast, setForecast] = useState(null);
    const [PlaceKey, setPlaceKey] = useState('');
    const apiKey = '8PvjAV1hFU739FVOMhEAokrRbMxAGcPW';
    const LocationUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const CurrentUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const ForecastUrl = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/';

    // useEffect(()=>{console.log(Location)},[Location])

    useEffect(() => {
        if(!Location)
            return;
        const fetchPlaceData = async () => {
            const axiosInstance = axios.create({
                params: {
                    'apikey': apiKey,
                    'q': Location,
                },
            });
            try {
                const response = await axiosInstance.get(LocationUrl);
                setPlaceKey(response.data[0].Key);
                console.log('PlaceKey fetched:', response.data[0].Key);
            } catch (error) {
                alert('Please input a valid city name')
                console.error('Error fetching place data:', error);
            }
        };

        fetchPlaceData();
    }, [Location]); // Empty dependency array ensures this runs only once when the component mounts

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!PlaceKey) return;

            const axiosInstance2 = axios.create({
                params: {
                    'apikey': apiKey,
                    'details': true,
                },
            });
            try {
                const response = await axiosInstance2.get(`${CurrentUrl}${PlaceKey}`);
                setData(response.data[0]);
                console.log('Weather data fetched:', response.data[0]);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [PlaceKey]);

    useEffect(() => {
        const fetchForecastData = async () => {
            if (!PlaceKey) return;

            const axiosInstance3 = axios.create({
                params: {
                    'apikey': apiKey,
                    'metric': true,
                },
            });
            try {
                const response = await axiosInstance3.get(`${ForecastUrl}${PlaceKey}`);
                setForecast(response.data);
                console.log('Forecast data fetched:', response.data);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            }
        };

        fetchForecastData();
    }, [PlaceKey]);

    return (
        <div className="App md:flex md:flex-col md:items-center" style={{backgroundColor:'#33cccc',padding:'5%',minHeight:'100vh'}}>
            <SearchBar Location={Location} setLocation={setLocation}></SearchBar>
            {Data ? <MainDisplay Data={Data} Forecast={Forecast} setForecast={setForecast}/> : <p>Enter Location...</p>}
        </div>
    );
}

export default App;
