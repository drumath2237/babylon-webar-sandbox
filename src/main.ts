import {
  AbstractMesh,
  ArcRotateCamera,
  CannonJSPlugin,
  Color3,
  Engine,
  HemisphericLight,
  IWebXRHandTrackingOptions,
  Mesh,
  PhysicsImpostor,
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

    scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin());

    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2,
      0.5,
      Vector3.Zero(),
      scene,
      true
    );
    camera.attachControl();
    camera.minZ = 0.001;

    var light = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    light.intensity = 1.0;

    // 3d button settings

    const anchor = new AbstractMesh("anchor", scene);
    anchor.scaling = new Vector3(2, 2, 2);
    anchor.position = new Vector3(0, 0, 0);

    const manager = new GUI3DManager(scene);

    const button = new HolographicButton("button");
    button.linkToTransformNode(anchor);
    manager.addControl(button);
    button.text = "Button";
    button.imageUrl =
      "https://www.babylonjs-playground.com/textures/icons/Settings.png";
    button.position = new Vector3(0, 0, 1);
    button.scaling = new Vector3(0.15, 0.15, 0.3);
    button.tooltipText = "Holographic\nButton";
    button.backMaterial.albedoColor = new Color3(0.12, 0.171, 0.55);

    button.pointerDownAnimation = () => {
      button.scaling = new Vector3(0.15, 0.15, 0.15);
    };
    button.pointerUpAnimation = () => {
      button.scaling = new Vector3(0.15, 0.15, 0.3);
    };

    button.onPointerClickObservable.add(() => {
      button.text += "!";
    });

    // physics object settings

    const ground = Mesh.CreateGround("ground", 1, 1, 2, scene);
    ground.position = new Vector3(0, -0.5, 1);
    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      {
        mass: 0,
        friction: 0.7,
        restitution: 0.7,
      }
    );

    button.onPointerDownObservable.add(() => {
      const physicsCube = Mesh.CreateBox("physicsCube", 0.1, scene);
      physicsCube.position = new Vector3(0, 0.5, 1);
      physicsCube.rotation = new Vector3(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      physicsCube.physicsImpostor = new PhysicsImpostor(
        physicsCube,
        PhysicsImpostor.BoxImpostor,
        {
          mass: 0.1,
        }
      );
    });

    // webxr settings

    const xr = await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: "immersive-ar",
        referenceSpaceType: "unbounded",
      },
    });

    xr.baseExperience.onInitialXRPoseSetObservable.add((camera) => {
      camera.position = new Vector3(0, 0, 2);
    });

    xr.baseExperience.featuresManager.enableFeature(
      WebXRFeatureName.HAND_TRACKING,
      "latest",
      {
        xrInput: xr.input,
        jointMeshes: {
          enablePhysics: true,
          sourceMesh: Mesh.CreateIcoSphere(
            "iso",
            { radius: 0.5, flat: true, subdivisions: 1 },
            scene
          ),
          physicsProps: {
            friction: 0.5,
          },
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
