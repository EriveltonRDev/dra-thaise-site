document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-close');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.add('mobile-open');
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mainNav.classList.remove('mobile-open');
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Testimonials Carousel
    const testimonials = document.querySelector('.testimonials-carousel');
    
    if (testimonials) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonials.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonials.classList.add('active');
            startX = e.pageX - testimonials.offsetLeft;
            scrollLeft = testimonials.scrollLeft;
        });
        
        testimonials.addEventListener('mouseleave', () => {
            isDown = false;
            testimonials.classList.remove('active');
        });
        
        testimonials.addEventListener('mouseup', () => {
            isDown = false;
            testimonials.classList.remove('active');
        });
        
        testimonials.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonials.offsetLeft;
            const walk = (x - startX) * 2;
            testimonials.scrollLeft = scrollLeft - walk;
        });
        
        // Auto scroll testimonials
        let testimonialItems = document.querySelectorAll('.testimonial-item');
        let currentTestimonial = 0;
        
        if (testimonialItems.length > 1) {
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                testimonialItems[currentTestimonial].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                });
            }, 5000);
        }
    }
    
    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Simulate form submission
                const formSuccess = document.querySelector('.form-success');
                const formContent = contactForm.querySelector('.form-content');
                
                if (formSuccess && formContent) {
                    formContent.style.display = 'none';
                    formSuccess.style.display = 'block';
                } else {
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    contactForm.reset();
                }
            }
        });
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('mobile-open')) {
                    mainNav.classList.remove('mobile-open');
                }
            }
        });
    });
    
    // Accessibility - Skip to content
    const skipLink = document.querySelector('.skip-link');
    
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.tabIndex = -1;
                target.focus();
            }
        });
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
