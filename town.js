// Cylinder
const radius = 10;
const height = 100;
const segments = 32;

const cubeHeight = 10;
const cubeCount = 5;
let turn = false;
// Define the keyboard state
let keyboard = {};

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({canvas: myCanvas});
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z =30;
const threeTone = new THREE.TextureLoader().load('./img/fiveTone.jpg')
threeTone.minFilter = THREE.NearestFilter
threeTone.magFilter = THREE.NearestFilter



var light = new THREE.PointLight(0xff0000, 1, 100);
light.position.y = 30;
scene.add(light);

var sphereGeometry = new THREE.SphereGeometry(16, 16, 16);
var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
light.add(sphere);

var cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, segments);

const cylinderMaterial = new THREE.MeshToonMaterial( {
  color: 0xff0000,
  gradientMap: threeTone
} );

const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
cylinder.rotation.z= Math.PI * 0.5;
cylinder.position.y = -20
scene.add( cylinder );

var cubeGeometry = new THREE.BoxGeometry(cubeHeight , cubeHeight , cubeHeight);
var cubeMaterial = new THREE.MeshToonMaterial( {
  color: 0xff0000,
  gradientMap: threeTone
} );

for (var i = 0; i < cubeCount; i++) {
  var angle = i / cubeCount * Math.PI * 2;
  var z = Math.cos(angle) * radius;
  var x = Math.sin(angle) * radius;
  var y = i / cubeCount * height - height / 2;
  var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh.position.set(x, y, z);
  cubeMesh.rotation.y = angle;
  cylinder.add(cubeMesh);
}


// Landscape

var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('./img/landscape2.jpg');

// Create the material for the background plane
var bgMaterial = new THREE.MeshBasicMaterial({ map: texture });

// Create the geometry for the background plane
var bgGeometry = new THREE.PlaneGeometry(window.innerHeight, window.innerHeight, 1);

// Create the mesh for the background plane
var background = new THREE.Mesh(bgGeometry, bgMaterial);

// Set the z-depth of the background mesh to be behind everything else
background.position.z = -220;
// background.position.y= -200;

// Add the background mesh to the scene
scene.add(background);


function animate() {
  requestAnimationFrame(animate);

    if(turn) {
      cylinder.rotation.x += 0.01;
      light.rotation.y += 0.002;
    }
    if (keyboard[87]) { // W key
      cylinder.rotation.x += 0.02;
      if(background.position.y < 300){
        background.position.y += 0.5;
      }

      console.log(background.position.y)
    }
    if (keyboard[83]) { // S key
      cylinder.rotation.x -= 0.02;
      if(background.position.y > -200){
        background.position.y -= 0.5;
      }
      
    }
    // if (keyboard[65]) { // A key
    //   camera.position.x -= 0.1;
    // }
    // if (keyboard[68]) { // D key
    //   camera.position.x += 0.1;
    // }



  renderer.render(scene, camera);
}

animate();

 // Add event listeners for the keyboard events
 document.addEventListener('keydown', onKeyDown);
 document.addEventListener('keyup', onKeyUp);
// Handle the keydown event
function onKeyDown(event) {
  keyboard[event.keyCode] = true;
}

// Handle the keyup event
function onKeyUp(event) {
  keyboard[event.keyCode] = false;
}