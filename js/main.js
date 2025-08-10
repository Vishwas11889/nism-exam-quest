// Main JavaScript - Global utilities and shared functionality

// User management
class UserManager {
    constructor() {
        this.user = null;
        this.loadUser();
    }

    loadUser() {
        const userData = localStorage.getItem('nism_user');
        if (userData) {
            this.user = JSON.parse(userData);
        }
    }

    saveUser(user) {
        this.user = user;
        localStorage.setItem('nism_user', JSON.stringify(user));
    }

    clearUser() {
        this.user = null;
        localStorage.removeItem('nism_user');
    }

    getUser() {
        return this.user;
    }

    isLoggedIn() {
        return this.user !== null;
    }

    updateUser(updates) {
        if (this.user) {
            this.user = { ...this.user, ...updates };
            this.saveUser(this.user);
        }
    }
}

// Test progress management
class ProgressManager {
    constructor() {
        this.progress = this.loadProgress();
    }

    loadProgress() {
        const progress = localStorage.getItem('nism_progress');
        return progress ? JSON.parse(progress) : {
            totalTests: 0,
            totalScore: 0,
            timeSpent: 0,
            modules: {
                'mutual-funds': { completed: [], scores: [], progress: 0 },
                'equity-derivatives': { completed: [], scores: [], progress: 0 },
                'currency-derivatives': { completed: [], scores: [], progress: 0 }
            },
            history: []
        };
    }

    saveProgress() {
        localStorage.setItem('nism_progress', JSON.stringify(this.progress));
    }

    addTestResult(moduleId, testId, score, timeSpent, testType) {
        const result = {
            id: Date.now(),
            moduleId,
            testId,
            score,
            timeSpent,
            testType,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };

        // Add to history
        this.progress.history.unshift(result);
        
        // Update module progress
        if (!this.progress.modules[moduleId].completed.includes(testId)) {
            this.progress.modules[moduleId].completed.push(testId);
        }
        this.progress.modules[moduleId].scores.push(score);
        
        // Update totals
        this.progress.totalTests++;
        this.progress.totalScore = ((this.progress.totalScore * (this.progress.totalTests - 1)) + score) / this.progress.totalTests;
        this.progress.timeSpent += timeSpent;
        
        // Update module progress percentage
        this.updateModuleProgress(moduleId);
        
        this.saveProgress();
        return result;
    }

    updateModuleProgress(moduleId) {
        const moduleData = this.getModuleData(moduleId);
        const completed = this.progress.modules[moduleId].completed.length;
        const total = moduleData.practiceTests + moduleData.finalTests;
        this.progress.modules[moduleId].progress = Math.round((completed / total) * 100);
    }

    getModuleData(moduleId) {
        const modules = {
            'mutual-funds': { practiceTests: 5, finalTests: 2, totalQuestions: 150 },
            'equity-derivatives': { practiceTests: 8, finalTests: 3, totalQuestions: 200 },
            'currency-derivatives': { practiceTests: 4, finalTests: 2, totalQuestions: 100 }
        };
        return modules[moduleId] || { practiceTests: 0, finalTests: 0, totalQuestions: 0 };
    }

    getProgress() {
        return this.progress;
    }

    getAverageScore() {
        return Math.round(this.progress.totalScore || 0);
    }

    getTotalTests() {
        return this.progress.totalTests;
    }

    getTimeSpent() {
        const hours = Math.round(this.progress.timeSpent / 3600);
        return hours;
    }

    getModuleProgress(moduleId) {
        return this.progress.modules[moduleId] || { completed: [], scores: [], progress: 0 };
    }

    getRecentActivity(limit = 5) {
        return this.progress.history.slice(0, limit);
    }
}

