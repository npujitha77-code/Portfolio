/**
 * N. PUJITHA — LUXURY PERSONAL PORTFOLIO JAVASCRIPT
 * Interactions: Mobile Drawer, ScrollSpy, Lightbox Modal, Gallery Filter, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. DYNAMIC COPYRIGHT YEAR
  // =========================================================================
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 2. MOBILE NAVIGATION DRAWER & OVERLAY
  // =========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleDrawer = (open) => {
    const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('active');
    if (shouldOpen) {
      navMenu.classList.add('active');
      menuToggle.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleDrawer());
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', () => toggleDrawer(false));
  }

  // Close drawer on clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleDrawer(false);
    });
  });

  // =========================================================================
  // 3. STICKY HEADER & SCROLL SPY
  // =========================================================================
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    // Header styling on scroll
    if (header) {
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy: Highlight active navigation link
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Back to top click action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 4. NAIL ART GALLERY CATEGORY FILTER
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('#nailGallery .gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          // Smooth fade in
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 5. LIGHTBOX MODAL (NAIL ART & MODELLING GALLERIES)
  // =========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');

  const openLightbox = (imgSrc, tag, title, desc) => {
    if (!lightboxModal) return;
    lightboxImg.src = imgSrc;
    lightboxTag.textContent = tag || 'PORTFOLIO PREVIEW';
    lightboxTitle.textContent = title || 'Artwork Concept';
    lightboxDesc.textContent = desc || 'Designed and curated by N. Pujitha.';

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach Lightbox triggers to Nail Art Cards
  document.querySelectorAll('#nailGallery .gallery-card').forEach(card => {
    const img = card.querySelector('.gallery-image');
    const trigger = card.querySelector('.lightbox-trigger');
    const tag = card.querySelector('.overlay-category') ? card.querySelector('.overlay-category').textContent : '';
    const title = card.querySelector('.overlay-title') ? card.querySelector('.overlay-title').textContent : '';
    const desc = card.querySelector('.overlay-desc') ? card.querySelector('.overlay-desc').textContent : '';

    if (trigger && img) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(img.src, tag, title, desc);
      });
    }

    // Also clicking media wrapper opens lightbox
    const media = card.querySelector('.card-media');
    if (media && img) {
      media.addEventListener('click', () => {
        openLightbox(img.src, tag, title, desc);
      });
    }
  });

  // Attach Lightbox triggers to Magazine Modelling Cards
  document.querySelectorAll('.editorial-magazine-grid .magazine-card').forEach(card => {
    const img = card.querySelector('.magazine-img');
    const trigger = card.querySelector('.lightbox-trigger');
    const tag = card.querySelector('.issue-tag') ? card.querySelector('.issue-tag').textContent : '';
    const title = card.querySelector('.magazine-meta h4') ? card.querySelector('.magazine-meta h4').textContent : '';
    const desc = card.querySelector('.magazine-meta p') ? card.querySelector('.magazine-meta p').textContent : '';

    if (trigger && img) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(img.src, tag, title, desc);
      });
    }

    const inner = card.querySelector('.card-inner');
    if (inner && img) {
      inner.addEventListener('click', () => {
        openLightbox(img.src, tag, title, desc);
      });
    }
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  // Close lightbox on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // =========================================================================
  // 6. CONTACT FORM VALIDATION & CONFIRMATION
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const formFeedback = document.getElementById('formFeedback');
  const closeFeedbackBtn = document.getElementById('closeFeedbackBtn');

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.classList.add('visible');
        nameInput.focus();
        isValid = false;
      } else {
        nameError.classList.remove('visible');
      }

      // Validate Email
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        emailError.classList.add('visible');
        if (isValid) emailInput.focus();
        isValid = false;
      } else {
        emailError.classList.remove('visible');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.classList.add('visible');
        if (isValid) messageInput.focus();
        isValid = false;
      } else {
        messageError.classList.remove('visible');
      }

      if (isValid) {
        // Show interactive success confirmation
        if (formFeedback) {
          formFeedback.classList.add('active');
        }
        contactForm.reset();
      }
    });

    // Remove errors on input
    if (nameInput) nameInput.addEventListener('input', () => nameError.classList.remove('visible'));
    if (emailInput) emailInput.addEventListener('input', () => emailError.classList.remove('visible'));
    if (messageInput) messageInput.addEventListener('input', () => messageError.classList.remove('visible'));
  }

  if (closeFeedbackBtn && formFeedback) {
    closeFeedbackBtn.addEventListener('click', () => {
      formFeedback.classList.remove('active');
    });
  }

  // =========================================================================
  // 7. SMOOTH LINK SCROLL WITH HEADER OFFSET
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Log confirmation of luxury initialization
  console.log('✦ N. Pujitha Luxury Brand Portfolio Initialized Flawlessly ✦');
});
