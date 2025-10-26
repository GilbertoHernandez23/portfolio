// three-scene.js - Escena 3D Targaryen-Stark
class ThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.meshes = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.clock = new THREE.Clock();
        
        this.init();
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createLights();
        this.createMeshes();
        this.addEventListeners();
        this.animate();
        console.log('🎮 Three.js Scene initialized');
    }

    createScene() {
        this.scene = new THREE.Scene();
        
        // Fondo con gradiente sutil
        this.scene.background = new THREE.Color(0x0a0a0a);
        
        // Niebla atmosférica
        this.scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 15;
        this.camera.position.y = 2;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
         this.renderer.setClearColor(0x000000, 0);
             this.renderer.setSize(window.innerWidth, window.innerHeight);

        
        const container = document.createElement('div');
        container.id = 'three-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            pointer-events: none;
        `;
        
        container.appendChild(this.renderer.domElement);
        document.body.appendChild(container);
    }

    createLights() {
        // Luz ambiental suave
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);

        // Luz direccional roja (Targaryen - fuego)
        const redLight = new THREE.DirectionalLight(0xdc143c, 1.2);
        redLight.position.set(5, 5, 5);
        redLight.castShadow = true;
        redLight.shadow.mapSize.width = 1024;
        redLight.shadow.mapSize.height = 1024;
        this.scene.add(redLight);

        // Luz direccional azul (Stark - hielo)
        const blueLight = new THREE.DirectionalLight(0x87ceeb, 0.8);
        blueLight.position.set(-5, 3, -5);
        blueLight.castShadow = true;
        this.scene.add(blueLight);

        // Luz puntual dorada (acentos)
        const goldLight = new THREE.PointLight(0xd4af37, 0.6, 50);
        goldLight.position.set(0, 5, 10);
        goldLight.castShadow = true;
        this.scene.add(goldLight);

        // Luz de relleno suave
        const fillLight = new THREE.HemisphereLight(0x87ceeb, 0x8b0000, 0.3);
        this.scene.add(fillLight);
    }

    createMeshes() {
        this.createDragonEgg();
        this.createFloatingCrystals();
        this.createMagicOrbs();
        this.createFloatingRunes();
    }

    createDragonEgg() {
        // Geometría del huevo de dragón (esfera aplanada)
        const eggGeometry = new THREE.SphereGeometry(1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7);
        
        // Material principal del huevo
        const eggMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b0000,
            shininess: 100,
            transparent: true,
            opacity: 0.9,
            specular: 0xd4af37
        });

        const egg = new THREE.Mesh(eggGeometry, eggMaterial);
        egg.position.y = 1;
        egg.castShadow = true;
        egg.receiveShadow = true;
        this.scene.add(egg);
        this.meshes.push(egg);

        // Escamas del huevo (wireframe)
        const scaleGeometry = new THREE.SphereGeometry(1.6, 16, 16);
        const scaleMaterial = new THREE.MeshPhongMaterial({
            color: 0xd4af37,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        const scales = new THREE.Mesh(scaleGeometry, scaleMaterial);
        egg.add(scales);
        this.meshes.push(scales);

        // Núcleo brillante interno
        const coreGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0xdc143c,
            transparent: true,
            opacity: 0.8
        });

        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        egg.add(core);
        this.meshes.push(core);
    }

    createFloatingCrystals() {
        const crystalGeometry = new THREE.ConeGeometry(0.1, 0.5, 4);
        const crystalMaterial = new THREE.MeshPhongMaterial({
            color: 0x87ceeb,
            transparent: true,
            opacity: 0.7,
            shininess: 100,
            specular: 0xffffff
        });

        // Crear múltiples cristales de hielo
        for (let i = 0; i < 15; i++) {
            const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
            
            // Posición aleatoria en un anillo
            const angle = (i / 15) * Math.PI * 2;
            const radius = 8 + Math.random() * 4;
            
            crystal.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * 2 + (Math.random() - 0.5) * 3,
                Math.sin(angle) * radius
            );
            
            crystal.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            crystal.castShadow = true;
            this.scene.add(crystal);
            this.meshes.push(crystal);
        }
    }

    createMagicOrbs() {
        const orbGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        
        // Crear orbes mágicos de diferentes colores
        const colors = [0xdc143c, 0x87ceeb, 0xd4af37, 0x4682b4];
        
        colors.forEach((color, index) => {
            const orbMaterial = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.8,
                shininess: 100
            });

            const orb = new THREE.Mesh(orbGeometry, orbMaterial);
            
            const angle = (index / colors.length) * Math.PI * 2;
            const radius = 5;
            
            orb.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * 0.5,
                Math.sin(angle) * radius
            );

            orb.castShadow = true;
            this.scene.add(orb);
            this.meshes.push(orb);
        });
    }

    createFloatingRunes() {
        // Crear runas flotantes usando texto canvas
        const runeSymbols = ['⚔️', '🛡', '🔥', '❄️', '👑', '🐉'];
        const runeGeometry = new THREE.PlaneGeometry(0.8, 0.8);
        
        runeSymbols.forEach((symbol, index) => {
            // Crear textura canvas para el símbolo
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 256;
            
            // Fondo transparente
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            // Símbolo estilizado
            context.fillStyle = '#d4af37';
            context.font = 'bold 180px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(symbol, 128, 128);

            const texture = new THREE.CanvasTexture(canvas);
            const runeMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide
            });

            const rune = new THREE.Mesh(runeGeometry, runeMaterial);
            
            // Posicionar en un anillo
            const angle = (index / runeSymbols.length) * Math.PI * 2;
            const radius = 10;
            
            rune.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * 0.8 + 1,
                Math.sin(angle) * radius
            );

            rune.rotation.y = angle;
            this.scene.add(rune);
            this.meshes.push(rune);
        });
    }

    addEventListeners() {
        // Seguimiento de mouse
        window.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Responsive
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Animación con scroll
        ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: self => {
                const progress = self.progress;
                this.camera.position.z = 15 + progress * 8;
                this.camera.position.y = 2 - progress * 1;
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime();

        // Rotación basada en mouse (suave)
        this.camera.position.x += (this.mouseX * 3 - this.camera.position.x) * 0.05;
        this.camera.position.y += (this.mouseY * 2 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        // Animación de mallas
        this.meshes.forEach((mesh, index) => {
            // Rotación base
            mesh.rotation.x += 0.01 * delta * 60;
            mesh.rotation.y += 0.005 * delta * 60;
            
            // Flotación suave con patrones diferentes
            const floatSpeed = 0.5 + (index % 3) * 0.3;
            mesh.position.y += Math.sin(time * floatSpeed + index) * 0.002;
            
            // Rotación adicional para algunos elementos
            if (index % 4 === 0) {
                mesh.rotation.z += 0.02 * delta * 60;
            }
            
            // Efecto de pulso para el huevo de dragón
            if (index === 0) {
                mesh.scale.x = 1 + Math.sin(time * 2) * 0.1;
                mesh.scale.y = 1 + Math.cos(time * 2) * 0.1;
                mesh.scale.z = 1 + Math.sin(time * 2) * 0.1;
            }
        });

        // Rotación orbital de las luces
        const redLight = this.scene.children.find(child => 
            child instanceof THREE.DirectionalLight && child.color.getHex() === 0xdc143c
        );
        
        if (redLight) {
            redLight.position.x = Math.cos(time * 0.5) * 8;
            redLight.position.z = Math.sin(time * 0.5) * 8;
        }

        this.renderer.render(this.scene, this.camera);
    }

    // Método para limpiar la escena
    cleanup() {
        this.meshes.forEach(mesh => {
            this.scene.remove(mesh);
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) {
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach(material => material.dispose());
                } else {
                    mesh.material.dispose();
                }
            }
        });
        
        this.meshes = [];
    }
}

// Inicializar escena 3D cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para que todo cargue
    setTimeout(() => {
        try {
            const threeScene = new ThreeScene();
            window.threeScene = threeScene; // Para acceso global si es necesario
        } catch (error) {
            console.warn('Three.js scene failed to initialize:', error);
        }
    }, 1000);
});

// Manejar limpieza al salir de la página
window.addEventListener('beforeunload', () => {
    if (window.threeScene) {
        window.threeScene.cleanup();
    }
});

// Exportar la clase para uso global
window.ThreeScene = ThreeScene;