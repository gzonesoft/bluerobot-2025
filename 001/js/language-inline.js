/**
 * Language Switcher Module with Inline Translations
 * Handles dynamic language switching between Korean and English
 * Default language: English
 */

class LanguageSwitcher {
  constructor() {
    // Default to English
    this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // 인라인 번역 데이터 (JSON 로드 실패 대비)
    this.translations = {
      en: {
        nav: {
          features: "Features",
          demo: "Live Demo",
          applications: "Applications",
          future: "Future",
          contact: "Contact",
          homepage: "Company Website"
        },
        hero: {
          title: "Redesigning Alignment.<br>Transforming the Future of Manufacturing.",
          subtitle: "BalanceStage QuadAlign X is the world's first high-load alignment platform unifying four axes (X, Y, Pitch, Roll) in a single control.<br><br>Alignment is no longer for experts — with one command, anyone can achieve precision.",
          cta: {
            primary: "Watch Demo",
            secondary: "View Tech Summary"
          }
        },
        problemSolution: {
          title: "Conventional alignment was complex.<br>We redesigned it as a platform.",
          description: "The greatest challenge in precision manufacturing is angle alignment (Pitch/Roll) under high loads. Traditional methods relied on manual work and complex controls.",
          subtitle: "QuadAlign X synchronizes four axes on a single platform, redefining alignment through real-time correction.",
          conventional: {
            title: "Conventional Methods",
            items: ["Complex parallel structures", "Repeated adjustments by skilled operators", "Errors from axis interference", "Long alignment times", "High training costs"]
          },
          quadAlign: {
            title: "QuadAlign X",
            items: ["4-axis integrated control platform", "Automated alignment and correction", "Real-time interference compensation algorithm", "Alignment completed within 2 seconds", "Intuitive operation"]
          }
        }
      },
      ko: {
        nav: {
          features: "기술특징",
          demo: "시연영상",
          applications: "적용분야",
          future: "향후방향",
          contact: "문의",
          homepage: "회사 홈페이지"
        },
        hero: {
          title: "정렬이 쉬워지면,<br>제조는 달라집니다.",
          subtitle: "BalanceStage QuadAlign X는<br>4개의 축(X, Y, Pitch, Roll)을 하나의 제어 동작으로 통합한 세계 최초의 고하중 동기 정렬 플랫폼입니다.<br><br>정렬은 이제 수동 조작이 아닌 한 번의 동작으로 완성되는 지능형 공정입니다.",
          cta: {
            primary: "시연 영상 보기",
            secondary: "기술 요약 보기"
          }
        },
        problemSolution: {
          title: "기존 정렬 시스템은 복잡했습니다.<br>우리는 정렬을 '플랫폼'으로 다시 설계했습니다.",
          description: "정밀 제조에서 가장 어려운 과제는 고하중 환경에서의 각도 정렬(Pitch/Roll)입니다. 기존 방식은 복잡한 병렬 구조나 숙련자 중심의 반복 조정에 의존해 왔습니다.",
          subtitle: "BalanceStage QuadAlign X는 4개의 축을 단일 플랫폼에서 동기화하고, 축 간 간섭을 실시간으로 보정하여, 정렬의 개념 자체를 바꾸었습니다.",
          conventional: {
            title: "기존 방식",
            items: ["복잡한 병렬 구조", "숙련자 중심의 반복 조정", "축 간 간섭으로 인한 오차", "긴 정렬 시간", "높은 학습 비용"]
          },
          quadAlign: {
            title: "QuadAlign X",
            items: ["4축 통합 제어 플랫폼", "자동 정렬 및 보정", "실시간 간섭 보정 알고리즘", "2초 이내 정렬 완료", "직관적인 조작"]
          }
        }
      }
    };
    
    this.init();
  }

