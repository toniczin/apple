import Swiper from 'swiper';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { breakPointWidth, breakpointMaxWidthS, actionData, updateMediaSrc } from './setting';
import { actionVideoL, actionVideoM, actionVideoS } from './utils';
gsap.registerPlugin( ScrollTrigger );

function actionButton() {
  const xPositions = [0, -70.531, -202.468, -352.163, -522.523, -690.632, -846.273, -999.218, -1120.22];
  let listWrap, list, listLink, listItem, btnPrev, btnNext, screenImage, swiper;
  let count = 0;
  let isMobile = window.matchMedia(`(max-width: ${breakpointMaxWidthS}px)`).matches;
  
  const setButtonListHTML = (() => {
    let actionList = "";
    actionData.map((data, idx) => {
      actionList += `
      <li class="actionButton-list__item" data-item-index="${idx}">
        <a href="#" class="actionButton-list__link ${(data.name === 'ring_silent') ? 'active' : ''}" data-action-name="${data.name}">
          <img src="/assets/imgs/action-button/icon_${data.name}.png" class="actionButton-list__img" alt="action button ${data.text} icon">
          <span class="actionButton-list__text">${data.text}</span>
        </a>
      </li>`;
    });

    document.querySelector('.actionButton-list').insertAdjacentHTML('beforeend', actionList);
  })();

  const setScreenImage = (() => {
      let actionImage = "";
      actionData.map(data => {
          actionImage += `<img src="/assets/imgs/action-button/action_screen_${data.name}_large.jpg" class="actionButton-dummy__img ${(data.name === 'ring_silent') ? 'active' : ''}" data-action-image="${data.name}" alt="action button ${data.text} image">`;
      });
  
      document.querySelector('.actionButton-dummy').insertAdjacentHTML('beforeend', actionImage);
  })();

  function setElement() {
    listWrap = document.querySelector('.actionButton-list-wrap');
    list = document.querySelector('.actionButton-list');
    listLink = document.querySelectorAll('.actionButton-list__link');
    listItem = document.querySelectorAll('.actionButton-list__item');
    btnPrev = document.querySelector('.arrow-btn--prev');
    btnNext = document.querySelector('.arrow-btn--next');
    screenImage = document.querySelectorAll('.actionButton-dummy__img');
  }
  
  // 네비게이션 아이템 핸들러
  function handleSlideItem(e) {
    e.preventDefault();
    if(e.currentTarget.tagName !== 'A') return;

    const target = e.currentTarget;

    listLink.forEach(_ => _.classList.remove('active'));
    screenImage.forEach(_ => _.classList.remove('active'));
    
    target.classList.add('active');
    document.querySelector(`[data-action-image="${target.dataset.actionName}"]`).classList.add('active');

    if(isMobile) {
      const distance = xPositions[target.parentElement.dataset.itemIndex];
      list.style.transform = `translateX(${distance}px)`; 

      const currnetActiveIndex = +target.parentElement.dataset.itemIndex;
      handleButtonUI(currnetActiveIndex);

      count = +target.parentElement.dataset.itemIndex;
    }
  }

  // 네비게이션 위치 이동 핸들러
  function handleNavigation(e) {
    const direction = (e.currentTarget.className.includes('arrow-btn--next')) ? 1 : -1;
    const currnetActiveIndex = document.querySelector('.actionButton-list__link.active').parentElement.dataset.itemIndex;
    const nextTargetIndex = +currnetActiveIndex + direction;
    const distance = xPositions[nextTargetIndex];

    handleButtonUI(nextTargetIndex);
    
    listLink.forEach(_ => _.classList.remove('active'));
    document.querySelector(`[data-item-index="${nextTargetIndex}"] .actionButton-list__link`).classList.add('active');
    list.style.transform = `translateX(${distance}px)`;

    screenImage.forEach(_ => _.classList.remove('active'));
    const currnetActiveName = document.querySelector('.actionButton-list__link.active').dataset.actionName;
    document.querySelector(`[data-action-image="${currnetActiveName}"]`).classList.add('active');
  }

  // 네비게이션 화살표 표시 핸들러
  function handleButtonUI(currentIndex) {
    if(currentIndex <= 0) {
      btnPrev.classList.add('hide');
    } else if(currentIndex == listItem.length - 1) {
      btnNext.classList.add('hide');
    } else {
      btnPrev.classList.remove('hide');
      btnNext.classList.remove('hide');
    }
  }

  // 스와이퍼 세팅
  function setSwiper() {
    if(isMobile) {
      let currnetActiveIndex;
      
      listWrap.classList.add('swiper');
      list.classList.add('swiper-wrapper');
      listItem.forEach(_ => _.classList.add('swiper-slide'));
      
      swiper = new Swiper(listWrap, {
        loop: false,
        slidesPerView: 'auto',
        speed: 400,
        // allowTouchMove: false,  // 모바일만 드래그 허용
        on: {
          reachBeginning: () => {
            currnetActiveIndex = document.querySelector('.actionButton-list__link.active').parentElement.dataset.itemIndex;
            if(currnetActiveIndex == 0) {
              btnPrev.classList.add('hide');
              btnNext.classList.remove('hide');
            }
          },
          reachEnd: () => {
            btnNext.classList.add('hide');
            btnPrev.classList.remove('hide');
          }
        },
      });
    } else {
      if(swiper) swiper.destroy(true, true);
      listWrap.classList.remove('swiper');
      list.classList.remove('swiper-wrapper');
      listItem.forEach(el => el.classList.remove('swiper-slide'));
    }
  }

  function animate() {
    gsap.set('.actionButton-typography-col__text', { opacity: 0, y: 25 })
    gsap.to('.actionButton-typography-col__text', {
      opacity: 1,
      y: 0,
      ease: "power1.out",
      scrollTrigger: {
        trigger: '.actionButton-typography',
        start: 'top 95%',
        end: 'bottom',
        toggleActions: "play none none reverse",
        markers: false,
      }
    });
  }

  function introAnimation() {
    const videoWrap = document.querySelector('.actionButton-video-wrap');
    const video = videoWrap.querySelector('video');
    video.autoplay = true;

    const tl = gsap.timeline();
    tl.set('html', { '--action-pin-opacity': 0, '--action-pin-bar-per': '70%' })
      .to('html', { '--action-pin-bar-per': '100%', duration: 0.5 })
      .to('html', { '--action-pin-opacity': 1, delay: 0.2})

    video.addEventListener('ended', (_ => {
      videoWrap.classList.add('hide');
    }));
  }

  function updateMedia() {
    const targetMedia = breakPointWidth();
    const video = document.querySelector('.actionButton-video');
    const videoSrc = updateMediaSrc(targetMedia, actionVideoL, actionVideoM, actionVideoS);
    video.src = videoSrc;

    actionData.map(data => {
      document.querySelector(`[data-action-image="${data.name}"]`).src = data.imagePath[targetMedia];
    });
  }

  function onResize() {
    isMobile = window.matchMedia(`(max-width: ${breakpointMaxWidthS}px)`).matches;

    setSwiper();
    updateMedia();
  }

  function bindEvent() {
    listLink.forEach(_ => _.addEventListener('click', handleSlideItem));
    document.querySelectorAll('.actionButton-indicator__btn').forEach(_ => _.addEventListener('click', handleNavigation));
    
    window.addEventListener('resize', onResize);
  }

  function init() {
    if(!isMobile) introAnimation();

    updateMedia();
    setElement();
    setSwiper();
    bindEvent();
    animate();
  }

  init();
}
  
export { actionButton }