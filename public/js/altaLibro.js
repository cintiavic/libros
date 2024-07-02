/* Este código proporciona la funcionalidad para crear y editar libros utilizando un solo formulario, basándose en si se ha proporcionado un ID de libro en la URL. */

document.addEventListener('DOMContentLoaded',
    /* El evento DOMContentLoaded se dispara cuando el contenido HTML inicial ha sido completamente cargado y analizado por el navegador, lo que asegura que el DOM está listo para ser manipulado. */
    () => {
    const urlParams = new URLSearchParams(window.location.search); //Crea un objeto URLSearchParams que representa los parámetros de la URL.
    const idLibro = urlParams.get('id');//Obtiene el valor del parámetro id de la URL. Este id corresponde al ID del libro que se va a editar
    console.log(idLibro);
    if (idLibro) {
        //si hay idLibro es que estoy en Editar, tengo que precargar los campos
      
      fetch(`/libros/${idLibro}`)
        .then(response => response.json())
        //lo que me devuelve la promesa json lo llamo libro
        .then(libro => {

          document.getElementById('tituloAlta').innerText="Editar Libro"
          document.getElementById('tituloLibro').value = libro[0].tituloLibro;
          document.getElementById('autorLibro').value = libro[0].autorLibro;
          document.getElementById('generoLibro').value = libro[0].generoLibro;
          document.getElementById('anioLibro').value = libro[0].anioLibro;
        });
    }
  
    /* Manejamos el boton Submit del formulario*/
    document.getElementById('formAltaLibro').addEventListener('submit', (event) => {
      event.preventDefault(); //Evita que el formulario se envíe de la manera tradicional (recargando la página).
  
      const libroData = { //recopilo los datos del form
        tituloLibro: document.getElementById('tituloLibro').value,
        autorLibro: document.getElementById('autorLibro').value,
        generoLibro: document.getElementById('generoLibro').value,
        anioLibro: document.getElementById('anioLibro').value
      };
  
      /*Determino el método y la url de la solicitud*/
      
      const method = idLibro ? 'PUT' : 'POST';//Si bookId está presente, usa PUT para actualizar un libro existente; de lo contrario, usa POST para crear un nuevo libro.
      const url = idLibro ? `/libros/${idLibro}` : '/libros'; //Similarmente, ajusta la URL de la solicitud según si estamos editando o creando un libro.

      /* Envio la solicitud*/
      /* Hace una solicitud fetch a la URL con el método determinado (POST o PUT).
          -Establece los headers para indicar que el contenido es JSON.
          -Convierte los datos del formulario en una cadena JSON para enviarlos en el cuerpo de la solicitud.
          -Maneja la respuesta del servidor:
              Muestra un mensaje de éxito y redirige a la página principal (/) si la solicitud fue exitosa.
              Muestra un mensaje de error si hubo un problema al guardar el libro. */
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(libroData)
      })
        .then(response => response.json())
        .then(result => {
          alert('libro guardado con éxito');
          location.href = '/';
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Hubo un error al guardar el libro');
        });
        
    });

    /*Manejamos el botón Cancelar del formulario*/
    document.getElementById('btnCancelar').addEventListener('click',()=>{
      location.href='/';
    })
  });
  