'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScroll.addEventListener('click', () => {
  // window.scrollTo({
  //   left: section1.getBoundingClientRect().left + window.pageXOffset, 
  //   top: section1.getBoundingClientRect().top + window.pageYOffset,
  //   behavior: 'smooth'
  // })
  section1.scrollIntoView({ behavior: 'smooth' })
})
console.log(btnScroll.getBoundingClientRect())

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id)
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// })

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

// работа табов

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container')
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clickedTab = e.target.closest('.operations__tab');
  if (!clickedTab) return;

  tabs.forEach(function (tab) {
    tab.classList.remove('operations__tab--active');
  });

  clickedTab.classList.add('operations__tab--active');
  tabContent.forEach(content => {
    content.classList.remove('operations__content--active')
  });
  document.querySelector(`.operations__content--${clickedTab.dataset.tab}`).classList.add('operations__content--active')
})


// Функция hover() меняет прозрачность ссылок и логотипа навигации при наведении
const nav = document.querySelector('.nav');
function hover(e, opacity) {
    // Если была нажата ссылка навигации
    if(e.target.classList.contains('nav__link')) {
      const link = e.target; // Получаем ссылку
      const sibling = link.closest('.nav').querySelectorAll('.nav__link'); // Получаем все ссылки навигации
      const logo = link.closest('.nav').querySelector('.nav__logo'); // Получаем логотип
  
      sibling.forEach(el => {
        if (el != link) { // Если это не ссылка на которую навели
          el.style.opacity = this; // Меняем прозрачность
        }
      });
      logo.style.opacity = this; // Меняем прозрачность логотипа
    }
}

// полупрозрачная навигация
// при наведении на кнопку меняется прозрачность
nav.addEventListener('mouseover', hover.bind(0.5));
// при отпускании кнопки прозрачность возвращается на исходное
nav.addEventListener('mouseout', hover.bind(1));


// появление меню после прокрутки страницы
// старый метод
// const coord = section1.getBoundingClientRect()
// window.addEventListener('scroll', function () {
//   if (window.pageYOffset > coord.top) {
//     nav.classList.add('sticky')
//   } else {nav.classList.remove('sticky')}
// })

const navContainer = document.querySelector('.nav')

function callBack(entries) {
  if (!entries[0].isIntersecting) {
    navContainer.classList.add('sticky')
  } else {
    navContainer.classList.remove('sticky')
  }
};
const options = {threshold: 0, rootMargin: '-90px'};

const observer = new IntersectionObserver(callBack, options)
observer.observe(document.querySelector('.header'))

// всплытие секций
const allSections = document.querySelectorAll('.section');

function revealSections(entries, observe) {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove('section--hidden');
    observe.unobserve(entries[0].target);
  }
}

const sectionsObserver = new IntersectionObserver(revealSections, {threshold: 0.15});

allSections.forEach(section => {
  sectionsObserver.observe(section);
  section.classList.add('section--hidden');
})