/* =========================================
   Clean URL Parameters (Remove Tracking Links)
   ========================================= */
// Wait for the window to load so we don't interfere with analytic tools like Meta Pixel
window.addEventListener('load', () => {
    if (window.history && window.history.replaceState && window.location.search) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }
});

/* =========================================
   Scroll Reveal Animation
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // play once
            }
        });
    }, observerOptions);

    // Apply observer to all reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));


    /* =========================================
       Sticky Navbar Scrolled State
       ========================================= */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       Smooth Scrolling for Anchor Links
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================================
       Subtle Parallax for Hero Background Glows
       ========================================= */
    const hero = document.querySelector('.hero');
    const glows = document.querySelectorAll('.glow');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollVal = window.scrollY;
            if (scrollVal < window.innerHeight) {
                glows[0].style.transform = `translateY(${scrollVal * 0.4}px)`;
                if (glows[1]) {
                    glows[1].style.transform = `translateY(${scrollVal * -0.2}px)`;
                }
            }
        });
    }
    /* =========================================
       WhatsApp Contact Form Integration
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission to server

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Change button state for feedback
            const submitBtn = document.getElementById('sendMessageBtn');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Opening WhatsApp...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;

            const whatsappMessage = `Hi Adarsh, my name is ${name} (${email}). I have a project inquiry: ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/919747818567?text=${encodedMessage}`;

            // Small delay for visual feedback before redirecting
            setTimeout(() => {
                window.location.href = whatsappURL;

                // Reset button after a while in case they come back
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.opacity = "1";
                    submitBtn.disabled = false;
                }, 2000);
            }, 500);
        });
    }

    /* =========================================
       Custom Cursor
       ========================================= */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if cursor elements exist
    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows instantly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Loop for outline (smooth trailing effect)
        const animateCursor = () => {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            
            outlineX += distX * 0.15;
            outlineY += distY * 0.15;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Add hover effect to interactive elements
        const iteractives = document.querySelectorAll('a, button, .service-card, .pricing-card, input, textarea');
        iteractives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    /* =========================================
       Typewriter Effect
       ========================================= */
    const typeWriterElement = document.querySelector('.typewriter-text');
    if (typeWriterElement) {
        const words = ['modern web solutions.', 'premium, scalable apps.', 'high-performance products.'];
        let wait = 2000;
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const current = wordIndex % words.length;
            const fullTxt = words[current];

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typeWriterElement.innerText = fullTxt.substring(0, charIndex);

            let typeSpeed = 80;
            if (isDeleting) typeSpeed /= 2;

            if (!isDeleting && charIndex === fullTxt.length) {
                typeSpeed = wait;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex++;
                typeSpeed = 400; // pause before typing next string
            }

            setTimeout(type, typeSpeed);
        };
        
        // start after 1 sec
        setTimeout(type, 1000);
    }

    /* =========================================
       3D Tilt Effect on Cards
       ========================================= */
    const cards = document.querySelectorAll('.service-card, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max rotation is 10deg)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none';
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
            card.style.transition = 'all var(--transition-base)';
        });
        
        card.addEventListener('mouseenter', function() {
            // prevent jitter on enter
            card.style.transition = 'none'; 
        });
    });

});
