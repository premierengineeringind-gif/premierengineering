/* ============================================================
   PT Premier Engineering Indonesia - Main JavaScript
   Version: 1.0
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // =====================
  // 1. LOADING SCREEN
  // =====================
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 800);
  }

  // =====================
  // 2. HERO SLIDER
  // =====================
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.slide');
    const prevBtn = heroSlider.querySelector('.slider-nav.prev');
    const nextBtn = heroSlider.querySelector('.slider-nav.next');
    const dotsContainer = heroSlider.querySelector('.slider-dots');
    let currentSlide = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.slider-dot');

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = index;
      if (currentSlide >= slides.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slides.length - 1;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });

    // Pause on hover
    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);

    // Start auto slide
    startAutoSlide();
  }

  // =====================
  // 3. NAVBAR SCROLL
  // =====================
  const navbar = document.getElementById('navbar');
  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  if (navbar) {
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();
  }

  // =====================
  // 3. HAMBURGER / MOBILE MENU
  // =====================
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMobile.classList.toggle('open');
    });
    // Close on link click
    navMobile.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMobile.classList.remove('open');
      });
    });
  }

  // =====================
  // 4. ACTIVE NAV LINK
  // =====================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // =====================
  // 5. SCROLL REVEAL
  // =====================
  const revealElements = document.querySelectorAll('.reveal');
  function revealOnScroll() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }
  if (revealElements.length) {
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
  }

  // =====================
  // 6. BACK TO TOP
  // =====================
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =====================
  // 7. PRODUCT FILTER (products page)
  // =====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  if (filterBtns.length && productCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-filter');
        productCards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
            setTimeout(() => card.style.opacity = 1, 10);
          } else {
            card.style.opacity = 0;
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }

  // =====================
  // 8. CATALOGUE SEARCH & FILTER
  // =====================
  const catSearch = document.getElementById('cat-search');
  const catFilter = document.getElementById('cat-filter');
  const catCards = document.querySelectorAll('.catalogue-card');
  function filterCatalogue() {
    const query = catSearch ? catSearch.value.toLowerCase() : '';
    const cat = catFilter ? catFilter.value : 'all';
    catCards.forEach(card => {
      const name = card.querySelector('.catalogue-name').textContent.toLowerCase();
      const desc = card.querySelector('.catalogue-desc').textContent.toLowerCase();
      const cardCat = card.getAttribute('data-category');
      const matchSearch = name.includes(query) || desc.includes(query);
      const matchCat = cat === 'all' || cardCat === cat;
      card.style.display = matchSearch && matchCat ? '' : 'none';
    });
  }
  if (catSearch) catSearch.addEventListener('input', filterCatalogue);
  if (catFilter) catFilter.addEventListener('change', filterCatalogue);

  // =====================
  // 9. CONTACT FORM VALIDATION
  // =====================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Helper
      function validateField(id, rule) {
        const group = document.getElementById(id).closest('.form-group');
        const input = document.getElementById(id);
        if (!rule(input.value)) {
          group.classList.add('has-error');
          input.classList.add('error');
          valid = false;
        } else {
          group.classList.remove('has-error');
          input.classList.remove('error');
        }
      }

      validateField('cf-name', v => v.trim().length >= 2);
      validateField('cf-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      validateField('cf-phone', v => v.trim().length >= 7);
      validateField('cf-message', v => v.trim().length >= 10);

      if (valid) {
        const successNotice = document.getElementById('form-success');
        if (successNotice) {
          successNotice.style.display = 'block';
          contactForm.reset();
          setTimeout(() => successNotice.style.display = 'none', 5000);
        }
      }
    });

    // Live clear errors
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        input.closest('.form-group').classList.remove('has-error');
      });
    });
  }

  // =====================
  // 10. SMOOTH COUNTER ANIMATION (stats)
  // =====================
  const counters = document.querySelectorAll('.counter');
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + (el.getAttribute('data-suffix') || '');
    }, 16);
  }

  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = true;
          animateCounter(entry.target);
        }
      });
    });
    counters.forEach(c => observer.observe(c));
  }

  // =====================
  // 11. OVERVIEW SLIDER
  // =====================
  const ovSlider = document.querySelector('.overview-slider');
  if (ovSlider) {
    const slides = ovSlider.querySelectorAll('.os-slide');
    const prevBtn = ovSlider.querySelector('.os-nav.prev');
    const nextBtn = ovSlider.querySelector('.os-nav.next');
    let cur = 0;
    
    function showOsSlide(index) {
      slides[cur].classList.remove('active');
      cur = (index + slides.length) % slides.length;
      slides[cur].classList.add('active');
    }
    
    if (prevBtn) prevBtn.addEventListener('click', () => showOsSlide(cur - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showOsSlide(cur + 1));
    
    let osInterval = setInterval(() => showOsSlide(cur + 1), 3500);
    ovSlider.addEventListener('mouseenter', () => clearInterval(osInterval));
    ovSlider.addEventListener('mouseleave', () => {
      osInterval = setInterval(() => showOsSlide(cur + 1), 3500);
    });
  }

});
