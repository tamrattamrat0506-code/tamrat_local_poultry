document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navActions = document.getElementById('navActions');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            //
        
            //

            // Toggle the hamburger icon between bars and X
            const icon = this.querySelector('.nav-toggle-icon i');
            if (icon) {
                if (isExpanded) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('.nav-toggle-icon i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && navMenu.classList.contains('active')) {
            if (!e.target.closest('.main-nav') && !e.target.closest('.nav-actions')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('.nav-toggle-icon i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });

    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Handle dropdown menus
    const dropdowns = document.querySelectorAll('.user-dropdown');
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('button');
        
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('button');
            button.setAttribute('aria-expanded', 'false');
        });
    });

    // Check for unread messages (example - you'll need to implement the actual check)
    function checkUnreadMessages() {
        const unreadBadge = document.getElementById('navbarUnread');
        if (unreadBadge) {
            // Example: unreadBadge.textContent = unreadCount;
            // For now, we'll just hide it if there are no messages
            unreadBadge.style.display = 'none';
        }
    }

    checkUnreadMessages();
    function updateDateTime() {
    const now = new Date();
    const options = { 
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    const dateTimeElem = document.querySelector('.date-and-time');
    if (dateTimeElem) {
      dateTimeElem.textContent = now.toLocaleString(undefined, options);
    }
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);
});

// Make functions available globally if needed
window.updateUnreadCount = function(count) {
    const unreadBadge = document.getElementById('navbarUnread');
    if (unreadBadge) {
        if (count > 0) {
            unreadBadge.textContent = count;
            unreadBadge.style.display = 'inline-flex';
        } else {
            unreadBadge.style.display = 'none';
        }
    }
};