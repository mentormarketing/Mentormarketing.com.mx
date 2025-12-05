// ============================================
// MENTORMARKETING - SCRIPT PRINCIPAL
// ============================================

// Formulario de contacto con WhatsApp
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const tema = document.getElementById('tema').value;
    const mensaje = document.getElementById('mensaje').value;

    // Validar que los campos no estén vacíos
    if (!nombre || !email || !telefono || !tema || !mensaje) {
        alert('Por favor completa todos los campos');
        return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor ingresa un email válido');
        return;
    }

    // Crear mensaje para WhatsApp
    const mensajeWhatsApp = `
*NUEVA CONSULTA DE MENTORMARKETING*

*Nombre:* ${nombre}
*Email:* ${email}
*Teléfono:* ${telefono}
*Tema de Interés:* ${tema}
*Mensaje:* ${mensaje}

---
Enviado desde: mentormarketing.com.mx
`;

    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);

    // Número de WhatsApp (sin + ni espacios)
    const numeroWhatsApp = '524493738821';

    // Crear URL de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    // Abrir WhatsApp en nueva ventana
    window.open(urlWhatsApp, '_blank');

    // Limpiar formulario
    this.reset();

    // Mensaje de confirmación
    alert('¡Gracias! Se abrirá WhatsApp para enviar tu consulta.');
});

// ============================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// EFECTO DE SCROLL EN LA NAVEGACIÓN
// ============================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ============================================
// ANIMACIÓN DE TARJETAS AL ENTRAR EN VISTA
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observador a tarjetas
document.querySelectorAll('.servicio-card, .testimonio-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ============================================
// AGREGAR ANIMACIONES CSS DINÁMICAMENTE
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// VALIDACIÓN DEL FORMULARIO EN TIEMPO REAL
// ============================================
const formInputs = document.querySelectorAll('input[required], textarea[required], select[required]');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderBottom = '2px solid #e74c3c';
        } else {
            this.style.borderBottom = 'none';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderBottom = 'none';
    });
});

// ============================================
// EFECTO DE HOVER EN BOTONES
// ============================================
document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// LOG DE CARGA COMPLETADA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ MentorMarketing - Script cargado correctamente');
    console.log('✓ Formulario de contacto activo');
    console.log('✓ Animaciones habilitadas');
    console.log('✓ Validaciones de formulario activas');
});

// ============================================
// PREVENCIÓN DE ENVÍO DUPLICADO
// ============================================
let enviando = false;
document.getElementById('contactForm').addEventListener('submit', function(e) {
    if (enviando) {
        e.preventDefault();
        return;
    }
    enviando = true;
    
    setTimeout(() => {
        enviando = false;
    }, 2000);
});

// ============================================
// DETECTAR SI ESTÁ EN DISPOSITIVO MÓVIL
// ============================================
function esMovil() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (esMovil()) {
    document.body.classList.add('es-movil');
    console.log('✓ Dispositivo móvil detectado');
}

// ============================================
// GUARDAR DATOS DEL FORMULARIO LOCALMENTE
// ============================================
const formulario = document.getElementById('contactForm');
if (formulario) {
    // Cargar datos guardados si existen
    window.addEventListener('load', function() {
        const datosGuardados = localStorage.getItem('mentormarketing_form');
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            if (datos.nombre) document.getElementById('nombre').value = datos.nombre;
            if (datos.email) document.getElementById('email').value = datos.email;
            if (datos.telefono) document.getElementById('telefono').value = datos.telefono;
        }
    });

    // Guardar datos mientras se escriben
    formulario.addEventListener('change', function() {
        const datos = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value
        };
        localStorage.setItem('mentormarketing_form', JSON.stringify(datos));
    });

    // Limpiar después de enviar
    formulario.addEventListener('submit', function() {
        localStorage.removeItem('mentormarketing_form');
    });
}

console.log('===========================================');
console.log('MENTORMARKETING - TODOS LOS SCRIPTS ACTIVOS');
console.log('===========================================');
