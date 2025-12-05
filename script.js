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

// Smooth scroll para los links del navegador
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

// Efecto de scroll en la navegación
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Animación de tarjetas al entrar en vista
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

// Agregar animación CSS
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
`;
document.head.appendChild(style);

// Validación adicional del formulario
const formInputs = document.querySelectorAll('input[required], textarea[required], select[required]');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderBottom = '2px solid red';
        } else {
            this.style.borderBottom = 'none';
        }
    });
});

console.log('MentorMarketing - Script cargado correctamente ✓');
