"use client";
import React, { useEffect, useState } from "react";
// import './HomePageStyling';
import {
  getLocalStorage,
  removeLocalStorage,
  saveToLocalStorage,
} from "../../LocalStorage/localStorage";
import { GeoLocation } from "../../DataService/Interfaces";
import Favorites from "../../Assets/bookmark-simple.png";
import CloudFoggy from "../../Assets/cloud-fog.png";
import CloudRainy from "../Assets/cloud-rain.png";
import CloudSnowing from "../../Assets/cloud-snow.png";
import Cloudy from "../Assets/cloud.png";
import Sun from "../Assets/sun.png";
import SearchIcon from "../Assets/magnifying-glass.png";
import { StaticImageData } from "next/image";
import { Day5Forecast } from "@/app/DataService/FiveDayForcast";
import UnFav from "../../Assets/bookmark-simple-fill.png";
import {
  FetchGeoLocationByLat,
  FetchLocationName,
  Get5Day,
  FetchGeoLocation,
  fetchData,
} from "@/app/DataService/GetWeatherApi";
import SearchComponent from "../SearchComponent";

const HomePageComponent = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [dataGeoLocationByLat, setDataGeoLocationByLat] =
    useState<GeoLocation | null>(null);
  const [dataGeoLocation, setDataGeoLocation] = useState<GeoLocation | null>(
    null
  );
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentToday, setCurrentToday] = useState<string>("");
  const [largeWeatherIcon, setLargeWeatherIcon] =
    useState<StaticImageData>(Sun);
  const [geoLat, setGeoLat] = useState<string>("");
  const [geoLon, setGeoLon] = useState<string>("");
  const [day5Forcast, setDay5Forcast] = useState<Day5Forecast>();
  const [forcastData5, setForcastData5] = useState<Array<any>>([""]);
  const [localName, setLocalName] = useState<string>("");
  const [saveData, setSaveData] = useState<string[] | undefined>();
  const [geoFetched, setGeoFetched] = useState<boolean>(false);
  const [favIcon, setFavIcon] = useState<StaticImageData>(UnFav);
  const [toggleBool, setToggleBool] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favorites = getLocalStorage();
        const isFavorite = favorites.some(
          (Favorites: string) => Favorites === userInput
        );
        setFavIcon(isFavorite ? Favorites : UnFav);

        const geoData = await FetchGeoLocation(userInput);
        setDataGeoLocationByLat(geoData);

        const locationByLat = await FetchGeoLocationByLat(
          String(geoData.coord.lat),
          String(geoData.coord.lon)
        );
        setDataGeoLocationByLat(locationByLat);

        const day5 = await Get5Day(
          String(locationByLat.coord.lat),
          String(locationByLat.coord.lon)
        );
        setDay5Forcast(day5);

        const forecastData = [];
        if (day5) {
          for (let i = 0; i < day5.list.length; i += 8) {
            let highestTemp = day5.list[i].main.temp_max;
            let lowestTemp = day5.list[i].main.temp_min;
            let weatherDesc = day5.list[i].weather[0].description;
            for (let j = i + 1; j < i + 8; j++) {
              const item = day5.list[j];
              highestTemp = Math.max(highestTemp, item.main.temp_max);
              lowestTemp = Math.min(lowestTemp, item.main.temp_min);
            }

            forecastData.push({
              highestTemp: Math.round(highestTemp),
              lowestTemp: Math.round(lowestTemp),
              weatherIcon: weatherDesc,
            });
          }
          setForcastData5(forecastData);
        }

        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const amOrPm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        setCurrentTime(`${formattedHours}:${formattedMinutes} ${amOrPm}`);

        const allMonths = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const allDays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const day = currentTime.getDate();
        const month = allMonths[currentTime.getMonth()];
        const year = currentTime.getFullYear();
        const todayDay = allDays[currentTime.getDay()];
        setCurrentToday(todayDay);
        setCurrentDate(`${month} ${day}, ${year}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    if (typeof navigator !== "undefined") {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.error("navigator is not available");
    }
  }, [userInput, favIcon, toggleBool]);

  async function success(position: GeolocationPosition) {
    const locoName = await FetchLocationName(
      position.coords.latitude,
      position.coords.longitude
    );
    setLocalName(locoName);
    if (!geoFetched) {
      setUserInput(locoName);
      setGeoFetched(true);
    }
  }
  const [medWeatherIcon, setMedWeatherIcon] = useState<StaticImageData>(Sun);

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
        setMedWeatherIcon(CloudFoggy);
        break;
      case "haze":
        setMedWeatherIcon(CloudFoggy);
        break;
      case "sand/dusk whirls":
        setMedWeatherIcon(CloudFoggy);
        break;
      case "fog":
        setMedWeatherIcon(CloudFoggy);
        break;
      case "sand":
        setMedWeatherIcon(CloudFoggy);
        break;
      case "volcanic ash":
        setMedWeatherIcon(CloudFoggy);
        break;
      case "squalls":
        setMedWeatherIcon(CloudFoggy);
        break;
      case "tornado":
        setMedWeatherIcon(CloudFoggy);
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
      default:
        setMedWeatherIcon(Cloudy);
    }
  }
  const handleFavorite = () => {
    const locationName = dataGeoLocationByLat?.name;
    if (locationName) {
      const favorites = getLocalStorage();
      const isAlreadyFavorite = favorites.some(
        (fav: string) => fav === locationName
      );
      if (isAlreadyFavorite) {
        setFavIcon(UnFav);
        removeLocalStorage(locationName);
      } else {
        setFavIcon(Favorites);
        saveToLocalStorage(locationName);
      }
    }
  };

  const handleRemoveFavorite = (input: string) => {
    removeLocalStorage(input);
    setToggleBool(!toggleBool);
  };

  function renderForecastDays(): React.ReactNode {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="backgroundImage font-[Inter]">
      <div className="grid grid-cols-8 md:grid-cols-10">
        <div className="col-span-12 md:col-span-2 favoriteBg  order-2 md:order-1">
          <div className="hidden md:block">
            <SearchComponent setUserInput={setUserInput} />
          </div>
          <p className="font-[Inter] text-[24px] text-white ml-[17px] mt-[30px]">
            Favorites
          </p>
          {/* <div>
            {saveData &&
              saveData.map((favorite: string, index: number) => (
                <FavoriteComponent
                  key={index}
                  name={favorite}
                  setUserInput={setUserInput}
                  removeFav={handleRemoveFavorite}
                />
              ))}{" "} */}
          {/* </div> */}
        </div>
        <div className="col-span-8 px-10 md:px-[100px] order-1 md:order-2">
          <div className="block md:hidden">
            <SearchComponent setUserInput={`${setUserInput}`} />
          </div>
          <div className="grid-flow-row pt-10 md:pt-[154px]">
            <div className="grid grid-cols-11 gap-x-5">
              <div className="flex flex-col items-center text-white col-span-12 md:col-span-4 order-2 md:order-1">
                <img
                  src={`${largeWeatherIcon}`}
                  alt="Sunny Large"
                  className="pb-10 md:pb-[82px]"
                />
                <p className="text-[24px]">
                  {dataGeoLocationByLat &&
                    dataGeoLocationByLat.weather &&
                    dataGeoLocationByLat.weather[0] &&
                    String(dataGeoLocationByLat.weather[0].description)}
                </p>
              </div>

              <div className="flex flex-col items-center text-white col-span-12 md:col-span-4 order-1 md:order-2 pb-10">
                <div className="flex items-center">
                  <p className="text-[50px] text-center">
                    {dataGeoLocationByLat?.name}
                  </p>
                  <img
                    src={`${favIcon}`}
                    onClick={handleFavorite}
                    className="block md:hidden w-[27px] h-[27px] ml-5"
                    alt="UnFav"
                  />
                </div>
                <div className="text-[100px]">
                  <p>
                    {dataGeoLocationByLat?.main &&
                    typeof dataGeoLocationByLat.main.temp !== "undefined"
                      ? `${Math.round(
                          Number(dataGeoLocationByLat.main.temp)
                        )}°F`
                      : "N/A"}
                  </p>
                </div>

                <div className="flex flex-row text-[27px]">
                  <p className="pr-3">
                    H:{" "}
                    <span>
                      {dataGeoLocationByLat?.main &&
                      typeof dataGeoLocationByLat.main.temp_max !== "undefined"
                        ? `${Math.round(
                            Number(dataGeoLocationByLat.main.temp_max)
                          )}`
                        : "N/A"}
                    </span>
                  </p>
                  <p>
                    L:{" "}
                    <span>
                      {dataGeoLocationByLat?.main &&
                      typeof dataGeoLocationByLat.main.temp_min !== "undefined"
                        ? `${Math.round(
                            Number(dataGeoLocationByLat.main.temp_min)
                          )}`
                        : "N/A"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex justify-between flex-col items-center md:items-end text-center md:text-right text-white col-span-12 md:col-span-3 order-3 md:order-3">
                <div className="">
                  <img
                    src={`${favIcon}`}
                    onClick={handleFavorite}
                    className="cursor-pointer hidden md:block w-[27px] h-[27px] ml-5"
                    alt="UnFav"
                  />
                </div>
                <div className="text-[24px]">
                  <p>{currentToday}</p>
                  <p>{currentTime}</p>
                  <p>{currentDate}</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-[95px] mb-[41px] " />
          <div className="grid-flow-row pb-5">
            <div className="flex justify-between flex-col md:flex-row">
              {renderForecastDays()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageComponent;
