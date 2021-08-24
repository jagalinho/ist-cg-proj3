var plane, plane_body, plane_wing = [], plane_cockpit, plane_materials = [];

var square = 14, point_square = 4, body_depth = 90;
var wings_width = 100, wings_height = 3, wings_max_depth = 22.5, wings_min_depth = 7.5;
var stabilizers_h_scale = 0.3, stabilizers_v_scale = 0.35;
var cockpit_min_width = 6, cockpit_max_width = 8, cockpit_height = 3, cockpit_depth = 15;

var plane_rot_speed = 2;

function generatePlaneMaterials() {
    'use strict';
    let commonMaterial = {
        side: THREE.DoubleSide
    };

    let bodyMaterial = {...commonMaterial,
        color: 0x777777
    },  wingMaterial = {...commonMaterial,
        color: 0x770000
    },  cockpitMaterial = {...commonMaterial,
        color: 0x000077
    };

    plane_materials.push([
        //Body Materials
        new THREE.MeshLambertMaterial({...bodyMaterial}),
        new THREE.MeshPhongMaterial({...bodyMaterial,
            shineness: 0}),
        new THREE.MeshBasicMaterial({...bodyMaterial})],
    [   //Wing Materials
        new THREE.MeshLambertMaterial({...wingMaterial}),
        new THREE.MeshPhongMaterial({...wingMaterial,
            shineness: 0}),
        new THREE.MeshBasicMaterial({...wingMaterial})],
    [   // Cockpit Materials
        new THREE.MeshLambertMaterial({...cockpitMaterial}),
        new THREE.MeshPhongMaterial({...cockpitMaterial,
            specular: 0xffffff,
            shininess: 100}),
        new THREE.MeshBasicMaterial({...cockpitMaterial})]);
}

function createPlaneBody(x, y, z) {
    'use strict';
    let geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(-(body_depth/2) + 6, (square/2), -(square/2)), //v0
        new THREE.Vector3(-(body_depth/2) + 6, (square/2), (square/2)),                     //v1
        new THREE.Vector3(-(body_depth/2), -(square/2), -(square/2)),                       //v2
        new THREE.Vector3(-(body_depth/2), -(square/2), (square/2)),                        //v3
        new THREE.Vector3((body_depth/2), (square/2), -(point_square/2)),                   //v4
        new THREE.Vector3((body_depth/2), (square/2), (point_square/2)),                    //v5
        new THREE.Vector3((body_depth/2) - 20, -(square/2), -(square/2)),                   //v6
        new THREE.Vector3((body_depth/2) - 20, -(square/2), (square/2)),                    //v7
        new THREE.Vector3((body_depth/2) - 26, (square/2), -(square/2)),                    //v8
        new THREE.Vector3((body_depth/2) - 26, (square/2), (square/2)),                     //v9
        new THREE.Vector3(-(body_depth/2) - 9, (point_square/2) - 2, -(point_square/2)),    //v10
        new THREE.Vector3(-(body_depth/2) - 9, (point_square/2) - 2, (point_square/2)),     //v11
        new THREE.Vector3(-(body_depth/2) - 9, -(point_square/2) - 2, -(point_square/2)),   //v12
        new THREE.Vector3(-(body_depth/2) - 9, -(point_square/2) - 2, (point_square/2)));   //v13

    geometry.faces.push(new THREE.Face3(2, 3, 6),
        new THREE.Face3(3, 6, 7),
        new THREE.Face3(0, 1, 8),
        new THREE.Face3(1, 8, 9),
        new THREE.Face3(1, 3, 9),
        new THREE.Face3(3, 9, 7),
        new THREE.Face3(0, 2, 8),
        new THREE.Face3(2, 8, 6),
        new THREE.Face3(0, 10, 11),
        new THREE.Face3(0, 11, 1),
        new THREE.Face3(11, 1, 3),
        new THREE.Face3(3, 11, 13),
        new THREE.Face3(3, 13, 2),
        new THREE.Face3(13, 2, 12),
        new THREE.Face3(12, 2, 10),
        new THREE.Face3(2, 10, 0),
        new THREE.Face3(4, 8, 9),
        new THREE.Face3(4, 5, 9),
        new THREE.Face3(5, 7, 9),
        new THREE.Face3(4, 6, 8),
        new THREE.Face3(4, 6, 7),
        new THREE.Face3(4, 5, 7),
        new THREE.Face3(10, 11, 12),
        new THREE.Face3(11, 12, 13));

    geometry.computeFaceNormals();

    let mesh = new THREE.Mesh(geometry, plane_materials[0][0]);
    mesh.position.set(x, y, z);

    return mesh;
}

