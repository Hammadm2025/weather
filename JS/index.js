
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function search(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f3482887715b47b393594108241204&q=${location}&days=3`);
        
        if (response.ok && response.status !== 400)
         {
            const data = await response.json(); 
            displayCurrent(data.location, data.current); 
            displayAnother(data.forecast.forecastday); 
        } 
        else {
            console.error("Weather API request failed.");
        }
    }
     catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

document.getElementById("search").addEventListener("keyup", (event) => {
    const location = event.target.value.trim();
    if (location) {
        search(location);
    }
});

function displayCurrent(location, current) {
    if (current) {
        const lastUpdated = new Date(current.last_updated.replace(" ", "T"));
        const currentDate = `${days[lastUpdated.getDay()]} ${lastUpdated.getDate()} ${monthNames[lastUpdated.getMonth()]}`;
        
        const html = `
            <div class="today forecast">
                <div class="forecast-header d-flex justify-content-start" id="today">
                    
                    <div class="date">${currentDate}</div>
                </div>
                <div class="forecast-content" id="current">
                    <div class="location">${location.name}</div>
                    <div class="degree d-flex justify-content-around text-center">
                        <div class="num">${current.temp_c}<sup>o</sup>C</div>
                        <div class="forecast-icon">
                            <img src="https:${current.condition.icon}" alt="" width="90">
                        </div>
                    </div>
                    <div class="custom">${current.condition.text}</div>
                    <span><img src="images/icon-umberella.png" alt="">20%</span>
                    <span><img src="images/icon-wind.png" alt="">18km/h</span>
                    <span><img src="images/icon-compass.png" alt="">East</span>
                </div>
            </div>`;

        document.getElementById("forecast").innerHTML = html; 
    }
}

function displayAnother(forecastDays) {
    let html = "";
    for (let i = 1; i < forecastDays.length; i++) {
        const forecastDate = new Date(forecastDays[i].date.replace(" ", "T"));
        const forecastDay = days[forecastDate.getDay()];

        html += `
            <div class="forecast">
                <div class="forecast-header">
                    <div class="day">${forecastDay}</div>
                </div>
                <div class="forecast-content">
                    <div class="forecast-icon">
                        <img src="https:${forecastDays[i].day.condition.icon}" alt="" width="48">
                    </div>
                    <div class="degree">${forecastDays[i].day.maxtemp_c}<sup>o</sup>C</div>
                    <small>${forecastDays[i].day.mintemp_c}<sup>o</sup></small>
                    <div class="custom">${forecastDays[i].day.condition.text}</div>
                </div>
            </div>`;
    }

    document.getElementById("forecast").innerHTML += html; 
}


search("alex");
