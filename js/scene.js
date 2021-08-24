var camera, scene, renderer;
var clock, delta, arrow_set;

var global_light, global_light_intensity = 0.7;
var currMaterial = "Gouraud", basicMaterial = false;

function createScene() {
    'use strict';
    scene = new THREE.Scene();

    global_light = new THREE.DirectionalLight(0xffffff, global_light_intensity);
    scene.add(global_light);

    scene.add(createPlane(0, 0, 0, -Math.PI / 4));
    scene.add(createSpotlight(60, 65, -60, Math.PI / 3, 3 * Math.PI / 4),
        createSpotlight(60, 65, 60, Math.PI / 3, Math.PI / 4),
        createSpotlight(-60, 65, 60, Math.PI / 3, -Math.PI / 4),
        createSpotlight(-60, 65, -60, Math.PI / 3, 3 * -Math.PI / 4));
}

function createCameras() {
    'use strict';
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(-100, 70, 0);
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = innerWidth / innerHeight;
        let scaling = window.innerWidth < 1000 ? 1000 / window.innerWidth : 1;
        camera.zoom = 1 / scaling;
        camera.updateProjectionMatrix();
    }
}

function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
    case 78:    //N
    case 110:   //n
        global_light.intensity = global_light.intensity === global_light_intensity ? 0 : global_light_intensity;
        break;
    case 71:    //G
    case 103:   //g
        currMaterial = currMaterial === "Gouraud" ? "Phong" : "Gouraud";
        if (!basicMaterial)
            setPlaneMaterial(currMaterial);
        break;
    case 76:    //L
    case 108:   //l
        basicMaterial = !basicMaterial;
        if (basicMaterial)
            setPlaneMaterial("Basic");
        else
            setPlaneMaterial(currMaterial);
        break;
    case 49:    //1
        toggleSpotlight(0);
        break;
    case 50:    //2
        toggleSpotlight(1);
        break;
    case 51:    //3
        toggleSpotlight(3);
        break;
    case 52:    //4
        toggleSpotlight(2);
        break;
    case 38:    //Up
    case 40:    //Down
    case 37:    //Left
    case 39:    //Right
        arrow_set.add(e.keyCode);
        break;
    }
}

function onKeyUp(e) {
    'use strict';
    switch (e.keyCode) {
        case 38:    //Up
        case 40:    //Down
        case 37:    //Left
        case 39:    //Right
            arrow_set.delete(e.keyCode);
            break;
    }
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    arrow_set = new Set();
   
    createScene();
    createCameras();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict';
    delta = clock.getDelta();
    movePlane(arrow_set, delta);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}