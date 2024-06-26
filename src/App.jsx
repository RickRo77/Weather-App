import { useState, useEffect } from 'react';
import axios from 'axios';
import MainDisplay from './components/MainDisplay';

function App() {
    const [Data, setData] = useState(null);
    const [Forecast, setForecast] = useState(null);
    const [PlaceKey, setPlaceKey] = useState('');
    const apiKey = '8PvjAV1hFU739FVOMhEAokrRbMxAGcPW';
    const LocationUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const CurrentUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const ForecastUrl = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/';

    useEffect(() => {
        const fetchPlaceData = async () => {
            const axiosInstance = axios.create({
                params: {
                    'apikey': apiKey,
                    'q': 'Mangalore',
                },
            });
            try {
                const response = await axiosInstance.get(LocationUrl);
                setPlaceKey(response.data[0].Key);
                console.log('PlaceKey fetched:', response.data[0].Key);
            } catch (error) {
                console.error('Error fetching place data:', error);
            }
        };

        fetchPlaceData();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

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
        <div className="App">
            {Data ? <MainDisplay Data={Data} Forecast={Forecast}/> : <p>Loading...</p>}
        </div>
    );
}

export default App;
