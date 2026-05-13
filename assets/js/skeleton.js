(function () {
  // Inject skeleton CSS
  var style = document.createElement('style');
  style.textContent = [
    '@keyframes sk-shimmer {',
    '  0%   { background-position: 200% 0; }',
    '  100% { background-position: -200% 0; }',
    '}',
    '.sk-loading {',
    '  background: linear-gradient(90deg, #ececec 25%, #f7f7f7 50%, #ececec 75%) !important;',
    '  background-size: 400% 100% !important;',
    '  animation: sk-shimmer 1.4s ease infinite !important;',
    '  color: transparent !important;',
    '}',
    '.sk-video-wrap {',
    '  position: relative;',
    '  display: block;',
    '}',
    '.sk-video-overlay {',
    '  position: absolute;',
    '  inset: 0;',
    '  background: linear-gradient(90deg, #ececec 25%, #f7f7f7 50%, #ececec 75%);',
    '  background-size: 400% 100%;',
    '  animation: sk-shimmer 1.4s ease infinite;',
    '  border-radius: inherit;',
    '  z-index: 2;',
    '  pointer-events: none;',
    '  transition: opacity 0.35s ease;',
    '}',
    '.sk-video-overlay.sk-done { opacity: 0; }'
  ].join('\n');
  document.head.appendChild(style);

  document.addEventListener('DOMContentLoaded', function () {

    // ── Images ────────────────────────────────────────────────
    document.querySelectorAll('img').forEach(function (img) {
      // Skip nav logos / tiny icons
      if (img.closest('nav') || img.closest('.footer')) return;

      // Already fully loaded
      if (img.complete && img.naturalHeight > 0) return;

      img.classList.add('sk-loading');

      function done() { img.classList.remove('sk-loading'); }
      img.addEventListener('load',  done, { once: true });
      img.addEventListener('error', done, { once: true });
    });

    // ── Videos ────────────────────────────────────────────────
    document.querySelectorAll('video').forEach(function (video) {
      // Wrap video so we can absolutely-position an overlay on top
      var parent = video.parentElement;
      var wrap = document.createElement('div');
      wrap.className = 'sk-video-wrap';

      // Preserve inline styles that affect layout (aspect-ratio, border-radius)
      var cs = getComputedStyle(video);
      if (video.style.aspectRatio) wrap.style.aspectRatio = video.style.aspectRatio;
      if (video.style.borderRadius) wrap.style.borderRadius = video.style.borderRadius;
      wrap.style.width  = video.style.width  || '100%';

      parent.insertBefore(wrap, video);
      wrap.appendChild(video);

      var overlay = document.createElement('div');
      overlay.className = 'sk-video-overlay';
      wrap.appendChild(overlay);

      function done() {
        overlay.classList.add('sk-done');
        setTimeout(function () { overlay.remove(); }, 400);
      }

      if (video.readyState >= 2) {
        done();
      } else {
        video.addEventListener('loadeddata',    done, { once: true });
        video.addEventListener('canplay',       done, { once: true });
        video.addEventListener('error',         done, { once: true });
        // Safety fallback — remove after 8 s so it never blocks the page
        setTimeout(done, 8000);
      }
    });

  });
}());
