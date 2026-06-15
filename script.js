// WeatherSphere uses Open-Meteo's free geocoding and forecast APIs.
// No API key, account, or signup is required for either endpoint.
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const REVERSE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

// Used for the initial page load so the very first request skips geocoding.
const DEFAULT_LOCATION = {
    name: "New Delhi",
    country_code: "IN",
    latitude: 28.6139,
    longitude: 77.209
};

const INDIAN_CITIES = [
    "Agartala",
    "Agra",
    "Ahmedabad",
    "Aizawl",
    "Ajmer",
    "Akola",
    "Alappuzha",
    "Aligarh",
    "Amaravati",
    "Ambala",
    "Amravati",
    "Amritsar",
    "Anand",
    "Anantapur",
    "Arrah",
    "Asansol",
    "Aurangabad",
    "Balasore",
    "Ballari",
    "Bangalore",
    "Barasat",
    "Bareilly",
    "Bathinda",
    "Belagavi",
    "Bengaluru",
    "Berhampore",
    "Berhampur",
    "Begusarai",
    "Bhagalpur",
    "Bharatpur",
    "Bhilai",
    "Bhilwara",
    "Bhopal",
    "Bhubaneswar",
    "Bhuj",
    "Bidar",
    "Bikaner",
    "Bilaspur",
    "Bokaro Steel City",
    "Chandigarh",
    "Chandrapur",
    "Chennai",
    "Chhindwara",
    "Chittoor",
    "Coimbatore",
    "Cuddalore",
    "Cuttack",
    "Darbhanga",
    "Davanagere",
    "Dehradun",
    "Delhi",
    "Deoghar",
    "Dhanbad",
    "Dharamshala",
    "Dhule",
    "Dibrugarh",
    "Dimapur",
    "Dindigul",
    "Durg",
    "Durgapur",
    "Eluru",
    "Erode",
    "Faridabad",
    "Farrukhabad",
    "Firozabad",
    "Gandhidham",
    "Gandhinagar",
    "Gangtok",
    "Gaya",
    "Ghaziabad",
    "Gorakhpur",
    "Guntur",
    "Gurugram",
    "Guwahati",
    "Gwalior",
    "Haldia",
    "Haldwani",
    "Hanumangarh",
    "Hapur",
    "Haridwar",
    "Hazaribagh",
    "Hisar",
    "Hoshiarpur",
    "Hosur",
    "Hubballi",
    "Hyderabad",
    "Imphal",
    "Indore",
    "Itanagar",
    "Jabalpur",
    "Jagdalpur",
    "Jaipur",
    "Jalandhar",
    "Jalgaon",
    "Jalna",
    "Jammu",
    "Jamnagar",
    "Jamshedpur",
    "Jhansi",
    "Jodhpur",
    "Jorhat",
    "Junagadh",
    "Kadapa",
    "Kakinada",
    "Kalaburagi",
    "Kalyan",
    "Kanchipuram",
    "Kannur",
    "Kanpur",
    "Kargil",
    "Karimnagar",
    "Karnal",
    "Kasaragod",
    "Katihar",
    "Khammam",
    "Kharagpur",
    "Kochi",
    "Kohima",
    "Kolhapur",
    "Kolkata",
    "Kollam",
    "Korba",
    "Kota",
    "Kottayam",
    "Kozhikode",
    "Kurnool",
    "Latur",
    "Leh",
    "Lucknow",
    "Ludhiana",
    "Madurai",
    "Mahbubnagar",
    "Malappuram",
    "Malda",
    "Mangaluru",
    "Mapusa",
    "Margao",
    "Mathura",
    "Mau",
    "Meerut",
    "Mehsana",
    "Mohali",
    "Moradabad",
    "Morbi",
    "Moga",
    "Mumbai",
    "Munger",
    "Muzaffarpur",
    "Mysore",
    "Mysuru",
    "Nadiad",
    "Nagercoil",
    "Nagpur",
    "Nainital",
    "Nanded",
    "Nashik",
    "Navi Mumbai",
    "Nellore",
    "New Delhi",
    "Nizamabad",
    "Noida",
    "Ongole",
    "Ooty",
    "Palakkad",
    "Pali",
    "Panaji",
    "Panchkula",
    "Panipat",
    "Parbhani",
    "Pathanamthitta",
    "Pathankot",
    "Patiala",
    "Patna",
    "Pimpri-Chinchwad",
    "Porbandar",
    "Prayagraj",
    "Puducherry",
    "Pune",
    "Puri",
    "Purnia",
    "Raichur",
    "Raigarh",
    "Raipur",
    "Rajahmundry",
    "Rajapalayam",
    "Rajkot",
    "Ramagundam",
    "Rampur",
    "Ranchi",
    "Ratlam",
    "Raurkela",
    "Rewa",
    "Rishikesh",
    "Rohtak",
    "Roorkee",
    "Sagar",
    "Saharanpur",
    "Salem",
    "Sambalpur",
    "Sangli",
    "Satna",
    "Shahjahanpur",
    "Shillong",
    "Shimla",
    "Shivamogga",
    "Sikar",
    "Silchar",
    "Siliguri",
    "Solapur",
    "Sonipat",
    "Sri Ganganagar",
    "Srikakulam",
    "Srinagar",
    "Surat",
    "Tezpur",
    "Thane",
    "Thanjavur",
    "Thiruvananthapuram",
    "Thoothukudi",
    "Thrissur",
    "Tinsukia",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupati",
    "Tiruppur",
    "Tumakuru",
    "Udaipur",
    "Udupi",
    "Ujjain",
    "Vadodara",
    "Varanasi",
    "Vasco da Gama",
    "Vellore",
    "Vijayapura",
    "Vijayawada",
    "Visakhapatnam",
    "Vizianagaram",
    "Warangal",
    "Yamunanagar"
];

