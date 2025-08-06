 false
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

// ===== 안전한 토스트 표시 함수 =====
function safeShowToast(message, type = 'info') {
  if (typeof showToast === 'function') {
    showToast(message, type);
  } else {
    // fallback: console.log
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
}

// ===== 로그인 성공 처리 =====
function handleLoginSuccess(user, token, rememberMe) {
  BlueRobotAdmin.log('Login successful for user:', user.email);
  
  // 사용자 정보 저장
  BlueRobotAuth.isAuthenticated = true;
  BlueRobotAuth.user = user;
  BlueRobotAuth.token = token;
  BlueRobotAuth.permissions = user.permissions;
  
  // 로컬 스토리지에 저장
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem('bluerobotAdminToken', token);
  storage.setItem('bluerobotAdminUser', JSON.stringify(user));
  
  if (rememberMe) {
    const expiry = Date.now() + BlueRobotAuth.config.rememberMeDuration;
    localStorage.setItem('bluerobotAdminTokenExpiry', expiry.toString());
    localStorage.setItem('bluerobotAdminEmail', user.email);
  }
  
  // 로그인 시도 카운터 리셋
  resetLoginAttempts();
  
  // 성공 메시지 표시
  safeShowToast('로그인되었습니다.', 'success');
  
  // 대시보드로 리다이렉트
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
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
  sessionStorage.removeItem('bluerobotAdminToken');
  sessionStorage.removeItem('bluerobotAdminUser');
  sessionStorage.removeItem('bluerobotAdminTempToken');
  
  // Remember Me가 체크되지 않은 경우 이메일도 제거
  const rememberEmail = localStorage.getItem('bluerobotAdminEmail');
  if (!rememberEmail) {
    localStorage.removeItem('bluerobotAdminEmail');
  }
  
  // 세션 데이터 정리
  sessionStorage.clear();
  
  // 성공 메시지 표시
  safeShowToast('로그아웃되었습니다.', 'success');
  
  // 로그인 페이지로 리다이렉트
  if (redirect) {
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
        logout();
        return false;
      }
    } catch (error) {
      BlueRobotAdmin.error('Failed to parse user data:', error);
      logout();
      return false;
    }
  } else {
    BlueRobotAdmin.log('No authentication data found, redirecting to login');
    logout();
    return false;
  }
}

function isUserLoggedIn() {
  return checkAuthentication();
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
  logout();
}

// 사용자 활동 감지로 세션 타이머 리셋
document.addEventListener('click', resetSessionTimer);
document.addEventListener('keypress', resetSessionTimer);
document.addEventListener('scroll', throttle(resetSessionTimer, 10000)); // 10초마다만 리셋

// ===== 전역 함수 노출 =====
window.BlueRobotAuth.login = handleLogin;
window.BlueRobotAuth.logout = logout;
window.BlueRobotAuth.checkAuth = checkAuthentication;
window.BlueRobotAuth.hasPermission = hasPermission;
window.BlueRobotAuth.requirePermission = requirePermission;