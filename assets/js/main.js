let tablero, direccion

const teclas = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
}

class Imagen{
	constructor(url){
		this.imagenURL = url;
		this.imagenOK = false
		this.imagen = new Image();
		this.imagen.src = this.imagenURL;
		
	}

	confirmarOk(elemento){
		console.log(this)
		console.log('Hola')
		elemento.imagenOK = true;
		console.log(elemento.imagenOK)
		dibujar();
	}
}

class Pokemon{

	constructor(nombre, tipo, rapidez, defensa, ataque, hp,preview,x,y,frenteURL, atrasURL, derURL, izqURL){

		//atributos
		this.nombre = nombre;
		this.tipo = tipo;
		this.caracteristicas = [
			{
				nombre: 'Rapidez',
				valor: rapidez
			},
			{
				nombre: 'Defensa',
				valor: ataque
			},
			{
				nombre: 'Ataque',
				valor: ataque
			},
			{
				nombre: 'Hp',
				valor: hp
			},
		]
		this.preview = preview

		//coordenadas
		this.x = x;
		this.y = y;

		// imagenes
		this.frente = new Imagen(frenteURL);

		this.atras = new Imagen(atrasURL);

		this.der = new Imagen(derURL);

		this.izq = new Imagen(izqURL);
	}

	mostrar(){
		const $seleccionar = document.querySelector('.seleccionar')
		const $container = document.querySelector('.seleccionar__container')
		const $loader = document.querySelector('.loader')
		const HTMLSring = featuringTemplate(this.nombre, this.tipo, this.caracteristicas, this.preview)
		$container.innerHTML += HTMLSring
		const $pokemons = document.querySelectorAll('.seleccionar__pokemon')

		$pokemons.forEach(($pokemon)=>{
			$pokemon.addEventListener('click', ()=>{
				$seleccionar.classList.add('none')
				$loader.classList.remove('none')

				setTimeout(()=>{
					const $batalla = document.querySelector('.batalla')
					$loader.classList.add('none')
					$batalla.classList.remove('none')

					inicio()
				},3000)
			})
		})
	}
}

const pokemons = [

	new Pokemon('Pikachu', 'Electrico', 50, 45, 60, 50, 'assets/images/pikachu.png'),
	new Pokemon('Pikachu', 'Electrico', 50, 45, 60, 50, 'assets/images/pikachu.png'),
	new Pokemon('Pikachu', 'Electrico', 50, 45, 60, 50, 'assets/images/pikachu.png'),
	new Pokemon('Pikachu', 'Electrico', 50, 45, 60, 50, 'assets/images/pikachu.png')
]


pokemons.forEach(pokemon=>{
	pokemon.mostrar()
})


let fondo = new Imagen('assets/images/tile.png')
console.log(fondo)

function inicio() {
	const canvas = document.getElementById('campo');
	tablero = canvas.getContext("2d")

	fondo.imagen.onload = ()=>{
		fondo.confirmarOk(fondo)
	};

	console.log(fondo)
	// cargarImagen(fondo.imagen, fondo.url, fondo.confirmarOk)

	// document.addEventListener("keydown", teclado)
	dibujar()
}

function cargarImagen(elemento, url, load) {
	elemento = new Image();
	elemento.src = url;
	elemento.onload = load;
}

function teclado(e) {
	let codigo = e.keyCode;
	console.log(codigo)
}

function dibujar() {
	console.log(fondo.imagenOK)
	if(fondo.imagenOK == true){
		tablero.drawImage(fondo.imagen, 0,0)
	}
}

function featuringTemplate(nombre, tipo, caracteristicas, url){
	return(`
		<div class="seleccionar__pokemon-container">
			<div class="seleccionar__pokemon">
				<img  src="${url}" class="seleccionar__pokemon-imagen" />
				<h3 class="seleccionar__nombre">${nombre}</h3>
				<span class="seleccionar__tipo">${tipo}</span>
			</div>
			<div class="seleccionar__caracteristicas">
				${
					caracteristicas.map(({nombre, valor})=>`
						<div class="seleccionar__caracteristica">
							<span class="seleccionar__nombre--caracteristica">${nombre}</span>
							<span class="seleccionar__valor">${valor}</span>
							<div class="seleccionar__grafico">
								<div class="seleccionar__cantidad ${choiseClass(valor)}" style="width: ${valor}%;"></div>
							</div>

						</div>
					`)
				}
				
			</div>
		</div>
	`)
}

function choiseClass(valor) {
	if(valor > 0 && valor <= 25){
		return 'bad'
	}
	if(valor > 25 && valor <= 50){
	 return 'medium'
	}
	if(valor > 50 && valor <= 75){
	 return 'good'
	}
	if(valor > 75 && valor <= 100){
	 return 'excelent'
	}
	return ''

}