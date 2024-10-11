class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = [];
        this.calificaciones = [];
    }

    agregarMateria(materia) {
        this.materias.push(materia);
    }

    agregarCalificacion(calificacion) {
        this.calificaciones.push(calificacion);
    }

    obtenerPromedio() {
        if (this.calificaciones.length === 0) return 0;
        const suma = this.calificaciones.reduce((a, b) => a + b, 0);
        return suma / this.calificaciones.length;
    }
}

// Lista de alumnos
let alumnos = [];

// Guardar datos en LocalStorage
function guardarDatos() {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    alert('Datos guardados correctamente.');
}

// Cargar datos desde LocalStorage
function cargarDatos() {
    const datosGuardados = localStorage.getItem('alumnos');
    if (datosGuardados) {
        alumnos = JSON.parse(datosGuardados);
        actualizarListaAlumnos();
        actualizarSelectAlumnos();
        alert('Datos cargados correctamente desde LocalStorage');
    }
}

// Actualizar la lista de alumnos en el select
function actualizarSelectAlumnos() {
    const alumnoSelect = document.getElementById('alumnoSelect');
    alumnoSelect.innerHTML = '<option value="">Selecciona un alumno</option>'; // Resetear el select

    alumnos.forEach((alumno, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${alumno.nombre} ${alumno.apellidos}`;
        alumnoSelect.appendChild(option);
    });
}

// Formulario para agregar alumno
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;

    const nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);

    actualizarListaAlumnos();
    actualizarSelectAlumnos();
});

// Formulario para inscribir materias y agregar calificaciones
document.getElementById('subjectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const alumnoIndex = document.getElementById('alumnoSelect').value;
    const materia = document.getElementById('materia').value;
    const calificacion = parseFloat(document.getElementById('calificacion').value);

    if (alumnoIndex !== "") {
        const alumno = alumnos[alumnoIndex];
        alumno.agregarMateria(materia);
        alumno.agregarCalificacion(calificacion);

        alert(`Materia ${materia} con calificación ${calificacion} agregada a ${alumno.nombre}.`);
        mostrarDetallesAlumno(alumnoIndex); // Actualizamos los detalles del alumno seleccionado
    } else {
        alert('Por favor, selecciona un alumno.');
    }
});

// Actualizar la lista de alumnos
function actualizarListaAlumnos() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';

    alumnos.forEach((alumno, index) => {
        const li = document.createElement('li');
        li.textContent = `${alumno.nombre} ${alumno.apellidos}, Edad: ${alumno.edad}`;
        li.addEventListener('click', () => mostrarDetallesAlumno(index));
        studentList.appendChild(li);
    });
}

// Mostrar detalles del alumno (incluyendo materias y calificaciones)
function mostrarDetallesAlumno(index) {
    const alumno = alumnos[index];
    const studentDetails = document.getElementById('studentDetails');

    let detallesHtml = `
        <h3>${alumno.nombre} ${alumno.apellidos}</h3>
        <p>Edad: ${alumno.edad}</p>
        <p>Materias inscritas: ${alumno.materias.join(', ')}</p>
        <p>Calificaciones: ${alumno.calificaciones.join(', ')}</p>
        <p>Promedio de calificaciones: ${alumno.obtenerPromedio().toFixed(2)}</p>
    `;

    studentDetails.innerHTML = detallesHtml;
}



// Agregar evento al botón de guardar datos
document.getElementById('saveDataButton').addEventListener('click', guardarDatos);

let slideIndex = 0;
const slides =
[...document.querySelectorAll('.slide')];
console.log(slides);

//funcion para hacer un carrusel de imagenes

function showSlides(){
    slides.forEach(slide => slide.classList.remove('active'));

    slideIndex ++;
    if(slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex -1].classList.add ('active');

    setTimeout(showSlides,3000);

}
showSlides();
