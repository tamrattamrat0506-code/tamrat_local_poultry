document.addEventListener('DOMContentLoaded', function() {
    // Initialize lightbox with compact settings
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false,
        'maxWidth': 600,
        'maxHeight': 600,
        'positionFromTop': 50
    });

    // Smooth scroll to gallery section if URL has #gallery hash
    if (window.location.hash === '#gallery') {
        const gallerySection = document.querySelector('.gallery-section');
        if (gallerySection) {
            setTimeout(() => {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }

    // Add click event to all gallery thumbnails for tracking
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // You could add analytics tracking here
            console.log('Gallery image clicked:', this.src);
        });
    });

    // Compact image viewer for main image
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        mainImage.addEventListener('click', function() {
            lightbox.start(this);
        });
        
        // Add hover effect
        mainImage.style.cursor = 'zoom-in';
        mainImage.addEventListener('mouseenter', function() {
            this.style.opacity = '0.9';
        });
        mainImage.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    }

    // Responsive adjustments
    function handleResize() {
        const container = document.querySelector('.item-detail-container');
        if (window.innerWidth < 500) {
            if (container) container.style.boxShadow = 'none';
        } else {
            if (container) container.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
    }

    // Initial check
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
});