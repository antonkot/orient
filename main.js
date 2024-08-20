import * as THREE from 'three';

window.addEventListener("deviceorientation", handleOrientation, true);

const CAM_DIST = 5;

function handleOrientation(event) {
    const x = 0;//event.beta * (Math.PI / 180);
    const y = event.gamma * (Math.PI / 180);
    
    const pos = new THREE.Vector3().setFromSphericalCoords(CAM_DIST, x, y).negate();
    camera.position.copy(pos);
    camera.lookAt(new THREE.Vector3());
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
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