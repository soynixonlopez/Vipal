/**
 * Vipal S.A. - Interacción y navegación
 */

(function () {
  'use strict';

  // Modal Presupuesto
  var modal = document.getElementById('presupuestoModal');
  var openBtnHeader = document.getElementById('openPresupuestoModal');
  var openBtnHero = document.getElementById('openPresupuestoHero');
  var closeBtn = document.getElementById('closePresupuestoModal');
  var presupuestoForm = document.getElementById('presupuestoForm');

  function openPresupuestoModal() {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    if (openBtnHeader) openBtnHeader.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var firstInput = modal.querySelector('input, select, textarea');
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 100);
  }

  function closePresupuestoModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (openBtnHeader) openBtnHeader.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (openBtnHeader) {
    openBtnHeader.addEventListener('click', function () {
      var nav = document.querySelector('.nav');
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      }
      openPresupuestoModal();
    });
  }
  if (openBtnHero) openBtnHero.addEventListener('click', openPresupuestoModal);
  if (closeBtn) closeBtn.addEventListener('click', closePresupuestoModal);

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closePresupuestoModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closePresupuestoModal();
    });
  }

  if (presupuestoForm) {
    presupuestoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = presupuestoForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Enviando…';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = 'Solicitud enviada';
        presupuestoForm.reset();
        setTimeout(function () {
          closePresupuestoModal();
          btn.textContent = originalText;
          btn.disabled = false;
        }, 1200);
      }, 800);
    });
  }

  // Menú móvil
  var menuToggle = document.getElementById('menuToggle');
  var nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-label', nav.classList.contains('is-open') ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
    });
    document.querySelectorAll('.nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Header con scroll
  var header = document.getElementById('header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var top = window.scrollY || document.documentElement.scrollTop;
      if (top > 80) {
        header.style.background = 'rgba(10,10,10,0.95)';
      } else {
        header.style.background = 'rgba(10,10,10,0.85)';
      }
      lastScroll = top;
    }, { passive: true });
  }

  // Contador animado en estadísticas
  var stats = document.querySelectorAll('.stat-num');
  var observerOptions = { threshold: 0.5, rootMargin: '0px' };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-target'), 10);
      var duration = 1500;
      var start = 0;
      var startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var easeOut = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(start + (target - start) * easeOut);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, observerOptions);
  stats.forEach(function (stat) { observer.observe(stat); });

  // Formulario de contacto
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Enviando…';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = 'Mensaje enviado';
        contactForm.reset();
        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      }, 800);
    });
  }

  // Newsletter
  var newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = newsletterForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = '¡Listo!';
      btn.disabled = true;
      setTimeout(function () {
        newsletterForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    });
  }
})();
