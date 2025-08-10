// Landing page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Animated statistics counter
    const statsElements = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statsElements.forEach(element => {
            const target = element.textContent;
            const isPercentage = target.includes('%');
            const isMultiplier = target.includes('x');
            const isNumber = target.includes('+');
            
            let targetNumber;
            if (isPercentage) {
                targetNumber = parseInt(target);
            } else if (isMultiplier) {
                targetNumber = parseInt(target);
            } else if (isNumber) {
                targetNumber = parseInt(target.replace('+', '').replace('K', '000'));
            } else {
                targetNumber = parseInt(target);
            }
            
            let current = 0;
            const increment = targetNumber / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    current = targetNumber;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(current);
                if (isPercentage) {
                    element.textContent = displayValue + '%';
                } else if (isMultiplier) {
                    element.textContent = displayValue + 'x';
                } else if (isNumber && targetNumber >= 1000) {
                    element.textContent = Math.floor(displayValue / 1000) + 'K+';
                } else {
                    element.textContent = displayValue + '+';
                }
            }, 50);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger stats animation when stats section is visible
                if (entry.target.querySelector('.stats-grid')) {
                    setTimeout(animateStats, 300);
                }
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Module cards interaction
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // Redirect to registration if not logged in
                window.location.href = 'register.html';
            }, 150);
        });
    });

    // Pricing card selection
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            pricingCards.forEach(c => c.classList.remove('selected'));
            // Add active class to clicked card
            this.classList.add('selected');
        });
    });

    // CTA button interaction
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Testimonial rotation (if multiple testimonials exist)
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 1) {
        let currentTestimonial = 0;
        
        setInterval(() => {
            testimonials[currentTestimonial].style.opacity = '0';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            
            setTimeout(() => {
                testimonials.forEach((t, index) => {
                    t.style.display = index === currentTestimonial ? 'block' : 'none';
                    if (index === currentTestimonial) {
                        t.style.opacity = '1';
                    }
                });
            }, 300);
        }, 5000);
    }

    // Add scroll-based parallax effect to hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        });
    }

    // Initialize typed text effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .animate {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .pricing-card.selected {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--bg-primary);
            flex-direction: column;
            padding: var(--spacing-lg);
            box-shadow: var(--shadow-lg);
            transform: translateY(-100%);
            opacity: 0;
            transition: var(--transition);
            z-index: 999;
        }
        
        .nav-links.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .nav-mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);