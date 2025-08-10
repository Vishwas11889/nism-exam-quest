// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Redirect if already logged in
    if (redirectIfLoggedIn()) {
        return;
    }

    // Initialize form handlers
    initializeRegisterForm();
    initializeLoginForm();
    initializeSocialAuth();
});

function initializeRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        FormValidator.clearAllErrors('registerForm');
        
        // Get form data
        const formData = new FormData(this);
        const firstName = formData.get('firstName').trim();
        const lastName = formData.get('lastName').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const agreeTerms = formData.get('agreeTerms');
        
        // Validation
        let hasError = false;
        
        if (!FormValidator.validateName(firstName)) {
            FormValidator.showError('firstName', 'First name must be at least 2 characters');
            hasError = true;
        }
        
        if (!FormValidator.validateName(lastName)) {
            FormValidator.showError('lastName', 'Last name must be at least 2 characters');
            hasError = true;
        }
        
        if (!FormValidator.validateEmail(email)) {
            FormValidator.showError('email', 'Please enter a valid email address');
            hasError = true;
        }
        
        if (!FormValidator.validatePassword(password)) {
            FormValidator.showError('password', 'Password must be at least 8 characters with letters and numbers');
            hasError = true;
        }
        
        if (password !== confirmPassword) {
            FormValidator.showError('confirmPassword', 'Passwords do not match');
            hasError = true;
        }
        
        if (!agreeTerms) {
            FormValidator.showError('agreeTerms', 'You must agree to the Terms of Service');
            hasError = true;
        }
        
        if (hasError) {
            return;
        }
        
        // Show loading state
        LoadingManager.showButtonLoading('registerBtn');
        
        try {
            // Simulate API call
            await simulateAPICall('register', { firstName, lastName, email, password });
            
            // Create user object
            const user = {
                id: Date.now(),
                firstName,
                lastName,
                email,
                plan: 'starter',
                registrationDate: new Date().toISOString(),
                emailVerified: false
            };
            
            // Save user
            userManager.saveUser(user);
            
            // Show success message
            alertManager.show('Account created successfully! Please check your email for verification.', 'success');
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
            
        } catch (error) {
            alertManager.show(error.message || 'Registration failed. Please try again.', 'error');
        } finally {
            LoadingManager.hideButtonLoading('registerBtn');
        }
    });
}

function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        FormValidator.clearAllErrors('loginForm');
        
        // Get form data
        const formData = new FormData(this);
        const email = formData.get('email').trim();
        const password = formData.get('password');
        const rememberMe = formData.get('rememberMe');
        
        // Validation
        let hasError = false;
        
        if (!FormValidator.validateEmail(email)) {
            FormValidator.showError('email', 'Please enter a valid email address');
            hasError = true;
        }
        
        if (!password) {
            FormValidator.showError('password', 'Password is required');
            hasError = true;
        }
        
        if (hasError) {
            return;
        }
        
        // Show loading state
        LoadingManager.showButtonLoading('loginBtn');
        
        try {
            // Simulate API call
            await simulateAPICall('login', { email, password });
            
            // Check if user exists in localStorage (for demo)
            let user = findUserByEmail(email);
            
            if (!user) {
                // Create demo user if not exists
                user = {
                    id: Date.now(),
                    firstName: 'Demo',
                    lastName: 'User',
                    email,
                    plan: 'starter',
                    registrationDate: new Date().toISOString(),
                    emailVerified: true
                };
            }
            
            // Save user session
            userManager.saveUser(user);
            
            // Show success message
            alertManager.show('Login successful! Redirecting to dashboard...', 'success');
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
        } catch (error) {
            alertManager.show(error.message || 'Login failed. Please check your credentials.', 'error');
        } finally {
            LoadingManager.hideButtonLoading('loginBtn');
        }
    });
}

function initializeSocialAuth() {
    // Google Sign In
    const googleSignupBtn = document.getElementById('googleSignup');
    const googleSigninBtn = document.getElementById('googleSignin');
    
    if (googleSignupBtn) {
        googleSignupBtn.addEventListener('click', function() {
            handleGoogleAuth('signup');
        });
    }
    
    if (googleSigninBtn) {
        googleSigninBtn.addEventListener('click', function() {
            handleGoogleAuth('signin');
        });
    }
}

