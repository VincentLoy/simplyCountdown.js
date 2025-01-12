// Import styles
import "../styles/main.css";

// Import highlight.js
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import elm from "highlight.js/lib/languages/elm";
import xml from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import "highlight.js/styles/atom-one-dark.css";

// Import our countdown library and themes
import "../../../../src/themes/default.css";
import "../../../../src/themes/dark.css";
import "../../../../src/themes/cyber.css";
import "../../../../src/themes/losange.css";
import "../../../../src/themes/circle.css";
import simplyCountdown from "../../../../src/core/simplyCountdown.ts";

// Configure highlight.js
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("elm", elm);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("json", json);
hljs.highlightAll();

// Package manager switcher
document.querySelectorAll(".package-manager-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const manager = button.dataset.manager;

        // Update buttons
        document.querySelectorAll(".package-manager-btn").forEach((btn) => {
            btn.classList.toggle("active", btn === button);
        });

        // Update content
        document.querySelectorAll(".package-manager-content").forEach((content) => {
            content.classList.toggle("active", content.dataset.manager === manager);
        });
    });
});

// Add copy buttons to all code blocks
document.querySelectorAll("pre").forEach((pre) => {
    // Remove any existing copy buttons
    pre.querySelectorAll(".copy-button").forEach((btn) => btn.remove());

    // Create the copy button
    const copyButton = document.createElement("button");
    copyButton.className =
        "copy-button absolute top-3 right-3 p-2 text-slate-400 hover:text-slate-300 bg-slate-800/50 rounded-lg opacity-0 transition-opacity group";
    copyButton.title = "Copy code to clipboard";

    // Create copy icon
    const copyIcon = document.createElement("span");
    copyIcon.className = "icon-[lucide--copy] w-4 h-4 copy-icon block group-data-[copied]:hidden";

    // Create check icon
    const checkIcon = document.createElement("span");
    checkIcon.className = "icon-[lucide--check] w-4 h-4 check-icon hidden group-data-[copied]:block text-green-400";

    // Add icons to button
    copyButton.appendChild(copyIcon);
    copyButton.appendChild(checkIcon);

    // Make pre relative for absolute positioning of button
    pre.classList.add("relative");

    // Add button to pre element
    pre.appendChild(copyButton);

    // Add click handler
    copyButton.addEventListener("click", async () => {
        const code = pre.querySelector("code") || pre;
        const text = code.textContent;

        try {
            await navigator.clipboard.writeText(text);
            copyButton.dataset.copied = true;

            setTimeout(() => {
                delete copyButton.dataset.copied;
            }, 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    });
});

// Glow effect
const glow = document.createElement("div");
glow.className = "sc-doc-block-glow";
document.body.appendChild(glow);

let currentBlock = null;
let rafId = null;
let mouseX = 0;
let mouseY = 0;

function updateGlowPosition() {
    if (currentBlock) {
        glow.style.left = `${mouseX}px`;
        glow.style.top = `${mouseY}px`;
        glow.style.opacity = "1";
        rafId = requestAnimationFrame(updateGlowPosition);
    }
}

document.querySelectorAll(".sc-doc-block").forEach((block) => {
    block.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!currentBlock) {
            currentBlock = block;
            rafId = requestAnimationFrame(updateGlowPosition);
        }
    });

    block.addEventListener("mouseleave", () => {
        currentBlock = null;
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        glow.style.opacity = "0";
    });
});

// Dynamic navigation background
const nav = document.querySelector(".nav-wrapper");

// Add transition class to nav
nav.classList.add("transition-colors", "duration-300");

function updateNavBackground() {
    if (window.matchMedia("(min-width: 768px)").matches) {
        const scrollPosition = window.scrollY;

        if (scrollPosition === 0) {
            // When page is at the very top
            nav.classList.remove("bg-indigo-950/50", "backdrop-blur-sm");
            nav.classList.add("bg-transparent");
        } else {
            // After scrolling even slightly
            nav.classList.remove("bg-transparent");
            nav.classList.add("bg-indigo-950/50", "backdrop-blur-sm");
        }
    }
}

// Initial check
updateNavBackground();

// Add scroll event listener
window.addEventListener("scroll", updateNavBackground);

// Configuration des exemples
const now = new Date();
const nextYear = now.getFullYear() + 1;
const nextMonth = (now.getMonth() + 2) % 12;
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

// Example 1: Default Theme
simplyCountdown(".simply-countdown-one", {
    year: nextYear,
    month: nextMonth,
    day: 27,
    zeroPad: true,
    enableUtc: true,
    sectionClass: "CUSTOM-SECTION-CLASS",
    amountClass: "CUSTOM-AMOUNT-CLASS",
    wordClass: "CUSTOM-WORD-CLASS",
});

