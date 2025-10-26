// main.js - Funcionalidades principales del portfolio
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupNavbarEffects();
        this.setupFireRain();
        this.setupSnowFlakes();
        this.setupSkillAnimations();
        this.setupFormHandling();
        this.setupPerformance();
        console.log('🔥 Portfolio Targaryen-Stark initialized!');
    }

    setupSmoothScroll() {
        // Smooth scroll para enlaces internos
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
    }

    setupNavbarEffects() {
        // Efecto de cambio de navbar al hacer scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.house-nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
                nav.style.boxShadow = '0 2px 20px rgba(220, 20, 60, 0.3)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.8)';
                nav.style.boxShadow = 'none';
            }
        });
    }

    setupFireRain() {
        // Crear lluvia de fuego Targaryen
        const fireRain = document.querySelector('.fire-rain');
        if (!fireRain) return;

        for (let i = 0; i < 15; i++) {
            const ember = document.createElement('div');
            ember.className = 'ember';
            ember.style.left = `${Math.random() * 100}%`;
            ember.style.animationDelay = `${Math.random() * 5}s`;
            fireRain.appendChild(ember);
        }
    }

    setupSnowFlakes() {
        // Crear copos de nieve Stark
        const snowFlakes = document.querySelector('.snow-flakes');
        if (!snowFlakes) return;

        for (let i = 0; i < 20; i++) {
            const flake = document.createElement('div');
            flake.className = 'flake';
            flake.style.left = `${Math.random() * 100}%`;
            flake.style.animationDelay = `${Math.random() * 3}s`;
            snowFlakes.appendChild(flake);
        }
    }

setupSkillAnimations() {
    // SOLO observamos, las animaciones GSAP se encargan del resto
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // GSAP maneja las animaciones, solo activamos las barras
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    // Pequeño delay para que GSAP termine primero
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 1000);
                });
            }
        });
    }, { threshold: 0.3 }); // Reducido threshold

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
}

    setupFormHandling() {
        // Manejo del formulario de contacto
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Simular envío
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Raven...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Raven Sent!';
                submitBtn.style.background = 'var(--valyrian-steel)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                    
                    // Efecto visual de éxito
                    this.createFireworks();
                }, 2000);
            }, 2000);
        });
    }

    createFireworks() {
        // Crear efecto de fuegos artificiales al enviar formulario
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createFirework();
            }, i * 100);
        }
    }

    createFirework() {
        const firework = document.createElement('div');
        firework.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #FFD700, #DC143C);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        document.body.appendChild(firework);

        // Animación
        setTimeout(() => {
            firework.style.transition = 'all 0.5s ease-out';
            firework.style.transform = 'scale(3)';
            firework.style.opacity = '0';
            
            setTimeout(() => {
                firework.remove();
            }, 500);
        }, 100);
    }

    setupPerformance() {
        // Optimizaciones de performance
        this.enableLazyLoading();
        this.setupIntersectionObserver();
    }

    enableLazyLoading() {
        // Lazy loading para imágenes futuras
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
       