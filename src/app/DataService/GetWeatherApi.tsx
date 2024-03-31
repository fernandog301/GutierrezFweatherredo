import { Day5Forecast } from "./FiveDayForcast";
import { GeoLocation } from "./Interfaces";

export const ApiKey = 'f86e3df09941ea6ed9ee289a745f4331';

export const fetchData = async (lat:string , long:string ) =>{
const promise = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${ApiKey}&units=imperial`);
const data: GeoLocation  = await promise.json();
return data;
};


export const FetchGeoLocation = async (searchInput: string) => {
    const promise = await fetch(`
    https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${ApiKey}&units=imperial`)
    const data: GeoLocation  = await promise.json();
    return data;
};
export const Get5Day = async (lat: string, lon: string) => {
    const promise = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=imperial`);
    const data: Day5Forecast = await promise.json();
    return data;
}
export const FetchGeoLocationByLat = async (lat: string | number, lon: string | number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=imperial`)
    const data: GeoLocation = await promise.json();
    return data;
}


export const FetchLocationName = async (lat: string | number, lon: string | number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=imperial`)
    const data: GeoLocation = await promise.json();
    return data.name;
}
