/**
 * @author zz85 / https://github.com/zz85
 * @author mrdoob / http://mrdoob.com
 * Running this will allow you to drag three.js objects around the screen.
 */

THREE.HoverControls = function ( _objects, _camera, _domElement ) {

	var _plane = new THREE.Plane();
	var _raycaster = new THREE.Raycaster();
    _raycaster.params.Line.threshold = 5

	var _mouse = new THREE.Vector2();
	var _offset = new THREE.Vector3();
	var _intersection = new THREE.Vector3();
	var _worldPosition = new THREE.Vector3();
	var _inverseMatrix = new THREE.Matrix4();
	var _intersections = [];

	var _selected = null, _hovered = null;

	//

	var scope = this;

	function activate() {

		_domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );

	}

	function deactivate() {

		_domElement.removeEventListener( 'mousemove', onDocumentMouseMove, false );

	}

	function dispose() {

		deactivate();

	}

	function getObjects() {

		return _objects;

	}

	function onDocumentMouseMove( event ) {

		event.preventDefault();

		var rect = _domElement.getBoundingClientRect();

		_mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
		_mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

		_raycaster.setFromCamera( _mouse, _camera );

		if ( _selected && scope.enabled ) {

			if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {

				_selected.position.copy( _intersection.sub( _offset ).applyMatrix4( _inverseMatrix ) );

			}

			scope.dispatchEvent( { type: 'drag', object: _selected } );

			return;

		}

		_intersections.length = 0;

		_raycaster.setFromCamera( _mouse, _camera );
		_raycaster.intersectObjects( _objects, true, _intersections );

		if ( _intersections.length > 0 ) {

			var object = _intersections[ 0 ].object;
//console.log('hover - index', _intersections[0].index)
//console.log('hover - object, intersections', object, _intersections)
//console.log('hover - type, __globeObjType', object.type, object.__globeObjType)
//console.log('hover - any', object, _intersections)

for (var i=0;i<_intersections.length;i++){
    var int=_intersections[i]
    var obj=int.object
    var geo=obj.geometry
    var gty=geo.type
    //if (gty!='Geometry' && gty!='SphereGeometry')
    //if (obj.__globeObjType=='path')
        console.log(gty, obj.__globeObjType, obj.type)
}


if (object.__globeObjType == "pointq") {
    _domElement.style.cursor = 'pointer'
    //console.log('hover - pole', object, _intersections)
}
if (object.__globeObjType == "path") {
    _domElement.style.cursor = 'pointer'
    console.log('hover - path', object, _intersections)
}
if (object.type == "Line2") {
    _domElement.style.cursor = 'pointer'
    console.log('hover - path', object, _intersections)
}
if (object.type == "LineSegmentsq") {
    _domElement.style.cursor = 'pointer'
    //console.log('hover - line', object, _intersections)
}

			_plane.setFromNormalAndCoplanarPoint( _camera.getWorldDirection( _plane.normal ), _worldPosition.setFromMatrixPosition( object.matrixWorld ) );

			if ( _hovered !== object ) {

				scope.dispatchEvent( { type: 'hoveron', object: object } );

				//_domElement.style.cursor = 'pointer';
				_domElement.style.cursor = 'auto';
				_hovered = object;

			}

		} else {

			if ( _hovered !== null ) {

				scope.dispatchEvent( { type: 'hoveroff', object: _hovered } );

				_domElement.style.cursor = 'auto';
				_hovered = null;

			}

		}

	}






	activate();

	// API

	this.enabled = true;
	this.transformGroup = false;

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;
	this.getObjects = getObjects;

};

THREE.HoverControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.HoverControls.prototype.constructor = THREE.HoverControls;