// Maps Open-Meteo's WMO weather codes to a human-readable condition,
// a background category, and Font Awesome icon classes for day/night.
const WEATHER_CODE_MAP = {
    0: { condition: "Clear sky", category: "Clear", icon: "fa-sun", iconNight: "fa-moon" },
    1: { condition: "Mainly clear", category: "Clear", icon: "fa-sun", iconNight: "fa-moon" },
    2: { condition: "Partly cloudy", category: "Clouds", icon: "fa-cloud-sun", iconNight: "fa-cloud-moon" },
    3: { condition: "Overcast", category: "Clouds", icon: "fa-cloud", iconNight: "fa-cloud" },
    45: { condition: "Fog", category: "Fog", icon: "fa-smog", iconNight: "fa-smog" },
    48: { condition: "Rime fog", category: "Fog", icon: "fa-smog", iconNight: "fa-smog" },
    51: { condition: "Light drizzle", category: "Rain", icon: "fa-cloud-rain", iconNight: "fa-cloud-rain" },
    53: { condition: "Drizzle", category: "Rain", icon: "fa-cloud-rain", iconNight: "fa-cloud-rain" },
    55: { condition: "Dense drizzle", category: "Rain", icon: "fa-cloud-rain", iconNight: "fa-cloud-rain" },
    56: { condition: "Freezing drizzle", category: "Rain", icon: "fa-cloud-rain", iconNight: "fa-cloud-rain" },
    57: { condition: "Dense freezing drizzle", category: "Rain", icon: "fa-cloud-rain", iconNight: "fa-cloud-rain" },
    61: { condition: "Slight rain", category: "Rain", icon: "fa-cloud-rain", iconNight: "fa-cloud-rain" },
    63: { condition: "Moderate rain", category: "Rain", icon: "fa-cloud-rain", iconNight: "fa-cloud-rain" },
    65: { condition: "Heavy rain", category: "Rain", icon: "fa-cloud-showers-heavy", iconNight: "fa-cloud-showers-heavy" },
    66: { condition: "Freezing rain", category: "Rain", icon: "fa-cloud-rain", iconNight: "fa-cloud-rain" },
    67: { condition: "Heavy freezing rain", category: "Rain", icon: "fa-cloud-showers-heavy", iconNight: "fa-cloud-showers-heavy" },
    71: { condition: "Slight snow", category: "Snow", icon: "fa-snowflake", iconNight: "fa-snowflake" },
    73: { condition: "Moderate snow", category: "Snow", icon: "fa-snowflake", iconNight: "fa-snowflake" },
    75: { condition: "Heavy snow", category: "Snow", icon: "fa-snowflake", iconNight: "fa-snowflake" },
    77: { condition: "Snow grains", category: "Snow", icon: "fa-snowflake", iconNight: "fa-snowflake" },
    80: { condition: "Slight rain showers", category: "Rain", icon: "fa-cloud-rain", iconNight: "fa-cloud-rain" },
    81: { condition: "Rain showers", category: "Rain", icon: "fa-cloud-showers-heavy", iconNight: "fa-cloud-showers-heavy" },
    82: { condition: "Violent rain showers", category: "Rain", icon: "fa-cloud-showers-heavy", iconNight: "fa-cloud-showers-heavy" },
    85: { condition: "Slight snow showers", category: "Snow", icon: "fa-snowflake", iconNight: "fa-snowflake" },
    86: { condition: "Heavy snow showers", category: "Snow", icon: "fa-snowflake", iconNight: "fa-snowflake" },
    95: { condition: "Thunderstorm", category: "Thunderstorm", icon: "fa-bolt", iconNight: "fa-bolt" },
    96: { condition: "Thunderstorm with hail", category: "Thunderstorm", icon: "fa-cloud-bolt", iconNight: "fa-cloud-bolt" },
    99: { condition: "Severe thunderstorm with hail", category: "Thunderstorm", icon: "fa-cloud-bolt", iconNight: "fa-cloud-bolt" }
};

