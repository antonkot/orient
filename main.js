import * as THREE from 'three';

window.addEventListener("devicemotion", handleOrientation);

const CAM_DIST = 5;

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

const debug = document.getElementById('debug');

function handleOrientation(event) {
    debug.innerText = JSON.stringify({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
    }, null, 2);
    return;
    const alpha = degToRad(event.alpha);  // Rotation around the z-axis
    const beta = degToRad(event.beta);    // Rotation around the x-axis
    const gamma = degToRad(event.gamma);  // Rotation around the y-axis

    // Adjust the beta to act as a polar angle (from -90 to 90 degrees)
    const polarAngle = Math.PI / 2 //Math.PI - beta //+ Math.PI / 2;  // Add π/2 to move beta from -90 to 90 to range 0 to π
    const azimuthalAngle = alpha - Math.PI;           // Alpha as azimuthal angle

    // Convert spherical coordinates (r, polarAngle, azimuthalAngle) to Cartesian coordinates
    const x = CAM_DIST * Math.sin(polarAngle) * Math.cos(azimuthalAngle);
    const y = CAM_DIST * Math.cos(polarAngle);  // Up and down (height)
    const z = CAM_DIST * Math.sin(polarAngle) * Math.sin(azimuthalAngle);

    // Update the camera's position
    camera.position.set(x, y, z);
    camera.lookAt(scene.position);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshNormalMaterial();

for (let i = -5; i < 5; i++) {
    for (let j = -5; j < 5; j++) {
        const cube = new THREE.Mesh( geometry, material );
        cube.position.set(i*2, -2, j*2);
        scene.add( cube );
    }
}

camera.position.z = CAM_DIST;

function animate() {
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );