function createStars() {
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    starContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    const numberOfStars = 200;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 1 and 4 pixels
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random twinkle duration between 3 and 7 seconds
        star.style.setProperty('--twinkle-duration', `${Math.random() * 4 + 3}s`);
        
        // Random delay for the animation
        star.style.animationDelay = `${Math.random() * 7}s`;
        
        starContainer.appendChild(star);
    }
    
    document.body.insertBefore(starContainer, document.body.firstChild);
}

// Create stars when the page loads
document.addEventListener('DOMContentLoaded', createStars);
