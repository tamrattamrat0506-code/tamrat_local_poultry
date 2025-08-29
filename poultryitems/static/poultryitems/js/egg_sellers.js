// poultryitems/static/poultryitems/js/egg_sellers.js

document.addEventListener('DOMContentLoaded', function() {
    // Get all seller list items
    const sellerItems = document.querySelectorAll('.egg-seller-list li');
    
    // Add click event to each seller item
    sellerItems.forEach(item => {
        const sellerName = item.querySelector('.egg-seller-name');
        const dropdown = item.querySelector('.dropdown');
        
        sellerName.addEventListener('click', function() {
            // Toggle active class on seller name
            this.classList.toggle('active');
            
            // Toggle dropdown visibility
            dropdown.classList.toggle('active');
            
            // Close other open dropdowns
            sellerItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.egg-seller-name').classList.remove('active');
                    otherItem.querySelector('.dropdown').classList.remove('active');
                }
            });
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
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
            this.style.background = 'linear-gradient(90deg, #ff7e5f, #feb47b)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(90deg, #3498db, #2c3e50)';
        });
    });
});