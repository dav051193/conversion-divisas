# Conversor de Divisas

## Descripción

Este proyecto es una aplicación web estática que permite convertir diferentes divisas utilizando tasas de cambio actuales obtenidas desde una API gratuita.

La aplicación valida los datos ingresados por el usuario, realiza cálculos de conversión, manipula el DOM para mostrar resultados dinámicos y utiliza animaciones para mejorar la experiencia visual.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- API REST
- JSON
- Azure Blob Storage
- GitHub

## Funcionalidades

- Conversión de divisas.
- Validación de cantidad ingresada.
- Selección de moneda origen y moneda destino.
- Botón para intercambiar monedas.
- Consumo de API externa.
- Procesamiento de datos JSON.
- Mostrar resultado dinámicamente.
- Historial de conversiones.
- Contador de conversiones realizadas.
- Botón para limpiar historial.
- Uso de banderas por moneda.
- Animaciones visuales.

## API utilizada

Se utilizó ExchangeRate-API:

https://open.er-api.com/v6/latest/USD

La aplicación consulta la API dependiendo de la moneda origen seleccionada.

## Estructura del proyecto

```text
conversor-divisas
│
├── index.html
├── README.md
│
├── css
│   └── styles.css
│
├── js
│   └── script.js
│
└── img
    ├── br.png
    ├── ca.png
    ├── eu.png
    ├── gb.png
    ├── jp.png
    ├── mx.png
    └── us.png