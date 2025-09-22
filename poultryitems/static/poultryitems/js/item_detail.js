document.addEventListener('DOMContentLoaded', function() {
    // Initialize interaction buttons
    const initInteractionButtons = () => {
        // Like button handler
        document.querySelectorAll('[data-action="like"]').forEach(button => {
            button.addEventListener('click', handleLike);
        });

        // Share button handler
        document.querySelectorAll('[data-action="share"]').forEach(button => {
            button.addEventListener('click', handleShare);
        });
    };

    // Handle like action
    const handleLike = async (event) => {
        const button = event.currentTarget;
        const itemId = button.dataset.itemId;
        const countElement = button.querySelector('.interaction-count');

        try {
            const response = await fetch(`/en/items/${itemId}/like/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success') {
                    countElement.textContent = data.like_count;
                    button.classList.toggle('liked');
                    showToast(data.like_count > parseInt(countElement.textContent) ? 'Item liked!' : 'Item unliked!');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Failed to like item', 'error');
        }
    };

    // Handle share action
    const handleShare = async (event) => {
        const button = event.currentTarget;
        const itemId = button.dataset.itemId;
        const countElement = button.querySelector('.interaction-count');
        const itemTitle = document.querySelector('.product-title')?.textContent || 'Poultry Item';
        const itemUrl = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: itemTitle,
                    text: 'Check out this poultry item',
                    url: itemUrl
                });
            } else {
                // Fallback for browsers without Web Share API
                await navigator.clipboard.writeText(itemUrl);
                showToast('Link copied to clipboard!');
            }

            // Record the share
            const response = await fetch(`/en/items/${itemId}/share/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success') {
                    countElement.textContent = data.share_count;
                    showToast('Item shared successfully!');
                }
            }
        } catch (error) {
            console.error('Error sharing:', error);
            if (error.name !== 'AbortError') {
                showToast('Failed to share item', 'error');
            }
        }
    };

    // Get CSRF token
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    // Show toast notification
    const showToast = (message, type = 'success') => {
        // Your existing toast implementation
        console.log(`${type}: ${message}`); // For now, just log to console
    };

    // Initialize all functionality
    initInteractionButtons();
});