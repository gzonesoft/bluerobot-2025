# 🚀 BalanceStage 최적화 실행 지침서

## ⚠️ DEVIN 필수 행동 규칙 ⚠️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 🔴 절대 스스로 하지 말아야 할 것들:
```
❌ 파일 삭제 - 사용자 확인 필수
❌ 원본 폴더(001, assets) 수정 - 사용자 확인 필수
❌ 패키지 전역 설치(npm install -g) - 사용자 확인 필수
❌ 시스템 설정 변경 - 사용자 확인 필수
❌ Git commit/push - 사용자 확인 필수
❌ 외부 API 호출 - 사용자 확인 필수
❌ 10MB 이상 파일 생성 - 사용자 확인 필수
```

### 🟡 모든 행동 전 사용자 확인 필요:
```
⚡ 각 STEP 시작 전: "STEP X를 시작해도 될까요?"
⚡ 파일 수정 전: "XXX 파일을 수정합니다. 진행할까요?"
⚡ 명령어 실행 전: "XXX 명령을 실행합니다. 괜찮으신가요?"
⚡ 에러 발생 시: "에러가 발생했습니다. 어떻게 진행할까요?"
```

### 🟢 예외: 스스로 진행해도 되는 것들:
```
✅ dist 폴더 내 파일 생성/수정 (자유롭게)
✅ 읽기 전용 작업 (파일 읽기, 크기 확인)
✅ 콘솔 로그 출력
✅ 임시 변수/파일명 생성
✅ 구문 오류 수정 (즉시 수정)
✅ 경로 자동 보정 (\ → /, 상대→절대)
```

### 🔵 작업 후 대기 규칙:
```
⏸️ 각 STEP 완료 후: "STEP X 완료. 결과를 확인하고 다음 단계 진행 여부를 알려주세요."
⏸️ 서버 실행 후: "서버가 실행 중입니다. 브라우저에서 확인 후 알려주세요."
⏸️ 빌드 완료 후: "빌드 완료. dist 폴더를 확인하고 계속 진행할지 알려주세요."
⏸️ 최종 측정 후: "최적화 완료. 성능 지표를 확인하고 추가 작업이 필요한지 알려주세요."
```

### 📝 상태 보고 형식:
```
[진행 중] STEP X - 작업명
[완료] ✅ 작업 성공 - 결과 요약
[대기] ⏸️ 사용자 확인 필요 - 이유
[오류] ❌ 문제 발생 - 에러 내용
```

---
## 📋 사전 체크리스트
```
✓ 현재 위치: C:\project\bluerobot
✓ Python 설치 확인: python --version
✓ Node.js 설치 확인: node --version
✓ 백업 폴더 생성: mkdir backup && xcopy 001 backup\001 /E /I
```

---

## [STEP 0] 초기 성능 측정
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 현재 위치: `C:\project\bluerobot`
⏱️ 예상 시간: 5분
✅ 목표: 현재 성능 기준점 측정

```bash
# 서버 실행
cd C:\project\bluerobot\001
start python -m http.server 8000

# 새 터미널에서 Lighthouse 실행
cd C:\project\bluerobot
npm install -g lighthouse
lighthouse http://localhost:8000 --output json --output-path before.json
lighthouse http://localhost:8000 --output html --output-path before.html

# 결과 확인
echo "Baseline measured. Check before.html"
```

**체크포인트**: before.json 파일 생성 확인
⏸️ **대기**: "STEP 0 완료. 초기 측정 결과를 확인했습니다. STEP 1을 진행할까요?"

---

## [STEP 1] 프로젝트 구조 준비
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 현재 위치: `C:\project\bluerobot`
⏱️ 예상 시간: 3분
✅ 목표: 최적화 작업용 폴더 구조 생성

```bash
# dist 폴더 구조 생성
cd C:\project\bluerobot
mkdir -p dist\css dist\js dist\images dist\video dist\fonts

# 원본 파일 복사 (일단 그대로)
xcopy 001\*.html dist\ /Y
xcopy assets\logo\*.png dist\images\ /Y
xcopy assets\video\*.mp4 dist\video\ /Y

# 작업 폴더 확인
dir dist /s
```

**체크포인트**: dist 폴더 구조 완성
⏸️ **대기**: "STEP 1 완료. dist 폴더가 생성되었습니다. STEP 2를 진행할까요?"
---

## [STEP 2] PurgeCSS - 미사용 CSS 제거
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 현재 위치: `C:\project\bluerobot`
⏱️ 예상 시간: 10분
✅ 목표: 120KB CSS → 50KB로 감소

