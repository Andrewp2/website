const size = 21;
const numRows = size;
const numCols = size;
var maze;
var walls;
var player;
var playerPosition = {x: 0, z: 1};
let scene;

function main() {
  scene = new THREE.Scene();
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
  camera.position.set(0, 30, 0);
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

  //const controls = new THREE.OrbitControls(camera, renderer.domElement);

  regenerateMaze();
  const floorGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const floorMaterial = new THREE.MeshPhongMaterial({
    color: 0x111111,
    emissive: 0x000000,
    specular: 0x333333,
    shininess: 30
  });
  const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.scale.set(maze.length, 1, maze[0].length);
  floorMesh.position.set(0, 0, 0);
  scene.add(floorMesh);

  const playerGeometry = new THREE.SphereBufferGeometry(0.5, 32, 32);
  const playerMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    emissive: 0x000000,
    specular: 0x333333,
    shininess: 30
  });
  player = new THREE.Mesh(playerGeometry, playerMaterial);
  player.position.set(0 - size / 2 + 0.5, 1, 1 - size / 2 + 0.5);
  scene.add(player);

  document.addEventListener("keydown", onDocumentKeyDown, false);
  loop(scene, camera, renderer);
}

function onDocumentKeyDown(event) {
  const keyCode = event.which;
  if (keyCode === 87 || keyCode === 38) {
    if(maze[playerPosition.x][playerPosition.z-1]) {
      playerPosition.z -= 1;
      player.position.z -= 1;
    }
  } else if (keyCode === 83 || keyCode === 40) {
    if(maze[playerPosition.x][playerPosition.z+1]) {
      playerPosition.z += 1;
      player.position.z += 1;
    }
  } else if (keyCode === 65 || keyCode === 37) {
    if(maze[playerPosition.x-1][playerPosition.z]) {
      playerPosition.x -= 1;
      player.position.x -= 1;
    }
  } else if (keyCode === 68 || keyCode === 39) {
    if(maze[playerPosition.x+1][playerPosition.z]) {
      playerPosition.x += 1;
      player.position.x += 1;
    }
  }
  if(playerPosition.x === maze.length-1 && playerPosition.z === maze[0].length-2) {
    alert("You win!");
  }
}

function loop(scene, camera, renderer) {
  renderer.render(scene, camera);
  window.requestAnimationFrame(function() {
    loop(scene, camera, renderer);
  });
}

function regenerateMaze() {
  if (walls) {
    for (let i = 0; i < walls.length; i++) {
      scene.remove(walls[i]);
      walls[i].geometry.dispose();
      walls[i].material.dispose();
      walls[i] = undefined;
    }
  }
  walls = [];
  maze = generateMaze();
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (!maze[row][col]) {
        walls.push(createCube(row, col, scene));
      }
    }
  }
}

function reset() {
  regenerateMaze();
  playerPosition = {x: 0, z:1};
  player.position.set(0 - size / 2 + 0.5, 1, 1 - size / 2 + 0.5);
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
    var index = -1;
    if (options.length !== 0) {
      stack.push(current);
      index = Math.floor(Math.random() * options.length);
      const chosen = options[index];
      maze[chosen.row + (current.row - chosen.row) / 2][
        chosen.col + (current.col - chosen.col) / 2
      ] = 1;
      visited.add(chosen.row * maze.length + chosen.col);
      stack.push({ row: chosen.row, col: chosen.col });
    }
  }
  maze[0][1] = 1;
  maze[maze.length - 1][maze[0].length - 2] = 1;
  return maze;
}

function getIndex(position, maze) {
  return position.row * maze.length + position.col;
}

function createCube(row, col, scene) {
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x777777,
    emissive: 0x000000,
    specular: 0x333333,
    shininess: 30
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(row - size / 2 + 0.5, 1, col - size / 2 + 0.5);
  scene.add(mesh);
  return mesh;
}
