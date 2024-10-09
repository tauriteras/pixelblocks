import{S as y,P as T,W as B,R as O,V as v,C,a as m,M as g,D as f,T as l,b as k,c as S,d as w}from"./three-CMJwxjNJ.js";import{l as L}from"./socket.io-client-BGdex47s.js";import"./engine.io-client-BY_6WtMP.js";import"./engine.io-parser-BiEtp6m2.js";import"./@socket.io-Dkula2eQ.js";import"./socket.io-parser-BBkuslX-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();class R{constructor(){this.scene=null,this.camera=null,this.renderer=null,this.raycaster=null,this.pointer=null,this.clock=null,this.controls={movement:{jump:!1,left:!1,right:!1,down:!1},mouse:{action:"Place",leftMouse:!1,rightMouse:!1},camera:{zoomIn:!1,zoomOut:!1}},this.running=!1,this.socket=null,this.world=null,this.player=null,this.counters={dt:0,airTime:0}}init(){this.scene=new y,this.camera=new T(75,window.innerWidth/window.innerHeight,.1,1e3),this.renderer=new B,this.raycaster=new O,this.pointer=new v,this.clock=new C,this.camera.position.z=5,this.renderer.setSize(window.innerWidth,window.innerHeight)}update(){if(this.controls.mouse.leftMouse===!0){this.raycaster.setFromCamera(this.pointer,this.camera);let e=this.raycaster.intersectObjects(this.scene.children),s;for(let o=0;o<e.length;o++){let i=e[o].object;if(i===void 0)break;i.userData.type==="SPRITE_Player"&&(s=i),i.userData.type==="SPRITE_Block"&&(this.controls.mouse.action==="Punch"&&this.world.blocks[i.userData.index].data.id!=0&&(s=i),this.controls.mouse.action==="Place"&&this.world.blocks[i.userData.index].data.id===0&&(s=i)),i.userData.type==="SPRITE_BGBlock"&&(this.controls.mouse.action==="Punch"&&this.world.backgroundBlocks[i.userData.index].data.id!=0&&(s=i),this.controls.mouse.action==="Place"&&this.world.backgroundBlocks[i.userData.index].data.id===0&&(s=i))}s!=null&&(this.controls.mouse.action==="Punch"&&(this.player.punch(),this.socket.emit("player-wants-to-punch",s.userData)),this.controls.mouse.action==="Place"&&(console.log("Place",s),s.userData.type==="SPRITE_Block"&&this.world.blocks[s.userData.index].place(2),s.userData.type==="SPRITE_BGBlock"&&this.world.backgroundBlocks[s.userData.index].place(1)),this.controls.mouse.action==="Settings"&&console.log("Settings",s))}this.controls.movement.jump===!0&&(this.player.position.y+=5*this.counters.dt),this.controls.movement.down===!0&&(this.player.position.y-=5*this.counters.dt),this.controls.movement.right===!0&&(this.player.position.x+=5*this.counters.dt),this.controls.movement.left===!0&&(this.player.position.x-=5*this.counters.dt),this.player!=null&&(this.camera.position.x=this.player.position.x,this.camera.position.y=this.player.position.y,this.player.updatePos()),this.counters.dt=this.clock.getDelta(),this.renderer.render(this.scene,this.camera)}loadWorldSelector(){let e=document.createElement("div");e.classList.add("select-world");let s=document.createElement("div");s.classList.add("select-world-textbox-div");let o=document.createElement("p");o.classList.add("select-world-textbox-p"),o.innerText="World Name:";let i=document.createElement("input");i.classList.add("select-world-textbox"),i.addEventListener("keydown",n=>{n.key.toUpperCase()==="ENTER"&&(console.log(document.querySelector("input").value),this.socket.emit("request-world",document.querySelector("input").value.toUpperCase()))}),s.appendChild(o),s.appendChild(i),e.appendChild(s);let a=document.createElement("div");a.classList.add("select-world-menu"),e.appendChild(a),h.appendChild(e)}pause(e){if(e==="pause"){let s=document.createElement("div");s.classList.add("pause-menu");let o=document.createElement("div");o.classList.add("pause-menu-options");let i=document.createElement("p");i.classList.add("pause-menu-button"),i.innerText="Exit World";let a=document.createElement("p");a.classList.add("pause-menu-button"),a.innerText="Settings";let n=document.createElement("p");n.classList.add("pause-menu-button"),n.innerText="Close",n.addEventListener("click",()=>{t.pause("unpause")}),o.appendChild(i),o.appendChild(a),o.appendChild(n),s.appendChild(o),h.appendChild(s)}else h.removeChild(document.getElementsByClassName("pause-menu")[0])}}function b(){t.update()}const c={0:{name:"Nothing",complexity:0,hardness:0,texture:"Nothing.png",altTexture:{top:"NONE",bottom:"NONE",left:"NONE",right:"NONE",vertical:"NONE",horisontal:"NONE"},collisions:{top:!1,bottom:!1,left:!1,right:!1}},1:{name:"Spawn Block",complexity:1,hardness:1,texture:"WorldSpawn.png",altTexture:{top:"NONE",bottom:"NONE",left:"NONE",right:"NONE",vertical:"NONE",horisontal:"NONE"},collisions:{top:!1,bottom:!1,left:!1,right:!1}},2:{name:"Bedrock",complexity:1,hardness:1,texture:"Bedrock.png",altTexture:{top:"NONE",bottom:"NONE",left:"NONE",right:"NONE",vertical:"NONE",horisontal:"NONE"},collisions:{top:!0,bottom:!0,left:!0,right:!0}},3:{name:"Dirt",complexity:1,hardness:3,texture:"Dirt.png",altTexture:{top:"Dirt-NOGRASS.png",bottom:"NONE",left:"NONE",right:"NONE",vertical:"NONE",horisontal:"NONE"},collisions:{top:!0,bottom:!0,left:!0,right:!0}},4:{name:"Rock",complexity:1,hardness:5,texture:"Rock.png",altTexture:{top:"NONE",bottom:"NONE",left:"NONE",right:"NONE",vertical:"NONE",horisontal:"NONE"},collisions:{top:!0,bottom:!0,left:!0,right:!0}},5:{name:"Lava",complexity:1,hardness:3,texture:"Lava.png",altTexture:{top:"NONE",bottom:"NONE",left:"NONE",right:"NONE",vertical:"NONE",horisontal:"NONE"},collisions:{top:!0,bottom:!0,left:!0,right:!0}}};class N{constructor(e,s,o,i,a){this.sprite=null,this.index=i,this.data={id:e,position:{x:s,y:o},collisions:{}},this.customData=a,this.punchCount=0}create(){const e=new m(1,1),s=new g({side:f,transparent:!0,map:new l().load("./TEXTURES/BLOCKS/"+c[this.data.id].texture)}),o=new k(e,s);return o.position.x=this.data.position.x,o.position.y=this.data.position.y,o.userData.type="SPRITE_Block",o.userData.index=this.index,this.sprite=o,this.data.collisions=c[this.data.id].collisions,o}place(e){console.log("Place!",this),this.data.id=e,this.sprite.material.map=new l().load("./TEXTURES/BLOCKS/"+c[e].texture),this.data.collisions=c[e].collisions,this.data.position.x>1&&t.world.blocks[this.index-1].updateTexture(),this.data.position.x<100&&t.world.blocks[this.index-1].updateTexture(),this.data.position.y<56&&t.world.blocks[this.index+100].updateTexture(),this.data.position.y>1&&t.world.blocks[this.index-100].updateTexture()}punch(){if(this.punchCount===0){const s=new m(1,1),o=new g({side:f,transparent:!0,map:new l().load("./TEXTURES/BREAKING/Breaking-1.png")}),i=new k(s,o);this.sprite.add(i)}this.punchCount+=1;let e=this.punchCount/c[this.data.id].hardness*100;e>20&&e<40&&(this.sprite.children[0].material.map=new l().load("./TEXTURES/BREAKING/Breaking-2.png")),e>40&&e<60&&(this.sprite.children[0].material.map=new l().load("./TEXTURES/BREAKING/Breaking-3.png")),e>60&&e<80&&(this.sprite.children[0].material.map=new l().load("./TEXTURES/BREAKING/Breaking-4.png")),e>80&&e<100&&(this.sprite.children[0].material.map=new l().load("./TEXTURES/BREAKING/Breaking-5.png")),this.punchCount===c[this.data.id].hardness&&this.break()}break(){console.log("Break!",this),this.sprite.remove(this.sprite.children[0]),this.data.id=0,this.punchCount=0,this.sprite.material.map=new l().load("./TEXTURES/BLOCKS/Nothing.png"),this.data.collisions=c[0].collisions,this.data.position.x>1&&t.world.blocks[this.index-1].updateTexture(),this.data.position.x<100&&t.world.blocks[this.index-1].updateTexture(),this.data.position.y<56&&t.world.blocks[this.index+100].updateTexture(),this.data.position.y>1&&t.world.blocks[this.index-100].updateTexture()}updateTexture(){t.world.blocks[this.index].data.id===t.world.blocks[this.index+100].data.id&&c[t.world.blocks[this.index].data.id].altTexture.top!="NONE"&&(t.world.blocks[this.index].sprite.material.map=new l().load("./TEXTURES/BLOCKS/"+c[t.world.blocks[this.index].data.id].altTexture.top)),t.world.blocks[this.index].data.id!=t.world.blocks[this.index+100].data.id&&(t.world.blocks[this.index].sprite.material.map=new l().load("./TEXTURES/BLOCKS/"+c[t.world.blocks[this.index].data.id].texture))}}const u={0:{name:"Nothing",complexity:0,hardness:0,texture:"Nothing.png",altTexture:{top:"NONE",bottom:"NONE",left:"NONE",right:"NONE",vertical:"NONE",horisontal:"NONE"}},1:{name:"Cave Wall",complexity:1,hardness:3,texture:"CaveWall.png",altTexture:{top:"NONE",bottom:"NONE",left:"NONE",right:"NONE",vertical:"NONE",horisontal:"NONE"}}};class P extends N{constructor(e,s,o,i,a){super(e,s,o,i,a)}create(){const e=new m(1,1),s=new g({side:f,transparent:!0,map:new l().load("./TEXTURES/BACKGROUNDBLOCKS/"+u[this.data.id].texture)}),o=new k(e,s);return o.position.x=this.data.position.x,o.position.y=this.data.position.y,o.userData.type="SPRITE_BGBlock",o.userData.index=this.index,this.data.collisions=u[this.data.id].collisions,this.sprite=o,o}break(){console.log("Break!",this),this.sprite.remove(this.sprite.children[0]),this.data.id=0,this.sprite.material.map=new l().load("./TEXTURES/BLOCKS/Nothing.png"),this.data.collisions=u[0].collisions,this.data.position.x>1&&t.world.backgroundBlocks[this.index-1].updateTexture(),this.data.position.x<100&&t.world.backgroundBlocks[this.index-1].updateTexture(),this.data.position.y<56&&t.world.backgroundBlocks[this.index+100].updateTexture(),this.data.position.y>1&&t.world.backgroundBlocks[this.index-100].updateTexture()}punch(){if(this.punchCount===0){const s=new m(1,1),o=new g({side:f,transparent:!0,map:new l().load("./TEXTURES/BREAKING/Breaking-1.png")}),i=new k(s,o);this.sprite.add(i)}this.punchCount+=1;let e=this.punchCount/u[this.data.id].hardness*100;e>20&&e<40&&(this.sprite.children[0].material.map=new l().load("./TEXTURES/BREAKING/Breaking-2.png")),e>40&&e<60&&(this.sprite.children[0].material.map=new l().load("./TEXTURES/BREAKING/Breaking-3.png")),e>60&&e<80&&(this.sprite.children[0].material.map=new l().load("./TEXTURES/BREAKING/Breaking-4.png")),e>80&&e<100&&(this.sprite.children[0].material.map=new l().load("./TEXTURES/BREAKING/Breaking-5.png")),this.punchCount===u[this.data.id].hardness&&this.break()}place(e){console.log("Place!",this),this.data.id=e,this.sprite.material.map=new l().load("./TEXTURES/BLOCKS/"+u[e].texture),this.data.position.x>1&&t.world.backgroundBlocks[this.index-1].updateTexture(),this.data.position.x<100&&t.world.backgroundBlocks[this.index-1].updateTexture(),this.data.position.y<56&&t.world.backgroundBlocks[this.index+100].updateTexture(),this.data.position.y>1&&t.world.backgroundBlocks[this.index-100].updateTexture()}updateTexture(){t.world.backgroundBlocks[this.index].data.id===t.world.backgroundBlocks[this.index+100].data.id&&u[t.world.backgroundBlocks[this.index].data.id].altTexture.top!="NONE"&&(t.world.backgroundBlocks[this.index].sprite.material.map=new l().load("./TEXTURES/BACKGROUNDBLOCKS/"+u[t.world.backgroundBlocks[this.index].data.id].altTexture.top)),t.world.backgroundBlocks[this.index].data.id!=t.world.backgroundBlocks[this.index+100].data.id&&(t.world.backgroundBlocks[this.index].sprite.material.map=new l().load("./TEXTURES/BACKGROUNDBLOCKS/"+u[t.world.backgroundBlocks[this.index].data.id].texture))}}class D{constructor(e){this.data=e,this.blocks=[],this.backgroundBlocks=[],this.players=[]}load(e){const s=new m(100,56),o=new g({side:f,color:new S("blue")}),i=new k(s,o);i.position.x=50,i.position.y=28,e.add(i);let a=1,n=1;for(let p=0;p<this.data.blocks.length;p++){let E=new N(this.data.blocks[p].id,a,n,p,this.data.blocks[p].data),x=new P(this.data.backgroundBlocks[p].id,a,n,p,this.data.backgroundBlocks[p].data);this.blocks.push(E),this.backgroundBlocks.push(x),e.add(x.create()),e.add(E.create()),a===this.data.size.width&&(a=0,n++),a++}this.updateTextures()}updateTextures(){for(let e=0;e<this.blocks.length-100;e++)this.blocks[e].data.id===this.blocks[e+100].data.id&&c[this.blocks[e].data.id].altTexture.top!="NONE"&&(this.blocks[e].sprite.material.map=new l().load("./TEXTURES/BLOCKS/"+c[this.blocks[e].data.id].altTexture.top));for(let e=0;e<this.backgroundBlocks.length-100;e++)this.backgroundBlocks[e].data.id===this.backgroundBlocks[e+100].data.id&&u[this.backgroundBlocks[e].data.id].altTexture.top!="NONE"&&(this.backgroundBlocks[e].sprite.material.map=new l().load("./TEXTURES/BLOCKS/"+u[this.blocks[e].data.id].altTexture.top))}}class U{constructor(e,s){this.socket=e,this.position=s,this.userData={name:"",level:0,xp:0,clothing:{},effects:{}},this.sprite=null}spawn(){const e=new m(.7,.9),s=new g({side:f,transparent:!0,map:new l().load("./dev_default.png")}),o=new k(e,s);return o.position.x=this.position.x,o.position.y=this.position.y,o.userData.type="SPRITE_Player",this.sprite=o,document.getElementsByClassName("select-world")[0].classList.add("hide-worlds-menu"),o}updatePos(){this.sprite!==null&&(this.sprite.position.x=this.position.x,this.sprite.position.y=this.position.y)}punch(){console.log("Player is punching!")}}function K(){const r=L("http://localhost:3069");t.socket=r,r.on("players-here",e=>{console.log("players-here",e)}),r.on("player-joined",e=>{console.log("player-joined",e)}),r.on("player-left",e=>{console.log("player-left",e)}),r.on("other-player-moved",e=>{console.log("other-player-moved",e)}),r.on("other-player-punch",e=>{console.log("other-player-punch",e)}),r.on("other-player-punch-block",e=>{console.log("other-player-punch-block",e)}),r.on("other-player-build",e=>{console.log("other-player-build",e)}),r.on("player-punch-block",e=>{console.log("player-punch-block",e),t.world.blocks[e].punch()}),r.on("player-punch-bgBlock",e=>{console.log("player-punch-bgBlock",e),t.world.backgroundBlocks[e].punch()}),r.on("player-build",e=>{console.log("player-build",e)}),r.on("update-block",e=>{console.log("update-block",e)}),r.on("join-world",e=>{console.log("join-world",e),t.camera.position.x=e.entry.x,t.camera.position.y=e.entry.y,t.world=new D(e),t.player=new U(r.id,e.entry),t.world.load(t.scene),t.scene.add(t.player.spawn())})}class A{constructor(){this.header=null,this.pauseMenu=null,this.ESCCounter=0}init(){G(),h.appendChild(this.header)}pauseMenu(){let e=document.createElement("div");e.classList.add("pause-menu"),h.appendChild(e)}}function G(){let r=document.createElement("div");r.classList.add("header"),r.classList.add("visible");let e=document.createElement("div");e.classList.add("logo"),r.appendChild(e);let s=document.createElement("span");s.classList.add("navbar"),r.appendChild(s);let o=document.createElement("div");o.classList.add("nav-button"),o.innerText="Play!",o.addEventListener("click",()=>{if(d.header.classList.contains("visible")&&(d.header.classList.remove("visible"),d.header.classList.contains("animate-header-in")&&d.header.classList.remove("animate-header-in"),d.header.classList.add("hidden")),t.running!==!0)if(w.isWebGL2Available())t.init(),t.loadWorldSelector(),t.renderer.setAnimationLoop(b),h.appendChild(t.renderer.domElement),window.addEventListener("pointermove",a=>{t.pointer.x=a.clientX/window.innerWidth*2-1,t.pointer.y=-(a.clientY/window.innerHeight)*2+1}),window.addEventListener("pointerdown",()=>{t.controls.mouse.leftMouse=!0}),window.addEventListener("pointerup",()=>{t.controls.mouse.leftMouse=!1}),window.addEventListener("pointerleave",()=>{t.controls.mouse.rightMouse=!1,t.controls.mouse.leftMouse=!1}),document.addEventListener("keydown",a=>{let n=a.key.toUpperCase();n==="ESCAPE"&&(console.log(n,d.ESCCounter),d.ESCCounter++,d.ESCCounter===1&&t.pause("pause"),d.ESCCounter===2&&(d.header.classList.remove("hidden"),d.header.classList.add("visible"),d.header.classList.add("animate-header-in")),d.ESCCounter===3&&(d.header.classList.remove("visible"),d.header.classList.remove("animate-header-in"),d.header.classList.add("hidden"),t.pause("unpause"),d.ESCCounter=0)),n==="W"&&(t.controls.movement.jump=!0),n==="D"&&(t.controls.movement.right=!0),n==="A"&&(t.controls.movement.left=!0),n==="S"&&(t.controls.movement.down=!0),n==="Z"&&t.camera.position.z>1&&(t.camera.position.z-=1,console.log("camera pos",t.camera.position)),n==="X"&&t.camera.position.z<7&&(t.camera.position.z+=1,console.log("camera pos",t.camera.position))}),document.addEventListener("keyup",a=>{let n=a.key.toUpperCase();n==="W"&&(t.controls.movement.jump=!1),n==="D"&&(t.controls.movement.right=!1),n==="A"&&(t.controls.movement.left=!1),n==="S"&&(t.controls.movement.down=!1),n==="1"&&(t.controls.mouse.action="Punch"),n==="2"&&(t.controls.mouse.action="Place"),n==="-"&&(console.log("newWorld",n),t.socket.emit("request-world","WORLDNAME"))}),K(),b(),t.running=!0;else{const a=w.getWebGL2ErrorMessage();document.getElementById("container").appendChild(a)}}),s.appendChild(o);let i=document.createElement("div");i.classList.add("page-settings"),r.appendChild(i),d.header=r}const h=document.getElementById("root"),t=new R,d=new A;document.addEventListener("DOMContentLoaded",()=>{d.init()});
