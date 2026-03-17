let scene, camera, renderer, controls;

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
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.03;

  // Draw axes
  drawAxes();

  // Add directional light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);

  // Handle window resize
  window.addEventListener('resize', onWindowResize, false);

  animate();
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

  ////////////////////////////////////////

  const geometryC = new THREE.BoxGeometry(2, 2, 2);
  const materialC = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 });
  const cube = new THREE.Mesh(geometryC, materialC);
  scene.add(cube);

  // Create a BufferGeometry for the surface
  const geometry = new THREE.BufferGeometry();

  // Define the number of points
  const width = 32;
  const height = 32;
  const size = 10;
  const vertices = [];
  const indices = [];

  // Generate vertices
  for (let i = 0; i <= height; i++) {
    for (let j = 0; j <= width; j++) {
      const x = (j / width) * size - size / 2;
      const y = (i / height) * size - size / 2;
      const z = functionOfXY(x, y); // Replace with your function
      vertices.push(x, y, z);
    }
  }

  // Generate indices for the faces
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const a = i * (width + 1) + j;
      const b = i * (width + 1) + j + 1;
      const c = (i + 1) * (width + 1) + j;
      const d = (i + 1) * (width + 1) + j + 1;

      // Two triangles per square
      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  // Set attributes to the geometry
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);

  // Create a mesh with Phong material
  const materialP = new THREE.MeshPhongMaterial({ color: 0x0077ff, shininess: 100 });
  const surfaceMeshP = new THREE.Mesh(geometry, materialP);

  // Add the surface to the scene
  scene.add(surfaceMeshP);

  // Example function of z = f(x, y)
  function functionOfXY(x, y) {
    return Math.sin(Math.sqrt(x * x + y * y)); // Example function
  }
  //////////////////////////////////
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = (window.innerWidth) / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate(t = 0) {
  // console.log(t);
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
