// ===== AUTHENTICATION SYSTEM =====

/**
 * BlueRobot QuadAlign X 관리자 프로그램 인증 시스템
 * 로그인, 로그아웃, 2FA, 비밀번호 관리 등
 */

// 인증 관련 전역 객체
window.BlueRobotAuth = {
  // 인증 상태
  isAuthenticated: false,
  user: null,
  token: null,
  permissions: [],
  
  // 2FA 상태
  twoFactorEnabled: false,
  twoFactorRequired: false,
  
  // 설정
  config: {
    tokenExpiry: 8 * 60 * 60 * 1000, // 8시간
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15분
    passwordMinLength: 8,
    sessionTimeout: 30 * 60 * 1000, // 30분 비활성
    rememberMeDuration: 30 * 24 * 60 * 60 * 1000 // 30일
  }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  initializeAuthSystem();
});

// ===== 인증 시스템 초기화 =====
function initializeAuthSystem() {
  // 현재 페이지 확인
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath.includes('index.html') || 
                     currentPath.endsWith('/') ||
                     currentPath.includes('login') ||
                     currentPath === '/';
  
  console.log('Auth system initializing for page:', currentPath, 'isLoginPage:', isLoginPage);
  
  if (isLoginPage) {
    initializeLoginPage();
  } else {
    // 다른 페이지에서는 인증 상태 확인 (대시보드 등)
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      console.log('Authentication failed, user will be redirected');
    } else {
      console.log('User authenticated successfully');
    }
  }
}

// ===== 로그인 페이지 초기화 =====
function initializeLoginPage() {
  BlueRobotAdmin.log('Initializing login page...');
  
  // 이미 로그인된 경우 대시보드로 리다이렉트 (무한루프 방지)
  if (isUserLoggedIn()) {
    BlueRobotAdmin.log('User already logged in, redirecting to dashboard...');
    window.location.href = 'dashboard.html';
    return;
  }
  
  // 로그인 폼 이벤트 설정
  setupLoginForm();
  
  // 저장된 이메일 복원
  restoreSavedEmail();
  
  // 로그인 시도 제한 확인
  checkLoginAttempts();
}
// ===== 로그인 폼 설정 =====
function setupLoginForm() {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberMeCheckbox = document.getElementById('rememberMe');
  const loginButton = document.getElementById('loginButton');
  
  if (!loginForm) return;
  
  // 폼 제출 처리
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleLogin();
  });
  
  // 실시간 유효성 검사
  if (emailInput) {
    emailInput.addEventListener('input', function() {
      validateEmail(this.value);
    });
  }
  
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      validatePassword(this.value);
    });
  }
  
  // Enter 키 처리
  if (passwordInput) {
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleLogin();
      }
    });
  }
  
  // 비밀번호 보기/숨기기 토글
  const passwordToggle = document.querySelector('.password-toggle');
  if (passwordToggle) {
    passwordToggle.addEventListener('click', function() {
      togglePasswordVisibility();
    });
  }
}

