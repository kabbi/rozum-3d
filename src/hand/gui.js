import * as dat from 'dat.gui';

const disableEventPropagation = gui => {
  for (const event of ['mousedown', 'mousemove', 'keydown', 'keyup']) {
    gui.domElement.addEventListener(event, event => {
      event.stopPropagation();
    });
  }
};

export default app => {
  const gui = new dat.GUI();
  const guiState = {};

  guiState.animate = () => {
    app.animating = true;
    setTimeout(() => {
      app.animating = false;
    }, 10000);
  };

  guiState.url = '';

  // const connectionFolder = gui.addFolder('Connection');
  // connectionFolder.add(options, 'url').name('API Url');
  // connectionFolder.add(options, 'refreshRate', 10).name('Refresh rate');
  // statusGUI = connectionFolder.add(options, 'status').name('Status');
  // connectionFolder.add(options, 'reconnect').name('Update settings');
  // const poseFolder = gui.addFolder('Pose');

  gui.add(guiState, 'url').name('Server url');
  gui.add(guiState, 'animate').name('Animate!');

  disableEventPropagation(gui);

  app.showURL = url => {
    guiState.url = url;
    gui.updateDisplay();
  };
};
