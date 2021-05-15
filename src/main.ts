import {
  AbstractMesh,
  AmmoJSPlugin,
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  IWebXRHandTrackingOptions,
  Scene,
  Vector3,
  WebXRFeatureName,
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

    // await Ammo();
    scene.enablePhysics(null, new AmmoJSPlugin());

    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene,
      true
    );
    camera.attachControl();

    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 1.0;

    const anchor = new AbstractMesh("anchor", scene);
    anchor.scaling = new Vector3(0.1, 0.1, 0.1);

    const manager = new GUI3DManager(scene);

    const button = new HolographicButton("button");
    manager.addControl(button);

    button.linkToTransformNode(anchor);
    button.text = "button";
    button.position.z = 2;
    button.scaling = new Vector3(1, 1, 2);

    button.onPointerClickObservable.add(() => {
      button.text += "!";
    });

    const xr = await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: "immersive-ar",
        referenceSpaceType: "unbounded",
      },
    });

    xr.baseExperience.featuresManager.enableFeature(
      WebXRFeatureName.HAND_TRACKING,
      "latest",
      {
        xrInput: xr.input,
        jointMeshes: {
          enablePhysics: true,
        },
      } as IWebXRHandTrackingOptions
    );

    // scene.createDefaultEnvironment();

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });
  }
});
