// ===== COMMON COMPONENTS JAVASCRIPT =====

/**
 * 재사용 가능한 UI 컴포넌트들
 * 토스트, 모달, 드롭다운, 사이드바 등
 */

// ===== 토스트 알림 시스템 =====
window.ToastManager = {
  container: null,
  toasts: [],
  maxToasts: 5,
  defaultDuration: 5000,
  
  init: function() {
    if (!this.container) {
      this.container = document.getElementById('toastContainer');
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'toastContainer';
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
      }
    }
  },
  
  show: function(message, type = 'info', duration = this.defaultDuration, options = {}) {
    if (!this.container) this.init();
    
    const toast = this.createToast(message, type, duration, options);
    this.addToast(toast);
    
    return toast;
  },
  
  createToast: function(message, type, duration, options) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconMap = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };
    
    const icon = iconMap[type] || iconMap.info;
    
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="${icon}"></i>
      </div>
      <div class="toast-content">
        ${options.title ? `<div class="toast-title">${options.title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      <button type="button" class="toast-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // 닫기 버튼 이벤트
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      this.removeToast(toast);
    });
    
    // 자동 제거
    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(toast);
      }, duration);
    }
    
    // 클릭으로 제거 (선택사항)
    if (options.clickToClose !== false) {
      toast.addEventListener('click', () => {
        this.removeToast(toast);
      });
    }
    
    return toast;
  },
  
  addToast: function(toast) {
    // 최대 개수 초과 시 오래된 토스트 제거
    while (this.toasts.length >= this.maxToasts) {
      const oldestToast = this.toasts.shift();
      this.removeToast(oldestToast, false);
    }
    
    this.toasts.push(toast);
    this.container.appendChild(toast);
    
    // 애니메이션을 위한 지연
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
  },
  
  removeToast: function(toast, updateArray = true) {
    if (!toast || !toast.parentElement) return;
    
    toast.classList.remove('show');
    
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
      
      if (updateArray) {
        const index = this.toasts.indexOf(toast);
        if (index > -1) {
          this.toasts.splice(index, 1);
        }
      }
    }, 300); // CSS 트랜지션 시간과 맞춤
  },
  
  clear: function() {
    this.toasts.forEach(toast => this.removeToast(toast, false));
    this.toasts = [];
  }
};

// 전역 함수로 노출 (안전한 래퍼)
function showToast(message, type = 'info', duration = 5000, options = {}) {
  // ToastManager가 초기화되지 않은 경우 자동 초기화
  if (!window.ToastManager) {
    console.error('ToastManager not available');
    return null;
  }
  
  if (!ToastManager.container) {
    ToastManager.init();
  }
  
  return ToastManager.show(message, type, duration, options);
}

// 안전한 초기화를 위한 즉시 실행 함수
(function() {
  // 페이지 로드 시 ToastManager 자동 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (window.ToastManager) {
        ToastManager.init();
      }
    });
  } else {
    // DOM이 이미 로드된 경우
    if (window.ToastManager) {
      ToastManager.init();
    }
  }
})();

// ===== 모달 시스템 =====
window.ModalManager = {
  activeModals: [],
  
  open: function(modalId, options = {}) {
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error(`Modal with id "${modalId}" not found`);
      return false;
    }
    
    modal.classList.add('open');
    this.activeModals.push(modal);
    
    // body 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    // 포커스 관리
    const focusableElement = modal.querySelector('input, button, textarea, select');
    if (focusableElement) {
      setTimeout(() => focusableElement.focus(), 100);
    }
    
    // 배경 클릭으로 닫기
    if (options.closeOnBackdrop !== false) {
      modal.addEventListener('click', this.handleBackdropClick.bind(this));
    }
    
    return true;
  },
  
  close: function(modalId) {
    let modal;
    
    if (typeof modalId === 'string') {
      modal = document.getElementById(modalId);
    } else if (modalId && modalId.nodeType === 1) {
      modal = modalId;
    } else {
      // 가장 최근에 열린 모달 닫기
      modal = this.activeModals[this.activeModals.length - 1];
    }
    
    if (!modal) return false;
    
    modal.classList.remove('open');
    
    // 배열에서 제거
    const index = this.activeModals.indexOf(modal);
    if (index > -1) {
      this.activeModals.splice(index, 1);
    }
    
    // 다른 모달이 없으면 body 스크롤 복원
    if (this.activeModals.length === 0) {
      document.body.style.overflow = '';
    }
    
    return true;
  },
  
  closeAll: function() {
    this.activeModals.forEach(modal => {
      modal.classList.remove('open');
    });
    this.activeModals = [];
    document.body.style.overflow = '';
  },
  
  handleBackdropClick: function(e) {
    if (e.target.classList.contains('modal-overlay')) {
      this.close(e.target);
    }
  }
};

// 전역 함수들
function openModal(modalId, options = {}) {
  return ModalManager.open(modalId, options);
}

function closeModal(modalId) {
  return ModalManager.close(modalId);
}

function closeAllModals() {
  return ModalManager.closeAll();
}

// ===== 드롭다운 시스템 =====
window.DropdownManager = {
  activeDropdowns: [],
  
  toggle: function(dropdownElement) {
    if (dropdownElement.classList.contains('open')) {
      this.close(dropdownElement);
    } else {
      this.open(dropdownElement);
    }
  },
  
  open: function(dropdownElement) {
    // 다른 드롭다운들 닫기
    this.closeAll();
    
    dropdownElement.classList.add('open');
    this.activeDropdowns.push(dropdownElement);
    
    // 메뉴 위치 조정
    this.adjustPosition(dropdownElement);
  },
  
  close: function(dropdownElement) {
    dropdownElement.classList.remove('open');
    
    const index = this.activeDropdowns.indexOf(dropdownElement);
    if (index > -1) {
      this.activeDropdowns.splice(index, 1);
    }
  },
  
  closeAll: function() {
    this.activeDropdowns.forEach(dropdown => {
      dropdown.classList.remove('open');
    });
    this.activeDropdowns = [];
  },
  
  adjustPosition: function(dropdownElement) {
    const menu = dropdownElement.querySelector('.dropdown-menu');
    if (!menu) return;
    
    const rect = menu.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // 오른쪽 경계 초과 시 왼쪽으로 이동
    if (rect.right > viewport.width) {
      menu.style.left = 'auto';
      menu.style.right = '0';
    }
    
    // 하단 경계 초과 시 위로 이동
    if (rect.bottom > viewport.height) {
      menu.style.top = 'auto';
      menu.style.bottom = '100%';
      menu.style.marginTop = '0';
      menu.style.marginBottom = '4px';
    }
  }
};

// ===== 사이드바 시스템 =====
window.SidebarManager = {
  sidebar: null,
  toggle: null,
  isCollapsed: false,
  
  init: function() {
    this.sidebar = document.querySelector('.sidebar');
    this.toggle = document.querySelector('.sidebar-toggle');
    
    if (!this.sidebar || !this.toggle) return;
    
    // 토글 버튼 이벤트
    this.toggle.addEventListener('click', () => {
      this.toggleSidebar();
    });
    
    // 저장된 상태 복원
    const savedState = localStorage.getItem('bluerobotAdminSidebarCollapsed');
    if (savedState === 'true') {
      this.collapseSidebar();
    }
    
    // 서브메뉴 토글 이벤트
    this.initSubmenuToggles();
    
    // 반응형 처리
    this.handleResize();
    window.addEventListener('resize', debounce(() => {
      this.handleResize();
    }, 250));
  },
  
  toggleSidebar: function() {
    if (this.isCollapsed) {
      this.expandSidebar();
    } else {
      this.collapseSidebar();
    }
  },
  
  collapseSidebar: function() {
    this.sidebar.classList.add('collapsed');
    this.isCollapsed = true;
    localStorage.setItem('bluerobotAdminSidebarCollapsed', 'true');
    
    // 메인 컨텐츠 여백 조정
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.classList.add('sidebar-collapsed');
    }
  },
  
  expandSidebar: function() {
    this.sidebar.classList.remove('collapsed');
    this.isCollapsed = false;
    localStorage.setItem('bluerobotAdminSidebarCollapsed', 'false');
    
    // 메인 컨텐츠 여백 조정
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.classList.remove('sidebar-collapsed');
    }
  },
  
  initSubmenuToggles: function() {
    const submenuToggles = this.sidebar.querySelectorAll('.nav-link[data-submenu]');
    
    submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleSubmenu(toggle);
      });
    });
  },
  
  toggleSubmenu: function(toggleElement) {
    const submenuId = toggleElement.dataset.submenu;
    const submenu = document.getElementById(submenuId);
    const arrow = toggleElement.querySelector('.nav-arrow');
    
    if (!submenu) return;
    
    if (submenu.style.display === 'none' || !submenu.style.display) {
      submenu.style.display = 'block';
      toggleElement.classList.add('expanded');
      if (arrow) arrow.style.transform = 'rotate(90deg)';
    } else {
      submenu.style.display = 'none';
      toggleElement.classList.remove('expanded');
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
  },
  
  handleResize: function() {
    if (window.innerWidth < 1024) {
      // 모바일에서는 자동으로 접기
      this.sidebar.classList.remove('open');
    }
  },
  
  openMobile: function() {
    this.sidebar.classList.add('open');
  },
  
  closeMobile: function() {
    this.sidebar.classList.remove('open');
  }
};

// ===== 테이블 시스템 =====
window.TableManager = {
  sortDirection: {},
  
  init: function(tableElement) {
    if (!tableElement) return;
    
    // 정렬 가능한 헤더 설정
    const sortableHeaders = tableElement.querySelectorAll('th[data-sort]');
    sortableHeaders.forEach(header => {
      header.style.cursor = 'pointer';
      header.addEventListener('click', () => {
        this.sortTable(tableElement, header.dataset.sort);
      });
      
      // 정렬 아이콘 추가
      if (!header.querySelector('.sort-icon')) {
        header.innerHTML += ' <i class="sort-icon fas fa-sort"></i>';
      }
    });
    
    // 체크박스 전체 선택/해제
    const selectAllCheckbox = tableElement.querySelector('thead input[type="checkbox"]');
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', () => {
        this.toggleSelectAll(tableElement, selectAllCheckbox.checked);
      });
    }
  },
  
  sortTable: function(table, column) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // 현재 정렬 방향 확인
    const currentDirection = this.sortDirection[column] || 'asc';
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    this.sortDirection[column] = newDirection;
    
    // 정렬 아이콘 업데이트
    this.updateSortIcons(table, column, newDirection);
    
    // 행 정렬
    rows.sort((a, b) => {
      const aValue = this.getCellValue(a, column);
      const bValue = this.getCellValue(b, column);
      
      if (newDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    // 정렬된 행들을 다시 추가
    rows.forEach(row => tbody.appendChild(row));
  },
  
  getCellValue: function(row, column) {
    const cell = row.querySelector(`[data-sort="${column}"]`);
    if (!cell) return '';
    
    // 숫자인 경우
    const numericValue = parseFloat(cell.textContent.replace(/[^0-9.-]/g, ''));
    if (!isNaN(numericValue)) {
      return numericValue;
    }
    
    // 날짜인 경우
    const dateValue = Date.parse(cell.textContent);
    if (!isNaN(dateValue)) {
      return dateValue;
    }
    
    // 문자열인 경우
    return cell.textContent.toLowerCase();
  },
  
  updateSortIcons: function(table, activeColumn, direction) {
    const headers = table.querySelectorAll('th[data-sort]');
    
    headers.forEach(header => {
      const icon = header.querySelector('.sort-icon');
      if (!icon) return;
      
      if (header.dataset.sort === activeColumn) {
        icon.className = `sort-icon fas fa-sort-${direction === 'asc' ? 'up' : 'down'}`;
      } else {
        icon.className = 'sort-icon fas fa-sort';
      }
    });
  },
  
  toggleSelectAll: function(table, checked) {
    const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = checked;
    });
  },
  
  getSelectedRows: function(table) {
    const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.closest('tr'));
  }
};

// ===== 탭 시스템 =====
window.TabManager = {
  init: function(tabContainer) {
    if (!tabContainer) return;
    
    const tabLinks = tabContainer.querySelectorAll('.tab-link');
    const tabPanes = tabContainer.querySelectorAll('.tab-pane');
    
    tabLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchTab(tabContainer, link.dataset.tab);
      });
    });
    
    // 첫 번째 탭 활성화
    if (tabLinks.length > 0) {
      this.switchTab(tabContainer, tabLinks[0].dataset.tab);
    }
  },
  
  switchTab: function(container, tabId) {
    const tabLinks = container.querySelectorAll('.tab-link');
    const tabPanes = container.querySelectorAll('.tab-pane');
    
    // 모든 탭 비활성화
    tabLinks.forEach(link => link.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // 선택된 탭 활성화
    const activeLink = container.querySelector(`[data-tab="${tabId}"]`);
    const activePane = container.querySelector(`#${tabId}`);
    
    if (activeLink) activeLink.classList.add('active');
    if (activePane) activePane.classList.add('active');
  }
};

