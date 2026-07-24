(() => {
  const panel = document.createElement('aside');
  panel.className = 'tweaks-panel no-advance';
  panel.setAttribute('aria-label', 'Presentation tools');
  panel.innerHTML = `
    <div class="tweaks-menu" hidden>
      <button type="button" data-tweak="grid">Toggle grid</button>
      <button type="button" data-tweak="contrast">High contrast</button>
      <button type="button" data-tweak="print">Print / PDF</button>
    </div>
    <button class="tweaks-toggle" type="button" aria-expanded="false">Tools</button>`;
  document.body.appendChild(panel);
  const toggle = panel.querySelector('.tweaks-toggle');
  const menu = panel.querySelector('.tweaks-menu');
  toggle.addEventListener('click', () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    toggle.setAttribute('aria-expanded', String(opening));
  });
  panel.addEventListener('click', (event) => {
    const tweak = event.target.dataset.tweak;
    if (tweak === 'grid') document.body.classList.toggle('show-grid');
    if (tweak === 'contrast') document.body.classList.toggle('high-contrast');
    if (tweak === 'print') window.print();
  });
})();
