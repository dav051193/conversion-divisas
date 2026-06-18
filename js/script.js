const formulario = document.getElementById("formulario");
const cantidadInput = document.getElementById("cantidad");
const monedaOrigen = document.getElementById("monedaOrigen");
const monedaDestino = document.getElementById("monedaDestino");
const mensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");
const historial = document.getElementById("historial");
const btnIntercambiar = document.getElementById("intercambiar");
const btnLimpiar = document.getElementById("limpiarHistorial");
const contadorTexto = document.getElementById("contador");
const banderaOrigen = document.getElementById("banderaOrigen");
const banderaDestino = document.getElementById("banderaDestino");

let contadorConversiones = 0;

const imagenes = {
  USD: "img/us.png",
  MXN: "img/mx.png",
  EUR: "img/eu.png",
  GBP: "img/gb.png",
  JPY: "img/jp.png",
  CAD: "img/ca.png",
  BRL: "img/br.png"
};

function actualizarBanderas() {
  banderaOrigen.src = imagenes[monedaOrigen.value];
  banderaDestino.src = imagenes[monedaDestino.value];
}

monedaOrigen.addEventListener("change", actualizarBanderas);
monedaDestino.addEventListener("change", actualizarBanderas);

btnIntercambiar.addEventListener("click", () => {
  const temp = monedaOrigen.value;
  monedaOrigen.value = monedaDestino.value;
  monedaDestino.value = temp;
  actualizarBanderas();
});

btnLimpiar.addEventListener("click", () => {
  historial.innerHTML = "";
  contadorConversiones = 0;
  contadorTexto.textContent = "Conversiones realizadas: 0";
  resultado.style.display = "none";
  mensaje.textContent = "";
});

formulario.addEventListener("submit", async function(evento) {
  evento.preventDefault();

  const cantidad = parseFloat(cantidadInput.value);
  const origen = monedaOrigen.value;
  const destino = monedaDestino.value;

  mensaje.textContent = "";

  if (
    cantidadInput.value.trim() === "" ||
    isNaN(cantidad) ||
    cantidad <= 0
  ) {
    resultado.style.display = "none";
    mensaje.textContent = "Ingrese una cantidad válida mayor a cero.";
    return;
  }

  resultado.style.display = "block";
  resultado.innerHTML = "⏳ Consultando tasas de cambio...";

  try {
    const url = `https://open.er-api.com/v6/latest/${origen}`;
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const datos = await respuesta.json();

    if (datos.result !== "success") {
      throw new Error("La API no regresó datos correctos");
    }

    const tasa = datos.rates[destino];

    if (!tasa) {
      throw new Error("No se encontró la moneda destino");
    }

    const conversion = cantidad * tasa;
    const fecha = new Date().toLocaleString();

    resultado.innerHTML = `
      <img src="${imagenes[origen]}" width="35">
      ${cantidad.toFixed(2)} ${origen}
      =
      <img src="${imagenes[destino]}" width="35">
      ${conversion.toFixed(2)} ${destino}
      <br>
      <small>Tasa: 1 ${origen} = ${tasa} ${destino}</small>
      <br>
      <small>Actualizado: ${fecha}</small>
    `;

    resultado.classList.remove("animar");
    void resultado.offsetWidth;
    resultado.classList.add("animar");

    const item = document.createElement("li");
    item.innerHTML = `
      <img src="${imagenes[origen]}" width="20">
      ${cantidad} ${origen}
      →
      <img src="${imagenes[destino]}" width="20">
      ${conversion.toFixed(2)} ${destino}
    `;

    historial.prepend(item);

    while (historial.children.length > 10) {
      historial.removeChild(historial.lastChild);
    }

    contadorConversiones++;
    contadorTexto.textContent = `Conversiones realizadas: ${contadorConversiones}`;

  } catch (error) {
    resultado.style.display = "block";
    resultado.innerHTML = "❌ Error al conectar con la API. Intenta de nuevo.";
    console.error(error);
  }
});

actualizarBanderas();