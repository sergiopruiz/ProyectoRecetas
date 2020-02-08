// Evento click para crear bloques para la inserción de ingredientes
window.addEventListener("DOMContentLoaded", e => {
    let plantilla = document.getElementById('bloque-alimento');
    let campo = document.getElementById('campo-nuevo');
    document.getElementById('nuevoAlimento').addEventListener('click', e => {
        campo.innerHTML += plantilla.innerHTML;
    });
});