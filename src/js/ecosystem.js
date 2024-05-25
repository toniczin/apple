import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { breakPointWidth } from './setting';
gsap.registerPlugin( ScrollTrigger );

function ecosystem() {
  const originHeight = window.innerHeight;
  let targetMedia = breakPointWidth();
  let sectionPadding = 0;

  function animate() {
    updateSectionPadding();

    gsap.set('.ecosystem-title', { opacity: 0, y: 25 })
    gsap.to('.ecosystem-title', {
      opacity: 1,
      y: 0,
      ease: "power1.out",
      scrollTrigger: {
        trigger: '.ecosystem-header',
        start: () => `top-=${sectionPadding} center`,
        end: "bottom",
        toggleActions: "play none none reverse",
        markers: false,
      }
    });
  }

  function updateSectionPadding() {
    const section = document.querySelector('.section-ecosystem');
    const paddingTop = getComputedStyle(section).paddingTop;

    sectionPadding = parseInt(paddingTop);
  }

  function getAccordionHeight() {
    const column = document.querySelectorAll('.column');
    const nodes = Array.from(column);
    const accordionHeight = nodes.map(node => node.offsetHeight).reduce((acc, cur) => acc + cur);

    document.documentElement.style.setProperty('--ecosystem-height', `${accordionHeight}px`);
  }

  function handleDropdownMenu(e) {
    if(e.currentTarget.tagName !== 'DIV') return;

    const target = e.currentTarget;
    const targetIcon = target.querySelector('.column-title__icon');

    document.querySelectorAll('.column-title-wrap').forEach(_ => _.classList.remove('show'));
    document.querySelectorAll('.column-title__icon').forEach(_ => _.style.transform = 'rotate(180deg)');

    target.classList.add('show');
    targetIcon.style.transform = 'rotate(0deg)';
  }

  function onResize() {
    if(originHeight !== window.innerHeight) return;  // ios 메뉴바 높이 변화 리사이즈 이슈 대응

    targetMedia = breakPointWidth();
    updateSectionPadding();
    getAccordionHeight();
  }

  function init() {
    animate();
    getAccordionHeight();
    
    document.querySelectorAll('.column-title-wrap').forEach(_ => _.addEventListener('click', handleDropdownMenu));
    window.addEventListener('resize', onResize);
  }

  init();
}

export { ecosystem }