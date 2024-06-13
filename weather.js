const apiKey= "5058d6438239f9c569d372f78971fca0";
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const inputValue=document.querySelector(".search input");
const buttonValue=document.querySelector(".search button");
const weatherIcon= document.querySelector(".weather-icon");
const weatherDescription= document.querySelector(".weather-description");
const dateTime= document.querySelector(".date-time");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  console.log("response ok")

  var data= await response.json();
  console.log("data ok");

  if (response.status == 404){
    document.querySelector(".error").style.display="block";
    document.querySelector(".weather").style.display="none";
    return;  
} else{
  
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
  weatherDescription.innerHTML= data.weather[0].description + " " + "dey";

  const timeZone= data.timezone;
  const localDate= new Date((data.dt + timeZone) * 1000);
  dateTime.innerHTML = `Date and Time: ${localDate.toLocaleString()}`;

  if(data.weather[0].main == "Clouds") {
  weatherIcon.src= "images/cloud_day_forecast_sun_icon.png";
  weatherIcon.style.width="100px" ;
  console.log("clouds ok");
}
else if(data.weather[0].main == "Clear") {
  weatherIcon.src ="images/clear_weather_icon.png";
  weatherIcon.style.width="100px" ;
}
else if(data.weather[0].main == "Drizzle") {
  weatherIcon.src="images/drizzle_icon.png";
  weatherIcon.style.width="100px";
}
else if (data.weather[0].main == "Mist") {
  weatherIcon.src="images/mist_icon.png";
  weatherIcon.style.width="100px" ;
}
else if (data.weather[0].main == "Rain") {
  weatherIcon.src="images/night_rain_icon.png";
  weatherIcon.style.width="100px" ;
}
  
    document.querySelector(".weather").style.display= "block";
    document.querySelector(".error").style.display="none";
    console.log("info found")
  
  
}
}
buttonValue.addEventListener("click", () => {
    console.log("button clicked");
  checkWeather(inputValue.value);
})