const fallbackWeather = {
    city: "New Delhi",
    country: "IN",
    current: {
        temp: 32,
        feelsLike: 35,
        condition: "Partly cloudy",
        iconClass: "fa-cloud-sun",
        humidity: 48,
        windSpeed: 12,
        sunrise: "05:24",
        sunset: "19:18",
        visibility: 7200,
        pressure: 1008,
        cloudiness: 38,
        weatherCategory: "Clouds"
    },
    forecast: [
        { date: "Tue", temp: 33, condition: "Clear sky", iconClass: "fa-sun" },
        { date: "Wed", temp: 31, condition: "Overcast", iconClass: "fa-cloud" },
        { date: "Thu", temp: 30, condition: "Slight rain", iconClass: "fa-cloud-rain" },
        { date: "Fri", temp: 34, condition: "Clear sky", iconClass: "fa-sun" },
        { date: "Sat", temp: 32, condition: "Overcast", iconClass: "fa-cloud" }
    ],
    hourly: [
        { time: "09:00", temp: 29, iconClass: "fa-cloud-sun", condition: "Partly cloudy" },
        { time: "12:00", temp: 32, iconClass: "fa-sun", condition: "Clear sky" },
        { time: "15:00", temp: 34, iconClass: "fa-sun", condition: "Clear sky" },
        { time: "18:00", temp: 31, iconClass: "fa-cloud", condition: "Overcast" },
        { time: "21:00", temp: 28, iconClass: "fa-cloud-rain", condition: "Slight rain" },
        { time: "00:00", temp: 26, iconClass: "fa-cloud", condition: "Overcast" }
    ]
};

const elements = {
    body: document.body,
    searchForm: document.querySelector("#searchForm"),
    cityInput: document.querySelector("#cityInput"),
    indianCityList: document.querySelector("#indianCityList"),
    cityChips: document.querySelector("#cityChips"),
    cityCount: document.querySelector("#cityCount"),
    locationBtn: document.querySelector("#locationBtn"),
    menuToggle: document.querySelector("#menuToggle"),
    navLinks: document.querySelector("#navLinks"),
    themeToggle: document.querySelector("#themeToggle"),
    unitButtons: document.querySelectorAll(".unit-btn"),
    loadingOverlay: document.querySelector("#loadingOverlay"),
    errorMessage: document.querySelector("#errorMessage"),
    apiNotice: document.querySelector("#apiNotice"),
    cityName: document.querySelector("#cityName"),
    currentDate: document.querySelector("#currentDate"),
    weatherIcon: document.querySelector("#weatherIcon"),
    temperature: document.querySelector("#temperature"),
    temperatureUnit: document.querySelector("#temperatureUnit"),
    weatherCondition: document.querySelector("#weatherCondition"),
    feelsLike: document.querySelector("#feelsLike"),
    humidity: document.querySelector("#humidity"),
    windSpeed: document.querySelector("#windSpeed"),
    sunrise: document.querySelector("#sunrise"),
    sunset: document.querySelector("#sunset"),
    visibility: document.querySelector("#visibility"),
    pressure: document.querySelector("#pressure"),
    cloudiness: document.querySelector("#cloudiness"),
    forecastGrid: document.querySelector("#forecastGrid"),
    hourlyCards: document.querySelector("#hourlyCards"),
    forecastChart: document.querySelector("#forecastChart")
};

let activeUnit = "metric";
let chartInstance = null;
let currentLocation = null;

document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();
    renderIndianCityControls();
    renderWeather(fallbackWeather);
    attachEventListeners();
    loadInitialWeather();
});

