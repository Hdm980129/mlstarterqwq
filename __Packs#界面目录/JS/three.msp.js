window.requestAnimFrame = (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

function MSP(para) {
	// var defaultSkin = '';
	var defaultSkin = '';
	defaultSkin = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAA2FBMVEUAAAAA1P8gHCAnrv8tKC4uKC40LTQ6NDw7OD1BuP9DP0ZD9f9D//BIOkpIREtMPlFMQ1FQSFZQS1NSTlZZS11bUGJcwv9c5P9c/+9c//Fc//JdVGRfWmNjVW1mWW5qYHJqbJtsXXRtZnB2zP926P92//J2//N2//SG6/+O7P+P1v+P7P+P/9mP//WP//ao3/+o//eo//jB//ra//zhp/jpvvrv3v3x1fzz///5Y3j57P77x/v81eH81fj+7P3+7uz+7+z++vf/M///VGr/bYH/hpf/oK3/ucOPH9fnAAAAAXRSTlMAQObYZgAAA6NJREFUWMPNlg17kzoUx7MJzS66MNYs4eqc91ontZfQsqq7zrdpT+b3/0aevNEW2tqx597HfykhgfPjn5MEIMQLlDo5EZKBShhLJCNtMYYbNiemknROE4VhGCoVMwAmO/G+8KFdgjo9SZKTU8HYVxRj2wBkm9De0RHubDwSyH3FnAME3N7e9gJ4B59uv6G+fuoBOE0SNPD5iwF8+XxvgGJWcH1jADe6fR5ckXcCcfxNoAoAMHuBgyGFaQXiBgQCIPdzovljwHBoLkVJKcHX8dCUKgRqfZeh1OVlkzJbAIEhOz9nDmEBto4eXHsAEJJlF39n2cq89D2Dc/bypTPgANLUEWHbz338syw7y55fZGdaP2vnIACOjz++Pz7eAniB9ydnz8mF1i/aAGP13VvFHn/4+PjDXwBv37ku+S40HTA7k4vOKLBkOLy5ZizX73OdA47jcIiLSZr2hLkc3KxG2EqSNDkwy5ddX4fx18jC5ZzghiUOY7Jp1iTryzpCUUrjcPowsvJFFDVuARZKbeDtC8BD9SAAOtgB+P59Dwe0CwBqNIjNhfGAwqGRB4RjgOgQIlg2wX0AEEm1DoA1gJvEAaBUGyChLGcQVVsB1sEg8oAB2JLmOS4L2/bqTVle0bIGaq50l9FdXbBlbgDSHpe0LNEEOLnLoNOFDQBKHSCWr/65qqvYOkjjKG07aOfAAWgDKI2AxpACTXmKW5TSrTmIBitd8H6RVGHngUPK5xy3lP/aAc1BQshYWVIH4HMDmPN52nGg1HoObGIDwB3rq6W47ibR3Vl5BwM6GCwTa49hNpvVdT2z+pUDM6zt44Va0YL0lyIPk/rzgQT1eiuA0v+lC/+B3Gps+gHkt5W2D5QNPmG1B82HyO+Zgyu7/dvfQY0/1JzoXrMQKlJVdVUXRQ1kQxKpB9lT1QbAoiiqqiqKJ08KAos+66Ao8E/I06e22K3wKAt1fEcIIdavEfcBYLUNEI/EwxyIP8SOPFjAwcHSAQUhWgMsxK6740M0vDP9BwHISOLLeY/51hMQAgLAfPIa9XWA78i1dybyJZWUlj264F7x0hkqm4RTC1yd0eG50ABMgAWkUZx6B3GPHET2o0DDOEVAuoyY7puDlE85n97pMZcp5T502gFsd8CnBvDjbszHPJ2GW/9wxXT7LGySOLFCB5PxhE8IGU0moxHWyQR/oxAfkoggAzgwSTywikdWGlyJU3g0EsLWsRB7OBBWsHClXwSiKchPPqaqJRcgOmMAAAAASUVORK5CYII=';
	var defaultCape = ''
	var func = {
		skinURL: defaultSkin,
		capeURL: defaultCape,
		distance: 0,
		canvasWidth: 330,
		canvasHeight: 455,
		container: []
	}
	$.extend(func, para);
	var skin = new Image();
	var cape = new Image();
	var isRotating = true;
	var isPaused = false;
	var isYfreezed = false;
	var isFunnyRunning = false;
	skin.crossOrigin = '';
	cape.crossOrigin = '';
	skin.src = func.skinURL;
	if (func.capeURL) cape.src = func.capeURL;
	var supportWebGL = !!window.WebGLRenderingContext && (!!window.document.createElement('canvas').getContext('experimental-webgl') || !!window.document.createElement('canvas').getContext('webgl'));
	var container = $(func.container);
	var cw = func.canvasWidth ,
		ch = func.canvasHeight;
	var tileUvWidth = 1 / 64;
	var tileUvHeight = 1 / 64;
	var skinBig = window.document.createElement('canvas');
	var sbc = skinBig.getContext('2d');
	var sizeRatio = 8;
	var skincanvas = window.document.createElement('canvas');
	var skinc = skincanvas.getContext('2d');
	var capecanvas = window.document.createElement('canvas');
	var capec = capecanvas.getContext('2d');
	var getMaterial = function (img, trans) {
		if (supportWebGL)
			var material = new THREE.MeshLambertMaterial({
				map: new THREE.Texture(img, new THREE.UVMapping(), THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, THREE.NearestFilter, THREE.NearestFilter, (trans ? THREE.RGBAFormat : THREE.RGBFormat)),
				transparent: trans,
				ambient: 0xFFFFFF
			});
		else
			var material = new THREE.MeshBasicMaterial({
				map: new THREE.Texture(img, new THREE.UVMapping(), THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, THREE.NearestFilter, THREE.NearestFilter, (trans ? THREE.RGBAFormat : THREE.RGBFormat)),
				transparent: trans
			});
		material.map.needsUpdate = true;
		return material;
	};
	var uvmap = function (mesh, face, x, y, w, h, rotateBy) {
		if (!rotateBy) rotateBy = 0;
		var uvs = mesh.geometry.faceVertexUvs[0][face];
		var tileU = x;
		var tileV = y;
		uvs[(0 + rotateBy) % 4].u = tileU * tileUvWidth;
		uvs[(0 + rotateBy) % 4].v = tileV * tileUvHeight;
		uvs[(1 + rotateBy) % 4].u = tileU * tileUvWidth;
		uvs[(1 + rotateBy) % 4].v = tileV * tileUvHeight + h * tileUvHeight;
		uvs[(2 + rotateBy) % 4].u = tileU * tileUvWidth + w * tileUvWidth;
		uvs[(2 + rotateBy) % 4].v = tileV * tileUvHeight + h * tileUvHeight;
		uvs[(3 + rotateBy) % 4].u = tileU * tileUvWidth + w * tileUvWidth;
		uvs[(3 + rotateBy) % 4].v = tileV * tileUvHeight;
	};
	var cubeFromPlanes = function (size, mat) {
		var cube = new THREE.Object3D();
		var meshes = [];
		for (var i = 0; i < 6; i++) {
			var mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
			mesh.doubleSided = true;
			cube.add(mesh);
			meshes.push(mesh);
		}
		// Front
		meshes[0].rotation.x = Math.PI / 2;
		meshes[0].rotation.z = -Math.PI / 2;
		meshes[0].position.x = size / 2;
		// Back
		meshes[1].rotation.x = Math.PI / 2;
		meshes[1].rotation.z = Math.PI / 2;
		meshes[1].position.x = -size / 2;
		// Top
		meshes[2].position.y = size / 2;
		// Bottom
		meshes[3].rotation.y = Math.PI;
		meshes[3].rotation.z = Math.PI;
		meshes[3].position.y = -size / 2;
		// Left
		meshes[4].rotation.x = Math.PI / 2;
		meshes[4].position.z = size / 2;
		// Right
		meshes[5].rotation.x = -Math.PI / 2;
		meshes[5].rotation.y = Math.PI;
		meshes[5].position.z = -size / 2;
		return cube;
	};
	var charMaterial = getMaterial(skincanvas, false);
	var charMaterialTrans = getMaterial(skincanvas, true);
	var capeMaterial = getMaterial(capecanvas, false);
	var camera = new THREE.PerspectiveCamera(func.distance, cw / ch, 1, 1000);
	camera.position.z = 50;
	var scene = new THREE.Scene();
	scene.add(camera);

	//Light
	var pointLightA = new THREE.DirectionalLight(0xFFFFFF, 1);
	var pointLightB = new THREE.DirectionalLight(0x666666, 1);
	var environmentalLight = new THREE.AmbientLight(0x555555);
	pointLightA.position.set(100, 120, 80);
	pointLightB.position.set(-100, -40, -80);
	scene.add(pointLightA);
	scene.add(pointLightB);
	scene.add(environmentalLight);

	var headgroup = new THREE.Object3D();
	var upperbody = new THREE.Object3D();
	// Left leg
	var leftleggeo = new THREE.CubeGeometry(4, 12, 4);
	for (var i = 0; i < 8; i += 1) {
		leftleggeo.vertices[i].y -= 6;
	}
	var leftleg = new THREE.Mesh(leftleggeo, charMaterial);
	leftleg.position.z = -2;
	leftleg.position.y = -6;
	uvmap(leftleg, 0, 8, 20, -4, 12);
	uvmap(leftleg, 1, 16, 20, -4, 12);
	uvmap(leftleg, 2, 4, 16, 4, 4, 3);
	uvmap(leftleg, 3, 8, 20, 4, -4, 1);
	uvmap(leftleg, 4, 12, 20, -4, 12);
	uvmap(leftleg, 5, 4, 20, -4, 12);
	// Right leg
	var rightleggeo = new THREE.CubeGeometry(4, 12, 4);
	for (var i = 0; i < 8; i += 1) {
		rightleggeo.vertices[i].y -= 6;
	}
	var rightleg = new THREE.Mesh(rightleggeo, charMaterial);
	rightleg.position.z = 2;
	rightleg.position.y = -6;
	uvmap(rightleg, 0, 4, 20, 4, 12);
	uvmap(rightleg, 1, 12, 20, 4, 12);
	uvmap(rightleg, 2, 8, 16, -4, 4, 3);
	uvmap(rightleg, 3, 12, 20, -4, -4, 1);
	uvmap(rightleg, 4, 0, 20, 4, 12);
	uvmap(rightleg, 5, 8, 20, 4, 12);
	// Body
	var bodygeo = new THREE.CubeGeometry(4, 12, 8);
	var bodymesh = new THREE.Mesh(bodygeo, charMaterial);
	uvmap(bodymesh, 0, 20, 20, 8, 12);
	uvmap(bodymesh, 1, 32, 20, 8, 12);
	uvmap(bodymesh, 2, 20, 16, 8, 4, 1);
	uvmap(bodymesh, 3, 28, 16, 8, 4, 3);
	uvmap(bodymesh, 4, 16, 20, 4, 12);
	uvmap(bodymesh, 5, 28, 20, 4, 12);
	upperbody.add(bodymesh);
	// Left arm
	var leftarmgeo = new THREE.CubeGeometry(4, 12, 4);
	for (var i = 0; i < 8; i += 1) {
		leftarmgeo.vertices[i].y -= 4;
	}
	var leftarm = new THREE.Mesh(leftarmgeo, charMaterial);
	leftarm.position.z = -6;
	leftarm.position.y = 4;
	leftarm.rotation.x = Math.PI / 32;
	uvmap(leftarm, 0, 48, 20, -4, 12);
	uvmap(leftarm, 1, 56, 20, -4, 12);
	uvmap(leftarm, 2, 48, 16, -4, 4, 1);
	uvmap(leftarm, 3, 52, 16, -4, 4, 3);
	uvmap(leftarm, 4, 52, 20, -4, 12);
	uvmap(leftarm, 5, 44, 20, -4, 12);
	upperbody.add(leftarm);
	// Right arm
	var rightarmgeo = new THREE.CubeGeometry(4, 12, 4);
	for (var i = 0; i < 8; i += 1) {
		rightarmgeo.vertices[i].y -= 4;
	}
	var rightarm = new THREE.Mesh(rightarmgeo, charMaterial);
	rightarm.position.z = 6;
	rightarm.position.y = 4;
	rightarm.rotation.x = -Math.PI / 32;
	uvmap(rightarm, 0, 44, 20, 4, 12);
	uvmap(rightarm, 1, 52, 20, 4, 12);
	uvmap(rightarm, 2, 44, 16, 4, 4, 1);
	uvmap(rightarm, 3, 48, 16, 4, 4, 3);
	uvmap(rightarm, 4, 40, 20, 4, 12);
	uvmap(rightarm, 5, 48, 20, 4, 12);
	upperbody.add(rightarm);
	//Head
	var headgeo = new THREE.CubeGeometry(8, 8, 8);
	var headmesh = new THREE.Mesh(headgeo, charMaterial);
	headmesh.position.y = 2;
	uvmap(headmesh, 0, 8, 8, 8, 8);
	uvmap(headmesh, 1, 24, 8, 8, 8);
	uvmap(headmesh, 2, 8, 0, 8, 8, 1);
	uvmap(headmesh, 3, 16, 0, 8, 8, 1);
	uvmap(headmesh, 4, 0, 8, 8, 8);
	uvmap(headmesh, 5, 16, 8, 8, 8);
	headgroup.add(headmesh);
	var helmet = cubeFromPlanes(9, charMaterialTrans);
	helmet.position.y = 2;
	uvmap(helmet.children[0], 0, 32 + 8, 8, 8, 8);
	uvmap(helmet.children[1], 0, 32 + 24, 8, 8, 8);
	uvmap(helmet.children[2], 0, 32 + 8, 0, 8, 8, 1);
	uvmap(helmet.children[3], 0, 32 + 16, 0, 8, 8, 1);
	uvmap(helmet.children[4], 0, 32 + 0, 8, 8, 8);
	uvmap(helmet.children[5], 0, 32 + 16, 8, 8, 8);
	headgroup.add(helmet);
	headgroup.position.y = 8;
	var capeOrigo = new THREE.Object3D();
	var capegeo = new THREE.CubeGeometry(1, 16, 10);
	var capemesh = new THREE.Mesh(capegeo, capeMaterial);
	capemesh.position.y = -8;
	capemesh.visible = false;
	// uvmap(capemesh, 0, 1, 1, 10, 16); // Front side
	uvmap(capemesh, 1, 12, 1, 10, 16); // Back side
	uvmap(capemesh, 0, 1, 1, 10, 32);// Front side
	uvmap(capemesh, 2, 1, 0, 10, 1); // Top edge
	uvmap(capemesh, 3, 11, 0, 10, 1, 1); // Bottom edge
	uvmap(capemesh, 4, 0, 1, 1, 16); // Left edge
	uvmap(capemesh, 5, 11, 1, 1, 16); // Right edge
	uvmap(capemesh, 2, 1, 0, 10, 1);
	capeOrigo.rotation.y = Math.PI;
	capeOrigo.position.x = -2;
	capeOrigo.position.y = 6;
	capeOrigo.add(capemesh);
	var playerModel = new THREE.Object3D();
	playerModel.add(leftleg);
	playerModel.add(rightleg);
	playerModel.add(upperbody);
	playerModel.add(headgroup);
	playerModel.add(capeOrigo);
	playerModel.position.y = 6;
	var playerGroup = new THREE.Object3D();
	playerGroup.add(playerModel);
	scene.add(playerGroup);
	var mouseX = 0;
	var mouseY = 0.1;
	var originMouseX = 0;
	var originMouseY = 0;
	var rad = 0;
	var isMouseOver = false;
	var isMouseDown = false;
	var counter = 0;
	var firstRender = true;
	var render = function () {
		requestAnimFrame(render, renderer.domElement);
		var oldRad = rad;
		var time = (Date.now() - startTime) / 1000;
		if (!isMouseDown) {
			if (!isYfreezed) {
				mouseY *= 0.97;
			}
			if (isRotating) {
				rad += 2;
			}
		} else {
			rad = mouseX;
		}
		if (mouseY > 500) {
			mouseY = 500;
		} else if (mouseY < -500) {
			mouseY = -500;
		}
		camera.position.x = -Math.cos(rad / (cw / 2) + (Math.PI / 0.9));
		camera.position.z = -Math.sin(rad / (cw / 2) + (Math.PI / 0.9));
		camera.position.y = (mouseY / (ch / 2)) * 1.5 + 0.2;
		camera.position.setLength(65);
		camera.lookAt(new THREE.Vector3(0, -1.5, 0));
		if (!isPaused) {
			counter += 0.01;
			headgroup.rotation.y = Math.sin(time * 1.5) / 5;
			headgroup.rotation.z = Math.sin(time) / 6;
			if (isFunnyRunning) {
				rightarm.rotation.z = 2 * Math.cos(0.6662 * time * 10 + Math.PI);
				rightarm.rotation.x = 1 * (Math.cos(0.2812 * time * 10) - 1);
				leftarm.rotation.z = 2 * Math.cos(0.6662 * time * 10);
				leftarm.rotation.x = 1 * (Math.cos(0.2312 * time * 10) + 1);
				rightleg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10);
				leftleg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10 + Math.PI);
				playerGroup.position.y = -6 + 1 * Math.cos(0.6662 * time * 10 * 2); // Jumping
				playerGroup.position.z = 0.15 * Math.cos(0.6662 * time * 10); // Dodging when running
				playerGroup.rotation.x = 0.01 * Math.cos(0.6662 * time * 10 + Math.PI); // Slightly tilting when running
				capeOrigo.rotation.z = 0.1 * Math.sin(0.6662 * time * 10 * 2) + Math.PI / 2.5;
			} else {
				leftarm.rotation.z = -Math.sin(time * 3) / 2;
				leftarm.rotation.x = (Math.cos(time * 3) + Math.PI / 2) / 30;
				rightarm.rotation.z = Math.sin(time * 3) / 2;
				rightarm.rotation.x = -(Math.cos(time * 3) + Math.PI / 2) / 30;
				leftleg.rotation.z = Math.sin(time * 3) / 3;
				rightleg.rotation.z = -Math.sin(time * 3) / 3;
				capeOrigo.rotation.z = Math.sin(time * 2) / 15 + Math.PI / 15;
				playerGroup.position.y = -6; // Not jumping
			}

		}
		if (typeof wia === "undefined")
			wia = 0;
		renderer.clear();
		renderer.render(scene, camera);
	};
	if (supportWebGL) {
		var renderer = new THREE.WebGLRenderer({
			antialias: true,
			preserveDrawingBuffer: true
		});
	} else {
		var renderer = new THREE.CanvasRenderer({
			antialias: true,
			preserveDrawingBuffer: true
		});
	}
	var threecanvas = renderer.domElement;
	renderer.setSize(cw, ch);
	container.append(threecanvas);
	var onMouseMove = function (e) {
		if (isMouseDown) {
			mouseX = (e.pageX - threecanvas.offsetLeft - originMouseX);
			mouseY = (e.pageY - threecanvas.offsetTop - originMouseY);
		}
	};
	threecanvas.addEventListener('mousedown', function (e) {
		e.preventDefault();
		if (e.which != 1) return false;
		originMouseX = (e.pageX - threecanvas.offsetLeft) - rad;
		originMouseY = (e.pageY - threecanvas.offsetTop) - mouseY;
		isMouseDown = true;
		isMouseOver = true;
		onMouseMove(e);
	}, false);
	window.addEventListener('mouseup', function (e) {
		isMouseDown = false;
	}, false);
	window.addEventListener('mousemove', onMouseMove, false);
	threecanvas.addEventListener('mouseout', function (e) {
		isMouseOver = false;
	}, false);
	var startTime = Date.now(),
		pausedTime = 0;
	render();
	skin.onload = function () {
		skincanvas.width = skin.width;
		skincanvas.height = skin.height;
		skinc.clearRect(0, 0, 64, 32);
		skinc.drawImage(skin, 0, 0);
		var imgdata = skinc.getImageData(0, 0, 64, 32);
		var pixels = imgdata.data;
		sbc.clearRect(0, 0, skin.width * sizeRatio, skin.height * sizeRatio);
		sbc.save();
		var isOnecolor = true;
		var colorCheckAgainst = [40, 0];
		var colorIndex = (colorCheckAgainst[0] + colorCheckAgainst[1] * 64) * 4;
		var isPixelDifferent = function (x, y) {
			if (pixels[(x + y * 64) * 4 + 0] !== pixels[colorIndex + 0] || pixels[(x + y * 64) * 4 + 1] !== pixels[colorIndex + 1] || pixels[(x + y * 64) * 4 + 2] !== pixels[colorIndex + 2] || pixels[(x + y * 64) * 4 + 3] !== pixels[colorIndex + 3]) {
				return true;
			}
			return false;
		};
		for (var i = 32; i < 64; i += 1) {
			for (var j = 8; j < 16; j += 1) {
				if (isPixelDifferent(i, j)) {
					isOnecolor = false;
					break;
				}
			}
			if (!isOnecolor) {
				break;
			}
		}
		if (!isOnecolor) {
			for (var i = 40; i < 56; i += 1) {
				for (var j = 0; j < 8; j += 1) {
					if (isPixelDifferent(i, j)) {
						isOnecolor = false;
						break;
					}
				}
				if (!isOnecolor) {
					break;
				}

			}
		}
		for (var i = 0; i < 64; i += 1) {
			for (var j = 0; j < 32; j += 1) {

				if (isOnecolor && ((i >= 32 && i < 64 && j >= 8 && j < 16) || (i >= 40 && i < 56 && j >= 0 && j < 8))) {
					pixels[(i + j * 64) * 4 + 3] = 0;
				}
				sbc.fillStyle = 'rgba(' + pixels[(i + j * 64) * 4 + 0] + ', ' + pixels[(i + j * 64) * 4 + 1] + ', ' + pixels[(i + j * 64) * 4 + 2] + ', ' + pixels[(i + j * 64) * 4 + 3] / 255 + ')';
				sbc.fillRect(i * sizeRatio, j * sizeRatio, sizeRatio, sizeRatio);
			}
		}
		sbc.restore();
		skinc.putImageData(imgdata, 0, 0);
		charMaterial.map.needsUpdate = true;
		charMaterialTrans.map.needsUpdate = true;
	};
	skin.onerror = function () {
		skin.src = defaultSkin;
	}
	cape.onload = function () {
		capecanvas.width = cape.width;
		capecanvas.height = cape.height;
		capec.clearRect(0, 0, 64, 32);
		capec.drawImage(cape, 0, 0);
		capemesh.visible = true;
		capeMaterial.map.needsUpdate = true;
	};
	cape.onerror = function () {
		capemesh.visible = false;
	};
	threecanvas.addEventListener('dragenter', function (e) {
		e.stopPropagation();
		e.preventDefault();
		threecanvas.className = "dragenter";
	}, false);
	threecanvas.addEventListener('dragleave', function (e) {
		e.stopPropagation();
		e.preventDefault();
		threecanvas.className = "";
	}, false);
	threecanvas.addEventListener('dragover', function (e) {
		e.stopPropagation();
		e.preventDefault();
	}, false);
	this.setPara = function (data) {
		if (data) {
			if (typeof data.skinURL !== 'undefined' && data.skinURL != skin.src) skin.src = data.skinURL;
			if (typeof data.capeURL !== 'undefined' && data.capeURL != cape.src) cape.src = data.capeURL;
			if (typeof data.isShowingCape !== 'undefined' && data.isShowingCape != capemesh.visible) capemesh.visible = data.isShowingCape;
			if (typeof data.isRotating !== 'undefined' && data.isRotating != isRotating) isRotating = data.isRotating;
			if (typeof data.isPaused !== 'undefined' && data.isPaused != isPaused) {
				isPaused = data.isPaused;
				if (isPaused) pausedTime = Date.now() - startTime;
				else startTime = Date.now() - pausedTime;
			}
			if (typeof data.isYfreezed !== 'undefined' && data.isYfreezed != isYfreezed) isYfreezed = data.isYfreezed;
			if (typeof data.isRunning !== 'undefined' && data.isRunning != isFunnyRunning) isFunnyRunning = data.isRunning;
		}
		return {
			skinURL: skin.src,
			capeURL: cape.src,
			isShowingCape: capemesh.visible,
			isRotating: isRotating,
			isPaused: isPaused,
			isYfreezed: isYfreezed,
			isRunning: isFunnyRunning
		}
	}
	this.resetPos = function () {
		rad = 0;
		mouseY = 0;
		return this;
	}
	this.shot = function () {
		return renderer.domElement.toDataURL("image/png");
	}
	return this;
}