// items/static/items/js/item_create.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.item-form');
    const fields = form.querySelectorAll('input, textarea, select');

    form.addEventListener('submit', (e) => {
        let valid = true;

        fields.forEach(field => {
            if (field.hasAttribute('required') && !field.value.trim()) {
                field.style.borderColor = 'red';
                valid = false;
            } else {
                field.style.borderColor = '#ccc';
            }
        });

        if (!valid) {
            e.preventDefault();
            alert('Please fill in all required fields!');
        }
    });
});
