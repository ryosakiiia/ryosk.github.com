document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias de DOM ---
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const revealButton = document.getElementById('reveal-button');
    const secretMessagePanel = document.getElementById('secret-message');
    const petalContainer = document.getElementById('petal-container');
    const visualEffectsField = document.getElementById('visual-effects-field'); // Contenedor para corazones flotantes y estrellas
    const jumpingHeartsContainer = document.getElementById('jumping-hearts-container'); // Contenedor para corazones saltones (dentro de la imagen)
    const counterDisplay = document.getElementById('counter-display');
    const mainCard = document.getElementById('main-card');
    const ambientAudio = document.getElementById('ambient-audio');
    const fairyDustContainer = document.getElementById('fairy-dust-container');

    // --- Constantes ---
    const flyingHeartCount = 25; // Cantidad de corazones flotantes
    const jumpingHeartCount = 10; // Cantidad de corazones saltones (dentro de la imagen)
    const shootingStarCount = 8; // Cantidad de estrellas fugaces
    const initialPetalCount = 60; // Pétalos de fondo
    const colors = ['red', 'pink', 'white'];
    const dustParticlesPerMove = 2; // Polvo de hadas por evento de movimiento

    // **IMPORTANTE**: Define aquí la fecha de inicio.
    const startDate = new Date("February 14, 2023 08:00:00").getTime();

    // --- 1. Lógica del Preloader y Audio ---
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            mainContent.classList.remove('hidden');
            document.body.addEventListener('click', playAudioOnce, { once: true });
        }, 800);
    }, 1500);

    function playAudioOnce() {
        if (ambientAudio && ambientAudio.paused) {
            ambientAudio.volume = 0.4;
            ambientAudio.play().catch(error => console.warn("Audio no pudo iniciar:", error));
        }
    }

    // --- 2. Detección de Hora y Filtro Dinámico ---
    function applyTimeFilter() {
        const hour = new Date().getHours();
        if (hour >= 20 || hour < 6) {
            mainCard.classList.add('card-night');
        } else {
            mainCard.classList.remove('card-night');
        }
    }
    applyTimeFilter();
    setInterval(applyTimeFilter, 600000);

    // --- 3. Contador de Tiempo ---
    function updateCounter() {
        const now = new Date().getTime();
        const difference = now - startDate;
        if (difference < 0) {
            counterDisplay.textContent = "Esperando la fecha especial...";
            return;
        }

        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const years = Math.floor(days / 365.25);

        const remainingDays = Math.floor(days % 365.25);
        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;

        counterDisplay.innerHTML = `
            <span class="count-value">${years}</span> años, 
            <span class="count-value">${remainingDays}</span> días, 
            <span class="count-value">${remainingHours}</span> horas, 
            <span class="count-value">${remainingMinutes}</span> minutos, 
            <span class="count-value">${remainingSeconds}</span> segundos
        `;
    }
    updateCounter();
    setInterval(updateCounter, 1000);

    // --- 4. Lógica del Botón Interactivo (Revelar mensaje) ---
    revealButton.addEventListener('click', () => {
        if (secretMessagePanel.classList.contains('hidden')) {
            secretMessagePanel.classList.remove('hidden');
            secretMessagePanel.style.opacity = '1';
            secretMessagePanel.style.transform = 'translateY(0)';
            revealButton.textContent = '¡Mensaje Revelado!';
            revealButton.disabled = true;
            generatePetals(80); // Más pétalos al revelar
        }
    });

    // --- 5. Lógica de Polvo de Hadas (Sigue el Cursor) ---
    document.addEventListener('mousemove', (e) => {
        for (let i = 0; i < dustParticlesPerMove; i++) {
            createFairyDust(e.clientX, e.clientY);
        }
    });

    function createFairyDust(x, y) {
        const dust = document.createElement('span');
        dust.classList.add('fairy-dust');
        dust.textContent = '✦';
        dust.style.left = `${x}px`;
        dust.style.top = `${y}px`;
        const dx = (Math.random() - 0.5) * 50;
        const dy = (Math.random() - 0.5) * 50;
        dust.style.setProperty('--dx', `${dx}px`);
        dust.style.setProperty('--dy', `${dy}px`);
        fairyDustContainer.appendChild(dust);
        setTimeout(() => { dust.remove(); }, 700);
    }

    // ===========================================
    // FUNCIONES DE GENERACIÓN DE PARTÍCULAS
    // ===========================================

    // --- Corazones 3D Flotantes (Ahora en visualEffectsField) ---
    function generate3DFlyingHearts(count) {
        for (let i = 0; i < count; i++) { create3DHeart(); }
    }

    function create3DHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-3d');
        heart.textContent = '💖';
        const duration = (Math.random() * 20) + 15;
        const delay = Math.random() * -duration;
        const scale = (Math.random() * 0.8) + 0.4;
        const wiggleDuration = (Math.random() * 3) + 2;
        const xStart = (Math.random() * 100) - 50 + '%';
        const yStart = (Math.random() * 100) - 50 + '%'; // Relativos al contenedor
        const zStart = (Math.random() * -1000) + 'px';
        const xEnd = (Math.random() * 200) - 100 + '%';
        const yEnd = (Math.random() * 200) - 100 + '%';
        const zEnd = (Math.random() * 500) + 100 + 'px';
        const rEnd = 720 * (Math.random() > 0.5 ? 1 : -1);
        heart.style.setProperty('--animation-duration', `${duration}s`);
        heart.style.setProperty('--animation-delay', `${delay}s`);
        heart.style.setProperty('--wiggle-duration', `${wiggleDuration}s`);
        heart.style.setProperty('--scale', scale);
        heart.style.setProperty('--x-start', xStart);
        heart.style.setProperty('--y-start', yStart);
        heart.style.setProperty('--z-start', zStart);
        heart.style.setProperty('--x-end', xEnd);
        heart.style.setProperty('--y-end', yEnd);
        heart.style.setProperty('--z-end', zEnd);
        heart.style.setProperty('--r-end-x', `${rEnd}deg`);
        heart.style.setProperty('--r-end-y', `${rEnd}deg`);
        heart.style.setProperty('--r-end-z', `${rEnd}deg`);
        visualEffectsField.appendChild(heart); // Añadir al nuevo contenedor
        setTimeout(() => { heart.remove(); }, (duration + Math.abs(delay)) * 1000);
    }

    // --- Corazones Saltones 3D (Ahora DENTRO de jumpingHeartsContainer) ---
    function generateJumpingHearts(count) {
        for (let i = 0; i < count; i++) { createJumpingHeart(); }
    }

    function createJumpingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-saltarin');
        heart.textContent = '🧡';
        const duration = (Math.random() * 8) + 5;
        const delay = Math.random() * -duration;
        const scaleStart = (Math.random() * 0.5) + 0.3;
        const scaleEnd = (Math.random() * 1.5) + 0.8;
        const wiggleDuration = (Math.random() * 2) + 1;
        const xStart = (Math.random() * 100) + '%';
        const yStart = '100%';
        const zStart = (Math.random() * -500) + 'px'; // Relativos al contenedor
        const xMid = (Math.random() * 100) + '%';
        const yMid = (Math.random() * 70) + 10 + '%';
        const zMid = (Math.random() * 500) + 'px';
        const xEnd = (Math.random() * 100) + '%';
        const yEnd = '-50%';
        const zEnd = (Math.random() * 1000) + 'px';
        heart.style.setProperty('--jump-duration', `${duration}s`);
        heart.style.setProperty('--jump-delay', `${delay}s`);
        heart.style.setProperty('--wiggle-duration', `${wiggleDuration}s`);
        heart.style.setProperty('--scale-start', scaleStart);
        heart.style.setProperty('--scale-mid', (scaleStart + scaleEnd) / 2);
        heart.style.setProperty('--scale-end', scaleEnd);
        heart.style.setProperty('--x-start', xStart);
        heart.style.setProperty('--y-start', yStart);
        heart.style.setProperty('--z-start', zStart);
        heart.style.setProperty('--x-mid', xMid);
        heart.style.setProperty('--y-mid', yMid);
        heart.style.setProperty('--z-mid', zMid);
        heart.style.setProperty('--x-end', xEnd);
        heart.style.setProperty('--y-end', yEnd);
        heart.style.setProperty('--z-end', zEnd);
        jumpingHeartsContainer.appendChild(heart); // Añadir al nuevo contenedor de saltarines
        setTimeout(() => { heart.remove(); }, (duration + Math.abs(delay)) * 1000);
    }

    // --- Estrellas Fugaces (Ahora en visualEffectsField) ---
    function generateShootingStars(count) {
        for (let i = 0; i < count; i++) { createShootingStar(); }
    }

    function createShootingStar() {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        star.textContent = '✨';
        const duration = (Math.random() * 3) + 2;
        const delay = Math.random() * -duration * 2;
        const xStart = (Math.random() * -10) - 5 + '%';
        const yStart = (Math.random() * 20) - 10 + '%';
        const zStart = (Math.random() * -1500) + 'px';
        const xEnd = (Math.random() * 10) + 100 + '%';
        const yEnd = (Math.random() * 20) + 80 + '%';
        const zEnd = (Math.random() * 500) + 'px';
        const angle = (Math.random() * 15) + 30 + 'deg';
        star.style.setProperty('--shoot-duration', `${duration}s`);
        star.style.setProperty('--shoot-delay', `${delay}s`);
        star.style.setProperty('--x-start', xStart);
        star.style.setProperty('--y-start', yStart);
        star.style.setProperty('--z-start', zStart);
        star.style.setProperty('--x-end', xEnd);
        star.style.setProperty('--y-end', yEnd);
        star.style.setProperty('--z-end', zEnd);
        star.style.setProperty('--angle', angle);
        visualEffectsField.appendChild(star); // Añadir al nuevo contenedor
        setTimeout(() => { star.remove(); }, (duration + Math.abs(delay)) * 1000);
    }

    // --- Pétalos 2D (Siguen como fondo general) ---
    function generatePetals(count) {
        for (let i = 0; i < count; i++) { createPetal(); }
    }

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        petal.classList.add(randomColor);
        const fallTime = (Math.random() * 10) + 8;
        const swayTime = (Math.random() * 4) + 6;
        const xEnd = (Math.random() * 200) - 100 + 'px';
        const rEnd = (Math.random() * 360) + 'deg';
        const swayDistance = (Math.random() * 40) + 20 + 'px';
        petal.style.setProperty('--fall-time', `${fallTime}s`);
        petal.style.setProperty('--sway-time', `${swayTime}s`);
        petal.style.setProperty('--x-end', xEnd);
        petal.style.setProperty('--r-end', rEnd);
        petal.style.setProperty('--sway-distance', swayDistance);
        petal.style.left = `${Math.random() * 100}vw`;
        petalContainer.appendChild(petal);
        setTimeout(() => { petal.remove(); }, (fallTime + 1) * 1000);
    }

    // --- 6. Inicialización de Efectos y Bucles ---
    generate3DFlyingHearts(flyingHeartCount);
    generateJumpingHearts(jumpingHeartCount);
    generateShootingStars(shootingStarCount);
    generatePetals(initialPetalCount);

    // Intervalos para regenerar efectos continuamente
    setInterval(() => { generate3DFlyingHearts(flyingHeartCount / 2); }, 25000);
    setInterval(() => { generateJumpingHearts(jumpingHeartCount / 2); }, 8000); // Más frecuente para que se vean dentro de la imagen
    setInterval(() => { generateShootingStars(shootingStarCount / 3); }, 7000);
    setInterval(() => {
        const count = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < count; i++) { createPetal(); }
    }, 4000);
});