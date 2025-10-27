// Sistema de Autenticación ULEAM
const USERS = {
    // Profesores
    'prof_martinez': {
        password: 'pM#2025uleam',
        name: 'Dr. Carlos Martínez',
        role: 'professor',
        faculty: 'Facultad de Informática',
        department: 'Ciencias de la Computación'
    },
    'prof_rodriguez': {
        password: 'pR#2025uleam',
        name: 'Dra. Ana Rodríguez',
        role: 'professor',
        faculty: 'Facultad de Ingeniería',
        department: 'Sistemas y Telecomunicaciones'
    },
    // Comisión Académica
    'com_velasco': {
        password: 'cV#2025uleam',
        name: 'Dr. Juan Velasco',
        role: 'committee',
        position: 'Director de Comisión',
        faculty: 'Comisión Académica Central'
    },
    'com_mendoza': {
        password: 'cM#2025uleam',
        name: 'Dra. María Mendoza',
        role: 'committee',
        position: 'Coordinadora de Revisión',
        faculty: 'Comisión Académica Central'
    }
};

class AuthService {
    constructor() {
        this.currentUser = this.loadSession();
        this.setupAuthProtection();
    }

    login(username, password) {
        const user = USERS[username];
        
        if (!user || user.password !== password) {
            throw new Error('Usuario o contraseña incorrectos');
        }

        const session = {
            username,
            name: user.name,
            role: user.role,
            faculty: user.faculty,
            department: user.department || user.position,
            loginTime: new Date().toISOString()
        };

        this.saveSession(session);
        this.redirectToUserPanel(session.role);
        return session;
    }

    redirectToUserPanel(role) {
        if (role === 'professor') {
            window.location.href = 'panel-profesor.html';
        } else if (role === 'committee') {
            window.location.href = 'panel-comision.html';
        }
    }

    logout() {
        localStorage.removeItem('userSession');
        this.currentUser = null;
        window.location.href = 'index.html';
    }

    saveSession(session) {
        localStorage.setItem('userSession', JSON.stringify(session));
        this.currentUser = session;
    }

    loadSession() {
        const session = localStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    hasRole(role) {
        return this.currentUser?.role === role;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    setupAuthProtection() {
        const publicPages = ['index.html', ''];
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Definir páginas permitidas por rol
        const rolePages = {
            professor: ['panel-profesor.html', 'crear-silabo.html'],
            committee: ['panel-comision.html', 'revision.html']
        };

        // Si es una página pública, no necesita autenticación
        if (publicPages.includes(currentPage)) {
            return;
        }

        // Verificar autenticación
        if (!this.isAuthenticated()) {
            window.location.href = 'index.html';
            return;
        }

        const userRole = this.getCurrentUser().role;
        const allowedPages = rolePages[userRole] || [];

        // Verificar si la página actual está permitida para el rol del usuario
        if (!allowedPages.some(page => currentPage.startsWith(page.split('.')[0]))) {
            console.log('Access denied to:', currentPage, 'for role:', userRole);
            this.showNotification('No tienes permiso para acceder a esta página', 'error');
            window.location.href = userRole === 'professor' ? 'panel-profesor.html' : 'panel-comision.html';
            return;
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Inicializar el servicio de autenticación
const auth = new AuthService();
window.auth = auth;