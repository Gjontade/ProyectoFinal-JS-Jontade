// Declaracion de variables | Objetos | Array:
const precioEntrada = 500;
const respAzar = document.getElementById("respuestaPelicula");

let asientos;
let frase1, frase2;

//Array de obj (peliculas)
const cartelera = [
	{
		foto: "./img/cartelera-jp.webp",
		nombre: "JURASSIC PARK",
		director: "Steven Spielberg",
		duracion: "2h 7min",
		genero: "Accion/Aventura/SciFy",
	},
	{
		foto: "./img/cartelera-rocky.webp",
		nombre: "ROCKY",
		director: "John G. Avildsen",
		duracion: "2h",
		genero: "Drama/Deporte",
	},
	{
		foto: "./img/cartelera-titanic.webp",
		nombre: "TITANIC",
		director: "James Cameron",
		duracion: "3h 14min",
		genero: "Drama/Romance",
	},
	{
		foto: "./img/cartelera-topgun.webp",
		nombre: "KARATE KID",
		director: "John G. Avildsen",
		duracion: "2h 6min",
		genero: "Accion/Drama/Familiar",
	},
	{
		foto: "./img/cartelera-mi3.webp",
		nombre: "TOP GUN",
		director: "Tony Scott",
		duracion: "1h 49min",
		genero: "Accion/Drama",
	},
	{
		foto: "./img/cartelera-karatekid.webp",
		nombre: "MISION IMPOSIBLE",
		director: "J.J. Abrams",
		duracion: "2h 6min",
		genero: "Accion/Aventura/Suspenso",
	},
];

//Precio Alimentos (candy)
const preciosAlimentos = {
	pochoclos: 200,
	chocolate: 100,
	gaseosa: 150,
	agua: 50,
};

//  [-----Ejecucion-----]
//-----Funcion Registro-----
function saludar() {
	let nombreInput = document.getElementById("nombreInput");
	let saludo = nombreInput.value.toUpperCase();
	let respuestaSaludar = document.getElementById("respuesta");

	if (saludo === "") {
		// SweetAlert2
		Swal.fire({
			title: '¡Has fallado!',
			text: 'Ingresa tu nombre o muere.',
			imageUrl: './img/terminator.webp',
			imageWidth: 400,
			imageHeight: 200,
			imageAlt: 'terminator apuntando con un arma',
			background: '#EEEEEE',
			color: '#27374D',
			confirmButtonColor: '#27374D',
		})
		return;
	} else {
		const mensaje =
			"<strong>¡HOLA " +
			saludo +
			"!</strong>" +
			"<br>" +
			"Puedes seleccionar una película de nuestro catálogo." +
			"<br>" +
			"(Si no sabes cual elegir, podes probar suerte 🍀)";
		respuestaSaludar.innerHTML = mensaje;

		//Guardar nombre en Local Storage
        localStorage.setItem("nombreUsuario", saludo);
	}
}

//Boton Registro
let boton0 = document.querySelector("#registro");
boton0.addEventListener("click", saludar);

//-----Funcion valor Total Asientos-----
function valor(a, b) {
	return a * b;
}

//-----Seleccion pelicula + asientos-----
const miFormulario = document.getElementById("miFormulario");
const seleccionInput = document.getElementById("seleccionar");
const asientosInput = document.querySelector("#cantAsientos");
const respuestaPelicula = document.getElementById("respuestaPelicula");

miFormulario.addEventListener("submit", function (event) {
	event.preventDefault();

	const peliculaSeleccionada = seleccionInput.value;
	const cantidadAsientos = Number(asientosInput.value);
	const total = valor(precioEntrada, cantidadAsientos);

	respuestaPelicula.innerHTML = `<strong>Reserva:</strong> <br> Pelicula seleccionada: <strong>${peliculaSeleccionada}</strong>.<br> Cantidad de sientos: ${cantidadAsientos}. Valor total: <strong>$${total}</strong>.`;

	// Guardar datos en Local Storage
    localStorage.setItem("peliculaSeleccionada", peliculaSeleccionada);
    localStorage.setItem("cantidadAsientos", cantidadAsientos);
});

//                                       ----------[FUNCION ASINCRONICA]----------
//-----Descipcion pelicula-----
async function cargarPeliculas() {
	const response = await fetch("./json/peliculas.json");
	const data = await response.json();
	return data;
};

const btnInformacionPeli = document.getElementById("informacionPeli");

