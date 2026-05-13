(function () {
  // ── CSS ──────────────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '@keyframes cs-sk-pulse {',
    '  0%   { background-position: 200% 0; }',
    '  100% { background-position: -200% 0; }',
    '}',
    '#cs-sk {',
    '  position: fixed;',
    '  inset: 0;',
    '  z-index: 9990;',
    '  background: #fff;',
    '  overflow: hidden;',
    '  opacity: 1;',
    '  transition: opacity 0.45s ease;',
    '  pointer-events: none;',
    '}',
    '#cs-sk.sk-hidden { opacity: 0; }',
    '.cs-sk-box {',
    '  border-radius: 6px;',
    '  background: linear-gradient(90deg, #ebebeb 25%, #f5f5f5 50%, #ebebeb 75%);',
    '  background-size: 400% 100%;',
    '  animation: cs-sk-pulse 1.5s ease infinite;',
    '}',
    /* Nav: full width with centered inner — matches real nav */
    '.cs-sk-nav {',
    '  height: 52px;',
    '  border-bottom: 1px solid #e8e8e8;',
    '  background: #fff;',
    '}',
    '.cs-sk-nav-inner {',
    '  max-width: 1100px;',
    '  margin: 0 auto;',
    '  padding: 0 48px;',
    '  height: 100%;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '}',
    '.cs-sk-nav-links { display: flex; gap: 28px; align-items: center; }',
    /* Page wrap — matches .page-wrap */
    '.cs-sk-page-wrap {',
    '  max-width: 1100px;',
    '  margin: 0 auto;',
    '}',
    /* Layout row — matches .layout */
    '.cs-sk-layout {',
    '  display: flex;',
    '  padding-top: 52px;',
    '  min-height: calc(100vh - 52px);',
    '}',
    '.cs-sk-sidebar {',
    '  flex-shrink: 0;',
    '  width: 210px;',
    '  padding: 36px 24px 36px 0;',
    '  display: flex;',
    '  flex-direction: column;',
    '}',
    '.cs-sk-nav-items { display: flex; flex-direction: column; gap: 16px; margin-top: 28px; }',
    '.cs-sk-nav-item { display: flex; align-items: center; gap: 10px; }',
    '.cs-sk-dot { width: 6px; height: 6px; border-radius: 50%; background: #e0e0e0; flex-shrink: 0; }',
    '.cs-sk-main {',
    '  flex: 1;',
    '  padding: 52px 0 0 60px;',
    '  overflow: hidden;',
    '}',
    '.cs-sk-tags { display: flex; gap: 8px; margin-top: 16px; }',
    '.cs-sk-pill { border-radius: 999px !important; }',
    '.cs-sk-hero {',
    '  width: 100%;',
    '  aspect-ratio: 16 / 7;',
    '  border-radius: 10px;',
    '  margin-top: 24px;',
    '}',
    '/* Hide real content until skeleton is dismissed */',
    '.cs-content-hidden {',
    '  opacity: 0;',
    '}',
    '.cs-content-reveal {',
    '  opacity: 1;',
    '  transition: opacity 0.45s ease;',
    '}',
    '@media (max-width: 760px) {',
    '  .cs-sk-nav-inner { padding: 0 24px; }',
    '  .cs-sk-sidebar { display: none; }',
    '  .cs-sk-main { padding: 32px 24px 0; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ── Build HTML ────────────────────────────────────────────────────────────
  function box(w, h, extra) {
    return '<div class="cs-sk-box' + (extra || '') + '" style="width:' + w + ';height:' + h + 'px;"></div>';
  }

  var navItems = '';
  var widths = ['62%', '70%', '55%', '68%', '75%', '58%', '72%', '60%'];
  for (var i = 0; i < 8; i++) {
    navItems += '<div class="cs-sk-nav-item"><div class="cs-sk-dot"></div>' + box(widths[i], 11) + '</div>';
  }

  var skHTML = [
    '<div id="cs-sk" aria-hidden="true">',
    '  <div class="cs-sk-nav">',
    '    <div class="cs-sk-nav-inner">',
    '      ' + box('100px', 13),
    '      <div class="cs-sk-nav-links">',
    '        ' + box('34px', 11),
    '        ' + box('42px', 11),
    '        ' + box('86px', 30, ' cs-sk-pill'),
    '      </div>',
    '    </div>',
    '  </div>',
    '  <div class="cs-sk-page-wrap">',
    '    <div class="cs-sk-layout">',
    '      <div class="cs-sk-sidebar">',
    '        ' + box('90px', 10),
    '        <div style="margin-top:32px;display:flex;flex-direction:column;gap:8px;">',
    '          ' + box('44px', 10),
    '          ' + box('80%', 18),
    '        </div>',
    '        <div class="cs-sk-nav-items">' + navItems + '</div>',
    '      </div>',
    '      <div class="cs-sk-main">',
    '        <div style="display:flex;justify-content:space-between;align-items:center;">',
    '          ' + box('42%', 22),
    '          <div class="cs-sk-tags">',
    '            ' + box('80px', 26, ' cs-sk-pill'),
    '            ' + box('64px', 26, ' cs-sk-pill'),
    '            ' + box('44px', 26, ' cs-sk-pill'),
    '          </div>',
    '        </div>',
    '        <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px;">',
    '          ' + box('88%', 13),
    '          ' + box('72%', 13),
    '        </div>',
    '        <div class="cs-sk-box cs-sk-hero"></div>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  // ── Insert skeleton + hide real content immediately ───────────────────────
  // This script runs at end of <body> (no defer), so DOM is available.
  var tmp = document.createElement('div');
  tmp.innerHTML = skHTML;
  var skEl = tmp.firstElementChild;
  document.body.insertBefore(skEl, document.body.firstChild);

  // Hide main content wrapper immediately
  var contentEl = document.querySelector('.layout') ||
                  document.querySelector('.page-wrap') ||
                  document.querySelector('main');
  if (contentEl) contentEl.classList.add('cs-content-hidden');

  // ── Dismiss: fade out skeleton, fade in content ───────────────────────────
  var dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    skEl.classList.add('sk-hidden');
    if (contentEl) {
      contentEl.classList.remove('cs-content-hidden');
      contentEl.classList.add('cs-content-reveal');
    }
    setTimeout(function () { if (skEl.parentNode) skEl.remove(); }, 500);
  }

  if (document.readyState === 'complete') {
    // Already loaded — still show skeleton briefly so it's visible
    setTimeout(dismiss, 400);
  } else {
    window.addEventListener('load', function () { setTimeout(dismiss, 200); });
  }
  // Safety cap: never block page longer than 5s
  setTimeout(dismiss, 5000);
}());
