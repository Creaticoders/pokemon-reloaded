let tablero, direccion, elegido
const file = 'assets/images'
const $seleccionar = document.querySelector('.seleccionar')
const $container = document.querySelector('.seleccionar__container')
const $batalla = document.querySelector('.batalla')

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
	}

	confirmarOk(elemento){
		elemento.imagenOK = true;
		dibujar();
	}

	cargar(){
		this.imagen = new Image();
		this.imagen.src = this.imagenURL;
		this.imagen.onload = ()=>{
			this.confirmarOk(this)
		};
	}
}

class Pokemon{

	constructor(nombre, tipo, ataque, hp,velocidad,preview,frenteURL, atrasURL, derURL, izqURL){

		//atributos
		this.nombre = nombre;
		this.tipo = tipo;
		this.ataque = ataque;
		this.hp = hp;
		this.velocidad = velocidad;
		this.preview = preview;

		//coordenadas
		this.x = 375;
		this.y = 250;

		// imagenes
		this.frente = new Imagen(frenteURL);

		this.atras = new Imagen(atrasURL);

		this.der = new Imagen(derURL);

		this.izq = new Imagen(izqURL);
	}

	mostrar(){
		
		const HTMLSring = featuringTemplate(this.nombre, this.tipo, this.preview)

		$container.innerHTML += HTMLSring
		const $pokemons = document.querySelectorAll('.seleccionar__pokemon')

		$pokemons.forEach(($pokemon)=>{
			$pokemon.addEventListener('click', ()=>{
				$seleccionar.classList.add('none')
				$batalla.classList.remove('none')
				elegido = this
				inicio()
			})
		})
	}
	seleccionar(){}
}

const pokemons = [

	new Pokemon('Pikachu', 'Electrico', 50, 45, 10,
		`${file}/pikachu.png`,
		`${file}/pikachu-frente.png`,
		`${file}/pikachu-atras.png`,
		`${file}/pikachu-derecha.png`,
		`${file}/pikachu-izquierda.png`,
	 ),
	new Pokemon('Pikachu', 'Electrico', 50, 45, 10,
		`${file}/pikachu.png`,
		`${file}/pikachu-frente.png`,
		`${file}/pikachu-atras.png`,
		`${file}/pikachu-derecha.png`,
		`${file}/pikachu-izquierda.png`,
	 ),
	new Pokemon('Pikachu', 'Electrico', 50, 45, 10,
		`${file}/pikachu.png`,
		`${file}/pikachu-frente.png`,
		`${file}/pikachu-atras.png`,
		`${file}/pikachu-derecha.png`,
		`${file}/pikachu-izquierda.png`,
	 ),
	new Pokemon('Pikachu', 'Electrico', 50, 45, 10,
		`${file}/pikachu.png`,
		`${file}/pikachu-frente.png`,
		`${file}/pikachu-atras.png`,
		`${file}/pikachu-derecha.png`,
		`${file}/pikachu-izquierda.png`,
	 ),
]
const $back = document.querySelector('.batalla__back')

$back.addEventListener('click', ()=>{
	$seleccionar.classList.remove('none')
	$batalla.classList.add('none')
})

pokemons.forEach(pokemon=>{
	pokemon.mostrar()
})


let fondo = new Imagen('assets/images/tile.png')

function inicio() {
	const canvas = document.getElementById('campo');
	tablero = canvas.getContext("2d")
	fondo.cargar();
	elegido.frente.cargar()
	elegido.atras.cargar()
	elegido.der.cargar()
	elegido.izq.cargar()

	document.addEventListener("keydown", teclado);
	
	dibujar()
}

function cargarImagen(elemento, url, load) {
	elemento = new Image();
	elemento.src = url;
	elemento.onload = load;
}


function dibujar() {
	if(fondo.imagenOK == true){
		tablero.drawImage(fondo.imagen, 0,0)
	}

	let pokemonDibujo = elegido.izq.imagen

	let derOk = elegido.der.imagenOK
	let izqOk = elegido.izq.imagenOK
	let frenteOk = elegido.frente.imagenOK
	let atrasOk = elegido.atras.imagenOK

	if(derOk && izqOk && frenteOk && atrasOk){
		if(direccion == teclas.UP){
			pokemonDibujo = elegido.atras.imagen;
		}
		if(direccion == teclas.DOWN){
			pokemonDibujo = elegido.frente.imagen;
		}
		if(direccion == teclas.LEFT){
			pokemonDibujo = elegido.izq.imagen;
		}
		if(direccion == teclas.RIGHT){
			pokemonDibujo = elegido.der.imagen;
		}
		tablero.drawImage(pokemonDibujo, elegido.x,elegido.y);
	}
}

function featuringTemplate(nombre, tipo, url){
	return(`
		<div class="seleccionar__pokemon-container">
			<div class="seleccionar__pokemon">
				<img  src="${url}" class="seleccionar__pokemon-imagen" />
				<h3 class="seleccionar__nombre">${nombre}</h3>
				<span class="seleccionar__tipo">${tipo}</span>
			</div>
		</div>
	`)
}

function teclado (datos) {
	
	let codigo = datos.keyCode;

	if(codigo == teclas.UP && elegido.y >= 0){

		elegido.y -= elegido.velocidad;
	}
	if(codigo == teclas.DOWN && elegido.y < 450){
		elegido.y += elegido.velocidad;
		
	}
	if(codigo == teclas.LEFT && elegido.x > 0){
		elegido.x -= elegido.velocidad;
	}
	if(codigo == teclas.RIGHT && elegido.x < 450){//160
		elegido.x += elegido.velocidad;
	}

	direccion = codigo;

	dibujar();

}