import { Interface } from "readline";
export const ApiKey = 'f86e3df09941ea6ed9ee289a745f4331';

export const fetchData = async (lat:string , long:string ) =>{
const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${ApiKey}&units=imperial`);
const data: Interface = await promise.json();
return data;
};



export const FetchGeoLocation = async (searchInput: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${ApiKey}&units=imperial`)
    const data: Interface = await promise.json();
    return data;
};
