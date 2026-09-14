/* =================================
   CUSTOM CURSOR
================================= */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    cursorRing.style.left = `${e.clientX}px`;
    cursorRing.style.top = `${e.clientY}px`;

});


const interactiveElements = document.querySelectorAll(
    "a, button, .tech-card, .system-core"
);

interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
        document.body.classList.add("hovering");
    });

    element.addEventListener("mouseleave", () => {
        document.body.classList.remove("hovering");
    });

});


/* =================================
   MOBILE MENU
================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

});


document.querySelectorAll(".mobile-menu a").forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

    });

});


/* =================================
   ANIMATED COUNTERS
================================= */

const stats = document.querySelectorAll("[data-target]");

let countersStarted = false;

function animateCounters() {

    if (countersStarted) return;

    countersStarted = true;

    stats.forEach((stat) => {

        const target = parseFloat(stat.dataset.target);

        let current = 0;

        const duration = 1800;

        const startTime = performance.now();

        function update(time) {

            const progress = Math.min(
                (time - startTime) / duration,
                1
            );

            // Smooth easing
            const eased =
                1 - Math.pow(1 - progress, 3);

            current = target * eased;

            if (target % 1 !== 0) {

                stat.textContent = current.toFixed(1);

            } else {

                stat.textContent = Math.floor(current);

            }

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                stat.textContent =
                    target % 1 !== 0
                        ? target.toFixed(1)
                        : target;
            }

        }

        requestAnimationFrame(update);

    });

}


/* =================================
   INTERSECTION OBSERVER
================================= */

const systemsSection =
    document.querySelector(".systems");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                animateCounters();

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.35
    }
);

observer.observe(systemsSection);


/* =================================
   PARALLAX CYBORG
================================= */

const visual = document.querySelector(".visual-frame");

document.addEventListener("mousemove", (e) => {

    if (window.innerWidth < 900) return;

    const x =
        (e.clientX / window.innerWidth - 0.5) * 10;

    const y =
        (e.clientY / window.innerHeight - 0.5) * 10;

    visual.style.transform =
        `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;

});


/* Reset visual when mouse leaves */

document.addEventListener("mouseleave", () => {

    visual.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg)";

});


/* =================================
   CARD TILT
================================= */

const cards =
    document.querySelectorAll(".tech-card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        if (window.innerWidth < 800) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -5;

        const rotateY =
            ((x / rect.width) - 0.5) * 5;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(800px) rotateX(0deg) rotateY(0deg)";

    });

});


/* =================================
   RANDOM HUD FLICKER
================================= */

const hudValues = document.querySelectorAll(
    ".hud strong"
);

setInterval(() => {

    const random =
        hudValues[
            Math.floor(
                Math.random() * hudValues.length
            )
        ];

    if (!random) return;

    random.style.opacity = "0.25";

    setTimeout(() => {

        random.style.opacity = "1";

    }, 100);

}, 1200);


/* =================================
   SMOOTH ACTIVE NAV
================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 250;

        if (
            window.scrollY >= sectionTop
        ) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach((link) => {

        link.style.color = "";

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.style.color =
                "var(--cyan-bright)";

        }

    });

});


/* =================================
   BUTTON RIPPLE
================================= */

document.querySelectorAll(
    ".primary-button"
).forEach((button) => {

    button.addEventListener("click", function(e) {

        const ripple =
            document.createElement("span");

        ripple.style.position = "absolute";

        ripple.style.width = "10px";
        ripple.style.height = "10px";

        ripple.style.borderRadius = "50%";

        ripple.style.background =
            "rgba(255,255,255,.5)";

        ripple.style.transform =
            "translate(-50%, -50%)";

        ripple.style.pointerEvents = "none";

        const rect =
            this.getBoundingClientRect();

        ripple.style.left =
            `${e.clientX - rect.left}px`;

        ripple.style.top =
            `${e.clientY - rect.top}px`;

        this.style.position = "relative";
        this.style.overflow = "hidden";

        this.appendChild(ripple);

        ripple.animate(
            [
                {
                    width: "10px",
                    height: "10px",
                    opacity: 0.7
                },
                {
                    width: "350px",
                    height: "350px",
                    opacity: 0
                }
            ],
            {
                duration: 600,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            ripple.remove();
        }, 600);

    });

});