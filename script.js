function setLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-ru]').forEach(function (el) {
    el.innerHTML = el.getAttribute('data-' + lang);
  });

  document.getElementById('btn-ru').classList.toggle('active', lang === 'ru');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');

  localStorage.setItem('site-lang', lang);
}

document.addEventListener('DOMContentLoaded', function () {
  var saved = localStorage.getItem('site-lang');
  if (saved === 'en') {
    setLang('en');
  }

  // Sticky bar — hairline appears once the page is scrolled
  var bar = document.getElementById('topbar');
  if (bar) {
    var ticking = false;
    var onScroll = function () {
      bar.classList.toggle('scrolled', window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
    onScroll();
  }

  // Scroll reveal — only when motion is welcome
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var blocks = document.querySelectorAll('.hero, .section, .footer');
  if (reduce || !('IntersectionObserver' in window)) {
    return;
  }
  blocks.forEach(function (el) {
    el.classList.add('reveal');
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  blocks.forEach(function (el) {
    io.observe(el);
  });
});
