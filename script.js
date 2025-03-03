// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀' : '☾';
});

// Scroll to Section
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Countdown Timer
function startTimer() {
    const listingDate = new Date('2025-04-01T00:00:00').getTime();
    const timer = document.getElementById('timer');
    setInterval(() => {
        const now = new Date().getTime();
        const distance = listingDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}
startTimer();

// Particle Background
const canvas = document.getElementById('particle-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Ticker Updates
function updateTicker() {
    const price = document.getElementById('price');
    const volume = document.getElementById('volume');
    setInterval(() => {
        price.textContent = (Math.random() * 0.5 + 0.5).toFixed(2);
        volume.textContent = Math.floor(Math.random() * 10000 + 10000).toLocaleString();
    }, 5000);
}
updateTicker();

// Tokenomics Chart
const svg = document.getElementById('token-chart');
const data = [30, 25, 20, 25]; // Example allocation
let startAngle = 0;
data.forEach((value, i) => {
    const angle = (value / 100) * 360;
    const radians = (startAngle + angle) * Math.PI / 180;
    const x = 150 + 100 * Math.cos(radians);
    const y = 150 + 100 * Math.sin(radians);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M150,150 L150,50 A100,100 0 ${angle > 180 ? 1 : 0},1 ${x},${y} Z`);
    path.setAttribute('fill', ['#fff', '#ccc', '#999', '#666'][i]);
    svg.appendChild(path);
    startAngle += angle;
});

// Animated Counters
function animateCounter(id, end, duration) {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / end));
    const element = document.getElementById(id);
    const timer = setInterval(() => {
        start += 1000000;
        element.textContent = start.toLocaleString();
        if (start >= end) clearInterval(timer);
    }, stepTime);
}

const tokenObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter('circ-supply', 500000000, 2000);
            animateCounter('stake-rewards', 10000000, 2000);
            tokenObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
tokenObserver.observe(document.getElementById('tokenomics'));

// FAQ Accordion
document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// Back to Top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});