const temperature = 28;
const windSpeed = 12;

const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;

document.querySelector("#currentyear").textContent = currentYear;
document.querySelector("#lastModified").textContent = `Last Modified: ${lastModified}`;

function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
}

const windChillElement = document.querySelector("#wind-chill");

if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = `${windChill.toFixed(1)} °C`;
} else {
    windChillElement.textContent = "N/A";
}