// ========================
// MENU HAMBURGUER
// ========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ========================
// FADE-IN DAS SEÇÕES
// ========================
const items = document.querySelectorAll('.item');

function checkVisible() {
  const triggerBottom = window.innerHeight * 0.85;
  items.forEach(item => {
    if (item.getBoundingClientRect().top < triggerBottom) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkVisible);
window.addEventListener('load', checkVisible);

// ========================
// BOTÃO VOLTAR AO TOPO
// ========================
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================
// SCROLL SUAVE NO MENU
// ========================
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = document.querySelector('header').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    navLinks.classList.remove('active'); // fecha menu mobile
  });
});

// ========================
// LIGHTBOX
// ========================
const overlay = document.createElement('div');
overlay.id = 'image-overlay';

const imgElement = document.createElement('img');
const btnPrev = document.createElement('button');
const btnNext = document.createElement('button');

btnPrev.id = 'prev';
btnPrev.textContent = '⟨';
btnNext.id = 'next';
btnNext.textContent = '⟩';

overlay.appendChild(btnPrev);
overlay.appendChild(imgElement);
overlay.appendChild(btnNext);
document.body.appendChild(overlay);

const images = document.querySelectorAll('main img');
let currentIndex = 0;

function openImage(index) {
  currentIndex = index;
  imgElement.src = images[currentIndex].src;
  overlay.style.display = 'flex';
  document.body.classList.add('no-scroll');
}

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }
});

btnPrev.addEventListener('click', e => { e.stopPropagation(); currentIndex = (currentIndex - 1 + images.length) % images.length; imgElement.src = images[currentIndex].src; });
btnNext.addEventListener('click', e => { e.stopPropagation(); currentIndex = (currentIndex + 1) % images.length; imgElement.src = images[currentIndex].src; });

images.forEach((img, index) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openImage(index));
});

// Teclado
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') overlay.style.display = 'none';
  if (e.key === 'ArrowLeft') btnPrev.click();
  if (e.key === 'ArrowRight') btnNext.click();
  if (overlay.style.display === 'none') document.body.classList.remove('no-scroll');
});

// Swipe mobile
let touchStartX = 0;
let touchEndX = 0;

imgElement.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
imgElement.addEventListener('touchend', e => { touchEndX = e.changedTouches[0].screenX; handleGesture(); });

function handleGesture() {
  if (touchEndX < touchStartX - 50) btnNext.click();
  if (touchEndX > touchStartX + 50) btnPrev.click();
}
