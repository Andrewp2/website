const size = 41;
const numRows = size;
const numCols = size;

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
  console.log(maze);
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (!maze[row][col]) {
        createCube(row, col, scene);
      }
    }
  }
  loop(scene, camera, renderer);
}

function generateMaze() {
  const maze = [];
  for (let row = 0; row < numRows; row++) {
    maze.push([]);
    for (let col = 0; col < numCols; col++) {
      maze[row].push(0);
    }
  }
  const originalPosition = { row: 1, col: 1 };
  var stack = [];
  var visited = new Set();
  stack.push(originalPosition);
  visited.add(getIndex(originalPosition, maze));
  while (stack.length !== 0) {
    const current = stack.pop();
    maze[current.row][current.col] = 1;
    const options = [];
    if (
      current.row > 1 &&
      !visited.has(getIndex({ row: current.row - 2, col: current.col }, maze))
    ) {
      options.push({ row: current.row - 2, col: current.col });
    }
    if (
      current.col > 1 &&
      !visited.has(getIndex({ row: current.row, col: current.col - 2 }, maze))
    ) {
      options.push({ row: current.row, col: current.col - 2 });
    }
    if (
      !(current.row + 2 >= maze.length) &&
      !visited.has(getIndex({ row: current.row + 2, col: current.col }, maze))
    ) {
      options.push({ row: current.row + 2, col: current.col });
    }
    if (
      !(current.col + 2 >= maze[current.row].length) &&
      !visited.has(getIndex({ row: current.row, col: current.col + 2 }, maze))
    ) {
      options.push({ row: current.row, col: current.col + 2 });
    }
    //console.log(options);
    var index = -1;
    if(options.length !== 0) {
      stack.push(current);
      index = Math.floor(Math.random() * options.length);
      const chosen = options[index];
      maze[chosen.row + ((current.row - chosen.row)/2)][chosen.col + ((current.col - chosen.col)/2)] = 1;
      visited.add(chosen.row * maze.length + chosen.col);
      stack.push({ row: chosen.row, col: chosen.col});
    }
    /*for(let i = 0; i < options.length; i++) {
      if(i !== index) {
        stack.push(options[i]);
      }
    }
    if(index !== -1) {
      stack.push(options[index]);
    }*/
  }
  return maze;
}

function getIndex(position, maze) {
  return position.row * maze.length + position.col;
}

function createCube(row, col, scene) {
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(row-(size/2), 1, col-(size/2));
  scene.add(mesh);
}

function loop(scene, camera, renderer) {
  renderer.render(scene, camera);
  window.requestAnimationFrame(function() {
    loop(scene, camera, renderer);
  });
}
