import { createContext,useEffect } from "react";
import type { ReactNode } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

interface providerChildrenProps{
    children:ReactNode
}
interface themeContextType{
    currTheme:"light"|"dark",
    toggleTheme:()=>void
}

export const ThemeContext = createContext<themeContextType>({ currTheme:"dark" , toggleTheme:()=>{} });

export const ThemeContextProvider = ({children}:providerChildrenProps) => {
    const [currTheme, setCurrTheme]=useLocalStorage<"light"|"dark">("theme","dark");
    const toggleTheme=()=>{
            setCurrTheme(prev=>(prev=="light"?"dark":"light"))
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
