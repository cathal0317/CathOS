(() => {
  'use strict';
  // All artwork is procedural, with no remote scripts, textures, or trackers.
  const wave=document.querySelector('.wave-visual');
  for(let i=0;i<43;i++){const bar=document.createElement('i');const x=i/42;const envelope=Math.sin(Math.PI*x);const pulse=.25+.75*Math.abs(Math.sin(i*1.72)*Math.cos(i*.36));bar.style.height=(8+envelope*pulse*90)+'%';bar.style.setProperty('--i',i);wave.append(bar);}
  const canvas=document.getElementById('thought-canvas');
  const ctx=canvas.getContext('2d');
  if(!ctx){canvas.setAttribute('aria-label','The interactive sculpture is unavailable in this browser. Explore the projects below.');return;}
  const container=document.getElementById('hero-art');
  let width=500,height=470,dpr=1,mode='form',time=0,frame=0,last=0,visible=true;
  let paused=document.body.classList.contains('motion-paused');
  let angleX=.78,angleY=-.28,targetX=.78,targetY=-.28,dragging=false,lastX=0,lastY=0;
  let hoverX=0,hoverY=0;
  const compact=()=>width<450;
  const TAU=Math.PI*2;
  const sphere=[];
  for(let i=0;i<78;i++){const y=1-(i/77)*2;const radius=Math.sqrt(1-y*y);const theta=i*Math.PI*(3-Math.sqrt(5));sphere.push([Math.cos(theta)*radius*1.87,y*1.87,Math.sin(theta)*radius*1.87]);}
  const edges=[];
  for(let i=0;i<sphere.length;i++){const distances=sphere.map((point,j)=>({j,d:point.reduce((sum,v,k)=>sum+(v-sphere[i][k])**2,0)})).filter(p=>p.j!==i).sort((a,b)=>a.d-b.d);distances.slice(0,4).forEach(({j})=>{if(j>i)edges.push([i,j]);});}
  const torus=[];
  function torusPoint(u,v){const radius=1.55+.67*Math.cos(v);return[radius*Math.cos(u),radius*Math.sin(u),.67*Math.sin(v)];}
  for(let j=0;j<23;j++){const points=[];for(let i=0;i<=108;i++)points.push(torusPoint(i/108*TAU,j/23*TAU));torus.push(points);}
  for(let j=0;j<46;j++){const points=[];for(let i=0;i<=44;i++)points.push(torusPoint(j/46*TAU,i/44*TAU));torus.push(points);}
  function projection(){
    const rx=angleX+hoverY*.12,ry=angleY+time*.10+hoverX*.12,rz=-.29;
    const cx=Math.cos(rx),sx=Math.sin(rx),cy=Math.cos(ry),sy=Math.sin(ry),cz=Math.cos(rz),sz=Math.sin(rz);
    const scale=Math.min(width/5.65,height/5.25);
    return point=>{const[x,y,z]=point;const y1=y*cx-z*sx,z1=y*sx+z*cx,x2=x*cy+z1*sy,z2=-x*sy+z1*cy,x3=x2*cz-y1*sz,y3=x2*sz+y1*cz;const perspective=6.8/(6.8-z2);return{x:width*.51+x3*scale*perspective,y:height*.49+y3*scale*perspective,z:z2};};
  }
  function guides(){
    const radius=Math.min(width*.43,height*.43),cx=width*.51,cy=height*.49;
    ctx.strokeStyle='rgba(162,162,162,.11)';ctx.lineWidth=.5;
    ctx.beginPath();ctx.arc(cx,cy,radius,0,TAU);ctx.stroke();
    ctx.beginPath();
    for(let i=0;i<60;i++){const a=i/60*TAU;const len=i%5===0?5:2;ctx.moveTo(cx+Math.cos(a)*radius,cy+Math.sin(a)*radius);ctx.lineTo(cx+Math.cos(a)*(radius+len),cy+Math.sin(a)*(radius+len));}
    ctx.stroke();
  }
  function drawForm(project){
    const paths=torus.map(points=>{const projected=points.map(project);return{points:projected,depth:projected.reduce((sum,p)=>sum+p.z,0)/projected.length};}).sort((a,b)=>a.depth-b.depth);
    for(const path of paths){const alpha=Math.max(.13,Math.min(.64,.33+path.depth*.16));ctx.beginPath();path.points.forEach((point,index)=>index===0?ctx.moveTo(point.x,point.y):ctx.lineTo(point.x,point.y));ctx.strokeStyle='rgba(209,209,209,'+alpha+')';ctx.lineWidth=path.depth>.4?.85:.6;ctx.stroke();}
    for(let i=0;i<3;i++){const p=project(torusPoint(time*.22+i*TAU/3,i*1.4));ctx.fillStyle='#ececec';ctx.beginPath();ctx.arc(p.x,p.y,1.9,0,TAU);ctx.fill();ctx.strokeStyle='#dcdcdc25';ctx.beginPath();ctx.arc(p.x,p.y,6,0,TAU);ctx.stroke();}
  }
  function drawSignal(){
    const start=width*.12,end=width*.90,cy=height*.5;
    for(let j=0;j<26;j++){
      const depth=j/25,offset=(j-12.5)*3.1;
      ctx.beginPath();
      for(let i=0;i<=150;i++){const n=i/150,x=start+(end-start)*n;const envelope=Math.sin(Math.PI*n)**1.4;const oscillation=Math.sin(n*19-time*1.6+j*.095+angleY*1.4)+.4*Math.sin(n*36+time*.8+angleX);const amplitude=Math.min(height*.16,70)*(1+hoverY*.3+.25*Math.sin(angleX-.78));const y=cy+offset+envelope*oscillation*amplitude*(.5+depth*.5);i?ctx.lineTo(x,y):ctx.moveTo(x,y);}
      ctx.strokeStyle='rgba(220,220,220,'+(.12+depth*.58)+')';ctx.lineWidth=.7;ctx.stroke();
    }
    ctx.strokeStyle='#dcdcdc20';ctx.setLineDash([2,6]);ctx.beginPath();ctx.moveTo(start,cy);ctx.lineTo(end,cy);ctx.stroke();ctx.setLineDash([]);
  }
  function drawNetwork(project){
    const points=sphere.map(project);
    for(const[a,b]of edges){const depth=(points[a].z+points[b].z)/2,alpha=Math.max(.07,.23+depth*.12);ctx.strokeStyle='rgba(200,200,200,'+alpha+')';ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(points[a].x,points[a].y);ctx.lineTo(points[b].x,points[b].y);ctx.stroke();}
    points.forEach((point,i)=>{const alpha=Math.max(.18,.6+point.z*.2);ctx.fillStyle='rgba(225,225,225,'+alpha+')';ctx.beginPath();ctx.arc(point.x,point.y,point.z>0?2.1:1.3,0,TAU);ctx.fill();if(i%17===0&&point.z>0){ctx.strokeStyle='#dcdcdc30';ctx.beginPath();ctx.arc(point.x,point.y,6,0,TAU);ctx.stroke();}});
    for(let i=0;i<5;i++){const edge=edges[(i*29)%edges.length],p=points[edge[0]],q=points[edge[1]],t=(time*.25+i*.2)%1;ctx.fillStyle='#f0f0f0';ctx.beginPath();ctx.arc(p.x+(q.x-p.x)*t,p.y+(q.y-p.y)*t,1.8,0,TAU);ctx.fill();}
  }
  function draw(){ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);guides();const project=projection();if(mode==='form')drawForm(project);else if(mode==='signal')drawSignal();else drawNetwork(project);}
  function tick(stamp){frame=0;if(paused||!visible||document.hidden)return;const delta=last?Math.min((stamp-last)/1000,.05):0;last=stamp;time+=delta;angleX+=(targetX-angleX)*.12;angleY+=(targetY-angleY)*.12;draw();frame=requestAnimationFrame(tick);}
  function schedule(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;draw();if(!paused&&visible&&!document.hidden)frame=requestAnimationFrame(tick);}
  function resize(){const box=canvas.getBoundingClientRect();width=Math.max(1,box.width);height=Math.max(1,box.height);dpr=Math.min(window.devicePixelRatio||1,compact()?1.5:1.8);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);schedule();}
  function updateCoords(){document.getElementById('coord-x').textContent=targetX.toFixed(2);document.getElementById('coord-y').textContent=targetY.toFixed(2);}
  document.querySelectorAll('[data-art]').forEach(button=>button.addEventListener('click',()=>{
    mode=button.dataset.art;const labels={form:'TORUS / ℝ³',signal:'WAVEFORM / f(t)',network:'GRAPH / G(V,E)'};document.getElementById('art-mode-label').textContent=labels[mode];
    document.querySelectorAll('[data-art]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    canvas.setAttribute('aria-label',(mode==='form'?'A rotating mathematical torus':mode==='signal'?'An animated layered waveform':'A rotating connected network')+'. Drag to explore, or use the arrow keys.');
    if(!paused&&typeof canvas.animate==='function')canvas.animate([{opacity:.2,transform:'scale(.97)'},{opacity:1,transform:'scale(1)'}],{duration:450,easing:'cubic-bezier(.22,1,.36,1)'});schedule();
  }));
  canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'&&event.button!==0)return;dragging=true;lastX=event.clientX;lastY=event.clientY;canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener('pointermove',event=>{
    const bounds=canvas.getBoundingClientRect();
    if(dragging){targetY+=(event.clientX-lastX)*.008;targetX+=(event.clientY-lastY)*.008;lastX=event.clientX;lastY=event.clientY;updateCoords();}
    else if(event.pointerType==='mouse'){hoverX=(event.clientX-bounds.left)/width-.5;hoverY=(event.clientY-bounds.top)/height-.5;}
    if(paused){angleX=targetX;angleY=targetY;draw();}
  });
  function release(){dragging=false;}
  canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
  canvas.addEventListener('pointerleave',()=>{if(!dragging){hoverX=0;hoverY=0;if(paused)draw();}});
  canvas.addEventListener('keydown',event=>{const keys=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];if(!keys.includes(event.key))return;event.preventDefault();if(event.key==='ArrowUp')targetX-=.15;if(event.key==='ArrowDown')targetX+=.15;if(event.key==='ArrowLeft')targetY-=.15;if(event.key==='ArrowRight')targetY+=.15;updateCoords();if(paused){angleX=targetX;angleY=targetY;draw();}});
  window.addEventListener('cathos:motion',event=>{paused=event.detail.paused;schedule();});
  document.addEventListener('visibilitychange',schedule);
  if('IntersectionObserver'in window){new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{rootMargin:'80px'}).observe(container);}
  if('ResizeObserver'in window)new ResizeObserver(resize).observe(canvas);else window.addEventListener('resize',resize);
  resize();updateCoords();
})();
