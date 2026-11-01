/* RoboMisión LAB v18 · ampliación accesible de imágenes didácticas */
'use strict';
(() => {
  if (window.ROBO_IMAGE_ZOOM_18) return;
  window.ROBO_IMAGE_ZOOM_18 = true;

  const codeImageSelector = [
    '.rmk-image', '.mk6-image', '.mq6-image', '.mk-real-image',
    '.mk-live-target img', '.mq-live-target img',
    '.mk-live-figure img', '.mq-live-figure img',
    '.sheet-blocks img', '.rlz-code-img'
  ].join(',');

  const isEligible = (img) => img instanceof HTMLImageElement &&
    !!img.closest('main, .pro-main, .sheet, .page, .laboratorio, .lab-main') &&
    !img.closest('a, button, .rlz-overlay, [data-no-zoom]') &&
    !!(img.currentSrc || img.src);
  const isCodeImage = (img) => !!img.matches(codeImageSelector);
  let overlay = null, stage = null, photo = null, label = null, percent = null;
  let closeBtn = null, lastFocus = null, savedOverflow = '';
  let scale = 1, offsetX = 0, offsetY = 0, moving = false;
  const pointers = new Map();
  let pinchDistance = 0, pinchInitial = 1, dragX = 0, dragY = 0;

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function boundPan() {
    if (!photo || !stage || scale <= 1) { offsetX = 0; offsetY = 0; return; }
    const maxX = Math.max(0, (photo.offsetWidth * scale - stage.clientWidth) / 2);
    const maxY = Math.max(0, (photo.offsetHeight * scale - stage.clientHeight) / 2);
    offsetX = clamp(offsetX, -maxX, maxX);
    offsetY = clamp(offsetY, -maxY, maxY);
  }
  function draw() {
    if (!overlay) return;
    boundPan();
    photo.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`;
    percent.textContent = Math.round(scale * 100) + '%';
    overlay.querySelector('[data-rz="minus"]').disabled = scale <= 1;
    overlay.querySelector('[data-rz="plus"]').disabled = scale >= 5;
    stage.classList.toggle('is-zoomed', scale > 1);
  }
  function zoomTo(s) { scale = clamp(Math.round(s * 100) / 100, 1, 5); draw(); }
  function reset() { scale = 1; offsetX = 0; offsetY = 0; draw(); }
  function makeOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'rlz-overlay';
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Ampliar imagen');
    overlay.innerHTML = `
      <div class="rlz-toolbar">
        <div class="rlz-title" id="rlz18-title"></div>
        <div class="rlz-controls">
          <button type="button" data-rz="minus" aria-label="Reducir imagen" title="Reducir imagen">−</button>
          <span class="rlz-percent" aria-live="polite">100%</span>
          <button type="button" data-rz="plus" aria-label="Ampliar imagen" title="Ampliar imagen">+</button>
          <button type="button" data-rz="reset" title="Ajustar a pantalla">Ajustar</button>
          <button type="button" data-rz="close" class="rlz-close" aria-label="Cerrar imagen ampliada">✕ Cerrar</button>
        </div>
      </div>
      <div class="rlz-stage" tabindex="0" aria-label="Imagen ampliada, permite arrastrar y usar la rueda o pellizcar para ampliar">
        <img class="rlz-photo" draggable="false" alt="">
      </div>
      <p class="rlz-instructions">Pulsa + o − para acercar o alejar · Arrastra para moverte · Dos dedos en móvil · Esc para cerrar</p>`;
    document.body.append(overlay);
    stage = overlay.querySelector('.rlz-stage');
    photo = overlay.querySelector('.rlz-photo');
    label = overlay.querySelector('.rlz-title');
    percent = overlay.querySelector('.rlz-percent');
    closeBtn = overlay.querySelector('[data-rz="close"]');
    overlay.querySelector('[data-rz="close"]').addEventListener('click', close);
    overlay.querySelector('[data-rz="plus"]').addEventListener('click', () => zoomTo(scale + .5));
    overlay.querySelector('[data-rz="minus"]').addEventListener('click', () => zoomTo(scale - .5));
    overlay.querySelector('[data-rz="reset"]').addEventListener('click', reset);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    stage.addEventListener('dblclick', e => {
      e.preventDefault();
      if (scale > 1) reset(); else zoomTo(2.5);
    });
    stage.addEventListener('wheel', e => {
      e.preventDefault();
      zoomTo(scale + (e.deltaY < 0 ? .25 : -.25));
    }, {passive:false});
    stage.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      stage.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, {x:e.clientX,y:e.clientY});
      if (pointers.size === 1) { moving = true; dragX = e.clientX - offsetX; dragY = e.clientY - offsetY; }
      if (pointers.size === 2) {
        moving = false;
        const pts = [...pointers.values()];
        pinchDistance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchInitial = scale;
      }
    });
    stage.addEventListener('pointermove', e => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, {x:e.clientX,y:e.clientY});
      if (pointers.size === 2 && pinchDistance) {
        const pts = [...pointers.values()];
        const distance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        zoomTo(pinchInitial * distance / pinchDistance);
      } else if (moving && scale > 1 && pointers.size === 1) {
        offsetX = e.clientX - dragX;
        offsetY = e.clientY - dragY;
        draw();
      }
    });
    const endPointer = e => {
      if (!pointers.has(e.pointerId)) return;
      pointers.delete(e.pointerId);
      moving = false; pinchDistance = 0;
      if (pointers.size === 1) {
        const pt = [...pointers.values()][0];
        dragX = pt.x - offsetX; dragY = pt.y - offsetY;
        moving = true;
      }
    };
    stage.addEventListener('pointerup', endPointer);
    stage.addEventListener('pointercancel', endPointer);
    photo.addEventListener('load', reset);
  }
  function open(img) {
    if (!isEligible(img) || !img.complete && !img.currentSrc) return;
    if (!overlay) makeOverlay();
    lastFocus = document.activeElement;
    savedOverflow = document.body.style.overflow;
    const title = img.alt || 'Imagen del proyecto o de los bloques';
    label.textContent = title;
    photo.alt = title;
    photo.src = img.currentSrc || img.src;
    document.body.style.overflow = 'hidden';
    overlay.hidden = false;
    pointers.clear(); moving = false;
    reset();
    closeBtn.focus({preventScroll:true});
  }
  function close() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.body.style.overflow = savedOverflow;
    photo.removeAttribute('src');
    pointers.clear(); moving = false;
    if (lastFocus && lastFocus.isConnected && typeof lastFocus.focus === 'function') lastFocus.focus({preventScroll:true});
  }
  function annotate() {
    document.querySelectorAll('main img, .pro-main img, .sheet img, .page img, .lab-main img').forEach(img => {
      if (!isEligible(img) || img.dataset.rlzReady) return;
      img.dataset.rlzReady = '1';
      img.classList.add('rlz-zoomable');
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Ampliar imagen: ' + (img.alt || 'imagen del contenido'));
      if (isCodeImage(img)) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'rlz-launch';
        button.textContent = '⤢ Ampliar imagen';
        button.setAttribute('aria-label', 'Ampliar la imagen de los bloques a pantalla completa');
        button.addEventListener('click', () => open(img));
        img.insertAdjacentElement('afterend', button);
      }
    });
  }
  document.addEventListener('click', e => {
    const img = e.target.closest && e.target.closest('img.rlz-zoomable');
    if (img && !img.closest('.rlz-overlay')) { e.preventDefault(); open(img); }
  });
  document.addEventListener('keydown', e => {
    if (overlay && !overlay.hidden) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === '+' || e.key === '=') { e.preventDefault(); zoomTo(scale + .5); }
      else if (e.key === '-' || e.key === '_') { e.preventDefault(); zoomTo(scale - .5); }
      else if (e.key === '0') { e.preventDefault(); reset(); }
      else if (e.key === 'Tab') {
        const buttons = [...overlay.querySelectorAll('button:not([disabled])')];
        const list = [stage, ...buttons];
        const idx = list.indexOf(document.activeElement);
        if (idx !== -1 && ((e.shiftKey && idx === 0) || (!e.shiftKey && idx === list.length - 1))) {
          e.preventDefault();
          list[e.shiftKey ? list.length - 1 : 0].focus();
        }
      }
    } else if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('img.rlz-zoomable')) {
      e.preventDefault(); open(e.target);
    }
  });
  window.addEventListener('resize', () => {if (overlay && !overlay.hidden) draw();});
  let pending = false;
  const schedule = () => {
    if (pending) return;
    pending = true;
    queueMicrotask(() => {pending = false; annotate();});
  };
  if (document.body) {
    annotate();
    new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['src','hidden']});
  } else document.addEventListener('DOMContentLoaded', () => {
    annotate();
    new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['src','hidden']});
  }, {once:true});
})();
