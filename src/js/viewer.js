import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { productData } from './setting';
gsap.registerPlugin( ScrollTrigger );

class Viewer {
  constructor() {
    this.container = document.getElementById('viewer');
    this.containerWidth = this.container.getBoundingClientRect().width;
    this.containerHeight = this.container.getBoundingClientRect().height;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.containerWidth / this.containerHeight, 1, 2000);
    this.camera.position.set(0, 0, 30);

    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(this.containerWidth, this.containerHeight);
    this.renderer.setClearColor(0x000000, 0);

    this.container.appendChild(this.renderer.domElement);
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.enableZoom = false;

    this.model = null;
    this.productLabel = null;
    this.colorName = null;
    this.isRotating = false;

    this.handleColorchip = this.handleColorchip.bind(this);
    this.render = this.render.bind(this);

    this.sectionPadding = 0;
  }

  setViewer() {
    this.loadModel();
    this.loadHDR();
  }

  loadModel() {
    const productLabel = document.querySelector('.viewer-controls-desc');
    this.colorName = this.colorName ?? 'natural';
    const modelInfo = productData.find((item) => item.name === this.colorName);

    const url = '/assets/imgs/viewer/models/apple_iphone_15_pro.glb';
    // const texturePath = '/assets/imgs/viewer/viewer_texture_blue.png';

    new GLTFLoader().load(url, gltf => {
      if(this.model) this.scene.remove(this.model);

      this.model = gltf.scene;

      this.model.traverse(node => {
        if(node.isMesh) {
          node.material.color = new THREE.Color(modelInfo.color);

          // if(node.material.name === 'ZVpJkazCvASOIpG') {// 전면부
          //   // const textureLoader = new THREE.TextureLoader();
          //   // textureLoader.load(texturePath, texture => {
          //   //   console.log(texture);
          //   //   node.material.transparent = true;
          //   //   node.material.opacity = 1;
          //   //   node.material.map = texture;
          //   //   node.material.map.needsUpdate = true;
          //     // console.log(node.material);
          //   // });
          // }
        }
      });

      this.model.scale.set(110, 110, 110);
      this.scene.add(this.model);

      // 모델 로드 후 최초 한번만 실행
      if(!this.isRotating) {
        setTimeout(_ => {
          this.autoRotation();
        }, 50);
      }
    });

    productLabel.innerHTML = modelInfo.title;
  }

  handleColorchip(e) {
    const colorchipCta = document.querySelectorAll('.viewer-controls-colorchip__cta');
    const target = e.target;
    this.colorName = target.dataset.colorchipCta;

    colorchipCta.forEach(_ => _.classList.remove('active'));
    target.classList.add('active');

    this.loadModel();
  }

  loadHDR() {
    const url = '/assets/imgs/viewer/hdr/env-srgb-metal.hdr';

    new RGBELoader().load(url, texture => {
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      pmremGenerator.far = 50;
      this.scene.environment = pmremGenerator.fromEquirectangular(texture).texture;

      texture.dispose();
      pmremGenerator.dispose();
    });
  }

  autoRotation() {
    this.controls.enabled = false;

    gsap.to(this.model.rotation, {
      y: "+=6.28",
      duration: 3.5,
      repeat: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.viewer-header',
        start: () => `top-=${this.sectionPadding} center`,
        end: "bottom",
        toggleActions: "play none none none",
        markers: false,
      },
      onComplete: () => {
        this.isRotating = true;
        this.controls.enabled = true;
      },
    });
  }

  animate() {
    this.updateSectionPadding();

    gsap.set('.viewer-title', { opacity: 0, y: 25 })
    gsap.to('.viewer-title', {
      opacity: 1,  
      y: 0, 
      ease: "power1.out",
      scrollTrigger: {
        trigger: '.viewer-header',
        start: () => `top-=${this.sectionPadding} center`,
        end: "bottom",
        toggleActions: "play none none reverse",
        markers: false,
      }
    });
  }

  updateSectionPadding() {
    const section = document.querySelector('.section-viewer');
    const paddingTop = getComputedStyle(section).paddingTop;

    this.sectionPadding = parseInt(paddingTop);
  }

  render() {
    requestAnimationFrame(this.render);

    this.camera.updateProjectionMatrix();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.updateSectionPadding();

    this.containerWidth = this.container.getBoundingClientRect().width;
    this.containerHeight = this.container.getBoundingClientRect().height;

    this.camera.aspect = this.containerWidth / this.containerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.containerWidth, this.containerHeight);
  }

  bindEvent() {
    const colorchipCta = document.querySelectorAll('.viewer-controls-colorchip__cta');
    colorchipCta.forEach(_ => _.addEventListener('click', this.handleColorchip));
  }

  init() {
    this.animate();
    this.bindEvent();
    this.setViewer();
    this.render();

    window.addEventListener('resize', () => this.onResize());
  }
}

export { Viewer }