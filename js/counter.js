// Counter Animation for Stats
document.addEventListener('DOMContentLoaded', function() {
    const statElements = document.querySelectorAll('.stat-number');
    
    if (statElements.length === 0) return;
    
    let animated = false;
    
    // Counter animation function
    function animateCounter(element, targetValue, duration) {
        const start = 0;
        const end = parseInt(targetValue);
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        
        let current = start;
        const timer = setInterval(function() {
            current += increment;
            element.textContent = current;
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    
    // Animate on scroll
    function checkScroll() {
        if (animated) return;
        
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        
        const position = statsSection.getBoundingClientRect();
        
        // Check if section is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            statElements.forEach(element => {
                const targetValue = element.getAttribute('data-count');
                const duration = 2000;
                animateCounter(element, targetValue, duration);
            });
            
            animated = true;
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    // Initial check
    checkScroll();
    
    // Listen for scroll
    window.addEventListener('scroll', checkScroll);
});

// Add animation to counter numbers
document.head.insertAdjacentHTML('beforeend', `
<style>
.stat-number {
    position: relative;
    display: inline-block;
}

.stat-number:after {
    content: '+';
    position: absolute;
    top: 0;
    right: -20px;
    font-size: 3rem;
    color: var(--primary-color);
}

@keyframes countUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
`);