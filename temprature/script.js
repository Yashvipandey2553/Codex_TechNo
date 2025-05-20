document.addEventListener('DOMContentLoaded', function() {
   
    const convertBtn = document.getElementById('convert-btn');
    convertBtn.addEventListener('click', convertTemperature);
});


function convertTemperature() {

    const temperatureInput = document.getElementById('temperature').value;
    const temperature = parseFloat(temperatureInput);
    

    if (isNaN(temperature)) {
        alert("Please enter a valid number for temperature");
        return;
    }

    const selectedUnit = document.querySelector('input[name="unit"]:checked').value;
    

    let celsiusValue, fahrenheitValue, kelvinValue;
    
    if (selectedUnit === "celsius") {
        celsiusValue = temperature;
        fahrenheitValue = (temperature * 9/5) + 32;
        kelvinValue = temperature + 273.15;
    } else if (selectedUnit === "fahrenheit") {
        celsiusValue = (temperature - 32) * 5/9;
        fahrenheitValue = temperature;
        kelvinValue = (temperature - 32) * 5/9 + 273.15;
    } else {
        celsiusValue = temperature - 273.15;
        fahrenheitValue = (temperature - 273.15) * 9/5 + 32;
        kelvinValue = temperature;
    }
    
    document.getElementById('celsius-value').textContent = celsiusValue.toFixed(2);
    document.getElementById('fahrenheit-value').textContent = fahrenheitValue.toFixed(2);
    document.getElementById('kelvin-value').textContent = kelvinValue.toFixed(2);
}