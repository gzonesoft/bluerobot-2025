// ===== DASHBOARD JAVASCRIPT =====

/**
 * 대시보드 페이지 전용 기능들
 * 차트, 통계, 실시간 데이터 등
 */

// 대시보드 전역 객체
window.Dashboard = {
  charts: {},
  data: {},
  refreshInterval: null,
  
  init: function() {
    this.initializeCharts();
    this.loadDashboardData();
    this.setupEventListeners();
    this.startAutoRefresh();
  },
  
  initializeCharts: function() {
    this.initLeadsChart();
    this.initChannelChart();
  },
  
  loadDashboardData: function() {
    this.loadStats();
    this.loadRecentActivity();
  },
  
  setupEventListeners: function() {
    // 차트 기간 버튼 이벤트
    const chartButtons = document.querySelectorAll('.chart-btn');
    chartButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleChartPeriodChange(e.target);
      });
    });
  },
  
  startAutoRefresh: function() {
    // 30초마다 데이터 새로고침
    this.refreshInterval = setInterval(() => {
      this.refreshData();
    }, 30000);
  },
  
  stopAutoRefresh: function() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
};

// ===== 차트 초기화 =====

// 리드 유입 추이 차트
function initLeadsChart() {
  const ctx = document.getElementById('leadsChart');
  if (!ctx) return;
  
  const chartData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [{
      label: '신규 리드',
      data: [65, 89, 80, 105, 156, 124],
      borderColor: 'rgb(37, 99, 235)',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      tension: 0.4,
      fill: true
    }, {
      label: '전환된 리드',
      data: [28, 35, 42, 58, 67, 82],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };
  
  Dashboard.charts.leads = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 6
        }
      }
    }
  });
}

// 유입 채널 차트
function initChannelChart() {
  const ctx = document.getElementById('channelChart');
  if (!ctx) return;
  
  const chartData = {
    labels: ['검색엔진', '직접방문', '소셜미디어', '이메일', '광고', '기타'],
    datasets: [{
      data: [35, 25, 15, 12, 10, 3],
      backgroundColor: [
        'rgb(37, 99, 235)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(6, 182, 212)',
        'rgb(156, 163, 175)'
      ],
      borderWidth: 0
    }]
  };
  
  Dashboard.charts.channel = new Chart(ctx, {
    type: 'doughnut',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true
          }
        }
      },
      cutout: '60%'
    }
  });
}

// ===== 데이터 로딩 =====

// 통계 데이터 로드
function loadStats() {
  // 실제 구현에서는 API 호출
  const mockStats = {
    totalLeads: 1247,
    conversionRate: 24.8,
    activeUsers: 892,
    pendingInquiries: 23
  };
  
  // 통계 카드 업데이트 (애니메이션 효과)
  animateCountUp('.stat-value', mockStats);
}

// 최근 활동 로드
function loadRecentActivity() {
  // 실제 구현에서는 API 호출
  // 현재는 HTML에 하드코딩된 데이터 사용
  
  // 시간 업데이트
  updateActivityTimes();
}

// ===== 차트 기간 변경 =====
function handleChartPeriodChange(button) {
  const period = button.dataset.period;
  
  // 버튼 활성 상태 변경
  document.querySelectorAll('.chart-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
  
  // 차트 데이터 업데이트
  updateLeadsChart(period);
}

function updateLeadsChart(period) {
  if (!Dashboard.charts.leads) return;
  
  const chart = Dashboard.charts.leads;
  
  // 기간별 모의 데이터
  const mockData = {
    '7days': {
      labels: ['월', '화', '수', '목', '금', '토', '일'],
      leads: [12, 19, 15, 25, 22, 18, 24],
      conversions: [5, 8, 7, 12, 9, 8, 11]
    },
    '30days': {
      labels: ['1주', '2주', '3주', '4주'],
      leads: [89, 105, 124, 98],
      conversions: [35, 42, 58, 45]
    },
    '90days': {
      labels: ['1월', '2월', '3월'],
      leads: [245, 298, 267],
      conversions: [98, 125, 134]
    }
  };
  
  const data = mockData[period] || mockData['7days'];
  
  chart.data.labels = data.labels;
  chart.data.datasets[0].data = data.leads;
  chart.data.datasets[1].data = data.conversions;
  chart.update('active');
}

// ===== 데이터 새로고침 =====
function refreshData() {
  BlueRobotAdmin.log('Refreshing dashboard data...');
  
  // 통계 새로고침
  loadStats();
  
  // 활동 시간 업데이트
  updateActivityTimes();
  
  // 알림 배지 업데이트
  updateNotificationBadges();
}

// ===== 유틸리티 함수들 =====

// 카운트업 애니메이션
function animateCountUp(selector, targetValues) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element, index) => {
    const target = Object.values(targetValues)[index];
    if (typeof target !== 'number') return;
    
    const current = parseInt(element.textContent.replace(/[^0-9.-]/g, '')) || 0;
    const increment = (target - current) / 30; // 30프레임으로 나누어
    let currentValue = current;
    
    const timer = setInterval(() => {
      currentValue += increment;
      
      if ((increment > 0 && currentValue >= target) || 
          (increment < 0 && currentValue <= target)) {
        currentValue = target;
        clearInterval(timer);
      }
      
      // 값 포맷팅
      if (element.textContent.includes('%')) {
        element.textContent = currentValue.toFixed(1) + '%';
      } else {
        element.textContent = Math.floor(currentValue).toLocaleString();
      }
    }, 16); // ~60fps
  });
}

