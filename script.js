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
});
