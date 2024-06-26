import React from "react";
import { useState,useEffect } from "react";

export default function MainDisplay({Data,Forecast}){
    const [gifUrl,setUrl]=useState('')

    const Temp=Math.round(Data.Temperature.Metric.Value);
    const Cond=Data.WeatherText;
    const Icon=Data.WeatherIcon;
    const Hi=Math.round(Data.TemperatureSummary.Past12HourRange.Maximum.Metric.Value);
    const Low=Math.round(Data.TemperatureSummary.Past12HourRange.Minimum.Metric.Value);
    const Uv=Data.UVIndex;
    const Wind=Math.round(Data.Wind.Speed.Metric.Value);
    const Hum=Data.RelativeHumidity;
    const Cloud=Data.CloudCover;

    
    useEffect(() => {
        if(Icon==6||Icon==7||Icon==8||Icon==19||Icon==37||Icon==38||Icon==43)
            setUrl('src/assets/clouds.gif')
        else if(Icon==4||Icon==5)
            setUrl('src/assets/cloudy.gif')
        else if(Icon==12||Icon==13||Icon==14||Icon==39||Icon==40)
            setUrl('src/assets/drizzle.gif')
        else if(Icon==11||Icon==32)
            setUrl('src/assets/foggyy.gif')
        else if(Icon==24||Icon==25||Icon==26)
            setUrl('src/assets/hail.mp4')
        else if(Icon==35||Icon==36)
            setUrl('src/assets/moon.gif')
        else if(Icon==33||Icon==35)
            setUrl('src/assets/night.gif')
        else if(Icon==13||Icon==14||Icon==16||Icon==17||Icon==21)
            setUrl('src/assets/rain (1).gif')
        else if(Icon==15||Icon==16||Icon==18||Icon==19||Icon==20||Icon==29||Icon==41||Icon==42||Icon==43)
            setUrl('src/assets/rain.gif')
        else if(Icon==22||Icon==23||Icon==44)
            setUrl('src/assets/snow.gif')
        else if(Icon==1||Icon==2||Icon==3)
            setUrl('src/assets/sun.gif')
        // console.log(Forecast[0].Temperature.Value);
    }, [Cond]);

    return(
        <div style={{backgroundColor:'#33cccc',padding:'5%'}}>
            <div className="flex flex-row h-1/4">
                <div>
                    <h1>{Temp}&deg;</h1>
                    <h2>{Cond}</h2>
                    <div>{Hi}</div>
                    <div>{Low}</div>
                </div>
                
                    <img id="gifImg" src={gifUrl}/>
                
            </div>
            <h2>Current Conditions</h2>
            <div className="grid grid-cols-2 gap-2 p-4">
                <div class="backdrop-brightness-75 p-4 max-w-50 border border-transparent rounded-md">Humidity: {Hum}</div>
                <div class="backdrop-brightness-75 p-4 max-w-50 border border-transparent rounded-md">Wind Speed: {Wind}</div>
                <div class="backdrop-brightness-75 p-4 max-w-50 border border-transparent rounded-md">UV Index: {Uv}</div>
                <div class="backdrop-brightness-75 p-4 max-w-50 border border-transparent rounded-md">Clound Cover: {Cloud}</div>
            </div>
            <div className="overflow-x-auto">
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
            </div>
        </div>
    )
}