```bash
# PurgeCSS 설치 및 실행
cd C:\project\bluerobot
npm init -y
npm install -D purgecss

# PurgeCSS 설정 파일 생성
echo module.exports = { content: ['001/*.html'], css: ['001/css/*.css'], output: 'dist/css/', safelist: ['active', 'loaded', 'playing'] } > purgecss.config.js

# PurgeCSS 실행
npx purgecss --config purgecss.config.js

# 크기 비교
echo "Original CSS:"
dir 001\css\*.css
echo "Optimized CSS:"
dir dist\css\*.css
```

**체크포인트**: dist/css 폴더에 정제된 CSS 파일 생성
⏸️ **대기**: "STEP 2 완료. CSS가 최적화되었습니다. 크기를 확인하고 STEP 3을 진행할까요?"

---

## [STEP 3] CSS 합치기 및 미니파이
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 현재 위치: `C:\project\bluerobot`
⏱️ 예상 시간: 5분
✅ 목표: 6개 CSS 파일 → 1개 압축 파일

```bash
# CSS 파일 합치기
cd C:\project\bluerobot\dist\css
type base.css hero.css buttons.css sections.css future.css footer.css > combined.css

# cssnano로 압축
cd C:\project\bluerobot
npm install -D cssnano-cli
npx cssnano dist\css\combined.css dist\css\main.min.css

# 개별 파일 삭제 (combined 제외)
del dist\css\base.css dist\css\hero.css dist\css\buttons.css dist\css\sections.css dist\css\future.css dist\css\footer.css

# 결과 확인
dir dist\css\
```

**체크포인트**: main.min.css 파일 생성 (약 40-50KB)
⏸️ **대기**: "STEP 3 완료. CSS 병합 및 압축 완료. STEP 4를 진행할까요?"
---

## [STEP 4] Critical CSS 추출 및 인라인
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 현재 위치: `C:\project\bluerobot`
⏱️ 예상 시간: 10분
✅ 목표: Hero 섹션 Critical CSS를 HTML head에 인라인

**파일 생성**: `dist\critical.css`
```css
/* Critical CSS - Hero Section Only */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Pretendard', -apple-system, sans-serif; overflow-x: hidden; }
.header { position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(0,0,0,0.9); padding: 1rem 2rem; }
.header-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.logo { height: 40px; }
.nav-menu { display: flex; gap: 2rem; list-style: none; }
.nav-menu a { color: white; text-decoration: none; }
.hero-section { position: relative; height: 100vh; overflow: hidden; background: #000; }
.hero-video { position: absolute; width: 100%; height: 100%; object-fit: cover; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)); }
.hero-content { position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: white; padding: 2rem; }
.hero-title { font-size: clamp(2rem, 5vw, 4rem); font-weight: 800; margin-bottom: 1.5rem; }
.hero-subtitle { font-size: clamp(1rem, 2vw, 1.5rem); margin-bottom: 2rem; opacity: 0.9; max-width: 800px; }
.hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
.btn-primary { background: #2563EB; color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s; }
.btn-secondary { background: transparent; color: white; border: 2px solid white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s; }
```

```bash
# Critical CSS를 별도 파일로 저장
# 위 내용을 dist\critical.css에 저장

# 크기 확인
dir dist\critical.css
```

**체크포인트**: critical.css 생성 (약 2-3KB)
⏸️ **대기**: "STEP 4 완료. Critical CSS 파일이 생성되었습니다. STEP 5를 진행할까요?"
---

## [STEP 5] JavaScript 최적화
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 현재 위치: `C:\project\bluerobot`
⏱️ 예상 시간: 5분
✅ 목표: JS 압축 및 최적화

```bash
# Terser 설치 및 실행
cd C:\project\bluerobot
npm install -D terser

# JS 압축
npx terser 001\js\main.js -o dist\js\main.min.js -c -m
```

**파일 생성**: `dist\js\video-lazy.js`
```javascript
// Video Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.hero-video');
  if (video) {
    video.setAttribute('poster', 'images/hero-poster.webp');
    setTimeout(() => {
      const source = video.querySelector('source');
      if (source) {
        video.src = source.getAttribute('src');
        video.load();
        video.play().catch(e => console.log('Video autoplay failed:', e));
      }
    }, 2000);
  }
  
  const lazyElements = document.querySelectorAll('[data-lazy]');
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          lazyObserver.unobserve(entry.target);
        }
      });
    });
    lazyElements.forEach(el => lazyObserver.observe(el));
  }
});
```

