import '../scss/style.scss';

// Components
import { nav } from './nav.js';
import { hero } from './hero.js';
import { highlights } from './highlights.js';
import { Viewer } from './viewer.js';
import { design } from './design.js';
import { actionButton } from './actionButton.js';
import { ecosystem } from './ecosystem.js';

const viewer = new Viewer();

function init() {
  nav();
  hero();
  highlights();
  viewer.init();
  design();
  actionButton();
  ecosystem();
}

window.addEventListener('DOMContentLoaded', init);