let City = document.getElementById('userinput').value
let hours = document.getElementById('hourss').value
// if(hours>=120) console.log("Can not forcast more than 5 days");
hours = Math.floor(hours / 3)

//Copied JS file
const ShowTemperature = document.querySelector('.temperature')
const ShowTemperatureMaxMin = document.querySelector('.SmallTemp')
const ShowLocation = document.querySelector('.location')
const ShowIcon = document.querySelector('.icon')
const ShowLooking = document.querySelector('.looking')
const ShowSpeed = document.querySelector('.speed')
const key = 'db266614dcbaa046477815ea9dc08532' //OpenWeatherMap API Key
const Climate = {}

Climate.windSpeed = {
  unit: 'm/s'
}
Climate.temperature = {
  unit: 'celsius'
}

let api = `http://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=${key}`

fetch(api)
  .then(function (response) {
    let data = response.json()
    return data
  })
  .then(function (data) {
    Climate.temperature.value = (data.list[hours].main.temp - 273.15).toFixed(2)
    Climate.city = data.city.name
    Climate.country = data.city.country
    Climate.windSpeed.value = data.list[hours].wind.speed
    Climate.looking = data.list[hours].weather[0].description
    Climate.Max = (data.list[hours].main.temp_max - 273.15).toFixed(2)
    Climate.Min = (data.list[hours].main.temp_min - 273.15).toFixed(2)
    Climate.icon = data.list[hours].weather[0].icon
  })
  .then(function () {
    display()
  })

function display () {
  ShowTemperature.innerHTML = `${Climate.temperature.value}°C`
  ShowTemperatureMaxMin.innerHTML = `Max = ${Climate.Max}°C ,   Min = ${Climate.Min}°C`
  ShowLocation.innerHTML = `${Climate.city}, ${Climate.country}`
  ShowIcon.innerHTML = `<img src="ico/${Climate.icon}.png"/>`
  ShowLooking.innerHTML = `${Climate.looking}`
  ShowSpeed.innerHTML = `& with wind speed ${Climate.windSpeed.value}  m/s`
}

ShowSpeed.addEventListener('click', function () {
  if (Climate.windSpeed.unit === 'm/s') {
    let mph = (Climate.windSpeed.value * 2.23694).toFixed(2)
    Climate.windSpeed.unit = 'mph'
    ShowSpeed.innerHTML = `& with wind speed ${mph} mph`
  } else if (Climate.windSpeed.unit === 'mph') {
    Climate.windSpeed.unit = 'm/s'
    ShowSpeed.innerHTML = `& with wind speed ${Climate.windSpeed.value} m/s`
  }
})

ShowTemperature.addEventListener('click', function () {
  if (Climate.temperature.value === undefined) return
  else if (Climate.temperature.unit == 'celsius') {
    let fahrenheit = ((Climate.temperature.value * 9) / 5 + 32).toFixed(2)
    Climate.temperature.unit = 'fahrenheit'
    ShowTemperature.innerHTML = `${fahrenheit}°F`

    MaxMinToFahren()
  } else {
    Climate.temperature.unit = 'celsius'
    ShowTemperature.innerHTML = `${Climate.temperature.value}°C`
    MaxMinToCelsi()
  }
  //MaxMin();
})

function MaxMinToFahren () {
  let x = ((Climate.Max * 9) / 5 + 32).toFixed(2)
  fahrenheit = ((Climate.Min * 9) / 5 + 32).toFixed(2)
  ShowTemperatureMaxMin.innerHTML = `Max = ${x}°F ,Min = ${fahrenheit}°F`
}

function MaxMinToCelsi () {
  ShowTemperatureMaxMin.innerHTML = `Max = ${Climate.Max}°C ,   Min = ${Climate.Min}°C`
}
