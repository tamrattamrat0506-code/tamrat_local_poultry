document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const form = document.querySelector('.profile-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            
            // You can add additional form validation here if needed
        });
    }

    // Profile picture preview functionality
    const profilePictureInput = document.querySelector('input[name="profile_picture"]');
    if (profilePictureInput) {
        profilePictureInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                const currentAvatar = document.querySelector('.current-avatar');
                
                reader.onload = function(event) {
                    if (!currentAvatar) {
                        // Create avatar if it doesn't exist
                        const avatarContainer = document.createElement('div');
                        avatarContainer.className = 'avatar-container';
                        
                        const newAvatar = document.createElement('img');
                        newAvatar.className = 'current-avatar mb-2';
                        newAvatar.alt = 'Profile Picture Preview';
                        newAvatar.src = event.target.result;
                        
                        avatarContainer.appendChild(newAvatar);
                        profilePictureInput.parentNode.insertBefore(avatarContainer, profilePictureInput);
                    } else {
                        currentAvatar.src = event.target.result;
                    }
                };
                
                reader.readAsDataURL(file);
            }
        });
    }

    // Add character counter for bio textarea
    const bioTextarea = document.querySelector('textarea[name="bio"]');
    if (bioTextarea) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.fontSize = '12px';
        charCounter.style.color = '#6c757d';
        charCounter.style.textAlign = 'right';
        charCounter.style.marginTop = '5px';
        
        bioTextarea.parentNode.appendChild(charCounter);
        
        function updateCounter() {
            const currentLength = bioTextarea.value.length;
            const maxLength = bioTextarea.maxLength || 500;
            charCounter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength * 0.9) {
                charCounter.style.color = '#ff3333';
            } else {
                charCounter.style.color = '#6c757d';
            }
        }
        
        bioTextarea.addEventListener('input', updateCounter);
        updateCounter(); // Initialize counter
    }

    // Add floating labels effect
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Check if input has value on load
            if (input.value) {
                label.classList.add('active');
            }
            
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    });

    // Add smooth scroll to error messages
    const firstError = document.querySelector('.errorlist');
    if (firstError) {
        firstError.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
});