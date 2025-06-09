/* --- Creo la lista de frutas --- */
let listaFrutas = [
    {
        id: 1,
        nombre: "Arándano",
        precio: 5000,
        img: "../img/arandano.jpg",
    },
    {
        id: 2,
        nombre: "Banana",
        precio: 1000,
        img: "../img/banana.jpg",
    },
    {
        id: 3,
        nombre: "Frambuesa",
        precio: 3000,
        img: "../img/frambuesa.png",
    },
    {
        id: 4,
        nombre: "Frutilla",
        precio: 3000,
        img: "../img/frutilla.jpg",
    },
    {
        id: 5,
        nombre: "Kiwi",
        precio: 3000,
        img: "../img/kiwi.jpg",
    },
    {
        id: 6,
        nombre: "Mandarina",
        precio: 800,
        img: "../img/mandarina.jpg",
    },
    {
        id: 7,
        nombre: "Manzana",
        precio: 1500,
        img: "../img/manzana.jpg",
    },
    {
        id: 8,
        nombre: "Naranja",
        precio: 9000,
        img: "../img/naranja.jpg",
    },
    {
        id: 9,
        nombre: "Pera",
        precio: 2500,
        img: "../img/pera.jpg",
    },
    {
        id: 10,
        nombre: "Ananá",
        precio: 3000,
        img: "../img/anana.jpg",
    },
    {
        id: 11,
        nombre: "Pomelo amarillo",
        precio: 2000,
        img: "../img/pomelo-amarillo.jpg",
    },
    {
        id: 12,
        nombre: "Pomelo rojo",
        precio: 2000,
        img: "../img/pomelo-rojo.jpg",
    },
    {
        id: 13,
        nombre: "Sandía",
        precio: 12000,
        img: "../img/sandia.jpg",
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
let barraBusqueda = document.getElementById("barra-busqueda");
let nombreAlumno = document.querySelector(".nombre-alumno");
let ulProductos = document.getElementById("lista-productos");
let contadorCarrito = document.getElementById("contador-carrito");
let pElementosCarritos = document.getElementById("texto-items-carrito");
let precioTotal = document.getElementById("precio-total");

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
    /*  Recorro el array del carrito y en cada iteración del array, accedo y extraigo los datos del objeto para posteriormente, ubicarlos en el lugar 
        correspondiente para armar el bloque de HTML de forma dinámica y por último, modifico el HTML ya existente por el nuevo que creé. También, 
        modifico el contador de productos, poniendole el total de productos que hay en el carrito.
     */
    let htmlProductosCarrito = "";
    let contadorProductos = 0;
    
    if(carrito)
    {
        carrito.forEach(fruta => {
            htmlProductosCarrito += `
                <li>
                    <div class="card-producto">
                        <img class="imagen-producto" src="${fruta.img}" alt="${fruta.nombre}">
                        <h3 class="nombre-producto">${fruta.nombre}</h3>
                        <p class="cantidad-producto">Cantidad: ${fruta.cantidad}</p>
                        <p class="precio-producto">${fruta.precio}</p>
                        <button class="boton-eliminar">Eliminar</button>
                    </div>
                </li>
            `;
        contadorProductos = contadorProductos + fruta.cantidad;
        });

        pElementosCarritos.classList.add('hidden');

        contadorCarrito.innerText = `${contadorProductos}`;
    }
    else
    {
        pElementosCarritos.classList.remove('hidden');

        contadorCarrito.innerText = `0`; 
    }

    ulProductos.innerHTML = htmlProductosCarrito;

    console.log(carrito);
}

/* -- Agregar productos al carrito -- */
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
        for(let element of carritoParseado) 
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

    actualizarPrecioCarrito(carritoParseado);
}

