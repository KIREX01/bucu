/**
 * Responsive Navigation Menu Script
 *
 * Handles toggling the mobile menu, dropdowns within the mobile menu,
 * and closing the menu via button, link clicks, or the Escape key.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinksContainer = document.getElementById('nav-links');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const dropdowns = document.querySelectorAll('.navbar .dropdown'); // All dropdowns
    const body = document.body; // Reference to the body element

    // --- State Check ---
    // Ensure essential elements exist before adding listeners
    if (!hamburgerMenu || !navLinksContainer || !closeMenuBtn) {
        console.error("Essential navigation elements not found. Menu functionality may be impaired.");
        return; // Stop script execution if elements are missing
    }

    // --- Helper Functions ---

    /**
     * Closes all open dropdowns within the mobile menu.
     * @param {Element|null} excludeDropdown - A dropdown element to exclude from closing (optional).
     */
    function closeAllMobileDropdowns(excludeDropdown = null) {
        dropdowns.forEach(dropdown => {
            // Only act on dropdowns inside the mobile menu container
            if (navLinksContainer.contains(dropdown) && dropdown !== excludeDropdown) {
                if (dropdown.classList.contains('open')) {
                    dropdown.classList.remove('open');
                    const btn = dropdown.querySelector('.dropbtn');
                    if (btn) {
                        btn.setAttribute('aria-expanded', 'false');
                        // Reset arrow direction visually if needed via CSS or direct style
                        const arrow = btn.querySelector('.dropdown-arrow');
                        if(arrow) arrow.style.transform = 'rotate(0deg)';
                    }
                }
            }
        });
    }

    /**
     * Closes the mobile navigation menu.
     */
    function closeMobileMenu() {
        if (navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active'); // Hide menu (triggers CSS transition)
            hamburgerMenu.classList.remove('active'); // Revert hamburger icon (triggers CSS transition)
            hamburgerMenu.setAttribute('aria-expanded', 'false');
            body.classList.remove('menu-open'); // Allow body scroll
            closeAllMobileDropdowns(); // Close any open dropdowns within the menu
            // Optional: Return focus to the hamburger button for accessibility
            // setTimeout(() => hamburgerMenu.focus(), 50); // Timeout allows transition
        }
    }

    /**
     * Opens the mobile navigation menu.
     */
    function openMobileMenu() {
        if (!navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.add('active'); // Show menu (triggers CSS transition)
            hamburgerMenu.classList.add('active'); // Animate hamburger to 'X' (triggers CSS transition)
            hamburgerMenu.setAttribute('aria-expanded', 'true');
            body.classList.add('menu-open'); // Prevent body scroll
            // Optional: Focus the close button or first link for accessibility
            // setTimeout(() => closeMenuBtn.focus(), 50); // Timeout allows transition
        }
    }

    // --- Event Listeners ---

    // 1. Hamburger Button Click: Toggles the mobile menu open/closed.
    hamburgerMenu.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling up to document
        const isActive = navLinksContainer.classList.contains('active');
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // 2. Close Button Click: Closes the mobile menu.
    closeMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileMenu();
    });

    // 3. Dropdown Toggle Click (Mobile Menu Specific)
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        if (dropbtn) {
            dropbtn.addEventListener('click', function(event) {
                // Only handle clicks if we are in mobile view (hamburger is visible)
                // AND the mobile menu container is active/visible
                const isMobileView = window.getComputedStyle(hamburgerMenu).display !== 'none';
                const isMenuOpen = navLinksContainer.classList.contains('active');

                if (isMobileView && isMenuOpen) {
                    // Prevent default link behavior ONLY if it's a toggle action in the mobile menu
                    event.preventDefault();
                    event.stopPropagation(); // Stop propagation to prevent closing menu immediately

                    const parentDropdown = this.closest('.dropdown'); // Get the parent dropdown container
                    const isOpen = parentDropdown.classList.contains('open');

                    // Close other dropdowns *before* toggling the current one
                    closeAllMobileDropdowns(parentDropdown);

                    // Toggle the current dropdown
                    parentDropdown.classList.toggle('open');
                    this.setAttribute('aria-expanded', !isOpen); // Toggle ARIA attribute

                    // Visually toggle arrow if needed (CSS handles this better)
                    const arrow = this.querySelector('.dropdown-arrow');
                    // if(arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';

                }
                // On desktop, or if the mobile menu is closed, allow default link behavior
            });
        }
    });

    // 4. Click Outside / Link Click Handler: Closes menu or dropdowns.
    document.addEventListener('click', function(event) {
        // Close mobile menu if click is outside the menu container and not on the hamburger
        const isClickInsideNav = navLinksContainer.contains(event.target);
        const isClickOnHamburger = hamburgerMenu.contains(event.target);

        if (navLinksContainer.classList.contains('active') && !isClickInsideNav && !isClickOnHamburger) {
            closeMobileMenu();
            // Note: Dropdowns are closed by closeMobileMenu()
            return; // Exit early
        }

        // Close mobile menu if a direct link *inside* the menu is clicked
        // (but not a dropdown button itself)
        if (isClickInsideNav && event.target.tagName === 'A' && !event.target.closest('.dropdown')) {
             closeMobileMenu();
        }
         // Close mobile menu if the Contact button link is clicked inside the menu
         if (isClickInsideNav && event.target.classList.contains('nav-button-link')) {
             closeMobileMenu();
         }

        // Close open mobile dropdowns if click is inside the nav but outside any dropdown content/button
        if (isClickInsideNav && !event.target.closest('.dropdown')) {
            closeAllMobileDropdowns();
        }
    });

    // 5. Escape Key Press: Closes the mobile menu if it's open.
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navLinksContainer.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // 6. Window Resize Listener: Close mobile menu if window becomes large enough
    window.addEventListener('resize', () => {
        // Check if hamburger is hidden (meaning we are on desktop view)
        if (window.getComputedStyle(hamburgerMenu).display === 'none') {
            // If the mobile menu was somehow left open, close it
            if (navLinksContainer.classList.contains('active')) {
                closeMobileMenu();
            }
            // Ensure body scroll is enabled if menu was forced closed
             body.classList.remove('menu-open');
        }
    });

}); // End DOMContentLoaded

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

window.addEventListener('load', function() {
  const loaderBg = document.getElementById('loader-bg');
  if (loaderBg) {
    loaderBg.style.opacity = '0';
    setTimeout(() => loaderBg.style.display = 'none', 400);
  }
});

// Google Translate Initialization
// This function initializes the Google Translate element on the page.
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}




