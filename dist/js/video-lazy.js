document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.hero-video');
  if (video) {
    setTimeout(() => {
      const source = video.querySelector('source');
      if (source) {
        video.src = source.getAttribute('src');
        video.load();
        video.play().catch(e => console.log('Video autoplay failed:', e));
      }
    }, 2000);
  }
  
  const lazyElements = document.querySelectorAll('[data-lazy]');
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          lazyObserver.unobserve(entry.target);
        }
      });
    });
    lazyElements.forEach(el => lazyObserver.observe(el));
  }
});
