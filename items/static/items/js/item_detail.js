document.addEventListener('DOMContentLoaded', function() {
    // Initialize lightbox
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Image %1 of %2',
            'fadeDuration': 300,
            'imageFadeDuration': 300
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact button hover effect
    const contactBtn = document.querySelector('.contact-seller-btn');
    if (contactBtn) {
        contactBtn.addEventListener('mouseenter', () => {
            contactBtn.style.transform = 'translateY(-2px)';
        });
        contactBtn.addEventListener('mouseleave', () => {
            contactBtn.style.transform = '';
        });
    }

    // Main image click to open in lightbox
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        mainImage.addEventListener('click', function() {
            if (typeof lightbox !== 'undefined') {
                lightbox.start(this);
            }
        });
    }

    // Animate elements on page load
    const animateElements = () => {
        const elements = [
            '.seller-info',
            '.item-title',
            '.main-image-container',
            '.item-meta',
            '.item-description',
            '.gallery-section',
            '.edit-delete-buttons'
        ].map(selector => document.querySelector(selector)).filter(el => el);
        
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 150);
        });
    };

    // Set initial state for animation
    const animatedElements = [
        '.seller-info',
        '.item-title',
        '.main-image-container',
        '.item-meta',
        '.item-description',
        '.gallery-section',
        '.edit-delete-buttons'
    ].map(selector => document.querySelector(selector)).filter(el => el);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animations after page load
    window.addEventListener('load', animateElements);
});

function likeItem(itemId) {
    const likeBtn = document.querySelector(`.like-btn[onclick="likeItem(${itemId})"]`);
    const likeIcon = likeBtn.querySelector('i');
    const likeCount = likeBtn.querySelector('.interaction-count');
    
    // Add animation classes
    likeIcon.classList.add('like-animate');
    likeCount.classList.add('count-pulse');
    
    fetch(`/items/${itemId}/like/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        likeCount.textContent = data.likes_count;
        
        // Remove animation classes after animation completes
        setTimeout(() => {
            likeIcon.classList.remove('like-animate');
            likeCount.classList.remove('count-pulse');
        }, 500);
    })
    .catch(error => {
        console.error('Error:', error);
        likeIcon.classList.remove('like-animate');
        likeCount.classList.remove('count-pulse');
    });
}

function shareItem(itemId) {
    const shareBtn = document.querySelector(`.share-btn[onclick="shareItem(${itemId})"]`);
    const shareIcon = shareBtn.querySelector('i');
    const shareCount = shareBtn.querySelector('.interaction-count');
    
    // Add animation classes
    shareIcon.classList.add('share-animate');
    shareCount.classList.add('count-pulse');
    
    // First try Web Share API if available
    if (navigator.share) {
        const itemTitle = document.querySelector('.item-title').textContent;
        const itemUrl = window.location.href;
        
        navigator.share({
            title: itemTitle,
            text: 'Check out this item on Poultry Marketplace',
            url: itemUrl
        }).then(() => {
            // Only send share count if share was successful
            return fetch(`/items/${itemId}/share/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json'
                }
            });
        }).then(response => response.json())
        .then(data => {
            shareCount.textContent = data.shares_count;
        })
        .catch(err => {
            console.log('Error sharing:', err);
        })
        .finally(() => {
            // Remove animation classes
            setTimeout(() => {
                shareIcon.classList.remove('share-animate');
                shareCount.classList.remove('count-pulse');
            }, 600);
        });
    } else {
        // Fallback to just counting the share
        fetch(`/items/${itemId}/share/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            shareCount.textContent = data.shares_count;
            // Show a message since Web Share API isn't available
            alert('Item link copied to clipboard: ' + window.location.href);
            // Copy URL to clipboard as fallback
            navigator.clipboard.writeText(window.location.href);
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            // Remove animation classes
            setTimeout(() => {
                shareIcon.classList.remove('share-animate');
                shareCount.classList.remove('count-pulse');
            }, 600);
        });
    }
}

// Helper to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}