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
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);

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
        console.log('Contact form found and event listener added');
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Form submitted, starting animation');
            
            // Get elements
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn?.querySelector('span');
            const loadingDots = submitBtn?.querySelector('.loading-dots');
            
            console.log('Button elements:', { submitBtn, btnText, loadingDots });
            
            if (submitBtn && btnText && loadingDots) {
                // Start loading state
                submitBtn.classList.add('sending');
                loadingDots.classList.add('show');
                btnText.textContent = 'Sending';
                submitBtn.disabled = true;
                console.log('Loading state activated');
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
                
                // Add a small delay for better visual feedback
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Show success state
                if (submitBtn && loadingDots && btnText) {
                    loadingDots.classList.remove('show');
                    submitBtn.classList.remove('sending');
                    submitBtn.classList.add('success');
                    btnText.textContent = 'Message Sent!';
                    console.log('Success state activated');
                }

                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    if (submitBtn && btnText) {
                        submitBtn.classList.remove('success');
                        btnText.textContent = 'Send Message';
                        submitBtn.disabled = false;
                        console.log('Form reset to initial state');
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
                    console.log('Error state - form reset');
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

    // Portfolio project selector functionality
    const projectBtns = document.querySelectorAll('.project-btn');
    const projectDetails = document.querySelectorAll('.project-detail');
    
    projectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all buttons and details
            projectBtns.forEach(b => b.classList.remove('active'));
            projectDetails.forEach(detail => detail.classList.remove('active'));
            
            // Add active to clicked button
            this.classList.add('active');
            
            // Show corresponding project detail
            const projectId = this.getAttribute('data-project');
            const targetDetail = document.getElementById(projectId + '-project');
            if (targetDetail) {
                targetDetail.classList.add('active');
                // Reset gallery to first slide for the new project
                resetGallery(targetDetail);
            }
        });
    });

    // Gallery functionality for each project
    function initializeGallery(projectDetail) {
        const carousel = projectDetail.querySelector('.gallery-carousel');
        const slides = carousel.querySelectorAll('.gallery-slide');
        const dots = projectDetail.querySelectorAll('.gallery-dots .dot');
        const prevBtn = projectDetail.querySelector('.gallery-btn.prev');
        const nextBtn = projectDetail.querySelector('.gallery-btn.next');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show current slide
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Update button states
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === totalSlides - 1;
        }
        
        // Event listeners for navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                showSlide(currentSlide);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                showSlide(currentSlide);
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Initialize first slide
        showSlide(0);
    }
    
    function resetGallery(projectDetail) {
        const slides = projectDetail.querySelectorAll('.gallery-slide');
        const dots = projectDetail.querySelectorAll('.gallery-dots .dot');
        
        // Reset to first slide
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (slides[0]) slides[0].classList.add('active');
        if (dots[0]) dots[0].classList.add('active');
        
        // Reinitialize gallery
        initializeGallery(projectDetail);
    }
    
    // Initialize galleries for all projects
    projectDetails.forEach(projectDetail => {
        if (projectDetail.classList.contains('active')) {
            initializeGallery(projectDetail);
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