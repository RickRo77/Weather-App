import React from "react";
import { useState,useEffect } from "react";


export default function MainDisplay({Data,setForecast,Forecast}){
    const [gifUrl,setUrl]=useState('')


    // useEffect(() => {
    //     fetch('src/components/Data.json') // adjust the path based on where your JSON file is located in the public folder
    //         .then(response => response.json())
    //         .then(data => setForecast(data))
    //         .catch(error => console.error('Error loading JSON:', error));
    // }, []);

    const Temp=Math.round(Data.Temperature.Metric.Value);
    const Cond=Data.WeatherText;
    const Icon=Data.WeatherIcon;
    const Hi=Math.round(Data.TemperatureSummary.Past12HourRange.Maximum.Metric.Value);
    const Low=Math.round(Data.TemperatureSummary.Past12HourRange.Minimum.Metric.Value);
    const Uv=Data.UVIndex;
    const Wind=Math.round(Data.Wind.Speed.Metric.Value);
    const Hum=Data.RelativeHumidity;
    const Cloud=Data.CloudCover;

    
    // const Temp=Math.round(27);
    // const Cond='Cloudy';
    // const Icon=19;
    // const Hi=Math.round(32);
    // const Low=Math.round(24);
    // const Uv=4;
    // const Wind=Math.round(15);
    // const Hum=90;
    // const Cloud=70;

    
    useEffect(() => {
        if(Icon==6||Icon==7||Icon==8||Icon==19||Icon==37||Icon==38||Icon==43)
            setUrl('../assets/clouds.gif')
        else if(Icon==4||Icon==5)
            setUrl('../assets/cloudy.gif')
        else if(Icon==12||Icon==13||Icon==14||Icon==39||Icon==40)
            setUrl('../assets/drizzle.gif')
        else if(Icon==11||Icon==32)
            setUrl('../assets/foggyy.gif')
        else if(Icon==24||Icon==25||Icon==26)
            setUrl('../assets/hail.mp4')
        else if(Icon==35||Icon==36)
            setUrl('../assets/moon.gif')
        else if(Icon==33||Icon==35)
            setUrl('../assets/night.gif')
        else if(Icon==13||Icon==14||Icon==16||Icon==17||Icon==21)
            setUrl('../assets/rain (1).gif')
        else if(Icon==15||Icon==16||Icon==18||Icon==19||Icon==20||Icon==29||Icon==41||Icon==42||Icon==43)
            setUrl('../assets/rain.gif')
        else if(Icon==22||Icon==23||Icon==44)
            setUrl('../assets/snow.gif')
        else if(Icon==1||Icon==2||Icon==3)
            setUrl('../assets/sun.gif')
        // console.log(Forecast[0].Temperature.Value);
    }, [Cond]);

    const box="backdrop-brightness-75 p-2 max-w-50 border border-transparent rounded-md flex flex-row items-center content-center";

    if(Forecast)
        {
            return(
                <div>
                    {/* <div className="flex flex-col"> */}
                    <div className="flex flex-row items-center h-[30vh]">
                        <div>
                            <h1>{Temp}&deg;</h1>
                            <h2>{Cond}</h2>
                            <div>{Hi}&deg;/{Low}&deg;</div>
                            {/* <div>{Low}</div> */}
                        </div>
                        <img id="gifImg" src={gifUrl}/>
                        
                    </div>



                    
                    <div className="grid grid-cols-2 gap-2 max-w-screen-md">
                        <div class={box}>
                            <img src="/src/assets/drop.png" className="h-16 w-16 object-contain"></img>
                            <div className="flex flex-col items-center content-center pl-3">
                            <h3>Humidity</h3>
                            <h3>{Hum}</h3>
                            </div>
                        </div>
                        <div class={box}>
                            <img src="/src/assets/wind.png" className="h-16 w-16 object-contain"></img>
                            <div className="flex flex-col items-center content-center pl-3">
                            <h3>Wind</h3>
                            <h3>{Wind}</h3>
                            </div>
                        </div>
                        <div class={box}>
                            <img src="/src/assets/rays.png" className="h-16 w-16 object-contain"></img>
                            <div className="flex flex-col items-center content-center pl-3">
                            <h3>UV Index</h3>
                            <h3>{Uv}</h3>
                            </div>
                        </div>
                        <div class={box}>
                            <img src="/src/assets/cloud.png" className="h-16 w-16 object-contain"></img>
                            <div className="flex flex-col items-center content-center pl-3">
                            <h3>Cloud</h3>
                            <h3>{Cloud}</h3>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}



                    <div className="flex" style={{marginTop:'3vh'}}>
                        <table className="border border-transparent rounded backdrop-brightness-75">
                            <thead>
                                <tr><th>Time</th></tr>
                                <tr><th>Temp</th></tr>
                                <tr><th>Prec</th></tr>
                            </thead>
                        </table>
                        <div className="overflow-x-auto">
                            <table className="border-spacing-4 p-4 backdrop-brightness-75 border border-transparent rounded">
                                <thead>
                                    <tr>{Forecast.map((obj)=>{
                                        return(
                                            <th className="p-2">{obj.DateTime.slice(11,16)}</th>
                                        )
                                    })}</tr>
                                </thead>
                                <tbody>
                                    {/* <tr>{Forecast.map((obj)=>{
                                        return(
                                            <td className="p-2">{obj.IconPhrase}</td>
                                        )
                                    })}</tr> */}
                                    <tr>{Forecast.map((obj)=>{
                                        return(
                                            <td className="p-2 text-center">{Math.round(obj.Temperature.Value)}&deg;</td>
                                        )
                                    })}</tr>
                                    <tr>{Forecast.map((obj)=>{
                                        return(
                                            <td className="p-2 text-center">
                                                {obj.PrecipitationProbability}{'%'}
                                            </td>
                                        )
                                    })}</tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )    
    }
    
}