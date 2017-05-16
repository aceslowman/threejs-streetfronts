var scene,
  camera,
  renderer,
  controls,
  clock;

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.z = 25;
  camera.position.y = 10;

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

function cube(size) {
  var h = size * 0.5;
  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3( -h, -h, -h ),
    new THREE.Vector3( -h, h, -h ),
    new THREE.Vector3( -h, h, -h ),
    new THREE.Vector3( h, h, -h ),
    new THREE.Vector3( h, h, -h ),
    new THREE.Vector3( h, -h, -h ),
    new THREE.Vector3( h, -h, -h ),
    new THREE.Vector3( -h, -h, -h ),
    new THREE.Vector3( -h, -h, h ),
    new THREE.Vector3( -h, h, h ),
    new THREE.Vector3( -h, h, h ),
    new THREE.Vector3( h, h, h ),
    new THREE.Vector3( h, h, h ),
    new THREE.Vector3( h, -h, h ),
    new THREE.Vector3( h, -h, h ),
    new THREE.Vector3( -h, -h, h ),
    new THREE.Vector3( -h, -h, -h ),
    new THREE.Vector3( -h, -h, h ),
    new THREE.Vector3( -h, h, -h ),
    new THREE.Vector3( -h, h, h ),
    new THREE.Vector3( h, h, -h ),
    new THREE.Vector3( h, h, h ),
    new THREE.Vector3( h, -h, -h ),
    new THREE.Vector3( h, -h, h )
   );
  geometry.computeLineDistances();
  return geometry;
}
 
function setupColumn(min,max,x,y,z){
  var height = min+Math.random()*max;

  for(var i = 0; i < height; i++){
    var x_position = x;
    var y_position = y + (10 * (i+1));
    var model_path = null;

    if(i == 0){
      model_path = 'js/models/base_1.obj';
    }else if(i < (height-1)){
      model_path = 'js/models/window_1.obj';
    }else{
	  //eventually, replace with roof
	  model_path = 'js/models/window_1.obj';
    }

    var block = loadModel(model_path,x_position,y_position);
  }
}

function loadModel(model,x,y){

  if(model != null){
    var loader = new THREE.OBJLoader();
    loader.load(model, function(object) {

      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshNormalMaterial();
        }
      });

      object.scale.x = 5;
      object.scale.y = 5;
      object.scale.z = 5;

      object.position.x = x;
      object.position.y = y;

      console.log(object);

      scene.add(object);
      return object;
    });
  }else{
    var geometry = cube(10);
    var line_cube = new THREE.LineSegments( geometry, new THREE.LineDashedMaterial( { color: 0xffaa00, dashSize: 0.5, gapSize: 1, linewidth: 2 }) );
    line_cube.position.x = x;
    line_cube.position.y = y;

    scene.add( line_cube );
  }

}

function setupRow(){
  for(var i = -5; i < (Math.random()*10); i++){
    setupColumn(1,5,10*i,0,0);
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

init();
setupRow();
render();
