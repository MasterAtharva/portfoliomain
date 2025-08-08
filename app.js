// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');
const downloadResumeBtn = document.getElementById('download-resume');
const matrixCanvas = document.getElementById('matrix-canvas');

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Matrix Rain Animation
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.isRunning = false;
        
        this.resize();
        this.init();
        
        // Pause on mobile for performance
        if (window.innerWidth <= 768) {
            this.pause();
        }
        
        // Handle resize
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.init();
    }
    
    init() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -500;
        }
    }
    
    draw() {
        if (!this.isRunning) return;
        
        // Black background with slight opacity for trail effect
        this.ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Green text
        this.ctx.fillStyle = '#00ff9c';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(text, x, y);
            
            // Reset drop randomly
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.draw());
    }
    
    start() {
        if (!prefersReducedMotion && window.innerWidth > 768) {
            this.isRunning = true;
            this.draw();
        }
    }
    
    pause() {
        this.isRunning = false;
    }
}

// Initialize Matrix Rain
let matrix;
if (matrixCanvas && !prefersReducedMotion) {
    matrix = new MatrixRain(matrixCanvas);
    // Start matrix after a short delay
    setTimeout(() => matrix.start(), 1000);
}

// Typing Animation
const typeText = "hi, i'm atharva vedpathak";
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < typeText.length) {
        typingText.textContent += typeText.charAt(typeIndex);
        typeIndex++;
        const delay = prefersReducedMotion ? 50 : 100;
        setTimeout(typeWriter, delay);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    const delay = prefersReducedMotion ? 100 : 1000;
    setTimeout(typeWriter, delay);
});

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = prefersReducedMotion ? 200 : 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
}

// Animate skill progress bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const windowHeight = window.innerHeight;
    
    skillBars.forEach(bar => {
        const skillSection = bar.closest('.skill-item');
        const sectionTop = skillSection.getBoundingClientRect().top;
        
        if (sectionTop < windowHeight - 100 && !bar.classList.contains('animated')) {
            const percentage = bar.getAttribute('data-percentage');
            const delay = prefersReducedMotion ? 100 : 200;
            setTimeout(() => {
                bar.style.width = percentage + '%';
                bar.classList.add('animated');
            }, delay);
        }
    });
}

// Project Card Flip Functionality - Fixed Implementation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const isFlipped = card.getAttribute('data-flip') === 'true';
        card.setAttribute('data-flip', isFlipped ? 'false' : 'true');
    });
    
    // Allow keyboard navigation
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isFlipped = card.getAttribute('data-flip') === 'true';
            card.setAttribute('data-flip', isFlipped ? 'false' : 'true');
        }
    });
    
    // Make cards focusable
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Click to flip card and view project details');
});

// Navbar background and scrollspy
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    // Update navbar background
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 17, 23, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 156, 0.1)';
    } else {
        navbar.style.background = 'rgba(13, 17, 23, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    // Scrollspy - highlight current section
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll event listeners
let scrollTimeout;
window.addEventListener('scroll', () => {
    // Throttle scroll events for better performance
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        revealOnScroll();
        animateSkillBars();
        handleNavbarScroll();
    }, 10);
});

// Initial reveal and scrollspy check
window.addEventListener('load', () => {
    revealOnScroll();
    animateSkillBars();
    handleNavbarScroll();
});

// Fixed Smooth scrolling for nav links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
});

// Contact Form Submission - Fixed Implementation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Error: Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Error: Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'executing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Success: Message sent successfully! I will get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fixed Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Add notification styles if not present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                background: rgba(13, 17, 23, 0.95);
                border-radius: 8px;
                padding: 1rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                border-left: 4px solid #00ff9c;
                backdrop-filter: blur(10px);
                max-width: 350px;
                border: 1px solid rgba(0, 255, 156, 0.3);
            }
            
            .notification--success {
                border-left-color: #00ff9c;
            }
            
            .notification--error {
                border-left-color: #ff8a00;
            }
            
            .notification--info {
                border-left-color: #00ff9c;
            }
            
            .notification-content {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .notification-message {
                color: #d1d5db;
                font-size: 0.9rem;
                line-height: 1.4;
                font-family: 'Fira Code', monospace;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #d1d5db;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            }
            
            .notification-close:hover {
                background-color: rgba(209, 213, 219, 0.1);
            }
            
            .notification-close:focus-visible {
                outline: 2px solid #00ff9c;
                outline-offset: 2px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                    transform: translateY(-100px);
                }
                
                .notification.show {
                    transform: translateY(0);
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Download Resume functionality
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Info: Resume download initiated. Please connect your actual resume file.', 'info');
    });
}

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Animate skill bars if this is a skill item
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar && !progressBar.classList.contains('animated')) {
                    const percentage = progressBar.getAttribute('data-percentage');
                    const delay = prefersReducedMotion ? 100 : 300;
                    setTimeout(() => {
                        progressBar.style.width = percentage + '%';
                        progressBar.classList.add('animated');
                    }, delay);
                }
            }
        }
    });
}, observerOptions);

// Observe all reveal elements
revealElements.forEach(element => {
    observer.observe(element);
});

// Add glitch effect to terminal elements
const glitchElements = document.querySelectorAll('.terminal-card, .project-card, .btn');
glitchElements.forEach(element => {
    element.classList.add('glitch');
});

// Ripple effect for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (prefersReducedMotion) return;
        
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(0, 255, 156, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        // Add ripple keyframes if not exists
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Pause matrix animation when page is not visible for performance
document.addEventListener('visibilitychange', () => {
    if (matrix) {
        if (document.hidden) {
            matrix.pause();
        } else if (window.innerWidth > 768) {
            matrix.start();
        }
    }
});

// Handle window resize for mobile/desktop matrix toggle
window.addEventListener('resize', () => {
    if (matrix) {
        if (window.innerWidth <= 768) {
            matrix.pause();
        } else {
            matrix.start();
        }
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = prefersReducedMotion ? 'opacity 0.1s ease' : 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, prefersReducedMotion ? 50 : 200);
});

// Console easter egg
console.log(`
 █████╗ ████████╗██╗  ██╗ █████╗ ██████╗ ██╗   ██╗ █████╗ 
██╔══██╗╚══██╔══╝██║  ██║██╔══██╗██╔══██╗██║   ██║██╔══██╗
███████║   ██║   ███████║███████║██████╔╝██║   ██║███████║
██╔══██║   ██║   ██╔══██║██╔══██║██╔══██╗╚██╗ ██╔╝██╔══██║
██║  ██║   ██║   ██║  ██║██║  ██║██║  ██║ ╚████╔╝ ██║  ██║
╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝

Welcome to the matrix, fellow hacker! 🔰
Ethical hacking enthusiast exploring the digital realm.
Contact: atharvav.official@gmail.com
`);

console.log('Portfolio loaded successfully! Matrix is running...');

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + H for home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        document.querySelector('#home').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
    
    // Alt + C for contact
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
    
    // Alt + P for projects
    if (e.altKey && e.key === 'p') {
        e.preventDefault();
        document.querySelector('#projects').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
});