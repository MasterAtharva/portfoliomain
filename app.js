// Futuristic Portfolio JavaScript

// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');

// Typing Animation with Futuristic Effect
const typeText = "Hi, I'm Atharva Vedpathak 👋\nAI & Data Science Engineer";
let i = 0;
let isTyping = true;

function typeWriter() {
    if (i < typeText.length && isTyping) {
        if (typeText.charAt(i) === '\n') {
            typingText.innerHTML += '<br>';
        } else {
            typingText.innerHTML += typeText.charAt(i);
        }
        i++;
        
        // Add glitch effect randomly
        if (Math.random() < 0.1) {
            setTimeout(() => {
                typingText.style.textShadow = '2px 0 #ff0080, -2px 0 #00ffff';
                setTimeout(() => {
                    typingText.style.textShadow = 'none';
                }, 50);
            }, 50);
        }
        
        setTimeout(typeWriter, Math.random() * 100 + 50);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
    initParticleSystem();
    initScrollAnimations();
});

// Mobile Menu Toggle with Animation
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Add cyberpunk sound effect simulation
    document.body.style.animation = 'cyberpunk-glitch 0.1s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 100);
});

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Smooth scroll with offset for fixed navbar
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            let offsetTop;
            // Special handling for home section to scroll to top
            if (targetId === '#home') {
                offsetTop = 0;
            } else {
                offsetTop = target.offsetTop - 90;
            }
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const skillHexes = document.querySelectorAll('.skill-hex');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
            
            // Add special effects for different elements
            if (element.classList.contains('skill-hex')) {
                setTimeout(() => {
                    element.style.animation = 'hexGlow 0.5s ease-in-out';
                }, Math.random() * 500);
            }
            
            if (element.classList.contains('project-card')) {
                setTimeout(() => {
                    element.style.transform = 'translateY(0) rotateX(0deg)';
                }, Math.random() * 300);
            }
        }
    });
}

// Animate skill hexagons when they come into view
function animateSkills() {
    const windowHeight = window.innerHeight;
    
    skillHexes.forEach((hex, index) => {
        const hexTop = hex.getBoundingClientRect().top;
        
        if (hexTop < windowHeight - 100 && !hex.classList.contains('animated')) {
            setTimeout(() => {
                hex.classList.add('animated');
                hex.style.animation = 'skillPulse 1s ease-in-out';
                
                // Counter animation for percentage
                const percentage = hex.getAttribute('data-percentage');
                animateCounter(hex, percentage);
            }, index * 100);
        }
    });
}

// Counter animation for skills
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    
    function updateCounter() {
        current += increment;
        if (current < target) {
            element.setAttribute('data-percentage', Math.floor(current) + '%');
            requestAnimationFrame(updateCounter);
        } else {
            element.setAttribute('data-percentage', target + '%');
        }
    }
    
    updateCounter();
}

// Navbar background effect on scroll
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 255, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
}

// Active navigation highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    // Check if we're at the top of the page (home section)
    if (window.scrollY < 100) {
        current = 'home';
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced Particle System
function initParticleSystem() {
    const particlesContainer = document.querySelector('.animated-bg');
    
    // Add more dynamic particles
    for (let i = 9; i <= 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--i', i);
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = `-${Math.random() * 5}s`;
        particle.style.animationDuration = `${3 + Math.random() * 4}s`;
        particlesContainer.appendChild(particle);
    }
    
    // Add floating geometric shapes
    createFloatingShapes();
}

function createFloatingShapes() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.cssText = `
            position: absolute;
            width: ${20 + Math.random() * 40}px;
            height: ${20 + Math.random() * 40}px;
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid rgba(0, 255, 255, 0.3);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatAround ${5 + Math.random() * 10}s ease-in-out infinite;
            z-index: 1;
        `;
        hero.appendChild(shape);
    }
}

