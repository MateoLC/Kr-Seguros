/* Progressive enhancement: navigation, entrance motion and WhatsApp selection. */
'use strict';
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu() {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width:1001px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// Keep this number in sync with the static links and Organization data in index.html.
const WHATSAPP_NUMBER = '573128589533';
const interest = document.querySelector('#insurance-interest');
const contactLink = document.querySelector('#contact-whatsapp');
const hint = document.querySelector('#contact-hint');
interest.addEventListener('change', () => {
  const message = 'Estoy interesado en un Seguro' + (interest.value ? ' de ' + interest.value : '');
  contactLink.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  hint.textContent = interest.value ? 'Hablemos sobre tu seguro de ' + interest.value.toLowerCase() + '.' : 'Conversemos sobre tus opciones.';
});
document.querySelector('#year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  // Content is visible by default, so a script or observer failure never hides it.
  const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (motionAllowed) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el, index) => {
      el.style.setProperty('--delay', `${(index % 3) * 65}ms`);
      observer.observe(el);
    });
  }
  const sections = document.querySelectorAll('#salud, #vida, #hogar, #empresas, #mascotas, #vehiculos');
  const navObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    document.querySelectorAll('.category-nav a, .main-nav a').forEach(link => {
      if (link.hash === '#' + visible.target.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
  sections.forEach(section => navObserver.observe(section));
}

// Silent hero film: selection, playback, reduced motion and offscreen suspension.
(() => {
  const hero = document.querySelector('.hero-film');
  const video = document.querySelector('#hero-video');
  if (!hero || !video) return;
  const controls = hero.querySelector('.hero-services');
  const toggle = hero.querySelector('.hero-playback');
  const buttons = [...hero.querySelectorAll('.hero-service')];
  const name = hero.querySelector('#hero-scene-name');
  const link = hero.querySelector('#hero-scene-link');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = [
    { name: 'Salud', id: 'salud', start: 0, label: 'PROTECCIÓN PARA TU' },
    { name: 'Vida', id: 'vida', start: 61 / 24, label: 'PROTECCIÓN PARA TU' },
    { name: 'Hogar', id: 'hogar', start: 121 / 24, label: 'PROTECCIÓN PARA TU' },
    { name: 'Empresa', id: 'empresas', start: 183 / 24, label: 'PROTECCIÓN PARA TU' },
    { name: 'Mascota', id: 'mascotas', start: 245 / 24, label: 'PROTECCIÓN PARA TU' },
    { name: 'Vehículo', id: 'vehiculos', start: 303 / 24, label: 'PROTECCIÓN PARA TU' }
  ];
  let userPaused = motion.matches || Boolean(navigator.connection?.saveData);
  let visible = true;
  let failed = false;
  let active = -1;
  let pendingScene = null;
  // Scene starts were measured against the final 24 fps film.
  function updateScene() {
    let index = scenes.length - 1;
    while (index > 0 && video.currentTime < scenes[index].start) index--;
    const end = scenes[index + 1]?.start ?? (Number.isFinite(video.duration) ? video.duration : 361 / 24);
    const progress = (video.currentTime - scenes[index].start) / (end - scenes[index].start);
    buttons[index].style.setProperty('--scene-progress', String(Math.max(0, Math.min(1, progress))));
    if (index === active) return;
    active = index;
    buttons.forEach((button, i) => {
      button.classList.toggle('is-active', i === index);
      button.setAttribute('aria-pressed', String(i === index));
      if (i !== index) button.style.removeProperty('--scene-progress');
    });
    name.textContent = scenes[index].name;
    link.href = '#' + scenes[index].id;
    hero.querySelector('.hero-scene-eyebrow').textContent = scenes[index].label;
  }
  function updatePlayback() {
    const paused = video.paused;
    toggle.classList.toggle('is-paused', paused);
    toggle.setAttribute('aria-label', paused ? 'Reproducir video' : 'Pausar video');
    toggle.querySelector('.hero-playback-label').textContent = paused ? 'Reproducir' : 'Pausar';
  }
  function load() {
    if (!video.getAttribute('src')) {
      video.src = video.dataset.src;
      video.load();
    }
  }
  function play() {
    if (failed || !visible || document.hidden || userPaused) return;
    load();
    video.play().catch(updatePlayback);
  }
  function sync() {
    if (userPaused || !visible || document.hidden) video.pause();
    else play();
  }
  video.addEventListener('loadedmetadata', () => {
    if (pendingScene !== null) {
      video.currentTime = scenes[pendingScene].start + .06;
      pendingScene = null;
    }
    updateScene();
  });
  video.addEventListener('loadeddata', () => hero.classList.add('has-video'));
  video.addEventListener('timeupdate', updateScene);
  video.addEventListener('play', updatePlayback);
  video.addEventListener('pause', updatePlayback);
  video.addEventListener('error', () => {
    failed = true;
    video.pause();
    hero.classList.remove('has-video', 'is-enhanced');
    controls.hidden = true;
    toggle.hidden = true;
    hero.querySelector('.hero-scene-card').hidden = true;
  });
  toggle.addEventListener('click', () => {
    userPaused = !video.paused;
    sync();
  });
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    userPaused = false;
    if (video.readyState >= 1) video.currentTime = scenes[index].start + .06;
    else pendingScene = index;
    play();
    updateScene();
  }));
  motion.addEventListener('change', event => { userPaused = event.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
    }, { threshold: 0 }).observe(hero);
  }
  // Avoid downloading or autoplaying the film when the visitor requests less motion/data.
  video.autoplay = !userPaused;
  video.muted = true;
  hero.classList.add('is-enhanced');
  controls.hidden = false;
  toggle.hidden = false;
  updateScene();
  updatePlayback();
  sync();
})();
