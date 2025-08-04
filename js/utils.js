/**
 * BlueRobot QuadAlign X 랜딩페이지 유틸리티
 */

class LandingPageUtils {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupContactForms();
        console.log('BlueRobot 랜딩페이지 초기화 완료');
    }

    // 부드러운 스크롤링
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // 스크롤 애니메이션
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // 연락처 폼 처리
    setupContactForms() {
        const contactButtons = document.querySelectorAll('button');
        contactButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = e.target.textContent.trim();
                if (buttonText.includes('브로셔')) {
                    console.log('브로셔 다운로드 요청');
                    alert('기술 브로셔를 다운로드합니다.');
                } else if (buttonText.includes('CES')) {
                    window.open('mailto:ces@bluerobot.co.kr?subject=CES 평가자료 요청');
                } else if (buttonText.includes('시연')) {
                    window.open('mailto:ces@bluerobot.co.kr?subject=시연 일정 문의');
                } else if (buttonText.includes('상담')) {
                    window.open('mailto:ces@bluerobot.co.kr?subject=기술 상담 신청');
                }
            });
        });
    }
}

// 페이지 로드시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new LandingPageUtils();
});