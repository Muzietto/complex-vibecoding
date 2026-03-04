let scene, camera, renderer, sphere;

function init() {
  // Create the scene
  scene = new THREE.Scene();

  // Create the camera
  camera = new THREE.PerspectiveCamera(
    75, // fov
    window.innerWidth / window.innerHeight, // aspect
    0.1, // near
    1000 // far
  );
  camera.position.z = 5;
  camera.position.x = 5;
  camera.position.y = 5;

  // Create the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // Create the mouse control
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.03;

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

  animate();
  updateView();
  onWindowResize();
}

function drawAxes() {
  const xAxisMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 }); // Red
  const yAxisMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 }); // Green
  const zAxisMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 2 }); // Blue

  // Create separate geometries for each axis
  const xGeometry = new THREE.BufferGeometry();
  const yGeometry = new THREE.BufferGeometry();
  const zGeometry = new THREE.BufferGeometry();

  // X Axis (Red)
  const xPositions = new Float32Array([0, 0, 0, 5, 0, 0]); // Start at (-5, 0, 0) and end at (5, 0, 0)
  xGeometry.setAttribute('position', new THREE.BufferAttribute(xPositions, 3));
  const xAxis = new THREE.LineSegments(xGeometry, xAxisMaterial);

  // Y Axis (Green)
  const yPositions = new Float32Array([0, 0, 0, 0, 5, 0]); // Start at (0, -5, 0) and end at (0, 5, 0)
  yGeometry.setAttribute('position', new THREE.BufferAttribute(yPositions, 3));
  const yAxis = new THREE.LineSegments(yGeometry, yAxisMaterial);

  // Z Axis (Blue)
  const zPositions = new Float32Array([0, 0, 0, 0, 0, 5]); // Start at (0, 0, -5) and end at (0, 0, 5)
  zGeometry.setAttribute('position', new THREE.BufferAttribute(zPositions, 3));
  const zAxis = new THREE.LineSegments(zGeometry, zAxisMaterial);

  // Add axes to the scene
  scene.add(xAxis);
  scene.add(yAxis);
  scene.add(zAxis);

  const pointGeometry = new THREE.SphereGeometry(0.03, 8, 8); // Small sphere for the point
  const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White material
  const point = new THREE.Mesh(pointGeometry, pointMaterial); // Create the point

  // Set the position of the point to (1, 1, 1)
  point.position.set(1, 1, 1);

  // Add the point to the scene
  scene.add(point);

  const pointX = new THREE.Mesh(pointGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  pointX.position.set(1.5, 0, 0);
  scene.add(pointX);

  const pointY = new THREE.Mesh(pointGeometry, new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  pointY.position.set(0, 1.5, 0);
  scene.add(pointY);

  const pointZ = new THREE.Mesh(pointGeometry, new THREE.MeshBasicMaterial({ color: 0x0000ff }));
  pointZ.position.set(0, 0, 1.5);
  scene.add(pointZ);

}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = (window.innerWidth) / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate(t = 0) {
  console.log(t);
  requestAnimationFrame(animate);
  // mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
  controls.update();
}

/*
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
*/

init();
