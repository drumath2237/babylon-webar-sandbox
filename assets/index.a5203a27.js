import{E as e,S as n,V as o,C as t,A as s,H as a,a as i,G as r,b as c,c as d,M as p,P as w,W as l}from"./vendor.aa911ce1.js";window.addEventListener("DOMContentLoaded",(async()=>{const h=document.getElementById("renderCanvas");if(h){const m=new e(h,!0,{}),u=new n(m);u.enablePhysics(new o(0,-9.81,0),new t);const b=new s("camera",-Math.PI/2,Math.PI/2,.5,o.Zero(),u,!0);b.attachControl(),b.minZ=.001,new a("light1",new o(1,1,0),u).intensity=1;const M=new i("anchor",u);M.scaling=new o(2,2,2),M.position=new o(0,0,0);const I=new r(u),g=new c("button");g.linkToTransformNode(M),I.addControl(g),g.text="Button",g.imageUrl="https://www.babylonjs-playground.com/textures/icons/Settings.png",g.position=new o(0,0,1),g.scaling=new o(.15,.15,.3),g.tooltipText="Holographic\nButton",g.backMaterial.albedoColor=new d(.12,.171,.55),g.pointerDownAnimation=()=>{g.scaling=new o(.15,.15,.15)},g.pointerUpAnimation=()=>{g.scaling=new o(.15,.15,.3)},g.onPointerClickObservable.add((()=>{g.text+="!"}));const y=p.CreateGround("ground",1,1,2,u);y.position=new o(0,-.5,1),y.physicsImpostor=new w(y,w.BoxImpostor,{mass:0,friction:.7,restitution:.7}),g.onPointerDownObservable.add((()=>{const e=p.CreateBox("physicsCube",.1,u);e.position=new o(0,.5,1),e.rotation=new o(Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2),e.physicsImpostor=new w(e,w.BoxImpostor,{mass:.1})}));const C=await u.createDefaultXRExperienceAsync({uiOptions:{sessionMode:"immersive-ar",referenceSpaceType:"unbounded"}});C.baseExperience.onInitialXRPoseSetObservable.add((e=>{e.position=new o(0,0,2)})),C.baseExperience.featuresManager.enableFeature(l.HAND_TRACKING,"latest",{xrInput:C.input,jointMeshes:{enablePhysics:!0,sourceMesh:p.CreateIcoSphere("iso",{radius:.5,flat:!0,subdivisions:1},u),physicsProps:{friction:.5}}}),m.runRenderLoop((()=>{u.render()})),window.addEventListener("resize",(()=>{m.resize()}))}}));
