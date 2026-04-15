// Espera a que todo el DOM esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Gestión del Formulario de Contacto ---
    const contactForm = document.getElementById('contactForm');

    // Escucha el evento 'submit' (envío) del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Evita que el formulario se envíe realmente de forma predeterminada
            event.preventDefault();

            // Captura los valores de los campos
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validación básica adicional (HTML5 ya lo hace, pero es buena práctica)
            if (name === "" || email === "" || message === "") {
                alert("Por favor, rellena todos los campos.");
                return;
            }

            // Aquí es donde normalmente enviarías los datos a un servidor usando Fetch/AJAX
            // Por ahora, simularemos un éxito.
            console.log("Formulario simulado enviado:");
            console.log("Nombre:", name);
            console.log("Email:", email);
            console.log("Mensaje:", message);

            // Muestra un mensaje de éxito al usuario (puedes mejorar esto con CSS)
            alert("¡Gracias " + name + "! Tu mensaje ha sido simulado (mira la consola).");

            // Resetea el formulario
            contactForm.reset();
        });
    }

    // --- 2. Desplazamiento Suave (Opcional, manejado por CSS pero útil si falla) ---
    // Aunque 'scroll-behavior: smooth' está en CSS, algunos navegadores viejos 
    // podrían necesitar esto.
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verifica que sea un enlace interno (#)
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);

                if (targetElement) {
                    // Calcula la posición del elemento, restando un offset si tienes navbar fija
                    const offsetTop = targetElement.offsetTop;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 3. Efecto de aparición en scroll (Opcional, añade clase 'visible') ---
    // Detecta elementos que entran en la pantalla para animarlos (requiere CSS adicional)
    /*
    const faders = document.querySelectorAll('.about-grid, .portfolio-grid, .contact-grid');
    const appearOptions = {
        threshold: 0.15, // Porcentaje visible para activar
        rootMargin: "0px 0px -50px 0px" // Margen inferior antes de activar
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible'); // Añade clase para CSS
                appearOnScroll.unobserve(entry.target); // Deja de observar una vez visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        // Necesitarás añadir .fader { opacity: 0; transition: opacity 0.6s ease-in; } 
        // y .fader.visible { opacity: 1; } en tu CSS para que esto funcione.
        // fader.classList.add('fader'); 
        // appearOnScroll.observe(fader);
    });
    */

});

// Diccionario de traducciones
const translations = {
    'es': {
        'about_title': 'Soy Nicole Leones...',
        'about_text': 'Soy Nicole Leones, una apasionada fotógrafa especializada en capturar la esencia...',
        'about_text2': 'En este espacio, comparto una selección de mis trabajos más significativos, donde la luz, la composición y la emoción se entrelazan para dar vida a momentos inolvidables.',
        'portfolio_title': 'TRABAJOS REALIZADOS',
        'contact_btn': 'Enviar'
    },
    'gl': {
        'about_title': 'Son Nicole Leones...',
        'about_text': 'Son Nicole Leones, unha apaixonada fotógrafa especializada en capturar a esencia...',
        'about_text2':'Neste espazo comparto unha selección dos meus traballos máis significativos onde a luz a composición e a emoción se entrelazan para dar vida a momentos inesquecibles.', 
        'portfolio_title': 'TRABALLOS REALIZADOS',
        'contact_btn': 'Enviar'
    },
    'en': {
        'about_title': 'I am Nicole Leones...',
        'about_text': 'I am Nicole Leones, a passionate photographer specialized in capturing the essence...',
        'about_text2':'In this space I share a selection of my most significant works where light composition and emotion intertwine to bring unforgettable moments to life', 
        'portfolio_title': 'PROJECTS COMPLETED',
        'contact_btn': 'Send'
    }
};

function changeLanguage(lang) {
    // 1. Guardar la preferencia en el navegador
    localStorage.setItem('preferredLang', lang);

    // 2. Buscar todos los elementos que tengan el atributo data-key
    const elements = document.querySelectorAll('[data-key]');

    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            // Si el elemento es un input o textarea, cambiamos el placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                // Si es un elemento normal, cambiamos el texto interno
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Al cargar la página, aplicar el idioma guardado o el español por defecto
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    changeLanguage(savedLang);
});


function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Cambio cada 5 segundos

    if (slides.length === 0) return;

    function nextSlide() {
        // Quita la clase activa de la imagen actual
        slides[currentSlide].classList.remove('active');
        
        // Calcula el índice de la siguiente imagen
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Añade la clase activa a la nueva imagen
        slides[currentSlide].classList.add('active');
    }

    // Inicia el temporizador
    setInterval(nextSlide, slideInterval);
}

// Llama a la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initCarousel);

document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');

    // Función para mostrar/ocultar el botón según el scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) { // Aparece tras bajar 300px
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Función para volver al inicio suavemente
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});