// ===== 안전한 토스트 표시 함수 =====
function safeShowToast(message, type = 'info') {
  if (typeof showToast === 'function') {
    showToast(message, type);
  } else {
    // fallback: console.log
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
}
// ===== 로그인 처리 =====
async function handleLogin() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberMeCheckbox = document.getElementById('rememberMe');
  const loginButton = document.getElementById('loginButton');
  
  if (!emailInput || !passwordInput) return;
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const rememberMe = rememberMeCheckbox?.checked || false;
  
  // 유효성 검사
  if (!validateLoginForm(email, password)) {
    return;
  }
  
  // 로그인 시도 제한 확인
  if (isLoginBlocked()) {
    showLoginError('로그인 시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.');
    return;
  }
  
  // 로딩 상태 표시
  setLoginLoading(true);
  
  try {
    // 로그인 API 호출 (실제 구현에서는 서버 API 호출)
    const result = await performLogin(email, password, rememberMe);
    
    if (result.success) {
      // 2FA 필요한 경우
      if (result.requiresTwoFactor) {
        showTwoFactorForm(result.tempToken);
      } else {
        // 로그인 성공
        handleLoginSuccess(result.user, result.token, rememberMe);
      }
    } else {
      // 로그인 실패
      handleLoginFailure(result.error);
    }
  } catch (error) {
    BlueRobotAdmin.error('Login error:', error);
    showLoginError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
  } finally {
    setLoginLoading(false);
  }
}
// ===== 로그인 API 호출 (모의 구현) =====
async function performLogin(email, password, rememberMe) {
  // 실제 구현에서는 서버 API 호출
  return new Promise((resolve) => {
    setTimeout(() => {
      // 모의 사용자 데이터
      const mockUsers = {
        'admin@bluerobot.co.kr': {
          id: 1,
          name: '관리자',
          email: 'admin@bluerobot.co.kr',
          role: 'admin',
          permissions: ['all'],
          avatar: null,
          requiresTwoFactor: false
        },
        'marketing@bluerobot.co.kr': {
          id: 2,
          name: '마케팅 담당자',
          email: 'marketing@bluerobot.co.kr',
          role: 'marketing',
          permissions: ['landing_management', 'leads_management', 'analytics'],
          avatar: null,
          requiresTwoFactor: false
        },
        'sales@bluerobot.co.kr': {
          id: 3,
          name: '영업 담당자',
          email: 'sales@bluerobot.co.kr',
          role: 'sales',
          permissions: ['leads_management', 'analytics'],
          avatar: null,
          requiresTwoFactor: false
        }
      };
      
      // 모의 비밀번호 검증 (실제로는 해시 비교)
      const validPasswords = {
        'admin@bluerobot.co.kr': 'admin123!',
        'marketing@bluerobot.co.kr': 'marketing123!',
        'sales@bluerobot.co.kr': 'sales123!'
      };
      
      if (mockUsers[email] && validPasswords[email] === password) {
        const user = mockUsers[email];
        const token = generateMockToken(user);
        
        resolve({
          success: true,
          user: user,
          token: token,
          requiresTwoFactor: user.requiresTwoFactor
        });
      } else {
        resolve({
          success: false,
          error: '이메일 또는 비밀번호가 올바르지 않습니다.'
        });
      }
    }, 1000); // 1초 지연으로 실제 API 호출 시뮬레이션
  });
}
// ===== 모의 토큰 생성 =====
function generateMockToken(user) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (8 * 60 * 60) // 8시간 후 만료
  }));
  const signature = btoa('mock_signature');
  
  return `${header}.${payload}.${signature}`;
}

// ===== 로그인 성공 처리 =====
function handleLoginSuccess(user, token, rememberMe) {
  console.log('=== Login Success Handler ===');
  console.log('User:', user);
  console.log('Token:', token);
  console.log('Remember Me:', rememberMe);
  
  BlueRobotAdmin.log('Login successful for user:', user.email);
  
  // 사용자 정보 저장
  BlueRobotAuth.isAuthenticated = true;
  BlueRobotAuth.user = user;
  BlueRobotAuth.token = token;
  BlueRobotAuth.permissions = user.permissions;
  
  // 로컬 스토리지에 저장
  const storage = rememberMe ? localStorage : sessionStorage;
  
  console.log('Saving to storage:', rememberMe ? 'localStorage' : 'sessionStorage');
  
  try {
    storage.setItem('bluerobotAdminToken', token);
    storage.setItem('bluerobotAdminUser', JSON.stringify(user));
    
    console.log('Token saved:', storage.getItem('bluerobotAdminToken'));
    console.log('User saved:', storage.getItem('bluerobotAdminUser'));
    
    if (rememberMe) {
      const expiry = Date.now() + BlueRobotAuth.config.rememberMeDuration;
      localStorage.setItem('bluerobotAdminTokenExpiry', expiry.toString());
      localStorage.setItem('bluerobotAdminEmail', user.email);
      console.log('Remember me data saved');
    }
    
    // 로그인 시도 카운터 리셋
    resetLoginAttempts();
    
    // 성공 메시지 표시
    safeShowToast('로그인되었습니다.', 'success');
    
    // 즉시 인증 상태 확인
    console.log('Checking auth status after login...');
    const isAuth = isUserLoggedIn();
    console.log('Auth status after login:', isAuth);
    
    // 대시보드로 리다이렉트 (더 긴 지연으로 안전성 확보)
    setTimeout(() => {
      console.log('Redirecting to dashboard...');
      window.location.href = 'dashboard.html';
    }, 1500);
    
  } catch (error) {
    console.error('Error saving login data:', error);
    showLoginError('로그인 데이터 저장 중 오류가 발생했습니다.');
  }
}
// ===== 로그인 실패 처리 =====
function handleLoginFailure(error) {
  BlueRobotAdmin.log('Login failed:', error);
  
  // 실패 횟수 증가
  incrementLoginAttempts();
  
  // 오류 메시지 표시
  showLoginError(error);
  
  // 비밀번호 필드 클리어
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.value = '';
    passwordInput.focus();
  }
}

