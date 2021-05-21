import {
  AbstractMesh,
  // AmmoJSPlugin,
  ArcRotateCamera,
  Color3,
  Engine,
  HemisphericLight,
  Scene,
  Vector3,
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
    // scene.enablePhysics(null, new AmmoJSPlugin());

    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2,
      1,
      Vector3.Zero(),
      scene,
      true
    );
    camera.attachControl();
    camera.minZ = 0.001;


    var light = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    light.intensity = 1.0;

    const anchor = new AbstractMesh("anchor", scene);
    anchor.scaling = new Vector3(1, 1, 1);
    anchor.position = new Vector3(0, 0, 0);

    const manager = new GUI3DManager(scene);

    const button = new HolographicButton("button");
    button.linkToTransformNode(anchor);
    manager.addControl(button);
    button.text = "Button";
    button.imageUrl = "https://www.babylonjs-playground.com/textures/icons/Settings.png";
    button.position.z = 2;
    button.scaling = new Vector3(1, 1, 2);
    button.tooltipText = "Holographic\nButton";
    button.backMaterial.albedoColor = new Color3(0.12, 0.171, 0.55);
    

    button.pointerDownAnimation = () => {
      button.scaling = new Vector3(1, 1, 1.5);
    }
    button.pointerUpAnimation = () => {
      button.scaling = new Vector3(1, 1, 2);
    }

    button.onPointerClickObservable.add(() => {
      button.text += "!";
    });

    await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: "immersive-ar",
        referenceSpaceType: "unbounded",
      },
    });

    // xr.baseExperience.featuresManager.enableFeature(
    //   WebXRFeatureName.HAND_TRACKING,
    //   "latest",
    //   {
    //     xrInput: xr.input,
    //     jointMeshes: {
    //       enablePhysics: true,
    //     },
    //   } as IWebXRHandTrackingOptions
    // );

    // scene.createDefaultEnvironment();

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });
  }
});