function attachEventListeners() {
    elements.searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const city = elements.cityInput.value.trim();

        if (city) {
            getWeatherByCity(city);
        }
    });

    elements.locationBtn.addEventListener("click", getWeatherByLocation);

    elements.cityChips.addEventListener("click", (event) => {
        const cityButton = event.target.closest(".city-chip");

        if (!cityButton) {
            return;
        }

        elements.cityInput.value = cityButton.dataset.city;
        getWeatherByCity(cityButton.dataset.city);
    });

    elements.menuToggle.addEventListener("click", () => {
        const isOpen = elements.navLinks.classList.toggle("open");
        elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    elements.themeToggle.addEventListener("click", toggleDarkMode);

    elements.unitButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.classList.contains("active")) {
                return;
            }

            activeUnit = button.dataset.unit;
            elements.unitButtons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            if (currentLocation) {
                refreshCurrentLocation();
            } else {
                renderWeather(convertFallbackWeather(activeUnit));
            }
        });
    });
}

function renderIndianCityControls() {
    elements.cityCount.textContent = `${INDIAN_CITIES.length} cities`;

    elements.indianCityList.innerHTML = INDIAN_CITIES
        .map((city) => `<option value="${city}"></option>`)
        .join("");

    elements.cityChips.innerHTML = INDIAN_CITIES
        .map((city) => `<button class="city-chip" type="button" data-city="${city}">${city}</button>`)
        .join("");
}

async function loadInitialWeather() {
    try {
        const weatherData = await fetchWeatherData(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
        currentLocation = DEFAULT_LOCATION;
        renderWeather(formatWeatherData(weatherData, DEFAULT_LOCATION));
    } catch (error) {
        // Keep the fallback weather visible if the very first live request fails.
    }
}

async function getWeatherByCity(city) {
    setLoading(true);
    hideError();

    try {
        const location = await geocodeCity(city);
        const weatherData = await fetchWeatherData(location.latitude, location.longitude);
        currentLocation = location;
        renderWeather(formatWeatherData(weatherData, location));
    } catch (error) {
        showError(error.message || "Unable to fetch weather data. Please try again.");
    } finally {
        setLoading(false);
    }
}

async function refreshCurrentLocation() {
    if (!currentLocation) {
        renderWeather(convertFallbackWeather(activeUnit));
        return;
    }

    setLoading(true);
    hideError();

    try {
        const weatherData = await fetchWeatherData(currentLocation.latitude, currentLocation.longitude);
        renderWeather(formatWeatherData(weatherData, currentLocation));
    } catch (error) {
        showError(error.message || "Unable to refresh weather data. Please try again.");
    } finally {
        setLoading(false);
    }
}

function getWeatherByLocation() {
    if (!navigator.geolocation) {
        showError("Geolocation is not supported in this browser.");
        return;
    }

    setLoading(true);
    hideError();

    navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
            try {
                const location = await reverseGeocode(coords.latitude, coords.longitude);
                location.latitude = coords.latitude;
                location.longitude = coords.longitude;

                const weatherData = await fetchWeatherData(coords.latitude, coords.longitude);
                currentLocation = location;
                renderWeather(formatWeatherData(weatherData, location));
            } catch (error) {
                showError(error.message || "Location weather is unavailable right now.");
            } finally {
                setLoading(false);
            }
        },
        () => {
            showError("Location permission was denied. Search by city instead.");
            setLoading(false);
        }
    );
}

async function geocodeCity(city) {
    const trimmedCity = city.trim();
    const url = `${GEOCODING_URL}?name=${encodeURIComponent(trimmedCity)}&count=10&language=en&format=json`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to search for that city right now.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found. Please check the spelling and try again.");
    }

    // Prefer an Indian match when the same city name exists in multiple countries.
    const match = data.results.find((item) => item.country_code === "IN") || data.results[0];

    return {
        name: match.name,
        country_code: match.country_code || "",
        latitude: match.latitude,
        longitude: match.longitude
    };
}

