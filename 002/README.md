# BalanceStage QuadAlign X - 관리자 프로그램

> 세계 최초 4축 통합 정렬 플랫폼의 통합 관리 시스템

## 📋 프로젝트 개요

BalanceStage QuadAlign X 관리자 프로그램은 제품 랜딩페이지 관리, 리드 관리, 커뮤니티 운영, 데이터 분석을 위한 중앙 집중식 허브입니다.

### 🎯 주요 기능

- **📊 대시보드**: 핵심 지표 및 실시간 모니터링
- **🌐 랜딩페이지 관리**: 콘텐츠 편집, A/B 테스트, SEO 설정
- **👥 리드 관리**: 잠재 고객 정보, 문의 처리, CRM 연동
- **🏘️ 커뮤니티 관리**: 사용자, 콘텐츠, 멘토링 관리
- **📈 데이터 분석**: 트래픽, 전환율, 사용자 활동 리포트
- **⚙️ 시스템 설정**: 계정 관리, 보안, 외부 서비스 연동

## 🚀 빠른 시작

### 1. 가장 간단한 방법
```bash
# 프로젝트 루트에서
C:\project\bluerobot\open-browser-admin.bat
```

### 2. 수동 실행
```bash
cd C:\project\bluerobot\002
python -m http.server 8001
# 브라우저: http://localhost:8001
```

### 3. NPM 스크립트
```bash
cd C:\project\bluerobot\002
npm run start
# 또는
npm run dev  # 라이브 리로드 포함
```
## 📂 프로젝트 구조

```
002/
├── 📄 index.html              # 관리자 로그인 페이지
├── 📄 dashboard.html          # 메인 대시보드
├── 📁 css/                    # 모듈화된 스타일시트
│   ├── base.css              # 기본 스타일, 변수, 유틸리티
│   ├── auth.css              # 로그인/인증 페이지
│   ├── dashboard.css         # 대시보드 메인
│   ├── sidebar.css           # 사이드바 네비게이션
│   ├── components.css        # 공통 컴포넌트
│   ├── pages.css             # 각 페이지별 스타일
│   └── responsive.css        # 반응형 디자인
├── 📁 js/                     # JavaScript 모듈
│   ├── main.js               # 기본 유틸리티
│   ├── auth.js               # 인증 로직
│   ├── dashboard.js          # 대시보드 기능
│   ├── api.js                # API 통신
│   └── components.js         # 재사용 컴포넌트
├── 📁 pages/                  # 주요 기능 페이지
│   ├── landing-management.html
│   ├── leads-management.html
│   ├── community-management.html
│   ├── analytics.html
│   └── settings.html
├── 📁 assets/                 # 공통 리소스 (001과 공유)
└── 📄 package.json            # NPM 설정
```

## 👥 대상 사용자

- **마케팅 담당자**: 랜딩페이지 콘텐츠 관리, A/B 테스트
- **영업 담당자**: 리드 관리, 문의 응대
- **운영 담당자**: 커뮤니티 관리, 플랫폼 정책
- **기술지원 담당자**: 챌린지 관리, 멘토링 매칭
- **데이터 분석가**: 리포트 생성 및 분석
- **시스템 관리자**: 계정 관리, 보안 설정

## 🔧 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **UI Framework**: Bootstrap 5 + Custom Components
- **Charts**: Chart.js for 데이터 시각화
- **Icons**: Font Awesome 6
- **향후 계획**: React/Vue.js 마이그레이션 고려

## 📊 측정 지표 (KPIs)

### 관리자 사용성
- 관리자 프로그램 활성 사용자 수
- 주요 기능 사용 빈도
- 리드 처리 시간 단축률

### 시스템 성능
- 대시보드 로딩 시간
- API 응답 속도
- 시스템 다운타임 최소화

### 보안 성과
- 보안 취약점 조치율
- 비정상 접근 차단율
- 2FA 활성화율

## 🛠️ 개발 가이드

### 스타일 가이드
- CSS 변수 활용으로 일관된 디자인 시스템
- BEM 방법론 적용
- 모바일 우선 반응형 디자인

### 컴포넌트 구조
- 재사용 가능한 모듈형 컴포넌트
- 명확한 네이밍 컨벤션
- 접근성 가이드라인 준수

## 📈 로드맵

### Phase 1 (현재)
- 기본 관리자 패널 구축
- 핵심 기능 구현

### Phase 2
- AI 기반 자동화 기능
- 모바일 관리자 앱

### Phase 3
- IoT 데이터 통합
- 고급 분석 도구

---

**버전**: 1.0.0  
**최종 업데이트**: 2025년 8월  
**담당자**: BlueRobot 개발팀  
**문의**: admin@bluerobot.co.kr