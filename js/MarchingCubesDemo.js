const chunkGridSize = 1;
const chunkGridSize2 = chunkGridSize * chunkGridSize;
const resolution = 50;

function main() {
  var scene = new THREE.Scene();
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
    10000
  );
  camera.position.set(2000, 2000 * chunkGridSize, 2000);
  camera.lookAt(0, 0, 0);
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0.5, 0.5, 1);
  light.position.normalize();
  scene.add(light);
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(400, 500, 200);
  scene.add(pointLight);
  const ambientLight = new THREE.AmbientLight(0x080808);
  scene.add(ambientLight);

  let heightMap = generateHeight(
    resolution * chunkGridSize,
    resolution * chunkGridSize
  );
  var chunks = [];

  const chunkScale = 2000;

  for (let i = -chunkGridSize / 2 + 0.5; i < chunkGridSize / 2; i++) {
    for (let j = -chunkGridSize / 2 + 0.5; j < chunkGridSize / 2; j++) {
      chunkMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x111111,
        shininess: 2,
        vertexColors: THREE.VertexColors
      });
      const chunk = new THREE.MarchingCubes(resolution, chunkMaterial, false, true);
      chunk.position.set(
        chunkScale * (i * 2) * ((resolution - 3) / resolution),
        0,
        chunkScale * j * 2 * ((resolution - 3) / resolution)
      );
      chunk.scale.set(chunkScale, chunkScale, chunkScale);
      chunks.push(chunk);
      scene.add(chunk);
    }
  }

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  //controls.update();
  loop(chunks, heightMap, scene, camera, renderer);
}

function loop(chunks, heightMap, scene, camera, renderer) {
  for (let m = 0; m < chunks.length; m++) {
    chunks[m].init(resolution);
  }
  updateCubes(chunks, heightMap);
  renderer.render(scene, camera);
  window.requestAnimationFrame( function() {
    loop(chunks, heightMap, scene, camera, renderer); 
  });
}

//function from:
//https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_terrain.html
function generateHeight(width, height) {
  const size = width * height;
  data = new Uint8Array(size);
  perlin = new THREE.ImprovedNoise();
  quality = 1;
  z = Math.random() * 100;
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < size; i++) {
      let x = i % width,
        y = ~~(i / width);
      data[i] += Math.abs(
        perlin.noise(x / quality, y / quality, z) * quality * 1.75
      );
    }
    quality *= 5;
  }
  return data;
}

function updateCubes(chunks, heightMap) {
  const waterHeight = 8;
  //sea level, water level, swamp level, plains level, peak level, sky
  const heights = [
    0,
    resolution * (8 / 50),
    resolution * (12 / 50),
    resolution * (12 / 50),
    resolution * (22 / 50),
    resolution * (28 / 50),
    resolution
  ];
  //bottom of ocean, top of water, top of swamp, top of
  const colors = [
    new THREE.Color(0, 0, 0.1),
    new THREE.Color(0, 0, 0.5),
    new THREE.Color(0.8, 0.8, 0.1),
    new THREE.Color(0.2, 0.5, 0.1),
    new THREE.Color(0.2, 0.5, 0.1),
    new THREE.Color(0.7, 0.7, 0.7),
    new THREE.Color(1, 1, 1)
  ];

  heightColors = [];
  for (y = 0; y < resolution; y++) {
    heightColors.push(getInterpolatedColor(y, heights, colors));
  }

  const terraceHeight = 2;

  for (let m = 0; m < chunks.length; m++) {
    var chunk = chunks[m];
    chunk.reset();
    const chunkCoords = turnIndexToCoords(m, chunkGridSize);
    for (let x = 0; x < resolution; x++) {
      for (let z = 0; z < resolution; z++) {
        for (let y = 0; y < waterHeight; y++) {
          chunk.setCell(x, y, z, 100);
          const index = getIndex(chunk, x, y, z);
          setColor(chunk, heightColors[y], index);
        }
        let val = chunkCoords.x * resolution;
        val += x;
        val += resolution * chunkGridSize * z;
        val += resolution * resolution * chunkGridSize * chunkCoords.z;
        let height = heightMap[val] * 0.25;
        //uncomment to make mountain into terrace
        //height -= height % terraceHeight
        for (let y = waterHeight; y < height; y++) {
          chunk.setCell(x, y, z, 100);
          const index = getIndex(chunk, x, y, z);
          setColor(chunk, heightColors[y], index);
        }
      }
    }
  }
}

function turnCoordsToIndex(x, z, N) {
  return x * N + z;
}

function turnIndexToCoords(m, N) {
  const indexX = Math.floor(m / N);
  const indexZ = m % N;
  return { x: indexX, z: indexZ };
}

function getInterpolatedColor(y, heights, colors) {
  let m = 0;
  while (heights[m] <= y) {
    m++;
  }

  return interpolateColors(
    colors[m - 1],
    colors[m],
    y,
    heights[m - 1],
    heights[m]
  );
}

function interpolateColors(colorOne, c2, val, lower, upper) {
  const p = (val - lower) / (upper - lower); //1 is 100% upper, 0 is 0% upper and 100% lower
  return new THREE.Color(
    p * c2.r + (1 - p) * colorOne.r,
    p * c2.g + (1 - p) * colorOne.g,
    p * c2.b + (1 - p) * colorOne.b
  );
}

function getIndex(object, x, y, z) {
  return object.size2 * z + object.size * y + x;
}

function setColor(effect, color, index) {
  effect.palette[index * 3] = color.r;
  effect.palette[index * 3 + 1] = color.g;
  effect.palette[index * 3 + 2] = color.b;
}