// 활동 시간 업데이트
function updateActivityTimes() {
  const timeElements = document.querySelectorAll('.activity-time');
  
  timeElements.forEach(element => {
    const originalTime = element.dataset.originalTime;
    if (originalTime) {
      const date = new Date(originalTime);
      element.textContent = getRelativeTime(date);
    }
  });
}

// 알림 배지 업데이트
function updateNotificationBadges() {
  // 실제 구현에서는 서버에서 알림 수 가져오기
  const mockNotifications = {
    total: 3,
    leads: 12
  };
  
  // 헤더 알림 배지
  const headerBadge = document.querySelector('.notification-badge');
  if (headerBadge) {
    headerBadge.textContent = mockNotifications.total;
  }
  
  // 사이드바 리드 배지
  const leadsBadge = document.querySelector('.nav-text:contains("리드 관리")').parentElement.querySelector('.nav-badge');
  if (leadsBadge) {
    leadsBadge.textContent = mockNotifications.leads;
  }
}

// ===== 실시간 연결 (향후 구현) =====
function initializeRealTimeConnection() {
  // WebSocket 연결 설정
  // const ws = new WebSocket('ws://localhost:8080/admin');
  
  // ws.onmessage = function(event) {
  //   const data = JSON.parse(event.data);
  //   handleRealTimeUpdate(data);
  // };
}

function handleRealTimeUpdate(data) {
  switch (data.type) {
    case 'new_lead':
      showToast('새로운 리드가 등록되었습니다.', 'success');
      updateLeadCount(data.count);
      break;
      
    case 'new_inquiry':
      showToast('새로운 문의가 접수되었습니다.', 'info');
      updateInquiryCount(data.count);
      break;
      
    case 'system_alert':
      showToast(data.message, 'warning');
      break;
      
    default:
      console.log('Unknown real-time update:', data);
  }
}

// ===== 검색 기능 =====
function initializeSearch() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;
  
  let searchTimeout;
  
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
      const query = this.value.trim();
      if (query.length > 2) {
        performSearch(query);
      }
    }, 300);
  });
}

function performSearch(query) {
  // 실제 구현에서는 서버 검색 API 호출
  BlueRobotAdmin.log('Searching for:', query);
  
  // 모의 검색 결과
  const mockResults = [
    { type: 'lead', title: `${query}와 관련된 리드`, url: 'pages/leads-management.html' },
    { type: 'content', title: `${query} 콘텐츠`, url: 'pages/landing-management.html' }
  ];
  
  showSearchResults(mockResults);
}

function showSearchResults(results) {
  // 검색 결과 드롭다운 표시 (향후 구현)
  console.log('Search results:', results);
}

// ===== 키보드 단축키 =====
function initializeKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K: 검색창 포커스
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }
    
    // Ctrl/Cmd + /: 도움말 (향후 구현)
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      showToast('도움말: Ctrl+K (검색), Ctrl+/ (도움말)', 'info');
    }
  });
}

// ===== 대시보드 초기화 함수 =====
function initializeDashboard() {
  BlueRobotAdmin.log('Initializing dashboard...');
  
  // 차트 초기화
  setTimeout(() => {
    initLeadsChart();
    initChannelChart();
  }, 100);
  
  // 데이터 로드
  Dashboard.loadDashboardData();
  
  // 검색 초기화
  initializeSearch();
  
  // 키보드 단축키 초기화
  initializeKeyboardShortcuts();
  
  // 자동 새로고침 시작
  Dashboard.startAutoRefresh();
  
  // 사이드바 초기화
  initializeSidebar();
  
  BlueRobotAdmin.log('Dashboard initialized successfully');
}

// ===== 페이지 언로드 시 정리 =====
window.addEventListener('beforeunload', function() {
  Dashboard.stopAutoRefresh();
  
  // 차트 정리
  Object.values(Dashboard.charts).forEach(chart => {
    if (chart && typeof chart.destroy === 'function') {
      chart.destroy();
    }
  });
});

// ===== 개발 도구 (개발 환경에서만) =====
if (BlueRobotAdmin.debug) {
  window.DashboardUtils = {
    refreshCharts: function() {
      Object.values(Dashboard.charts).forEach(chart => {
        if (chart && typeof chart.update === 'function') {
          chart.update();
        }
      });
    },
    
    simulateNewLead: function() {
      handleRealTimeUpdate({
        type: 'new_lead',
        count: Math.floor(Math.random() * 100) + 1000
      });
    },
    
    toggleAutoRefresh: function() {
      if (Dashboard.refreshInterval) {
        Dashboard.stopAutoRefresh();
        console.log('Auto refresh stopped');
      } else {
        Dashboard.startAutoRefresh();
        console.log('Auto refresh started');
      }
    }
  };
}