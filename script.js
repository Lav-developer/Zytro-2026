// Set the launch date to February 1, 2026
const launchDate = new Date('February 1, 2026 00:00:00').getTime();

// Update countdown every second
const countdownTimer = setInterval(function() {
    const now = new Date().getTime();
    const distance = launchDate - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the countdown
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    // If countdown is finished
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.querySelector('.countdown').innerHTML = '<h2 style="font-size: 2rem;">🎉 We\'re Live! 🎉</h2>';
    }
}, 1000);

// Handle form submission for Netlify
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();
    
    if (email === '') {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Submit to Netlify
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
    })
    .then(() => {
        showNotification('Thank you! We\'ll notify on launch! 🚀', 'success');
        emailInput.value = '';
    })
    .catch((error) => {
        showNotification('Oops! Something went wrong. Please try again.', 'error');
    });
}

// Email notification function (legacy - now using handleSubmit)
function notifyMe() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();
    
    if (email === '') {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Here you would typically send the email to your backend
    // For demo purposes, we'll just show a success message
    showNotification('Thank you! We\'ll notify on launch! 🚀', 'success');
    emailInput.value = '';
}

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    
    // Update border color based on type
    if (type === 'success') {
        notification.style.borderColor = 'rgba(0, 255, 100, 0.8)';
        notification.style.boxShadow = '0 0 20px rgba(0, 255, 100, 0.4)';
        notification.style.color = '#00ff64';
    } else {
        notification.style.borderColor = 'rgba(255, 50, 100, 0.8)';
        notification.style.boxShadow = '0 0 20px rgba(255, 50, 100, 0.4)';
        notification.style.color = '#ff3264';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Allow Enter key to submit email (now handled by form)

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
