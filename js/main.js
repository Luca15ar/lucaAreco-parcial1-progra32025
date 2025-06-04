/* --- Creo la lista de frutas --- */
let listaFrutas = [
    {
        id: 1,
        nombre: "Arándano",
        precio: 5000,
        img: "../lucaAreco-parcial1-progra32025/img/arandano.jpg",
    },
    {
        id: 2,
        nombre: "Banana",
        precio: 1000,
        img: "../lucaAreco-parcial1-progra32025/img/banana.jpg",
    },
    {
        id: 3,
        nombre: "Frambuesa",
        precio: 3000,
        img: "../lucaAreco-parcial1-progra32025/img/frambuesa.png",
    },
    {
        id: 4,
        nombre: "Frutilla",
        precio: 3000,
        img: "../lucaAreco-parcial1-progra32025/img/frutilla.jpg",
    },
    {
        id: 5,
        nombre: "Kiwi",
        precio: 3000,
        img: "../lucaAreco-parcial1-progra32025/img/kiwi.jpg",
    },
    {
        id: 6,
        nombre: "Mandarina",
        precio: 800,
        img: "../lucaAreco-parcial1-progra32025/img/mandarina.jpg",
    },
    {
        id: 7,
        nombre: "Manzana",
        precio: 1500,
        img: "../lucaAreco-parcial1-progra32025/img/manzana.jpg",
    },
    {
        id: 8,
        nombre: "Naranja",
        precio: 9000,
        img: "../lucaAreco-parcial1-progra32025/img/naranja.jpg",
    },
    {
        id: 9,
        nombre: "Pera",
        precio: 2500,
        img: "../lucaAreco-parcial1-progra32025/img/pera.jpg",
    },
    {
        id: 10,
        nombre: "Ananá",
        precio: 3000,
        img: "../lucaAreco-parcial1-progra32025/img/anana.jpg",
    },
    {
        id: 11,
        nombre: "Pomelo amarillo",
        precio: 2000,
        img: "../lucaAreco-parcial1-progra32025/img/pomelo-amarillo.jpg",
    },
    {
        id: 12,
        nombre: "Pomelo rojo",
        precio: 2000,
        img: "../lucaAreco-parcial1-progra32025/img/pomelo-rojo.jpg",
    },
    {
        id: 13,
        nombre: "Sandía",
        precio: 12000,
        img: "../lucaAreco-parcial1-progra32025/img/sandia.jpg",
    },
];

/* --- Creo el objeto "Alumno" ---*/
let alumno = {
    dni: "45284179",
    nombre: "Luca",
    apellido: "Areco",
};

/* -- Obtengo los elementos del HTML -- */
let contenedorProductos = document.querySelector(".contenedor-productos");
let barraBusqueda = document.querySelector(".barra-busqueda");
let nombreAlumno = document.querySelector(".nombre-alumno");
let ulProductos = document.getElementById("productos");
let contadorCarrito = document.getElementById("contador-carrito")

/* --- Metodos --- */
/* -- Mostrar frutas --*/
function mostrarFrutas(listaFrutas)
{
    /*  Recorro el array de frutas con un forEach porque me resulta más legible y como son pocos objetos que contiene, optimizo el uso de memoria.
        En cada iteración del array, accedo y extraigo los datos del objeto para posteriormente, ubicarlos en el lugar correspondiente para armar 
        el bloque de HTML de forma dinámica y por último, modifico el HTML ya existente por el nuevo que creé. 
    */
    
    let htmlProductos = "";

    listaFrutas.forEach(fruta => {
        htmlProductos += `
            <div class="card-producto">
                <img class="imagen-producto" src="${fruta.img}" alt="${fruta.nombre}">
                <h3 class="nombre-producto">${fruta.nombre}</h3>
                <p class="precio-producto">$${fruta.precio}</p>
                <button class="boton-agregar">Agregar a carrito</button>
            </div>
        `;
    });

    contenedorProductos.innerHTML = htmlProductos;
}

/* -- Filtrar frutas -- */
barraBusqueda.addEventListener("keyup", filtrarFrutas);

function filtrarFrutas()
{
    /*  Creo un "escuchador de evento" para la barra buscadora que llama a la función "filtrarFrutas" cada que se levanta una tecla.
        El método guarda la letra pulsada en un array, que luego se usa para comparar si las letras que contenie están presentes en el array que tiene
        todas las frutas. Para ello uso el método propio de los arrays, filter, para comparar con el nombre de cada objeto del array si coincide
        con las letras presionadas. Por último, llama al método "mostrarFrutas" para mostrar las frutas que coincidan, pasandole el nuevo array
        que se generó, que contiene las frutas filtradas.
    */

    let valorInput = barraBusqueda.value;
    let listaFrutasFiltradas = listaFrutas.filter(fruta =>fruta.nombre.toLowerCase().includes(valorInput.toLowerCase()));

    mostrarFrutas(listaFrutasFiltradas);
}

