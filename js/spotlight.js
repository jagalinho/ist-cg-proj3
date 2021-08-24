var spotlights = [];
var spotlight_intensity = 1.5;

function createSpotlightHead(x, y, z) {
    'use strict';
    let geometry = new THREE.ConeGeometry(8, 20, 15, 15, true);
    let material = new THREE.MeshBasicMaterial({color: 0x121212, side: THREE.DoubleSide, wireframe: false});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    return mesh;
}

function createSpotlightBulb(x, y ,z) {
    'use strict';
    let geometry = new THREE.SphereGeometry(3.5, 15, 15);
    let material = new THREE.MeshBasicMaterial({color: 0x444444, wireframe: false});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    return mesh;
}

function createSpotlight(x, y, z, tilt, rot) {
    'use strict';
    let spotlight = new THREE.Object3D();

    let light = new THREE.SpotLight(0xffffff, 0, 0, Math.PI / 9, 0.5);

    spotlights.push([createSpotlightBulb(0, 0, 0), light]);

    spotlight.add(createSpotlightHead(0, 0, 0), spotlights[spotlights.length - 1][0], light);

    spotlight.position.set(x, y, z);
    spotlight.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), tilt);
    spotlight.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), rot);

    return spotlight;
}

function toggleSpotlight(index) {
    if (spotlights[index][1].intensity === spotlight_intensity) {
        spotlights[index][1].intensity = 0;
        spotlights[index][0].material.color = new THREE.Color(0x444444);
    } else {
        spotlights[index][1].intensity = spotlight_intensity;
        spotlights[index][0].material.color = new THREE.Color(0xffffff);
    }
}