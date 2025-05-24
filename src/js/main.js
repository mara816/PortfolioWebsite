/**
 * Main JavaScript file for the portfolio website
 * Handles all interactive functionality including navigation, animations, and form validation
 */

// Execute when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Load navigation bar
  loadNavigationBar();

  // Initialize all interactive components
  initializeComponents();
});

/**
 * Loads the navigation bar and footer from external HTML files
 */
function loadNavigationBar() {
  const navigationPlaceholder = document.getElementById(
    "navigation-placeholder",
  );
  const footerPlaceholder = document.getElementById("footer-placeholder");

  // Load navigation bar
  if (navigationPlaceholder) {
    fetch("components/navigationBar.html")
      .then((response) => response.text())
      .then((data) => {
        navigationPlaceholder.innerHTML = data;

        // After navigation is loaded, highlight current page
        highlightCurrentPage();
      })
      .catch((error) => {
        console.error("Error loading navigation bar:", error);
      });
  }

  // Load footer
  if (footerPlaceholder) {
    fetch("components/footer.html")
      .then((response) => response.text())
      .then((data) => {
        footerPlaceholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error loading footer:", error);
      });
  }
}

/**
 * Initializes all interactive components on the page
 */
function initializeComponents() {
  // Initialize animations for skill bars if on skills page
  initSkillBars();

  // Initialize smooth scrolling for anchor links
  initSmoothScrolling();

  // Add animation to cards
  animateCards();

  // Initialize form validation
  initFormValidation();

  // Initialize section observers for navigation highlighting
  initSectionObservers();
}

/**
 * Highlights the current page in the navigation menu
 */
function highlightCurrentPage() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Add scroll effect to navigation bar
  window.addEventListener("scroll", function () {
    const nav = document.querySelector(".main-nav");
    if (nav) {
      if (window.scrollY > 50) {
        nav.style.backgroundColor = "rgba(44, 62, 80, 0.95)";
        nav.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
      } else {
        // nav.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        nav.style.boxShadow = "none";
      }
    }
  });
}

/**
 * Initializes animations for skill bars on the skills page
 */
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  if (skillBars.length > 0) {
    // Use Intersection Observer to trigger animation when skill bars are visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get the width from the style attribute
            const width = entry.target.style.width;

            // First set width to 0
            entry.target.style.width = "0";

            // Then animate to the target width
            setTimeout(() => {
              entry.target.style.width = width;
            }, 200);

            // Unobserve after animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    // Observe each skill bar
    skillBars.forEach((bar) => {
      observer.observe(bar);
    });
  }
}

/**
 * Initializes smooth scrolling for anchor links
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/**
 * Animates cards when they come into view
 */
function animateCards() {
  const cards = document.querySelectorAll(".card, .skill-category");

  if (cards.length > 0) {
    // Initially hide all cards
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

    // Use Intersection Observer to show cards when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a small delay for each card to create a cascade effect
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, 100);

            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    // Observe each card
    cards.forEach((card) => {
      observer.observe(card);
    });
  }
}

/**
 * Initializes form validation for contact forms
 */
function initFormValidation() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation
      let valid = true;
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      // Reset previous error styles
      [nameInput, emailInput, messageInput].forEach((input) => {
        input.style.borderColor = "";
      });

      // Validate name
      if (!nameInput.value.trim()) {
        nameInput.style.borderColor = "var(--accent-color)";
        valid = false;
      }

      // Validate email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        emailInput.style.borderColor = "var(--accent-color)";
        valid = false;
      }

      // Validate message
      if (!messageInput.value.trim()) {
        messageInput.style.borderColor = "var(--accent-color)";
        valid = false;
      }

      if (valid) {
        // Show success message
        const button = contactForm.querySelector("button");
        const originalText = button.textContent;
        button.textContent = "Message sent!";
        button.style.backgroundColor = "#2ecc71";

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          button.textContent = originalText;
          button.style.backgroundColor = "";
        }, 3000);
      }
    });
  }
}

/**
 * Initializes section observers for navigation highlighting
 */
function initSectionObservers() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  if (sections.length > 0 && navLinks.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const correspondingNavLink = document.querySelector(
              `nav a[href="#${id}"]`,
            );

            if (correspondingNavLink) {
              navLinks.forEach((link) => link.classList.remove("active"));
              correspondingNavLink.classList.add("active");
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
      },
    );

    sections.forEach((section) => {
      navObserver.observe(section);
    });
  }
}
