// Aparecer a animação quando as seções entram na tela
const items = document.querySelectorAll('.item');

function checkVisible() {
  const triggerBottom = window.innerHeight * 0.85;

  items.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkVisible);
window.addEventListener('load', checkVisible);

// Botão voltar ao topo
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================
// SCROLL SUAVE NO MENU (com compensação do cabeçalho fixo)
// ========================
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // impede o pulo instantâneo
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = document.querySelector('header').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================
// LIGHTBOX PARA IMAGENS
// ========================
const overlay = document.createElement('div');
overlay.id = 'image-overlay';
overlay.style.cssText = `
  display: none;
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.8);
  justify-content: center; align-items: center;
  z-index: 2000;
`;

const imgElement = document.createElement('img');
imgElement.style.maxWidth = '90%';
imgElement.style.maxHeight = '90%';
imgElement.style.borderRadius = '8px';
imgElement.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';

const btnPrev = document.createElement('button');
btnPrev.textContent = '⟨';
btnPrev.style.cssText = `
  position: absolute; left: 30px; font-size: 2rem; 
  background: none; border: none; color: white; cursor: pointer;
`;

const btnNext = document.createElement('button');
btnNext.textContent = '⟩';
btnNext.style.cssText = `
  position: absolute; right: 30px; font-size: 2rem; 
  background: none; border: none; color: white; cursor: pointer;
`;

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
}

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.style.display = 'none';
  }
});

btnPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  imgElement.src = images[currentIndex].src;
});

btnNext.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  imgElement.src = images[currentIndex].src;
});

images.forEach((img, index) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openImage(index));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    overlay.style.display = 'none';
  }
  if (e.key === 'ArrowLeft') {
    btnPrev.click();
  }
  if (e.key === 'ArrowRight') {
    btnNext.click();
  }
});