  async init() {
    console.log('Initializing LanguageSwitcher...'); // 디버깅
    
    // Try to load external JSON files
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
      const [koResponse, enResponse] = await Promise.all([
        fetch('/lang/ko.json'),
        fetch('/lang/en.json')
      ]);
      
      if (koResponse.ok && enResponse.ok) {
        const [koData, enData] = await Promise.all([
          koResponse.json(),
          enResponse.json()
        ]);
        
        // 외부 JSON 파일의 데이터로 덮어쓰기
        this.translations = {
          ko: koData,
          en: enData
        };
        
        console.log('External translations loaded successfully');
      } else {
        console.log('Using inline translations (JSON files not found)');
      }
    } catch (error) {
      console.error('Error loading translations:', error);
      console.log('Using inline translations as fallback');
    }
  }

  // Features 섹션 번역 추가
  this.translations.en.features = {
    title: "Not added, but unified",
    subtitle: "Transforming alignment complexity into one simple control",
    cards: [
      {title: "4-Axis Integrated Control Platform", description: "By unifying four axes — X, Y, Pitch, and Roll — into a single control system, we have simplified the complex alignment process."},
      {title: "2μm Precision", description: "Maintains 2μm-level parallel precision and guarantees repeatability even under heavy loads of several hundred kilograms."},
      {title: "Correction Within 2 Seconds", description: "Automatically detects alignment conditions and completes simultaneous correction of all axes within 2 seconds."},
      {title: "Real-Time Interference Compensation", description: "An embedded algorithm detects and corrects axis interference in real time, ensuring precise alignment."},
      {title: "Scalable Architecture", description: "An evolutionary design expandable to the Z and Yaw axes, ready to meet future requirements."},
      {title: "World's First Technology", description: "As the world's first four-axis synchronized alignment platform, it delivers truly innovative technology."}
    ]
  };
  
  this.translations.ko.features = {
    title: "더한 것이 아니라, 묶었습니다.",
    subtitle: "정렬의 복잡함을 하나의 제어로 바꾼 것입니다.",
    cards: [
      {title: "X, Y, Pitch, Roll 4축 통합 제어 플랫폼", description: "세계 최초로 4개 축을 단일 명령으로 동시 제어"},
      {title: "±2μm 수준의 정밀도", description: "100kg 고하중 환경에서도 ±2μm 수준의 정밀도를 유지하며 반복성을 보장합니다."},
      {title: "2초 이내 보정 완료", description: "정렬 조건 자동 감지 및 2초 이내 모든 축의 동시 보정 완료"},
      {title: "축 간 간섭을 실시간 보정하는 내장 알고리즘", description: "4개 축이 서로 영향을 주지 않도록 지능형 제어"},
      {title: "Z축, Yaw축으로 확장 가능한 진화형 구조", description: "미래 6축 시스템으로 업그레이드 가능한 플랫폼"},
      {title: "세계 최초 4축 통합 기술", description: "기존 정렬 방식의 패러다임을 완전히 바꾼 혁신"}
    ]
  };
  
  // Live Demo 섹션
  this.translations.en.liveDemo = {
    title: "Real-Time Four-Axis Alignment Demo",
    description: "QuadAlign X detects positional errors in real time and automatically calculates and controls all four axes simultaneously.",
    details: "This process is completed with a single command — without repeated adjustments — while maintaining precision and repeatability even under high loads, ensuring angle axes remain stable."
  };
  
  this.translations.ko.liveDemo = {
    title: "실시간 4축 정렬 시연",
    description: "QuadAlign X는 대상물의 위치 오차를 실시간으로 감지하고 4개의 축을 자동으로 계산, 동시에 제어합니다.",
    details: "이 과정은 반복 조정 없이 단 한 번의 명령으로 수행됩니다. 고하중 상태에서도 각도 축이 흔들리지 않도록 정밀도와 반복성을 유지합니다."
  };
  
  // Applications 섹션
  this.translations.en.applications = {
    title: "Applications",
    subtitle: "Making alignment simple means transforming the entire quality and efficiency of manufacturing.",
    cards: [
      {title: "Semiconductor Packaging & Assembly", description: "Delivers outstanding performance in precise chip alignment and bonding processes."},
      {title: "Optical Lens & Sensor Alignment", description: "Automates the alignment of lenses and sensors in high-precision optical systems."},
      {title: "Precision Robot Calibration", description: "Supports precise calibration and positional correction of industrial robots."},
      {title: "Aerospace & Defense Precision Assembly", description: "Applied to automation in aerospace and defense fields where extreme precision is required."}
    ]
  };
  
  this.translations.ko.applications = {
    title: "적용 분야",
    subtitle: "정렬을 쉽게 만든다는 것, 그것은 곧 제조 품질과 효율 전체를 바꾸는 일입니다.",
    cards: [
      {title: "반도체 패키징 및 조립", description: "마이크로미터 수준의 정밀도가 요구되는 반도체 공정"},
      {title: "광학 렌즈 및 센서 정렬", description: "각도 정렬이 성능을 좌우하는 광학 장비 조립"},
      {title: "정밀 로봇 캘리브레이션", description: "로봇 엔드이펙터의 정확한 위치 및 각도 보정"},
      {title: "우주/방산 정밀 조립 자동화", description: "극한 정밀도가 요구되는 우주항공 부품 조립"}
    ]
  };
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