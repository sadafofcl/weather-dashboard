import { useState, useEffect } from "react";
interface props{
    city:string
}
export default function useFetch({city}:props){
    const [currWeatherData, setCurrWeatherData]=useState<any|null>(null);
    const [forcastData, setForcastData]=useState<any|null>(null);
    const [loading, setLoading]=useState<boolean>(false);
    const [error,setError]=useState<string | null>(null);


    useEffect(()=>{
        if(!city) return;
            async function fetchingData(){
                try{
                    setLoading(true)
                    setError(null)

                    const todaysData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=34f1a0bb9f6e351772d63ee557da9c6e&units=metric`);

                    if(!todaysData.ok) throw new Error("error in fetching today's data")
                    const todaysDataJson = await todaysData.json();
                    setCurrWeatherData(todaysDataJson);
                    
                    //will make it reusable 
                    
                    const forcastingData=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=34f1a0bb9f6e351772d63ee557da9c6e&units=metric`);

                    if(!forcastingData.ok) throw new Error("error in fetching forcasting data")
                    const forcastingDataJson = await forcastingData.json();
                    setForcastData(forcastingDataJson);

                }
                catch(e:any){
                    setError(e.message);
                }
                finally{
                    // setTimeout(()=>setLoading(false),4000)
                    setLoading(false)
                }
            }
            fetchingData();
    } ,[city] )

    return {currWeatherData, setCurrWeatherData ,forcastData, loading,error}
}