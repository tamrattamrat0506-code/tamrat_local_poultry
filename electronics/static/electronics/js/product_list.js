document.addEventListener('DOMContentLoaded', function() {
  // ===== Product Card Animations =====
  const productCards = document.querySelectorAll('.product-card');
  
  // Add hover effects
  productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  // ===== Category List Active State =====
  const categoryLinks = document.querySelectorAll('.category-list a');
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all links
      categoryLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
    });
  });

  // ===== Sell Button Ripple Effect =====
  const sellButton = document.querySelector('.btn-sell');
  
  if (sellButton) {
    sellButton.addEventListener('click', function(e) {
      // Create ripple element
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      // Position ripple
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      // Style ripple
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      // Add ripple to button
      this.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // ===== View Button Effects =====
  const viewButtons = document.querySelectorAll('.view-btn');
  
  viewButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 4px 8px rgba(67, 97, 238, 0.3)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
      button.style.boxShadow = '';
    });
    
    // Click effect
    button.addEventListener('mousedown', () => {
      button.style.transform = 'translateY(1px)';
    });
    
    button.addEventListener('mouseup', () => {
      button.style.transform = 'translateY(-2px)';
    });
  });

  // ===== Filter Functionality =====
  const filterSection = document.createElement('div');
  filterSection.className = 'filter-section';
  filterSection.innerHTML = `
    <div class="filter-card">
      <h4>Filter Products</h4>
      <div class="filter-group">
        <label for="price-range">Price Range</label>
        <div class="range-slider">
          <input type="range" id="price-range" min="0" max="1000" value="1000">
          <div class="range-value">Up to $<span id="price-value">1000</span></div>
        </div>
      </div>
      <div class="filter-group">
        <label for="condition-filter">Condition</label>
        <select id="condition-filter">
          <option value="all">All Conditions</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="refurbished">Refurbished</option>
        </select>
      </div>
    </div>
  `;
  
  // Insert filter section
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.insertBefore(filterSection, sidebar.children[1]);
    
    // Price range filter
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    
    priceRange.addEventListener('input', function() {
      priceValue.textContent = this.value;
      filterProducts();
    });
    
    // Condition filter
    const conditionFilter = document.getElementById('condition-filter');
    conditionFilter.addEventListener('change', filterProducts);
  }
  
  // Filter products function
  function filterProducts() {
    const maxPrice = parseInt(priceRange.value);
    const condition = conditionFilter.value;
    
    productCards.forEach(card => {
      const price = parseInt(card.querySelector('.price').textContent.replace('$', ''));
      const productCondition = card.querySelector('.condition-tag').classList[1];
      
      const priceMatch = price <= maxPrice;
      const conditionMatch = condition === 'all' || productCondition === condition;
      
      if (priceMatch && conditionMatch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // ===== Search Functionality =====
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  searchContainer.innerHTML = `
    <div class="search-box">
      <input type="text" placeholder="Search products..." id="product-search">
      <button id="search-button">
        <i class="bi bi-search"></i>
      </button>
    </div>
  `;
  
  // Insert search box
  const pageHeader = document.querySelector('.page-header');
  if (pageHeader) {
    pageHeader.appendChild(searchContainer);
    
    const searchInput = document.getElementById('product-search');
    const searchButton = document.getElementById('search-button');
    
    searchButton.addEventListener('click', searchProducts);
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') searchProducts();
    });
  }
  
  // Search products function
  function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    productCards.forEach(card => {
      const title = card.querySelector('h4').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }
});