/* -- Mostrar productos en el carrito -- */
function mostrarCarrito(carrito)
{
    let htmlProductosCarrito = "";

    carrito.forEach(fruta => {
        htmlProductosCarrito += `
            <li class="bloque-item>
                <img class="imagen-producto" src="${fruta.img}" alt="${fruta.nombre}">
                <h3 class="nombre-producto">${fruta.nombre}</h3>
                <p class="precio-producto">${fruta.precio}</p>
                <button class="boton-eliminar">Eliminar</button>
            </li>
        `;
    });

    ulProductos.innerHTML = htmlProductosCarrito;

    console.log(carrito);
}

/* Agregar productos al carrito*/
function agregarProducto(e)
{
    /*  Obtengo la referencia al elemento clickeado desde en base al evento, luego me fijo si ya hay algo cargado en el localStorage como "carrito".
        Reviso si tiene contenido, si tiene: aumento la cantidad y modifico la flag, sino: creo un array para añadirle los productos seleccionados.
        Creo un objeto con los datos de la fruta seleccionada y lo agrego al array. Guardo el array con los productos añadidos al carrito, en el localStorage
        y muestro todos los productos del carrito.
        */
    let elementoClickeado = e.target;
    
    let contenedor = elementoClickeado.closest("div");

    let elementoImagen = contenedor.querySelector(".imagen-producto");
    let elementoNombre = contenedor.querySelector(".nombre-producto");
    let elementoPrecio = contenedor.querySelector(".precio-producto");

    let imagenProducto = elementoImagen.src;
    let nombreProducto = elementoNombre.textContent;
    let precioProducto = elementoPrecio.textContent;

    let carritoParseado = obtenerCarrito();
    let flagProductoPreExistente = false;

    if(carritoParseado)
    {
        for (let element of carritoParseado) 
        {
            if(element.nombre == nombreProducto)
            {
                element.cantidad = element.cantidad + 1;
                flagProductoPreExistente = true;
                break;
            }
        }
    }
    else
    {
        carritoParseado = [];
    }

    if(!flagProductoPreExistente)
    {
        let nuevoProducto = 
        {
            "nombre": nombreProducto,
            "precio": precioProducto,
            "img": imagenProducto,
            "cantidad": 1,
        }

        carritoParseado.push(nuevoProducto);
    }

    guardarCarrito(carritoParseado);

    mostrarCarrito(carritoParseado);

    contadorCarrito.innerText = `${carritoParseado.length}`;
}

/*-- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna --*/
function obtenerCarrito() 
{
    let carritoObtenido = localStorage.getItem("carrito");
    let carritoParseado = JSON.parse(carritoObtenido);

    return carritoParseado;
}

/*-- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string --*/
function guardarCarrito(carrito) 
{
    let carritoStringify = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoStringify);
}

/*-- Eliminar productos del carrito */
function eliminarProducto(e)
{
    let elementoClickeado = e.target;
    
    let contenedor = elementoClickeado.closest("li");

    let elementoNombre = contenedor.querySelector(".nombre-producto");

    console.log(elementoNombre);

    let nombreProducto = elementoNombre.textContent;

    let carritoParseado = obtenerCarrito();
    let flagProductoPreExistente = false;

    if(carritoParseado)
    {
        for (let element of carritoParseado) 
        {
            if(element.nombre == nombreProducto)
            {
                element.cantidad = element.cantidad - 1;
                flagProductoPreExistente = true;
                break;
            }
        }
    }
    else
    {
        carritoParseado = [];
    }

    if(!flagProductoPreExistente)
    {
        alert(`No hay ningún ${nombreProducto} en el carrito.`);
    }
    else
    {
        carritoParseado = carritoParseado.filter((element) => 
        {
            if(element.cantidad == 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        });
    }

    guardarCarrito(carritoParseado);

    mostrarCarrito(carritoParseado);

    contadorCarrito.innerText = `${carritoParseado.length}`;
}

/* -- Limpiar el carrito -- */
function limpiarCarrito() 
{
    localStorage.removeItem("carrito");
}

window.addEventListener("DOMContentLoaded", () => 
{
    //cargarProductosCarrito();

    const botonesAgregar = document.querySelectorAll(".boton-agregar");
    const botonesEliminar = document.querySelectorAll(".boton-eliminar");  
    const botonVaciar = document.querySelector(".boton-vaciar-carrito"); 

    botonesAgregar.forEach(btn => btn.addEventListener("click", agregarProducto));
    botonesEliminar.forEach(btn => btn.addEventListener("click", eliminarProducto));
    botonVaciar.addEventListener("click", limpiarCarrito);
});

/*-- Mostrar datos del alumno -- */
function imprimirDatosAlumno(alumno)
{
    /*  Con el objeto tipo Alumno que recibo por parámetro, accedo y extraigo los datos que quiero mostrar, los ubico en un bloque de HTML nuevo 
        y finalizo modificando dicha parte del bloque HTML para añadir este nuevo elemento en un nav.
    */

    let htmlAlumno = "";

    htmlAlumno += `
        <nav>${alumno.nombre} ${alumno.apellido}</nav>
    `;

    nombreAlumno.innerHTML = htmlAlumno;

    console.log(`DNI: ${alumno.dni}, Nombre: ${alumno.nombre}, Apellido: ${alumno.apellido}`);
}

/* -- Función inicializadora -- */
function init()
{
    mostrarFrutas(listaFrutas);
    imprimirDatosAlumno(alumno);
}

init();