/* -- Eliminar productos del carrito -- */
function eliminarProducto(e)
{
    let elementoClickeado = e.target;

    console.log(elementoClickeado);
    
    let contenedor = elementoClickeado.closest("div");

    console.log(contenedor);

    let elementoNombre = contenedor.querySelector(".nombre-producto");

    console.log(elementoNombre);

    let nombreProducto = elementoNombre.textContent;

    console.log(nombreProducto);

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

        pElementosCarritos.style.display = 'block';
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

    actualizarPrecioCarrito(carritoParseado);
}

/* -- Actualizar el precio total -- */
function actualizarPrecioCarrito(carrito)
{
    /*  Verifico si el carrito tiene productos, si tiene aunque sea uno, lo recorro con un forEach y extraigo el precio del producto. Lo modifico
        para convertirlo en un dato operable para realizar los calculos y lo guardo en una variable acumulativa. Por último, lo convierto nuevamente
        en un string para inyectarlo en el html.
     */
    
    let totalPrecioProducto = 0;
    let precioString = "";
    let precioParseado = 0;
    let precioFinal = 0;

    if(carrito)
    {
        carrito.forEach(fruta => {
            precioString = fruta.precio;
            precioString = precioString.replace("$", "");
            precioParseado = parseFloat(precioString);
            precioFinal = precioParseado * fruta.cantidad;

            totalPrecioProducto += precioFinal;
        });

        precioTotal.innerText = totalPrecioProducto.toString();
    }
    else
    {
        precioTotal.innerText = '0.00';
    } 
}

/* -- Ordenar productos alfabéticamente o por precios de menor a mayor -- */
function ordenarProductos(tipo)
{
    let carritoCopia = JSON.parse(localStorage.getItem("carrito"));

    if(tipo === 'alfabetico')
    {
        carritoCopia.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    else if(tipo === 'precio')
    {
        carritoCopia.sort((a, b) => 
            parseFloat(String(a.precio).replace("$", "")) -
            parseFloat(String(b.precio).replace("$", "")));
    }

    guardarCarrito(carritoCopia);

    mostrarCarrito(carritoCopia);
}

/* -- Obtener carrito -- */
function obtenerCarrito() 
{
    /*  Obtengo el carrito del LocalStorage, lo parseo a un array y lo retorno.
    */

    let carritoObtenido = localStorage.getItem("carrito");
    let carritoParseado = JSON.parse(carritoObtenido);

    return carritoParseado;
}

/* -- Guardar carrito -- */
function guardarCarrito(carrito) 
{
    /*  Guardo el carrito recibido al LocalStorage, previamente transformado a string.
    */

    let carritoStringify = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoStringify);
}

/* -- Limpiar el carrito -- */
function limpiarCarrito() 
{
    /*  Uso la función integrada del LocalStorage para eliminar el array existente, muestro los cambios después de hacerlo.
    */
    localStorage.removeItem("carrito");

    mostrarCarrito(obtenerCarrito());

    actualizarPrecioCarrito(obtenerCarrito());
}

window.addEventListener("DOMContentLoaded", () => 
{
    const botonesAgregar = document.querySelectorAll(".boton-agregar");
    const botonesEliminar = document.querySelectorAll(".boton-eliminar");
    const botonOrdenarNombres = document.querySelector(".boton-ordenar-nombres");
    const botonOrdenarPrecios = document.querySelector(".boton-ordenar-precios");  
    const botonVaciar = document.querySelector(".boton-vaciar-carrito");

    botonesAgregar.forEach(btn => btn.addEventListener("click", agregarProducto));
    botonesEliminar.forEach(btn => btn.addEventListener("click", () => {
        console.log("click eliminar");
    }));
    botonOrdenarNombres.addEventListener("click", () => {ordenarProductos("alfabetico")});
    botonOrdenarPrecios.addEventListener("click", () => {ordenarProductos("precio")});
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
    const carritoEnMemoria = obtenerCarrito() || [];
    imprimirDatosAlumno(alumno);
    mostrarFrutas(listaFrutas);
    mostrarCarrito(carritoEnMemoria);
    actualizarPrecioCarrito(carritoEnMemoria);
}

init();