// Example 2: Dark Theme without Zero Units
simplyCountdown(".simply-countdown-two", {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: tomorrow.getDate(),
    hours: 12,
    minutes: 5,
    zeroPad: false,
    removeZeroUnits: true,
});

// Example 3: Inline
const inlineCD = document.querySelector(".simply-countdown-inline");
simplyCountdown(inlineCD, {
    year: nextYear,
    month: 6,
    day: 28,
    inline: true,
});

// Example 4: Count Up with Cyberpunk Theme
simplyCountdown(".simply-countdown-countup", {
    year: 2023,
    month: 1,
    day: 1,
    countUp: true,
    removeZeroUnits: true,
});

// Example 5: Losange Theme
simplyCountdown("#simply-countdown-losange", {
    year: nextYear,
    month: 6,
    day: 28,
});

// Example 6: Circle Theme
simplyCountdown(".simply-countdown-circle-demo", {
    year: nextYear,
    month: nextMonth,
    day: 28,
    zeroPad: true,
});

// Example 7: with custom Russian pluralization
simplyCountdown("#custom-plural", {
    year: nextYear,
    month: 12,
    day: 31,
    hours: 23,
    minutes: 59,
    seconds: 59,
    words: {
        days: {
            lambda: (root, n) => pluralizeRus(n, "день", "дня", "дней"),
            root: "день",
        },
        hours: {
            lambda: (root, n) => pluralizeRus(n, "час", "часа", "часов"),
            root: "час",
        },
        minutes: {
            lambda: (root, n) => pluralizeRus(n, "минута", "минуты", "минут"),
            root: "минута",
        },
        seconds: {
            lambda: (root, n) => pluralizeRus(n, "секунда", "секунды", "секунд"),
            root: "секунда",
        },
    },
    zeroPad: true,
});

// Example 8: With controls
// Not a conventional declaration, but it's useful for the demo
const controlDemo = simplyCountdown(".simply-countdown-control", {
    year: nextYear,
    month: nextMonth,
    day: 27,
    zeroPad: false,
    enableUtc: true,
    onUpdate: () => {
        updateStateBox(controlDemo.getState());
    },
    onResume: () => {
        updateStateBox(controlDemo.getState());
    },
    onStop: () => {
        updateStateBox(controlDemo.getState());
    },
});

const updateStateBox = (state) => {
    let stateBox = document.querySelector(".state-box");
    stateBox.innerHTML = JSON.stringify(state, null, 2);
};

updateStateBox(controlDemo.getState());
window.controlDemo = controlDemo;

// Fonction de pluralisation pour le russe
function pluralizeRus(number, singular, genitiveSingular, genitivePlural) {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${genitivePlural}`; // Specific case for numbers 11-14
    }

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return `${singular}`; // Specific case for number (1, 21, 31...)
    }

    if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
        return `${genitiveSingular}`; // Genetive singular (2, 3, 4...)
    }

    return `${genitivePlural}`; // Geenetive plural (0, 5, 6...)
}

// Smooth scrolling with offset
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        // Get the target element
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Calculate the offset (nav height + 20px)
            const navHeight = document.querySelector("nav").offsetHeight;
            const offset = navHeight + 40;

            // Scroll to the element with an offset
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: "smooth",
            });
        }
    });
});

// Scroll to top button functionality
const scrollTopBtn = document.getElementById("scrollTopBtn");

function handleScroll() {
    const scrollThreshold = document.documentElement.scrollHeight * 0.05;

    if (window.scrollY > scrollThreshold) {
        scrollTopBtn.classList.remove("opacity-0", "translate-y-10");
    } else {
        scrollTopBtn.classList.add("opacity-0", "translate-y-10");
    }
}

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

window.addEventListener("scroll", handleScroll);

document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
        const button = document.getElementById("mobile-menu-button");
        const navWrapper = document.querySelector(".nav-wrapper");
        const menu = document.getElementById("nav-menu");
        let isOpen = false;

        const toggleMenu = () => {
            isOpen = !isOpen;
            // Use transform for performance and opacity for fade effect
            menu.classList.toggle("nav-list-open");
            button.setAttribute("aria-expanded", isOpen);

            // Toggle navigation background styles
            navWrapper.classList.toggle("--active");
            navWrapper.classList.toggle("bg-indigo-950");
            navWrapper.classList.toggle("backdrop-blur-sm");
            navWrapper.classList.toggle("bg-indigo-950/50");
        };

        button.addEventListener("click", toggleMenu);

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && isOpen) {
                toggleMenu();
            }
        });

        document.addEventListener("click", (e) => {
            if (isOpen && !menu.contains(e.target) && !button.contains(e.target)) {
                toggleMenu();
            }
        });

        const mobileNavLinks = menu.querySelectorAll('a[href^="#"]');
        mobileNavLinks.forEach((link) => {
            link.addEventListener("click", () => {
                toggleMenu();
            });
        });
    }
});
