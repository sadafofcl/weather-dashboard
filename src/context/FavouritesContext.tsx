import { createContext } from "react";
import type { ReactNode } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

interface favouritesListType{
            id:number,
            favCity:string,
            added:boolean
}

interface favouritesContextTypes{
    favouritesList : favouritesListType[],
    addToFavourites:(city:string)=>void ,
    removeFromFavourites:(favCity:string)=>void,
}

export const FavouritesContext = createContext<favouritesContextTypes>({
    favouritesList : [],
    addToFavourites :()=>{},
    removeFromFavourites: ()=>{},
})

export const FavouritesContextProvider = ({children}:{children:ReactNode}) => 
{
    const [ favouritesList , setFavouritesList ]=useLocalStorage<favouritesListType[]>("favs",[]);
    
    const addToFavourites = (city:string) => {
        setFavouritesList(prev => {
            if (prev.some(item => item.favCity === city)) return prev;
            return [{
                id: Date.now(),
                favCity: city,
                added: true
            },
             ...prev ]
    })
    }

    // const removeFromFavourites = (id:number) =>{
    const removeFromFavourites = (favCity:string) =>{

        setFavouritesList( prev => 
            prev.filter( item => item.favCity !== favCity ) )
    }

   
    return (
        <FavouritesContext.Provider 
            value={{favouritesList, addToFavourites, removeFromFavourites}}
        >
            {children}
        </ FavouritesContext.Provider>
    )
}