// ===== 2FA 폼 표시 =====
function showTwoFactorForm(tempToken) {
  // 2FA 모달 표시 (향후 구현)
  BlueRobotAdmin.log('Two-factor authentication required');
  
  // 임시 토큰 저장
  sessionStorage.setItem('bluerobotAdminTempToken', tempToken);
  
  // 2FA 입력 폼 표시
  safeShowToast('2단계 인증이 필요합니다. 인증 앱의 코드를 입력해주세요.', 'info');
}

// ===== 유효성 검사 =====
function validateLoginForm(email, password) {
  let isValid = true;
  
  // 이메일 검증
  if (!validateEmail(email)) {
    showFieldError('email', '올바른 이메일 주소를 입력해주세요.');
    isValid = false;
  } else {
    clearFieldError('email');
  }
  
  // 비밀번호 검증
  if (!validatePassword(password)) {
    showFieldError('password', '비밀번호를 입력해주세요.');
    isValid = false;
  } else {
    clearFieldError('password');
  }
  
  return isValid;
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password && password.length >= BlueRobotAuth.config.passwordMinLength;
}

// ===== 필드 오류 표시 함수들 =====
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.classList.add('error');
    
    let errorElement = field.parentElement.querySelector('.form-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.classList.remove('error');
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.remove();
    }
  }
}

// ===== 로그인 시도 제한 =====
function incrementLoginAttempts() {
  const attempts = getLoginAttempts() + 1;
  localStorage.setItem('bluerobotAdminLoginAttempts', attempts.toString());
  localStorage.setItem('bluerobotAdminLastAttempt', Date.now().toString());
  
  if (attempts >= BlueRobotAuth.config.maxLoginAttempts) {
    const lockoutUntil = Date.now() + BlueRobotAuth.config.lockoutDuration;
    localStorage.setItem('bluerobotAdminLockoutUntil', lockoutUntil.toString());
  }
}
function getLoginAttempts() {
  const attempts = localStorage.getItem('bluerobotAdminLoginAttempts');
  return attempts ? parseInt(attempts) : 0;
}

function resetLoginAttempts() {
  localStorage.removeItem('bluerobotAdminLoginAttempts');
  localStorage.removeItem('bluerobotAdminLastAttempt');
  localStorage.removeItem('bluerobotAdminLockoutUntil');
}

function isLoginBlocked() {
  const lockoutUntil = localStorage.getItem('bluerobotAdminLockoutUntil');
  if (lockoutUntil) {
    return Date.now() < parseInt(lockoutUntil);
  }
  return false;
}

function checkLoginAttempts() {
  if (isLoginBlocked()) {
    const lockoutUntil = parseInt(localStorage.getItem('bluerobotAdminLockoutUntil'));
    const remainingTime = Math.ceil((lockoutUntil - Date.now()) / 1000 / 60);
    showLoginError(`로그인이 ${remainingTime}분간 차단되었습니다.`);
    
    // 로그인 폼 비활성화
    disableLoginForm();
  }
}

// ===== UI 상태 관리 =====
function setLoginLoading(loading) {
  const loginButton = document.getElementById('loginButton');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  if (loginButton) {
    if (loading) {
      loginButton.classList.add('btn-loading');
      loginButton.disabled = true;
    } else {
      loginButton.classList.remove('btn-loading');
      loginButton.disabled = false;
    }
  }
  
  if (emailInput) emailInput.disabled = loading;
  if (passwordInput) passwordInput.disabled = loading;
}
function disableLoginForm() {
  const loginButton = document.getElementById('loginButton');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  if (loginButton) loginButton.disabled = true;
  if (emailInput) emailInput.disabled = true;
  if (passwordInput) passwordInput.disabled = true;
}