btnInformacionPeli.addEventListener("click", async () => {
	const seleccionPelicula = document.getElementById("seleccionar").value;
	const peliculasData = await cargarPeliculas();
	const peliculaInfo = peliculasData.find(pelicula => pelicula.nombre === seleccionPelicula);

	if (peliculaInfo) {
		Swal.fire({
			title: peliculaInfo.nombre,
			html: `Director: ${peliculaInfo.director}.<br> Duración: ${peliculaInfo.duracion}.<br> Género: ${peliculaInfo.genero}.`,
			imageUrl: peliculaInfo.foto,
			imageWidth: 280,
			imageHeight: 400,
			imageAlt: peliculaInfo.nombre,
			background: '#EEEEEE',
			color: '#27374D',
			confirmButtonColor: '#27374D',
			confirmButtonText: 'Cerrar',
		});
	} else {
		Swal.fire({
			title: "Error",
			text: "No se encontró información de la película seleccionada.",
			icon: "error",
			confirmButtonColor: '#198754',
			confirmButtonText: 'Cerrar',
		});
	}
});

//-----Funcion Azar-----
function probarSuerte() {
	const indice = Math.floor(Math.random() * cartelera.length);
	const peliculaAzar = cartelera[indice].nombre;
	let tot;

	// SweetAlert2
	swal.fire({
		title: 'Cantidad de asientos:<br>(valor: $500 c/u)',
		input: 'number',
		background: '#EEEEEE',
		color: '#27374D',
		confirmButtonColor: '#27374D',
		inputAttributes: {
			min: 0,
			step: 1,
		},
		inputValue: 1,
		showCancelButton: true,
		confirmButtonText: 'Confirmar',
		cancelButtonText: 'Cancelar',
	}).then((result) => {
		if (result.isConfirmed) {
			asientos = Number(result.value);
			tot = valor(precioEntrada, asientos);

			frase1 =
			"La Suerte dice...: <strong>¡" +
			peliculaAzar +
			"!</strong>." +
			"<br>" +
			"Cantidad de sientos: " +
			asientos +
			". Valor total: <strong>$" +
			tot +
			"</strong>.";
		respAzar.innerHTML = frase1;
		
		//Guardar datos en Local Storage
		localStorage.setItem("peliculaAzar", peliculaAzar);
		localStorage.setItem("asientos", asientos);
		localStorage.setItem("total", tot);
		}
	});
}

//Boton Azar
let boton3 = document.getElementById("azar");
boton3.addEventListener("click", probarSuerte);

//-----Seleccion Candy-----
const formularioCandy = document.querySelector("#formularioCandy");
const confirmarAlimentos = document.querySelector("#confirmarCandy");
const respCandy = document.querySelector("#respuestaCandy");

confirmarAlimentos.addEventListener("click", () => {
	let carrito = [];
	let parcial = [];
	let final = 0;

	formularioCandy
		.querySelectorAll("input[type='checkbox']")
		.forEach(function (checkbox) {
			if (checkbox.checked) {
				const alimento = checkbox.value;
				const precio = preciosAlimentos[alimento];

				carrito.push(alimento);
				parcial.push(precio);
			}
		});

	//Calcular Total
	for (let i = 0; i < parcial.length; i++) {
		final += parcial[i];
	}

	// Almacenar en Local Storage
	localStorage.setItem("carrito", JSON.stringify(carrito));
	localStorage.setItem("totalCandy", final);

	frase2 = "<strong>----- Candy -----</strong> <br>";
	for (let i = 0; i < carrito.length; i++) {
		frase2 += `${carrito[i]} ($${parcial[i]})`;
		if (i < carrito.length - 1) {
			frase2 += " + ";
		}
	}

	frase2 +=
		" Total = <strong>$" +
		final +
		"</strong>.<br> (Podes abonar y retirar por el candy hasta 5 min antes de la pelicula).";
	respCandy.innerHTML = frase2;
});


