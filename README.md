Rozum 3D
========

Proof of concept 3D robot arm simulator. Really simple for now, only supports one endpoint (`/pose`). Using THREE.js, fbx hand model, websockets for commands and simple express server to proxy robot calls to front-end side.

Try yourself:
- open https://rozum-3d.kabbi.dev
- copy your server url
- send some commands using your favorite robot controlling software or all-powerfull robot shell scripting:

```bash
curl -X PUT -H 'Content-Type: application/json' \
  -d '{"angles": [100,0,0,0,0,0]}' \
  https://rozum-3d.kabbi.dev/api/your-code/pose
```

Install locally:

```bash
git clone https://github.com/kabbi/rozum-3d
cd rozum-3d
npm install
npm run build
npm run start
open http://localhost:5467
```
