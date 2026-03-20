async function buscarClima() {
  const city = document.getElementById("city").value;
  const cityFormated = encodeURIComponent(city);

  const result = document.querySelector(".result");

  const apiKey = "a9ae6103000e40a8ae388c5705aae86a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityFormated}&appid=${apiKey}&units=metric&lang=pt_br`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  if (dados.cod === "404") {
    document.querySelector(".result").innerHTML = "Cidade não encontrada";
    return;
  }

  const nome = dados.name;
  const temperatura = dados.main.temp;
  const clima = dados.weather[0].description;
  const umidade = dados.main.humidity;
  const icon = dados.weather[0].icon;

  const climaTexto = clima.toLowerCase();

  if (
    climaTexto.includes("chuva") ||
    climaTexto.includes("garoa") ||
    climaTexto.includes("tempestade")
  ) {
    document.body.style.backgroundImage = "url('./img/background-rain.png')";
  } else if (
    climaTexto.includes("nuvens") ||
    climaTexto.includes("nublado") ||
    climaTexto.includes("névoa") ||
    climaTexto.includes("nevoa") ||
    climaTexto.includes("neblina")
  ) {
    document.body.style.backgroundImage = "url('./img/background-cloudy.png')";
  } else if (climaTexto.includes("céu limpo") || climaTexto.includes("sol")) {
    document.body.style.backgroundImage = "url('./img/background-sunny.png')";
  } else {
    document.body.style.backgroundImage = "url('./img/background.png')";
  }

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";

  result.innerHTML = `
    <h2>${nome}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
    <div class="temp">${temperatura}°C</div>
    <p>${clima}</p>
    <p>💧 Umidade: ${umidade}%</p>
  `;
}