// ===== 초기화 함수들 =====
function initializeSidebar() {
  SidebarManager.init();
}

function initializeNotifications() {
  ToastManager.init();
}

function collapseSidebar() {
  SidebarManager.collapseSidebar();
}

function expandSidebar() {
  SidebarManager.expandSidebar();
}

// ===== 전역 이벤트 리스너 =====
document.addEventListener('DOMContentLoaded', function() {
  // 드롭다운 이벤트 설정
  document.addEventListener('click', function(e) {
    const dropdownToggle = e.target.closest('.dropdown-toggle');
    if (dropdownToggle) {
      e.preventDefault();
      const dropdown = dropdownToggle.closest('.dropdown');
      DropdownManager.toggle(dropdown);
      return;
    }
    
    // 드롭다운 외부 클릭 시 닫기
    if (!e.target.closest('.dropdown')) {
      DropdownManager.closeAll();
    }
  });
  
  // 모달 닫기 버튼 이벤트
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-close') || 
        e.target.closest('.modal-close')) {
      const modal = e.target.closest('.modal-overlay');
      if (modal) {
        closeModal(modal);
      }
    }
  });
  
  // ESC 키로 모달/드롭다운 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
      DropdownManager.closeAll();
    }
  });
  
  // 테이블 자동 초기화
  document.querySelectorAll('.table').forEach(table => {
    TableManager.init(table);
  });
  
  // 탭 자동 초기화
  document.querySelectorAll('.tabs').forEach(tabs => {
    TabManager.init(tabs);
  });
});