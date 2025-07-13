document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const slideCount = slides.length;

    // Initialize slider
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
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
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    // Button navigation
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Initialize first slide
    showSlide(0);

    // Mobile menu toggle (would need HTML element)
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header-content').appendChild(mobileMenuBtn);

    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('.main-nav').classList.toggle('active');
    });

    // Product tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productsContainer = document.querySelector('.products-container');

    // Sample product data
    const products = {
        all: [
            {id: 1, category: 'cars', title: '2022 Tesla Model 3', price: 42990, oldPrice: 45990, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 5, reviews: 42, badge: 'Popular'},
            {id: 2, category: 'houses', title: 'Modern 3-Bedroom House', price: 450000, oldPrice: 475000, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4, reviews: 18, badge: 'New'},
            {id: 3, category: 'electronics', title: 'iPhone 14 Pro Max', price: 1099, oldPrice: 1199, image: 'https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 5, reviews: 156, badge: 'Sale'},
            {id: 4, category: 'clothing', title: 'Men\'s Casual Shirt', price: 29, oldPrice: 45, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80', rating: 4, reviews: 89, badge: null},
            {id: 5, category: 'books', title: 'The Psychology of Money', price: 12, oldPrice: 18, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 5, reviews: 203, badge: 'Bestseller'},
            {id: 6, category: 'toys', title: 'LEGO Star Wars Set', price: 59, oldPrice: 79, image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4, reviews: 67, badge: 'Hot'},
        ],
        cars: [
            {id: 1, category: 'cars', title: '2022 Tesla Model 3', price: 42990, oldPrice: 45990, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 5, reviews: 42, badge: 'Popular'},
            {id: 7, category: 'cars', title: '2021 Toyota RAV4', price: 28900, oldPrice: 31500, image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4, reviews: 28, badge: null},
        ],
        houses: [
            {id: 2, category: 'houses', title: 'Modern 3-Bedroom House', price: 450000, oldPrice: 475000, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4, reviews: 18, badge: 'New'},
            {id: 8, category: 'houses', title: 'Luxury Penthouse Apartment', price: 1200000, oldPrice: 1250000, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 5, reviews: 9, badge: 'Luxury'},
        ],
        electronics: [
            {id: 3, category: 'electronics', title: 'iPhone 14 Pro Max', price: 1099, oldPrice: 1199, image: 'https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 5, reviews: 156, badge: 'Sale'},
            {id: 9, category: 'electronics', title: 'Sony 4K Smart TV', price: 899, oldPrice: 999, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4, reviews: 87, badge: null},
        ],
        clothing: [
            {id: 4, category: 'clothing', title: 'Men\'s Casual Shirt', price: 29, oldPrice: 45, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80', rating: 4, reviews: 89, badge: null},
            {id: 10, category: 'clothing', title: 'Women\'s Summer Dress', price: 39, oldPrice: 59, image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80', rating: 5, reviews: 124, badge: 'Popular'},
        ],
        books: [
            {id: 5, category: 'books', title: 'The Psychology of Money', price: 12, oldPrice: 18, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 5, reviews: 203, badge: 'Bestseller'},
            {id: 11, category: 'books', title: 'Atomic Habits', price: 11, oldPrice: 15, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80', rating: 5, reviews: 187, badge: null},
        ],
        toys: [
            {id: 6, category: 'toys', title: 'LEGO Star Wars Set', price: 59, oldPrice: 79, image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 4, reviews: 67, badge: 'Hot'},
            {id: 12, category: 'toys', title: 'Remote Control Car', price: 35, oldPrice: 49, image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', rating: 3, reviews: 42, badge: null},
        ]
    };

    // Render products
    function renderProducts(category) {
        const productsToShow = category === 'all' ? products.all : products[category];
        productsContainer.innerHTML = '';
        
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
            const stars = Array(product.rating).fill('<i class="fas fa-star"></i>').join('');
            
            productCard.innerHTML = `
                ${badge}
                <div class="product-img">
                    <img src="${product.image}" alt="${product.title}">
                    <button class="product-wishlist"><i class="far fa-heart"></i></button>
                </div>
                <div class="product-content">
                    <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toLocaleString()}</span>
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ${stars}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-meta">
                        <span><i class="fas fa-shopping-cart"></i> Add to Cart</span>
                        <span><i class="fas fa-eye"></i> Quick View</span>
                    </div>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        // Add wishlist functionality
        document.querySelectorAll('.product-wishlist').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                this.innerHTML = this.classList.contains('active') ? 
                    '<i class="far fa-heart"></i>' : '<i class="fas fa-heart"></i>';
                this.classList.toggle('active');
                
                // Update wishlist count
                const wishlistCount = document.querySelector('.wishlist-btn .count');
                let count = parseInt(wishlistCount.textContent);
                wishlistCount.textContent = this.classList.contains('active') ? count + 1 : count - 1;
            });
        });
    }

    // Tab functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProducts(this.dataset.category);
        });
    });

    // Initialize with all products
    renderProducts('all');

    // Mega menu toggle for mobile
    const megaMenuToggles = document.querySelectorAll('.mega-menu > .nav-link');
    
    megaMenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 576) {
                e.preventDefault();
                const megaMenu = this.parentElement;
                megaMenu.classList.toggle('active');
            }
        });
    });

    // Cart count update (sample functionality)
    document.querySelectorAll('.product-meta span:first-child').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const cartCount = document.querySelector('.cart-btn .count');
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count + 1;
            
            // Add animation
            cartCount.classList.add('animate');
            setTimeout(() => {
                cartCount.classList.remove('animate');
            }, 300);
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                this.querySelector('input').value = '';
            }
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

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
});