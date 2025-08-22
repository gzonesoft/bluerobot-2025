/**
 * Language Switcher Module
 * Handles dynamic language switching between Korean and English
 * Default language: English
 */

class LanguageSwitcher {
  constructor() {
    // Default to English
    this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
    this.translations = {};
    this.init();
  }

  async init() {
    console.log('Initializing LanguageSwitcher...'); // 디버깅
    
    // Load translation files
    await this.loadTranslations();
    
    // Apply initial language
    this.applyLanguage(this.currentLang);
    
    // Set initial toggle button state
    const toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) {
      console.log('Setting initial language to:', this.currentLang); // 디버깅
      toggleBtn.dataset.current = this.currentLang;
      const langText = toggleBtn.querySelector('.lang-text');
      if (langText) {
        langText.textContent = this.currentLang === 'en' ? 'ENG' : 'KOR';
      }
    }
    
    // Setup event listeners for language buttons
    this.setupEventListeners();
    
    // Check URL parameters for language preference
    this.checkURLParams();
  }

  async loadTranslations() {
    try {
      const [koData, enData] = await Promise.all([
        fetch('./lang/ko.json').then(r => r.json()),
        fetch('./lang/en.json').then(r => r.json())
      ]);
      
      this.translations = {
        ko: koData,
        en: enData
      };
      
      console.log('Translations loaded successfully');
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  }
  applyLanguage(lang) {
    // Set HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(element => {
      const key = element.getAttribute('data-lang');
      const translation = this.getTranslation(key, lang);
      
      if (translation) {
        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else if (element.tagName === 'BUTTON') {
          element.textContent = translation;
        } else {
          // For elements that might contain HTML (like titles with <br>)
          element.innerHTML = translation;
        }
      }
    });
    
    // Update toggle button state
    const toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) {
      toggleBtn.dataset.current = lang;
      const langText = toggleBtn.querySelector('.lang-text');
      if (langText) {
        langText.textContent = lang === 'en' ? 'ENG' : 'KOR';
      }
    }
    
    // Update image alt texts
    this.updateImageAlts(lang);
    
    // Update language button states (legacy)
    this.updateButtonStates(lang);
    
    // Update meta tags for SEO
    this.updateMetaTags(lang);
    
    // Save preference to localStorage
    localStorage.setItem('selectedLanguage', lang);
    this.currentLang = lang;
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  }
  getTranslation(key, lang) {
    const keys = key.split('.');
    let translation = this.translations[lang];
    
    for (const k of keys) {
      translation = translation?.[k];
    }
    
    return translation;
  }

  updateButtonStates(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  updateImageAlts(lang) {
    const imageAlts = {
      ko: {
        'company-logo': '블루로봇',
        'product-logo': '밸런스스테이지 QuadAlign X',
        'hero-video': '4축 정렬 시연 영상'
      },
      en: {
        'company-logo': 'BlueRobot',
        'product-logo': 'BalanceStage QuadAlign X',
        'hero-video': '4-axis alignment demo video'
      }
    };
    
    Object.entries(imageAlts[lang] || {}).forEach(([id, alt]) => {
      const element = document.getElementById(id);
      if (element) {
        element.alt = alt;
      }
    });
  }
  updateMetaTags(lang) {
    const metaData = {
      ko: {
        title: 'BalanceStage QuadAlign X - 블루로봇',
        description: '세계 최초 4축 통합 정렬 플랫폼. 정렬이 쉬워지면, 제조는 달라집니다.',
        keywords: '정렬시스템, 4축제어, 정밀제조, 블루로봇, QuadAlign X'
      },
      en: {
        title: 'BalanceStage QuadAlign X - BlueRobot',
        description: "World's first 4-axis integrated alignment platform. Redesigning Alignment. Transforming the Future of Manufacturing.",
        keywords: 'alignment system, 4-axis control, precision manufacturing, BlueRobot, QuadAlign X'
      }
    };
    
    // Update page title
    document.title = metaData[lang].title;
    
    // Update meta tags
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.content = metaData[lang].description;
    
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) keywordsMeta.content = metaData[lang].keywords;
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = metaData[lang].title;
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = metaData[lang].description;
  }
  setupEventListeners() {
    // Language toggle button
    const toggleBtn = document.getElementById('langToggle');
    console.log('Toggle button found:', toggleBtn); // 디버깅
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault(); // 기본 동작 방지
        const currentLang = toggleBtn.dataset.current;
        const newLang = currentLang === 'en' ? 'ko' : 'en';
        
        console.log('Switching from', currentLang, 'to', newLang); // 디버깅
        
        // Update button state
        toggleBtn.dataset.current = newLang;
        const langText = toggleBtn.querySelector('.lang-text');
        if (langText) {
          langText.textContent = newLang === 'en' ? 'ENG' : 'KOR';
        }
        
        // Apply language change
        this.applyLanguage(newLang);
        
        // Add smooth transition effect
        document.body.style.opacity = '0.95';
        setTimeout(() => {
          document.body.style.opacity = '1';
        }, 150);
      });
    } else {
      console.error('Toggle button not found!');
    }
    
    // Legacy button support (if any old buttons exist)
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang !== this.currentLang) {
          this.applyLanguage(lang);
        }
      });
    });
    
    // Keyboard shortcuts (Alt+K for Korean, Alt+E for English)
    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        if (e.key === 'k' || e.key === 'K') {
          this.applyLanguage('ko');
        } else if (e.key === 'e' || e.key === 'E') {
          this.applyLanguage('en');
        }
      }
    });
  }

  checkURLParams() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    
    if (lang && ['ko', 'en'].includes(lang)) {
      this.applyLanguage(lang);
    }
  }

  // Public method to get current language
  getCurrentLanguage() {
    return this.currentLang;
  }

  // Public method to switch language programmatically
  switchLanguage(lang) {
    if (['ko', 'en'].includes(lang)) {
      this.applyLanguage(lang);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.languageSwitcher = new LanguageSwitcher();
});

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LanguageSwitcher;
}