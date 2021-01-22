window.addEventListener('DOMContentLoaded' , () => {

    //VARIABLES
    const imagenes = document.querySelectorAll('.imagen-galeria');
    const contenedor_imagen = document.querySelector('.contenedor-imagen');//   CONTET DE LA IMG
    const agregar_imagen = document.querySelector('.agregar-imagen');
    const cerra_imagen = document.querySelector('.close');

    //FUNCIONES
    imagenes.forEach( imagen => {
        imagen.addEventListener('click' , () => {
            console.log('click a esta imagen');
            let imagenRuta = imagen.getAttribute('src');//PARA VER LA RUTA DE LA IMAGEN
            verImagen(imagenRuta);
        })
    })

    const  verImagen = (imagenRuta) => {
        contenedor_imagen.classList.toggle('show');
        agregar_imagen.src = imagenRuta; //SUSTITUIR LA IMG CLIQUEADA
    }
    const closeImagen = () => {
        contenedor_imagen.classList.toggle('show');
    }
  



    //EJECUCION DE FUNCIONES Y EVENTOS
    cerra_imagen.addEventListener('click' , closeImagen);
  });