async function buscarClima() {
  const city = document.getElementById("city").value;
  const cityFormated = encodeURIComponent(city);

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

  document.querySelector(".result").innerHTML = `
    <h2>${nome}</h2>
    <p>Temperatura: ${temperatura}°C</p>
    <p>Clima: ${clima}</p>
    <p>Umidade: ${umidade}%</p>
  `;
}
