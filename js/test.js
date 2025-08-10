// Test Interface JavaScript

let currentTest = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let flaggedQuestions = new Set();
let timer = null;
let timeRemaining = 0;

document.addEventListener('DOMContentLoaded', function() {
    if (!requireAuth()) return;

    initializeTest();
    setupEventListeners();
});

function initializeTest() {
    const urlParams = new URLSearchParams(window.location.search);
    const moduleId = urlParams.get('module');
    const testName = urlParams.get('test');
    const testType = urlParams.get('type');

    if (!moduleId || !testName || !testType) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Get questions from question bank
    const questions = QuestionBank.getQuestions(moduleId, testName, testType);
    
    currentTest = {
        moduleId,
        testName,
        testType,
        questions,
        startTime: Date.now()
    };

    // Initialize UI
    document.getElementById('testTitle').textContent = testName;
    document.getElementById('testDescription').textContent = `${testType === 'practice' ? 'Practice Test' : 'Final Mock Test'} - ${questions.length} Questions`;

    // Setup timer for final tests
    if (testType === 'final') {
        timeRemaining = 30 * 60; // 30 minutes
        document.getElementById('testTimer').style.display = 'flex';
        startTimer();
    }

    // Create question navigator
    createQuestionNavigator();
    
    // Load first question
    loadQuestion(0);
}

function setupEventListeners() {
    document.getElementById('prevBtn').addEventListener('click', () => navigateQuestion(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigateQuestion(1));
    document.getElementById('flagBtn').addEventListener('click', toggleFlag);
    document.getElementById('submitBtn').addEventListener('click', showSubmitModal);
    document.getElementById('confirmSubmit').addEventListener('click', submitTest);
    document.getElementById('cancelSubmit').addEventListener('click', hideSubmitModal);
}

function loadQuestion(index) {
    const question = currentTest.questions[index];
    currentQuestionIndex = index;

    document.getElementById('questionText').textContent = question.question;
    document.getElementById('progressText').textContent = `Question ${index + 1} of ${currentTest.questions.length}`;
    
    const progressPercentage = ((index + 1) / currentTest.questions.length) * 100;
    document.getElementById('progressFill').style.width = progressPercentage + '%';

    // Load options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = question.options.map((option, i) => `
        <div class="option" data-index="${i}" onclick="selectOption(${i})">
            ${String.fromCharCode(65 + i)}) ${option}
        </div>
    `).join('');

    // Restore previous answer
    if (userAnswers[question.id] !== undefined) {
        document.querySelector(`[data-index="${userAnswers[question.id]}"]`)?.classList.add('selected');
    }

    // Update navigation
    updateNavigationButtons();
    updateQuestionNavigator();
    updateFlagButton();
}

function selectOption(optionIndex) {
    const question = currentTest.questions[currentQuestionIndex];
    
    // Remove previous selection
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    
    // Add new selection
    document.querySelector(`[data-index="${optionIndex}"]`).classList.add('selected');
    
    // Save answer
    userAnswers[question.id] = optionIndex;
    
    // Update navigator
    updateQuestionNavigator();
}

function navigateQuestion(direction) {
    const newIndex = currentQuestionIndex + direction;
    if (newIndex >= 0 && newIndex < currentTest.questions.length) {
        loadQuestion(newIndex);
    }
}

function createQuestionNavigator() {
    const navigator = document.getElementById('questionNavigator');
    navigator.innerHTML = currentTest.questions.map((_, index) => `
        <div class="nav-number" data-index="${index}" onclick="loadQuestion(${index})">
            ${index + 1}
        </div>
    `).join('');
}

function updateQuestionNavigator() {
    document.querySelectorAll('.nav-number').forEach((num, index) => {
        const question = currentTest.questions[index];
        num.classList.remove('current', 'answered', 'flagged');
        
        if (index === currentQuestionIndex) {
            num.classList.add('current');
        } else if (userAnswers[question.id] !== undefined) {
            num.classList.add('answered');
        }
        
        if (flaggedQuestions.has(question.id)) {
            num.classList.add('flagged');
        }
    });
}

function updateNavigationButtons() {
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    const nextBtn = document.getElementById('nextBtn');
    
    if (currentQuestionIndex === currentTest.questions.length - 1) {
        nextBtn.textContent = 'Review';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function toggleFlag() {
    const question = currentTest.questions[currentQuestionIndex];
    
    if (flaggedQuestions.has(question.id)) {
        flaggedQuestions.delete(question.id);
    } else {
        flaggedQuestions.add(question.id);
    }
    
    updateFlagButton();
    updateQuestionNavigator();
}

function updateFlagButton() {
    const question = currentTest.questions[currentQuestionIndex];
    const flagBtn = document.getElementById('flagBtn');
    
    if (flaggedQuestions.has(question.id)) {
        flagBtn.textContent = 'Unflag';
        flagBtn.classList.add('flagged');
    } else {
        flagBtn.textContent = 'Flag for Review';
        flagBtn.classList.remove('flagged');
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timer);
            submitTest(true); // Auto-submit
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function showSubmitModal() {
    const answeredCount = Object.keys(userAnswers).length;
    const flaggedCount = flaggedQuestions.size;
    const remainingCount = currentTest.questions.length - answeredCount;
    
    document.getElementById('answeredCount').textContent = answeredCount;
    document.getElementById('flaggedCount').textContent = flaggedCount;
    document.getElementById('remainingCount').textContent = remainingCount;
    
    document.getElementById('submitModal').classList.add('show');
}

function hideSubmitModal() {
    document.getElementById('submitModal').classList.remove('show');
}

function submitTest(autoSubmit = false) {
    if (timer) clearInterval(timer);
    
    // Calculate results
    let correctAnswers = 0;
    currentTest.questions.forEach(question => {
        if (userAnswers[question.id] === question.correct) {
            correctAnswers++;
        }
    });
    
    const score = Math.round((correctAnswers / currentTest.questions.length) * 100);
    const timeSpent = Math.floor((Date.now() - currentTest.startTime) / 1000);
    
    // Save results
    const result = progressManager.addTestResult(
        currentTest.moduleId,
        currentTest.testName,
        score,
        timeSpent,
        currentTest.testType
    );
    
    // Redirect to results
    window.location.href = `test-result.html?id=${result.id}`;
}

// Global function for option selection
window.selectOption = selectOption;