function createPlaneWings(x, y, z) {
    'use strict';
    let geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(-(wings_min_depth/2), (wings_height/2) + 4, (wings_width/2)),  //v0
        new THREE.Vector3((wings_min_depth/2), (wings_height/2) + 4, (wings_width/2)),                      //v1
        new THREE.Vector3(-(wings_min_depth/2), -(wings_height/2) + 4, (wings_width/2)),                    //v2
        new THREE.Vector3((wings_min_depth/2), -(wings_height/2) + 4, (wings_width/2)),                     //v3
        new THREE.Vector3(-(wings_max_depth), 0, 0),                                                        //v4
        new THREE.Vector3((wings_max_depth/5), (wings_height/2), 0),                                        //v5
        new THREE.Vector3((wings_max_depth/5), -(wings_height/2), 0),                                       //v6
        new THREE.Vector3(-(wings_min_depth/2), (wings_height/2) + 4, -(wings_width/2)),                    //v7
        new THREE.Vector3((wings_min_depth/2), (wings_height/2) + 4, -(wings_width/2)),                     //v8
        new THREE.Vector3(-(wings_min_depth/2), -(wings_height/2) + 4, -(wings_width/2)),                   //v9
        new THREE.Vector3((wings_min_depth/2), -(wings_height/2) + 4, -(wings_width/2)));                   //v10

    geometry.faces.push(new THREE.Face3(0, 1, 2),
        new THREE.Face3(1, 2, 3),
        new THREE.Face3(7, 8, 9),
        new THREE.Face3(8, 9, 10),
        new THREE.Face3(0, 1, 4),
        new THREE.Face3(1, 4, 5),
        new THREE.Face3(2, 3, 4),
        new THREE.Face3(3, 4, 6),
        new THREE.Face3(7, 8, 4),
        new THREE.Face3(8, 4, 5),
        new THREE.Face3(9, 10, 4),
        new THREE.Face3(10, 4, 6),
        new THREE.Face3(1, 5, 6),
        new THREE.Face3(1, 3, 6),
        new THREE.Face3(8, 10, 5),
        new THREE.Face3(10, 5, 6),
        new THREE.Face3(4, 0, 2),
        new THREE.Face3(4, 7, 9));

    geometry.computeFaceNormals();

    let mesh = new THREE.Mesh(geometry, plane_materials[1][0]);
    mesh.position.set(x, y, z);

    return mesh;
}

function createPlaneHStabilizers(x, y, z) {
    'use strict';
    let geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(-(wings_min_depth*stabilizers_h_scale/2), (wings_height*stabilizers_h_scale/2), (wings_width*stabilizers_h_scale/2) + 3),  //v0
        new THREE.Vector3((wings_min_depth*stabilizers_h_scale/2), (wings_height*stabilizers_h_scale/2), (wings_width*stabilizers_h_scale/2) + 3),                      //v1
        new THREE.Vector3(-(wings_min_depth*stabilizers_h_scale/2), -(wings_height*stabilizers_h_scale/2), (wings_width*stabilizers_h_scale/2) + 3),                    //v2
        new THREE.Vector3((wings_min_depth*stabilizers_h_scale/2), -(wings_height*stabilizers_h_scale/2), (wings_width*stabilizers_h_scale/2) + 3),                     //v3
        new THREE.Vector3(-(wings_max_depth*stabilizers_h_scale), 0, 0),                                                                                                //v4
        new THREE.Vector3((wings_max_depth*stabilizers_h_scale/5), (wings_height*stabilizers_h_scale/2), 0),                                                            //v5
        new THREE.Vector3((wings_max_depth*stabilizers_h_scale/5), -(wings_height*stabilizers_h_scale/2), 0),                                                           //v6
        new THREE.Vector3(-(wings_min_depth*stabilizers_h_scale/2), (wings_height*stabilizers_h_scale/2), -(wings_width*stabilizers_h_scale/2) - 3),                    //v7
        new THREE.Vector3((wings_min_depth*stabilizers_h_scale/2), (wings_height*stabilizers_h_scale/2), -(wings_width*stabilizers_h_scale/2) - 3),                     //v8
        new THREE.Vector3(-(wings_min_depth*stabilizers_h_scale/2), -(wings_height*stabilizers_h_scale/2), -(wings_width*stabilizers_h_scale/2) - 3),                   //v9
        new THREE.Vector3((wings_min_depth*stabilizers_h_scale/2), -(wings_height*stabilizers_h_scale/2), -(wings_width*stabilizers_h_scale/2) - 3));                   //v10

    geometry.faces.push(new THREE.Face3(0, 1, 2),
        new THREE.Face3(1, 2, 3),
        new THREE.Face3(7, 8, 9),
        new THREE.Face3(8, 9, 10),
        new THREE.Face3(0, 1, 4),
        new THREE.Face3(1, 4, 5),
        new THREE.Face3(2, 3, 4),
        new THREE.Face3(3, 4, 6),
        new THREE.Face3(7, 8, 4),
        new THREE.Face3(8, 4, 5),
        new THREE.Face3(9, 10, 4),
        new THREE.Face3(10, 4, 6),
        new THREE.Face3(1, 5, 6),
        new THREE.Face3(1, 3, 6),
        new THREE.Face3(8, 10, 5),
        new THREE.Face3(10, 5, 6),
        new THREE.Face3(4, 0, 2),
        new THREE.Face3(4, 7, 9));

    geometry.computeFaceNormals();

    let mesh = new THREE.Mesh(geometry, plane_materials[1][0]);
    mesh.position.set(x, y, z);

    return mesh;
}

