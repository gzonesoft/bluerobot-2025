// ===== BLUEROBOT QUADALIGN X ADMIN - MAIN UTILITIES =====

/**
 * 관리자 프로그램 메인 유틸리티 함수들
 * 기존 001 버전의 main.js를 참고하여 관리자용으로 확장
 */

// 전역 객체
window.BlueRobotAdmin = {
  version: '1.0.0',
  initialized: false,
  user: null,
  settings: {},
  
  // 디버그 모드
  debug: true,
  
  // 로그 함수
  log: function(...args) {
    if (this.debug) {
      console.log('[BlueRobot Admin]', ...args);
    }
  },
  
  // 오류 로그
  error: function(...args) {
    console.error('[BlueRobot Admin Error]', ...args);
  },
  
  // 경고 로그
  warn: function(...args) {
    console.warn('[BlueRobot Admin Warning]', ...args);
  }
};

// DOM이 로드되면 초기화
document.addEventListener('DOMContentLoaded', function() {
  BlueRobotAdmin.log('Initializing BlueRobot Admin System...');
  
  // 토스트 컨테이너 먼저 초기화
  initializeToastContainer();
  
  // 기본 초기화
  initializeGlobalEvents();
  initializeLocalStorage();
  initializeTheme();
  
  // 인증 상태 확인
  checkAuthStatus();
  
  BlueRobotAdmin.initialized = true;
  BlueRobotAdmin.log('BlueRobot Admin System initialized successfully');
});

// ===== 토스트 컨테이너 초기화 =====
function initializeToastContainer() {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

// ===== 전역 이벤트 초기화 =====
function initializeGlobalEvents() {
  // ESC 키로 모달 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
      closeAllDropdowns();
    }
  });
  
  // 외부 클릭으로 드롭다운 닫기
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      closeAllDropdowns();
    }
  });
  
  // 윈도우 리사이즈 처리
  window.addEventListener('resize', debounce(function() {
    handleWindowResize();
  }, 250));
  
  // 브라우저 뒤로가기/앞으로가기 처리
  window.addEventListener('popstate', function(e) {
    handlePopState(e);
  });
  
  // 페이지 언로드 전 데이터 저장
  window.addEventListener('beforeunload', function(e) {
    saveUserSession();
  });
}

// ===== 로컬 스토리지 초기화 =====
function initializeLocalStorage() {
  try {
    // 기본 설정 로드
    const savedSettings = localStorage.getItem('bluerobotAdminSettings');
    if (savedSettings) {
      BlueRobotAdmin.settings = JSON.parse(savedSettings);
    } else {
      // 기본 설정
      BlueRobotAdmin.settings = {
        theme: 'light',
        sidebarCollapsed: false,
        language: 'ko',
        notifications: true,
        autoSave: true,
        refreshInterval: 30000, // 30초
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h'
      };
      saveSettings();
    }
    
    BlueRobotAdmin.log('Settings loaded:', BlueRobotAdmin.settings);
  } catch (error) {
    BlueRobotAdmin.error('Failed to load settings from localStorage:', error);
  }
}

// ===== 테마 초기화 =====
function initializeTheme() {
  const theme = BlueRobotAdmin.settings.theme || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  
  // 시스템 테마 감지
  if (theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
}

// ===== 인증 상태 확인 =====
function checkAuthStatus() {
  const token = localStorage.getItem('bluerobotAdminToken');
  const user = localStorage.getItem('bluerobotAdminUser');
  
  if (token && user) {
    try {
      BlueRobotAdmin.user = JSON.parse(user);
      BlueRobotAdmin.log('User authenticated:', BlueRobotAdmin.user.name);
      
      // 토큰 유효성 검사 (실제 구현에서는 서버에 검증 요청)
      if (isTokenValid(token)) {
        initializeAuthenticatedApp();
      } else {
        redirectToLogin();
      }
    } catch (error) {
      BlueRobotAdmin.error('Failed to parse user data:', error);
      redirectToLogin();
    }
  } else {
    // 로그인 페이지가 아닌 경우에만 리다이렉트
    const isLoginPage = window.location.pathname.includes('index.html') || 
                       window.location.pathname.endsWith('/') ||
                       window.location.pathname.includes('login');
    
    if (!isLoginPage) {
      redirectToLogin();
    }
  }
}

// ===== 인증된 앱 초기화 =====
function initializeAuthenticatedApp() {
  // 사이드바 초기화
  initializeSidebar();
  
  // 알림 초기화
  initializeNotifications();
  
  // 자동 새로고침 설정
  if (BlueRobotAdmin.settings.autoRefresh) {
    setInterval(refreshDashboardData, BlueRobotAdmin.settings.refreshInterval);
  }
  
  // 실시간 데이터 연결 (WebSocket 등)
  // initializeRealTimeConnection();
}

// ===== 유틸리티 함수들 =====

// 디바운스 함수
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 스로틀 함수
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 날짜 포맷팅
function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return '';
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'YYYY-MM-DD HH:mm':
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'relative':
      return getRelativeTime(d);
    default:
      return d.toLocaleDateString('ko-KR');
  }
}

// 상대 시간 계산
function getRelativeTime(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return formatDate(date);
}

// 숫자 포맷팅
function formatNumber(num, options = {}) {
  if (typeof num !== 'number') return num;
  
  const {
    decimals = 0,
    prefix = '',
    suffix = '',
    thousands = ','
  } = options;
  
  const formatted = num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
  return `${prefix}${formatted}${suffix}`;
}

