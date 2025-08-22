# BalanceStage QuadAlign X 프로젝트

블루로봇(BlueRobot)의 BalanceStage QuadAlign X 제품 관련 프로젝트 통합 저장소입니다.

## 📁 프로젝트 구조

```
C:\project\bluerobot\
├── 📁 001/                    # 웹사이트 버전 1 (현재 버전)
│   ├── index.html             # 메인 HTML 파일
│   ├── css/                   # 모듈화된 CSS 파일들
│   │   ├── base.css           # 기본 스타일
│   │   ├── hero.css           # Hero 섹션
│   │   ├── buttons.css        # 버튼 컴포넌트
│   │   ├── sections.css       # 주요 섹션들
│   │   ├── future.css         # Future Solutions
│   │   └── footer.css         # Footer & Contact
│   ├── js/                    # JavaScript 폴더
│   │   └── main.js            # 메인 스크립트
│   ├── package.json           # NPM 설정
│   └── .gitignore             # Git 무시 파일
├── 📁 assets/                 # 공통 리소스 폴더
│   ├── logo/                  # 로고 이미지
│   │   ├── Bluerobot_CI.png
│   │   └── Balancestage_BI.png
│   └── video/                 # 비디오 파일
│       └── Herosection.mp4
├── 📁 docs/                   # 문서 폴더
│   └── optimization-plan.md   # 성능 최적화 계획
├── 📄 README.md              # 프로젝트 메인 문서
├── 📄 project-info.md        # 통합 지침서
└── 📄 open-browser.bat       # 웹사이트 실행 배치 파일
```

## 🚀 프로젝트 개요

- **제품명**: BalanceStage QuadAlign X
- **회사명**: 블루로봇(BlueRobot)
- **주요 기술**: 4축 통합 제어 정렬 플랫폼 (X, Y, Pitch, Roll)
- **프로젝트 유형**: 제품 홍보 웹사이트

## 📋 버전 관리

### 현재 버전: 001
- **생성일**: 2025년 8월 5일
- **주요 특징**: 
  - Tailwind CSS + Custom CSS 하이브리드
  - 블랙/화이트 교차 테마
  - 완전 반응형 디자인
  - Pretendard 폰트 적용
  - 모듈화된 CSS 구조

### 버전 히스토리 & 로드맵
- **001**: 초기 버전 (2025.08.05)
  - HTML5 + Tailwind CSS
  - 9개 섹션 구성
  - 배경 비디오 적용
  - 모바일 반응형 지원
  - 현재 성능 점수: ~60/100

- **002 (계획중)**: 성능 최적화 버전
  - 목표 성능 점수: 95+/100
  - Webpack 번들링 시스템
  - 코드 스플리팅 & 트리셰이킹
  - 이미지/비디오 최적화

## 🔧 개발 환경 설정

### 1. 간편 실행 (권장)
```bash
# 배치 파일 실행
C:\project\bluerobot\open-browser.bat
```

### 2. 수동 실행
```bash
# 001 폴더로 이동
cd C:\project\bluerobot\001

# Python 서버
python -m http.server 8000

# 또는 NPM
npm run serve
```

### 3. 웹사이트 접속
```
http://localhost:8000
```

## 📂 폴더별 설명

### `/001/` - 웹사이트 버전 1
현재 운영 중인 웹사이트 소스코드
- **기술 스택**: HTML5, Tailwind CSS, Vanilla JS
- **특징**: 9개 섹션, 블랙/화이트 테마, 반응형
- **상태**: ✅ 완성

### `/assets/` - 공통 리소스
모든 버전에서 공유하는 리소스 파일들
- **logo/**: 회사 로고, 제품 로고
- **video/**: Hero 섹션 배경 비디오 (4.2MB)
- **용도**: 여러 버전에서 재사용

### `/docs/` - 프로젝트 문서
프로젝트 관련 문서 및 계획
- **optimization-plan.md**: 성능 최적화 상세 계획

## 🎯 주요 특징

### 웹사이트 (001 버전)
✅ **현대적 디자인**: 블랙/화이트 교차 테마  
✅ **반응형**: 모바일, 태블릿, 데스크톱 지원  
✅ **모듈화**: CSS 파일 기능별 분리  
✅ **SEO 친화적**: 시맨틱 HTML, 메타 태그  
✅ **접근성**: WCAG 가이드라인 준수  

### 성능 개선 목표 (002 버전)
🎯 **Lighthouse 점수**: 90+ 목표  
🎯 **FCP**: < 1.8초  
🎯 **LCP**: < 2.5초  
🎯 **번들 크기**: < 200KB (gzipped)  
🎯 **트리셰이킹**: 40% 크기 감소  

## 📱 웹사이트 섹션 구성

1. **#introduction** (다크) - Hero 섹션 + 비디오
2. **#problem-solution** (라이트) - 문제점과 해결책
3. **#core-features** (다크) - 6가지 핵심 기능
4. **#live-demo** (라이트) - 실시간 시연 데모
5. **#applications** (다크) - 4가지 적용 분야
6. **#roadmap** (라이트) - 기술 로드맵
7. **#future-solutions** (라이트) - 향후 방향
8. **#company-vision** (다크) - 회사 비전
9. **#contact** (다크) - nTop 스타일 Footer

## 🌈 디자인 시스템

### 컬러 팔레트
```css
Primary: #2563EB      /* 메인 CTA */
Accent: #38BDF8       /* 강조, 링크 */
Dark: #0F172A         /* 다크 배경 */
Light: #F8FAFC        /* 라이트 배경 */
```

### 타이포그래피
- **Primary Font**: Pretendard
- **Font Weights**: 300, 400, 500, 600, 700, 800
- **Hero Title**: 64px (lg) / 48px (md) / 36px (sm)

## 📞 연락처

- **이메일**: ces@bluerobot.co.kr
- **기술 문의**: 웹사이트 Contact 섹션 이용

## 📄 라이선스

© 2025 BlueRobot. All rights reserved.

---

**프로젝트 시작**: 2025년 8월 5일  
**최종 업데이트**: 2025년 1월 22일  
**관리자**: BlueRobot 개발팀