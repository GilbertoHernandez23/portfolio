// animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animación de entrada épica
function initEpicAnimations() {
  // Header animation
  gsap.from(".epic-header h1", {
    duration: 2,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    stagger: 0.2
  });

  // Dragon scale animation
  gsap.to(".dragon-animation", {
    scale: 1.2,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

// Scroll animations para secciones
function initScrollAnimations() {
  gsap.utils.toArray("[data-scroll-section]").forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    });
  });
}

// Efectos de partículas interactivas
function initParticles() {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: ["#DC143C", "#87CEEB", "#4682B4"] },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#DC143C",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      }
    }
  });
}

// animations.js - Animaciones para skills y más

document.addEventListener('DOMContentLoaded', function() {
    // Animación de barras de skills al hacer scroll
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                });
            }
        });
    }, { threshold: 0.5 });

    // Observar la sección de skills
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica real de envío
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Raven...';
            submitBtn.disabled = true;
            
            // Simular envío
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Raven Sent!';
                submitBtn.style.background = 'var(--valyrian-steel)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 2000);
        });
    }

    // Efecto de typing en el header
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar typing cuando el header sea visible
        const headerObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 1000);
                headerObserver.unobserve(entries[0].target);
            }
        });
        
        headerObserver.observe(document.querySelector('.epic-header'));
    }
});