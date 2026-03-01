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
    const sendBtn = document.getElementById('sendMessageBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !message) {
                alert('Please fill in at least your name and your message!');
                return;
            }

            const whatsappMessage = `Hi Adarsh, my name is ${name} (${email}). I have a project inquiry: ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/919747818567?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
        });
    }

});
