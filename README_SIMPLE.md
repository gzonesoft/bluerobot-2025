# 🚀 BalanceStage QuadAlign X - 실용적 최적화 가이드

## Executive Summary

**프로젝트 규모**: 단일 랜딩페이지 (HTML 1개, CSS 6개, JS 1개)
**현재 성능**: Lighthouse Score ~60/100
**목표 성능**: 90+/100 (실용적 최적화만으로 달성 가능)
**예상 작업 시간**: 2-3일

### 🎯 핵심 문제점 (실제로 해결해야 할 것만)
1. **CSS 비효율**: 120KB 중 60% 미사용 → PurgeCSS로 해결
2. **비디오 블로킹**: 4.2MB 즉시 로드 → Lazy loading + Poster
3. **렌더 블로킹**: 모든 CSS 동기 로드 → Critical CSS 인라인
4. **이미지 최적화 안됨**: PNG 1.2MB → WebP 변환
5. **미니파이 안됨**: Raw CSS/JS → 압축 필요

---

## 📋 실제 필요한 작업만 (오버엔지니어링 제거)

### ✅ MUST DO (즉각 효과)

#### 1. CSS 최적화 (1시간)
```bash
# PurgeCSS로 미사용 CSS 제거
npm install -D purgecss
npx purgecss --css css/*.css --content index.html --output dist/css/

# 결과: 120KB → 50KB (58% 감소)
```

#### 2. Critical CSS 인라인 (30분)
```html
<!-- Hero 섹션에 필요한 CSS만 <head>에 인라인 -->
<style>
  /* base.css에서 추출한 critical 부분만 (약 3KB) */
  body { margin: 0; font-family: 'Pretendard', sans-serif; }
  .hero { height: 100vh; position: relative; }
  .hero-title { font-size: 4rem; color: white; }
  /* ... 핵심 스타일만 ... */
</style>

<!-- 나머지 CSS는 async 로드 -->
<link rel="preload" href="css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```
#### 3. 비디오 최적화 (30분)
```html
<!-- 현재: 즉시 로드 -->
<video autoplay muted loop>
  <source src="video/Herosection.mp4">
</video>

<!-- 개선: Poster + Lazy Load -->
<video 
  poster="images/hero-poster.webp"  <!-- 첫 프레임 WebP 40KB -->
  autoplay muted loop playsinline
  preload="metadata">  <!-- 메타데이터만 먼저 -->
  <source src="video/Herosection.mp4">
</video>

<script>
// 2초 후 비디오 로드 시작
setTimeout(() => {
  const video = document.querySelector('video');
  video.src = video.querySelector('source').src;
  video.load();
}, 2000);
</script>
```

#### 4. 이미지 WebP 변환 (30분)
```bash
# 온라인 도구 사용 (squoosh.app) 또는
npm install -g webp-converter
cwebp logo/Bluerobot_CI.png -o logo/Bluerobot_CI.webp -q 80

# HTML 수정
<picture>
  <source srcset="logo/Bluerobot_CI.webp" type="image/webp">
  <img src="logo/Bluerobot_CI.png" alt="BlueRobot">
</picture>
```
#### 5. JS/CSS 미니파이 (30분)
```bash
# 간단한 미니파이 도구
npm install -D terser cssnano-cli

# JS 압축
npx terser js/main.js -o dist/js/main.min.js -c -m

# CSS 압축
npx cssnano css/main.css dist/css/main.min.css

# 또는 온라인 도구 사용
# - CSS: cssnano.co/playground
# - JS: jscompress.com
```

### ⚡ QUICK WINS (추가 30분)

#### 폰트 최적화
```css
/* 한글 서브셋 + display:swap */
@font-face {
  font-family: 'Pretendard';
  src: url('fonts/Pretendard-subset.woff2') format('woff2');
  font-display: swap; /* FOUT 허용으로 빠른 렌더링 */
  unicode-range: U+AC00-D7AF, U+0020-007E; /* 한글+영문만 */
}
```

#### 간단한 Lazy Loading
```javascript
// Intersection Observer로 섹션별 lazy load
const lazyElements = document.querySelectorAll('[data-lazy]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('loaded');
      observer.unobserve(entry.target);
    }
  });
});
lazyElements.forEach(el => observer.observe(el));
```
---

## 🚫 불필요한 작업들 (하지 말 것)

### 오버엔지니어링 제거 목록
```
❌ Component 기반 리팩토링 - 단일 페이지에 불필요
❌ State Management (Redux/MobX) - 상태가 거의 없음
❌ Service Worker - 오프라인 지원 불필요
❌ PWA 변환 - 앱 기능 불필요
❌ 복잡한 Build Pipeline - Webpack 설정 지옥 피하기
❌ Unit/E2E Testing - 비즈니스 로직 없음
❌ CI/CD 구축 - 수동 배포로 충분
❌ TypeScript 변환 - 15KB JS에 과도함
❌ Virtual DOM - DOM 조작 최소
❌ Code Splitting - 코드량 적음
❌ Module Federation - 단일 앱
❌ Micro-frontends - 완전 과도함
```

