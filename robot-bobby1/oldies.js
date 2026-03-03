
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
  const geometry = new THREE.SphereGeometry(1, 32, 32); // used to be 32
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: true });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const circleGeometry = new THREE.CircleGeometry(1, 32); // Create a circle geometry with radius 1

  /////////////// RED CIRCLE - X AXIS
  const redCircleMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 }); // Red line material

  // Create the circle as a LineLoop
  const redCircle = new THREE.LineLoop(circleGeometry, redCircleMaterial);

  // Rotate the circle to be perpendicular to the X-axis
  redCircle.rotation.y = Math.PI / 2; // Rotate around Y-axis

  // Position the circle at the center of the sphere
  redCircle.position.set(0, 0, 0);

  // Add the circle to the scene
  scene.add(redCircle);

  /////////////// GREEN CIRCLE - Y AXIS
  const greenCircleMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 }); // Green line material
  const greenCircle = new THREE.LineLoop(circleGeometry, greenCircleMaterial); // Create the green circle

  // Rotate the green circle to be perpendicular to the Y-axis
  greenCircle.rotation.x = Math.PI / 2; // Rotate around X-axis

  // Position the green circle at the center of the sphere
  greenCircle.position.set(0, 0, 0);

  // Add the green circle to the scene
  scene.add(greenCircle);

  /////////////// BLUE CIRCLE - Z AXIS
  const blueCircleMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 2 }); // Blue line material
  const blueCircle = new THREE.LineLoop(circleGeometry, blueCircleMaterial); // Create the blue circle

  // Rotate the blue circle to be perpendicular to the Z-axis
  blueCircle.rotation.z = Math.PI / 2; // Rotate around Z-axis

  // Position the blue circle at the center of the sphere
  blueCircle.position.set(0, 0, 0);

  // Add the blue circle to the scene
  scene.add(blueCircle);
  ////////////////// END OF CIRCLES CREATION

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
  updateView();
  onWindowResize();
}


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

//init();