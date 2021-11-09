import { AxesHelper, BoxBufferGeometry, Camera, Mesh, MeshNormalMaterial, PerspectiveCamera, Points, Scene, WebGLRenderer, PointsMaterial, BufferGeometry, Float32BufferAttribute, MathUtils, TextureLoader, VertexColors } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css';

const textureLoader = new TextureLoader();
const mgib = textureLoader.load("/img/think.gif");
const scene = new Scene();

const nbr = 140;
const distance = 2;
scene.add(new AxesHelper());


const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 0.5;
scene.add(camera);

const dots = new Float32Array(nbr * 3);
const colors = new Float32Array(nbr * 3);
for(let i = 0; i < dots.length; i++) {
  // dots[i] = MathUtils.randFloatSpread(distance);
  // dots[i + 1] = MathUtils.randFloatSpread(distance);
  dots[i + 2] = MathUtils.randFloatSpread(distance * 2);
  colors[i + 2] = Math.random() * 0.5 + 0.5;
}

const geometry = new BufferGeometry();
geometry.setAttribute('position', new Float32BufferAttribute(dots, 3));
geometry.setAttribute('color', new Float32BufferAttribute(dots, 3));
const pointMaterial = new PointsMaterial({
  // color: 0xfff000,
  size: 0.5,
  vertexColors: VertexColors,
  map: mgib,
  alphaTest: 0.01,
  transparent: true,
});
const pointsObject = new Points(geometry, pointMaterial);
scene.add(pointsObject);

const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

renderer.render(scene, camera);

function tick () {
  renderer.render(scene, camera);
  camera.position.y -= 0.01;
  camera.position.z -= 0.01;
  camera.lookAt(0, 0, 0);
  controls.update;
  requestAnimationFrame(tick);
}

tick();


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})


