document.addEventListener('DOMContentLoaded', function() {
    // Initialize item cards with hover effects
    const itemCards = document.querySelectorAll('.item-card');
    
    // Add event listeners for each card
    itemCards.forEach(card => {
        // Handle keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
        
        // Make the entire card clickable (for accessibility)
        const link = card.querySelector('a');
        if (link) {
            link.setAttribute('aria-label', `View details for ${card.querySelector('.item-title')?.textContent || 'item'}`);
        }
    });
    
    // Pagination enhancements
    const paginationLinks = document.querySelectorAll('.page-link:not(.disabled)');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add loading indicator
            const container = document.querySelector('.container');
            if (container) {
                container.classList.add('loading-content');
            }
        });
    });
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.addEventListener('load', function() {
                this.parentElement.classList.add('loaded');
            });
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyLoad = function() {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                        
                        img.addEventListener('load', function() {
                            this.parentElement.classList.add('loaded');
                        });
                    }
                });
            });
            
            lazyImages.forEach(function(img) {
                observer.observe(img);
            });
        };
        
        document.addEventListener('DOMContentLoaded', lazyLoad);
        window.addEventListener('load', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('scroll', lazyLoad);
    }
    
    // Sell button animation
    const sellButton = document.querySelector('.sell-button');
    if (sellButton) {
        sellButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        sellButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        sellButton.addEventListener('focus', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        sellButton.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Price badge formatting
    const priceBadges = document.querySelectorAll('.price-badge');
    priceBadges.forEach(badge => {
        const priceText = badge.textContent.trim();
        if (priceText.includes('ETB')) {
            const priceValue = priceText.replace('ETB', '').trim();
            if (!isNaN(parseFloat(priceValue))) {
                const formattedPrice = parseFloat(priceValue).toLocaleString();
                badge.textContent = `ETB ${formattedPrice}`;
            }
        }
    });
});