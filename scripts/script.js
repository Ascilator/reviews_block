$(function () {});

const swiper = new Swiper('.review_swiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 2,
  spaceBetween: 30,
  breakpoints: {
    0: {
      slidesPerView: 1.35,
    },
    480: {
      slidesPerView: 1.3,
    },
    600: {
      slidesPerView: 2,
    },
  },
});

document.querySelectorAll('._show_more_container').forEach((block) => {
  const content = block.querySelector('.content');
  const btn = block.querySelector('.show_more');
  const span = btn.querySelector('span');
  const collapsedHeight = 90;

  btn.addEventListener('click', () => {
    const isOpen = block.classList.contains('_expanded');

    if (!isOpen) {
      const fullHeight = content.scrollHeight;

      content.style.height = collapsedHeight + 'px';
      requestAnimationFrame(() => {
        content.style.height = fullHeight + 'px';
      });

      block.classList.add('_expanded');
      span.textContent = 'Скрыть';
    } else {
      const fullHeight = content.scrollHeight;

      content.style.height = fullHeight + 'px';
      requestAnimationFrame(() => {
        content.style.height = collapsedHeight + 'px';
      });

      block.classList.remove('_expanded');
      span.textContent = 'Далее';
    }
  });
});

const starsContainers = document.querySelectorAll('.stars_container');
const inputStars = document.querySelector('.stars_input').querySelector('input');

starsContainers.forEach((container) => {
  const stars = container.querySelectorAll('.star');

  stars.forEach((star, index) => {
    const value = index + 1;

    star.addEventListener('mouseenter', () => {
      stars.forEach((s, i) => {
        s.classList.toggle('_hover', i < value);
      });
    });

    container.addEventListener('mouseleave', () => {
      stars.forEach((s) => s.classList.remove('_hover'));
    });

    star.addEventListener('click', () => {
      inputStars.value = value;

      stars.forEach((s, i) => {
        s.classList.toggle('_active', i < value);
      });
    });
  });
});

document.querySelectorAll('.doctor_select').forEach((drop) => {
  const toggle = drop.querySelector('.doctor_select_header');
  const doctors = drop.querySelectorAll('.doctor_item');

  doctors.forEach((doctor) => {
    doctor.addEventListener('click', () => {
      drop.classList.remove('_open');
      toggle.querySelector('span').textContent = doctor.textContent;
    });
  });

  toggle.addEventListener('click', () => {
    drop.classList.toggle('_open');
  });
});

const doctorSwiper = new Swiper('.doctor_swiper', {
  direction: 'vertical',
  freeMode: true,
  slidesPerView: 5,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  mousewheel: true,
});

function updateDoctorSwiperHeight() {
  const swiperEl = document.querySelector('.doctor_swiper');

  if (!swiperEl) return;

  if (window.innerWidth < 600) {
    swiperEl.style.height = window.innerHeight * 0.95 + 'px';
  } else {
    swiperEl.style.height = '130px';
  }
}

updateDoctorSwiperHeight();

window.addEventListener('resize', () => {
  updateDoctorSwiperHeight();
  doctorSwiper.update();
});
