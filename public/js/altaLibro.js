/* Este código proporciona la funcionalidad para crear y editar libros utilizando un solo formulario, basándose en si se ha proporcionado un ID de libro en la URL. */

document.addEventListener('DOMContentLoaded',
    /* El evento DOMContentLoaded se dispara cuando el contenido HTML inicial ha sido completamente cargado y analizado por el navegador, lo que asegura que el DOM está listo para ser manipulado. */
    () => {
    const urlParams = new URLSearchParams(window.location.search); //Crea un objeto URLSearchParams que representa los parámetros de la URL.
    const idLibro = urlParams.get('id');//Obtiene el valor del parámetro id de la URL. Este id corresponde al ID del libro que se va a editar
  
    if (idLibro) {
        //si hay idLibro es que estoy en Editar, tengo que precargar los campos
      
      fetch(`/libros/${idLibro}`)
        .then(response => response.json())
        //lo que me devuelve la promesa json lo llamo libro
        .then(libro => {
         

          document.getElementById('tituloAlta').innerText="Editar Libro"
          document.getElementById('portadaImg').innerHTML=`<img src="./uploads/${libro[0].portadaLibro}" alt="imagen portada del libro" style="width:100px">`;
                                                      
          document.getElementById('tituloLibro').value = libro[0].tituloLibro;
          document.getElementById('autorLibro').value = libro[0].autorLibro;
          document.getElementById('generoLibro').value = libro[0].generoLibro;
          document.getElementById('anioLibro').value = libro[0].anioLibro;
          
        });
    }


    document.getElementById('formAltaLibro').addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional.
  
      const formData = new FormData(event.target); // Usa FormData para recopilar los datos del formulario, incluyendo archivos.
      
      const method = idLibro ? 'PUT' : 'POST'; // Si idLibro está presente, usa PUT para actualizar; de lo contrario, usa POST para crear.
      const url = idLibro ? `/libros/${idLibro}` : '/libros';
  
      fetch(url, {
          method: method,
          body: formData // Usa FormData directamente como cuerpo de la solicitud.
      })
      .then(response => {
        
        if (!response.ok) {
            
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(result => {
       
          alert('Libro guardado con éxito');
         
          location.href = '/';
      })
      .catch((error) => {
          console.error('❌  Error:', error);
          alert('Hubo un error al guardar el libro');
      });
  });

    /*Manejamos el botón Cancelar del formulario*/
    document.getElementById('btnCancelar').addEventListener('click',()=>{
      location.href='/';
    })
  });
  