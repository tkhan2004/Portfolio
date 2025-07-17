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

// Mouse Cursor Effect - Fixed and optimized
document.addEventListener('DOMContentLoaded', function() {
    // Only enable custom cursor on desktop
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        // Add class to body to enable cursor hiding
        document.body.classList.add('custom-cursor-active');

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let isMoving = false;

        // Show cursor initially
        cursor.style.opacity = '1';

        // Use requestAnimationFrame for smooth cursor movement
        function updateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.15;
            cursorY += dy * 0.15;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(updateCursor);
        }

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Show cursor when moving
            cursor.style.opacity = '1';
            isMoving = true;

            // Hide cursor after inactivity
            clearTimeout(cursor.hideTimeout);
            cursor.hideTimeout = setTimeout(() => {
                if (!isMoving) {
                    cursor.style.opacity = '0.5';
                }
                isMoving = false;
            }, 2000);
        });

        // Start cursor animation
        updateCursor();

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .review-card, .btn-primary, .btn-contact, .project-btn');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });

        // Handle mouse leave window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });

        // Toggle cursor functionality
        const toggleBtn = document.getElementById('cursor-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                if (document.body.classList.contains('custom-cursor-active')) {
                    document.body.classList.remove('custom-cursor-active');
                    cursor.style.display = 'none';
                    toggleBtn.textContent = '🖱️';
                    toggleBtn.title = 'Enable Custom Cursor';
                } else {
                    document.body.classList.add('custom-cursor-active');
                    cursor.style.display = 'block';
                    toggleBtn.textContent = '✨';
                    toggleBtn.title = 'Disable Custom Cursor';
                }
            });
        }

        // Fallback: if cursor doesn't work, restore default cursor
        setTimeout(() => {
            if (cursor.style.opacity === '0' || !cursor.style.left) {
                document.body.classList.remove('custom-cursor-active');
                cursor.remove();
                if (toggleBtn) {
                    toggleBtn.style.display = 'none';
                }
            }
        }, 3000);
    } else {
        // On mobile or if custom cursor fails, ensure default cursor works
        document.body.style.cursor = 'auto';
        const toggleBtn = document.getElementById('cursor-toggle');
        if (toggleBtn) {
            toggleBtn.style.display = 'none';
        }
    }
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

// Floating Animation for Elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.hero-image-bg, .skill-card');
    
    floatingElements.forEach((element, index) => {
        element.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });
}

// Add floating keyframes to CSS dynamically
const floatingKeyframes = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;

const style = document.createElement('style');
style.textContent = floatingKeyframes;
document.head.appendChild(style);

// Initialize floating animation
document.addEventListener('DOMContentLoaded', addFloatingAnimation);

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

// CSS styles are now in styles.css file

// GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero section animations
        gsap.timeline()
            .from('.hero-content h2', { duration: 1, y: 50, opacity: 0, delay: 1.5 })
            .from('.hero-content h1', { duration: 1, y: 50, opacity: 0, delay: 0.2 })
            .from('.hero-content p', { duration: 1, y: 50, opacity: 0, delay: 0.2 })
            .from('.btn-primary', { duration: 1, y: 50, opacity: 0, delay: 0.2 });

        // Skills cards animation with ScrollTrigger
        gsap.from('.skill-card', {
            duration: 0.8,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Project cards animation
        gsap.from('.project-card', {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Review cards animation
        gsap.from('.review-card', {
            duration: 1,
            x: (index) => index % 2 === 0 ? -100 : 100,
            opacity: 0,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.reviews-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Parallax effect for hero image
        gsap.to('.hero-image', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Text reveal animation for section headers
        const headers = document.querySelectorAll('.skills-header h2, .projects-header h2, .reviews-header h2');
        headers.forEach(header => {
            gsap.from(header, {
                duration: 1,
                y: 50,
                opacity: 0,
                scrollTrigger: {
                    trigger: header,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
});

// Particles.js Background Effect
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '-1';
        particlesContainer.style.pointerEvents = 'none';
        document.body.appendChild(particlesContainer);

        // Initialize particles
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#4A90E2'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.1,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4A90E2',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
});

// Advanced Scroll Animations
function initAdvancedAnimations() {
    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-contact, .project-btn');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px)';
        });
    });

    // Tilt effect for cards
    const tiltElements = document.querySelectorAll('.skill-card, .project-card, .review-card');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Initialize advanced animations
document.addEventListener('DOMContentLoaded', initAdvancedAnimations);

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
