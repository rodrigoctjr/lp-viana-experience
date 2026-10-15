import * as T from "three";

export function mountPendulum(canvas: HTMLCanvasElement) {
  const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(38, 1, .1, 80);
  camera.position.set(7.5, 5.3, 12);
  camera.lookAt(-.5, 1.4, 0);
  scene.add(new T.HemisphereLight(0xfff6df, 0x527368, 2.5));
  const sun = new T.DirectionalLight(0xffe5b4, 3.4);
  sun.position.set(-3, 9, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9 });
  sun.shadow.bias = -.001;
  scene.add(sun);
  const fill = new T.DirectionalLight(0xd5efff, 1.3);
  fill.position.set(5, 3, -4); scene.add(fill);
  const material = (color: number, roughness = .7) => new T.MeshStandardMaterial({ color, roughness });
  const skin = material(0xc67a4c), shirt = material(0x087e76), pants = material(0x164459);
  const helmet = material(0xffc74f, .4), harness = material(0xf06f47), wood = material(0x9d6848);
  const dark = material(0x152f36), white = material(0xfff6df), metal = material(0x9baba8, .3);
  const geometry = {
    sphere: new T.SphereGeometry(1, 24, 16),
    box: new T.BoxGeometry(1, 1, 1),
    limb: new T.CapsuleGeometry(.115, .34, 6, 12),
  };
  function mesh(parent: T.Object3D, shape: T.BufferGeometry, mat: T.Material, x: number, y: number, z: number, sx = 1, sy = sx, sz = sx) {
    const object = new T.Mesh(shape, mat);
    object.position.set(x, y, z); object.scale.set(sx, sy, sz);
    object.castShadow = true; object.receiveShadow = true;
    parent.add(object); return object;
  }
  const ground = mesh(scene, new T.CylinderGeometry(1, 1, .3, 64), material(0x3aada4, .35), -.3, -1.9, 0, 6.6, 1, 3.1);
  ground.receiveShadow = true;
  const bank = mesh(scene, new T.CylinderGeometry(1, 1, .55, 48), material(0x8aa572), -4.3, -1.65, -.8, 2.1, 1, 2.5);
  bank.rotation.z = -.04;
  for (let i = 0; i < 9; i++) mesh(scene, geometry.box, wood, -5 + i * .23, .66, 0, .21, .14, 1.8);
  mesh(scene, geometry.box, wood, -4.2, -.4, -.65, .18, 2.2, .18);
  mesh(scene, geometry.box, wood, -4.2, -.4, .65, .18, 2.2, .18);
  mesh(scene, geometry.box, dark, -4.6, 2.75, -.65, .15, 4.1, .15);
  mesh(scene, geometry.box, dark, -2.25, 4.8, -.1, 4.85, .14, .16);
  const brace = mesh(scene, geometry.box, dark, -4, 3.9, -.4, .12, 2.1, .12); brace.rotation.z = -.6;
  const anchor = new T.Vector3(0, 4.8, -.1);
  mesh(scene, new T.TorusGeometry(.12, .035, 8, 20), metal, 0, 4.76, -.1);
  for (const [x, z, size] of [[-4.8, -2, .9], [-3.1, -2.2, 1.2], [2.5, -2, 1.3], [4.1, -.9, .85]]) {
    mesh(scene, new T.CylinderGeometry(.08, .13, 1.5, 10), wood, x, -1, z);
    for (let j = 0; j < 3; j++) mesh(scene, geometry.sphere, material([0x326650, 0x4a8060, 0x65976d][j]), x + (j - 1) * .35, -.2 + j * .35, z, size * .7, size * .85, size * .65);
  }
  for (const [x, z, s] of [[2.6, 1.4, .5], [3.9, .8, .7], [-1.3, -2.3, .5]]) mesh(scene, new T.DodecahedronGeometry(1, 1), material(0x9bada2), x, -1.6, z, s, s * .55, s * .8);
  const ripples: T.Mesh[] = [];
  const rippleMat = new T.MeshStandardMaterial({ color: 0xbde9d2, transparent: true, opacity: .55, roughness: .4 });
  for (let i = 0; i < 3; i++) {
    const ring = mesh(scene, new T.TorusGeometry(.5 + i * .38, .015, 5, 48), rippleMat, .5, -1.73 + i * .005, .5);
    ring.rotation.x = -Math.PI / 2; ripples.push(ring);
  }

  // Hierarchical joint rig: shoulders, elbows, hips and knees animate independently.
  const character = new T.Group(); character.name = "viana-adventurer"; character.scale.setScalar(.85); scene.add(character);
  mesh(character, geometry.sphere, shirt, 0, .5, 0, .38, .55, .24);
  mesh(character, geometry.sphere, pants, 0, -.06, 0, .35, .23, .24);
  mesh(character, geometry.sphere, skin, 0, 1.32, 0, .36, .41, .34);
  mesh(character, geometry.sphere, skin, 0, 1.27, .34, .085, .09, .1);
  for (const side of [-1, 1]) {
    mesh(character, geometry.sphere, skin, side * .35, 1.31, 0, .09, .12, .07);
    mesh(character, geometry.sphere, white, side * .135, 1.39, .29, .09, .1, .05);
    mesh(character, geometry.sphere, dark, side * .12, 1.39, .335, .042, .055, .025);
    const eyebrow = mesh(character, geometry.box, dark, side * .135, 1.53, .29, .14, .03, .04); eyebrow.rotation.z = side * -.1;
    const strap = mesh(character, geometry.box, harness, side * .24, .45, .225, .065, .95, .045); strap.rotation.z = side * -.18;
  }
  const smile = new T.CatmullRomCurve3([new T.Vector3(-.12, 1.16, .3), new T.Vector3(0, 1.11, .34), new T.Vector3(.12, 1.16, .3)]);
  mesh(character, new T.TubeGeometry(smile, 12, .018, 6, false), dark, 0, 0, 0);
  mesh(character, new T.SphereGeometry(.405, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), helmet, 0, 1.43, 0);
  mesh(character, new T.CylinderGeometry(.41, .41, .065, 32), helmet, 0, 1.43, 0);
  for (const x of [-.14, 0, .14]) mesh(character, geometry.box, dark, x, 1.81, .03, .055, .025, .2);
  const belt = mesh(character, new T.TorusGeometry(.34, .05, 8, 24), harness, 0, .03, 0); belt.rotation.x = Math.PI / 2;
  mesh(character, new T.TorusGeometry(.085, .025, 8, 16), metal, 0, .04, .29);
  const shoulders: T.Group[] = [], elbows: T.Group[] = [], hips: T.Group[] = [], knees: T.Group[] = [];
  for (const side of [-1, 1]) {
    const shoulder = new T.Group(); shoulder.position.set(side * .39, .83, 0); character.add(shoulder); shoulders.push(shoulder);
    mesh(shoulder, geometry.limb, shirt, 0, -.27, 0);
    const elbow = new T.Group(); elbow.position.y = -.54; shoulder.add(elbow); elbows.push(elbow);
    mesh(elbow, geometry.limb, skin, 0, -.23, 0, .85, .85, .85);
    mesh(elbow, geometry.sphere, skin, 0, -.48, 0, .13, .15, .12);
    const hip = new T.Group(); hip.position.set(side * .2, -.14, 0); character.add(hip); hips.push(hip);
    mesh(hip, geometry.limb, pants, 0, -.28, 0, 1.22, 1.08, 1.22);
    const knee = new T.Group(); knee.position.y = -.57; hip.add(knee); knees.push(knee);
    mesh(knee, geometry.limb, skin, 0, -.25, 0, .9, .93, .9);
    mesh(knee, geometry.sphere, white, 0, -.54, .075, .15, .12, .25);
    mesh(knee, geometry.box, dark, 0, -.62, .075, .29, .045, .43);
  }
  const rope = mesh(scene, new T.CylinderGeometry(.025, .025, 1, 8), material(0xe8c785), 0, 0, 0);
  const attachment = new T.Vector3(), ropeDirection = new T.Vector3(), up = new T.Vector3(0, 1, 0);
  let target = 0, current = 0, active = true, disposed = false, frame = 0;
  function pose(progress: number) {
    const flight = Math.max(0, (progress - .12) / .88);
    const angle = -.82 * Math.cos(flight * Math.PI * 1.6) * (1 - .45 * flight);
    character.position.set(Math.sin(angle) * 4.2, 4.8 - Math.cos(angle) * 4.2, 0);
    character.rotation.set(Math.sin(flight * Math.PI) * .13, .15 + flight * .3, -angle * .3);
    const energy = Math.sin(Math.min(1, flight * 2) * Math.PI / 2);
    shoulders.forEach((joint, i) => { joint.rotation.z = (i ? 1 : -1) * (.15 + energy * 1.8); joint.rotation.x = -.2 - energy * .3; });
    elbows.forEach((joint, i) => { joint.rotation.x = -.2 - energy * (.35 + i * .12); });
    hips.forEach((joint, i) => { joint.rotation.x = .12 + Math.sin(flight * Math.PI * 2 + i * .7) * .23; });
    knees.forEach((joint, i) => { joint.rotation.x = -.12 - energy * (.35 + i * .18); });
    character.updateMatrixWorld(true);
    attachment.set(0, .04, .29).applyMatrix4(character.matrixWorld);
    ropeDirection.subVectors(attachment, anchor);
    rope.position.copy(anchor).add(attachment).multiplyScalar(.5);
    rope.scale.y = ropeDirection.length(); rope.quaternion.setFromUnitVectors(up, ropeDirection.normalize());
    ripples.forEach((ring, i) => ring.scale.setScalar(1 + Math.sin(progress * Math.PI + i) * .12));
    canvas.dataset.progress = progress.toFixed(3);
    renderer.render(scene, camera);
  }
  function render() {
    frame = 0;
    if (disposed || !active) return;
    current += (target - current) * .16;
    if (Math.abs(target - current) < .001) current = target;
    pose(current);
    if (current !== target) frame = requestAnimationFrame(render);
  }
  function schedule() { if (!frame && active && !disposed) frame = requestAnimationFrame(render); }
  const resize = new ResizeObserver(() => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); schedule();
  });
  resize.observe(canvas);
  pose(0);
  return {
    setProgress(value: number, immediate = false) { const next = Math.max(0, Math.min(1, value)); if (next === target && current === target) return; target = next; if (immediate) current = target; schedule(); },
    setActive(value: boolean) { active = value; if (active) schedule(); else { cancelAnimationFrame(frame); frame = 0; } },
    dispose() {
      disposed = true; cancelAnimationFrame(frame); resize.disconnect();
      const geometries = new Set<T.BufferGeometry>(), materials = new Set<T.Material>();
      scene.traverse(object => { if (object instanceof T.Mesh) { geometries.add(object.geometry); for (const mat of Array.isArray(object.material) ? object.material : [object.material]) materials.add(mat); } });
      geometries.forEach(item => item.dispose()); materials.forEach(item => item.dispose());
      renderer.dispose(); renderer.forceContextLoss();
    },
  };
}
