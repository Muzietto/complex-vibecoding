// riemann_sphere.js

// Create a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding a light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Adjust camera position for better visibility
camera.position.set(1, 0, 0); // Move camera further back
// camera.lookAt(0, 0, 0) // Camera looks at the center of the sphere

function createRiemannSphere(radius) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 0x0080ff,
    transparent: true,
    opacity: 0.5,
    wireframe: true
  });

  const sphere = new THREE.Mesh(geometry, material);
  return sphere;
}

// Add the sphere to the scene
const sphere = createRiemannSphere(1);
scene.add(sphere);
camera.position.z = 3;

function mapToRiemannSphere(z) {
  const denominator = z ** 4 + 64;
  const mappedValue = 1 / denominator;

  // Extract real and imaginary parts
  return mappedValue; // This is how we originally define the mapping
}

// Function to generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function populateSphere() {
  for (let theta = 0; theta < Math.PI; theta += 0.2) {
    for (let phi = 0; phi < 2 * Math.PI; phi += 0.2) {
      const x = Math.sin(theta) * Math.cos(phi);  // Real part
      const y = Math.sin(theta) * Math.sin(phi);  // Imaginary part
      const z = Math.cos(theta);

      // Representing the complex number 
      const realPart = x; // x is the real part
      const imaginaryPart = y; // y is the imaginary part

      // Using the function to map to the Riemann sphere
      const denominator = Math.pow(realPart, 4) + Math.pow(imaginaryPart, 4) + 64;  // Rewrite for f(z)
      // const mapped = 1 / denominator;  // This is the value that will be plotted
      const mapped = Math.abs(1 / denominator); // Ensure it's positive

      // Reposition based on mapping
      const pointGeometry = new THREE.SphereGeometry(0.02);
      const pointMaterial = new THREE.MeshBasicMaterial({ color: getRandomColor() }); // Random Color
      const point = new THREE.Mesh(pointGeometry, pointMaterial);

      // Position the points on the sphere
      point.position.set(mapped * 0.1 * x, mapped * 0.1 * y, 0.1 * z);
      // point.position.set(x, y, z); // separates the points
      scene.add(point);
    }
  }
}

populateSphere();

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.005; // Rotate the sphere for better visibility
  renderer.render(scene, camera);
}

animate();

