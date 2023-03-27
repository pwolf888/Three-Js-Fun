var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({canvas: myCanvas});
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 40;

const threeTone = new THREE.TextureLoader().load('./threeTone.jpg')
threeTone.minFilter = THREE.NearestFilter
threeTone.magFilter = THREE.NearestFilter

// Add floor create the floor geometry
var floorGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 10, 10);

// create the floor material
var floorMaterial = new THREE.MeshToonMaterial({
    color: 0xff0000, metalness: 0, // make the material fully reflective
    gradientMap: threeTone,
    roughness: 0.2, // make the reflections slightly blurred,
    side: THREE.DoubleSide
})

// create the floor mesh and add it to the scene
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.receiveShadow = true;
scene.add(floor);
// add a light to the scene
var light = new THREE.PointLight(0xff00ff, 1, 100);
light.castShadow = true;
scene.add(light);

// add an object to the scene that follows the mouse position
var object = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), new THREE.MeshBasicMaterial({color: 0xffffff}));
scene.add(object);

// add a mousemove event listener to the renderer
renderer
    .domElement
    .addEventListener('mousemove', onDocumentMouseMove);
// create an array to hold the cubes
var cubes = [];

// create the cube geometry and material
var cubeGeometry = new THREE.BoxGeometry(2, 2,30);
var cubeMaterial = new THREE.MeshToonMaterial({
    color: 0xff0000, 
    gradientMap: threeTone,
    metalness: 1, // make the material fully reflective
    roughness: 0.2, // make the reflections slightly blurred
});

// create 50 cubes and set their positions randomly
for (var i = 0; i < 500; i++) {
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    let width = window.innerWidth / 10;
    let height = window.innerHeight / 10;

    cube.position.x = parseInt((Math.random() * width - (width / 2)));
    cube.position.y = parseInt((Math.random() * height - (height / 2)));
    cube.position.z = 1;
    cube.castShadow = true;

    console.log()

    scene.add(cube);
    cubes.push(cube);
}

function animate() {
    requestAnimationFrame(animate);

    // cubes.forEach(value => {
    //     value.rotation.z += 0.01;
  
    // })

    renderer.render(scene, camera);
}

animate();

function onDocumentMouseMove(event) {
    // convert mouse coordinates to normalized device coordinates (-1 to 1)
    mouseX = (event.clientX / window.innerWidth) * 20 - 10;
    mouseY = -(event.clientY / window.innerHeight) * 20 + 10;

    // console.log(mouseX +" "+mouseY) update the camera's position and lookat
    // direction based on mouse position
    camera.position.x = mouseX * 5;
    camera.position.y = mouseY * 5;
    camera.lookAt(scene.position)
    // update the position of the object that follows
    // the mouse
    object
        .position
        .set(mouseX * 5, mouseY * 5, 5);
    
    light
        .position
        .set(mouseX * 5, mouseY * 5, 5);
}