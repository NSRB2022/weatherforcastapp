function displayWeather(meteos_semaine, nbjour)
{

    const formDisplayResult = document.getElementById('formResult')                
    formDisplayResult.innerHTML = []
   
    var uviCheck =  getTheme(meteos_semaine[7]);

    for (var i = 0; i < nbjour; i++)
    {
        const dayValue = getDayNumber().week[getDayNumber().currentDay + i]
                   
        const dayDiv = document.createElement('div')
        dayDiv.innerHTML = dayValue
        
        const iconeWeather = document.createElement('img')

    var iconeDisplayId = meteos_semaine[i];

    if (iconeDisplayId == 803 || iconeDisplayId == 804) {
        console.log(iconeDisplayId)
        if (uviCheck)  {
            iconeWeather.src = "./img/clouds-white.png"
        } else iconeWeather.src = "./img/clouds.svg"

    }
    else if (iconeDisplayId == 801 || iconeDisplayId == 802) {
        console.log(iconeDisplayId)
        if (uviCheck) {
            iconeWeather.src = "./img/cloudy_white.png"
        } else iconeWeather.src = "./img/cloudy.svg"
    }
    else if (iconeDisplayId <= 622 && iconeDisplayId >= 600) {
        console.log(iconeDisplayId)
        if (uviCheck) {
            iconeWeather.src = "./img/snow-white.png"
        } else iconeWeather.src = "./img/snow.svg"
    }
    else if (iconeDisplayId == 800) {
        console.log(iconeDisplayId)
        if (uviCheck) {
            iconeWeather.src = "./img/sun-white.png"
        } else iconeWeather.src = "./img/sun.svg"
    }   
    else {
        console.log(iconeDisplayId)
        if (uviCheck) {
            iconeWeather.src = "./img/rain-white.png"
        } else iconeWeather.src = "./img/rain.svg"
    }
    formDisplayResult.appendChild(dayDiv)
    dayDiv.appendChild(iconeWeather)
    }
}


function getCoord(data) {
    const lat = data.results[0].geometry.lat
    const lon = data.results[0].geometry.lng
    return { lat, lon }
}

function getTheme(uv) {
    if (uv == 0) {
        uviCheck = true
        document.getElementById("body").style.transition = "all 1s";
        document.querySelector("body").style.background = "#06145F";  
        document.querySelector("body").style.color = "#FFFFFF";  
    } else {
        uviCheck = false
        document.getElementById("body").style.transition = "all 1s";
        document.querySelector("body").style.background = "#3399FF"
        document.querySelector("body").style.color = "#000000";  
    }
    return uviCheck
}

function getDayNumber(){
    const currentDate = new Date();
    const currentDay = currentDate.getDay()
    const week = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
                "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    return { week, currentDay }
    }   


document.addEventListener("DOMContentLoaded", function() {
    
    monstockage = localStorage;

    const submitButton = document.getElementById("submit")
    
    const API_KEY_loc = "78f0265465d04dbeb14f38246509912d"
    const API_KEY_weather = "104bf1cd8898dd5511abb9ccefbc7b63"
    
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        
        const location = document.getElementById("userLocation")
        const userLocation = location.value

        const lavilleexiste = monstockage.getItem(userLocation);

        if (lavilleexiste)
        {
            displayWeather(JSON.parse(lavilleexiste), document.getElementById("day-select").value);
            console.log("ca marche");
        }
        else
        {
        let URL = `https://api.opencagedata.com/geocode/v1/json?q=${userLocation}&key=${API_KEY_loc}&language=fr&pretty=1`
        
        fetch(URL) 
        .then(response => { 
            if (response.status == 200) { 
                return response.json()
            }
            else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
        })
        .then(data => {
           return getCoord(data)
        }) 
        .then(coords => {
            let URL_weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude={part}&appid=${API_KEY_weather}`
            console.log(URL_weather)
            
            return fetch(URL_weather)
            .then(response => { 
                if (response.status == 200) { 
                    return response.json()
                }
                else console.log(`Erreur lorsqu'on a tenté de récupérer les data Weather`);
            })
            .then(cityWeather => { 
                
                const formDisplayResult = document.getElementById('formResult')                
                formDisplayResult.innerHTML = []
                const daysToDisplay = document.getElementById("day-select").value

                var codes_meteo = [];

                for (let i = 0; i < 7; i++)
                {
                    codes_meteo[i] = cityWeather.daily[i].weather[0].id;
                }
                
                codes_meteo[7] = cityWeather.current.uvi;
                monstockage.setItem(userLocation, JSON.stringify(codes_meteo));

                displayWeather(codes_meteo, daysToDisplay);

                /*for (let i= 0; i < daysToDisplay ; i++) {
                   const dayValue = getDayNumber().week[getDayNumber().currentDay + i]
                   
                   const dayDiv = document.createElement('div')
                   dayDiv.innerHTML = dayValue
                   
                   const iconeWeather = document.createElement('img')

                   let uviCheck = false
                   uviCheck = getTheme(cityWeather.current.uvi)

                    let iconeDisplayId = cityWeather.daily[i].weather[0].id

                    if (iconeDisplayId == 803 || iconeDisplayId == 804) {
                        console.log(iconeDisplayId)
                        if (uviCheck) {
                            iconeWeather.src = "./img/clouds-white.png"
                        } else iconeWeather.src = "./img/clouds.svg"

                    }
                    else if (iconeDisplayId == 801 || iconeDisplayId == 802) {
                        console.log(iconeDisplayId)
                        if (uviCheck) {
                            iconeWeather.src = "./img/cloudy_white.png"
                        } else iconeWeather.src = "./img/cloudy.svg"
                    }
                    else if (iconeDisplayId <= 622 && iconeDisplayId >= 600) {
                        console.log(iconeDisplayId)
                        if (uviCheck) {
                            iconeWeather.src = "./img/snow-white.png"
                        } else iconeWeather.src = "./img/snow.svg"
                    }
                    else if (iconeDisplayId == 800) {
                        console.log(iconeDisplayId)
                        if (uviCheck) {
                            iconeWeather.src = "./img/sun-white.png"
                        } else iconeWeather.src = "./img/sun.svg"
                    }   
                    else {
                        console.log(iconeDisplayId)
                        if (uviCheck) {
                            iconeWeather.src = "./img/rain-white.png"
                        } else iconeWeather.src = "./img/rain.svg"
                    }
                    formDisplayResult.appendChild(dayDiv)
                    dayDiv.appendChild(iconeWeather)
                }*/
            })
            .catch(err=> console.log(err))
            })
            .catch(err=> console.log(err))

    }});
});