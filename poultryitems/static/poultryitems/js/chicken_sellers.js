// poultryitems/static/poultryitems/js/chicken_sellers.js

document.addEventListener('DOMContentLoaded', function() {
    // Get all seller list items
    const sellerItems = document.querySelectorAll('.seller-item');
    const searchInput = document.getElementById('searchInput');
    const locationFilter = document.getElementById('locationFilter');
    const sellerList = document.getElementById('sellerList');
    
    // Create no results message
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = '<i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px;"></i><h3>No sellers found</h3><p>Try adjusting your search criteria</p>';
    sellerList.parentNode.insertBefore(noResults, sellerList.nextSibling);

    // Add click event to each seller item
    sellerItems.forEach(item => {
        const sellerName = item.querySelector('.chicken-seller-name');
        const dropdown = item.querySelector('.dropdown');
        
        sellerName.addEventListener('click', function() {
            // Check if this dropdown is already active
            const isActive = this.parentElement.parentElement.classList.contains('active');
            
            // Close all dropdowns first
            sellerItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.dropdown').classList.remove('active');
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                dropdown.classList.add('active');
                
                // Scroll into view if on mobile
                if (window.innerWidth < 768) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', filterSellers);
    locationFilter.addEventListener('change', filterSellers);
    
    function filterSellers() {
        const searchTerm = searchInput.value.toLowerCase();
        const locationValue = locationFilter.value;
        let visibleCount = 0;
        
        sellerItems.forEach(item => {
            const sellerText = item.textContent.toLowerCase();
            const itemLocation = item.getAttribute('data-location');
            const matchesSearch = sellerText.includes(searchTerm);
            const matchesLocation = !locationValue || itemLocation === locationValue;
            
            if (matchesSearch && matchesLocation) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
    
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
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease, display 0.3s ease';
        observer.observe(item);
    });
    
    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        // Add data-platform attribute for tooltip
        if (link.classList.contains('facebook')) link.setAttribute('data-platform', 'Facebook');
        if (link.classList.contains('telegram')) link.setAttribute('data-platform', 'Telegram');
        if (link.classList.contains('email')) link.setAttribute('data-platform', 'Email');
        if (link.classList.contains('whatsapp')) link.setAttribute('data-platform', 'WhatsApp');
        if (link.classList.contains('instagram')) link.setAttribute('data-platform', 'Instagram');
        if (link.classList.contains('youtube')) link.setAttribute('data-platform', 'YouTube');
        
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.seller-item')) {
            sellerItems.forEach(item => {
                item.classList.remove('active');
                item.querySelector('.dropdown').classList.remove('active');
            });
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            sellerItems.forEach(item => {
                item.classList.remove('active');
                item.querySelector('.dropdown').classList.remove('active');
            });
        }
    });
});