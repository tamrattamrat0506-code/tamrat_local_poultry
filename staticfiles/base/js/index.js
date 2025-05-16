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
  