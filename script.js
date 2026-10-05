/**
 * WALLIX SYSTEM - Interactive Scripts
 * Digital & Creative Technology Studio
 * Lightweight, zero dependencies, vanilla JavaScript.
 * Frontend-only: no API requests, no backend, no database.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. Mobile Hamburger Navigation =====
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav-actions a');

  if (menuToggle && mobileNav) {
    const toggleMenu = () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close when clicking mobile links
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileNav.classList.contains('open')) {
          toggleMenu();
        }
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu();
        menuToggle.focus();
      }
    });
  }

  // ===== 2. Portfolio Filtering =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button style
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // ===== 3. Contact Form — Client-side validation + mailto =====
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerText : 'Send Enquiry';

      const formData = {
        name: document.getElementById('name')?.value.trim(),
        email: document.getElementById('email')?.value.trim(),
        phone: document.getElementById('phone')?.value.trim(),
        service: document.getElementById('service')?.value,
        message: document.getElementById('message')?.value.trim()
      };

      // Validation: required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      // Validation: email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Validation: phone (at least 7 digits)
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 7) {
        showStatus('Please enter a valid phone number.', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Opening Email...';
      }

      try {
        const subject = encodeURIComponent('New Website Enquiry - WALLIX SYSTEM');
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nMessage:\n${formData.message}`
        );

        window.location.href = `mailto:wallix.system@gmail.com?subject=${subject}&body=${body}`;

        showStatus('Opening your email application...', 'success');
        contactForm.reset();
      } catch (err) {
        showStatus('Unable to open email application. Please email us directly at wallix.system@gmail.com', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText;
        }
      }
    });
  }

  function showStatus(text, type) {
    if (!formStatus) return;
    formStatus.textContent = text;
    formStatus.className = `form-status ${type}`;
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ===== 4. Smooth Scroll for Same-Page Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== 5. Update Current Year =====
  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

});
