// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    if (!testimonialSlides.length) return;
    
    let currentIndex = 0;
    const slideCount = testimonialSlides.length;
    
    // Set interval for auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Function to show a specific slide
    function showSlide(index) {
        // Reset interval when manually changing slides
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
        
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Handle index boundaries
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        
        currentIndex = index;
        testimonialSlides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Function for next slide
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    // Function for previous slide
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Touch events for mobile swiping
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialSlider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialSlider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const threshold = 50; // Minimum swipe distance
            
            if (touchEndX < touchStartX - threshold) {
                // Swipe left, go to next slide
                nextSlide();
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe right, go to previous slide
                prevSlide();
            }
        }
    }
    
    // Add fade transition for smoother slide changes
    const slideTransition = `
    <style>
    .testimonial-slide {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', slideTransition);
});