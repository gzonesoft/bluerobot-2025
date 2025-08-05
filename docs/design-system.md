# BalanceStage QuadAlign X 디자인 시스템

## 🎨 컬러 시스템

### Primary Colors
```css
Primary: #2563EB     /* 메인 CTA 버튼, 주요 포인트 */
Secondary: #DBEAFE   /* 보조 배경, 카드 */
Accent: #38BDF8      /* 아이콘, 링크 hover, 강조 텍스트 */
```

### Background Colors
```css
Background: #FFFFFF       /* 메인 배경 */
Background Light: #F8FAFC /* 섹션 분리 배경 */
Dark Background: #0F172A  /* 다크 섹션 */
Dark Light: #1E293B      /* 다크 카드 */
Dark Lighter: #334155    /* 다크 호버 */
```

### Text Colors
```css
Text Main: #0F172A    /* 헤드라인 (라이트 테마) */
Text Sub: #64748B     /* 서브 텍스트 (라이트 테마) */
Text Light: #94A3B8   /* 서브 텍스트 (다크 테마) */
Text White: #FFFFFF   /* 메인 텍스트 (다크 테마) */
```

### Status Colors
```css
Success: #10B981   /* 성공, 완료 표시 */
Error: #EF4444     /* 오류, 문제점 표시 */
Warning: #F59E0B   /* 경고, 주의 표시 */
Info: #3B82F6      /* 정보, 안내 표시 */
```

## 📝 타이포그래피

### Font Family
```css
Primary Font: 'Pretendard'
Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
```

### Font Weights
```css
Light: 300     /* 서브텍스트, 설명글 */
Regular: 400   /* 기본 텍스트 */
Medium: 500    /* 네비게이션, 버튼 */
Semibold: 600  /* 카드 제목 */
Bold: 700      /* 섹션 제목, 헤드라인 */
```

### Font Sizes (Tailwind Classes)
```css
/* 헤드라인 */
Hero Title: text-5xl lg:text-6xl     /* 56px / 64px */
Section Title: text-4xl              /* 36px */
Card Title: text-xl                  /* 20px */

/* 본문 */
Large Text: text-xl                  /* 20px */
Body Text: text-base                 /* 16px */
Small Text: text-sm                  /* 14px */
Caption: text-xs                     /* 12px */
```

## 🎯 섹션 테마 시스템

### Dark Theme Sections (다크 배경)
```css
Background: #0F172A
Card Background: #1E293B
Card Hover: #334155
Text Main: #FFFFFF
Text Sub: #94A3B8
Border: #334155
```

**적용 섹션**: #introduction, #core-features, #applications, #company-vision

### Light Theme Sections (라이트 배경)
```css
Background: #FFFFFF
Card Background: #F8FAFC
Card Hover: #F1F5F9
Text Main: #0F172A
Text Sub: #64748B
Border: #E2E8F0
```

**적용 섹션**: #problem-solution, #live-demo, #future-solutions, #roadmap, #contact

## 🔘 컴포넌트 시스템

### Buttons
```css
/* Primary Button */
.btn-primary {
    background: #2563EB;
    color: #FFFFFF;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.btn-primary:hover {
    background: #1D4ED8;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.5);
}

/* Secondary Button */
.btn-secondary {
    background: transparent;
    color: #38BDF8;
    border: 2px solid #38BDF8;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
}

.btn-secondary:hover {
    background: #38BDF8;
    color: #0F172A;
}
```

### Cards
```css
/* Light Theme Card */
.card-light {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
}

/* Dark Theme Card */
.card-dark {
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.card:hover {
    transform: translateY(-5px);
    transition: all 0.2s ease;
}
```

### Icons
```css
/* Icon Container */
.icon-container {
    width: 60px;
    height: 60px;
    background: #2563EB;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 1.5rem;
}

/* Large Icon (Applications) */
.icon-large {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    font-size: 2rem;
}
```

## 📱 반응형 디자인

### Breakpoints (Tailwind CSS)
```css
sm: 640px    /* 모바일 가로 */
md: 768px    /* 태블릿 */
lg: 1024px   /* 소형 데스크톱 */
xl: 1280px   /* 대형 데스크톱 */
2xl: 1536px  /* 초대형 화면 */
```

### Grid Systems
```css
/* Features Grid */
lg:grid-cols-3 md:grid-cols-2 grid-cols-1

/* Applications Grid */
lg:grid-cols-4 md:grid-cols-2 grid-cols-1

/* Comparison Grid */
lg:grid-cols-2 grid-cols-1

/* Contact Grid */
lg:grid-cols-4 md:grid-cols-2 grid-cols-1
```

### Typography Scaling
```css
/* Hero Title */
text-2xl sm:text-3xl lg:text-5xl xl:text-6xl

/* Section Title */
text-2xl sm:text-3xl lg:text-4xl

/* Body Text */
text-base lg:text-lg xl:text-xl
```

## 🎭 애니메이션 시스템

### Hover Effects
```css
/* Card Hover */
hover:-translate-y-2
hover:shadow-xl
transition-all duration-200

/* Button Hover */
hover:bg-blue-700
hover:-translate-y-1
hover:shadow-lg
transition-all duration-200

/* Link Hover */
hover:text-accent
transition-colors duration-200
```

### Page Transitions
```css
/* Smooth Scroll */
scroll-behavior: smooth;

/* Section Reveal */
opacity-0 animate-fade-in
transform translate-y-4
transition-all duration-500
```

## 🖼️ 이미지 시스템

### Logo Usage
```css
/* Header Logo */
height: 32px;
width: auto;

/* Product Logo (Hero) */
height: 60px;
width: auto;

/* Company Logo */
width: 150px;
height: auto;
```

### Video Guidelines
```css
/* Hero Video */
object-fit: cover;
width: 100%;
height: 100%;
opacity: 0.8;
```

## 🎪 섹션 네비게이션

### Section IDs
```css
.section-nav {
    font-size: 0.9rem;
    font-weight: 300;
    margin-bottom: 1rem;
    text-align: left;
    opacity: 0.7;
}

.section-nav.dark { color: #94A3B8; }
.section-nav.light { color: #64748B; }
```

### Navigation Examples
```
#introduction
#problem-solution
#core-features
#live-demo
#applications
#future-solutions
#roadmap
#company-vision
#contact
```

## 📏 스페이싱 시스템

### Container
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 2rem;
```

### Section Padding
```css
padding: 80px 2rem;

/* Mobile */
@media (max-width: 768px) {
    padding: 60px 1rem;
}
```

### Component Spacing
```css
/* Section Title */
margin-bottom: 3rem;

/* Section Subtitle */
margin-bottom: 4rem;

/* Card Grid Gap */
gap: 2rem;

/* Button Gap */
gap: 1rem;
```

---

**문서 생성일**: 2025년 8월 5일  
**버전**: 1.0 (001 버전 기준)  
**상태**: ✅ 완성
