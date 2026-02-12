import './App.css'
import CurrentWeather from './components/CurrentWeather';
import FiveDayForcast from './components/FiveDayForcast';
import Header from './components/Header';
import useFetch from './hooks/useFetch';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import Footer from './components/Footer';
import NetworkComponent from './components/NetworkComponent';

function App() {
 const [city, setCity] = useState<string>("Mohali, Punjab, IN")
  const { currWeatherData, forcastData, loading, error}=useFetch({city});

  return (
    <>
      <Header/>
      <NetworkComponent/>
      <SearchBar setCity={setCity}/>
      <CurrentWeather city={city} currWeatherData={currWeatherData} loading={loading} error={error}/>
      <FiveDayForcast city={city} forcastData={forcastData} loading={loading} error={error}/>
      <Footer/>
    </>
  )
}

export default App
