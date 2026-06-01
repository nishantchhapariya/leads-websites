document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

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
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animated');
    animatedElements.forEach(el => {
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
      const projectType = document.getElementById('project-type').value;

      if (!name || !phone) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please fill out your name and phone number.';
        return;
      }

      formMessage.className = 'form-message';
      formMessage.textContent = 'Submitting your blueprint request...';

      setTimeout(() => {
        formMessage.className = 'form-message success';
        formMessage.textContent = `Thank you, ${name}! We have registered your request for a ${projectType.replace('-', ' ')} consultation. Our architects will contact you shortly at ${phone}.`;
        contactForm.reset();
      }, 1500);
    });
  }
});
