/**
 * Scroll to Top Button Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.getElementById('scrollToTop');
    
    if (!scrollButton) return;
    
    let isScrolling = false;
    
    // Show/hide button based on scroll position
    function toggleButtonVisibility() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }
    
    // Throttle scroll event for performance
    function throttledScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                toggleButtonVisibility();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    // Scroll to top when button is clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    toggleButtonVisibility();
    
    // Initialize Lucide icon for the button
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
