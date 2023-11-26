const API_KEY = "b008a5f566210ea615565731bc92bb18"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export const weatherData = async (type, data) => {
    let url = null;
    switch(type) {
        case "current":
            if (typeof data === "string") {
                url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
            }else {
                url = `${BASE_URL}/weather?lat=${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=metric;`
            }
            break;
        case "forecast":
            if (typeof data === "string") {
                url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
            }else {
                url = `${BASE_URL}/forecast?lat=${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=metric`;
            }
            break;
        default :
            break;
    }
    try{
        const result = await fetch(url)
        return await result.json()
    }
    catch(e){
        return e
    }  
}
