import { ArcRotateCamera, Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { GUI3DManager, HolographicButton } from "@babylonjs/gui";
import "./style/style.scss";

const renderCanvas = <HTMLCanvasElement>document.getElementById("renderCanvas");

if (renderCanvas) {
  const engine = new Engine(renderCanvas, true, {});
  const scene = new Scene(engine);

  // MeshBuilder.CreateBox("box", {size:0.1}, scene);
  // scene.createDefaultCameraOrLight(true, true, true);

  // const mainCamera = new ArcRotateCamera('maincamera', -Math.PI/2, Math.PI/2, 2, new Vector3(0,0,0), scene);
  // mainCamera.attachControl();

  const mainCamera = new FreeCamera(
    'camera',
    new Vector3(0,0,-2),
    scene,
    true
  );
  mainCamera.setTarget(Vector3.Zero());
  mainCamera.attachControl();

  var light = new HemisphericLight(
    "light1",
    new Vector3(0, 1, 0),
    scene
  );
  light.intensity = 1.0;

  const manager = new GUI3DManager(scene);
  const button = new HolographicButton('button');
  button.text = 'click';
  button.scaling = new Vector3(0.1, 0.1, 0.2);
  manager.addControl(button);

  const xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
      sessionMode: 'immersive-ar'
    }
  })

  // scene.createDefaultEnvironment();

  engine.runRenderLoop(() => {
    scene.render();
  });
}
