/**
 * App Mockup Scroll Animations - Section-based Version
 * Uses problem-solution section as reference point for animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all mockup screens and section
    const mockupScreens = document.querySelectorAll('.mockup-screen');
    const futureSection = document.querySelector('#future'); // future 섹션으로 변경
    const mockupContainer = document.querySelector('.app-mockups-container');
    
    if (!mockupScreens.length || !futureSection || !mockupContainer) return;
    
    // Function to calculate section scroll progress
    function getSectionProgress() {
        const rect = futureSection.getBoundingClientRect();
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate how far the section has scrolled
        // 0 = section just entering bottom of viewport
        // 1 = section completely passed top of viewport
        const sectionTop = rect.top;
        const progress = 1 - ((sectionTop + sectionHeight) / (windowHeight + sectionHeight));
        
        return Math.max(0, Math.min(1, progress));
    }
    
    // Function to update mockup animations based on section scroll
    function updateMockups() {
        const progress = getSectionProgress();
        
        mockupScreens.forEach((screen, index) => {
            let opacity = 0;
            let translateY = 100;
            
            // Stagger the animations for fade in (1,2,3 order)
            const fadeInStagger = index * 0.05;
            // Reverse stagger for fade out (3,2,1 order)
            const fadeOutStagger = (mockupScreens.length - 1 - index) * 0.05;
            
            // Use fade in stagger for entering
            const fadeInProgress = Math.max(0, Math.min(1, progress - fadeInStagger));
            // Use fade out stagger for exiting
            const fadeOutProgress = Math.max(0, Math.min(1, progress - fadeOutStagger));
            
            // Fade in from 15% to 25% of section scroll
            if (fadeInProgress < 0.15) {
                opacity = 0;
                translateY = 100;
                screen.classList.remove('animate-in');
                screen.classList.add('animate-out');
            }
            else if (fadeInProgress >= 0.15 && fadeInProgress < 0.25) {
                // Fade in phase (1,2,3 order)
                const fadeInPhase = (fadeInProgress - 0.15) / 0.1;
                opacity = fadeInPhase;
                translateY = 100 * (1 - fadeInPhase);
                screen.classList.add('animate-in');
                screen.classList.remove('animate-out');
            }
            // Fully visible from 25% to 75%
            else if (fadeInProgress >= 0.25 && fadeOutProgress <= 0.75) {
                opacity = 1;
                translateY = 0;
                screen.classList.add('animate-in');
                screen.classList.remove('animate-out');
            }
            // Fade out from 75% to 85% (3,2,1 order)
            else if (fadeOutProgress > 0.75 && fadeOutProgress <= 0.85) {
                const fadeOutPhase = (fadeOutProgress - 0.75) / 0.1;
                opacity = 1 - fadeOutPhase;
                translateY = -100 * fadeOutPhase;
                screen.classList.add('animate-in');
            }
            else {
                opacity = 0;
                translateY = -100;
                screen.classList.remove('animate-in');
                screen.classList.add('animate-out');
            }
            
            // Apply calculated styles
            screen.style.opacity = opacity;
            screen.style.transform = `translateY(${translateY}px)`;
        });
    }
    
    // Section observer for triggering animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is visible, start updating animations
                updateMockups();
            } else {
                // Section is not visible, hide all screens
                mockupScreens.forEach(screen => {
                    screen.style.opacity = '0';
                    screen.style.transform = 'translateY(100px)';
                    screen.classList.remove('animate-in');
                    screen.classList.add('animate-out');
                });
            }
        });
    }, {
        threshold: 0,
        rootMargin: '-10% 0px -10% 0px'
    });
    
    // Observe the future section
    sectionObserver.observe(futureSection);
    
    // Scroll event for smooth animation updates
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const rect = futureSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    updateMockups();
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check
    updateMockups();
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        window.removeEventListener('scroll', onScroll);
    });
});
