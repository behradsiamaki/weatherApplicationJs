

const getLocation = async () => {
    const url = 'http://ip-api.com/json/5.117.24.84?fields=country,city,lat,lon,timezone';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

const getWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=78116b727542b3fa78223e94efa6be01
`
    const response = await fetch(url);
    const data = await response.json();

    return data;
}


function getDayOrNight() {
    let DayOrNight;
    let d = new Date();

    if (d.getHours() >= 6 && d.getHours() <= 19) {
        DayOrNight = 'day'
    } else {
        DayOrNight = 'night'
    }
}

function getIcon(weMain) {
    let icon;
    switch (weMain) {
        case 'thunder':
            icon = `${weMain}.svg`;
            break;
        case 'drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'rainy':
            icon = `${weMain}.svg`;
            break;
        case 'snowy':
            icon = `${weMain}.svg`;
            break;
        case 'day':
            const DayOrNight = getDayOrNight();
            icon = `${weMain}-${DayOrNight}.svg`;
            break;
        case 'cloudy':
            icon = `${weMain}.svg`;
            break;
        case 'Atmosphere':
            icon = `${weMain}.svg`;
            break;
    }
    return icon;
}

function getTemp(weTemp) {
    const k = weTemp;
    const f = (k - 273.15) * 9 / 5 + 32;
    const c = k - 273.15;
    return temp = {
        kel: math.floor(k),
        far: math.floor(f)
        , can: math.floor(c)
    };
}

const loti = document.querySelector('.timeZone');
const icon = document.querySelector('.icon');
const degreeSection = document.querySelector('.degree-section');
const deg = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span');
const tede = document.querySelector('.temperature-description');

getLocation()
    .then(locData => {
        const timeZone = locData.timezone;
        console.log(timeZone);
        loti.textContent = timeZone;
        return getWeather(locData.lat, locData.lon);
    }).then(weData => {
        const weTemp = weData.main.temp;
        const weMain = weData.weather[0].main;
        const weDes = weData.weather[0].description;
        console.log(weTemp, weMain, weDes);

        const iconName = getIcon(weMain);
        icon.innerHTML = `<img src="icons"/${iconName}></img>`

        deg.textContent = math.floor(weTemp);
        unit.textContent = 'k';

        degreeSection.addEventListener('click', function (e) {
            if(unit.textContent == 'k') {
                deg.textContent = getTemp(weTemp).far;
                unit.textContent = 'f';
            } else if (unit.textContent == 'f') {
                deg.textContent = getTemp.can;
                unit.textContent = 'c';
            } else {
                deg.textContent = getTemp(weTemp).kel;
                unit.textContent = 'k'
            }
        })
    })
