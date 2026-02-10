import { useEffect, useState } from "react";

export default function useDebounce<T>(value:T, delay=500){

    const [debounceValue,setDebounceValue]=useState(value)

    useEffect( ()=> {
        const timerID=setTimeout(()=>setDebounceValue(value),delay);
        return ()=>clearTimeout(timerID)
        } 
    ,[value] )
    
    return debounceValue;
}