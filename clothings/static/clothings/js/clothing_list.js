document.addEventListener('DOMContentLoaded', function() {
    // Like button functionality
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const clothingId = this.getAttribute('data-item-id');
            likeClothing(clothingId, this);
        });
    });

    // Share button functionality
    document.querySelectorAll('.share-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const clothingId = this.getAttribute('data-item-id');
            shareClothing(clothingId, this);
        });
    });
});

async function likeClothing(clothingId, button) {
    try {
        const response = await fetch(`/en/clothings/clothing/${clothingId}/like/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'same-origin'
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (data.status === 'success') {
            const countElement = button.querySelector('.interaction-count');
            countElement.textContent = data.like_count;
            button.classList.add('liked');
            button.style.backgroundColor = '#e3f2fd';
            setTimeout(() => { button.style.backgroundColor = ''; }, 500);
        }
    } catch (error) {
        console.error('Like error:', error);
        alert('Failed to like. Please try again.');
    }
}

async function shareClothing(clothingId, button) {
    try {
        if (navigator.share) {
            await navigator.share({
                title: 'Check out this clothing item!',
                text: 'I found this amazing clothing item you might like',
                url: window.location.href,
            });
            await sendShareRequest(clothingId, button);
        } else {
            await sendShareRequest(clothingId, button);
            copyToClipboard(window.location.href);
            alert('Link copied to clipboard!');
        }
    } catch (error) {
        console.error('Share error:', error);
        if (error.name !== 'AbortError') {
            alert('Failed to share. Please try again.');
        }
    }
}

async function sendShareRequest(clothingId, button) {
    try {
        const response = await fetch(`/en/clothings/clothing/${clothingId}/share/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'same-origin'
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (data.status === 'success') {
            const countElement = button.querySelector('.interaction-count');
            countElement.textContent = data.share_count;
            button.style.backgroundColor = '#e8f5e9';
            setTimeout(() => { button.style.backgroundColor = ''; }, 500);
        }
    } catch (error) {
        console.error('Share count error:', error);
        throw error;
    }
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
