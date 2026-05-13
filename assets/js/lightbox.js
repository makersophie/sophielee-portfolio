(function () {
  // Inject CSS
  var style = document.createElement('style');
  style.textContent = [
    '.lightbox-trigger { cursor: zoom-in; }',
    '#lightbox {',
    '  display: none;',
    '  position: fixed;',
    '  inset: 0;',
    '  z-index: 9999;',
    '  background: rgba(0,0,0,0.85);',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: 24px;',
    '}',
    '#lightbox.open { display: flex; }',
    '#lightbox img {',
    '  max-width: 90vw;',
    '  max-height: 90vh;',
    '  border-radius: 8px;',
    '  object-fit: contain;',
    '  box-shadow: 0 8px 48px rgba(0,0,0,0.5);',
    '}',
    '#lightbox-close {',
    '  position: fixed;',
    '  top: 20px;',
    '  right: 24px;',
    '  width: 40px;',
    '  height: 40px;',
    '  border-radius: 50%;',
    '  background: rgba(255,255,255,0.15);',
    '  border: none;',
    '  color: #fff;',
    '  font-size: 20px;',
    '  line-height: 1;',
    '  cursor: pointer;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  transition: background 0.15s;',
    '}',
    '#lightbox-close:hover { background: rgba(255,255,255,0.3); }'
  ].join('\n');
  document.head.appendChild(style);

  // Inject overlay HTML
  document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.innerHTML = '<button id="lightbox-close" aria-label="Close">\u2715</button><img id="lightbox-img" src="" alt="" />';
    document.body.appendChild(overlay);

    var lb     = overlay;
    var lbImg  = document.getElementById('lightbox-img');
    var lbClose = document.getElementById('lightbox-close');

    var EXCLUDE = '.card-client img, .quote-avatar img, nav img, .next-project-thumb img';

    function openLightbox(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      lbImg.src = '';
    }

    document.querySelectorAll('img').forEach(function (img) {
      if (img.closest(EXCLUDE)) return;
      if (img.closest('nav') || img.closest('.next-project-thumb')) return;
      img.classList.add('lightbox-trigger');
      img.addEventListener('click', function () { openLightbox(img.src, img.alt); });
    });

    lbClose.addEventListener('click', closeLightbox);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
  });
}());
