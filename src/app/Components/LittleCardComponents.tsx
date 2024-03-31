import React, { useEffect, useState } from "react";
import cloudFoggy from '../Assets/cloud-fog.png';
import CloudRainy from '../Assets/cloud-rain.png'
import CloudSnowing from '../Assets/cloud-snow.png'
import Cloudy from '../Assets/cloud.png'
import Sun from '../Assets/sun.png'
import { StaticImageData } from "next/image";

const LittleCardComponents = (props: {
  numberOfWeek: string;
  background: string
  nameOfWeek: string;
  icon: string;
  upArrowPicture: string;
  downArrowPicture: string
  HighNumber: string;
  LowNumber: string;
}) => {

  const [medWeatherIcon, setMedWeatherIcon] = useState<StaticImageData>(Sun);
    useEffect(() => {
        WeatherIcon(props.icon);
    }, [])
    
    function WeatherIcon(weatherCondition: string) {
    switch (weatherCondition) {
        case "rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "clear sky":
            setMedWeatherIcon(Sun);
            break;
        case "few clouds":
            setMedWeatherIcon(Cloudy);
            break;
        case "scattered clouds":
            setMedWeatherIcon(Cloudy);
            break;
        case "broken clouds":
            setMedWeatherIcon(Cloudy);
            break;
        case "shower rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "thunderstorm":
            setMedWeatherIcon(CloudRainy);
            break;
        case "snow":
            setMedWeatherIcon(CloudRainy);
            break;
        case "mist":
            setMedWeatherIcon(Sun);
            break;
        case "light rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "smoke":
            setMedWeatherIcon(cloudFoggy);
            break;
        case "haze":
            setMedWeatherIcon(cloudFoggy);
            break;
        case "sand/dusk whirls":
            setMedWeatherIcon(cloudFoggy);
            break;
        case "fog":
            setMedWeatherIcon(cloudFoggy);
            break;
        case "sand":
            setMedWeatherIcon(cloudFoggy);
            break;
        case "volcanic ash":
            setMedWeatherIcon(cloudFoggy);
            break;
        case "squalls":
            setMedWeatherIcon(cloudFoggy);
            break;
        case "tornado":
            setMedWeatherIcon(cloudFoggy);
            break;
        case "overcast clouds":
            setMedWeatherIcon(Cloudy);
            break;
        case "light snow":
            setMedWeatherIcon(CloudSnowing);

            break;
        case "heavy snow":
            setMedWeatherIcon(CloudSnowing);
            break;
        case "sleet":
            setMedWeatherIcon(CloudSnowing);
            break;
        case "light shower sleet":
            setMedWeatherIcon(CloudSnowing);
            break;
        case "shower sleet":
            setMedWeatherIcon(CloudSnowing);
            break;
        case "light rain and snow":
            setMedWeatherIcon(CloudSnowing);
            break;
        case "rain and snow":
            setMedWeatherIcon(CloudSnowing);
            break;
        case "light shower snow":
            setMedWeatherIcon(CloudSnowing);
            break;
        case "shower snow":
            setMedWeatherIcon(CloudSnowing);
            break;
        case "heavy shower snow":
            setMedWeatherIcon(CloudRainy);
            break;
        case "moderate rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "heavy intensity rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "very heavy rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "extreme rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "freezing rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "light intensity shower rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "shower rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "heavy intensity shower rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "ragged shower rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "light intensity drizzle":
            setMedWeatherIcon(CloudRainy);
            break;
        case "dizzle":
            setMedWeatherIcon(CloudRainy);
            break;
        case "heavy intensity drizzle":
            setMedWeatherIcon(CloudRainy);
            break;
        case "light intensity drizzle rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "drizzle rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "heavy intensity drizzle rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "shower rain and drizzle":
            setMedWeatherIcon(CloudRainy);
            break;
        case "heavy shower rain and drizzle":
            setMedWeatherIcon(CloudRainy);
            break;
        case "shower drizzle":
            setMedWeatherIcon(CloudRainy);
            break;
        case "thunderstorm with light rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "thunderstorm with rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "thunderstorm with heavy rain":
            setMedWeatherIcon(CloudRainy);
            break;
        case "light thunderstorm":
            setMedWeatherIcon(CloudRainy);
            break;
        case "heavy thunderstorm":
            setMedWeatherIcon(CloudRainy);
            break;
        case "ragged thunderstorm":
            setMedWeatherIcon(CloudRainy);
            break;
        case "thunderstorm with light drizzle":
            setMedWeatherIcon(CloudRainy);
            break;
        case "thunderstorm with drizzle":
            setMedWeatherIcon(CloudRainy);
            break;
        case "thunderstorm with heavy drizzle":
            setMedWeatherIcon(CloudRainy);
            break;
        default: setMedWeatherIcon(Cloudy);
    }
}

  return (
    <div>
      <div className="container">
        <div className={props.background}>
          <div>
            <h1>
              {props.nameOfWeek}
              {props.numberOfWeek}
            </h1>
          </div>

          <img src={`${medWeatherIcon}`} alt="Cloudy Med" />
          <div><img className="" src={props.upArrowPicture} alt="Up Arrow Picture"/><h1>H: {props.HighNumber}</h1>
          <img className="" src={props.downArrowPicture} alt="Down Arrow Picture"/><h1>L: {props.LowNumber}</h1></div>
        </div>
      </div>
    </div>
  );
};

export default LittleCardComponents;
