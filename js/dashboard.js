// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Require authentication
    if (!requireAuth()) return;

    // Initialize dashboard
    initializeDashboard();
    initializeUserMenu();
    initializeModuleInteractions();
    initializeUpgradeModal();
});

function initializeDashboard() {
    const user = userManager.getUser();
    const progress = progressManager.getProgress();

    // Update user info
    document.getElementById('userName').textContent = user.firstName + ' ' + user.lastName;
    document.getElementById('welcomeName').textContent = user.firstName;
    document.getElementById('userInitials').textContent = user.firstName[0] + user.lastName[0];
    document.getElementById('userPlan').textContent = user.plan === 'starter' ? 'Starter Plan' : 'Pro Learner';

    // Update stats
    document.getElementById('totalTests').textContent = progressManager.getTotalTests();
    document.getElementById('averageScore').textContent = progressManager.getAverageScore() + '%';
    document.getElementById('timeSpent').textContent = progressManager.getTimeSpent() + 'h';

    // Update recent activity
    updateRecentActivity();
}

function initializeUserMenu() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    userMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
    });

    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        userManager.clearUser();
        window.location.href = 'login.html';
    });

    document.addEventListener('click', function() {
        userDropdown.classList.remove('show');
    });
}

function initializeModuleInteractions() {
    // Test button handlers
    document.querySelectorAll('.test-item .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const testItem = this.closest('.test-item');
            const moduleCard = this.closest('.module-card');
            const moduleId = moduleCard.getAttribute('data-module');
            const testName = testItem.querySelector('.test-name').textContent;
            const testType = this.closest('.test-type').querySelector('h4').textContent.includes('Practice') ? 'practice' : 'final';
            
            // Start test
            window.location.href = `test.html?module=${moduleId}&test=${encodeURIComponent(testName)}&type=${testType}`;
        });
    });
}

function initializeUpgradeModal() {
    const upgradeBtn = document.getElementById('upgradeBtn');
    const upgradeModal = document.getElementById('upgradeModal');
    const closeUpgrade = document.getElementById('closeUpgrade');
    const cancelUpgrade = document.getElementById('cancelUpgrade');

    [upgradeBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                upgradeModal.classList.add('show');
            });
        }
    });

    [closeUpgrade, cancelUpgrade].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                upgradeModal.classList.remove('show');
            });
        }
    });

    upgradeModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });
}

function updateRecentActivity() {
    const activityList = document.querySelector('.activity-list');
    const recentActivity = progressManager.getRecentActivity(3);

    if (recentActivity.length === 0) {
        activityList.innerHTML = '<p class="text-center text-muted">No recent activity. Start a test to see your progress!</p>';
        return;
    }

    activityList.innerHTML = recentActivity.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.score >= 80 ? 'success' : activity.score >= 60 ? 'progress' : 'warning'}">
                ${activity.score >= 80 ? '✓' : activity.score >= 60 ? '⏳' : '!'}
            </div>
            <div class="activity-content">
                <h4>Completed ${activity.testId}</h4>
                <p>Scored ${activity.score}% on ${activity.moduleId.replace('-', ' ')} ${activity.testType} test</p>
                <span class="activity-time">${getTimeAgo(activity.timestamp)}</span>
            </div>
            <a href="test-result.html?id=${activity.id}" class="btn btn-sm btn-outline">View Results</a>
        </div>
    `).join('');
}