import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { breakPointWidth, hightlightsSlideData } from './setting';
gsap.registerPlugin( ScrollTrigger );

function highlights() {
  const originHeight = window.innerHeight;
  const TAG = ['chip', 'titanium', 'zoom', 'actionButton'];

  let btns, btnPlay, btnPause, btnReplay;
  let swiper, currentSlide;
  let isPlaying = false;
  let sectionPadding = 0;
  let targetMedia = breakPointWidth();

  function setElement() {
    btns = document.querySelectorAll('.indicator-btn');
    btnPlay = document.querySelector('.indicator-btn--play');
    btnPause = document.querySelector('.indicator-btn--pause');
    btnReplay = document.querySelector('.indicator-btn--replay');
  }
  
  function animate() {
    const headerTexts = ['.highlights-title', '.highlights-cta'];

    updateSectionPadding();
    
    gsap.set(headerTexts, { opacity: 0, y: 25 })
    gsap.to(headerTexts, {
      opacity: 1,  
      y: 0, 
      ease: "power1.out",
      scrollTrigger: {
        trigger: '.highlights-header',
        start: () => `top-=${sectionPadding} center`,
        end: "bottom",
        toggleActions: "play none none reverse",
        markers: false,
      }
    });
  }

  function createListHTML() {
    const wrap = document.querySelector('.highlights-carousel-wrap');

    let slideList = "";
    hightlightsSlideData.map(data => {
      slideList += `
        <li class="highlights-carousel__item swiper-slide">
          <p class="highlights-carousel__text">
            ${data.textLists[0]}<br />
            ${data.textLists[1]}<br />
            ${(!!data.textLists[2]) ? data.textLists[2] : ''}
            </p>
            <div class="highlights-carousel__media">
              <video src="${data.videoPath[targetMedia]}" class="highlights-carousel__video ${data.tag}" muted playsinline></video>
            </div>
        </li>
      `;
    });

    const slider = `<ul class="highlights-carousel swiper-wrapper">${slideList}</ul>`;
    wrap.insertAdjacentHTML('beforeend', slider);
  };

  function getMediaPath() {
    targetMedia = breakPointWidth();

    hightlightsSlideData.map(data => document.querySelector(`.${data.tag}`).src = data.videoPath[targetMedia]);
  }
  
  function initSlider() {
    swiper = new Swiper('.highlights-carousel-wrap', {
      loop: false,
      slidesPerView: 'auto',
      observeParents: true,
      observer: true,
      resizeObserver: true,
      touchRatio: 1,
      autoplay: {
        delay: 5000,
        stopOnLastSlide: true,
        disableOnInteraction: false,
      },
      modules: [Navigation, Pagination, Autoplay],
      pagination: {
        el: ".highlights-indicator",
        clickable: true,
        renderBullet: (index, className) => {
          if(index < TAG.length) {
            return `<button class="highlights-indicator__dot ${className}" data-dot-tag="${TAG[index]}" type="button"><span class="dot-per"></span></button>`;
          } else return '';
        },
      },
      on: {
        init: function(e) {
          isPlaying = true;

          setTimeout(() => {
            currentSlide = e.slides[0];
            e.slides[0].querySelector('video').play().catch(e => {});
          });
        },
        autoplayTimeLeft: function(e, timestamp, delta) {
          if(Math.sign(timestamp) !== -1) {
            const dots = document.querySelectorAll('.highlights-indicator__dot'); 
            dots.forEach(_ => _.classList.remove('active'));
            const currentDot = dots[this.realIndex];

            currentDot.classList.add('active');
            currentDot.querySelector('.dot-per').style.width = `${(1 - delta) * 100}%`;
          } else {
            if(e.slides.length === this.realIndex + 1) {
              isPlaying = false;
              btns.forEach(_ => _.classList.remove('active'));
              btnReplay.classList.add('active');
            } 
          }
        },
        slideChange: function(e) {
          btns.forEach(_ => _.classList.remove('active'));
          btnPause.classList.add('active');

          e.slides.forEach(_ => _.querySelector('video').currentTime = 0);

          isPlaying = true;
          currentSlide = e.slides[this.realIndex];
          e.slides[this.realIndex].querySelector('video').play().catch(e => {});
        },
      },
    });
  }

  function handlePlay() {
    isPlaying = true;

    currentSlide.querySelector('video').play().catch(e => {});
    btns.forEach(_ => _.classList.remove('active'));
    btnPause.classList.add('active');
    swiper.autoplay.resume();
  }

  function handlePause() {
    isPlaying = false;

    currentSlide.querySelector('video').pause();
    btns.forEach(_ => _.classList.remove('active'));
    btnPlay.classList.add('active');
    swiper.autoplay.pause();
  }
  
  function handleReplay() {
    isPlaying = true;
    swiper.slideTo(0);
  }

  function updateSectionPadding() {
    const section = document.querySelector('.section-highlights');
    const paddingTop = getComputedStyle(section).paddingTop;
    sectionPadding = parseInt(paddingTop);
  }

  function onResize() {
    if(originHeight !== window.innerHeight) return;  // ios 메뉴바 높이 변화 리사이즈 이슈 대응

    if(swiper) swiper.destroy(true, true);
    getMediaPath();
    updateSectionPadding();
    initSlider();

    // ScrollTrigger.refresh();
  }

  function bindEvents() {
    btnPlay.addEventListener('click', handlePlay);
    btnPause.addEventListener('click', handlePause);
    btnReplay.addEventListener('click', handleReplay);
    window.addEventListener('resize', onResize);
  }

  function init() {
    setElement();
    createListHTML();
    animate();
    bindEvents();
    onResize();
  }

  init();
}

export { highlights };