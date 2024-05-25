import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { breakPointWidth, updateMediaSrc } from './setting';
import { designVideoL, designVideoM, designVideoS } from './utils';

gsap.registerPlugin( ScrollTrigger );

function design() {
  const originHeight = window.innerHeight;
  let sectionPadding = 0;

  function updateMedia() {
    const video = document.querySelector('.design-grid__video');
    const targetMedia = breakPointWidth();
    const mediaSrc = updateMediaSrc(targetMedia, designVideoL, designVideoM, designVideoS);
    video.src = mediaSrc;
  }

  function animate() {
    updateSectionPadding();

    // 헤드라인 텍스트 애니메이션
    const tlHeadline = gsap.timeline({
      scrollTrigger: {
        trigger: '.design-title',
        start: () => `top-=${sectionPadding} center`,
        end: "bottom",
        toggleActions: "play none none reverse",
        markers: false,
      }
    });
    tlHeadline
      .from('.design-title', { opacity: 0, y: 25 })
      .to('.design-title', {
        opacity: 1,  
        y: 0, 
        ease: "power1.out",
      });

    // 비디오 애니메이션
    const tlVideo = gsap.timeline({
      scrollTrigger: {
        trigger: '.design-grid__item.titanium',
        start: 'top 60%',
        end: 'bottom',
        toggleActions: "play none none none",
        onEnter: () => {
          document.querySelector('.design-grid__video').play().catch(e => {});
        },
        markers: false,
      }
    });

    // 이미지 애니메이션
    const tlImage = gsap.utils.toArray('[data-jsaction="zoom-in-out"]').map(el => {
      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top center',
          end: 'bottom',
          scrub: 0.5,
          markers: false,
        }
      })
      .from(el.querySelector('picture'), { scale: 1.3, opacity: 0.2 })
      .to(el.querySelector('picture'), { scale: 1, opacity: 1 });
    });
    
    // 타이포그래피 애니메이션
    const tlTypography = gsap.timeline({
      scrollTrigger: {
        trigger: '.design-typography',
        start: 'top 70%',
        end: 'bottom',
        toggleActions: "play none none reverse",
        markers: false,
      }
    });
    tlTypography
    .from('.design-typography-col__text', { opacity: 0, y: 20 })
    .to('.design-typography-col__text', {
      opacity: 1,
      y: 0,
      ease: "power1.out",
    });
  }

  function updateSectionPadding() {
    const section = document.querySelector('.section-design');
    const paddingTop = getComputedStyle(section).paddingTop;
    sectionPadding = parseInt(paddingTop);
  }

  function onResize() {
    if(originHeight !== window.innerHeight) return;  // ios 메뉴바 높이 변화 리사이즈 이슈 대응
    updateMedia();
    updateSectionPadding();
  }

  function init() {
    updateMedia();
    animate();

    window.addEventListener('resize', onResize);
  }

  init();
}

export { design }