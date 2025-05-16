document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <div class="lightbox-content">
    <img class="lightbox-image" src="" alt="">
    </div>
  `;
  document.body.appendChild(lightbox);
  
  document.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
    const img = lightbox.querySelector('.lightbox-image');
    img.src = thumb.dataset.largeSrc || thumb.src; 
    img.alt = thumb.alt;
    lightbox.style.display = 'flex'; 
    });
  });
  
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
    lightbox.style.display = 'none';
    }
  });
  
  const contactBtn = document.querySelector('.contact-seller-btn');
  if (contactBtn) {
    contactBtn.addEventListener('mouseenter', () => {
    contactBtn.classList.add('hover-shadow');
    });
    contactBtn.addEventListener('mouseleave', () => {
    contactBtn.classList.remove('hover-shadow');
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const mainImageContainer = document.querySelector('.main-image-container');
  const mainImage = mainImageContainer.querySelector('.main-image');

  document.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.dataset.largeSrc || thumb.src;
      mainImage.alt = thumb.alt;
    });
  });

  mainImageContainer.addEventListener('mouseenter', () => {
    mainImage.classList.add('zoom-effect');
  });

  mainImageContainer.addEventListener('mouseleave', () => {
    mainImage.classList.remove('zoom-effect');
  });
});
