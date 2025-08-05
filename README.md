# BalanceStage QuadAlign X 프로젝트

블루로봇(BlueRobot)의 BalanceStage QuadAlign X 제품 관련 프로젝트 통합 저장소입니다.

## 📁 프로젝트 구조

```
C:\project\bluerobot\
├── 📁 001/                    # 웹사이트 버전 1 (현재 버전)
│   ├── index.html             # 메인 HTML 파일
│   ├── css/                   # 스타일시트 폴더
│   ├── js/                    # JavaScript 폴더
│   ├── package.json           # NPM 설정
│   └── .gitignore             # Git 무시 파일
├── 📁 assets/                 # 공통 리소스 폴더
│   ├── logo/                  # 로고 이미지
│   │   ├── Bluerobot_CI.png
│   │   └── Balancestage_BI.png
│   └── video/                 # 비디오 파일
│       └── Herosection.mp4
├── 📁 docs/                   # 문서 폴더
│   ├── content-guide.md       # 콘텐츠 가이드라인
│   ├── website-guide.md       # 웹사이트 개발 가이드
│   └── design-system.md       # 디자인 시스템 문서
├── 📄 README.md              # 프로젝트 메인 문서
└── 📄 project-info.md        # 프로젝트 정보 및 히스토리
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

### 버전 히스토리
- **001**: 초기 버전 (2025.08.05)
  - HTML5 + Tailwind CSS
  - 8개 섹션 구성
  - 배경 비디오 적용
  - 모바일 반응형 지원

## 🔧 개발 환경 설정

### 1. 웹사이트 실행
```bash
# 001 폴더로 이동
cd C:\project\bluerobot\001

# 로컬 서버 실행
python -m http.server 8000
# 또는
npm run serve
```

### 2. 웹사이트 접속
```
http://localhost:8000
```

## 📂 폴더별 설명

### `/001/` - 웹사이트 버전 1
현재 운영 중인 웹사이트 소스코드
- **기술 스택**: HTML5, Tailwind CSS, Vanilla JS
- **특징**: 8개 섹션, 블랙/화이트 테마, 반응형
- **상태**: ✅ 완성

### `/assets/` - 공통 리소스
모든 버전에서 공유하는 리소스 파일들
- **logo/**: 회사 로고, 제품 로고
- **video/**: Hero 섹션 배경 비디오
- **용도**: 여러 버전에서 재사용

### `/docs/` - 프로젝트 문서
프로젝트 관련 모든 문서 및 가이드라인
- **content-guide.md**: 콘텐츠 작성 가이드
- **website-guide.md**: 웹사이트 개발 가이드
- **design-system.md**: 디자인 시스템 문서

## 🎯 주요 특징

### 웹사이트 (001 버전)
✅ **현대적 디자인**: 블랙/화이트 교차 테마  
✅ **반응형**: 모바일, 태블릿, 데스크톱 지원  
✅ **성능 최적화**: 비디오, 이미지 최적화  
✅ **SEO 친화적**: 시맨틱 HTML, 메타 태그  
✅ **접근성**: WCAG 가이드라인 준수  

### 프로젝트 관리
✅ **버전 관리**: 폴더 기반 버전 시스템  
✅ **모듈화**: CSS, JS 파일 분리  
✅ **문서화**: 상세한 가이드 및 README  
✅ **재사용성**: 공통 assets 분리  

## 📱 웹사이트 섹션 구성

1. **#introduction** (다크) - Hero 섹션
2. **#problem-solution** (라이트) - 문제점과 해결책
3. **#core-features** (다크) - 6가지 핵심 기능
4. **#live-demo** (라이트) - 실시간 시연 데모
5. **#applications** (다크) - 4가지 적용 분야
6. **#future-solutions** (라이트) - 향후 방향 (레시피 앱)
7. **#roadmap** (라이트) - 기술 진화 방향
8. **#company-vision** (다크) - 회사 소개 및 비전
9. **#contact** (라이트) - 연락처 및 자료 요청

## 🌈 디자인 시스템

### 컬러 팔레트
```css
Primary: #2563EB      /* 메인 CTA, 포인트 */
Secondary: #DBEAFE    /* 보조 배경 */
Accent: #38BDF8       /* 호버, 강조 */
Dark: #0F172A         /* 다크 배경 */
Text Main: #0F172A    /* 메인 텍스트 */
Text Sub: #64748B     /* 서브 텍스트 */
Text Light: #94A3B8   /* 라이트 텍스트 */
```

### 타이포그래피
- **Primary Font**: Pretendard (한글 최적화)
- **Fallback**: system-ui, sans-serif
- **Weight**: 300 (Light), 500 (Medium), 700 (Bold)

## 📞 연락처

- **이메일**: ces@bluerobot.co.kr
- **기술 문의**: 웹사이트 Contact 섹션 이용

## 📄 라이선스

© 2025 BlueRobot. All rights reserved.

---

**프로젝트 시작**: 2025년 8월 5일  
**최종 업데이트**: 2025년 8월 5일  
**관리자**: BlueRobot 개발팀
