// Función para crear un sílabo de ejemplo
function crearSilaboEjemplo() {
    // Asegurarnos de que haya un usuario en el sistema
    if (!auth.getCurrentUser()) {
        return false;
    }
    
    // Verificar si ya existe el sílabo de ejemplo
    let syllabus = [];
    try {
        syllabus = JSON.parse(localStorage.getItem('syllabus') || '[]');
    } catch (error) {
        console.error('Error al leer sílabos:', error);
        syllabus = [];
    }
    const existeEjemplo = syllabus.some(s => s.id === 'EJEMPLO-001');
    
    if (existeEjemplo) {
        return false; // No crear si ya existe
    }

    // Datos de ejemplo
    const silaboEjemplo = {
        id: 'EJEMPLO-001',
        materia: 'Programación Web',
        codigo: 'PW-2025',
        creditos: 4,
        horasSemanales: 6,
        descripcion: 'Curso avanzado de desarrollo web con énfasis en tecnologías modernas y mejores prácticas de programación.',
        facultad: 'Facultad de Ingeniería',
        carrera: 'Ingeniería en Software',
        nivel: 'Cuarto',
        profesor: 'Dr. Carlos Martínez',
        periodo: '2023-2024',
        estado: 'pendiente',
        status: 'pendiente',
        contenido: {
            objetivos: [
                'Desarrollar aplicaciones web modernas utilizando las últimas tecnologías',
                'Comprender los fundamentos de HTTP y arquitectura cliente-servidor',
                'Implementar buenas prácticas de desarrollo web'
            ],
            unidades: [
                {
                    numero: 1,
                    titulo: 'Fundamentos Web',
                    contenidos: [
                        'Arquitectura cliente-servidor',
                        'Protocolo HTTP',
                        'HTML5 y CSS3 avanzado'
                    ]
                },
                {
                    numero: 2,
                    titulo: 'JavaScript y Programación Frontend',
                    contenidos: [
                        'JavaScript moderno (ES6+)',
                        'DOM y eventos',
                        'APIs del navegador'
                    ]
                },
                {
                    numero: 3,
                    titulo: 'Desarrollo Backend',
                    contenidos: [
                        'Servidores web',
                        'APIs REST',
                        'Bases de datos'
                    ]
                },
                {
                    numero: 4,
                    titulo: 'Frameworks y Herramientas Modernas',
                    contenidos: [
                        'React/Angular/Vue',
                        'Node.js',
                        'Herramientas de desarrollo'
                    ]
                }
            ],
            metodologia: 'El curso utiliza una metodología práctica basada en proyectos, combinando teoría con ejercicios prácticos y desarrollo de aplicaciones reales.',
            evaluacion: {
                proyectos: 40,
                examenes: 30,
                trabajoFinal: 20,
                participacion: 10
            },
            bibliografia: [
                {
                    tipo: 'Básica',
                    referencias: [
                        'MDN Web Docs (2025). JavaScript Guide',
                        'Duckett, J. (2024). HTML & CSS: Diseño y Desarrollo Web'
                    ]
                },
                {
                    tipo: 'Complementaria',
                    referencias: [
                        'Simpson, K. (2025). You Don\'t Know JS Yet',
                        'Documentación oficial de React, Angular y Vue'
                    ]
                }
            ]
        },
        comentarios: [],
        fechaCreacion: new Date().toISOString(),
        ultimaModificacion: new Date().toISOString()
    };

    // Agregar al almacenamiento local
    syllabus.push(silaboEjemplo);
    localStorage.setItem('syllabus', JSON.stringify(syllabus));
    
    return true; // Creado exitosamente
}