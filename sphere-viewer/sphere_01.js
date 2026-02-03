let scene, camera, renderer, sphere;

function init() {
  // Create the scene
  scene = new THREE.Scene();

  // Create the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // Adding a light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);

  // Create a sphere
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  // const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
  const material = new THREE.MeshPhongMaterial({
    color: 0x0080ff,
    transparent: true,
    opacity: 0.5,
    wireframe: true
  });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Handle window resize
  window.addEventListener('resize', onWindowResize, false);

  // Set up control listeners
  document.getElementById('rotateXY').addEventListener('input', updateView);
  document.getElementById('rotateYZ').addEventListener('input', updateView);
  document.getElementById('rotateXZ').addEventListener('input', updateView);
  document.getElementById('zoom').addEventListener('input', updateZoom);

  animate();
}

function onWindowResize() {
  renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
  camera.aspect = (window.innerWidth * 0.75) / window.innerHeight;
  camera.updateProjectionMatrix();
}

function updateView() {
  const rotateXY = THREE.MathUtils.degToRad(document.getElementById('rotateXY').value);
  const rotateYZ = THREE.MathUtils.degToRad(document.getElementById('rotateYZ').value);
  const rotateXZ = THREE.MathUtils.degToRad(document.getElementById('rotateXZ').value);

  camera.position.x = 5 * Math.cos(rotateYZ) * Math.cos(rotateXY);
  camera.position.y = 5 * Math.sin(rotateXZ);
  camera.position.z = 5 * Math.sin(rotateYZ) * Math.cos(rotateXY);
  camera.lookAt(sphere.position);
}

function updateZoom() {
  const zoomValue = parseFloat(document.getElementById('zoom').value);
  camera.position.z = 5 - zoomValue;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
