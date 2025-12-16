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
  const filterInput = drop.querySelector('.filter_input');

  doctors.forEach((doctor) => {
    doctor.addEventListener('click', () => {
      drop.classList.remove('_open');
      filterInput.value = doctor.textContent;
    });
  });

  toggle.addEventListener('click', () => {
    drop.classList.toggle('_open');
    if (drop.classList.contains('_open')) {
      filterInput.focus();
    }
  });
});

document.addEventListener('click', (e) => {
  document.querySelectorAll('.doctor_select').forEach((drop) => {
    if (!drop.contains(e.target)) {
      drop.classList.remove('_open');
    }
  });
});

document.querySelectorAll('.filter_input').forEach((input) => {
  input.addEventListener('input', () => {
    const filter = input.value.toLowerCase();
    const drop = input.closest('.doctor_select');
    const doctors = drop.querySelectorAll('.doctor_item');

    let isItemsVisible = false;

    doctors.forEach((doctor) => {
      const text = doctor.textContent.split(' ')[0].toLowerCase();
      if (text.includes(filter)) {
        doctor.style.display = '';
        isItemsVisible = true;
      } else {
        doctor.style.display = 'none';
      }

      doctorSwiper?.update();
      if (isItemsVisible) {
        drop.classList.add('_not_found');
      } else {
        drop.classList.remove('_not_found');
      }
    });
  });
});

let doctorSwiper = new Swiper('.doctor_swiper', {
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
  if (window.innerWidth < 600 && doctorSwiper) {
    doctorSwiper.destroy();
    doctorSwiper = null;
  } else if (!doctorSwiper && window.innerWidth >= 600) {
    doctorSwiper = new Swiper('.doctor_swiper', {
      direction: 'vertical',
      freeMode: true,
      slidesPerView: 5,
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      mousewheel: true,
    });
  }
}

const updatePhoneInput = () => {
  const phoneInput = document.querySelector('.input_item input[type="tel"]');

  phoneInput.addEventListener('focus', () => {
    phoneInput.placeholder = '+7 (___) ___-__-__';
  });

  phoneInput.addEventListener('blur', () => {
    if (phoneInput.value === '') {
      phoneInput.placeholder = 'Ваш номер телефона';
    }
  });

  phoneInput.addEventListener('keydown', (e) => {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'Enter',
      'Escape',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      '+',
    ];
    if (allowedKeys.includes(e.key)) {
      return;
    }

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });
};

updatePhoneInput();
updateDoctorSwiperHeight();

window.addEventListener('resize', () => {
  updateDoctorSwiperHeight();
});
