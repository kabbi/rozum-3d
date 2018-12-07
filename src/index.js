import './index.css';

import 'three/examples/js/libs/inflate.min.js';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/loaders/FBXLoader';

import initGUI from './hand/gui';
import initScene from './hand/scene';
import initNetwork from './hand/network';

const app = {
  animating: false,
  handLoaded: false,
};

initGUI(app);
initScene(app);
initNetwork(app);
