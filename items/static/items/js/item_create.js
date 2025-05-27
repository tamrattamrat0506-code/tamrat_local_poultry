document.addEventListener('DOMContentLoaded', function() {
    // Enhance file input display
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const files = this.files;
            const label = this.previousElementSibling;
            
            if (files.length > 0) {
                if (files.length === 1) {
                    label.textContent = files[0].name;
                } else {
                    label.textContent = `${files.length} files selected`;
                }
            } else {
                label.textContent = '{% trans "Additional Images" %}';
            }
        });
    }

    // Form validation feedback
    const form = document.querySelector('.item-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    isValid = false;
                    
                    // Add error message if not already present
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('errorlist')) {
                        const error = document.createElement('div');
                        error.className = 'errorlist';
                        error.innerHTML = '<li>{% trans "This field is required" %}</li>';
                        field.parentNode.insertBefore(error, field.nextSibling);
                    }
                } else {
                    field.style.borderColor = '#ddd';
                }
            });

            if (!isValid) {
                e.preventDefault();
                // Scroll to first error
                const firstError = this.querySelector('.errorlist');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // Real-time validation for fields
    const inputs = document.querySelectorAll('.item-form input, .item-form textarea, .item-form select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#ddd';
                const error = this.nextElementSibling;
                if (error && error.classList.contains('errorlist')) {
                    error.remove();
                }
            }
        });
    });
});