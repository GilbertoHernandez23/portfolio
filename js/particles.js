// particles.js - 
let particlesInstance;

function initParticles() {
    particlesInstance = particlesJS('particles-js', {
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#DC143C', '#87CEEB', '#D4AF37', '#4682B4']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#DC143C',
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 3
                }
            }
        },
        retina_detect: true
    });

    // Observar secciones para cambiar comportamiento de partículas
    initSectionParticles();
}

function initSectionParticles() {
    const sections = {
        '#about': { color: '#D4AF37', density: 50 }, // Dorado Targaryen
        '#projects': { color: '#DC143C', density: 70 }, // Rojo fuego
        '#skills': { color: '#4682B4', density: 60 }, // Azul Valyrio
        '#contact': { color: '#87CEEB', density: 40 } // Azul hielo
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const config = sections[section.id ? `#${section.id}` : ''];
                
                if (config && particlesInstance) {
                    // Cambiar color de partículas según la sección
                    particlesInstance.particles.array.forEach(p => {
                        p.color.value = config.color;
                    });
                    
                    // Cambiar densidad
                    particlesInstance.particles.number.value = config.density;
                    particlesInstance.fn.refresh();
                }
            }
        });
    }, { threshold: 0.3 });

    // Observar cada sección
    Object.keys(sections).forEach(sectionId => {
        const section = document.querySelector(sectionId);
        if (section) observer.observe(section);
    });
}

// Efecto especial: Lluvia de fuego en el header
function createFireRain() {
    const fireRain = document.createElement('div');
    fireRain.className = 'fire-rain';
    document.querySelector('.epic-header').appendChild(fireRain);

    for (let i = 0; i < 15; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        ember.style.left = `${Math.random() * 100}%`;
        ember.style.animationDelay = `${Math.random() * 5}s`;
        fireRain.appendChild(ember);
    }
}

// Efecto especial: Copos de nieve Stark
function createSnowFlakes() {
    const snowFlakes = document.createElement('div');
    snowFlakes.className = 'snow-flakes';
    document.querySelector('.epic-header').appendChild(snowFlakes);

    for (let i = 0; i < 20; i++) {
        const flake = document.createElement('div');
        flake.className = 'flake';
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.animationDelay = `${Math.random() * 3}s`;
        snowFlakes.appendChild(flake);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    createFireRain();
    createSnowFlakes();
});