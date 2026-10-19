(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  const projects = {
  "adballoon": {
    "number": "01",
    "category": "PRODUCT / UPCROSSING AI",
    "filter": "systems",
    "title": "AdBalloon",
    "lead": "Video ads from a business’s existing photos and information.",
    "tags": [
      "FastAPI",
      "Google Pub/Sub",
      "FFmpeg"
    ],
    "body": "I’m building AdBalloon with my co-founders at Upcrossing AI. A business owner finds their business, reviews its profile and assets, then generates a short video. I work on collecting business data, ranking visual assets, grounding scripts in retrieved facts, and rendering the result. The current backend uses separate workers, Google Pub/Sub, PostgreSQL, and Google Cloud Storage. The product is in development.",
    "url": "https://www.upcrossing.ai/",
    "label": "Visit Upcrossing AI"
  },
  "agentic": {
    "number": "02",
    "category": "AGENTS / SPEECH DATA",
    "filter": "systems",
    "title": "Dialogue generation",
    "lead": "Simulated conversations for an emotional speech dataset.",
    "tags": [
      "Python",
      "OpenAI",
      "Pydantic"
    ],
    "body": "A Python tool with separate user, assistant, and reviewer roles. The simulated user has private scenario information; the assistant responds only to what is disclosed in the conversation. A reviewer controls when the exchange should end or stop after repeated stalls. Recent work adds candidate concerns and opening lines, with a selected opening used to seed the full conversation.",
    "url": "https://github.com/cathal0317/Agentic_generation"
  },
  "emosteer": {
    "number": "03",
    "category": "SPEECH / ACTIVATION STEERING",
    "filter": "speech",
    "title": "EmoSteer / F5-TTS",
    "lead": "Emotion control during inference, without retraining the model.",
    "tags": [
      "PyTorch",
      "F5-TTS",
      "Activation steering"
    ],
    "body": "My unofficial implementation of EmoSteer for F5-TTS. It extracts emotion directions from reference speech and applies them to residual-stream activations during inference. The implementation includes controls for steering strength, target layers, and token masks, with emotion2vec-based top-k selection.",
    "url": "https://github.com/cathal0317/emosteer-tts-unofficial"
  },
  "sohri": {
    "number": "04",
    "category": "AGENTIC SYSTEMS / RUNTIME",
    "filter": "systems",
    "title": "Sohri dialogue runtime",
    "lead": "Graph validation, intent routing, and multi-turn state.",
    "tags": [
      "FastAPI",
      "Redis",
      "NLU"
    ],
    "body": "Sohri is a graph-based dialogue manager. I built validation and runtime components for mapping intents and entities to graph transitions, managing Redis-backed sessions, and catching schema errors, cycles, and unreachable nodes before execution.",
    "url": "https://github.com/cathal0317/chatbot-graph-builder"
  },
  "reward": {
    "number": "05",
    "category": "SPEECH / INFERENCE CONTROL",
    "filter": "speech",
    "title": "Reward alignment for TTS",
    "lead": "SMC sampling and reward guidance for diffusion-transformer TTS.",
    "tags": [
      "PyTorch",
      "SMC",
      "ODE / SDE"
    ],
    "body": "An inference-time reward-alignment experiment for diffusion-transformer text-to-speech. I implemented ODE-to-SDE conversion for stochastic sampling and an SMC resampling loop with latent-space rewards and effective sample size thresholds.",
    "url": "https://github.com/cathal0317/Reward_Alignment-Test"
  },
  "multimodal": {
    "number": "06",
    "category": "MULTIMODAL / ALIGNMENT",
    "filter": "systems",
    "title": "Speech-to-LLM alignment",
    "lead": "Whisper features projected into TinyLlama for transcription.",
    "tags": [
      "Whisper",
      "TinyLlama",
      "PyTorch"
    ],
    "body": "A small LLaVA-style speech experiment. Whisper encodes the audio, pooling reduces the sequence length, and a two-layer MLP projects the features into TinyLlama’s embedding space. Those features are prepended to text embeddings for transcript generation, with experiments on LibriSpeech.",
    "url": "https://github.com/cathal0317/LLaVa_Implementation"
  },
  "vevo": {
    "number": "07",
    "category": "SPEECH RESEARCH / GENERATION",
    "filter": "speech",
    "title": "Korean emotional TTS",
    "lead": "Adapting VEVO for Korean speech and emotional control.",
    "tags": [
      "VEVO",
      "Korean",
      "Speech synthesis"
    ],
    "body": "A speech-synthesis project adapting VEVO for Korean and controllable emotional generation. The work also included an IPA conversion pipeline for a grapheme-to-phoneme bottleneck, plus preprocessing and evaluation for speech experiments.",
    "url": "https://github.com/cathal0317/vevo"
  },
  "music": {
    "number": "08",
    "category": "RESEARCH / GROUP THEORY",
    "filter": "maths",
    "title": "Group theory & music",
    "lead": "My dissertation on triadic chord transformations.",
    "tags": [
      "Group theory",
      "Music",
      "Dissertation"
    ],
    "body": "My dissertation studies the group theory behind transformations of musical triads. P, L, and R connect major and minor chords while preserving two shared pitch classes. The interactive demo below lets you try those transformations and hear the resulting chords.",
    "url": "Cathal_Essay.pdf",
    "label": "Read the dissertation"
  }
};
  let toastTimeout;
  function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('visible'); clearTimeout(toastTimeout); toastTimeout=setTimeout(()=>el.classList.remove('visible'),3500); }
  function syncMotion() {
    document.body.classList.toggle('motion-paused',paused);
    const button=$('#motion-toggle');
    button.setAttribute('aria-pressed',String(paused));
    button.setAttribute('aria-label',paused?'Resume animations':'Pause animations');
    button.firstElementChild.textContent=paused?'▷':'Ⅱ';
    window.dispatchEvent(new CustomEvent('cathos:motion',{detail:{paused}}));
  }
  $('#motion-toggle').addEventListener('click',()=>{paused=!paused;syncMotion();});
  reduced.addEventListener('change',event=>{paused=event.matches;syncMotion();});
  syncMotion();

  // Project filtering keeps the archive and the featured work in one collection.
  $$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    $$('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    let count=0;
    $$('[data-category]').forEach(item=>{const visible=filter==='all'||item.dataset.category===filter;item.hidden=!visible;item.classList.remove('filter-enter');if(visible){count++;void item.offsetWidth;item.classList.add('filter-enter');}});
    $('#result-count').textContent=String(count).padStart(2,'0')+' PROJECTS';
  }));

  const projectDialog=$('#project-dialog'), terminalDialog=$('#terminal-dialog');
  function unlockScroll(){if(!$('dialog[open]'))document.body.classList.remove('modal-open');}
  [projectDialog,terminalDialog].forEach(dialog=>{
    dialog.addEventListener('close',unlockScroll);
    dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
  });
  function openProject(key){
    const project=projects[key];if(!project)return;
    if(terminalDialog.open)terminalDialog.close();
    $('#detail-category').textContent=project.category;
    $('#detail-number').textContent='PROJECT / '+project.number;
    $('#detail-title').textContent=project.title;
    $('#detail-lead').textContent=project.lead;
    $('#detail-body').textContent=project.body;
    $('#detail-tags').replaceChildren(...project.tags.map(tag=>{const span=document.createElement('span');span.textContent=tag;return span;}));
    const link=$('#detail-link');link.href=project.url;link.replaceChildren(document.createTextNode(project.label||'View on GitHub'));const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');link.append(arrow);
    $('#detail-extra').hidden=key!=='music';
    projectDialog.showModal();document.body.classList.add('modal-open');
  }
  $$('[data-project]').forEach(button=>button.addEventListener('click',()=>openProject(button.dataset.project)));
  $('[data-close-project]').addEventListener('click',()=>projectDialog.close());
  $('#detail-extra').addEventListener('click',()=>projectDialog.close());

  // The terminal uses text nodes for all typed input, never evaluated HTML or code.
  const commandInput=$('#command-input'), output=$('#terminal-output');
  const commandHistory=[];let historyIndex=0;let historyDraft='';
  const available=['help','about','projects','open','project','skills','technologies','contact','play','theme','clear','whoami','sudo','exit'];
  function openTerminal(){if(projectDialog.open)projectDialog.close();if(!terminalDialog.open)terminalDialog.showModal();document.body.classList.add('modal-open');commandInput.focus();}
  $$('[data-terminal]').forEach(button=>button.addEventListener('click',openTerminal));
  $('[data-close-terminal]').addEventListener('click',()=>terminalDialog.close());
  document.addEventListener('keydown',event=>{
    if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();terminalDialog.open?terminalDialog.close():openTerminal();}
    if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)&&!document.activeElement?.isContentEditable&&!$('dialog[open]')){event.preventDefault();openTerminal();}
  });
  function responseLine(text,parent){const line=document.createElement('div');line.textContent=text;parent.append(line);return line;}
  function responseLink(label,href,parent){const line=document.createElement('div'),link=document.createElement('a');link.textContent=label;link.href=href;if(!href.startsWith('mailto:')&&!href.startsWith('#')){link.target='_blank';link.rel='noopener noreferrer';}line.append(link);parent.append(line);}
  function appendResponse(raw){const entry=document.createElement('div');entry.className='terminal-entry';const prompt=document.createElement('div');prompt.className='entered-command';prompt.textContent=raw;const response=document.createElement('div');response.className='terminal-response';entry.append(prompt,response);output.append(entry);while(output.children.length>60)output.firstElementChild.remove();return response;}
  function listProjects(parent){Object.entries(projects).forEach(([key,p])=>responseLine(p.number+'  '+p.title+'  ['+key+']',parent));responseLine('\nUse open <number or name> to explore a project.',parent);}
  function runCommand(raw){
    const tokens=raw.trim().split(/\s+/),command=tokens[0].toLowerCase(),arg=tokens.slice(1).join(' ').toLowerCase();
    if(command==='clear'){output.replaceChildren();responseLine('Fresh start. Type help to look around.',output);return;}
    const response=appendResponse(raw);
    switch(command){
      case 'help':
        responseLine('Commands\n  about          Background and current work\n  projects       Selected projects\n  open <id>      Open a project (try open 1)\n  skills         Core areas of work\n  technologies   Tools and languages\n  contact        Email and social links\n  play           Open the chord demo\n\nTerminal\n  clear          Clear this terminal\n  exit           Return to the page\n\n↑ / ↓ history · Tab autocomplete · Esc close',response);break;
      case 'about':responseLine('I’m Cathal Lee, an AI engineer and the founder of Upcrossing AI. I’m building AdBalloon, which turns a business’s existing photos and information into video ads.\n\nMy work spans AI research, agentic systems, and product engineering. Outside work: cello, CrossFit, and cooking.',response);break;
      case 'projects':listProjects(response);break;
      case 'project':case 'open':{
        if(!arg){listProjects(response);break;}
        const keys=Object.keys(projects),number=Number(arg);
        const key=Number.isInteger(number)&&number>=1&&number<=keys.length?keys[number-1]:keys.find(k=>k===arg||projects[k].title.toLowerCase()===arg);
        if(key){responseLine('Opening '+projects[key].title+'…',response);openProject(key);}else responseLine('Project not found. Type projects for the available names and numbers.',response);break;
      }
      case 'skills':responseLine('• Speech synthesis and inference-time control\n• Multimodal model integration\n• Conversation generation and evaluation\n• API, worker, and queue-based pipelines\n• Data processing and validation',response);break;
      case 'technologies':responseLine('Languages     Python · TypeScript · C# · C++ · Java\nML            PyTorch · TensorFlow · Whisper · F5-TTS\nBackend       FastAPI · PostgreSQL · Redis\nFrontend      React · Next.js\nInfrastructure Docker · Google Pub/Sub · GCS · Git',response);break;
      case 'contact':responseLink('cathallee25@gmail.com','mailto:cathallee25@gmail.com',response);responseLink('github.com/cathal0317','https://github.com/cathal0317',response);responseLink('Upcrossing AI / AdBalloon','https://www.upcrossing.ai/',response);break;
      case 'play':terminalDialog.close();$('#play').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});$('#chord-reset').focus({preventScroll:true});break;
      case 'exit':terminalDialog.close();break;
      case 'whoami':responseLine('guest@cathos\nThis is a local portfolio terminal.',response);break;
      case 'sudo':responseLine('Permission denied. This terminal only supports the commands in help.',response);break;
      case 'theme':responseLine('Charcoal, grey, and off-white.',response);break;
      default:responseLine('Command not found: '+tokens[0]+'. Type help to see what’s available.',response);
    }
    output.scrollTop=output.scrollHeight;
  }
  $('#terminal-form').addEventListener('submit',event=>{event.preventDefault();const raw=commandInput.value.trim().slice(0,500);if(!raw)return;commandHistory.push(raw);if(commandHistory.length>100)commandHistory.shift();historyIndex=commandHistory.length;historyDraft='';commandInput.value='';runCommand(raw);});
  commandInput.addEventListener('keydown',event=>{
    if(event.key==='ArrowUp'){event.preventDefault();if(historyIndex===commandHistory.length)historyDraft=commandInput.value;if(historyIndex>0)commandInput.value=commandHistory[--historyIndex];}
    else if(event.key==='ArrowDown'){event.preventDefault();if(historyIndex<commandHistory.length-1)commandInput.value=commandHistory[++historyIndex];else{historyIndex=commandHistory.length;commandInput.value=historyDraft;}}
    else if(event.key==='Tab'&&!event.shiftKey){const value=commandInput.value.trim().toLowerCase();if(!value)return;const matches=available.filter(command=>command.startsWith(value));if(matches.length){event.preventDefault();if(matches.length===1)commandInput.value=matches[0]+' ';else{const response=appendResponse(value);responseLine('Matches: '+matches.join(', '),response);output.scrollTop=output.scrollHeight;}}}
  });

  // Clipboard failure leaves the visible address available for manual copying.
  $('#copy-email').addEventListener('click',async()=>{const status=$('#copy-status');try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText('cathallee25@gmail.com');status.textContent='Copied to clipboard';}catch{const range=document.createRange();range.selectNodeContents($('.email-group>a'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='Address selected — copy with Ctrl/Cmd+C';}setTimeout(()=>{status.textContent='';},4500);});
  $('#year').textContent=String(new Date().getFullYear());
  function clock(){const now=new Date();$('#local-clock').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(now);$('#local-clock').dateTime=now.toISOString();}
  clock();setInterval(clock,30000);
  let scrollScheduled=false;
  function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;$('.reading-progress').style.transform='scaleX('+(max>0?Math.min(1,Math.max(0,window.scrollY/max)):0)+')';scrollScheduled=false;}
  window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateProgress);}},{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
  if('IntersectionObserver' in window){
    const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('awaiting');revealObserver.unobserve(entry.target);}});},{threshold:0.08});
    if(!reduced.matches)$$('.section-heading,.project-card,.about-heading,.focus-list,.play-copy,.chord-lab,.contact-top').forEach(element=>{element.classList.add('reveal','awaiting');revealObserver.observe(element);});
    const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)$$('.site-header nav a').forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}),{rootMargin:'-15% 0px -55% 0px'});
    ['work','about','play'].forEach(id=>navObserver.observe(document.getElementById(id)));
  }

  // Three neo-Riemannian involutions: two shared pitches, one moving voice.
  const music=window.CathOSCore;
  const svgNS='http://www.w3.org/2000/svg';
  let chord={root:0,major:true},chordHistory=['C major'],displayNotes=music.notes(chord),morphId=0;
  const point=note=>{const angle=note*Math.PI/6-Math.PI/2;return{x:160+104*Math.cos(angle),y:144+104*Math.sin(angle)};};
  let displayPoints=displayNotes.map(point);
  const dotElements=[],labelElements=[];
  music.names.forEach((name,index)=>{
    const p=point(index),angle=index*Math.PI/6-Math.PI/2;
    const line=document.createElementNS(svgNS,'line');Object.entries({x1:160,y1:144,x2:p.x,y2:p.y,class:'pitch-spoke'}).forEach(([key,value])=>line.setAttribute(key,value));$('#pitch-lines').append(line);
    const dot=document.createElementNS(svgNS,'circle');Object.entries({cx:p.x,cy:p.y,r:3.5,class:'pitch-dot'}).forEach(([key,value])=>dot.setAttribute(key,value));$('#pitch-notes').append(dot);dotElements.push(dot);
    const label=document.createElementNS(svgNS,'text');Object.entries({x:160+126*Math.cos(angle),y:144+126*Math.sin(angle),class:'pitch-label'}).forEach(([key,value])=>label.setAttribute(key,value));label.textContent=name;$('#pitch-notes').append(label);labelElements.push(label);
  });
  function setPoints(points){$('#chord-polygon').setAttribute('points',points.map(p=>p.x.toFixed(2)+','+p.y.toFixed(2)).join(' '));}
  function renderChord(animate=true){
    const nextNotes=music.notes(chord),ordered=music.voiceLeading(displayNotes,nextNotes),target=ordered.map(point),start=displayPoints.map(p=>({...p}));
    cancelAnimationFrame(morphId);
    if(animate&&!reduced.matches&&!paused){let begin;const tick=time=>{if(begin===undefined)begin=time;const progress=Math.min(1,(time-begin)/420),ease=1-Math.pow(1-progress,3);displayPoints=start.map((p,index)=>({x:p.x+(target[index].x-p.x)*ease,y:p.y+(target[index].y-p.y)*ease}));setPoints(displayPoints);if(progress<1)morphId=requestAnimationFrame(tick);};morphId=requestAnimationFrame(tick);}else{displayPoints=target;setPoints(target);}
    displayNotes=ordered;
    dotElements.forEach((dot,index)=>{dot.classList.toggle('active',nextNotes.includes(index));labelElements[index].classList.toggle('active',nextNotes.includes(index));});
    $('#chord-name').textContent=music.chordName(chord);$('#chord-notes').textContent=nextNotes.map(note=>music.names[note]).join(' · ');
    $('#chord-map').setAttribute('aria-label',music.chordName(chord)+': '+nextNotes.map(note=>music.names[note]).join(', '));
    $('#chord-history').textContent=chordHistory.join(' → ');
  }
  $$('[data-transform]').forEach(button=>button.addEventListener('click',()=>{
    const op=button.dataset.transform,previous=music.chordName(chord);chord=music.transform(chord,op);const name=music.chordName(chord);
    chordHistory.push(op+' · '+name);if(chordHistory.length>4)chordHistory.shift();
    const labels={P:'Parallel',L:'Leading-tone exchange',R:'Relative'};
    $('#transform-description').textContent=op+' / '+labels[op]+': '+previous+' → '+name+'. Two notes stay.';
    button.classList.add('just-used');setTimeout(()=>button.classList.remove('just-used'),400);renderChord();
  }));
  $('#chord-reset').addEventListener('click',()=>{chord={root:0,major:true};chordHistory=['C major'];$('#transform-description').textContent='Back to C major. Choose a transformation.';renderChord(false);});
  let audioContext,activeVoices=[],audioTimer;
  $('#hear-chord').addEventListener('click',async()=>{
    const Audio=window.AudioContext||window.webkitAudioContext;
    if(!Audio){toast('Audio isn’t available in this browser. The visual experiment still works.');return;}
    try{
      audioContext=audioContext||new Audio();if(audioContext.state==='suspended')await audioContext.resume();
      activeVoices.forEach(voice=>{try{voice.stop();}catch{}});activeVoices=[];
      const now=audioContext.currentTime;const root=48+chord.root;
      [root,root+(chord.major?4:3),root+7].forEach((midi,index)=>{
        const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();oscillator.type='triangle';oscillator.frequency.value=440*Math.pow(2,(midi-69)/12);gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.055,now+.04+index*.015);gain.gain.exponentialRampToValueAtTime(.0001,now+1.8);oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start(now);oscillator.stop(now+1.85);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};activeVoices.push(oscillator);
      });
      const button=$('#hear-chord');button.lastChild.textContent=' Playing…';clearTimeout(audioTimer);audioTimer=setTimeout(()=>{button.lastChild.textContent='Hear chord';},1850);
    }catch{toast('Audio could not start. Try the Hear chord button again.');}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&audioContext?.state==='running')audioContext.suspend().catch(()=>{});});
  renderChord(false);
})();
