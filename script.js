// Theme toggle functionality
const darkModeIcon = document.querySelector('#darkMode-icon');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('nav');

// Menu toggle functionality
if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuIcon.contains(e.target) && !navbar.contains(e.target)) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    });

    // Close menu when clicking a nav link
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });
}

// Apply theme on page load
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    if (darkModeIcon) {
        darkModeIcon.classList.replace('bx-moon', 'bx-sun');
    }
}

// Theme toggle click handler
if (darkModeIcon) {
    darkModeIcon.onclick = () => {
        // Add a class to body during transition
        document.body.classList.add('theme-transitioning');
        
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            darkModeIcon.classList.replace('bx-moon', 'bx-sun');
            localStorage.setItem('theme', 'light');
        } else {
            darkModeIcon.classList.replace('bx-sun', 'bx-moon');
            localStorage.setItem('theme', 'dark');
        }

        // Remove the transitioning class after the transition is complete
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 500);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Scroll animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.heading, .home-detail, .home-img, .services-box, .experience-card, .portfolio-box, .contact-item, .skill-logo-card');
    
    animatedElements.forEach((el, index) => {
        // Add animation classes based on element type
        if (el.classList.contains('heading')) {
            el.classList.add('fade-in');
        } else if (el.classList.contains('home-detail')) {
            el.classList.add('slide-in-left');
        } else if (el.classList.contains('home-img')) {
            el.classList.add('slide-in-right');
        } else if (el.classList.contains('services-box') || el.classList.contains('portfolio-box')) {
            el.classList.add('fade-in');
        } else if (el.classList.contains('experience-card')) {
            el.classList.add('slide-in-left');
        } else if (el.classList.contains('contact-item')) {
            el.classList.add('fade-in');
        } else if (el.classList.contains('skill-logo-card')) {
            el.classList.add('fade-in');
        }
        
        observer.observe(el);
    });

    // Neon cursor functionality
    let cursor = document.querySelector('.cursor');
    
    // Create cursor if it doesn't exist
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
    }

    // Optimized mouse tracking with throttling
    let ticking = false;
    
    function updateCursor(e) {
        if (!ticking) {
            requestAnimationFrame(() => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                ticking = false;
            });
            ticking = true;
        }
    }

    document.addEventListener('mousemove', updateCursor, { passive: true });

    // Simplified hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, .resume-btn, .social-icon, #darkMode-icon, #menu-icon');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    // Initialize EmailJS with error handling
    try {
        emailjs.init("Otmq-8oi55gBLAwwC");
        console.log("EmailJS initialized successfully");
    } catch (error) {
        console.error("EmailJS initialization error:", error);
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get elements
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn?.querySelector('span');
            const loadingDots = submitBtn?.querySelector('.loading-dots');
            
            if (submitBtn && btnText && loadingDots) {
                // Start loading state
                submitBtn.classList.add('sending');
                loadingDots.classList.add('show');
                btnText.textContent = 'Sending';
                submitBtn.disabled = true;
            }

            try {
                // Get current time
                const now = new Date();
                const timeString = now.toLocaleString();

                // Get form data for the contact form template
                const formData = {
                    title: this.subject.value,
                    name: this.from_name.value,
                    email: this.from_email.value,
                    message: this.message.value,
                    time: timeString
                };

                // Send email (auto-reply will be handled by EmailJS)
                await emailjs.send(
                    'service_iu8ssj2',
                    'template_rghmh9f',
                    formData
                );
                
                // Show success state
                if (submitBtn && loadingDots && btnText) {
                    loadingDots.classList.remove('show');
                    submitBtn.classList.remove('sending');
                    submitBtn.classList.add('success');
                    btnText.textContent = 'Message Sent!';
                }

                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    if (submitBtn && btnText) {
                        submitBtn.classList.remove('success');
                        btnText.textContent = 'Send Message';
                        submitBtn.disabled = false;
                    }
                }, 3000);

            } catch (error) {
                console.error("Error sending email:", error);
                alert('Oops! Something went wrong: ' + error.message);
                
                // Reset button on error
                if (submitBtn && loadingDots && btnText) {
                    submitBtn.classList.remove('sending');
                    loadingDots.classList.remove('show');
                    btnText.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }
            }
        });
    }

    const buttons = document.querySelectorAll('.resume-btn');
    const details = document.querySelectorAll('.resume-detail');

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all buttons
            buttons.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            this.classList.add('active');

            // Hide all details
            details.forEach(detail => detail.classList.remove('active'));
            // Show the one that matches
            const target = this.getAttribute('data-target');
            const targetDetail = document.querySelector('.resume-detail.' + target);
            if(targetDetail) targetDetail.classList.add('active');
        });
    });

    // Portfolio carousel functionality
    const carousels = document.querySelectorAll('.portfolio-carousel');
    
    carousels.forEach(carousel => {
        const imageSlide = carousel.querySelector('.image-slide');
        const progressFill = carousel.querySelector('.progress-fill');
        const currentSlideEl = carousel.querySelector('.slide-counter .current');
        const leftBtn = carousel.parentElement.querySelector('.arrow-left');
        const rightBtn = carousel.parentElement.querySelector('.arrow-right');
        const totalSlides = imageSlide.children.length;
        let currentSlide = 0;
        
        // Function to update slide position and progress
        const updateSlide = (index) => {
            currentSlide = index;
            const progress = ((index + 1) / totalSlides) * 100;
            
            // Update image position with smooth transition
            imageSlide.style.transform = `translateX(-${index * (100 / totalSlides)}%)`;
            
            // Animate progress bar
            progressFill.style.transform = `translateX(${progress - 100}%)`;
            
            // Update counter
            currentSlideEl.textContent = index + 1;
        };
        
        // Initialize progress bar width based on total slides
        progressFill.style.width = `${100}%`;
        progressFill.style.transform = 'translateX(-75%)';
        
        // Navigation buttons
        leftBtn.addEventListener('click', () => {
            const newIndex = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
            updateSlide(newIndex);
        });
        
        rightBtn.addEventListener('click', () => {
            const newIndex = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
            updateSlide(newIndex);
        });
        
        // Touch swipe functionality
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left
                const newIndex = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
                updateSlide(newIndex);
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right
                const newIndex = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
                updateSlide(newIndex);
            }
        };
        
        // Initialize first slide
        updateSlide(0);
    });

    // Keyboard navigation for all carousels
    document.addEventListener('keydown', (e) => {
        const activeCarousel = document.querySelector('.portfolio-carousel');
        if (activeCarousel) {
            const imageSlide = activeCarousel.querySelector('.image-slide');
            const dots = activeCarousel.querySelectorAll('.dot');
            let currentSlide = 0;
            
            // Find current active slide
            dots.forEach((dot, index) => {
                if (dot.classList.contains('active')) {
                    currentSlide = index;
                }
            });

            if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + 3) % 3;
                const translateX = -(currentSlide * 33.333);
                imageSlide.style.transform = `translateX(${translateX}%)`;
                dots.forEach(dot => dot.classList.remove('active'));
                dots[currentSlide].classList.add('active');
            } else if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % 3;
                const translateX = -(currentSlide * 33.333);
                imageSlide.style.transform = `translateX(${translateX}%)`;
                dots.forEach(dot => dot.classList.remove('active'));
                dots[currentSlide].classList.add('active');
            }
        }
    });

    // Typing animation
    const typeText = document.querySelector('.typing-text');
    const words = ['Web Developer', 'Front-End', 'UI/UX'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typeText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isWaiting = true;
            setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
            }, 300);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const typingSpeed = isDeleting ? 30 : 80;
        const delay = isWaiting ? 0 : typingSpeed;

        setTimeout(type, delay);
    }

    // Start typing animation
    type();
});