// Contact Form with Futuristic Validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Futuristic validation
    if (!name || !email || !message) {
        showCyberNotification('ERROR: All fields required for data transmission.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showCyberNotification('ERROR: Invalid communication protocol format.', 'error');
        return;
    }
    
    // Simulate form submission with cyber effect
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('span').textContent;
    
    // Cyberpunk loading effect
    submitBtn.querySelector('span').innerHTML = 'TRANSMITTING<span class="loading-dots">...</span>';
    submitBtn.disabled = true;
    submitBtn.style.animation = 'cyberPulse 1s ease-in-out infinite';
    
    // Add loading dots animation
    const style = document.createElement('style');
    style.textContent = `
        .loading-dots {
            animation: loadingDots 1s infinite;
        }
        @keyframes loadingDots {
            0%, 20% { content: '.'; }
            40% { content: '..'; }
            60%, 100% { content: '...'; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        showCyberNotification('SUCCESS: Message transmitted successfully! Awaiting response...', 'success');
        this.reset();
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.animation = '';
        style.remove();
    }, 2500);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Cyberpunk Notification System
function showCyberNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.cyber-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `cyber-notification cyber-notification--${type}`;
    
    const typeIcon = {
        success: '✓',
        error: '⚠',
        info: 'ⓘ'
    };
    
    notification.innerHTML = `
        <div class="cyber-notification-content">
            <span class="cyber-notification-icon">${typeIcon[type] || typeIcon.info}</span>
            <span class="cyber-notification-message">${message}</span>
            <button class="cyber-notification-close">×</button>
        </div>
        <div class="cyber-notification-glow"></div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .cyber-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(10, 10, 10, 0.95);
            border: 2px solid var(--cyber-primary);
            border-radius: 15px;
            padding: 1rem;
            backdrop-filter: blur(20px);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            animation: cyberGlow 2s ease-in-out infinite;
        }
        
        .cyber-notification--success {
            border-color: var(--cyber-neon);
        }
        
        .cyber-notification--error {
            border-color: var(--cyber-secondary);
        }
        
        .cyber-notification-content {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            position: relative;
            z-index: 2;
        }
        
        .cyber-notification-icon {
            color: var(--cyber-primary);
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .cyber-notification--success .cyber-notification-icon {
            color: var(--cyber-neon);
        }
        
        .cyber-notification--error .cyber-notification-icon {
            color: var(--cyber-secondary);
        }
        
        .cyber-notification-message {
            color: var(--cyber-text);
            font-size: 0.9rem;
            line-height: 1.4;
            font-family: var(--font-secondary);
            flex: 1;
        }
        
        .cyber-notification-close {
            background: none;
            border: none;
            color: var(--cyber-text-dim);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        
        .cyber-notification-close:hover {
            background: var(--cyber-primary);
            color: var(--cyber-bg-dark);
        }
        
        .cyber-notification.show {
            transform: translateX(0);
        }
        
        .cyber-notification-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, var(--cyber-primary) 0%, transparent 70%);
            opacity: 0.1;
            border-radius: inherit;
        }
        
        @keyframes cyberGlow {
            0%, 100% { box-shadow: 0 0 20px var(--cyber-primary); }
            50% { box-shadow: 0 0 40px var(--cyber-primary); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.cyber-notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification, style);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification, style);
        }
    }, 5000);
}

function closeNotification(notification, style) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 300);
}

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    revealOnScroll();
    animateSkills();
    handleNavbarScroll();
    updateActiveNavLink();
    
    // Parallax effect for hero geometric shapes
    const shapes = document.querySelectorAll('.geometric-shape');
    const scrolled = window.pageYOffset;
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Initialize scroll animations
function initScrollAnimations() {
    // Initial checks
    revealOnScroll();
    animateSkills();
    updateActiveNavLink();
}

// Social Media Link Interactions
const socialLinks = document.querySelectorAll('.social-link, .hero-social-link, .contact-social-link, .footer-social a');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.animation = 'socialPulse 0.5s ease-in-out';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.animation = '';
    });
    
    link.addEventListener('click', (e) => {
        // Add click effect
        link.style.animation = 'socialClick 0.3s ease-in-out';
        setTimeout(() => {
            link.style.animation = '';
        }, 300);
    });
});

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Special animations for different elements
            if (entry.target.classList.contains('about-card')) {
                setTimeout(() => {
                    const stats = entry.target.querySelectorAll('.stat-number');
                    stats.forEach(stat => {
                        animateStatNumber(stat);
                    });
                }, 500);
            }
            
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.style.animation = 'timelineSlide 0.8s ease-out';
            }
        }
    });
}, observerOptions);

