document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when links are clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Sticky Header Scroll Effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Fallback for Scroll-Driven Animations
  // If browser does not support CSS scroll-driven animations natively
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
          entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animated');
    animatedElements.forEach(el => {
      // Set initial styles for fallback
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px) scale(0.95)';
      observer.observe(el);
    });
  }

  // 4. Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;

      // Local validation
      if (!name || !phone) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please fill out your name and phone number.';
        return;
      }

      // Simulate API submit
      formMessage.className = 'form-message';
      formMessage.textContent = 'Sending your request...';
      formMessage.style.color = '#FFFFFF';

      setTimeout(() => {
        formMessage.className = 'form-message success';
        formMessage.textContent = `Thank you, ${name}! We have received your inquiry for ${service} design and will call you back at ${phone} shortly.`;
        
        // Reset form
        contactForm.reset();
      }, 1500);
    });
  }
});
