/* Este código se ejecuta cuando la página se carga completamente, obtiene la lista de libros del servidor y los muestra en la página. Además, proporciona funciones para editar y eliminar libros, actualizando la interfaz de usuario en consecuencia. */

document.addEventListener(
    'DOMContentLoaded',/* Este evento se dispara cuando todo el contenido del DOM ha sido completamente cargado y analizado, sin esperar a que las hojas de estilo, imágenes y subframes terminen de cargar. Esto asegura que el código se ejecuta una vez que la página está lista. */
    () => {
            /* Fetch hace una solicitud GET a la ruta /libros en el servidor para obtener la lista de libros.*/
            fetch('/libros')
            /* Convierto la respuesta de la solicitud a formato JSON. */
            .then(response => response.json())
            /*Trabajo con los datos obtenidos, que son una lista de libros*/
            .then(libros => {
                /* Obtiene el elemento del DOM con el ID listaLibros donde se mostrará la lista de libros: */
                const listaLibros = document.getElementById('listaLibros');
                /* Limpia cualquier contenido existente en el contenedor:  */
                listaLibros.innerHTML = '';

                libros.forEach(libro => {
                /* Itera sobre cada libro en la lista de libros obtenida. */
                /* Crea un nuevo elemento div para cada libro. */
                const itemLibro = document.createElement('div');
                /* Llena el div con la información del libro y agrega botones para editar y eliminar. */
                itemLibro.innerHTML = `
                    <h3>${libro.tituloLibro}</h3>
                    <p>Author: ${libro.autorLibro}</p>
                    <p>Genre: ${libro.generoLibro}</p>
                    <p>Year: ${libro.anioLibro}</p>
                    <button onclick="editarLibro(${libro.id})">Editar</button>
                    <button onclick="borrarLibro(${libro.id})">Borrar</button>
                `;
                /*Añade el div del libro al contenedor listaLibros.*/
                listaLibros.appendChild(libroItem);
                });
            });
        }
);
  

function editarlibro(id) {
   /*  /bookForm.html?id=${id}``: Redirige al usuario a bookForm.html, pasando el ID del libro como un parámetro en la URL. Esto permite que el formulario de edición sepa qué libro debe cargar y editar */
    location.href = `/altaLibro.html?id=${id}`;
  }
  
function borrarLibro(id) {
    //Esta función se llama cuando el usuario hace clic en el botón "Delete" de un libro específico.
    //Hace una solicitud DELETE a la ruta /libros/{id} en el servidor, donde {id} es el ID del libro a eliminar.
    fetch(`/libros/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json()) //Convierte la respuesta a formato JSON.
      .then(result => {
        alert('libro borrado con éxito');//Trabaja con el resultado de la eliminación.Muestra una alerta indicando que el libro ha sido eliminado exitosamente.
        location.reload(); //Recarga la página para actualizar la lista de libros y reflejar los cambios (es decir, que el libro eliminado ya no aparezca).
      });
  }
  