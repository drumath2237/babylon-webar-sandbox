import {
  AbstractMesh,
  ArcRotateCamera,
  DeviceOrientationCamera,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
  WebXRSessionManager,
} from "@babylonjs/core";
import { GUI3DManager, HolographicButton } from "@babylonjs/gui";
import "./style/style.scss";

window.addEventListener("DOMContentLoaded", async () => {
  const renderCanvas = <HTMLCanvasElement>(
    document.getElementById("renderCanvas")
  );

  if (renderCanvas) {
    const engine = new Engine(renderCanvas, true, {});
    const scene = new Scene(engine);

    // MeshBuilder.CreateBox("box", { size: 0.1 }, scene);
    const mainCamera = new DeviceOrientationCamera(
      'deviceCamera',
      new Vector3(0, 0, -5),
      scene,
    );
    mainCamera.setTarget(Vector3.Zero());
    mainCamera.attachControl();

    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 1.0;

    const anchor = new AbstractMesh('anchor', scene);
    anchor.scaling = new Vector3(0.1,0.1,0.1);

    const manager = new GUI3DManager(scene);

    const button = new HolographicButton('button');
    manager.addControl(button);

    button.linkToTransformNode(anchor);
    button.text = 'click';
    button.scaling = new Vector3(1, 1, 2);

    const xr = await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: "immersive-ar",
        referenceSpaceType: "unbounded",
      },
      optionalFeatures: true,
    });

    console.log(
      await WebXRSessionManager.IsSessionSupportedAsync("immersive-ar")
    );

    // scene.createDefaultEnvironment();

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", (e) => {
      engine.resize();
    });
  }
});
