const items = document.querySelectorAll('.scroll-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Чтобы анимация не повторялась при прокрутке вверх:
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2 // Сработает, когда элемент виден на 20%
});

items.forEach(item => observer.observe(item));


// MODALKA

const login = document.getElementById('login');
const openLoginBtn = document.getElementById('openLoginBtn');
const closeLoginBtn = document.getElementById('closeLoginBtn');

// Open
openLoginBtn.addEventListener('click', () => {
  login.classList.add('active');
});
// Close
closeLoginBtn.addEventListener('click', () => {
  login.classList.remove('active');
});
// Close 2
login.addEventListener('click', (e) => {
  if (e.target === login) {
    login.classList.remove('active');
  }
})

// MODALKA 2
const register = document.getElementById('register');
const openRegisterBtn = document.getElementById('openRegisterBtn');
const closeRegisterBtn = document.getElementById('closeRegisterBtn');

// Open
openRegisterBtn.addEventListener('click', () => {
  register.classList.add('active');
});
// Close
closeRegisterBtn.addEventListener('click', () => {
  register.classList.remove('active');
});
// Close 2
register.addEventListener('click', (e) => {
  if (e.target === register) {
    register.classList.remove('active');
  }
})

// MODALKA 3
const submit = document.getElementById('consultation');
const openSubmitBtn = document.getElementById('openSubmitBtn');
const closeSubmitBtn = document.getElementById('closeSubmitBtn');

// Open
openSubmitBtn.addEventListener('click', () => {
  submit.classList.add('active');
});
// Close
closeSubmitBtn.addEventListener('click', () => {
  submit.classList.remove('active');
});
// Close 2
submit.addEventListener('click', (e) => {
  if (e.target === submit) {
    submit.classList.remove('active');
  }
})

// // SPOILER

// document.querySelector('.features-dropdown-title').addEventListener('click', (e) => {
//   const text = document.querySelector('.features-dropdown-text');
//   text.classList.toggle('hidden');
//   e.preventDefault();
//   // if (text.style.maxHeight && text.style.maxHeight !== '0px') {
//   //   text.style.maxHeight = '0px';
//   //   text.classList.add('hidden');
//   // } else {
//   //   // Устанавливаем точную высоту по содержимому
//   //   text.style.maxHeight = text.scrollHeight + 'px';
//   //   text.classList.remove('hidden');
//   // }
// })

// BACK TO TOP BUTTON
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// THEME
const btn = document.getElementById('theme-toggle');
const html = document.documentElement;

btn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  if (navigator.vibrate) navigator.vibrate(8);
});

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});

// КОСТЫЛЬ УДАЛИТЬ
document.addEventListener('DOMContentLoaded', () => {
  btn.click();
});


// КАРУСЕЛЬ

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.testimonials__grid');
  const cards = document.querySelectorAll('.testimonials__item');
  const dotsContainer = document.querySelector('.testimonials__dots'); // Контейнер для точек
  const arrowLeft = document.querySelector('.testimonials__arrow--left');
  const arrowRight = document.querySelector('.testimonials__arrow--right');

  let currentIndex = 0;

  const visibleCards = 3;

  const gap = 20;

  const maxIndex = cards.length - visibleCards;

  dotsContainer.innerHTML = '';

  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('span');
    dot.classList.add('testimonials__dot');

    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll('.testimonials__dot');

  function updateCarousel() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const offset = currentIndex * (cardWidth + gap);

    cards.forEach((card) => {
      card.style.transform = `translateX(-${offset}px)`;
    });

    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('testimonials__dot--active');
      } else {
        dot.classList.remove('testimonials__dot--active');
      }
    });
  }

  arrowRight.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; 
    }
    updateCarousel();
  });

  arrowLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex;
    }
    updateCarousel();
  });

  const intervalId = setInterval(() => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }, 4000);

  document.querySelector('.testimonials').addEventListener(('click'), () => {
    clearInterval(intervalId);
  })

  updateCarousel();
});

// АНИМАЦИЯ ГАЛОЧЕК
const featuresObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      featuresObserver.unobserve(entry.target);
    }
  });
}, { threshold: 1 });

featuresObserver.observe(document.querySelector('.features__list'));