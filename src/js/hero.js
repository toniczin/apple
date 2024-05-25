import { gsap } from 'gsap';
import { breakPointWidth, updateMediaSrc } from './setting';
import { heroVideoL, heroVideoM, heroVideoS, heroImageL, heroImageM, heroImageS } from './utils';

function hero() {
  const originHeight = window.innerHeight;
  const video = document.querySelector('.hero-media__video');
  const poster = document.querySelector('.hero-media__img');

  // ios vh issue
  function getVh() {
    return document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
  }

  function animate() {
    const contents = ['.hero-contents__cta', '.hero-contents__text'];

    gsap.set('.hero-title', { opacity: 0 })
    gsap.set(contents, { opacity: 0, y: 25 })
  
    gsap.to('.hero-title', { opacity: 1, delay: 1 })
    gsap.to(contents[0], { opacity: 1, y: 0, duration: 0.6, delay: 1.2 })
    gsap.to(contents[1], { opacity: 1, y: 0, duration: 0.8, delay: 1.5 })
  }

  function getVideoPath() {
    if(originHeight !== window.innerHeight) return;  // ios 메뉴바 높이 변화 리사이즈 이슈 대응
    
    const targetMedia = breakPointWidth();
    const videoSrc = updateMediaSrc(targetMedia, heroVideoL, heroVideoM, heroVideoS);
    const imageSrc = updateMediaSrc(targetMedia, heroImageL, heroImageM, heroImageS);
    video.src = videoSrc;
    poster.src = imageSrc;

    video.play().catch(e => {});
    video.addEventListener('ended', () => poster.classList.add('show'));
  }

  function init() {
    getVh();
    animate();
    getVideoPath();

    window.addEventListener('resize', getVideoPath);
  }

  init();
}

export { hero };