function createPlaneVStabilizer(x, y, z) {
    'use strict';
    let geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(-(wings_max_depth*stabilizers_v_scale) + 1, 0, 0),                                                             //v0
        new THREE.Vector3((wings_max_depth*stabilizers_v_scale/5) + 4, 0, -(wings_height*stabilizers_v_scale/2)),                                           //v1
        new THREE.Vector3((wings_max_depth*stabilizers_v_scale/5) + 4, 0, (wings_height*stabilizers_v_scale/2)),                                            //v2
        new THREE.Vector3(-(wings_min_depth*stabilizers_v_scale/2) + 6, (wings_width*stabilizers_v_scale/2) - 3, -(wings_height*stabilizers_v_scale/2)),    //v3
        new THREE.Vector3((wings_min_depth/2) + 6, (wings_width*stabilizers_v_scale/2) - 3, -(wings_height*stabilizers_v_scale/2)),                         //v4
        new THREE.Vector3(-(wings_min_depth*stabilizers_v_scale/2) + 6, (wings_width*stabilizers_v_scale/2) - 3, (wings_height*stabilizers_v_scale/2)),     //v5
        new THREE.Vector3((wings_min_depth/2) + 6, (wings_width*stabilizers_v_scale/2) - 3, (wings_height*stabilizers_v_scale/2)));                         //v6

    geometry.faces.push(new THREE.Face3(0, 1, 2),
        new THREE.Face3(0, 3, 5),
        new THREE.Face3(3, 4, 5),
        new THREE.Face3(4, 5, 6),
        new THREE.Face3(0, 5, 2),
        new THREE.Face3(2, 5, 6),
        new THREE.Face3(0, 1, 3),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(1, 6, 4),
        new THREE.Face3(1, 6, 2));

    geometry.computeFaceNormals();

    let mesh = new THREE.Mesh(geometry, plane_materials[1][0]);
    mesh.position.set(x, y, z);

    return mesh;
}

function createPlaneCockpit(x, y ,z) {
    'use strict';
    let geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(-cockpit_depth + 2, square/2, 0),                  //v0
        new THREE.Vector3((cockpit_depth/2), square/2, -(cockpit_max_width/2) - 1),             //v1
        new THREE.Vector3((cockpit_depth/2), square/2, (cockpit_max_width/2) + 1),              //v2
        new THREE.Vector3(-cockpit_depth/2, square/2 + cockpit_height, -(cockpit_min_width/2)), //v3
        new THREE.Vector3(cockpit_depth/4, square/2 + cockpit_height, -(cockpit_max_width/2)),  //v4
        new THREE.Vector3(-cockpit_depth/2, square/2 + cockpit_height, (cockpit_min_width/2)),  //v5
        new THREE.Vector3(cockpit_depth/4, square/2 + cockpit_height, (cockpit_max_width/2)));  //v6

    geometry.faces.push(new THREE.Face3(0, 1, 2),
        new THREE.Face3(0, 3, 5),
        new THREE.Face3(3, 4, 5),
        new THREE.Face3(4, 5, 6),
        new THREE.Face3(0, 5, 2),
        new THREE.Face3(2, 5, 6),
        new THREE.Face3(0, 1, 3),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(1, 6, 4),
        new THREE.Face3(1, 6, 2));

    geometry.computeFaceNormals();

    let mesh = new THREE.Mesh(geometry, plane_materials[2][0]);
    mesh.position.set(x, y, z);

    return mesh;
}

function createPlane(x, y, z, rot) {
    'use strict';
    plane = new THREE.Object3D();

    generatePlaneMaterials();

    plane_body = createPlaneBody(2.5, 0, 0);
    plane_wing.push(createPlaneWings(0, -3, 0),
        createPlaneHStabilizers(40, square / 4, 0),
        createPlaneVStabilizer(36, square / 2, 0));
    plane_cockpit = createPlaneCockpit(-21, 0, 0);

    plane.add(plane_body, plane_cockpit);
    plane_wing.forEach(wing => plane.add(wing));

    plane.position.set(x, y + (square/2), z);
    plane.rotateY(rot);

    return plane;
}

function movePlane(arrow_set, delta) {
    'use strict';
    arrow_set.forEach(arrowKey => {
        switch (arrowKey) {
            case 38:    //Up
                plane.rotateZ(-plane_rot_speed * delta);
                break;
            case 40:    //Down
                plane.rotateZ(plane_rot_speed * delta);
                break;
            case 37:    //Left
                plane.rotateY(plane_rot_speed * delta);
                break;
            case 39:    //Right
                plane.rotateY(-plane_rot_speed * delta);
                break;
        }
    });
}

function setPlaneMaterial(material) {
    let materialIndex;
    switch (material) {
        case "Gouraud":
            materialIndex = 0;
            break;
        case "Phong":
            materialIndex = 1;
            break;
        case "Basic":
            materialIndex = 2;
            break;
    }

    plane_body.material = plane_materials[0][materialIndex];
    plane_wing.forEach(wing => wing.material = plane_materials[1][materialIndex]);
    plane_cockpit.material = plane_materials[2][materialIndex];
}