document.addEventListener('DOMContentLoaded', () => {
    const mainCard = document.getElementById('mainCard');
    const revealBtn = document.getElementById('revealBtn');
    const resetBtn = document.getElementById('resetBtn');
    const floatingContainer = document.getElementById('floatingContainer');

    // Card Flip Logic
    revealBtn.addEventListener('click', () => {
        mainCard.classList.add('flipped');
        createExplosion();
    });

    resetBtn.addEventListener('click', () => {
        mainCard.classList.remove('flipped');
    });

    // Floating Elements (Pizza, Coffee, Sleep, Meds)
    const symbols = ['🍕', '🩺', '☕', '💊', '😴', '🚑'];
    
    function createFloatingElement() {
        const el = document.createElement('div');
        el.className = 'floating-element';
        
        // Random symbol
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        el.textContent = randomSymbol;
        
        // Random styling
        const size = Math.random() * 20 + 15; // 15px to 35px
        el.style.fontSize = `${size}px`;
        
        const startX = Math.random() * window.innerWidth;
        el.style.left = `${startX}px`;
        
        const duration = Math.random() * 5 + 5; // 5s to 10s
        el.style.animationDuration = `${duration}s`;
        
        floatingContainer.appendChild(el);
        
        // Remove after animation completes
        setTimeout(() => {
            el.remove();
        }, duration * 1000);
    }

    // Create floating elements periodically
    setInterval(createFloatingElement, 800);

    // Initial burst
    for(let i=0; i<5; i++) {
        setTimeout(createFloatingElement, i * 200);
    }

    // Explosion effect when card flips
    function createExplosion() {
        for(let i=0; i<30; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.className = 'floating-element';
                const explosionSymbols = ['🍕', '☕', '😴', '💊'];
                el.textContent = explosionSymbols[Math.floor(Math.random() * explosionSymbols.length)];
                el.style.fontSize = `${Math.random() * 20 + 10}px`;
                el.style.left = `${window.innerWidth / 2 + (Math.random() * 200 - 100)}px`;
                
                // Faster animation for explosion
                el.style.animationDuration = `${Math.random() * 3 + 2}s`;
                
                floatingContainer.appendChild(el);
                
                setTimeout(() => {
                    el.remove();
                }, 5000);
            }, i * 50);
        }
    }
});