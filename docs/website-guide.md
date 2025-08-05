# BalanceStage QuadAlign X Website

블루로봇(BlueRobot)의 BalanceStage QuadAlign X 제품을 위한 공식 웹사이트입니다.

## 🚀 프로젝트 개요

- **제품명**: BalanceStage QuadAlign X
- **회사명**: 블루로봇(BlueRobot)
- **주요 기술**: 4축 통합 제어 정렬 플랫폼 (X, Y, Pitch, Roll)

## 📁 프로젝트 구조

```
C:\project\bluerobot\website\
├── index.html              # 메인 HTML 파일
├── css/                     # 스타일시트 폴더
│   ├── base.css            # 기본 스타일 (리셋, 헤더, 공통)
│   ├── hero.css            # Hero 섹션 스타일
│   ├── buttons.css         # 버튼 스타일
│   ├── sections.css        # 주요 섹션 스타일
│   ├── future.css          # Future Solutions 섹션
│   └── footer.css          # 푸터 및 Contact 섹션
├── js/                      # JavaScript 폴더
│   └── main.js             # 메인 JavaScript 파일
├── assets/                  # 리소스 폴더
│   ├── logo/               # 로고 이미지
│   │   ├── Bluerobot_CI.png
│   │   └── Balancestage_BI.png
│   └── video/              # 비디오 파일
│       └── Herosection.mp4
└── README.md               # 프로젝트 문서
```

## 🎨 기술 스택

- **HTML5**: 시맨틱 마크업
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **Custom CSS**: 커스텀 스타일 컴포넌트
- **Vanilla JavaScript**: 인터랙션 및 기능
- **Pretendard Font**: 한글 웹폰트

## 🎯 주요 특징

### 디자인
✅ **블랙/화이트 교차 테마**: 섹션별 명확한 구분  
✅ **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원  
✅ **Pretendard 폰트**: 한글 최적화 타이포그래피  
✅ **섹션 네비게이션**: 각 섹션 좌상단 ID 표시  

### 기능
✅ **배경 비디오**: Hero 섹션 자동 재생 비디오  
✅ **스무스 스크롤**: 부드러운 네비게이션  
✅ **호버 효과**: 인터랙티브 카드 애니메이션  
✅ **성능 최적화**: 비디오 재생 최적화  

## 🌈 컬러 팔레트

```css
Primary: #2563EB      /* 메인 CTA, 포인트 */
Secondary: #DBEAFE    /* 보조 배경 */
Accent: #38BDF8       /* 호버, 강조 */
Dark: #0F172A         /* 다크 배경 */
Dark Light: #1E293B   /* 다크 카드 */
Text Main: #0F172A    /* 메인 텍스트 */
Text Sub: #64748B     /* 서브 텍스트 */
Text Light: #94A3B8   /* 라이트 텍스트 */
```

## 📱 섹션 구성

1. **#introduction** (다크) - Hero 섹션
2. **#problem-solution** (라이트) - 문제점과 해결책
3. **#core-features** (다크) - 6가지 핵심 기능
4. **#live-demo** (라이트) - 실시간 시연 데모
5. **#applications** (다크) - 4가지 적용 분야
6. **#future-solutions** (라이트) - 향후 방향 (레시피 앱)
7. **#roadmap** (라이트) - 기술 진화 방향
8. **#company-vision** (다크) - 회사 소개 및 비전
9. **#contact** (라이트) - 연락처 및 자료 요청

## 🚀 빠른 시작

### 1. 웹 브라우저에서 열기
```bash
# 파일 탐색기에서 index.html 더블클릭
# 또는 브라우저에서 파일 경로 직접 입력
file:///C:/project/bluerobot/website/index.html
```

### 2. 로컬 서버 실행 (권장)
```bash
# Python 3가 설치되어 있는 경우
cd C:\project\bluerobot\website
python -m http.server 8000

# Node.js가 설치되어 있는 경우
npx serve .
```

### 3. Live Server 확장 (VSCode)
- VSCode에서 프로젝트 폴더 열기
- Live Server 확장 설치
- index.html 우클릭 → "Open with Live Server"

## 📝 개발 가이드

### CSS 구조
- **base.css**: 전역 스타일, 헤더, 공통 컴포넌트
- **hero.css**: Hero 섹션 전용 스타일
- **buttons.css**: 버튼 컴포넌트 스타일
- **sections.css**: 주요 섹션들의 스타일
- **future.css**: Future Solutions 섹션 전용
- **footer.css**: 푸터 및 Contact 섹션

### Tailwind CSS 커스텀 설정
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#2563EB',
                secondary: '#DBEAFE',
                accent: '#38BDF8',
                dark: '#0F172A',
                'text-main': '#0F172A',
                'text-sub': '#64748B'
            }
        }
    }
}
```

### JavaScript 기능
- **스무스 스크롤**: 네비게이션 링크 클릭 시
- **비디오 최적화**: Intersection Observer 사용
- **데모 인터랙션**: 플레이스홀더 클릭 이벤트

## 🔧 커스터마이징

### 색상 변경
1. `index.html`의 Tailwind 설정에서 색상 수정
2. CSS 파일들의 색상 변수 업데이트

### 콘텐츠 수정
1. `index.html`에서 텍스트 내용 직접 수정
2. 이미지는 `assets/` 폴더에서 교체

### 새로운 섹션 추가
1. HTML에 새 섹션 마크업 추가
2. 해당 CSS 파일에 스타일 정의
3. 네비게이션 메뉴에 링크 추가

## 📱 반응형 브레이크포인트

```css
/* Tailwind CSS 기본 브레이크포인트 */
sm: 640px   /* 모바일 가로 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 소형 데스크톱 */
xl: 1280px  /* 대형 데스크톱 */
2xl: 1536px /* 초대형 화면 */
```

## 🌐 브라우저 지원

- **Chrome**: 80+ ✅
- **Firefox**: 75+ ✅
- **Safari**: 13+ ✅
- **Edge**: 80+ ✅
- **IE**: 지원하지 않음 ❌

## 📞 연락처

- **이메일**: ces@bluerobot.co.kr
- **기술 문의**: 웹사이트 Contact 섹션 이용

## 📄 라이선스

© 2025 BlueRobot. All rights reserved.

---

**개발 완료일**: 2025년 8월 5일  
**버전**: 2.0 (구조화 및 Tailwind 적용)  
**개발**: Claude (Anthropic)