function enableLoginForm() {
  const loginButton = document.getElementById('loginButton');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  if (loginButton) loginButton.disabled = false;
  if (emailInput) emailInput.disabled = false;
  if (passwordInput) passwordInput.disabled = false;
}

// ===== 오류 메시지 표시 =====
function showLoginError(message) {
  const errorElement = document.getElementById('loginError');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.classList.add('form-error');
  } else {
    safeShowToast(message, 'error');
  }
}

function clearLoginError() {
  const errorElement = document.getElementById('loginError');
  if (errorElement) {
    errorElement.style.display = 'none';
    errorElement.textContent = '';
  }
}

function showLoginSuccess(message) {
  clearLoginError();
  safeShowToast(message, 'success');
}

// ===== 저장된 이메일 복원 =====
function restoreSavedEmail() {
  const savedEmail = localStorage.getItem('bluerobotAdminEmail');
  const emailInput = document.getElementById('email');
  const rememberMeCheckbox = document.getElementById('rememberMe');
  
  if (savedEmail && emailInput) {
    emailInput.value = savedEmail;
    if (rememberMeCheckbox) {
      rememberMeCheckbox.checked = true;
    }
  }
}
// ===== 비밀번호 보기/숨기기 =====
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.querySelector('.password-toggle i');
  
  if (passwordInput && toggleIcon) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.className = 'fas fa-eye-slash';
    } else {
      passwordInput.type = 'password';
      toggleIcon.className = 'fas fa-eye';
    }
  }
}

// ===== 로그아웃 =====
function logout(redirect = true) {
  BlueRobotAdmin.log('User logging out...');
  
  // 인증 상태 초기화
  BlueRobotAuth.isAuthenticated = false;
  BlueRobotAuth.user = null;
  BlueRobotAuth.token = null;
  BlueRobotAuth.permissions = [];
  
  // 저장된 데이터 제거
  localStorage.removeItem('bluerobotAdminToken');
  localStorage.removeItem('bluerobotAdminUser');
  localStorage.removeItem('bluerobotAdminTokenExpiry');
  sessionStorage.removeItem('bluerobotAdminToken');
  sessionStorage.removeItem('bluerobotAdminUser');
  sessionStorage.removeItem('bluerobotAdminTempToken');
  
  // Remember Me 이메일은 유지 (사용자가 체크했다면)
  // localStorage.removeItem('bluerobotAdminEmail'); // 이메일은 유지
  
  // 세션 데이터 정리
  sessionStorage.clear();
  
  // 현재 페이지가 로그인 페이지가 아닌 경우에만 메시지 표시
  const isLoginPage = window.location.pathname.includes('index.html') || 
                     window.location.pathname.endsWith('/') ||
                     window.location.pathname.includes('login');
  
  if (!isLoginPage) {
    safeShowToast('로그아웃되었습니다.', 'success');
  }
  
  // 로그인 페이지로 리다이렉트 (이미 로그인 페이지가 아닌 경우에만)
  if (redirect && !isLoginPage) {
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
}
// ===== 인증 상태 확인 =====
function checkAuthentication() {
  const token = localStorage.getItem('bluerobotAdminToken') || 
                sessionStorage.getItem('bluerobotAdminToken');
  const userStr = localStorage.getItem('bluerobotAdminUser') || 
                  sessionStorage.getItem('bluerobotAdminUser');
  
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      
      if (isTokenValid(token)) {
        // 인증 상태 설정
        BlueRobotAuth.isAuthenticated = true;
        BlueRobotAuth.user = user;
        BlueRobotAuth.token = token;
        BlueRobotAuth.permissions = user.permissions || [];
        
        BlueRobotAdmin.log('User authenticated:', user.email);
        return true;
      } else {
        BlueRobotAdmin.log('Token expired, redirecting to login');
        redirectToLogin();
        return false;
      }
    } catch (error) {
      BlueRobotAdmin.error('Failed to parse user data:', error);
      redirectToLogin();
      return false;
    }
  } else {
    BlueRobotAdmin.log('No authentication data found, redirecting to login');
    redirectToLogin();
    return false;
  }
}

