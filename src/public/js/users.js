window.addEventListener('DOMContentLoaded' , () => {
   //EVNTOS
    let title_header = document.querySelector('.title-header');

   //FUNCIONES
   const titleHide = () => {
       title_header.className = 'colo-h1-user';
   }


   //EJECUCIONES DE LOS EVENTOS
   window.addEventListener('load' , titleHide);
});