---

## 🛠️ 간단한 빌드 설정 (선택사항)

### Option 1: Vite (가장 간단)
```bash
# Vite로 간단히 번들링 + 최적화
npm create vite@latest bluerobot-optimized -- --template vanilla
cp -r 001/* bluerobot-optimized/
cd bluerobot-optimized
npm install
npm run build

# 자동으로 처리되는 것들:
# ✅ 미니파이
# ✅ Tree shaking
# ✅ CSS 최적화
# ✅ Asset 해싱
```
### Option 2: 수동 최적화 (빌드 도구 없이)
```bash
# 1. 폴더 구조 정리
mkdir -p dist/{css,js,images,video}

# 2. CSS 합치기 + 압축
cat css/*.css > dist/css/combined.css
npx cssnano dist/css/combined.css dist/css/main.min.css

# 3. JS 압축
npx terser js/main.js -o dist/js/main.min.js

# 4. HTML 수정
# - dist/ 경로로 변경
# - .min 파일 참조
# - Critical CSS 인라인

# 5. 이미지 최적화
# squoosh.app에서 수동 변환

# 6. 서빙
python -m http.server 8000 --directory dist
```

---

## 📊 측정 가능한 목표 (현실적)

### Before (현재)
```
- HTML: 12KB
- CSS: 120KB (6개 파일)
- JS: 15KB
- Images: 1.2MB (PNG)
- Video: 4.2MB (즉시 로드)
- Font: 340KB
총: ~5.9MB, 15+ requests
```

### After (최적화 후)
```
- HTML: 15KB (Critical CSS 포함)
- CSS: 40KB (PurgeCSS 적용, 1개 파일)
- JS: 8KB (미니파이)
- Images: 400KB (WebP)
- Video: 4.2MB (Lazy, 2초 지연)
- Font: 120KB (서브셋)
총: ~600KB 초기 로드, 5 requests
```
---

## ⚡ 2시간 최적화 실행 계획

### Step 1: 측정 (10분)
```bash
# 현재 성능 기준점
npx lighthouse http://localhost:8000 --output json > before.json
```

### Step 2: CSS 최적화 (30분)
```bash
# PurgeCSS 실행
npx purgecss --css css/*.css --content index.html --output dist/css/
# Critical CSS 추출 (수동으로 hero 부분만)
# 나머지 CSS 합치기
```

### Step 3: 비디오/이미지 (30분)
```bash
# Poster 이미지 생성 (비디오 첫 프레임)
ffmpeg -i video/Herosection.mp4 -vframes 1 images/hero-poster.jpg
cwebp images/hero-poster.jpg -o images/hero-poster.webp -q 80

# 로고 WebP 변환
cwebp logo/Bluerobot_CI.png -o logo/Bluerobot_CI.webp
```

### Step 4: 미니파이 (20분)
```bash
npx terser js/main.js -o dist/js/main.min.js -c -m
npx cssnano dist/css/main.css dist/css/main.min.css
```

### Step 5: HTML 수정 (30분)
- Critical CSS 인라인
- 경로 수정 (dist/)
- Lazy loading 스크립트 추가
- WebP picture 태그

### Step 6: 측정 (10분)
```bash
# 최적화 후 성능
npx lighthouse http://localhost:8000/dist --output json > after.json
```
---

## 🎯 핵심 체크리스트

### 즉시 실행 (필수)
```
□ PurgeCSS로 미사용 CSS 제거 (120KB → 50KB)
□ Critical CSS 인라인 (3KB)
□ 비디오 Poster 이미지 추가
□ 비디오 Lazy Loading (2초 지연)
□ 이미지 WebP 변환
□ CSS/JS 미니파이
```

### 시간 있으면 (선택)
```
□ 폰트 서브셋팅
□ Vite로 간단 번들링
□ gzip 압축 활성화
```

### 하지 말 것
```
✗ Component 아키텍처 변경
✗ 복잡한 State Management
✗ Service Worker
✗ 과도한 코드 분할
✗ 불필요한 테스팅
```

---

## 💡 실용적 팁

1. **가장 큰 효과**: PurgeCSS + Critical CSS = 50% 개선
2. **비디오 처리**: Poster만 추가해도 FCP 1초 단축
3. **이미지**: WebP는 squoosh.app에서 5분이면 변환
4. **폰트**: Google Fonts의 &text= 파라미터로 필요한 글자만
5. **측정**: Lighthouse만으로 충분, 복잡한 RUM 불필요

---

## 📝 Devin을 위한 한 줄 요약

**"PurgeCSS 돌리고, Critical CSS 인라인하고, 비디오에 poster 넣고, WebP 변환하면 끝"**

---

**문서 버전**: 2.0 (Simple & Practical)
**예상 작업 시간**: 2-3시간
**예상 성능 개선**: 60 → 90+ (Lighthouse Score)

END OF DOCUMENT