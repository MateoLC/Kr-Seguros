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
