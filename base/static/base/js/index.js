document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const sections = document.querySelectorAll('.why-platform-section, .connect-section, .transparent-markets-section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  function animateOnScroll() {
    sections.forEach(section => {
      const sectionPosition = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if (sectionPosition < screenPosition) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  }
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  const languageForm = document.getElementById('language-form');
  if (languageForm) {
    let isSubmitting = false;

    languageForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (isSubmitting) return;
      
      isSubmitting = true;
      const formData = new FormData(this);
      const buttons = this.querySelectorAll('.language-btn');
      const selectedBtn = e.submitter;
      buttons.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove('active');
      });
      selectedBtn.classList.add('loading');

      try {
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
            'X-Requested-With': 'XMLHttpRequest'
          },
          redirect: 'manual'
        });

        if (response.status === 302) {
          const redirectUrl = response.headers.get('Location') || window.location.href;
          window.location.href = redirectUrl;
        } else if (response.ok) {
          const data = await response.json();
          if (data.success) {
            window.location.reload();
          } else {
            throw new Error(data.message || 'Language switch failed');
          }
        } else {
          throw new Error(`Server responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Language switch error:', error);
        showLanguageError('Please refresh the page and try again');
      } finally {
        isSubmitting = false;
        buttons.forEach(btn => btn.disabled = false);
        selectedBtn.classList.remove('loading');
      }
    });

    function showLanguageError(message) {
      const existingError = languageForm.querySelector('.error-message');
      if (existingError) existingError.remove();
      
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      languageForm.appendChild(errorElement);
      
      setTimeout(() => {
        if (languageForm.contains(errorElement)) {
          languageForm.removeChild(errorElement);
        }
      }, 5000);
    }
  }

  const stats = [
    { element: '.stat-farmers', target: 70, suffix: '%' },
    { element: '.stat-eggs', target: 300, suffix: 'M+' }
  ];
  stats.forEach(stat => {
    const element = document.querySelector(stat.element);
    if (element) {
      const duration = 2000;
      const start = 0;
      const increment = stat.target / (duration / 16);
      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          clearInterval(timer);
          current = stat.target;
        }
        element.textContent = Math.floor(current) + stat.suffix;
      }, 16);
    }
  });

  const heroSection = document.getElementById("heroSection");
  if (heroSection) {
    heroSection.style.opacity = 0;
    heroSection.style.transition = "opacity 1.2s ease-out";
    setTimeout(() => {
      heroSection.style.opacity = 1;
    }, 200);
  }

  function updateDateTime() {
    const now = new Date();
    const options = { 
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    const dateTimeElem = document.querySelector('.date-and-time');
    if (dateTimeElem) {
      dateTimeElem.textContent = now.toLocaleString(undefined, options);
    }
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);
});










document.addEventListener('DOMContentLoaded', function() {
    const companyLogos = document.querySelectorAll('.company-logo');
    
    // Add hover effects and click handlers
    companyLogos.forEach(logo => {
        // Preload images
        const img = logo.querySelector('img');
        if (img) {
            const imgSrc = img.getAttribute('src');
            if (imgSrc) {
                const preloadImg = new Image();
                preloadImg.src = imgSrc;
            }
        }
        
        // Add click animation
        logo.addEventListener('click', function(e) {
            // Add a temporary class for click animation
            this.classList.add('logo-clicked');
            
            // Remove the class after animation completes
            setTimeout(() => {
                this.classList.remove('logo-clicked');
            }, 300);
        });
    });
    
    // Optional: Add intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('logo-visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        companyLogos.forEach(logo => {
            observer.observe(logo);
        });
    }
}); 