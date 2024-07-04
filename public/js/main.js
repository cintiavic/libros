document.addEventListener('DOMContentLoaded', () => {
  const cargarLibros = (query = '/libros') => {
    fetch(query)
      .then(response => response.json())
      .then(libros => {
        const listaLibros = document.getElementById('listaLibros');
        listaLibros.innerHTML = '';
        if (libros.length === 0){
          listaLibros.innerHTML = "<p>No se encontraron libros que coincidan con los filtros de búsqueda</p>";
        }
        else{
          libros.forEach(libro => {
          
          const itemLibro = document.createElement('div');
          itemLibro.innerHTML = `
            <h4>${libro.tituloLibro}</h4>
            <img src="../uploads/${libro.portadaLibro}" alt="imagen portada del libro" style="width:100px">
            
            <p>Autor: ${libro.autorLibro}</p>
            <p>Género: ${libro.generoLibro}</p>
            <p>Año: ${libro.anioLibro}</p>
            <button onclick="editarLibro(${libro.idLibro})">Editar</button>
            <button onclick="borrarLibro(${libro.idLibro})">Borrar</button>
          `;
          listaLibros.appendChild(itemLibro);
        });
        }
      });
  };

  cargarLibros();

  const form = document.getElementById('formBusqueda');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const titulo = document.getElementById('tituloFiltro').value;
    const autor = document.getElementById('autorFiltro').value;
    const genero = document.getElementById('generoFiltro').value;
    const anio = document.getElementById('anioFiltro').value;
   

    let query = '/libros?';
    if (titulo) query += `titulo=${titulo}&`;
    if (autor) query += `autor=${autor}&`;
    if (genero) query += `genero=${genero}&`;
    if (anio) query += `anio=${anio}&`;

    cargarLibros(query);
  });

  const reset = document.getElementById('resetButton');
  reset.addEventListener('click',()=>{
    document.getElementById('tituloFiltro').value='';
    document.getElementById('autorFiltro').value='';
    document.getElementById('generoFiltro').value='';
    document.getElementById('anioFiltro').value='';
    cargarLibros();
  })
});

function editarLibro(id) {
  location.href = `/editarLibro?id=${id}`;
}

function borrarLibro(id) {
  if (confirm('¿Estás seguro de que deseas borrar este libro?')) {
    fetch(`/libros/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(result => {
        alert('Libro borrado con éxito');
        location.reload();
      })
      .catch(error => {
        console.error('❌  Error al borrar el libro:', error);
        alert('Hubo un error al borrar el libro.');
      });
  } else {
    // El usuario canceló la acción de borrado
    alert('Acción de borrado cancelada.');
  }
}