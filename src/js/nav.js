import { breakPointWidth, breakpointMaxWidthS } from './setting';

function nav() {
  const icons = ['apple', 'cart', 'search'];
  const targetMedia = breakPointWidth();
  const isMobile = window.matchMedia(`(max-width: ${breakpointMaxWidthS}px)`).matches;
  
  function getIconPath(iconName) {
    return isMobile
            ? `/assets/imgs/nav/icon_${iconName}-${targetMedia}.svg`
            : `/assets/imgs/nav/icon_${iconName}.svg`;
  }

  icons.forEach(item => {
    const iconPath = getIconPath(item);
    document.querySelector(`.nav-list__img.${item}`).src = iconPath;
  });

  window.addEventListener('resize', nav);
}

export { nav }