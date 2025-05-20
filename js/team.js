document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.leadership-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    if (!slides.length) return;
    
    let currentIndex = 0;
    let slideInterval;
    
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function showSlide(index) {
        clearInterval(slideInterval);
        
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.transform = 'translateX(50px)';
            slide.style.opacity = '0';
        });
        
        slides[currentIndex].classList.add('active');
        slides[currentIndex].style.transform = 'translateX(0)';
        slides[currentIndex].style.opacity = '1';
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        startSlideInterval();
    }
    
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    const slider = document.querySelector('.leadership-slider');
    let touchStartX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    });
    
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startSlideInterval);
    
    // Initialize the slider
    showSlide(0);
});