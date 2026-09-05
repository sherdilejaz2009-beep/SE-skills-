/* =========================================================
   SHERDIL EJAZ PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SELECTORS
    ===================================================== */

    const body = document.body;
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");



    /* =====================================================
       PAGE LOADED
    ===================================================== */

    window.setTimeout(function () {
        body.classList.add("page-loaded");
    }, 100);



    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();



    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function openMenu() {

        if (!siteNav || !menuToggle) {
            return;
        }

        siteNav.classList.add("active");
        menuToggle.classList.add("active");
        body.classList.add("menu-open");
    }


    function closeMenu() {

        if (!siteNav || !menuToggle) {
            return;
        }

        siteNav.classList.remove("active");
        menuToggle.classList.remove("active");
        body.classList.remove("menu-open");
    }


    function toggleMenu() {

        if (!siteNav) {
            return;
        }

        if (siteNav.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    if (menuToggle) {

        menuToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            toggleMenu();

        });

    }



    /* =====================================================
       CLOSE MOBILE MENU ON NAV LINK CLICK
    ===================================================== */

    if (siteNav) {

        const navigationLinks = siteNav.querySelectorAll("a");

        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                closeMenu();
            });

        });

    }



    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (!siteNav || !menuToggle) {
            return;
        }

        const clickedInsideMenu = siteNav.contains(event.target);
        const clickedMenuButton = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {
            closeMenu();
        }

    });



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentFile =
        window.location.pathname.split("/").pop() || "index.html";

    const allNavLinks = document.querySelectorAll(".site-nav a");

    allNavLinks.forEach(function (link) {

        const linkURL = link.getAttribute("href");

        if (!linkURL) {
            return;
        }

        const linkFile =
            linkURL.split("/").pop() || "index.html";

        if (linkFile === currentFile) {
            link.classList.add("active");
        }

    });



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const smoothLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    smoothLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetID = link.getAttribute("href");

            if (!targetID || targetID === "#") {
                return;
            }

            const targetElement =
                document.querySelector(targetID);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });



    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".service-card, " +
        ".project-card, " +
        ".skill-card, " +
        ".glass-card, " +
        ".section-heading, " +
        ".intro-strip, " +
        ".cta-section"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(function (element) {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("show");
        });

    }



    /* =====================================================
       CARD HOVER EFFECT
    ===================================================== */

    const cards = document.querySelectorAll(
        ".service-card, " +
        ".project-card, " +
        ".skill-card, " +
        ".glass-card"
    );


    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.classList.add("hovered");
        });


        card.addEventListener("mouseleave", function () {
            card.classList.remove("hovered");
        });

    });



    /* =====================================================
       MOUSE MOVE EFFECT
       DESKTOP ONLY
    ===================================================== */

    const interactiveCards = document.querySelectorAll(
        ".service-card, .project-card"
    );


    interactiveCards.forEach(function (card) {

        card.addEventListener("mousemove", function (event) {

            if (window.innerWidth < 850) {
                return;
            }

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                "perspective(800px) " +
                "rotateX(" + rotateX + "deg) " +
                "rotateY(" + rotateY + "deg) " +
                "translateY(-6px)";

        });


        card.addEventListener("mouseleave", function () {

            card.style.transform = "";

        });

    });



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll("[data-year]");


    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });



    /* =====================================================
       SCROLL TO TOP BUTTON
    ===================================================== */

    const scrollTopButton =
        document.querySelector(".scroll-top");


    if (scrollTopButton) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                scrollTopButton.classList.add("visible");

            } else {

                scrollTopButton.classList.remove("visible");

            }

        });


        scrollTopButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }



    /* =====================================================
       CONTACT / EMAIL BUTTON
    ===================================================== */

    const emailButtons =
        document.querySelectorAll("[data-email]");


    emailButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const email =
                button.getAttribute("data-email");

            if (!email) {
                return;
            }

            window.location.href =
                "mailto:" + email;

        });

    });



    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .nav-btn"
        );


    buttons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("button-ripple");

            const rect =
                button.getBoundingClientRect();

            const size =
                Math.max(
                    rect.width,
                    rect.height
                );

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left =
                event.clientX -
                rect.left -
                size / 2 +
                "px";

            ripple.style.top =
                event.clientY -
                rect.top -
                size / 2 +
                "px";

            button.appendChild(ripple);


            window.setTimeout(function () {

                ripple.remove();

            }, 600);

        });

    });



    /* =====================================================
       DISABLE RIPPLE ON TOUCH DEVICES
    ===================================================== */

    window.addEventListener("touchstart", function () {

        body.classList.add("touch-device");

    }, {
        once: true
    });



    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 850) {
            closeMenu();
        }

    });



    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "Sherdil Ejaz Portfolio loaded successfully."
    );

});
/* =====================================================
   CONTACT FORM — REPLY TO CLIENT
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const emailInput = document.getElementById("email");
    const replyToInput = document.getElementById("replyToEmail");

    if (!contactForm || !emailInput || !replyToInput) {
        return;
    }

    contactForm.addEventListener("submit", function () {

        replyToInput.value = emailInput.value.trim();

    });

});