// Alert management
class AlertManager {
    show(message, type = 'info', containerId = 'alert-container') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const alert = document.createElement('div');
        alert.className = `alert alert-${type} show`;
        alert.innerHTML = `
            <div class="alert-content">
                <span>${message}</span>
                <button class="alert-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;

        container.innerHTML = '';
        container.appendChild(alert);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, 5000);
    }

    clear(containerId = 'alert-container') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
        }
    }
}

// Form validation utilities
class FormValidator {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePassword(password) {
        // At least 8 characters, letters and numbers
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    }

    static validateName(name) {
        return name.trim().length >= 2;
    }

    static showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.add('error');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    static clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.remove('error');
        }
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    static clearAllErrors(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        const errorElements = form.querySelectorAll('.form-error.show');
        errorElements.forEach(element => {
            element.classList.remove('show');
            element.textContent = '';
        });

        const errorFields = form.querySelectorAll('.form-input.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }
}

// Loading state management
class LoadingManager {
    static showButtonLoading(buttonId) {
        const button = document.getElementById(buttonId);
        const spinner = button?.querySelector('.spinner');
        const text = button?.querySelector('.btn-text');
        
        if (button) {
            button.classList.add('loading');
            button.disabled = true;
        }
        if (spinner) spinner.classList.remove('hidden');
        if (text) text.classList.add('hidden');
    }

    static hideButtonLoading(buttonId) {
        const button = document.getElementById(buttonId);
        const spinner = button?.querySelector('.spinner');
        const text = button?.querySelector('.btn-text');
        
        if (button) {
            button.classList.remove('loading');
            button.disabled = false;
        }
        if (spinner) spinner.classList.add('hidden');
        if (text) text.classList.remove('hidden');
    }
}

// Question bank - Sample data for demo
class QuestionBank {
    static getQuestions(moduleId, testId, testType) {
        const questions = this.getAllQuestions();
        const moduleQuestions = questions[moduleId] || [];
        
        // For practice tests, return subset of questions
        if (testType === 'practice') {
            return this.shuffleArray(moduleQuestions).slice(0, 25);
        }
        
        // For final tests, return full set
        return this.shuffleArray(moduleQuestions).slice(0, 50);
    }

    static shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    static getAllQuestions() {
        return {
            'mutual-funds': [
                {
                    id: 1,
                    question: "What is the primary benefit of mutual fund investment?",
                    options: [
                        "Guaranteed returns",
                        "Professional management and diversification",
                        "No market risk",
                        "Fixed income generation"
                    ],
                    correct: 1,
                    explanation: "Mutual funds offer professional management and diversification, which helps reduce risk and potentially improve returns through expert portfolio management."
                },
                {
                    id: 2,
                    question: "How is NAV (Net Asset Value) calculated?",
                    options: [
                        "Total assets / Number of shares",
                        "(Total assets - Total liabilities) / Outstanding units",
                        "Market price / Book value",
                        "Total income / Total expenses"
                    ],
                    correct: 1,
                    explanation: "NAV is calculated by subtracting total liabilities from total assets and dividing by the number of outstanding units."
                },
                {
                    id: 3,
                    question: "Which of the following is NOT a type of mutual fund?",
                    options: [
                        "Equity Fund",
                        "Debt Fund",
                        "Hybrid Fund",
                        "Insurance Fund"
                    ],
                    correct: 3,
                    explanation: "Insurance Fund is not a type of mutual fund. The main types are Equity, Debt, and Hybrid funds."
                },
                {
                    id: 4,
                    question: "What is the expense ratio in mutual funds?",
                    options: [
                        "Ratio of expenses to total assets",
                        "Ratio of income to expenses",
                        "Ratio of equity to debt",
                        "Ratio of returns to investment"
                    ],
                    correct: 0,
                    explanation: "Expense ratio is the annual fee charged by mutual funds, expressed as a percentage of total assets under management."
                },
                {
                    id: 5,
                    question: "What is SIP in mutual funds?",
                    options: [
                        "Single Investment Plan",
                        "Systematic Investment Plan",
                        "Special Investment Plan",
                        "Simple Investment Plan"
                    ],
                    correct: 1,
                    explanation: "SIP stands for Systematic Investment Plan, which allows investors to invest a fixed amount regularly in mutual funds."
                }
            ],
            'equity-derivatives': [
                {
                    id: 1,
                    question: "What is a call option?",
                    options: [
                        "Right to sell an asset",
                        "Right to buy an asset",
                        "Obligation to buy an asset",
                        "Obligation to sell an asset"
                    ],
                    correct: 1,
                    explanation: "A call option gives the holder the right (not obligation) to buy an underlying asset at a specified price within a specific time period."
                },
                {
                    id: 2,
                    question: "What happens when a futures contract expires?",
                    options: [
                        "It automatically renews",
                        "Physical delivery or cash settlement",
                        "The contract becomes void",
                        "Premium is refunded"
                    ],
                    correct: 1,
                    explanation: "Upon expiration, futures contracts are settled either through physical delivery of the underlying asset or cash settlement."
                }
            ],
            'currency-derivatives': [
                {
                    id: 1,
                    question: "What is currency hedging?",
                    options: [
                        "Speculating on currency movements",
                        "Protecting against currency risk",
                        "Converting one currency to another",
                        "Fixing exchange rates"
                    ],
                    correct: 1,
                    explanation: "Currency hedging is a strategy to protect against adverse currency movements that could affect international investments or business operations."
                }
            ]
        };
    }
}

// Global instances
const userManager = new UserManager();
const progressManager = new ProgressManager();
const alertManager = new AlertManager();

// Utility functions
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
}

// Navigation protection
function requireAuth() {
    if (!userManager.isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function redirectIfLoggedIn() {
    if (userManager.isLoggedIn()) {
        window.location.href = 'dashboard.html';
        return true;
    }
    return false;
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips, modals, and other interactive elements
    initializeInteractiveElements();
});

function initializeInteractiveElements() {
    // Modal functionality
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show');
            }
        });
    });

    document.querySelectorAll('.modal-close, .modal-overlay').forEach(element => {
        element.addEventListener('click', function(e) {
            if (e.target === this) {
                const modal = this.closest('.modal-overlay');
                if (modal) {
                    modal.classList.remove('show');
                }
            }
        });
    });

    // Dropdown functionality
    document.querySelectorAll('[data-dropdown]').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdownId = this.getAttribute('data-dropdown');
            const dropdown = document.getElementById(dropdownId);
            if (dropdown) {
                dropdown.classList.toggle('show');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown.show, .user-dropdown.show').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    });
}

// Export for use in other files
window.userManager = userManager;
window.progressManager = progressManager;
window.alertManager = alertManager;
window.FormValidator = FormValidator;
window.LoadingManager = LoadingManager;
window.QuestionBank = QuestionBank;
window.requireAuth = requireAuth;
window.redirectIfLoggedIn = redirectIfLoggedIn;
window.formatTime = formatTime;
window.formatDate = formatDate;
window.getTimeAgo = getTimeAgo;