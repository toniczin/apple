# PORTFOLIO - iphone 15 pro
iphone 15 pro 포트폴리오 웹사이트입니다. <br />
URL : https://ezin-apple.netlify.app/

<br />


## 사용 스택
* <a href="https://gsap.com/">GSAP</a>
* <a href="https://threejs.org/">Three.js</a>
* <a href="https://swiperjs.com/">Swiper.js</a>
* <a href="https://sass-lang.com/">SCSS</a>
* <a href="https://vitejs.dev/">Vite</a>


## 실행
```
npm i
npm run dev
npm run build
```


## 구조
- skin: 컴포넌트별 html 파일.
- scss: 컴포넌트별 scss 파일.
  - _font.scss: 폰트 정의
  - _variables.scss: root, 공통 변수 정의
  - _reset.scss: 스타일 초기화
  - style.scss: scss 파일 import
- js: 컴포넌트별 javascript 파일.
  - utils.js: assets 로드
  - setting.js: 공통 함수 및 데이터 export
  - main.js: js 파일 import
- assets/imgs: 컴포넌트별 이미지 파일.
- index.html


## 빌드옵션
- injectHTML: html 파일 컴포넌트화
- ViteImageOptimizer: 번들링시 이미지 최적화
- ViteMinifyPlugin: minify


## 미리보기
### section_highlights
![hi](https://github.com/toniczin/apple/assets/170789939/f092b147-de8e-4cba-b241-7b9998da9e3e)

1. **동영상의 재생 시간과 상관없이 5초마다 다음 슬라이드로 넘어가도록 설정**
2. **시작, 정지, 재시작 버튼 구현**
3. **현재 슬라이드에 대한 progress bar**
4. **swiper.js 사용하여 slider 구현**

### section_viewer
![re-viewer](https://github.com/toniczin/apple/assets/170789939/0012d668-1769-47bb-84a8-c82434309339)

1. **three.js 사용하여 3d 객체 랜더링**
2. **컬러칩 선택으로 오브젝트 색상 변경 가능 (실제 프로덕트의 컬러값을 알 수 없어 임의의 값을 프리 모델에 적용)**
4. **사용자의 움직임에 반응하되 zoom 기능은 불가능 하도록 세팅**
5. **특정 구간 도달시 오브젝트 360° 회전**

### section_design
![ab](https://github.com/toniczin/apple/assets/170789939/a0c690cf-5add-473e-aabb-865ebe5cc312)

1. **gsap을 이용하여 스크롤 애니메이션 구현.**
2. **특정 구간 도달시 동영상 재생 및 이미지 애니메이션**

외 나머지 section에서의 동영상 파일 재생 후 이미지로 변환.
