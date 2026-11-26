// Teléfono 3D creado en el navegador (sin archivos de modelo): carcasa, pantalla con un Short, cámara y botones.
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
export default async function crear(THREE) {
  await document.fonts.load('700 80px "Space Grotesk"');
  const W=720,H=1560; const c=document.createElement('canvas'); c.width=W;c.height=H; const g=c.getContext('2d');
  // sky
  let gr=g.createLinearGradient(0,0,0,H*0.62); gr.addColorStop(0,'#1a0f3a'); gr.addColorStop(.55,'#6b2a8f'); gr.addColorStop(1,'#ff4fa3');
  g.fillStyle=gr; g.fillRect(0,0,W,H);
  // stars
  for(let i=0;i<70;i++){g.fillStyle=`rgba(255,255,255,${Math.random()*.7})`;g.fillRect(Math.random()*W,Math.random()*H*.4,2,2)}
  // sun with stripes
  const sx=W/2, sy=H*0.5, sr=210;
  let sg=g.createLinearGradient(0,sy-sr,0,sy+sr); sg.addColorStop(0,'#ffe07a'); sg.addColorStop(.6,'#ff8a5c'); sg.addColorStop(1,'#ff4fa3');
  const sc2=document.createElement('canvas'); sc2.width=sc2.height=sr*2; const s2=sc2.getContext('2d'); s2.fillStyle=(()=>{const q=s2.createLinearGradient(0,0,0,sr*2);q.addColorStop(0,'#ffe07a');q.addColorStop(.6,'#ff8a5c');q.addColorStop(1,'#ff4fa3');return q})();
  s2.beginPath(); s2.arc(sr,sr,sr,0,Math.PI*2); s2.fill(); s2.globalCompositeOperation='destination-out'; for(let i=0;i<7;i++){s2.fillRect(0,sr+20+i*30,sr*2,6+i*2.2)}
  g.drawImage(sc2,sx-sr,sy-sr);
  // sea
  const seaY=H*0.62; let sea=g.createLinearGradient(0,seaY,0,H); sea.addColorStop(0,'#2a1250'); sea.addColorStop(1,'#0e0b1a'); g.fillStyle=sea; g.fillRect(0,seaY,W,H-seaY);
  g.strokeStyle='rgba(62,230,224,.55)'; g.lineWidth=2;
  for(let i=1;i<14;i++){const y=seaY+Math.pow(i,1.7)*4; g.beginPath(); g.moveTo(0,y); g.lineTo(W,y); g.stroke();}
  for(let i=-10;i<=10;i++){g.beginPath(); g.moveTo(W/2+i*18,seaY); g.lineTo(W/2+i*140,H); g.stroke();}
  // palms
  function palm(x,base,h,dir){g.strokeStyle='#0e0b1a'; g.fillStyle='#0e0b1a'; g.lineCap='round'; g.lineWidth=16; g.beginPath(); g.moveTo(x,base); g.quadraticCurveTo(x+dir*60,base-h*.55,x+dir*30,base-h); g.stroke();
   const tx=x+dir*30, ty=base-h; const angs=[-170,-140,-110,-70,-40,-10,200];
   for(const d of [-160,-125,-95,-60,-25,10,190]){const a=d*Math.PI/180; const L=170; const ex=tx+Math.cos(a)*L, ey=ty+Math.sin(a)*L*0.35+70;
    g.beginPath(); g.moveTo(tx,ty); g.quadraticCurveTo(tx+Math.cos(a)*L*0.55,ty+Math.sin(a)*L*0.6-30,ex,ey); g.lineTo(ex-Math.cos(a)*30,ey+8); g.quadraticCurveTo(tx+Math.cos(a)*L*0.45,ty+Math.sin(a)*L*0.4-10,tx,ty+8); g.fill();}
   g.beginPath(); g.arc(tx,ty+6,14,0,Math.PI*2); g.fill();}
  palm(70,seaY+40,430,1); palm(660,seaY+60,520,-1);
  // dark scrim bottom for text
  let sc=g.createLinearGradient(0,H*0.55,0,H); sc.addColorStop(0,'rgba(14,11,26,0)'); sc.addColorStop(1,'rgba(14,11,26,.85)'); g.fillStyle=sc; g.fillRect(0,0,W,H);
  // hook text top
  g.textAlign='center'; g.font='700 74px "Space Grotesk"'; g.lineJoin='round';
  function stroked(t,x,y,col){g.lineWidth=14; g.strokeStyle='#0e0b1a'; g.strokeText(t,x,y); g.fillStyle=col; g.fillText(t,x,y);}
  stroked('NO DESLICES',W/2,330,'#ffffff'); stroked('TODAVÍA',W/2,410,'#ff4fa3');
  // subtitles mid-bottom
  g.font='700 58px "Space Grotesk"'; g.textAlign='left'; {const a='tienes 2 ', b='segundos'; const wa=g.measureText(a).width, wb=g.measureText(b).width; const x0=(W-60-wa-wb)/2; stroked(a,x0,1140,'#ffffff'); stroked(b,x0+wa,1140,'#ff4fa3');} g.textAlign='center';
  // right icons
  g.fillStyle='rgba(255,255,255,.92)';
  [880,1010,1140].forEach((y,i)=>{g.beginPath(); g.arc(W-62,y,34,0,Math.PI*2); g.globalAlpha=.25; g.fill(); g.globalAlpha=1;
   g.font='700 30px "Space Grotesk"'; g.fillText(['♥','💬','➦'][i]===undefined?'':'',W-62,y+10)});
  g.font='700 40px "Space Grotesk"'; g.fillStyle='#fff'; g.fillText('♥',W-62,894); 
  g.beginPath(); g.fillStyle='#fff'; g.moveTo(W-80,1004); g.lineTo(W-44,1004); g.lineTo(W-44,1028); g.lineTo(W-58,1028); g.lineTo(W-70,1040); g.lineTo(W-70,1028); g.lineTo(W-80,1028); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(W-44,1140); g.lineTo(W-70,1118); g.lineTo(W-70,1130); g.quadraticCurveTo(W-92,1132,W-86,1164); g.quadraticCurveTo(W-80,1148,W-70,1150); g.lineTo(W-70,1162); g.closePath(); g.fill();
  // channel row
  g.textAlign='left'; g.fillStyle='#17132A'; g.beginPath(); g.arc(70,1300,34,0,Math.PI*2); g.fill(); g.strokeStyle='#3EE6E0'; g.lineWidth=5; g.stroke();
  g.fillStyle='#ff4fa3'; g.font='700 28px "Space Grotesk"'; g.textAlign='center'; g.fillText('VC',70,1310);
  g.textAlign='left'; g.fillStyle='#fff'; g.font='700 30px "Space Grotesk"'; g.fillText('Vice City Diario',120,1311);
  g.fillStyle='#ff4fa3'; g.beginPath(); g.roundRect(410,1280,180,44,22); g.fill(); g.fillStyle='#0e0b1a'; g.font='700 24px "Space Grotesk"'; g.fillText('Suscribirse',433,1310);
  // progress bar
  g.fillStyle='rgba(255,255,255,.25)'; g.fillRect(0,H-14,W,6); g.fillStyle='#ff4fa3'; g.fillRect(0,H-14,W*0.42,6);
  // top bar
  g.fillStyle='#fff'; g.font='700 34px "Space Grotesk"'; g.fillText('Shorts',40,110);
  
  const tex=new THREE.CanvasTexture(c); tex.colorSpace=THREE.SRGBColorSpace; tex.flipY=false;
  const phone=new THREE.Group(); phone.name='telefono';
  const bw=1.0,bh=2.08,bd=0.11;
  const body=new THREE.Mesh(new RoundedBoxGeometry(bw,bh,bd,10,0.13),new THREE.MeshStandardMaterial({color:0x2a2447,metalness:.85,roughness:.28})); body.name='carcasa';
  phone.add(body);
  const sw=bw-0.07, sh=bh-0.07;
  // screen plane with rounded corners via shape
  const r=0.1; const s=new THREE.Shape(); s.moveTo(-sw/2+r,-sh/2); s.lineTo(sw/2-r,-sh/2); s.quadraticCurveTo(sw/2,-sh/2,sw/2,-sh/2+r); s.lineTo(sw/2,sh/2-r); s.quadraticCurveTo(sw/2,sh/2,sw/2-r,sh/2); s.lineTo(-sw/2+r,sh/2); s.quadraticCurveTo(-sw/2,sh/2,-sw/2,sh/2-r); s.lineTo(-sw/2,-sh/2+r); s.quadraticCurveTo(-sw/2,-sh/2,-sw/2+r,-sh/2);
  const sgeo=new THREE.ShapeGeometry(s,6); const uv=sgeo.attributes.uv, pos=sgeo.attributes.position;
  for(let i=0;i<uv.count;i++){uv.setXY(i,(pos.getX(i)+sw/2)/sw,1-(pos.getY(i)+sh/2)/sh)}
  const screen=new THREE.Mesh(sgeo,new THREE.ShaderMaterial({uniforms:{map:{value:tex}},
    vertexShader:'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader:'uniform sampler2D map; varying vec2 vUv;\nvoid main(){\n gl_FragColor=texture2D(map,vUv);\n#include <colorspace_fragment>\n}'}));
  screen.position.z=bd/2+0.002; screen.name='pantalla'; phone.add(screen);
  // back panel accent: VC lens ring
  const lens=new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.09,0.02,40),new THREE.MeshStandardMaterial({color:0x0e0b1a,metalness:.6,roughness:.2}));
  lens.rotation.x=Math.PI/2; lens.position.set(-0.28,0.82,-bd/2-0.008); lens.name='camara'; phone.add(lens);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(0.1,0.012,12,48),new THREE.MeshStandardMaterial({color:0x3ee6e0,metalness:.4,roughness:.3,emissive:0x3ee6e0,emissiveIntensity:.4}));
  ring.position.set(-0.28,0.82,-bd/2-0.016); ring.name='aro'; phone.add(ring);
  // side buttons
  [[0.5,0.25],[0.25,0.18]].forEach(([y,h],i)=>{const b=new THREE.Mesh(new RoundedBoxGeometry(0.03,h,0.05,2,0.012),body.material); b.position.set(bw/2+0.008,y,0); b.name='boton'+i; phone.add(b)});
  return phone;
}