```bash
# JS 파일 압축
npx terser dist\js\video-lazy.js -o dist\js\video-lazy.min.js -c -m
dir dist\js\*.js
```

**체크포인트**: main.min.js와 video-lazy.min.js 생성
⏸️ **대기**: "STEP 5 완료. JavaScript 최적화 완료. STEP 6을 진행할까요?"
---

## [STEP 6] 이미지 최적화 (WebP 변환)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 현재 위치: `C:\project\bluerobot`
⏱️ 예상 시간: 10분
✅ 목표: PNG → WebP 변환 (70% 크기 감소)

```bash
# WebP 변환 도구 설치
cd C:\project\bluerobot
npm install -g cwebp

# 이미지 WebP 변환
cwebp assets\logo\Bluerobot_CI.png -o dist\images\Bluerobot_CI.webp -q 85
cwebp assets\logo\Balancestage_BI.png -o dist\images\Balancestage_BI.webp -q 85

# PNG 원본도 복사 (fallback용)
copy assets\logo\*.png dist\images\

# 크기 비교
echo "Original PNG:"
dir assets\logo\*.png
echo "Optimized WebP:"
dir dist\images\*.webp
```

**대안 (cwebp 설치 실패시)**:
```
1. https://squoosh.app 접속
2. PNG 파일 업로드
3. WebP 85% 품질로 변환
4. dist\images\ 폴더에 저장
```

**체크포인트**: WebP 이미지 파일 생성
⏸️ **대기**: "STEP 6 완료. 이미지 최적화 완료. STEP 7을 진행할까요?"

---

## [STEP 7] HTML 최적화 및 통합
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 현재 위치: `C:\project\bluerobot`
⏱️ 예상 시간: 15분
✅ 목표: 모든 최적화 요소를 HTML에 통합

⏸️ **사용자 확인**: "dist/index.html 파일을 수정합니다. 진행할까요?"

**파일 수정**: `dist\index.html`

HTML head 부분을 다음으로 교체:```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BalanceStage QuadAlign X - 세계 최초 4축 통합 정렬 플랫폼</title>
    <meta name="description" content="정렬이 쉬워지면, 제조는 달라집니다. 4축(X,Y,Pitch,Roll) 통합 제어 고하중 정렬 플랫폼">
    
    <!-- Critical CSS (인라인) -->
    <style>
        /* critical.css 내용을 여기에 복사 */
        *{margin:0;padding:0;box-sizing:border-box}body{font-family:'Pretendard',-apple-system,sans-serif;overflow-x:hidden}.header{position:fixed;top:0;width:100%;z-index:1000;background:rgba(0,0,0,.9);padding:1rem 2rem}.hero-section{position:relative;height:100vh;overflow:hidden;background:#000}.hero-video{position:absolute;width:100%;height:100%;object-fit:cover}.hero-overlay{position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.3))}.hero-content{position:relative;z-index:1;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;color:#fff;padding:2rem}.hero-title{font-size:clamp(2rem,5vw,4rem);font-weight:800;margin-bottom:1.5rem}.btn-primary{background:#2563eb;color:#fff;padding:1rem 2rem;border-radius:8px;text-decoration:none;font-weight:600}
    </style>
    
    <!-- 나머지 CSS는 비동기 로드 -->
    <link rel="preload" href="css/main.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="css/main.min.css"></noscript>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero-section" id="introduction">
        <video class="hero-video" poster="images/hero-poster.webp" muted loop playsinline preload="metadata">
            <source data-src="video/Herosection.mp4" type="video/mp4">
        </video>
        <!-- 나머지 내용 -->
    </section>
    
    <!-- Scripts -->
    <script src="js/video-lazy.min.js" defer></script>
    <script src="js/main.min.js" defer></script>
</body>
</html>
```

⏸️ **대기**: "STEP 7 완료. HTML 통합 완료. STEP 8을 진행할까요?"

---

## [STEP 8] 경로 수정 및 정리
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 현재 위치: `C:\project\bluerobot`
⏱️ 예상 시간: 5분
✅ 목표: 모든 리소스 경로를 dist 기준으로 수정
```bash
# dist/index.html 내 경로 수정
cd C:\project\bluerobot\dist

# PowerShell로 일괄 경로 변경
powershell -Command "(Get-Content index.html) -replace '../assets/', '' -replace '001/css/', 'css/' -replace '001/js/', 'js/' | Set-Content index.html"

# 비디오 파일 복사 (아직 안했다면)
copy ..\assets\video\Herosection.mp4 video\

# 불필요한 파일 정리
del css\combined.css 2>nul
```

