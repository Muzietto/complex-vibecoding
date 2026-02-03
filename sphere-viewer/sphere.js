let scene, camera, renderer, sphere;

function init() {
  // Create the scene
  scene = new THREE.Scene();

  // Create the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // Create a wireframe sphere
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshPhongMaterial({ color: 0x0077ff, wireframe: true });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Add directional light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);

  // Draw axes
  drawAxes();

  // Handle window resize
  window.addEventListener('resize', onWindowResize, false);

  // Set up control listeners
  document.getElementById('rotateXY').addEventListener('input', updateView);
  document.getElementById('rotateYZ').addEventListener('input', updateView);
  document.getElementById('rotateXZ').addEventListener('input', updateView);
  document.getElementById('zoom').addEventListener('input', updateZoom);

  // Set up text input listeners
  document.getElementById('valueXY').addEventListener('input', updateRangeFromText('rotateXY', 'valueXY'));
  document.getElementById('valueYZ').addEventListener('input', updateRangeFromText('rotateYZ', 'valueYZ'));
  document.getElementById('valueXZ').addEventListener('input', updateRangeFromText('rotateXZ', 'valueXZ'));
  document.getElementById('valueZoom').addEventListener('input', updateRangeFromText('zoom', 'valueZoom'));

  animate();
}

function drawAxes() {
  const axesMaterial = new THREE.LineBasicMaterial({ linewidth: 2 });

  const axesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(12); // 6 points (2 for each axis)

  // X Axis (Red)
  positions.set([-5, 0, 0, 0, 0, 0], 0); // Start at (-5, 0, 0) and end at (5, 0, 0)

  // Y Axis (Green)
  positions.set([0, -5, 0, 0, 5, 0], 6); // Start at (0, -5, 0) and end at (0, 5, 0)

  // Z Axis (Blue)
  // positions.set([0, 0, -5, 0, 0, 5], 12); // Start at (0, 0, -5) and end at (0, 0, 5)

  // Set positions to geometry
  axesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Create the lines for axes
  const axes = new THREE.LineSegments(axesGeometry, axesMaterial);
  scene.add(axes);
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

  // Update text inputs
  document.getElementById('valueXY').value = document.getElementById('rotateXY').value;
  document.getElementById('valueYZ').value = document.getElementById('rotateYZ').value;
  document.getElementById('valueXZ').value = document.getElementById('rotateXZ').value;
}

function updateZoom() {
  const zoomValue = parseFloat(document.getElementById('zoom').value);
  camera.position.z = 5 - zoomValue;
  document.getElementById('valueZoom').value = zoomValue;
}

function updateRangeFromText(rangeId, textId) {
  return function () {
    const value = document.getElementById(textId).value;
    const rangeInput = document.getElementById(rangeId);
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue) && parsedValue >= rangeInput.min && parsedValue <= rangeInput.max) {
      rangeInput.value = parsedValue;
      updateView();
    }
  };
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
