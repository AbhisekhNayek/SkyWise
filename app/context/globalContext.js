"use client";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import defaultStates from "../utils/defaultStates";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");
  const [activeCityCoords, setActiveCityCoords] = useState([22.5726, 88.3639]);
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({}); // Fixed typo

  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`); // Added forward slash
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/pollution?lat=${lat}&lon=${lon}`); // Added forward slash
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };

  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/fiveday?lat=${lat}&lon=${lon}`); // Added forward slash
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  const fetchGeoCodedList = async (search) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`); // Added forward slash
      setGeoCodedList(res.data);
    } catch (error) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`); // Added forward slash
      setUvIndex(res.data);
    } catch (error) {
      console.error("Error fetching UV index data: ", error);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    // Check if activeCityCoords are valid before fetching
    if (activeCityCoords.length === 2) {
      fetchForecast(activeCityCoords[0], activeCityCoords[1]);
      fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
      fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
      fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    }
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords, // Pass setActiveCityCoords here
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
