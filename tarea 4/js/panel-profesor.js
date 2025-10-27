// Funciones para el panel del profesor

// Estado inicial de demostración
let silabos = [
    {
        id: 1,
        asignatura: "Programación Web",
        estado: "borrador",
        ultimaModificacion: "2024-01-15"
    },
    {
        id: 2,
        asignatura: "Bases de Datos",
        estado: "pendiente",
        ultimaModificacion: "2024-01-14"
    },
    {
        id: 3,
        asignatura: "Arquitectura de Software",
        estado: "aprobado",
        ultimaModificacion: "2024-01-10"
    }
];

// Cargar sílabos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarTablaSilabos();
    actualizarEstadisticas();
});

// Función para obtener el ícono según el estado
function obtenerIconoEstado(estado) {
    switch (estado) {
        case 'borrador':
            return '<svg width="16" height="16" fill="currentColor" class="text-gray-500" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
        case 'pendiente':
            return '<svg width="16" height="16" fill="currentColor" class="text-warning" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>';
        case 'aprobado':
            return '<svg width="16" height="16" fill="currentColor" class="text-success" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>';
        case 'rechazado':
            return '<svg width="16" height="16" fill="currentColor" class="text-danger" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';
        default:
            return '';
    }
}

// Función para obtener el nombre del estado en español
function obtenerNombreEstado(estado) {
    switch (estado) {
        case 'borrador': return 'Borrador';
        case 'pendiente': return 'Pendiente de Revisión';
        case 'aprobado': return 'Aprobado';
        case 'rechazado': return 'Rechazado';
        default: return estado;
    }
}

// Función para obtener la clase CSS según el estado
function obtenerClaseEstado(estado) {
    switch (estado) {
        case 'borrador': return 'estado-borrador';
        case 'pendiente': return 'estado-pendiente';
        case 'aprobado': return 'estado-aprobado';
        case 'rechazado': return 'estado-rechazado';
        default: return '';
    }
}

// Función para formatear la fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función para actualizar la tabla de sílabos
function actualizarTablaSilabos() {
    const tabla = document.getElementById('syllabusTable');
    tabla.innerHTML = '';

    silabos.forEach(silabo => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <div class="flex items-center gap-2">
                    ${obtenerIconoEstado(silabo.estado)}
                    ${silabo.asignatura}
                </div>
            </td>
            <td>
                <span class="estado ${obtenerClaseEstado(silabo.estado)}">
                    ${obtenerNombreEstado(silabo.estado)}
                </span>
            </td>
            <td>${formatearFecha(silabo.ultimaModificacion)}</td>
            <td>
                <div class="btn-group">
                    <button onclick="editarSilabo(${silabo.id})" class="btn btn-outline">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 4px;">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        Editar
                    </button>
                    ${silabo.estado === 'borrador' ? `
                        <button onclick="enviarRevision(${silabo.id})" class="btn btn-primary">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 4px;">
                                <path d="M.5 1.5A.5.5 0 0 1 1 1h14a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H1a.5.5 0 0 1-.5-.5V1.5zm1 .5v13h13V2H1.5z"/>
                                <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                            Enviar
                        </button>
                    ` : ''}
                </div>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// Función para actualizar las estadísticas
function actualizarEstadisticas() {
    document.getElementById('totalSilabos').textContent = silabos.length;
    document.getElementById('silabosAprobados').textContent = silabos.filter(s => s.estado === 'aprobado').length;
    document.getElementById('silabosPendientes').textContent = silabos.filter(s => s.estado === 'pendiente').length;
}

// Función para ver borradores
function verBorradores() {
    const borradores = silabos.filter(s => s.estado === 'borrador');
    silabos = borradores;
    actualizarTablaSilabos();
}

// Función para cargar todos los sílabos
function cargarTodosSilabos() {
    // En un caso real, aquí se cargarían los sílabos del servidor
    silabos = [
        {
            id: 1,
            asignatura: "Programación Web",
            estado: "borrador",
            ultimaModificacion: "2024-01-15"
        },
        {
            id: 2,
            asignatura: "Bases de Datos",
            estado: "pendiente",
            ultimaModificacion: "2024-01-14"
        },
        {
            id: 3,
            asignatura: "Arquitectura de Software",
            estado: "aprobado",
            ultimaModificacion: "2024-01-10"
        }
    ];
    actualizarTablaSilabos();
}

// Funciones de acción (simuladas)
function editarSilabo(id) {
    window.location.href = `crear-silabo.html?id=${id}`;
}

function enviarRevision(id) {
    const silabo = silabos.find(s => s.id === id);
    if (silabo && silabo.estado === 'borrador') {
        silabo.estado = 'pendiente';
        silabo.ultimaModificacion = new Date().toISOString();
        actualizarTablaSilabos();
        actualizarEstadisticas();
    }
}