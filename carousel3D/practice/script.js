; (function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const cellCount = 6; // item의 갯수
  let selectIndex = 0; // 첫번째 아이템 번호
  const prevButton = get('.prev_button');
  const nextButton = get('.next_button');
  const carousel = get('.carousel');

  const rotateCarousel = () => {
    const angle = (selectIndex / cellCount) * -360; //rotate 값 계산
    carousel.style.transform = `translateZ(-346px) rotateY(${angle}deg)`;
  }

  prevButton.addEventListener('click', () => {
    selectIndex--;
    rotateCarousel();
  });
  nextButton.addEventListener('click', () => {
    selectIndex++;
    rotateCarousel();
  });
})()
