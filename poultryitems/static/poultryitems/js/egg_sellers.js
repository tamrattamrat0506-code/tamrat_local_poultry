// poultryitems/static/poultryitems/js/egg_sellers.js

document.addEventListener('DOMContentLoaded', function() {
    // Get all seller list items
    const sellerItems = document.querySelectorAll('.egg-seller-list li');
    
    // Add click event to each seller item
    sellerItems.forEach(item => {
        const sellerName = item.querySelector('.egg-seller-name');
        const dropdown = item.querySelector('.dropdown');
        
        sellerName.addEventListener('click', function() {
            // Check if this dropdown is already active
            const isActive = this.classList.contains('active');
            
            // Close all dropdowns first
            sellerItems.forEach(otherItem => {
                otherItem.querySelector('.egg-seller-name').classList.remove('active');
                otherItem.querySelector('.dropdown').classList.remove('active');
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                this.classList.add('active');
                dropdown.classList.add('active');
                
                // Scroll into view if on mobile
                if (window.innerWidth < 768) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply animation to all seller items
    sellerItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.egg-seller-list li')) {
            sellerItems.forEach(item => {
                item.querySelector('.egg-seller-name').classList.remove('active');
                item.querySelector('.dropdown').classList.remove('active');
            });
        }
    });
});