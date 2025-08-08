// Loading Animation
window.addEventListener('load', function() {
    const loading = document.querySelector('.loading');
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 1000);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Optimized Header Scroll Effect with throttling
let ticking = false;
let lastScrollY = 0;

function updateHeader() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;

    if (scrollY > 100 && !header.classList.contains('scrolled')) {
        header.classList.add('scrolled');
    } else if (scrollY <= 100 && header.classList.contains('scrolled')) {
        header.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
}

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Optimized Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: [0, 0.1, 0.5],
    rootMargin: '50px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            entry.target.classList.add('animated');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 1500);
});

// Optimized Parallax Effect with Intersection Observer
let parallaxTicking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const jsDecoration = document.querySelector('.js-decoration');

    if (heroImage && scrolled < window.innerHeight * 1.5) {
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
    }

    if (jsDecoration && scrolled < window.innerHeight * 2) {
        const rate = scrolled * 0.2;
        jsDecoration.style.transform = `rotate(-45deg) translate3d(0, ${rate}px, 0)`;
    }

    parallaxTicking = false;
}

function onParallaxScroll() {
    if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
}

// Only add parallax on desktop and when elements are visible
if (window.innerWidth > 768) {
    const heroSection = document.querySelector('.hero');
    const skillsSection = document.querySelector('.skills');

    const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.addEventListener('scroll', onParallaxScroll, { passive: true });
            } else {
                window.removeEventListener('scroll', onParallaxScroll);
            }
        });
    }, { rootMargin: '100px' });

    if (heroSection) parallaxObserver.observe(heroSection);
    if (skillsSection) parallaxObserver.observe(skillsSection);
}

// Skill Cards Animation on Hover
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });
});

// Project Cards Stagger Animation
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Trigger project cards animation when section is visible
const projectsSection = document.querySelector('.projects');
if (projectsSection) {
    const projectObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjectCards();
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    projectObserver.observe(projectsSection);
}

// Button Click Effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-contact, .project-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Text Reveal Animation
function revealText(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.3s ease ${index * 0.05}s`;
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Apply text reveal to section headers
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.skills-header h2, .projects-header h2, .reviews-header h2');
    
    const headerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealText(entry.target);
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    headers.forEach(header => headerObserver.observe(header));
});

// Optimized Progress Bar Animation
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    let progressTicking = false;
    let docHeight = document.body.offsetHeight - window.innerHeight;

    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
        progressTicking = false;
    }

    function onProgressScroll() {
        if (!progressTicking) {
            requestAnimationFrame(updateProgress);
            progressTicking = true;
        }
    }

    // Recalculate document height on resize
    window.addEventListener('resize', () => {
        docHeight = document.body.offsetHeight - window.innerHeight;
    }, { passive: true });

    window.addEventListener('scroll', onProgressScroll, { passive: true });
}

// Initialize progress bar
document.addEventListener('DOMContentLoaded', createProgressBar);

// Performance optimization
function optimizeAnimations() {
    // Reduce animations on mobile devices
    if (window.innerWidth < 768) {
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.5s !important;
                transition-duration: 0.3s !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        const animatedElements = document.querySelectorAll('*');
        if (document.hidden) {
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizeAnimations);

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized resize handler
const handleResize = debounce(() => {
    // Recalculate dimensions and update animations
    const heroImage = document.querySelector('.hero-image');
    const jsDecoration = document.querySelector('.js-decoration');

    if (window.innerWidth <= 768) {
        // Disable heavy animations on mobile
        if (heroImage) heroImage.style.transform = 'none';
        if (jsDecoration) jsDecoration.style.transform = 'rotate(-45deg)';
    }
}, 250);

window.addEventListener('resize', handleResize, { passive: true });
