// gsap-animations.js - Animaciones GSAP optimizadas
gsap.registerPlugin(ScrollTrigger, TextPlugin);

class EpicAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupHeaderAnimations();
        setTimeout(() => {
            this.setupScrollAnimations();
            this.setupInteractiveElements();
        }, 1000);
        console.log('🎬 GSAP Animations initialized');
    }

    setupHeaderAnimations() {
        // Solo animar elementos del header, no todo
        const tl = gsap.timeline();
        
        tl.from(".house-sigil", {
            duration: 1.5,
            y: -100,
            opacity: 0,
            rotationY: 180,
            ease: "power4.out"
        })
        .from(".nav-links li", {
            duration: 1,
            y: -50,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.5")
        .from(".header-content h1", {
            duration: 2,
            y: 100,
            opacity: 0,
            scale: 0.5,
            ease: "power4.out"
        })
        .to(".tagline", {
            duration: 3,
            text: {
                value: "Fire & Code",
                delimiter: ""
            },
            ease: "none"
        }, "-=1.5")
        .from(".subtagline", {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: "power3.out"
        }, "-=1");
    }

    setupScrollAnimations() {
        // ANIMACIÓN DE PROYECTOS - FIXED
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.fromTo(card, {
                opacity: 1, // Asegurar que son visibles
                y: 0
            }, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "bottom 60%",
                    toggleActions: "play none none none", // Solo play una vez
                    markers: false // Para debug
                },
                duration: 1,
                y: 0,
                opacity: 1,
                rotationY: 0,
                scale: 1,
                ease: "power2.out",
                delay: i * 0.1
            });
        });

        // ANIMACIÓN DE HABILIDADES - SIMPLIFICADA
        gsap.utils.toArray('.skill-category').forEach((category, i) => {
            gsap.fromTo(category, {
                opacity: 1,
                x: 0
            }, {
                scrollTrigger: {
                    trigger: category,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                duration: 1,
                x: 0,
                opacity: 1,
                ease: "power2.out",
                delay: i * 0.2
            });
        });

        // ANIMACIÓN DE TÍTULOS
        gsap.utils.toArray('.section h2').forEach(title => {
            ScrollTrigger.create({
                trigger: title,
                start: "top 80%",
                onEnter: () => this.animateTitle(title)
            });
        });
    }

    animateTitle(title) {
        const text = title.textContent;
        
        gsap.fromTo(title, {
            text: ""
        }, {
            duration: 1.5,
            text: {
                value: text,
                delimiter: ""
            },
            ease: "power2.inOut"
        });
    }

    setupInteractiveElements() {
        // Hover effects para proyectos - SOLO transform
        gsap.utils.toArray('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.3,
                    y: -5,
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(220, 20, 60, 0.3)",
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    boxShadow: "0 5px 15px rgba(220, 20, 60, 0.1)",
                    ease: "power2.out"
                });
            });
        });

        // Efectos de botones
        gsap.utils.toArray('.submit-btn, .project-link').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    duration: 0.2,
                    scale: 1.05,
                    ease: "power2.out"
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    duration: 0.2,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });
    }
}

// Inicialización segura
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new EpicAnimations();
    }, 500);
});