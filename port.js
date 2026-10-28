
/* ---------- Typing Animation ---------- */

const roles = [
    "Aspiring Full-Stack Developer",
    "Python Developer",
    "Web Development Learner"
];

const roleElement = document.querySelector(".hero-text h2");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
    if (!roleElement) return;

    const currentRole = roles[roleIndex];

    roleElement.textContent = currentRole.substring(0, charIndex);

    if (!deleting) {
        charIndex++;

        if (charIndex > currentRole.length) {
            deleting = true;
            setTimeout(typeRole, 1200);
            return;
        }
    } else {
        charIndex--;

        if (charIndex < 0) {
            charIndex = 0;
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeRole, deleting ? 45 : 90);
}

typeRole();


/* ---------- Mobile Navigation ---------- */

const nav = document.querySelector("nav");
const navList = document.querySelector("nav ul");

const menuButton = document.createElement("button");
menuButton.className = "menu-toggle";
menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
menuButton.setAttribute("aria-label", "Toggle navigation");
menuButton.setAttribute("aria-expanded", "false");

nav.insertBefore(menuButton, navList);

menuButton.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

navList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navList.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});


/* ---------- Scroll Reveal ---------- */

const revealElements = document.querySelectorAll(
    ".about-content, .skill-card, .project-card, .contact form"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => observer.observe(element));


/* ---------- Contact Form Validation ---------- */

const contactForm = document.querySelector(".contact form");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        const name = contactForm.querySelector('[name="name"]').value.trim();
        const email = contactForm.querySelector('[name="email"]').value.trim();
        const message = contactForm.querySelector('[name="message"]').value.trim();

        if (!name || !email || !message) {
            event.preventDefault();
            alert("Please fill in all fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            event.preventDefault();
            alert("Please enter a valid email address.");
        }
    });
}


/* ---------- Current Year ---------- */

const footerText = document.querySelector("footer p");

if (footerText) {
    footerText.textContent =
        `© ${new Date().getFullYear()} Shannu. Built with HTML and CSS.`;
}
