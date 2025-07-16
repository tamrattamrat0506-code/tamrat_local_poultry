document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('.item-image_item_list[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
        
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
    const itemCards = document.querySelectorAll('.item-card_item_list');
    itemCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('button') || e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            const link = this.querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });

    const paginationLinks = document.querySelectorAll('.page-link_item_list');
    paginationLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });

    const sellButton = document.querySelector('.sell-button_item_list');
    if (sellButton) {
        sellButton.addEventListener('mouseenter', () => {
            sellButton.style.transform = 'scale(1.05)';
        });
        sellButton.addEventListener('mouseleave', () => {
            sellButton.style.transform = '';
        });
    }

    function adjustCardSizes() {
        const grid = document.querySelector('.items-grid_item_list');
        if (!grid) return;
        
        const cards = document.querySelectorAll('.item-card_item_list');
        const gridWidth = grid.offsetWidth;
        const gap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap')) || 15;
        let columns;
        
        if (window.innerWidth <= 309) columns = 1;
        else if (window.innerWidth <= 374) columns = 2;
        else if (window.innerWidth <= 411) columns = 3;
        else if (window.innerWidth <= 767) columns = 4;
        else if (window.innerWidth <= 991) columns = 5;
        else if (window.innerWidth <= 1199) columns = 6;
        else columns = 7;
        
        const cardWidth = (gridWidth - (gap * (columns - 1))) / columns;
        
        cards.forEach(card => {
            card.style.width = `${cardWidth}px`;
        });
    }

    function fadeInItems() {
        const items = document.querySelectorAll('.item-card_item_list');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
            }, index * 100);
        });
    }

    window.addEventListener('load', () => {
        adjustCardSizes();
        fadeInItems();
    });

    window.addEventListener('resize', adjustCardSizes);
});

function likeItem(itemId) {
    const likeBtn = document.querySelector(`.like-btn_item_list[onclick="likeItem(${itemId})"]`);
    const likeIcon = likeBtn.querySelector('i');
    const likeCount = likeBtn.querySelector('.like-count_item_list');
    
    likeIcon.classList.add('like-animate_item_list');
    likeCount.classList.add('count-pulse_item_list');
    
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
        
        setTimeout(() => {
            likeIcon.classList.remove('like-animate_item_list');
            likeCount.classList.remove('count-pulse_item_list');
        }, 500);
    })
    .catch(error => {
        console.error('Error:', error);
        likeIcon.classList.remove('like-animate_item_list');
        likeCount.classList.remove('count-pulse_item_list');
    });
}

function shareItem(itemId) {
    const shareBtn = document.querySelector(`.share-btn_item_list[onclick="shareItem(${itemId})"]`);
    const shareIcon = shareBtn.querySelector('i');
    const shareCount = shareBtn.querySelector('.share-count_item_list');
    
    shareIcon.classList.add('share-animate_item_list');
    shareCount.classList.add('count-pulse_item_list');
    
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
        
        setTimeout(() => {
            shareIcon.classList.remove('share-animate_item_list');
            shareCount.classList.remove('count-pulse_item_list');
        }, 600);
        
        if (navigator.share) {
            const itemCard = shareBtn.closest('.item-card_item_list');
            const itemTitle = itemCard.querySelector('.item-title_item_list').textContent;
            const itemUrl = window.location.origin + itemCard.querySelector('a').getAttribute('href');
            
            navigator.share({
                title: itemTitle,
                text: 'Check out this item on Poultry Marketplace',
                url: itemUrl
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        shareIcon.classList.remove('share-animate_item_list');
        shareCount.classList.remove('count-pulse_item_list');
    });
}

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