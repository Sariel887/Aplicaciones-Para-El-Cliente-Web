// Seleccionamos el formulario
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío inmediato del formulario

    // valores
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const edad = document.getElementById("edad").value;
    const genero = document.getElementById("genero").value;
    const descripcion = document.getElementById("descripcion").value.trim();

    // Validaciones básicas
    if (nombre === "" || correo === "" || telefono === "" || edad === "" || genero === "") {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    // Validación correo con expresión regular
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        alert("Ingrese un correo electrónico válido.");
        return;
    }

    // Validación de teléfono (mínimo 10 dígitos)
    if (telefono.length < 10 || isNaN(telefono)) {
        alert("Ingrese un número de teléfono válido.");
        return;
    }

    // Validación de edad
    if (edad < 10 || edad > 99) {
        alert("La edad debe estar entre 10 y 99 años.");
        return;
    }

    // Si todo está bien
    alert("✅ Inscripción enviada con éxito.\n\n" +
          `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nEdad: ${edad}\nGénero: ${genero}\nDescripción: ${descripcion}`);
    

    formulario.reset(); // Limpia el formulario después del envío
});
