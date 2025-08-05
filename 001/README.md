# BalanceStage QuadAlign X Website - Version 001

이 폴더는 BalanceStage QuadAlign X 웹사이트의 첫 번째 버전입니다.

## 🚀 빠른 시작

### 1. 웹 브라우저에서 열기
```bash
# index.html 파일을 더블클릭하거나
file:///C:/project/bluerobot/001/index.html
```

### 2. 로컬 서버 실행 (권장)
```bash
cd C:\project\bluerobot\001
python -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

### 3. NPM 스크립트 사용
```bash
npm run serve    # serve 패키지로 실행
npm run dev      # live-server로 실행
```

## 📁 파일 구조

```
001/
├── index.html          # 메인 HTML 파일
├── css/               # 스타일시트 폴더
│   ├── base.css      # 기본 스타일
│   ├── hero.css      # Hero 섹션
│   ├── buttons.css   # 버튼 컴포넌트
│   ├── sections.css  # 주요 섹션들
│   ├── future.css    # Future Solutions
│   └── footer.css    # Footer & Contact
├── js/               # JavaScript 폴더
│   └── main.js       # 메인 스크립트
├── package.json      # NPM 설정
└── .gitignore        # Git 무시 파일
```

## 🎨 기술 스택

- **HTML5**: 시맨틱 마크업
- **Tailwind CSS**: 유틸리티 CSS 프레임워크
- **Custom CSS**: 컴포넌트별 전용 스타일
- **Vanilla JavaScript**: 순수 자바스크립트
- **Pretendard Font**: 한글 웹폰트

## 📱 주요 특징

✅ **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원  
✅ **블랙/화이트 테마**: 섹션별 교차 적용  
✅ **모듈화된 CSS**: 유지보수 용이  
✅ **성능 최적화**: 비디오, 이미지 최적화  
✅ **접근성**: WCAG 가이드라인 준수  

## 🎯 섹션 구성

1. **Hero** (#introduction) - 다크 테마
2. **Problem & Solution** (#problem-solution) - 라이트 테마
3. **Core Features** (#core-features) - 다크 테마
4. **Live Demo** (#live-demo) - 라이트 테마
5. **Applications** (#applications) - 다크 테마
6. **Future Solutions** (#future-solutions) - 라이트 테마
7. **Roadmap** (#roadmap) - 라이트 테마
8. **Company Vision** (#company-vision) - 다크 테마
9. **Contact** (#contact) - 라이트 테마

## 🔗 경로 설정

### Asset 경로
- 로고: `../assets/logo/`
- 비디오: `../assets/video/`
- 이미지: `../assets/images/`

### CSS 경로
- 상대 경로: `css/`
- CDN: Tailwind CSS

### JavaScript 경로
- 상대 경로: `js/`

## 📞 문의

- **이메일**: ces@bluerobot.co.kr
- **프로젝트 문서**: `../docs/`
- **에셋 폴더**: `../assets/`

---

**버전**: 001  
**생성일**: 2025년 8월 5일  
**상태**: ✅ 완성
