import { AxesHelper, BoxBufferGeometry, Camera, Mesh, MeshNormalMaterial, PerspectiveCamera, Points, Scene, WebGLRenderer } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css';


const scene = new Scene();
scene.add(new AxesHelper());


const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 0.5;
scene.add(camera);

const cubeGeometry = new BoxBufferGeometry(1, 1, 1);
const points = new Points(cubeGeometry);

scene.add(points);

const renderer = new WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

renderer.render(scene, camera);

function tick () {
  renderer.render(scene, camera);
  // camera.position.x += 0.01;
  // camera.lookAt(0, 0, 0);
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


