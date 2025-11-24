const themeToggle = document.getElementById('switch');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
themeToggle.checked = savedTheme === 'dark';

themeToggle.addEventListener('change', function() {
    const newTheme = this.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

const header = document.getElementById('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const navLinks = document.querySelectorAll('.nav-list a');
const sections = document.querySelectorAll('.sections');

window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

function showNotification(title, message, type = 'success') {
    const container = document.getElementById('notification-container');
    if (!container) {
        console.error("Notification container not found.");
        return;
    }

    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    
    const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';
    
    notification.innerHTML = `
        <i class="bi ${icon}"></i>
        <div class="notification-content">
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;

    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        
        name.classList.remove('invalid');
        email.classList.remove('invalid');
        message.classList.remove('invalid');

        if (!name.value.trim()) {
            nameError.textContent = 'Name is required';
            name.classList.add('invalid');
            isValid = false;
        }

        if (!email.value.trim()) {
            emailError.textContent = 'Email is required';
            email.classList.add('invalid');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            email.classList.add('invalid');
            isValid = false;
        }

        if (!message.value.trim()) {
            messageError.textContent = 'Message is required';
            message.classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            showNotification('Success', 'Your message has been sent successfully!', 'success');
            this.reset();
        } else {
            showNotification('Error', 'Please correct the fields in red.', 'error');
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

class TypeWriter {
    constructor(element, words, wait = 2000) {
        this.element = element;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.typingSpeed = 90;
        this.startTyping();
    }

    startTyping() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.txt = currentWord.substring(0, this.txt.length - 1);
        } else {
            this.txt = currentWord.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="wrap">${this.txt}</span>`;

        let speed = this.typingSpeed;

        if (this.isDeleting) {
            speed /= 2;
        }

        if (!this.isDeleting && this.txt === currentWord) {
            speed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            speed = 500;
        }

        setTimeout(() => this.startTyping(), speed);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById("typewriter-text");

    if (target) {
        new TypeWriter(target, [
            "Web Developer",
            "Content Creator",
            "UIUX Designer",
            "Frontend Developer",
            "Backend Developer",
            "Java Developer",
            "Full Stack Java Developer",
            "MERN Stack Developer"
        ], 1000);
    }
});

const animateOnScroll = function() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
            
            const delay = element.getAttribute('data-delay');
            if (delay) {
                element.style.transitionDelay = delay;
            }
        }
    });
};

window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    setTimeout(animateOnScroll, 100);
    
    window.addEventListener('scroll', animateOnScroll);
});