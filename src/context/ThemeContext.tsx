import { createContext,useEffect, useState } from "react";
import type { ReactNode } from "react";

interface providerChildrenProps{
    children:ReactNode
}
interface themeContextType{
    currTheme:string|undefined,
    toggleTheme:()=>void
}

export const ThemeContext = createContext<themeContextType>({ currTheme:"dark" , toggleTheme:()=>{} });

export const ThemeContextProvider = ({children}:providerChildrenProps) => {
    const [currTheme, setCurrTheme]=useState<string>("dark");
    const toggleTheme=()=>{
            setCurrTheme(prev=>prev=="light"?"dark":"light")
        }
        useEffect(() => {
            document.documentElement.classList.toggle("dark", currTheme === "dark");
            }, [currTheme]);

    return (
        < ThemeContext.Provider value ={ {currTheme , toggleTheme} }>
            {children}
        </ ThemeContext.Provider>
    );
}
