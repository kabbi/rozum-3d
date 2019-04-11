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

  gui.add(guiState, 'url').name('Server url');
  gui.add(guiState, 'animate').name('Animate!');

  disableEventPropagation(gui);

  app.showURL = url => {
    guiState.url = url;
    gui.updateDisplay();
  };
};