async function reverseGeocode(latitude, longitude) {
    try {
        const url = `${REVERSE_GEOCODING_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Reverse geocoding failed.");
        }

        const data = await response.json();

        return {
            name: data.city || data.locality || "Your Location",
            country_code: data.countryCode || ""
        };
    } catch (error) {
        return { name: "Your Location", country_code: "" };
    }
}

async function fetchWeatherData(latitude, longitude) {
    const temperatureUnit = activeUnit === "imperial" ? "fahrenheit" : "celsius";
    const windSpeedUnit = activeUnit === "imperial" ? "mph" : "kmh";

    const params = new URLSearchParams({
        latitude,
        longitude,
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,cloud_cover,pressure_msl,wind_speed_10m",
        hourly: "temperature_2m,weather_code,is_day,visibility",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset",
        timezone: "auto",
        forecast_days: "6",
        temperature_unit: temperatureUnit,
        wind_speed_unit: windSpeedUnit
    });

    const response = await fetch(`${FORECAST_URL}?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Forecast data is not available right now.");
    }

    return response.json();
}

function formatWeatherData(data, location) {
    const current = data.current;
    const currentInfo = getWeatherInfo(current.weather_code);
    const currentHourIndex = findCurrentHourIndex(data.hourly.time, current.time);
    const visibility = data.hourly.visibility[currentHourIndex] ?? 10000;

    const hourlyForecast = data.hourly.time
        .slice(currentHourIndex, currentHourIndex + 8)
        .map((time, offset) => {
            const i = currentHourIndex + offset;
            const info = getWeatherInfo(data.hourly.weather_code[i]);

            return {
                time: formatLocalTime(time),
                temp: Math.round(data.hourly.temperature_2m[i]),
                condition: info.condition,
                iconClass: data.hourly.is_day[i] ? info.icon : info.iconNight
            };
        });

    const dailyForecast = data.daily.time
        .slice(1, 6)
        .map((date, offset) => {
            const i = offset + 1;
            const info = getWeatherInfo(data.daily.weather_code[i]);
            const averageTemp = (data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2;

            return {
                date: formatDay(date),
                temp: Math.round(averageTemp),
                condition: info.condition,
                iconClass: info.icon
            };
        });

    return {
        city: location.name,
        country: location.country_code || "",
        current: {
            temp: Math.round(current.temperature_2m),
            feelsLike: Math.round(current.apparent_temperature),
            condition: currentInfo.condition,
            iconClass: current.is_day ? currentInfo.icon : currentInfo.iconNight,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            sunrise: formatLocalTime(data.daily.sunrise[0]),
            sunset: formatLocalTime(data.daily.sunset[0]),
            visibility,
            pressure: Math.round(current.pressure_msl),
            cloudiness: current.cloud_cover,
            weatherCategory: currentInfo.category
        },
        forecast: dailyForecast,
        hourly: hourlyForecast
    };
}

function getWeatherInfo(code) {
    return WEATHER_CODE_MAP[code] || WEATHER_CODE_MAP[0];
}

function findCurrentHourIndex(times, currentTime) {
    const currentHour = currentTime.slice(0, 13);
    const index = times.findIndex((time) => time.slice(0, 13) === currentHour);
    return index === -1 ? 0 : index;
}

function renderWeather(data) {
    const unitLabel = getUnitLabel();

    elements.cityName.textContent = data.country ? `${data.city}, ${data.country}` : data.city;
    elements.currentDate.textContent = new Intl.DateTimeFormat("en", {
        weekday: "long",
        month: "long",
        day: "numeric"
    }).format(new Date());
    elements.weatherIcon.className = `fa-solid ${data.current.iconClass}`;
    elements.temperature.textContent = Math.round(data.current.temp);
    elements.temperatureUnit.textContent = unitLabel;
    elements.weatherCondition.textContent = data.current.condition;
    elements.feelsLike.textContent = `${Math.round(data.current.feelsLike)} ${unitLabel}`;
    elements.humidity.textContent = `${data.current.humidity}%`;
    elements.windSpeed.textContent = formatWindSpeed(data.current.windSpeed);
    elements.sunrise.textContent = data.current.sunrise;
    elements.sunset.textContent = data.current.sunset;
    elements.visibility.textContent = formatVisibility(data.current.visibility);
    elements.pressure.textContent = `${data.current.pressure} hPa`;
    elements.cloudiness.textContent = `${data.current.cloudiness}%`;

    renderForecastCards(data.forecast);
    renderHourlyCards(data.hourly);
    renderChart(data.forecast);
    updateBackground(data.current.weatherCategory);
}

function renderForecastCards(forecast) {
    elements.forecastGrid.innerHTML = forecast
        .map((day) => `
            <article class="forecast-card">
                <span>${day.date}</span>
                <i class="fa-solid ${day.iconClass}" aria-hidden="true"></i>
                <div>
                    <strong>${Math.round(day.temp)} ${getUnitLabel()}</strong>
                    <span>${day.condition}</span>
                </div>
            </article>
        `)
        .join("");
}

function renderHourlyCards(hourly) {
    elements.hourlyCards.innerHTML = hourly
        .map((hour) => `
            <article class="hourly-card">
                <span>${hour.time}</span>
                <i class="fa-solid ${hour.iconClass}" aria-hidden="true"></i>
                <strong>${Math.round(hour.temp)} ${getUnitLabel()}</strong>
                <span>${hour.condition}</span>
            </article>
        `)
        .join("");
}

function renderChart(forecast) {
    if (!window.Chart) {
        return;
    }

    const labels = forecast.map((day) => day.date);
    const temperatures = forecast.map((day) => Math.round(day.temp));

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(elements.forecastChart, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: `Temperature (${getUnitLabel()})`,
                    data: temperatures,
                    borderColor: "#7dd3fc",
                    backgroundColor: "rgba(125, 211, 252, 0.18)",
                    fill: true,
                    pointBackgroundColor: "#ffffff",
                    pointBorderColor: "#38bdf8",
                    pointRadius: 5,
                    tension: 0.42
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: "#ffffff",
                        font: {
                            family: "Inter",
                            weight: "700"
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: "rgba(255,255,255,0.78)" },
                    grid: { color: "rgba(255,255,255,0.12)" }
                },
                y: {
                    ticks: { color: "rgba(255,255,255,0.78)" },
                    grid: { color: "rgba(255,255,255,0.12)" }
                }
            }
        }
    });
}

