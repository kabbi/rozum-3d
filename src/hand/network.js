import shortID from 'shortid';

export default app => {
  const ws = new WebSocket(`wss://${window.location.host}/`);

  const send = data => ws.send(JSON.stringify(data));
  const parse = data => JSON.parse(data);

  const sessionID = localStorage.RozumSessionId || shortID();
  localStorage.RozumSessionId = sessionID;

  app.showURL('Loading...');

  ws.addEventListener('open', () => {
    // Notify we are connected
    send(['init', sessionID]);
  });

  ws.addEventListener('message', event => {
    const [cmd, ...args] = parse(event.data);
    switch (cmd) {
      case 'init-ok':
        app.showURL(`https://${window.location.host}/api/${sessionID}/`);
        break;
      case 'init-error':
        app.showURL('Cannot create session');
        break;
      case 'pose':
        let [angles] = args;
        app.updateJoints(angles);
        break;
      default:
        console.log('Unknown command received', cmd, args);
        break;
    }
  });

  ws.addEventListener('close', () => {
    // TODO: Smarter reconnect
    alert('Connection lost, reloading');
    window.location.reload();
  });
};
