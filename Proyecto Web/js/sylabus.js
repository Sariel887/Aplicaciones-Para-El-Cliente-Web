// Manejo de sílabos y estados
class SyllabusManager {
    constructor() {
        this.loadSyllabus();
    }

    // Cargar sílabos del localStorage
    loadSyllabus() {
        try {
            const stored = localStorage.getItem('syllabus');
            if (!stored) {
                this.syllabus = [];
                return;
            }

            this.syllabus = JSON.parse(stored);
            
            // Validar que sea un array
            if (!Array.isArray(this.syllabus)) {
                console.error('Datos de sílabo inválidos en localStorage');
                this.syllabus = [];
                // Limpiar localStorage si los datos son inválidos
                localStorage.removeItem('syllabus');
            }
        } catch (error) {
            console.error('Error al cargar sílabos:', error);
            this.syllabus = [];
            // Limpiar localStorage si hay error
            localStorage.removeItem('syllabus');
        }
    }

    // Guardar sílabos en localStorage
    saveSyllabus() {
        try {
            localStorage.setItem('syllabus', JSON.stringify(this.syllabus));
            return true;
        } catch (error) {
            console.error('Error saving syllabus:', error);
            return false;
        }
    }

    // Crear o actualizar un sílabo
    saveSyllabusData(data, isDraft = true) {
        const user = auth.getCurrentUser();
        if (!user || !user.name) {
            console.error('No user logged in');
            return false;
        }

        const now = new Date().toISOString();
        let success = false;

        try {
            // Si el sílabo ya existe, actualizarlo
            if (data.id) {
                const index = this.syllabus.findIndex(s => s.id === data.id);
                if (index !== -1) {
                    // Solo permitir edición si es borrador o está rechazado
                    if (this.syllabus[index].status === 'draft' || 
                        this.syllabus[index].status === 'rejected') {
                        this.syllabus[index] = {
                            ...this.syllabus[index],
                            ...data,
                            status: isDraft ? 'draft' : 'pending',
                            lastModified: now
                        };
                        success = true;
                    }
                }
            } else {
                // Crear nuevo sílabo
                const newSyllabus = {
                    id: Date.now(), // ID único
                    ...data,
                    professor: user.name,
                    faculty: user.faculty || 'No especificada',
                    status: isDraft ? 'draft' : 'pending',
                    created: now,
                    lastModified: now,
                    comments: ''
                };
                this.syllabus.push(newSyllabus);
                success = true;
            }

            if (success) {
                return this.saveSyllabus();
            }
        } catch (error) {
            console.error('Error saving syllabus data:', error);
        }
        return false;
    }

    // Obtener sílabos por estado
    getSyllabusByStatus(status = null) {
        return this.syllabus.filter(s => !status || s.status === status);
    }

    // Obtener sílabos por profesor
    getSyllabusByProfessor(professorName) {
        return this.syllabus.filter(s => s.professor === professorName);
    }

    // Obtener un sílabo específico
    getSyllabusById(id) {
        return this.syllabus.find(s => s.id === parseInt(id));
    }

    // Actualizar estado de un sílabo
    updateSyllabusStatus(id, status, comments = '') {
        const index = this.syllabus.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
            this.syllabus[index] = {
                ...this.syllabus[index],
                status,
                lastModified: new Date().toISOString(),
                comments: comments,
                reviewedBy: auth.getCurrentUser().name
            };
            this.saveSyllabus();
            return true;
        }
        return false;
    }

    // Enviar a revisión
    submitForReview(id) {
        return this.updateSyllabusStatus(id, 'pending');
    }

    // Aprobar sílabo
    approveSyllabus(id, comments) {
        return this.updateSyllabusStatus(id, 'approved', comments);
    }

    // Solicitar cambios
    requestChanges(id, comments) {
        return this.updateSyllabusStatus(id, 'rejected', comments);
    }

    // Obtener estadísticas
    getStats() {
        const stats = {
            draft: 0,
            pending: 0,
            approved: 0,
            rejected: 0
        };

        this.syllabus.forEach(s => {
            if (stats.hasOwnProperty(s.status)) {
                stats[s.status]++;
            }
        });

        return stats;
    }
}

// Inicializar el administrador de sílabos
const syllabusManager = new SyllabusManager();
window.syllabusManager = syllabusManager;