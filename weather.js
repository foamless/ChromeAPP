const weather = document.querySelector(".js-weather");

const API_KEY = "aaab2e1dc827874c77c629423de9b97e";
const CORDS ='cords';

function getWeather(lat, lon){
    fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    // then은 "데이터를 완전히 가져온 후" 함수를 호출
    .then(function(respons){
        return respons.json();
    })
    // 잘 이해가 안간다...
    .then(function(json){
        const temperature=json.main.temp;
        const place=json.name;
        weather.innerText=`${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(CORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    // 위도와 경도 읽어오기
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        // 객체의 변수이름과 key값이 같을때 이하와 같이 표현 가능
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("eroorrr");
}

function askForCords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCords(){
    const loadedCords = localStorage.getItem(CORDS);
    if(loadedCords===null){
        askForCords();
    } else {
        const pareCords=JSON.parse(loadedCords);
        getWeather(pareCords.latitude, pareCords.longitude);
    }
}

function init(){
    loadCords();
}

init();
