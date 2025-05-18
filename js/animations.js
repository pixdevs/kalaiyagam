// Animations
document.addEventListener('DOMContentLoaded', function() {
    // Reveal elements when scrolled into view
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-text-delay, .reveal-btn, .reveal-card, .reveal-image');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Run once on load
    revealOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Service cards staggered animation
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${0.1 * index}s`;
        });
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && heroContent) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                heroContent.style.transform = `translate(-50%, ${-50 + (scrollPosition * 0.1)}%)`;
                heroSection.querySelector('.hero-image').style.transform = `translateY(${scrollPosition * 0.2}px)`;
            }
        });
    }
    
    // Text typing animation for the hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        setTimeout(() => {
            heroHeading.classList.add('active');
            setTimeout(() => {
                document.querySelector('.hero-content p').classList.add('active');
                setTimeout(() => {
                    document.querySelector('.hero-content .btn').classList.add('active');
                }, 300);
            }, 300);
        }, 200);
    }
    
    // Hover effects for service cards
    const serviceIcons = document.querySelectorAll('.service-icon i');
    serviceIcons.forEach(icon => {
        const card = icon.closest('.service-card');
        
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotateY(180deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotateY(0)';
            }, 500);
        });
    });
    
    // Subtle hover effect for all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transition = 'var(--transition)';
        });
    });
    
    // Animate separator lines
    const separators = document.querySelectorAll('.separator');
    separators.forEach(separator => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    separator.style.animation = 'expandWidth 1s forwards';
                    observer.unobserve(separator);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(separator);
    });
});

// Additional animation keyframes
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes expandWidth {
    from { width: 0; }
    to { width: 80px; }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
</style>
`);