// 파일 크기 포맷팅
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// URL 쿼리 파라미터 파싱
function parseQueryParams(url = window.location.search) {
  const params = new URLSearchParams(url);
  const result = {};
  
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  
  return result;
}

// 설정 저장
function saveSettings() {
  try {
    localStorage.setItem('bluerobotAdminSettings', JSON.stringify(BlueRobotAdmin.settings));
    BlueRobotAdmin.log('Settings saved successfully');
  } catch (error) {
    BlueRobotAdmin.error('Failed to save settings:', error);
  }
}

// 사용자 세션 저장
function saveUserSession() {
  if (BlueRobotAdmin.user && BlueRobotAdmin.settings.autoSave) {
    try {
      const sessionData = {
        lastActive: new Date().toISOString(),
        currentPage: window.location.pathname,
        settings: BlueRobotAdmin.settings
      };
      localStorage.setItem('bluerobotAdminSession', JSON.stringify(sessionData));
    } catch (error) {
      BlueRobotAdmin.error('Failed to save session:', error);
    }
  }
}

// 토큰 유효성 검사 (임시 구현)
function isTokenValid(token) {
  if (!token) return false;
  
  try {
    // JWT 토큰인 경우 만료 시간 확인
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  } catch (error) {
    // 단순 토큰인 경우 localStorage의 만료 시간 확인
    const tokenExpiry = localStorage.getItem('bluerobotAdminTokenExpiry');
    if (tokenExpiry) {
      return Date.now() < parseInt(tokenExpiry);
    }
    return true; // 개발 단계에서는 항상 유효
  }
}

// 로그인 페이지로 리다이렉트 (main.js용)
function redirectToLogin() {
  // 이미 로그인 페이지인 경우 리다이렉트하지 않음
  const isLoginPage = window.location.pathname.includes('index.html') || 
                     window.location.pathname.endsWith('/') ||
                     window.location.pathname.includes('login');
  
  if (!isLoginPage) {
    BlueRobotAdmin.log('Redirecting to login page...');
    localStorage.removeItem('bluerobotAdminToken');
    localStorage.removeItem('bluerobotAdminUser');
    localStorage.removeItem('bluerobotAdminTokenExpiry');
    window.location.href = 'index.html';
  }
}

// 윈도우 리사이즈 처리
function handleWindowResize() {
  // 모바일에서 사이드바 자동 접기
  if (window.innerWidth < 1024) {
    collapseSidebar();
  }
  
  // 차트 리사이즈 (Chart.js 등)
  if (window.Chart) {
    Object.values(window.Chart.instances).forEach(chart => {
      chart.resize();
    });
  }
}

// 페이지 상태 변경 처리
function handlePopState(event) {
  BlueRobotAdmin.log('Navigation state changed:', event.state);
  
  // SPA 라우팅 처리 (향후 구현)
  if (event.state && event.state.page) {
    loadPage(event.state.page);
  }
}

// 모든 모달 닫기
function closeAllModals() {
  document.querySelectorAll('.modal-overlay.open').forEach(modal => {
    modal.classList.remove('open');
  });
}

// 모든 드롭다운 닫기
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown.open').forEach(dropdown => {
    dropdown.classList.remove('open');
  });
}

// 대시보드 데이터 새로고침
function refreshDashboardData() {
  BlueRobotAdmin.log('Refreshing dashboard data...');
  
  // 각 위젯별 데이터 새로고침
  if (typeof refreshStats === 'function') refreshStats();
  if (typeof refreshCharts === 'function') refreshCharts();
  if (typeof refreshActivityFeed === 'function') refreshActivityFeed();
  if (typeof refreshNotifications === 'function') refreshNotifications();
}

// 에러 처리 및 사용자 알림
function handleError(error, context = '') {
  BlueRobotAdmin.error(`Error in ${context}:`, error);
  
  // 사용자에게 알림 표시 (안전한 방식)
  if (typeof showToast === 'function') {
    showToast('오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'error');
  } else {
    console.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
  
  // 에러 로그를 서버에 전송 (실제 구현에서)
  // sendErrorToServer(error, context);
}

// 전역 에러 핸들러
window.addEventListener('error', function(e) {
  handleError(e.error, 'Global Error Handler');
});

// Unhandled Promise Rejection 처리
window.addEventListener('unhandledrejection', function(e) {
  handleError(e.reason, 'Unhandled Promise Rejection');
  e.preventDefault();
});

// 개발 도구 (개발 환경에서만)
if (BlueRobotAdmin.debug) {
  window.BlueRobotAdminUtils = {
    clearStorage: function() {
      localStorage.clear();
      sessionStorage.clear();
      console.log('All storage cleared');
    },
    
    setUser: function(userData) {
      BlueRobotAdmin.user = userData;
      localStorage.setItem('bluerobotAdminUser', JSON.stringify(userData));
      console.log('User set:', userData);
    },
    
    simulateError: function() {
      throw new Error('Simulated error for testing');
    },
    
    getDebugInfo: function() {
      return {
        version: BlueRobotAdmin.version,
        user: BlueRobotAdmin.user,
        settings: BlueRobotAdmin.settings,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };
    }
  };
}

// ===== MAIN.JS 파일 끝 =====
// BlueRobot QuadAlign X 관리자 프로그램 메인 유틸리티
// 버전: 1.0.0
// 마지막 수정: 2025-08-06

console.log('✅ main.js 파일이 완전히 로드되었습니다.');