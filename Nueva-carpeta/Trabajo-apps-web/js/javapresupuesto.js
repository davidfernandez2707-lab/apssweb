const formulario = document.getElementById("formulario");

const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const checkPrivacidad = document.getElementById("privacidad");

let valida ={
nombre: false,
apellidos: false,
telefono: false,
correo: false
}
function setErrorfor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
}

function setSuccessfor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

nombre.addEventListener("blur",()=>{
    let name_re = /^[a-zA-Z ]{1,15}$/;

    if(nombre.value == ""  || nombre.value==null){
        valida.nombre=false;
        setErrorfor(nombre, "No se puede dejar el nombre en blanco");
    }else{
        if(!name_re.exec(nombre.value)){
            valida.nombre=false;
            setErrorfor(nombre, "El nombre tiene que tener entre 2 y 15 caracteres");
        }else{
            valida.nombre=true;
            setSuccessfor(nombre)
        }
    }
})

apellidos.addEventListener("blur",()=>{
    let apellidos_re = /^[a-zA-Z ]{1,40}$/;

    if(apellidos.value == ""  || apellidos.value==null){
        valida.apellidos=false;
        setErrorfor(apellidos, "No se puede dejar los apellidos en blanco");
    }else{
        if(!apellidos_re.exec(apellidos.value)){
            valida.apellidos=false;
            setErrorfor(apellidos, "Los apellidos tienen que tener entre 2 y 40 caracteres");
        }else{
            valida.apellidos=true;
            setSuccessfor(apellidos)
        }
    }
})

telefono.addEventListener("blur",()=>{
    let telefono_re = /^[0-9_.+\- ]{1,9}$/;

    if(telefono.value == ""  || telefono.value==null){
        valida.telefono=false;
        setErrorfor(telefono, "No se puede dejar el telefono en blanco");
    }else{
        if(!telefono_re.exec(telefono.value)){
            valida.telefono=false;
            setErrorfor(telefono, "El telefono tiene que tener entre 2 y 9");
        }else{
            valida.telefono=true;
            setSuccessfor(telefono)
        }
    }
})

correo.addEventListener("blur",()=>{
    let correo_re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(correo.value == ""  || correo.value==null){
        valida.correo=false;
        setErrorfor(correo, "No se puede dejar el correo en blanco");
    }else{
        if(!correo_re.exec(correo.value)){
            valida.correo=false;
            setErrorfor(correo, "No insertó un correo válido");
        }else{
            valida.correo=true;
            setSuccessfor(correo)
        }
    }
})

formulario.addEventListener("submit", (e) => {
      nombre.dispatchEvent(new Event("blur"));
    apellidos.dispatchEvent(new Event("blur"));
    telefono.dispatchEvent(new Event("blur"));
    correo.dispatchEvent(new Event("blur"));

    if (!valida.nombre || !valida.apellidos || !valida.telefono || !valida.correo) {
        e.preventDefault();
        alert("Por favor complete correctamente los campos del apartado 'Datos'.");
        return;
 
    }
    if (!checkPrivacidad.checked) {
        e.preventDefault();
        alert("Debe aceptar la política de privacidad para enviar el formulario.");
        return;
    }

    e.preventDefault(); 
    alert("Formulario enviado correctamente. Serás redirigido a la página principal.");
    window.location.href = "/apssweb/Nueva-carpeta/Trabajo-apps-web/index.html"; 

});



let carrito = []

const SelectorProducto = document.getElementById("seleccion-producto")
const botonAniadirCarrito = document.getElementById("añadir-al-carrito")
const contenedorArticulosCarrito = document.getElementById("articulos-carrito")
const elementoPresupuestoFinal = document.getElementById("presupuesto-final")

botonAniadirCarrito.addEventListener("click", () => {
    const opcionSeleccionada = SelectorProducto.options[SelectorProducto.selectedIndex]
    const valorSeleccionado = opcionSeleccionada.value

    if(!valorSeleccionado) {
        alert("Seleccione un producto valido")
        return
    }

    const [nombreProducto, precioProducto] = valorSeleccionado.split(":")
    const precio = parseFloat(precioProducto)

    carrito.push({ nombre: nombreProducto, precio })

    actualizarCarrito()
})

function actualizarCarrito() {
    contenedorArticulosCarrito.innerHTML = ""

    let totalCarrito = 0

    carrito.forEach((producto, index) =>{
        totalCarrito += producto.precio

        const articuloCarrito = document.createElement("div")
        articuloCarrito.classList.add("articulo-carrito")
        articuloCarrito.innerHTML = `
        ${producto.nombre} - ${producto.precio.toFixed(2)}€
        <button class="eliminar-articulo" data-index='${index}'>Eliminar</button>
        `
        contenedorArticulosCarrito.appendChild(articuloCarrito)
    })

document.querySelectorAll('.eliminar-articulo').forEach((boton) => {
    boton.addEventListener('click', (e) => {
        const index = e.target.dataset.index
        eliminarArticulo(index)
    })
})

    actualizarPresupuestoFinal()
}

function eliminarArticulo(index) {
    carrito.splice(index, 1)

    actualizarCarrito()
}

function actualizarPresupuestoFinal() {
    let total = carrito.reduce((suma, item) => suma + item.precio, 0)

    const extrasSeleccionados = document.querySelectorAll(".checkbox-extra:checked")
    extrasSeleccionados.forEach((checkbox) => {
        const [, precioExtra] = checkbox.value.split(':')
        total += parseFloat(precioExtra)
      
    })

const radioDescuento = document.querySelector('input[name="plazo-entrega"]:checked')
if(radioDescuento) {
    const valorDescuento = parseFloat(radioDescuento.value)
    total = total - (total * valorDescuento)
}

    elementoPresupuestoFinal.textContent = `Presupuesto final: ${total.toFixed(2)}€`
}

const checkboxesExtras = document.querySelectorAll(".checkbox-extra")
checkboxesExtras.forEach((checkbox) => {
    checkbox.addEventListener('change', actualizarPresupuestoFinal)
})

const radiosDescuento = document.querySelectorAll('input[name="plazo-entrega"]')
radiosDescuento.forEach((radio) => {
    radio.addEventListener('change', actualizarPresupuestoFinal)
})

