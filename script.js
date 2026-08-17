/* =========================================================
   HANU DIGITAL HUB
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       1. MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                // Close mobile menu
                menuToggle.checked = false;

            });

        });


        // Close menu when clicking outside

        document.addEventListener("click", function (event) {

            const menuButton =
                document.querySelector(".menu-button");

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedMenuButton =
                menuButton &&
                menuButton.contains(event.target);

            if (
                menuToggle.checked &&
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                menuToggle.checked = false;

            }

        });


        // Close menu with Escape key

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                menuToggle.checked = false;

            }

        });

    }



    /* =====================================================
       2. ACTIVE PAGE
    ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const allNavLinks =
        document.querySelectorAll(".nav-menu a");

    allNavLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });



    /* =====================================================
       3. PAGE FADE-IN
    ===================================================== */

    document.body.classList.add("page-loaded");



    /* =====================================================
       4. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        // Fallback for older browsers

        revealElements.forEach(function (element) {

            element.classList.add("revealed");

        });

    }

/* =====================================================
   5. CONTACT FORM
===================================================== */

const contactForm = document.querySelector("#contactForm");

if (contactForm) {

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        if (!submitButton) return;

        if (submitButton.dataset.submitting === "true") {
            return;
        }

        submitButton.dataset.submitting = "true";
        submitButton.disabled = true;

        submitButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Sending...
        `;

        try {

            const formData = new FormData(contactForm);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            const result = await response.json();

            if (response.ok && result.success) {

                contactForm.innerHTML = `
                    <div class="thank-you-message">

                        <div class="thank-icon">
                            <i class="fa-solid fa-check"></i>
                        </div>

                        <h2>Thank You!</h2>

                        <p>
                            Your message has been sent successfully.
                        </p>

                        <p>
                            We'll get back to you soon.
                        </p>

                    </div>
                `;

            } else {

                throw new Error("Submission failed");

            }

        } catch (error) {

            submitButton.disabled = false;
            submitButton.dataset.submitting = "false";

            submitButton.innerHTML = `
                Send Message
                <i class="fa-solid fa-paper-plane"></i>
            `;

            alert(
                "Unable to send your message. Please try again."
            );
        }

    });
}

    /* =====================================================
       6. AUTOMATIC FOOTER YEAR
    ===================================================== */

    const currentYear =
        new Date().getFullYear();

    const footerYear =
        document.querySelector(".footer-year");

    if (footerYear) {

        footerYear.textContent =
            currentYear;

    }



    /* =====================================================
       7. EXTERNAL LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    externalLinks.forEach(function (link) {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


});