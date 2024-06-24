import React from "react";
import { useState,useEffect } from "react";

export default function MainDisplay({Data,Forecast}){
    const [gifUrl,setUrl]=useState('')

    const Temp=Data.Temperature.Metric.Value;
    const Cond=Data.WeatherText;
    const Hi=Data.TemperatureSummary.Past12HourRange.Maximum.Metric.Value;
    const Low=Data.TemperatureSummary.Past12HourRange.Minimum.Metric.Value;
    const Uv=Data.UVIndex;
    const Wind=Data.Wind.Speed.Metric.Value;
    const Hum=Data.RelativeHumidity;
    const Cloud=Data.CloudCover;

    
    useEffect(() => {
        switch (Cond) {
            case 'Sunny':setUrl('src/assets/sun.gif');break;
            case 'Cloudy':setUrl('src/assets/clouds.gif');break;
            case 'Mist' :setUrl('stc/assets/foggy.gif');break;
            case 'Fog' :setUrl('stc/assets/foggy.gif');break;
            default: setUrl('');
        }
        // console.log(Forecast[0].Temperature.Value);
    }, [Cond]);

    return(
        <div style={{backgroundColor:'blue'}}>
            <div className="flex flex-row h-1/4">
                <div>
                    <h1>{Temp}&deg;C</h1>
                    <h2>{Cond}</h2>
                    <div>{Hi}</div>
                    <div>{Low}</div>
                </div>
                <div>
                    <img id="gifImg" src={gifUrl}/>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4">
                <div class="backdrop-brightness-75 p-4 max-w-50 border border-transparent rounded-md">Humidity: {Hum}</div>
                <div class="backdrop-brightness-75 p-4 max-w-50 border border-transparent rounded-md">Wind Speed: {Wind}</div>
                <div class="backdrop-brightness-75 p-4 max-w-50 border border-transparent rounded-md">UV Index: {Uv}</div>
                <div class="backdrop-brightness-75 p-4 max-w-50 border border-transparent rounded-md">Clound Cover: {Cloud}</div>
            </div>
            {/* <div className="overflow-x-auto">
                <table>
                    <thead>
                        <tr>{Forecast.map((obj)=>{
                            return(
                                <th>{obj.DateTime.slice(11,16)}</th>
                            )
                        })}</tr>
                    </thead>
                    <tbody>
                        <tr>{Forecast.map((obj)=>{
                            return(
                                <td>{obj.IconPhrase}</td>
                            )
                        })}</tr>
                        <tr>{Forecast.map((obj)=>{
                            return(
                                <td>{obj.Temperature.Value}</td>
                            )
                        })}</tr>
                        <tr>{Forecast.map((obj)=>{
                            return(
                                <td>{obj.PrecipitationProbability}</td>
                            )
                        })}</tr>
                    </tbody>
                </table>
            </div> */}
        </div>
    )
}