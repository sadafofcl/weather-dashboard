interface prop{
    i:string
}

export default function IconsForConditions({i}:prop){
        const iconUrl = `https://openweathermap.org/img/wn/${i}@2x.png`;
    return (
        <img src={iconUrl} alt="" />
    )
}