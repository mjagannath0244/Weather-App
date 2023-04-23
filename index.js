const wraper = document.querySelector(".wrapper");
const inputpart = document.querySelector(".input-part")
const infotxt = document.querySelector(".info-txt")
const inputfield = document.querySelector("input")
const locationbtn = document.querySelector("button")




let api;

inputfield.addEventListener("keyup", e => {
    // console.log(e.key)
    if (e.key == "Enter" && inputfield.value != "") {
        requestApi(inputfield.value)
    }
})



let api_key = "d05cc528e566f002141a528b0b628a1d";
// fetch city_name from the api
function requestApi(city) {

    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`

    fetchdata();

}

// fetch_data from api
function fetchdata() {

    fetch(api).then((response) => response.json()).then((result) => weatherdetails(result))
    infotxt.innerText = "Getting Weather details....."
    infotxt.classList.add("pending");
}


function weatherdetails(info) {
    if (info.cod == '404') {
        infotxt.classList.replace("pending", "error");
        infotxt.innerText = `${inputfield.value} is not a cityname`
    }

    else {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0]
        const { feels_like, humidity, temp } = info.main

        wraper.querySelector(".temp .num").innerText = temp;
        wraper.querySelector(".temp .num").innerText = Math.floor(temp);
        wraper.querySelector(".weather").innerText = description

        wraper.querySelector(".location span").innerText = `${city},${country}`

        wraper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wraper.querySelector(".humidity span").innerText = `${humidity}%`;





        infotxt.classList.remove("pending", "error");
        wraper.classList.add("active")
        console.log(info)
    }

}


locationbtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onsucess, onerror)
    }
    else {
        alert("Your browser not support geoglelocation")
    }
})

function onsucess(position) {

    const { latitude, longitude } = position.coords;

    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=imperial`
    fetchdata();
}
function onerror(error) {
    infotxt.innerText = error.message;
    infotxt.classList.add("error")
}





