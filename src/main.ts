import { Engine, MeshBuilder, Scene } from "@babylonjs/core";
import "./style/style.scss";

const renderCanvas = <HTMLCanvasElement>document.getElementById("renderCanvas");

if (renderCanvas) {
  const engine = new Engine(renderCanvas, true, {});
  const scene = new Scene(engine);

  MeshBuilder.CreateBox("box", {}, scene);
  scene.createDefaultCameraOrLight(true, true, true);
  scene.createDefaultEnvironment();

  engine.runRenderLoop(() => {
    scene.render();
  });
}
