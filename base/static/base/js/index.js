document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Initialize slider
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            // Reset animation for all slides
            slide.querySelector('.slide-content').style.animation = 'none';
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class and trigger animation
        slides[index].classList.add('active');
        setTimeout(() => {
            slides[index].querySelector('.slide-content').style.animation = 'fadeInUp 1s ease';
        }, 10);
        
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    }
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 6000);
    
    // Pause on hover and focus
    const sliderContainer = document.querySelector('.slider-container');
    function pauseSlider() {
        clearInterval(slideInterval);
    }
    
    function resumeSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    sliderContainer.addEventListener('mouseenter', pauseSlider);
    sliderContainer.addEventListener('mouseleave', resumeSlider);
    sliderContainer.addEventListener('focusin', pauseSlider);
    sliderContainer.addEventListener('focusout', resumeSlider);
    
    // Navigation controls
    nextBtn.addEventListener('click', () => {
        pauseSlider();
        nextSlide();
        resumeSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        pauseSlider();
        prevSlide();
        resumeSlider();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            pauseSlider();
            showSlide(index);
            resumeSlider();
        });
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseSlider();
    }, {passive: true});
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resumeSlider();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }
    
    // Tab filtering
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productsContainer = document.querySelector('.products-container');
    
    // Sample product data - in a real app, this would come from an API
    const sampleProducts = [
        { category: 'cars', title: 'Toyota Camry 2022', price: '$25,000' },
        { category: 'electronics', title: 'MacBook Pro 14"', price: '$1,999' },
        { category: 'houses', title: 'Modern Villa', price: '$350,000' },
        // Add more sample products as needed
    ];
    
    function renderProducts(category = 'all') {
        productsContainer.innerHTML = '';
        
        const filteredProducts = category === 'all' 
            ? sampleProducts 
            : sampleProducts.filter(product => product.category === category);
        
        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = '<p class="no-products">No products found in this category</p>';
            return;
        }
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="https://via.placeholder.com/300" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p class="price">${product.price}</p>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderProducts(this.dataset.category);
        });
    });
    
    // Initialize
    showSlide(0);
    renderProducts();
    
    // Responsive adjustments
    function handleResize() {
        // You could add responsive adjustments here if needed
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Initialize slider
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            // Reset animation for all slides
            const content = slide.querySelector('.slide-content');
            if (content) {
                content.style.animation = 'none';
            }
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class and trigger animation
        slides[index].classList.add('active');
        setTimeout(() => {
            const content = slides[index].querySelector('.slide-content');
            if (content) {
                content.style.animation = 'fadeInUp 1s ease';
            }
        }, 10);
        
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    }
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 6000);
    
    // Pause on hover and focus
    const sliderContainer = document.querySelector('.slider-container');
    function pauseSlider() {
        clearInterval(slideInterval);
    }
    
    function resumeSlider() {
        slideInterval = setInterval(nextSlide, 6000);
    }
    
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', pauseSlider);
        sliderContainer.addEventListener('mouseleave', resumeSlider);
        sliderContainer.addEventListener('focusin', pauseSlider);
        sliderContainer.addEventListener('focusout', resumeSlider);
    }
    
    // Navigation controls
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            pauseSlider();
            nextSlide();
            resumeSlider();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            pauseSlider();
            prevSlide();
            resumeSlider();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            pauseSlider();
            showSlide(index);
            resumeSlider();
        });
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            pauseSlider();
        }, {passive: true});
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resumeSlider();
        }, {passive: true});
    }
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }
    
    // Tab filtering
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productsContainer = document.querySelector('.products-container');
    
    // Sample product data - in a real app, this would come from an API
    const sampleProducts = [
        { category: 'cars', title: 'Toyota Camry 2022', price: '$25,000' },
        { category: 'electronics', title: 'MacBook Pro 14"', price: '$1,999' },
        { category: 'houses', title: 'Modern Villa', price: '$350,000' },
        { category: 'poultry', title: 'Chicken Feed', price: '$15' },
    ];
    
    function renderProducts(category = 'all') {
        if (!productsContainer) return;
        
        productsContainer.innerHTML = '';
        
        const filteredProducts = category === 'all' 
            ? sampleProducts 
            : sampleProducts.filter(product => product.category === category);
        
        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = '<p class="no-products">No products found in this category</p>';
            return;
        }
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="https://via.placeholder.com/300" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p class="price">${product.price}</p>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderProducts(this.dataset.category);
        });
    });
    
    // Initialize
    showSlide(0);
    renderProducts();
    
    // Make sure all buttons are properly linked
    document.querySelectorAll('a.btn-primary').forEach(btn => {
        if (btn.getAttribute('href') === '#') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Add your default behavior here
                console.log('Button clicked:', btn.textContent.trim());
            });
        }
    });
});