function updateBackground(category) {
    elements.body.classList.remove("weather-bg-clear", "weather-bg-clouds", "weather-bg-rain", "weather-bg-snow");

    switch (category) {
        case "Rain":
        case "Thunderstorm":
            elements.body.classList.add("weather-bg-rain");
            break;
        case "Snow":
            elements.body.classList.add("weather-bg-snow");
            break;
        case "Clouds":
        case "Fog":
            elements.body.classList.add("weather-bg-clouds");
            break;
        default:
            elements.body.classList.add("weather-bg-clear");
    }
}

function toggleDarkMode() {
    elements.body.classList.toggle("dark-mode");
    const isDark = elements.body.classList.contains("dark-mode");
    localStorage.setItem("weatherSphereTheme", isDark ? "dark" : "light");
    elements.themeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i><span>Light</span>'
        : '<i class="fa-solid fa-moon"></i><span>Dark</span>';
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem("weatherSphereTheme");

    if (savedTheme === "dark") {
        elements.body.classList.add("dark-mode");
        elements.themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i><span>Light</span>';
    }
}

function convertFallbackWeather(unit) {
    if (unit === "metric") {
        return fallbackWeather;
    }

    const celsiusToFahrenheit = (value) => Math.round((value * 9) / 5 + 32);
    const kmhToMph = (value) => Math.round(value * 0.621371);

    return {
        ...fallbackWeather,
        current: {
            ...fallbackWeather.current,
            temp: celsiusToFahrenheit(fallbackWeather.current.temp),
            feelsLike: celsiusToFahrenheit(fallbackWeather.current.feelsLike),
            windSpeed: kmhToMph(fallbackWeather.current.windSpeed)
        },
        forecast: fallbackWeather.forecast.map((day) => ({
            ...day,
            temp: celsiusToFahrenheit(day.temp)
        })),
        hourly: fallbackWeather.hourly.map((hour) => ({
            ...hour,
            temp: celsiusToFahrenheit(hour.temp)
        }))
    };
}

function formatLocalTime(isoString) {
    return isoString.slice(11, 16);
}

function formatDay(dateString) {
    return new Intl.DateTimeFormat("en", { weekday: "short" }).format(new Date(`${dateString}T00:00:00`));
}

function formatWindSpeed(speed) {
    const unit = activeUnit === "imperial" ? "mph" : "km/h";
    return `${Math.round(speed)} ${unit}`;
}

function formatVisibility(meters) {
    if (activeUnit === "imperial") {
        return `${(meters / 1609.34).toFixed(1)} mi`;
    }

    return `${(meters / 1000).toFixed(1)} km`;
}

function getUnitLabel() {
    return activeUnit === "metric" ? "\u00B0C" : "\u00B0F";
}

function setLoading(isLoading) {
    elements.loadingOverlay.classList.toggle("hidden", !isLoading);
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.classList.remove("hidden");
}

function hideError() {
    elements.errorMessage.classList.add("hidden");
}