// Pricing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePricing();
    initializeModal();
    initializeFAQ();
});

// Initialize pricing functionality
function initializePricing() {
    const planToggle = document.getElementById('planToggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    const selectPlanButtons = document.querySelectorAll('.select-plan-btn');
    
    // Plan toggle functionality
    if (planToggle) {
        planToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            
            monthlyPrices.forEach(price => {
                price.classList.toggle('active', !isAnnual);
            });
            
            annualPrices.forEach(price => {
                price.classList.toggle('active', isAnnual);
            });
        });
    }
    
    // Select plan button functionality
    selectPlanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planType = this.getAttribute('data-plan');
            const isAnnual = planToggle ? planToggle.checked : false;
            openPaymentModal(planType, isAnnual);
        });
    });
}

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('paymentModal');
    const closeBtn = document.querySelector('.close');
    const paymentForm = document.getElementById('paymentForm');
    
    // Close modal when clicking close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closePaymentModal();
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closePaymentModal();
        }
    });
    
    // Handle form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processPayment();
        });
    }
}

// Initialize FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.maxHeight = '0';
                faqItem.querySelector('.faq-toggle').textContent = '+';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '×';
            }
        });
    });
}

// Open payment modal
function openPaymentModal(planType, isAnnual) {
    const modal = document.getElementById('paymentModal');
    const planNameElement = document.getElementById('selectedPlanName');
    const planPriceElement = document.getElementById('selectedPlanPrice');
    
    // Define plan details
    const plans = {
        basic: {
            name: 'Basic Plan',
            monthly: '₹199/month',
            annual: '₹1,999/year'
        },
        pro: {
            name: 'Pro Plan',
            monthly: '₹299/month',
            annual: '₹2,499/year'
        },
        premium: {
            name: 'Premium Plan',
            monthly: '₹499/month',
            annual: '₹3,999/year'
        }
    };
    
    const selectedPlan = plans[planType];
    const price = isAnnual ? selectedPlan.annual : selectedPlan.monthly;
    
    if (planNameElement) planNameElement.textContent = selectedPlan.name;
    if (planPriceElement) planPriceElement.textContent = price;
    
    // Store selected plan data for form submission
    modal.dataset.planType = planType;
    modal.dataset.isAnnual = isAnnual;
    modal.dataset.planPrice = price;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    const form = document.getElementById('paymentForm');
    if (form) {
        form.reset();
    }
}

// Process payment (simulated)
function processPayment() {
    const modal = document.getElementById('paymentModal');
    const form = document.getElementById('paymentForm');
    const formData = new FormData(form);
    
    const paymentData = {
        planType: modal.dataset.planType,
        isAnnual: modal.dataset.isAnnual,
        planPrice: modal.dataset.planPrice,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        paymentMethod: document.getElementById('paymentMethod').value
    };
    
    // Validate form
    if (!validatePaymentForm(paymentData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // In a real application, you would send this data to your payment processor
        console.log('Payment Data:', paymentData);
        
        // Simulate successful payment
        showPaymentSuccess(paymentData);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        closePaymentModal();
    }, 2000);
}

// Validate payment form
function validatePaymentForm(data) {
    const errors = [];
    
    if (!data.fullName.trim()) errors.push('Full name is required');
    if (!data.email.trim() || !isValidEmail(data.email)) errors.push('Valid email is required');
    if (!data.phone.trim()) errors.push('Phone number is required');
    if (!data.paymentMethod) errors.push('Payment method is required');
    
    if (errors.length > 0) {
        alert('Please fix the following errors:\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show payment success message
function showPaymentSuccess(paymentData) {
    alert(`Payment successful! Welcome to ${paymentData.planPrice} plan.\n\nYou will receive a confirmation email shortly.\n\nRedirecting to dashboard...`);
    
    // Redirect to dashboard after successful payment
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Analytics tracking (simulated)
function trackPlanSelection(planType, isAnnual) {
    console.log('Analytics: Plan selected', { planType, isAnnual });
    // In a real application, send to analytics service
}

function trackPaymentAttempt(paymentData) {
    console.log('Analytics: Payment attempted', paymentData);
    // In a real application, send to analytics service
}