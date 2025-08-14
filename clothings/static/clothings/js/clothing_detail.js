// clothing_detail.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize like and share buttons
    initInteractionButtons();
    
    // If you have an image gallery, initialize it here
    // initImageGallery();
});

function initInteractionButtons() {
    // Like button functionality
    const likeButton = document.querySelector('.like-button');
    if (likeButton) {
        likeButton.addEventListener('click', function(e) {
            e.preventDefault();
            const clothingId = this.getAttribute('data-item-id');
            likeClothing(clothingId, this);
        });
    }

    // Share button functionality
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        shareButton.addEventListener('click', function(e) {
            e.preventDefault();
            const clothingId = this.getAttribute('data-item-id');
            shareClothing(clothingId, this);
        });
    }
}

async function likeClothing(clothingId, button) {
    try {
        const response = await fetch(`/clothings/like/${clothingId}/`, {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin'
        });

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === 'success') {
            updateLikeButton(button, data.like_count);
        }
    } catch (error) {
        console.error('Like error:', error);
        showToast('Failed to like. Please try again.', 'error');
    }
}

async function shareClothing(clothingId, button) {
    try {
        // First try the Web Share API if available
        if (navigator.share) {
            await navigator.share({
                title: `Check out ${document.querySelector('.clothing-info h1').textContent}`,
                text: 'I found this amazing clothing item you might like',
                url: window.location.href,
            });
            
            // Only increment share count if sharing was successful
            await sendShareRequest(clothingId, button);
        } else {
            // Fallback for browsers without Web Share API
            await sendShareRequest(clothingId, button);
            copyToClipboard(window.location.href);
            showToast('Link copied to clipboard!', 'success');
        }
    } catch (error) {
        console.error('Share error:', error);
        if (error.name !== 'AbortError') {
            showToast('Failed to share. Please try again.', 'error');
        }
    }
}

async function sendShareRequest(clothingId, button) {
    try {
        const response = await fetch(`/clothings/share/${clothingId}/`, {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin'
        });

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === 'success') {
            updateShareButton(button, data.share_count);
        }
    } catch (error) {
        console.error('Share count error:', error);
        throw error;
    }
}

function updateLikeButton(button, count) {
    const likeCount = button.querySelector('.like-count');
    if (likeCount) {
        likeCount.textContent = count;
    }
    button.classList.add('liked');
    button.style.backgroundColor = '#e3f2fd';
    
    setTimeout(() => {
        button.style.backgroundColor = '';
    }, 500);
}

function updateShareButton(button, count) {
    const shareCount = button.querySelector('.share-count');
    if (shareCount) {
        shareCount.textContent = count;
    }
    button.classList.add('shared');
    button.style.backgroundColor = '#e8f5e9';
    
    setTimeout(() => {
        button.style.backgroundColor = '';
    }, 500);
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
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

function showToast(message, type = 'success') {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}