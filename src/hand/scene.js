import * as THREE from 'three';

const JointAxes = ['z', 'y', 'y', 'y', 'z', 'y'];
const JointAngleOffsets = [0, 90, 0, 90, 0, 0];
const DegToRad = Math.PI / 180;

export default app => {
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    2000,
  );
  camera.position.z = 10;

  const controls = new THREE.OrbitControls(camera);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();

  const grid = new THREE.GridHelper(20, 20, 0x000000, 0xaeaeae);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 200, 0);
  scene.add(light);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor('white', 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const joints = [];

  const loader = new THREE.FBXLoader();
  loader.load('/hand.fbx', object => {
    object.scale.set(0.01, 0.01, 0.01);
    object.position.set(0, 0.8, 0);
    object.traverse(child => {
      if (child.name.startsWith('Joint')) {
        joints.push(child);
      }
    });
    app.updateJoints([0, 0, 0, 0, 0, 0]);
    scene.add(object);
    app.handLoaded = true;
  });

  const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    if (app.animating) {
      for (let i = 0; i < joints.length; i++) {
        joints[i].rotation[JointAxes[i]] += 0.01;
      }
    }
  };

  app.updateJoints = values => {
    for (let i = 0; i < joints.length; i++) {
      joints[i].rotation[JointAxes[i]] =
        (values[i] + JointAngleOffsets[i]) * DegToRad;
    }
  };

  render();
};
