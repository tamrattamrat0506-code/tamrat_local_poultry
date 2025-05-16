document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Animate sections when they come into view
  const animateOnScroll = () => {
    const sections = document.querySelectorAll('.why-platform-section, .connect-section, .transparent-markets-section');
    
    sections.forEach(section => {
      const sectionPosition = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (sectionPosition < screenPosition) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animation
  const sections = document.querySelectorAll('.why-platform-section, .connect-section, .transparent-markets-section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Run once on load and then on scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Language selector enhancement
  const languageForm = document.getElementById('language-form');
  if (languageForm) {
    const languageBtns = languageForm.querySelectorAll('.language-btn');
    
    languageBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        languageBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show loading feedback
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="loading-dots">...</span>';
        
        setTimeout(() => {
          languageForm.submit();
        }, 300);
      });
    });
  }

  // Stats counter animation
  const stats = [
    { element: '.stat-farmers', target: 70, suffix: '%' },
    { element: '.stat-eggs', target: 300, suffix: 'M+' }
  ];

  stats.forEach(stat => {
    const element = document.querySelector(stat.element);
    if (element) {
      const duration = 2000; // 2 seconds
      const start = 0;
      const increment = stat.target / (duration / 16); // 60fps
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
});




// index.js

document.addEventListener("DOMContentLoaded", function () {
    const heroSection = document.getElementById("heroSection");
  
    // Smooth scroll or fade-in effect
    heroSection.style.opacity = 0;
    heroSection.style.transition = "opacity 1.2s ease-out";
  
    setTimeout(() => {
      heroSection.style.opacity = 1;
    }, 200);
  
    // Optional: Highlight selected language on form submission
    const langButtons = document.querySelectorAll("#language-form button");
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        langButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  });
  