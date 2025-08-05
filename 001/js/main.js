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

    // Demo video - now using YouTube embed, no placeholder needed

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

// Footer functions for download and contact
function downloadBrochure() {
    // PDF 다운로드 로직
    alert('기술 브로셔 PDF 다운로드 기능이 준비 중입니다.');
    // 실제 구현 시: window.open('../assets/brochure/QuadAlign-X-Brochure.pdf', '_blank');
}

function requestEvaluation() {
    // ZIP 파일 요청 로직  
    window.open('mailto:ces@bluerobot.co.kr?subject=CES 평가자료 요청&body=안녕하세요,%0D%0A%0D%0ABalanceStage QuadAlign X CES 평가자료를 요청드립니다.%0D%0A%0D%0A회사명:%0D%0A담당자:%0D%0A연락처:%0D%0A%0D%0A감사합니다.', '_blank');
}