// -----JSON y Carga de datos almacenados en Local Storage-----
window.addEventListener("load", function () {
	//carga saludo
    const cargaSaludo = localStorage.getItem("nombreUsuario");
	const cargaRespuestaSaludo = document.getElementById("cargaRespuestaSaludo");

    if (cargaSaludo) {
        document.getElementById("nombreInput").value = cargaSaludo;

		cargaRespuestaSaludo.innerHTML = `¡Hola <strong>${cargaSaludo}</strong>! ¿So' vo' todavia?. (Si no sos, ingresa un nuevo nombre) <br> Guardamos tu seleccion pero si queres cambiarla... ¡estas a tiempo loquito! <br> No te olvides de seleccionar el candy. 😉`

		// este evento borra los datos si se introduce un nuevo nombre
		nombreInput.addEventListener("input", () => {
			cargaRespuestaSaludo.innerHTML = "";
			respuestaPelicula.innerHTML = "";
			respAzar.innerHTML = "";

		});
    }
	
	//carga pelicula + asiento
	const cargaPeliculaSeleccionada = localStorage.getItem("peliculaSeleccionada");
    const cargaCantidadAsientos = localStorage.getItem("cantidadAsientos");
    if (cargaPeliculaSeleccionada && cargaCantidadAsientos) {
		respuestaPelicula.innerHTML = `<strong>Reserva:</strong> <br> Pelicula seleccionada: <strong>${cargaPeliculaSeleccionada}</strong>.<br> Cantidad de sientos: ${cargaCantidadAsientos}. Valor total: <strong>$${valor(precioEntrada, cargaCantidadAsientos)}</strong>.`;
    }
	
	//carga azar
	const cargaPeliculaAzar = localStorage.getItem("peliculaAzar");
	if (cargaPeliculaAzar) {
		respAzar.innerHTML = `La Suerte dice...: <strong>¡${cargaPeliculaAzar}!</strong>.<br>Cantidad de sientos: ${localStorage.getItem("asientos")}. Valor total: <strong>$${localStorage.getItem("total")}</strong>.`;
	}
});

// -----Confirmar la reserva-----
const btnConfirmarReserva = document.getElementById("confirmarReserva");

btnConfirmarReserva.addEventListener ("click", () => {
	const cargaPeliculaSeleccionada = localStorage.getItem("peliculaSeleccionada");
	const cargaCantidadAsientos = localStorage.getItem("cantidadAsientos");
	const cargaPeliculaAzar = localStorage.getItem("peliculaAzar");
	const cargaCarrito = JSON.parse(localStorage.getItem("carrito"));
	const cargaTotalCandy = localStorage.getItem("totalCandy");

	let mensaje = "";

	if (cargaPeliculaSeleccionada && cargaCantidadAsientos) {
		mensaje += `<strong>Pelicula seleccionada:</strong> ${cargaPeliculaSeleccionada}<br>`;
		mensaje += `<strong>Cantidad de sientos:</strong> ${cargaCantidadAsientos}<br>`;
		mensaje += `<strong>Valor total:</strong> $${valor(precioEntrada, cargaCantidadAsientos)}<br>`;
	}

	if (cargaPeliculaAzar) {
		mensaje += `<strong>La Suerte dice:</strong> ¡${cargaPeliculaAzar}!<br>`;
		mensaje += `<strong>Cantidad de sientos:</strong> ${localStorage.getItem("asientos")}<br>`;
		mensaje += `<strong>Valor total:</strong> $${localStorage.getItem("total")}<br>`;
	}	

	if (cargaCarrito && cargaTotalCandy) {
		mensaje += `<strong>Candy seleccionado:</strong> ${cargaCarrito.join(", ")}<br>`;
		mensaje += `<strong>Valor total del Candy:</strong> $${cargaTotalCandy}`;
	}

	// SweetAlert2
	Swal.fire({
		title: 'Hasta la vista... beibi.',
		imageUrl: './img/terminator.webp',
		imageWidth: 400,
		imageHeight: 200,
		imageAlt: 'terminator apuntando con un arma',
		background: '#EEEEEE',
		color: '#27374D',
		html: mensaje,
		showCancelButton: true,
		confirmButtonColor: '#198754',
		confirmButtonText: 'Confirmar',
		cancelButtonText: 'Cancelar',
	})	.then((result) => {
			if (result.isConfirmed) {
			
				if (cargaPeliculaSeleccionada && cargaCantidadAsientos) {
					localStorage.removeItem("peliculaSeleccionada");
					localStorage.removeItem("cantidadAsientos");
				}
				if (cargaPeliculaAzar) {
					localStorage.removeItem("peliculaAzar");
					localStorage.removeItem("asientos");
					localStorage.removeItem("total");
				}
				if (cargaCarrito && cargaTotalCandy) {
					localStorage.removeItem("carrito");
					localStorage.removeItem("totalCandy");
				}
			}			
		});
});



