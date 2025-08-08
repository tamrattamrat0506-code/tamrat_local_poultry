// base/base.js
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
    
    // Live clock functionality
function updateClock() {
    const clockElements = document.querySelectorAll('.live-clock');
    if (clockElements.length > 0) {
        const now = new Date();
        const options = { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        // Format as YYYY-MM-DD HH:MM
        const formattedDateTime = now.toLocaleString('en-US', options)
            .replace(/(\d+)\/(\d+)\/(\d+),?/, '$3-$1-$2');
        
        clockElements.forEach(el => {
            el.textContent = formattedDateTime;
        });
    }
}

// Initialize clock and update every minute
updateClock();
setInterval(updateClock, 60000);
    function toggleNav() {
        const isActive = navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isActive);
        navOverlay.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleNav();
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', toggleNav);
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

    // Update current year in footer
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Unread message count
    function fetchUnreadCount() {
        if (!UNREAD_COUNT_API_URL) return;

        fetch(UNREAD_COUNT_API_URL)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const unreadBadge = document.getElementById('navbarUnread');
                if (unreadBadge) {
                    if (data.total_unread > 0) {
                        unreadBadge.textContent = data.total_unread;
                        unreadBadge.style.display = 'inline-block';
                    } else {
                        unreadBadge.style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching unread count:', error);
            });
    }

    // Initialize and update unread count every 30 seconds
    fetchUnreadCount();
    setInterval(fetchUnreadCount, 30000);

    // Form handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
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

// language switcher
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("language-overlay");

  if (!localStorage.getItem("languageSelected")) {
    overlay.classList.remove("hidden");
  }
});

function submitLanguage(selectElement) {
  localStorage.setItem("languageSelected", "true");
  selectElement.form.submit();
}

function skipPopup() {
  localStorage.setItem("languageSelected", "true");
  document.getElementById("language-overlay").classList.add("hidden");
}




function updateClock() {
    const clockElements = document.querySelectorAll('.live-clock');
    if (clockElements.length > 0) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        clockElements.forEach(el => {
            el.textContent = timeString;
        });
    }
}
