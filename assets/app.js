//variables
const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('.lista-tereas');
let tareas = [{ id: 1690921541612, tarea: "Dominando Local Storage Js" }, { id: 1690921582796, tarea: "Practicando HTML y CSS" }]

//eventListener
eventListener();
function eventListener() {
    document.addEventListener('DOMContentLoaded', () => {
        tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        crearHtml();
    });

    formulario.addEventListener('submit', agregarTarea);
}

//funciones
function agregarTarea(e) {
    e.preventDefault();
    const tarea = document.querySelector('#text-tarea').value;
    //validacion
    if (tarea === '') {
        mostrarError();
        return;
    }
    tareaObj = {
        id: Date.now(),
        tarea: tarea,
    }
    tareas = [...tareas, tareaObj];
    crearHtml();
    formulario.reset();
}

function crearHtml() {
    limpiarHtml();
    if (tareas.length > 0) {
        tareas.forEach(tarea => {

            const btnEliminar = document.createElement('a');
            btnEliminar.textContent = 'X';
            btnEliminar.classList.add('btn-eliminar');
            btnEliminar.onclick = () => {
                eliminarTarea(tarea.id);
            }

            const li = document.createElement('li');
            li.textContent = tarea.tarea;
            li.appendChild(btnEliminar);

            listaTareas.appendChild(li);
        });
    }
    syncLocalStorage();
}

function mostrarError() {
    const spanError = document.querySelector('#error');
    spanError.classList.remove('hidden');
    setTimeout(() => {
        spanError.classList.add('hidden');
    }, 3500);

}

function limpiarHtml() {
    while (listaTareas.firstChild) {
        listaTareas.removeChild(listaTareas.firstChild);
    }
}

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    crearHtml();
}

function syncLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

