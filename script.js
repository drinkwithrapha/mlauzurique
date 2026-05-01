// Smooth scroll for navigation links
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

// Header + nav color switch on scroll (white over hero, dark after)
const header = document.querySelector('.header');
const verticalNav = document.querySelector('.vertical-nav');
const heroSection = document.querySelector('.hero');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const heroHeight = heroSection ? heroSection.offsetHeight - 100 : 500;
    
    if (currentScroll > heroHeight) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.classList.add('scrolled');
        if (verticalNav) verticalNav.classList.add('scrolled');
    } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
        header.classList.remove('scrolled');
        if (verticalNav) verticalNav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to project items
document.querySelectorAll('.project-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Contact form handling (prevent default for demo)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (name && email && message) {
            // In production, this would send to a backend
            alert('Thank you for your message. Manuel will be in touch soon.');
            this.reset();
        }
    });
}

// Active navigation state based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.vertical-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#A0755A';
        }
    });
});
