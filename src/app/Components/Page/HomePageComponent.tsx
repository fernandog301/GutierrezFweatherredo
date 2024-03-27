'use client'
import { useEffect, useState } from 'react';
import localStorage from '../../LocalStorage/localStorage';
import './HomePageStyling';
import { FetchGeoLocation, FetchGeoLocationByLat } from '../../DataService/GetWeatherApi'
import { GeoLocation } from '../../DataService/Interfaces'

const HomePageComponent = () => {

  const [userInput, setUserInput] = useState<string>("Stockton");
  const [dataGeoLocation, setDataGeoLocation] = useState<GeoLocation>();
  const [dataGeoLocationByLat, setDataGeoLocationByLat] = useState<GeoLocation>();
  useEffect(() =>{
      const getData = async () =>{
          const geoLocation = await FetchGeoLocation(userInput);
          const geoData: GeoLocation = geoLocation;
          const getLocationByLat = await FetchGeoLocationByLat(String(geoData.coord.lat), String(geoData.coord.lon));
          const getDataByLat: GeoLocation = getLocationByLat;
          setDataGeoLocationByLat(getDataByLat);
          console.log(geoLocation);
      }
      getData();
  }, [userInput])


  return (
    <div className='background'>
      
    </div>
  )
}

export default HomePageComponent
