/**
 * Language Switcher Module with Complete Inline Translations
 * Handles dynamic language switching between Korean and English
 * Default language: English
 */

class LanguageSwitcher {
  constructor() {
    // Clear any existing language preference to ensure English is default
    // localStorage.removeItem('selectedLanguage'); // 임시로 주석처리
    
    // Default to English
    this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // 영문이 기본이 되도록 강제 (첫 방문자용)
    if (!localStorage.getItem('selectedLanguage')) {
      this.currentLang = 'en';
      localStorage.setItem('selectedLanguage', 'en');
    }
    
    // 완전한 인라인 번역 데이터
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
            items: [
              "Complex parallel structures",
              "Repeated adjustments by skilled operators",
              "Errors from axis interference",
              "Long alignment times",
              "High training costs"
            ]
          },
          quadAlign: {
            title: "QuadAlign X",
            items: [
              "4-axis integrated control platform",
              "Automated alignment and correction",
              "Real-time interference compensation algorithm",
              "Alignment completed within 2 seconds",
              "Intuitive operation"
            ]
          }
        },
        features: {
          title: "Not added, but unified",
          subtitle: "Transforming alignment complexity into one simple control",
          cards: [
            {
              title: "4-Axis Integrated Control Platform",
              description: "By unifying four axes — X, Y, Pitch, and Roll — into a single control system, we have simplified the complex alignment process."
            },
            {
              title: "2μm Precision",
              description: "Maintains 2μm-level parallel precision and guarantees repeatability even under heavy loads of several hundred kilograms."
            },
            {
              title: "Correction Within 2 Seconds",
              description: "Automatically detects alignment conditions and completes simultaneous correction of all axes within 2 seconds."
            },
            {
              title: "Real-Time Interference Compensation",
              description: "An embedded algorithm detects and corrects axis interference in real time, ensuring precise alignment."
            },
            {
              title: "Scalable Architecture",
              description: "An evolutionary design expandable to the Z and Yaw axes, ready to meet future requirements."
            },
            {
              title: "World's First Technology",
              description: "As the world's first four-axis synchronized alignment platform, it delivers truly innovative technology."
            }
          ]
        },
        liveDemo: {
          title: "Real-Time Four-Axis Alignment Demo",
          description: "QuadAlign X detects positional errors in real time and automatically calculates and controls all four axes simultaneously.",
          details: "This process is completed with a single command — without repeated adjustments — while maintaining precision and repeatability even under high loads, ensuring angle axes remain stable."
        },
        applications: {
          title: "Applications",
          subtitle: "Making alignment simple means transforming the entire quality and efficiency of manufacturing.",
          cards: [
            {
              title: "Semiconductor Packaging & Assembly",
              description: "Delivers outstanding performance in precise chip alignment and bonding processes."
            },
            {
              title: "Optical Lens & Sensor Alignment",
              description: "Automates the alignment of lenses and sensors in high-precision optical systems."
            },
            {
              title: "Precision Robot Calibration",
              description: "Supports precise calibration and positional correction of industrial robots."
            },
            {
              title: "Aerospace & Defense Precision Assembly",
              description: "Applied to automation in aerospace and defense fields where extreme precision is required."
            }
          ]
        },
        intelligentEcosystem: {
          title: "Intelligent Alignment Ecosystem",
          subtitle: "Beyond QuadAlign X, it evolves into an integrated solution that automates and optimizes the entire alignment process.",
          app: {
            title: "Smart App for Alignment Recipe Management",
            serviceFeatures: {
              title: "Service Features",
              items: [
                "Save optimal alignment 'recipes' for each product",
                "Apply recipes with one touch through the app",
                "AI-powered suggestions for optimal recipes",
                "Analyze past data and enhance performance"
              ]
            },
            keyStrengths: {
              title: "Key Strengths",
              items: [
                "Ensures standardized, high-quality alignment",
                "Shortens time-to-market for new products",
                "Independent of operator skill level",
                "Continuous performance optimization"
              ]
            },
            need: {
              title: "Need",
              items: [
                "Secure process repeatability and consistency",
                "Standardize production quality",
                "Maximize operational efficiency",
                "Reduce dependence on skilled operators"
              ]
            }
          },
          vision: "Vision: Fully Autonomous Alignment System",
          visionDetail: "equipment → platform → ecosystem<br>Building a fully autonomous alignment system that automates and optimizes every step of the process."
        },
        roadmap: {
          title: "From Two Axes to a New Standard in Alignment Control",
          content: "QuadAlign X is not a two-axis extension. Centered on Pitch and Roll, it revolutionizes control with real-time multi-axis compensation. BlueRobot is evolving this into a six-axis intelligent alignment system.",
          vision: "Alignment is no longer about matching points — it must become the technology that redesigns the process."
        },
        companyVision: {
          title: "Making complex technology simple.<br>Making precision technology accessible to everyone.",
          description: "BlueRobot transforms alignment technology from the domain of specific equipment into an open, accessible technology platform.",
          mission: "We move beyond machine-centered methods to lead a new era of alignment driven by control and algorithms."
        },
        contact: {
          tagline: "Redesigning Alignment.<br>Transforming the Future of Manufacturing.",
          address: {
            line1: "#308, Sejong Startup Nurturing Center",
            line2: "2296 Sejong-ro, Jochiwon-eup",
            line3: "Sejong Special Self-Governing City"
          },
          navigation: {
            productInfo: "Product Information",
            features: "Technical Features",
            applications: "Applications",
            demo: "Demo Video",
            roadmap: "Technology Roadmap"
          },
          resources: {
            title: "Resources & Inquiries",
            brochure: "Technical Brochure (PDF)",
            email: "Email Inquiry",
            profile: "Company Profile"
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
            items: [
              "복잡한 병렬 구조",
              "숙련자 중심의 반복 조정",
              "축 간 간섭으로 인한 오차",
              "긴 정렬 시간",
              "높은 학습 비용"
            ]
          },
          quadAlign: {
            title: "QuadAlign X",
            items: [
              "4축 통합 제어 플랫폼",
              "자동 정렬 및 보정",
              "실시간 간섭 보정 알고리즘",
              "2초 이내 정렬 완료",
              "직관적인 조작"
            ]
          }
        },
        features: {
          title: "더한 것이 아니라, 묶었습니다.",
          subtitle: "정렬의 복잡함을 하나의 제어로 바꾼 것입니다.",
          cards: [
            {
              title: "X, Y, Pitch, Roll 4축 통합 제어 플랫폼",
              description: "세계 최초로 4개 축을 단일 명령으로 동시 제어"
            },
            {
              title: "±2μm 수준의 정밀도",
              description: "100kg 고하중 환경에서도 ±2μm 수준의 정밀도를 유지하며 반복성을 보장합니다."
            },
            {
              title: "2초 이내 보정 완료",
              description: "정렬 조건 자동 감지 및 2초 이내 모든 축의 동시 보정 완료"
            },
            {
              title: "축 간 간섭을 실시간 보정하는 내장 알고리즘",
              description: "4개 축이 서로 영향을 주지 않도록 지능형 제어"
            },
            {
              title: "Z축, Yaw축으로 확장 가능한 진화형 구조",
              description: "미래 6축 시스템으로 업그레이드 가능한 플랫폼"
            },
            {
              title: "세계 최초 4축 통합 기술",
              description: "기존 정렬 방식의 패러다임을 완전히 바꾼 혁신"
            }
          ]
        },
        liveDemo: {
          title: "실시간 4축 정렬 시연",
          description: "QuadAlign X는 대상물의 위치 오차를 실시간으로 감지하고 4개의 축을 자동으로 계산, 동시에 제어합니다.",
          details: "이 과정은 반복 조정 없이 단 한 번의 명령으로 수행됩니다. 고하중 상태에서도 각도 축이 흔들리지 않도록 정밀도와 반복성을 유지합니다."
        },
        applications: {
          title: "적용 분야",
          subtitle: "정렬을 쉽게 만든다는 것, 그것은 곧 제조 품질과 효율 전체를 바꾸는 일입니다.",
          cards: [
            {
              title: "반도체 패키징 및 조립",
              description: "마이크로미터 수준의 정밀도가 요구되는 반도체 공정"
            },
            {
              title: "광학 렌즈 및 센서 정렬",
              description: "각도 정렬이 성능을 좌우하는 광학 장비 조립"
            },
            {
              title: "정밀 로봇 캘리브레이션",
              description: "로봇 엔드이펙터의 정확한 위치 및 각도 보정"
            },
            {
              title: "우주/방산 정밀 조립 자동화",
              description: "극한 정밀도가 요구되는 우주항공 부품 조립"
            }
          ]
        },
        intelligentEcosystem: {
          title: "지능형 정렬 생태계",
          subtitle: "QuadAlign X를 넘어, 정렬의 모든 과정을 자동화하고 최적화하는 통합 솔루션으로 진화합니다.",
          app: {
            title: "정렬 레시피 관리 및 최적화 앱",
            serviceFeatures: {
              title: "서비스 내용",
              items: [
                "제품별 최적 정렬 조건 '레시피' 저장",
                "앱에서 원터치 레시피 적용",
                "AI 기반 최적 레시피 제안",
                "과거 데이터 분석 및 성능 개선"
              ]
            },
            keyStrengths: {
              title: "핵심 강점",
              items: [
                "표준화된 고품질 정렬 보장",
                "신제품 도입 시간 단축",
                "작업자 숙련도 무관",
                "지속적 성능 최적화"
              ]
            },
            need: {
              title: "필요성",
              items: [
                "공정 반복성 및 일관성 확보",
                "생산 품질 표준화",
                "작업 효율 극대화",
                "숙련 작업자 의존도 탈피"
              ]
            }
          },
          vision: "비전: 완전 자율 정렬 시스템",
          visionDetail: "장비 → 플랫폼 → 생태계<br>정렬의 모든 과정을 자동화하고 최적화하는 완전 자율 정렬 시스템 구축"
        },
        roadmap: {
          title: "2축에서 시작해, 정렬 제어의 기준을 다시 쓰다.",
          content: "QuadAlign X는 2축 기반 정렬기의 확장이 아닙니다. Pitch/Roll을 중심으로 다축 간 간섭을 실시간으로 보정하며, 제어 구조 자체를 혁신한 통합형 플랫폼입니다. 블루로봇은 이를 기반으로 Z축과 Yaw축까지 통합해 6축 지능 정렬 시스템으로 진화하고 있습니다.",
          vision: "정렬은 이제 점과 점을 맞추는 일이 아니라, 공정을 재설계하는 기술이 되어야 합니다."
        },
        companyVision: {
          title: "복잡한 기술을 단순하게,<br>정밀한 기술을 누구나 쓰게.",
          description: "블루로봇은 정렬 기술을 특정 장비의 영역이 아니라 누구나 접근 가능한 기술 플랫폼으로 만듭니다.",
          mission: "기존의 기계 중심 기술에서 벗어나, 제어 중심, 알고리즘 중심 정렬 시대를 여는 기업입니다."
        },
        contact: {
          tagline: "정렬이 쉬워지면,<br>제조는 달라집니다.",
          address: {
            line1: "#308, 세종창업기원센터",
            line2: "세종특별자치시 조치원읍",
            line3: "세종로 2296"
          },
          navigation: {
            productInfo: "제품 정보",
            features: "기술 특징",
            applications: "적용 분야",
            demo: "시연 영상",
            roadmap: "기술 로드맵"
          },
          resources: {
            title: "자료 및 문의",
            brochure: "기술 브로셔 (PDF)",
            email: "이메일 문의",
            profile: "회사 소개"
          }
        }
      }
    };
    
    this.init();
  }

  async init() {
    console.log('Initializing LanguageSwitcher...');
    
    // Apply initial language
    this.applyLanguage(this.currentLang);
    
    // Set initial toggle button state
    const toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) {
      console.log('Setting initial language to:', this.currentLang);
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
    console.log('Toggle button found:', toggleBtn);
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentLang = toggleBtn.dataset.current;
        const newLang = currentLang === 'en' ? 'ko' : 'en';
        
        console.log('Switching from', currentLang, 'to', newLang);
        
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
    
    // Keyboard shortcuts (Alt+K for Korean, Alt+E for English)
    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        if (e.key === 'k' || e.key === 'K') {
          const toggleBtn = document.getElementById('langToggle');
          if (toggleBtn) {
            toggleBtn.dataset.current = 'ko';
            const langText = toggleBtn.querySelector('.lang-text');
            if (langText) langText.textContent = 'KOR';
          }
          this.applyLanguage('ko');
        } else if (e.key === 'e' || e.key === 'E') {
          const toggleBtn = document.getElementById('langToggle');
          if (toggleBtn) {
            toggleBtn.dataset.current = 'en';
            const langText = toggleBtn.querySelector('.lang-text');
            if (langText) langText.textContent = 'ENG';
          }
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

  getCurrentLanguage() {
    return this.currentLang;
  }

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