function isUserLoggedIn() {
  console.log('=== Checking if user is logged in ===');
  
  const token = localStorage.getItem('bluerobotAdminToken') || 
                sessionStorage.getItem('bluerobotAdminToken');
  const userStr = localStorage.getItem('bluerobotAdminUser') || 
                  sessionStorage.getItem('bluerobotAdminUser');
  
  console.log('Token from storage:', token ? 'Found' : 'Not found');
  console.log('User from storage:', userStr ? 'Found' : 'Not found');
  
  if (!token || !userStr) {
    console.log('No token or user data found');
    return false;
  }
  
  try {
    const user = JSON.parse(userStr);
    console.log('Parsed user:', user.email);
    
    const isValid = isTokenValid(token);
    console.log('Token valid:', isValid);
    console.log('User login check result:', user.email, 'valid:', isValid);
    return isValid;
  } catch (error) {
    console.error('Login check error:', error);
    return false;
  }
}

// ===== 로그인 페이지로 리다이렉트 (무한루프 방지) =====
function redirectToLogin() {
  // 이미 로그인 페이지인 경우 리다이렉트하지 않음
  const isLoginPage = window.location.pathname.includes('index.html') || 
                     window.location.pathname.endsWith('/') ||
                     window.location.pathname.includes('login');
  
  if (!isLoginPage) {
    BlueRobotAdmin.log('Redirecting to login page...');
    clearAuthData(); // 인증 데이터만 삭제, 토스트 메시지 없이
    window.location.href = 'index.html';
  }
}

// ===== 인증 데이터 삭제 (토스트 없이) =====
function clearAuthData() {
  BlueRobotAuth.isAuthenticated = false;
  BlueRobotAuth.user = null;
  BlueRobotAuth.token = null;
  BlueRobotAuth.permissions = [];
  
  localStorage.removeItem('bluerobotAdminToken');
  localStorage.removeItem('bluerobotAdminUser');
  sessionStorage.removeItem('bluerobotAdminToken');
  sessionStorage.removeItem('bluerobotAdminUser');
  sessionStorage.removeItem('bluerobotAdminTempToken');
}

// ===== 토큰 유효성 검사 =====
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
// ===== 권한 확인 =====
function hasPermission(permission) {
  if (!BlueRobotAuth.isAuthenticated) return false;
  
  // 관리자는 모든 권한 보유
  if (BlueRobotAuth.permissions.includes('all')) return true;
  
  return BlueRobotAuth.permissions.includes(permission);
}

function requirePermission(permission) {
  if (!hasPermission(permission)) {
    safeShowToast('이 기능에 접근할 권한이 없습니다.', 'error');
    return false;
  }
  return true;
}

// ===== 세션 타임아웃 관리 =====
let sessionTimeoutId;
let warningTimeoutId;

function startSessionTimer() {
  clearSessionTimer();
  
  // 경고 타이머 (세션 만료 5분 전)
  warningTimeoutId = setTimeout(() => {
    showSessionWarning();
  }, BlueRobotAuth.config.sessionTimeout - 5 * 60 * 1000);
  
  // 세션 만료 타이머
  sessionTimeoutId = setTimeout(() => {
    handleSessionTimeout();
  }, BlueRobotAuth.config.sessionTimeout);
}

function clearSessionTimer() {
  if (sessionTimeoutId) {
    clearTimeout(sessionTimeoutId);
    sessionTimeoutId = null;
  }
  if (warningTimeoutId) {
    clearTimeout(warningTimeoutId);
    warningTimeoutId = null;
  }
}

function resetSessionTimer() {
  if (BlueRobotAuth.isAuthenticated) {
    startSessionTimer();
  }
}

function showSessionWarning() {
  safeShowToast('세션이 5분 후 만료됩니다. 활동을 계속하시려면 페이지를 새로고침하세요.', 'warning');
}

function handleSessionTimeout() {
  safeShowToast('세션이 만료되었습니다. 다시 로그인해주세요.', 'error');
  clearAuthData(); // 로그아웃 대신 데이터만 삭제
  
  // 로그인 페이지로 리다이렉트
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
}

// 사용자 활동 감지로 세션 타이머 리셋
document.addEventListener('click', resetSessionTimer);
document.addEventListener('keypress', resetSessionTimer);

// ===== 전역 함수 노출 =====
window.BlueRobotAuth.login = handleLogin;
window.BlueRobotAuth.logout = logout;
window.BlueRobotAuth.checkAuth = checkAuthentication;
window.BlueRobotAuth.hasPermission = hasPermission;
window.BlueRobotAuth.requirePermission = requirePermission;