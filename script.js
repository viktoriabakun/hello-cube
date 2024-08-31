import * as THREE from 'three';

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

// CAMERA
const fov = 75; // field of view
const aspect = 2;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

// CUBE
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
renderer.render(scene, camera);

// RED LIGHT
const color = 0xff0000;
const intensity = 5;
const redLight = new THREE.DirectionalLight(color, intensity);
redLight.position.set(-1, 2, 4);
scene.add(redLight);

// GREEN LIGHT
const whiteLight = new THREE.DirectionalLight(0x00ff00, 5)
whiteLight.position.set(1, 10, 4);
scene.add(whiteLight);

// BLUE LIGHT
const blueLight = new THREE.DirectionalLight(0x0000ff, 5)
blueLight.position.set(1, -10, 4);
scene.add(blueLight);

function makeCubeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;

    return cube;
}

const cubes = [
    makeCubeInstance(geometry, 0x44aa88, 0),
    makeCubeInstance(geometry, 0x8844aa, -2),
    makeCubeInstance(geometry, 0xaa8844, 2),
];

// ANIMATION
function render(time) {
    time *= 0.001;  // convert time to seconds
    cubes.forEach((cube, index) => {
        const speed = 1 + index * .1;
        const rotation = time * speed;
        cube.rotation.x = rotation;
        cube.rotation.y = rotation;
    })

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);
