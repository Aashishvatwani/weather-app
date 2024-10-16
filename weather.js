const apikey = "679ee91b38af4cb6a97111007241610";
const apiurl = `https://api.weatherapi.com/v1/current.json?aqi=yes&q=&key=${apikey}`; // Use backticks for the URL
const searchbox = document.querySelector("#search input");
const searchbtn = document.querySelector("#location");
const body=document.querySelector("#body1");
const head=document.querySelector("#temp");
const below=document.querySelector("#below-h");
async function checkWeather(city) {
    try {
        const apiurl = `https://api.weatherapi.com/v1/current.json?aqi=yes&q=${city}&key=${apikey}`;
        const response = await fetch(apiurl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Check if response is OK
        }
        const data = await response.json();
        console.log(data);


        // Update the HTML with the weather data
        document.querySelector('#city').innerText = data.location.name;
        document.querySelector('#temp').innerText = `${Math.round(data.current.temp_c)}°C`;
        document.querySelector('#text-wind-speed').innerText = `${data.current.wind_kph} kph`;
        document.querySelector('#text-humadity').innerText = `${data.current.humidity} %`;
        let condi=data.current.condition.text;
        let Video=document.querySelector("#weather-video")
        if(condi=="Sunny" || condi=="Clear")
        {
            body.addEventListener("mouseenter", () => {
                head.style.color = "#21433f";
                below.style.color = "#21433f";
            });
            
            Video.src="sunny.mp4"
        }
        else if(condi=="Rain")
        {
            Video.src="rainy.mp4";
        }
        else if(condi=="Partly Cloudy")
        {
            Video.src="clouds.mp4";
        }
        else if(condi=="Patchy rain nearby" || condi=="Overcast"){
            Video.src="patchy.mp4";
        }
        else if(condi=="Light snow" || condi=="Snowfall" || condi=="Heavy snow")
        {
            Video.src="snow.mp4";
        }
        document.querySelector("#display").style.display="block";

        // Air quality index handling
        let airQualityIndex = data.current.air_quality['gb-defra-index']; // Correct bracket notation
        document.querySelector('#below-h').innerText = `Air Quality Index: ${airQualityIndex}`;
        
    } catch (error) {
        console.error('Error fetching weather data:', error); // Log any errors
    }
}

// Call the function to check the weather when the button is clicked
searchbtn.addEventListener("click", () => {
    const city = searchbox.value;
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1); // Correct case formatting
    checkWeather(formattedCity);
});

