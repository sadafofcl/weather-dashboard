import './App.css'
import CurrentWeather from './components/CurrentWeather';
import FiveDayForcast from './components/FiveDayForcast';
import Header from './components/Header';
import useFetch from './hooks/useFetch';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import Footer from './components/Footer';
import NetworkComponent from './components/NetworkComponent';
import CurrentLocation from './components/CurrentLocation';

function App() {
 const [city, setCity] = useState<string>("")
  const { currWeatherData, forcastData, loading, error, fetchWeatherByCoords}=useFetch({city});
  const [resetSearch, setResetSearch] = useState(false);


  return (
    <>
      <Header/>
      <NetworkComponent/>
      <SearchBar setCity={setCity} resetSearch={resetSearch}/>
      <CurrentLocation fetchWeatherByCoords={async (lat, lon) => {
    const cityName = await fetchWeatherByCoords(lat, lon);
    if (cityName) {
      setCity(cityName);
    }
  }} setResetSearch={setResetSearch}/>
      <CurrentWeather city={city} currWeatherData={currWeatherData} loading={loading} error={error} />
      <FiveDayForcast city={city} forcastData={forcastData} loading={loading} error={error}/>
      <Footer/>
    </>
  )
}

export default App