// Observe all reveal elements
revealElements.forEach(element => {
    observer.observe(element);
});

// Animate statistics numbers
function animateStatNumber(element) {
    const text = element.textContent;
    const number = parseFloat(text);
    
    if (!isNaN(number)) {
        let current = 0;
        const increment = number / 60;
        
        function updateNumber() {
            current += increment;
            if (current < number) {
                element.textContent = current.toFixed(number % 1 === 0 ? 0 : 2) + text.replace(number.toString(), '');
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = text;
            }
        }
        
        updateNumber();
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close any open notifications
        const notification = document.querySelector('.cyber-notification');
        if (notification) {
            notification.classList.remove('show');
        }
    }
});

// Add custom cursor trail effect (desktop only)
if (window.innerWidth > 768) {
    let cursorTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
        
        updateCursorTrail();
    });
    
    function updateCursorTrail() {
        // Remove existing trail elements
        document.querySelectorAll('.cursor-trail-dot').forEach(dot => dot.remove());
        
        cursorTrail.forEach((point, index) => {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail-dot';
            dot.style.cssText = `
                position: fixed;
                width: ${3 + index}px;
                height: ${3 + index}px;
                background: rgba(0, 255, 255, ${0.8 - (index * 0.08)});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${point.x}px;
                top: ${point.y}px;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(dot);
            
            // Remove after animation
            setTimeout(() => {
                if (dot.parentNode) {
                    dot.remove();
                }
            }, 200);
        });
    }
}

// Add CSS animations dynamically
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes cyberpunk-glitch {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-2px); }
        40% { transform: translateX(2px); }
        60% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
    }
    
    @keyframes hexGlow {
        0%, 100% { box-shadow: 0 0 10px var(--cyber-primary); }
        50% { box-shadow: 0 0 30px var(--cyber-primary), 0 0 40px var(--cyber-primary); }
    }
    
    @keyframes skillPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes cyberPulse {
        0%, 100% { 
            box-shadow: 0 0 20px var(--cyber-primary);
            border-color: var(--cyber-primary);
        }
        50% { 
            box-shadow: 0 0 40px var(--cyber-primary);
            border-color: var(--cyber-secondary);
        }
    }
    
    @keyframes socialPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    @keyframes socialClick {
        0% { transform: scale(1); }
        50% { transform: scale(0.9); }
        100% { transform: scale(1); }
    }
    
    @keyframes timelineSlide {
        0% { 
            opacity: 0;
            transform: translateX(-50px);
        }
        100% { 
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes floatAround {
        0%, 100% { 
            transform: translate(0, 0) rotate(0deg);
        }
        25% { 
            transform: translate(20px, -20px) rotate(90deg);
        }
        50% { 
            transform: translate(-10px, -30px) rotate(180deg);
        }
        75% { 
            transform: translate(-30px, 10px) rotate(270deg);
        }
    }
`;
document.head.appendChild(animationStyles);

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    revealOnScroll();
    animateSkills();
    handleNavbarScroll();
    updateActiveNavLink();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Show welcome message
    setTimeout(() => {
        showCyberNotification('SYSTEM INITIALIZED: Welcome to the future of portfolios!', 'success');
    }, 2000);
});

// Console easter egg
console.log(`
╔══════════════════════════════════════╗
║          CYBER PORTFOLIO             ║
║         SYSTEM ACTIVATED             ║
║                                      ║
║    Atharva Vedpathak                 ║
║    AI & Data Science Engineer        ║
║                                      ║
║    Built with: HTML5, CSS3, JS      ║
║    Theme: Cyberpunk 2030             ║
╚══════════════════════════════════════╝
`);

console.log('🚀 Portfolio system fully operational. All systems green.');