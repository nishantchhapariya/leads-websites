document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Mobile Navigation Toggle ──────────────────────────
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── 2. Sticky Header on Scroll ───────────────────────────
  const header = document.getElementById('main-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── 3. Active Nav Link Highlight ─────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(sec => sectionObserver.observe(sec));

  // ── 4. Scroll-Animated Elements (JS fallback) ────────────
  if (!CSS.supports('animation-timeline', 'view()')) {
    const animObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          animObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.scroll-animated').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
      animObs.observe(el);
    });
  }

  // ── 5. Animated Counters (Stats Strip) ───────────────────
  const counterEls = document.querySelectorAll('[data-target]');

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));

  // ── 6. Contact Form ───────────────────────────────────────
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');

  if (form && formMsg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name  = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const type  = document.getElementById('space-type').value;

      if (!name || !phone) {
        formMsg.className = 'form-message error';
        formMsg.textContent = 'Please fill in your name and phone number.';
        return;
      }

      // Loading state
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;
      formMsg.className = 'form-message';
      formMsg.textContent = '';

      setTimeout(() => {
        formMsg.className = 'form-message success';
        formMsg.textContent = `✓ Thank you, ${name}! We'll call you at ${phone} to discuss your ${type} project.`;
        form.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      }, 1500);
    });
  }

});
