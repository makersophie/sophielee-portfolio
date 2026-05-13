(function () {
  var style = document.createElement('style');
  style.textContent = [
    '[data-sr] {',
    '  opacity: 0;',
    '  transform: translateY(24px);',
    '  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),',
    '              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);',
    '}',
    '[data-sr].sr-visible {',
    '  opacity: 1;',
    '  transform: none;',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  document.addEventListener('DOMContentLoaded', function () {
    // Each of these is treated as one unit — the whole block fades up together
    var TARGETS = [
      '.project-header',
      '.hero-image',
      'section.section',
      '.next-project',
    ].join(', ');

    document.querySelectorAll(TARGETS).forEach(function (el) {
      el.setAttribute('data-sr', '');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-sr]').forEach(function (el) {
      var rect = el.getBoundingClientRect();
      // Reveal immediately: in-viewport OR already scrolled past (top < vh covers both)
      if (rect.top < window.innerHeight) {
        el.classList.add('sr-visible');
      } else {
        observer.observe(el);
      }
    });
  });
}());
