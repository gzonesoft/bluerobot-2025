// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Demo video placeholder interaction
    const demoPlaceholder = document.querySelector('.demo-video-placeholder');
    if (demoPlaceholder) {
        demoPlaceholder.addEventListener('click', function() {
            alert('실제 시연 영상을 재생하려면 비디오 파일을 추가해주세요.');
        });
    }

    // Hero video optimization
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('loadstart', function() {
            console.log('Hero video loading started');
        });
        
        heroVideo.addEventListener('canplay', function() {
            console.log('Hero video can start playing');
            heroVideo.style.opacity = '1';
        });
        
        // Pause video when not in viewport (performance optimization)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(e => console.log('Video play failed:', e));
                } else {
                    heroVideo.pause();
                }
            });
        });
        
        observer.observe(heroVideo);
    }
});