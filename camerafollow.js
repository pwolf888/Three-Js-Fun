var camera, scene, renderer;
var mouseX = 0, mouseY = 0;

function init() {
  // create the camera, scene, and renderer as usual
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // add a light to the scene
  var light = new THREE.PointLight(0xffffff, 0.5, 10);
  scene.add(light);

  // add an object to the scene that follows the mouse position
  var object = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  scene.add(object);

  // add a mousemove event listener to the renderer
  renderer.domElement.addEventListener('mousemove', onDocumentMouseMove);

  // set the initial position of the camera and object
  camera.position.z = 5;
  object.position.set(0, 0, -5);
}

function onDocumentMouseMove(event) {
  // convert mouse coordinates to normalized device coordinates (-1 to 1)
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  // update the camera's position and lookat direction based on mouse position
  camera.position.x = mouseX * 5;
  camera.position.y = mouseY * 5;
  camera.lookAt(scene.position);

  // update the position of the object that follows the mouse
  object.position.set(mouseX * 5, mouseY * 5, 10);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
animate();