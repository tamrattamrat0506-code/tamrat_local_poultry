document.getElementById('navToggle').addEventListener('click', function() {
    this.classList.toggle('active');
    
    // Add ripple effect
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    this.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
});




document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for all screen sizes
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
    
    // Toggle navigation menu
    function toggleNav() {
        const isActive = navMenu.classList.contains('active');
        
        navToggle.classList.toggle('active', !isActive);
        navMenu.classList.toggle('active', !isActive);
        navOverlay.classList.toggle('active', !isActive);
        
        // Update ARIA attributes
        navToggle.setAttribute('aria-expanded', !isActive);
        navMenu.setAttribute('aria-hidden', isActive);
        
        // Toggle body overflow
        document.body.style.overflow = !isActive ? 'hidden' : '';
    }
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleNav();
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleNav();
            });
        });
        
        // Close menu when clicking outside
        navOverlay.addEventListener('click', toggleNav);
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleNav();
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    toggleNav();
                }
                
                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Update unread message count
    
    // Update date and time
    function updateDateTime() {
        const dateTimeElements = document.querySelectorAll('.date-and-time');
        if (dateTimeElements.length > 0) {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            const formattedDateTime = now.toLocaleDateString(undefined, options);
            
            dateTimeElements.forEach(el => {
                el.textContent = formattedDateTime;
            });
        }
    }
    
    // Initialize date time and update every minute
    updateDateTime();
    setInterval(updateDateTime, 60000);
    
    // Enhanced user dropdown functionality
    const userDropdowns = document.querySelectorAll('.user-dropdown');
    userDropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.my-btn-user');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (button && menu) {
            // Toggle dropdown
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const isVisible = menu.style.opacity === '1';
                
                // Close all other dropdowns first
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    if (m !== menu) {
                        m.style.opacity = '0';
                        m.style.visibility = 'hidden';
                        m.style.transform = 'translateY(10px)';
                    }
                });
                
                if (isVisible) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(10px)';
                } else {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                }
            });
            
            // Close when clicking outside
            document.addEventListener('click', function() {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
            });
            
            // Close when pressing Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && menu.style.opacity === '1') {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(10px)';
                }
            });
        }
    });
    
    // Update current year in footer
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Floating message container functionality
    function initFloatingMessage() {
        const messageContainer = document.querySelector('.message-container');
        if (!messageContainer) return;
        
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'message-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-comment-alt"></i>';
        toggleBtn.setAttribute('aria-label', 'Toggle feedback form');
        document.body.appendChild(toggleBtn);
        
        // Make container floating
        messageContainer.classList.add('floating');
        messageContainer.style.display = 'none';
        
        // Toggle visibility
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = messageContainer.style.display === 'block';
            messageContainer.style.display = isVisible ? 'none' : 'block';
            this.setAttribute('aria-expanded', !isVisible);
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!messageContainer.contains(e.target) && e.target !== toggleBtn) {
                messageContainer.style.display = 'none';
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && messageContainer.style.display === 'block') {
                messageContainer.style.display = 'none';
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Form group focus handling for message container
        const formGroups = messageContainer.querySelectorAll('.compact-form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('.compact-form-control');
            
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
            
            // Initialize state
            if (input.value) {
                group.classList.add('focused', 'has-value');
            }
        });
    }

    // Initialize floating message container
    initFloatingMessage();
    
    // Enhanced form handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Add loading state to submit buttons
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = `
                    <span class="spinner">
                        <i class="fas fa-spinner fa-spin"></i>
                    </span>
                    <span class="text">Processing...</span>
                `;
                
                // Revert if form submission fails
                setTimeout(() => {
                    if (!form.checkValidity()) {
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('loading');
                        submitBtn.innerHTML = originalText;
                    }
                }, 1000);
            }
        });
        
        // Add focus styles to form inputs
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            if (!formGroup) return;
            
            input.addEventListener('focus', () => {
                formGroup.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    formGroup.classList.remove('focused');
                }
            });
            
            // Initialize focused state if input has value
            if (input.value) {
                formGroup.classList.add('focused');
            }
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(1px)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});








// base/static/base/js/base.js
document.addEventListener('DOMContentLoaded', function() {
    const unreadBadge = document.getElementById('navbarUnread');
    
    function fetchUnreadCount() {
        fetch(UNREAD_COUNT_API_URL)
        .then(response => response.json())
            .then(data => {
                if (data.total_unread > 0) {
                    unreadBadge.textContent = data.total_unread;
                    unreadBadge.style.display = 'inline-block';
                } else {
                    unreadBadge.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching unread count:', error);
            });
    }
    fetchUnreadCount();
    setInterval(fetchUnreadCount, 30000);
});