async function handleGoogleAuth(action) {
    try {
        // Simulate Google OAuth flow
        alertManager.show('Google authentication is not available in this demo. Please use email registration.', 'warning');
        
        // In a real implementation, you would:
        // 1. Initialize Google OAuth SDK
        // 2. Handle the authentication flow
        // 3. Receive user data from Google
        // 4. Create/login user in your system
        
    } catch (error) {
        alertManager.show('Google authentication failed. Please try again.', 'error');
    }
}

function findUserByEmail(email) {
    // In a real app, this would be an API call
    // For demo purposes, check localStorage
    const allUsers = JSON.parse(localStorage.getItem('nism_all_users') || '[]');
    return allUsers.find(user => user.email === email);
}

async function simulateAPICall(action, data) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate different scenarios
    const random = Math.random();
    
    if (action === 'register') {
        // Check if email already exists (simulate)
        const existingUser = findUserByEmail(data.email);
        if (existingUser) {
            throw new Error('An account with this email already exists');
        }
        
        // Simulate success
        if (random > 0.1) {
            // Save to demo storage
            const allUsers = JSON.parse(localStorage.getItem('nism_all_users') || '[]');
            allUsers.push({
                ...data,
                id: Date.now(),
                registrationDate: new Date().toISOString()
            });
            localStorage.setItem('nism_all_users', JSON.stringify(allUsers));
            return { success: true };
        } else {
            throw new Error('Registration failed. Please try again.');
        }
    }
    
    if (action === 'login') {
        // For demo, accept any email/password combination
        if (random > 0.05) {
            return { success: true, user: data };
        } else {
            throw new Error('Invalid email or password');
        }
    }
}

// Form input enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Real-time validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !FormValidator.validateEmail(this.value)) {
                FormValidator.showError(this.id, 'Please enter a valid email address');
            } else {
                FormValidator.clearError(this.id);
            }
        });
    });
    
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.name === 'password') {
            input.addEventListener('blur', function() {
                if (this.value && !FormValidator.validatePassword(this.value)) {
                    FormValidator.showError(this.id, 'Password must be at least 8 characters with letters and numbers');
                } else {
                    FormValidator.clearError(this.id);
                }
            });
        }
        
        if (input.name === 'confirmPassword') {
            input.addEventListener('blur', function() {
                const passwordField = document.querySelector('input[name="password"]');
                if (this.value && passwordField && this.value !== passwordField.value) {
                    FormValidator.showError(this.id, 'Passwords do not match');
                } else {
                    FormValidator.clearError(this.id);
                }
            });
        }
    });
    
    // Name validation
    const nameInputs = document.querySelectorAll('input[name="firstName"], input[name="lastName"]');
    nameInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !FormValidator.validateName(this.value)) {
                FormValidator.showError(this.id, 'Name must be at least 2 characters');
            } else {
                FormValidator.clearError(this.id);
            }
        });
    });
    
    // Clear errors on input
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                FormValidator.clearError(this.id);
            }
        });
    });
});

// Password strength indicator
function addPasswordStrengthIndicator() {
    const passwordInput = document.querySelector('input[name="password"]');
    if (!passwordInput) return;
    
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength';
    strengthIndicator.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill"></div>
        </div>
        <div class="strength-text">Password strength</div>
    `;
    
    passwordInput.parentNode.appendChild(strengthIndicator);
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        const fill = strengthIndicator.querySelector('.strength-fill');
        const text = strengthIndicator.querySelector('.strength-text');
        
        fill.style.width = `${strength.percentage}%`;
        fill.className = `strength-fill ${strength.level}`;
        text.textContent = strength.text;
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 25;
    if (/[a-z]/.test(password)) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 10;
    
    if (score <= 25) return { percentage: 25, level: 'weak', text: 'Weak password' };
    if (score <= 50) return { percentage: 50, level: 'fair', text: 'Fair password' };
    if (score <= 75) return { percentage: 75, level: 'good', text: 'Good password' };
    return { percentage: 100, level: 'strong', text: 'Strong password' };
}

// Initialize password strength indicator
document.addEventListener('DOMContentLoaded', addPasswordStrengthIndicator);