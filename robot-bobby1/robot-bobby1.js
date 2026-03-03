let scene, camera, renderer, sphere;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(
  75, // fov
  window.innerWidth / window.innerHeight, // aspect
  0.1, // near
  10 // far
);

camera.position.z = 2;
scene = new THREE.Scene();

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color: 0xccff,
  flatShading: true,
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(hemiLight);

animate();

function animate(t = 0) {
  console.log(t);
  requestAnimationFrame(animate);
  // mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
  controls.update();
}


