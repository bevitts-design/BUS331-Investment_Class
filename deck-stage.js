(() => {
  if (customElements.get('deck-stage')) return;

  class DeckStage extends HTMLElement {
    connectedCallback() {
      if (this.dataset.ready) return;
      this.dataset.ready = 'true';
      this.slides = Array.from(this.querySelectorAll(':scope > .slide'));
      this.notes = this.readNotes();
      this.index = this.indexFromHash() ?? 0;
      this.setAttribute('role', 'region');
      this.setAttribute('aria-label', 'BUS331 presentation');
      this.prepareStage();
      this.installControls();
      this.installEvents();
      this.resize();
      this.show(this.index, false);
    }

    readNotes() {
      try { return JSON.parse(document.getElementById('speaker-notes')?.textContent || '[]'); }
      catch (error) { console.warn('Speaker notes could not be read.', error); return []; }
    }

    prepareStage() {
      const width = Number(this.getAttribute('width')) || 1920;
      const height = Number(this.getAttribute('height')) || 1080;
      const stage = document.createElement('div');
      stage.className = 'deck-stage-inner';
      stage.style.cssText = `position:absolute;transform-origin:top left;width:${width}px;height:${height}px`;
      this.slides.forEach((slide) => {
        slide.style.position = 'absolute';
        slide.style.inset = '0';
        slide.style.display = 'none';
        stage.appendChild(slide);
      });
      this.appendChild(stage);
      this.stage = stage;
      this.style.cssText = 'display:block;position:fixed;inset:0;width:100vw;height:100vh;overflow:hidden;background:var(--navy)';
    }

    installControls() {
      const controls = document.createElement('nav');
      controls.className = 'deck-controls';
      controls.setAttribute('aria-label', 'Slide controls');
      controls.innerHTML = `
        <button type="button" data-action="prev" aria-label="Previous slide">←</button>
        <span class="deck-count" aria-live="polite"></span>
        <button type="button" data-action="next" aria-label="Next slide">→</button>
        <button type="button" data-action="notes" aria-label="Toggle speaker notes">N</button>
        <button type="button" data-action="full" aria-label="Toggle full screen">⛶</button>`;
      document.body.appendChild(controls);
      this.controls = controls;
      this.counter = controls.querySelector('.deck-count');
      this.notesPanel = document.createElement('aside');
      this.notesPanel.className = 'speaker-notes-panel';
      this.notesPanel.hidden = true;
      this.notesPanel.setAttribute('role', 'note');
      document.body.appendChild(this.notesPanel);
    }

    installEvents() {
      this.controls.addEventListener('click', (event) => {
        const action = event.target.closest('button')?.dataset.action;
        if (action === 'prev') this.show(this.index - 1);
        if (action === 'next') this.show(this.index + 1);
        if (action === 'notes') this.toggleNotes();
        if (action === 'full') this.toggleFullscreen();
      });
      addEventListener('keydown', (event) => {
        if (event.target.matches('input, textarea, select, button')) return;
        if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); this.show(this.index + 1); }
        if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); this.show(this.index - 1); }
        if (event.key === 'Home') this.show(0);
        if (event.key === 'End') this.show(this.slides.length - 1);
        if (event.key.toLowerCase() === 'n') this.toggleNotes();
        if (event.key.toLowerCase() === 'f') this.toggleFullscreen();
      });
      addEventListener('resize', () => this.resize());
      addEventListener('hashchange', () => {
        const index = this.indexFromHash();
        if (index !== null && index !== this.index) this.show(index, false);
      });
      this.addEventListener('click', (event) => {
        if (event.target.closest('a, button, input, textarea, select, .no-advance')) return;
        const ratio = event.clientX / innerWidth;
        if (ratio < 0.28) this.show(this.index - 1);
        if (ratio > 0.72) this.show(this.index + 1);
      });
    }

    indexFromHash() {
      const match = location.hash.match(/^#slide-(\d+)$/);
      if (!match) return null;
      const index = Number(match[1]) - 1;
      return Number.isInteger(index) && index >= 0 && index < this.slides.length ? index : null;
    }

    resize() {
      const width = Number(this.getAttribute('width')) || 1920;
      const height = Number(this.getAttribute('height')) || 1080;
      const scale = Math.min(innerWidth / width, innerHeight / height);
      const x = (innerWidth - width * scale) / 2;
      const y = (innerHeight - height * scale) / 2;
      this.stage.style.transform = `translate(${x}px,${y}px) scale(${scale})`;
    }

    show(next, updateHash = true) {
      if (!this.slides.length) return;
      this.index = Math.max(0, Math.min(this.slides.length - 1, next));
      this.slides.forEach((slide, index) => {
        const active = index === this.index;
        slide.style.display = active ? 'flex' : 'none';
        slide.setAttribute('aria-hidden', String(!active));
        slide.inert = !active;
      });
      this.counter.textContent = `${this.index + 1} / ${this.slides.length}`;
      this.controls.querySelector('[data-action="prev"]').disabled = this.index === 0;
      this.controls.querySelector('[data-action="next"]').disabled = this.index === this.slides.length - 1;
      this.notesPanel.textContent = this.notes[this.index] || 'No speaker note for this slide.';
      document.title = `${this.slides[this.index].dataset.label || 'Slide'} — BUS331`;
      if (updateHash) history.replaceState(null, '', `#slide-${this.index + 1}`);
      this.dispatchEvent(new CustomEvent('slidechange', { detail: { index: this.index } }));
    }

    toggleNotes() { this.notesPanel.hidden = !this.notesPanel.hidden; }
    async toggleFullscreen() {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch (error) { console.warn('Fullscreen is unavailable in this context.', error); }
    }
  }

  customElements.define('deck-stage', DeckStage);
})();