**체크포인트**: 모든 리소스 경로가 상대 경로로 정리됨
⏸️ **대기**: "STEP 8 완료. 경로 수정 완료. STEP 9를 진행할까요?"

---

## [STEP 9] 테스트 서버 실행
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 현재 위치: `C:\project\bluerobot`
⏱️ 예상 시간: 3분
✅ 목표: 최적화된 버전 테스트

```bash
# dist 폴더에서 서버 실행
cd C:\project\bluerobot\dist
python -m http.server 8080

# 브라우저에서 확인
start http://localhost:8080
```

**체크리스트**:
```
□ 페이지가 정상적으로 로드되는가?
□ 비디오가 2초 후에 재생되는가?
□ 모든 섹션이 보이는가?
□ 버튼 클릭이 작동하는가?
□ 콘솔 에러가 없는가?
```

⏸️ **대기**: "서버가 실행 중입니다. 브라우저에서 테스트 후 결과를 알려주세요. STEP 10을 진행할까요?"

---

## [STEP 10] 최종 성능 측정
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 현재 위치: `C:\project\bluerobot`
⏱️ 예상 시간: 5분
✅ 목표: 최적화 결과 검증
```bash
# 새 터미널에서 Lighthouse 실행
cd C:\project\bluerobot
lighthouse http://localhost:8080 --output json --output-path after.json
lighthouse http://localhost:8080 --output html --output-path after.html

# 결과 비교
echo "===== OPTIMIZATION RESULTS ====="
echo "Before: Check before.html"
echo "After: Check after.html"
start after.html
```

**예상 개선 지표**:
```
메트릭              Before  →  After
─────────────────────────────────
Performance Score:    60   →   90+
FCP:                3.2s  →  1.5s
LCP:                4.5s  →  2.2s
Total Size:         5.9MB →  600KB
Requests:            15   →   6
```

⏸️ **최종 대기**: "최적화 완료! 성능 지표를 확인하세요. 추가 최적화가 필요하면 알려주세요."

---

## 🚨 문제 해결 가이드

### 문제 발생 시 Devin 행동 지침:
```
1. 에러 메시지 전체를 보고
2. "❌ 에러 발생: [에러 내용]. 어떻게 처리할까요?" 라고 질문
3. 사용자 응답 대기
4. 스스로 수정 시도 금지
```

### 자주 발생하는 문제들:

**문제 1**: PurgeCSS가 필요한 스타일 제거
⏸️ "PurgeCSS가 필요한 클래스를 제거한 것 같습니다. safelist에 추가할 클래스를 알려주세요."

**문제 2**: 비디오 재생 안됨
⏸️ "비디오가 재생되지 않습니다. 콘솔 에러를 확인해주세요."

**문제 3**: WebP 이미지 안 보임
⏸️ "WebP 이미지가 표시되지 않습니다. 브라우저 호환성을 확인해주세요."
---

## ✅ 최종 체크리스트

### Devin 자가 점검 항목:
```
작업 전 확인:
□ 백업 폴더 생성했는가?
□ 원본 파일은 건드리지 않았는가?
□ dist 폴더에서만 작업했는가?

각 STEP 후 확인:
□ 사용자에게 진행 여부를 물었는가?
□ 에러 발생 시 즉시 보고했는가?
□ 체크포인트를 확인했는가?

최종 확인:
□ 모든 STEP이 완료되었는가?
□ 성능 지표가 개선되었는가?
□ 사용자가 만족했는가?
```

---

## 📌 Devin 전용 빠른 참조

### 🟢 자유롭게 할 수 있는 것:
- `dist/` 폴더 내 모든 작업
- 파일 읽기, 크기 확인
- 콘솔 출력
- 경로 자동 수정

### 🔴 반드시 허락 받아야 하는 것:
- `001/`, `assets/` 폴더 수정
- 파일 삭제
- npm 전역 설치
- Git 작업

### 📝 보고 템플릿:
```
[STEP X 시작]
"STEP X를 시작합니다. 진행해도 될까요?"

[작업 중]
"현재 XXX 작업 중입니다..."

[완료]
"✅ STEP X 완료. 결과: XXX. 다음 단계로 진행할까요?"

[에러]
"❌ 문제 발생: XXX. 어떻게 처리할까요?"
```

---

**문서 완료**: Devin 전용 최적화 실행 지침서
**중요**: 모든 작업은 사용자 확인 후 진행
**예외**: dist 폴더 내 작업은 자유롭게 진행

END OF GUIDE