const numRows = 20;
const numCols = 20;

function main() {
  const scene = new THREE.Scene();
  const ourCanvas = document.getElementById("theCanvas");

  const renderer = new THREE.WebGLRenderer({ canvas: ourCanvas });
  renderer.setClearColor(0x003333);
  renderer.setSize(ourCanvas.clientWidth, ourCanvas.clientHeight);
  renderer.gammaOutput = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    75,
    ourCanvas.clientWidth / ourCanvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(20, 20, 20);
  camera.lookAt(0, 0, 0);
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0.5, 0.5, 1);
  light.position.normalize();
  scene.add(light);
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(40, 50, 20);
  scene.add(pointLight);
  const ambientLight = new THREE.AmbientLight(0x080808);
  scene.add(ambientLight);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  const maze = generateMaze();
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === 1) {
        createCube(row, col, scene);
      }
    }
  }
  loop(scene, camera, renderer);
}

function generateMaze() {
  const maze = [];
  for(let row = 0; row < numRows; row++) {
    maze.push([]);
    for(let col = 0; col < numCols; col++) {
      maze[row].push(0);
    }
  }
  const currentPos = {x:0, y:0};
  var stack = [];
  return maze;
}

function createCube(row, col, scene) {}

function loop(scene, camera, renderer) {
  renderer.render(scene, camera);
  window.requestAnimationFrame(function() {
    loop(scene, camera, renderer);
  });
}
