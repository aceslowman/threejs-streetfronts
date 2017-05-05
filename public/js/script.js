var scene,
  camera,
  renderer,
  controls,
  clock;

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.z = 5;

  controls = new THREE.TrackballControls( camera );
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  controls.keys = [ 65, 83, 68 ];

  renderer = new THREE.WebGLRenderer({'antialias': true, 'alpha': true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );
  renderer.setClearColor( 0x000000 , 1 );

  clock = new THREE.Clock();
}

function render(){
  requestAnimationFrame( render );
  controls.update();

  renderer.render( scene, camera );
}

init();
render();
