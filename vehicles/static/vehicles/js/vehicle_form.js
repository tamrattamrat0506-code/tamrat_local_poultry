document.addEventListener('DOMContentLoaded', function() {
    // Collapsible sections
    const sectionToggles = document.querySelectorAll('.section-toggle');
    sectionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            const section = document.getElementById(`${sectionId}Section`);
            this.classList.toggle('active');
            section.classList.toggle('collapsed');
        });
    });

    // Character counter for description
    const descriptionField = document.getElementById('id_description');
    const charCount = document.getElementById('charCount');
    
    if (descriptionField && charCount) {
        descriptionField.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    // Color preview
    const colorField = document.getElementById('id_color');
    const colorPreview = document.getElementById('colorPreview');
    
    if (colorField && colorPreview) {
        colorField.addEventListener('input', function() {
            colorPreview.style.backgroundColor = this.value;
        });
        
        // Initialize with current value
        if (colorField.value) {
            colorPreview.style.backgroundColor = colorField.value;
        }
    }

    // Image upload and preview
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.querySelector('#uploadArea input[type="file"]');
    const previewContainer = document.getElementById('imagePreview');
    
    if (uploadArea && fileInput && previewContainer) {
        // Handle drag and drop
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                updatePreview(fileInput.files);
            }
        });
        
        // Handle file selection
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                updatePreview(this.files);
            }
        });
        
        function updatePreview(files) {
            previewContainer.innerHTML = '';
            
            if (files.length === 0) {
                previewContainer.innerHTML = `
                    <div class="preview-placeholder">
                        <i class="fas fa-car"></i>
                        <p>{% trans "No images selected" %}</p>
                    </div>
                `;
                return;
            }
            
            Array.from(files).forEach((file, index) => {
                if (index >= 10) return; // Limit to 10 images
                
                if (file.type.match('image.*')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const previewItem = document.createElement('div');
                        previewItem.className = 'preview-item';
                        previewItem.innerHTML = `
                            <img src="${e.target.result}" class="preview-thumbnail" alt="Preview">
                            <button class="remove-image" data-index="${index}">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        previewContainer.appendChild(previewItem);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // Handle image removal
        previewContainer.addEventListener('click', function(e) {
            if (e.target.closest('.remove-image')) {
                const index = e.target.closest('.remove-image').dataset.index;
                const files = Array.from(fileInput.files);
                files.splice(index, 1);
                
                // Create new FileList (since FileList is read-only)
                const dataTransfer = new DataTransfer();
                files.forEach(file => dataTransfer.items.add(file));
                fileInput.files = dataTransfer.files;
                
                updatePreview(fileInput.files);
            }
        });
    }

    // Dynamic fields based on vehicle type
    const vehicleTypeField = document.getElementById('id_vehicle_type');
    const engineSizeGroup = document.getElementById('engineSizeGroup');
    
    if (vehicleTypeField && engineSizeGroup) {
        vehicleTypeField.addEventListener('change', function() {
            if (this.value === 'bicycle') {
                engineSizeGroup.style.display = 'none';
            } else {
                engineSizeGroup.style.display = 'block';
            }
        });
        
        // Initialize on page load
        if (vehicleTypeField.value === 'bicycle') {
            engineSizeGroup.style.display = 'none';
        }
    }

    // Form validation
    const form = document.getElementById('vehicleForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value) {
                    field.style.borderColor = 'var(--error-color)';
                    isValid = false;
                    
                    // Ensure error message exists
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.style.borderColor = '';
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Scroll to first error
                const firstError = form.querySelector('[style*="border-color: var(--error-color)"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
});