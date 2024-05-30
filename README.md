# PORTFOLIO - iphone 15 pro
iphone 15 pro 포트폴리오 웹사이트입니다.
<br /><br />

### 사용 스택
* <a href="https://gsap.com/">GSAP</a>
* <a href="https://threejs.org/">Three.js</a>
* <a href="https://swiperjs.com/">Swiper.js</a>
* <a href="https://sass-lang.com/">SCSS</a>
* <a href="https://vitejs.dev/">Vite</a>


### 실행
```
npm i
npm run dev
npm run build
```


### 구조
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
- assets/imgs: 컴포넌트별 이미지 파일. ( 번들링시 이미지 최적화 )
- index.html

### 미리보기
![re-viewer](https://github.com/toniczin/apple/assets/170789939/0012d668-1769-47bb-84a8-c82434309339)

three.js 사용하여 3d 객체 랜더링. <br />
실제 프로덕트의 컬러값을 알 수 없어 대략의 값을 프리 모델에 적용시키는 방법을 사용.

<hr />

gsap을 이용하여 스크롤 애니메이션 구현. <br />
swiper.js 사용하여 slider 구현.

