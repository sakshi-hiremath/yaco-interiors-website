
/* HERO SCROLL REEL: pinned, scroll-driven video reel behind the hero text. Edit PHOTOS (order, titles) and PX (scroll distance per photo). */
(function(){
const PHOTOS=[
 {src:'assets/videos/living-room.mp4',poster:'assets/videos/poster-living-room.jpg',title:'Living Room'},
 {src:'assets/videos/master-bedroom-landscape.mp4',srcPortrait:'assets/videos/master-bedroom-portrait.mp4',poster:'assets/videos/poster-master-bedroom-landscape.jpg',posterPortrait:'assets/videos/poster-master-bedroom-portrait.jpg',title:'Master Bedroom'},
 {img:'assets/images/hero/bedroom-hero.jpg',title:'Bedroom'}
];
const PX=850;
const $=id=>document.getElementById(id), N=PHOTOS.length, cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const WARM=1.35, ease=u=>u*u*u*(u*(6*u-15)+10), reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const track=$('home'), box=$('hslides');

const slides=PHOTOS.map(p=>{
  const el=document.createElement('div'); el.className='slide';
  if(p.img){ /* still photo slide */
    const bg=document.createElement('img'); bg.className='bgph'; bg.src=p.img; bg.alt=''; bg.setAttribute('aria-hidden','true'); bg.decoding='async';
    const im=document.createElement('img'); im.className='ph'; im.src=p.img; im.alt=p.title; im.decoding='async';
    el.appendChild(bg); el.appendChild(im); box.appendChild(el); el._v=null; el._src=p.img; el._srcP=p.img; el._posterL=p.img; el._posterP=p.img; return el;
  }
  const v=document.createElement('video'); v.className='ph'; v.muted=true; v.loop=true; v.playsInline=true; v.preload='none';
  v.setAttribute('muted',''); v.setAttribute('playsinline',''); v.setAttribute('aria-label',p.title); v.disablePictureInPicture=true;
  el.style.background='#5f4533 url('+p.poster+') center/cover no-repeat'; el.appendChild(v); box.appendChild(el); el._v=v; el._src=p.src; el._srcP=p.srcPortrait||p.src; el._posterL=p.poster; el._posterP=p.posterPortrait||p.poster; return el;
});
const isPortrait=()=>innerHeight>innerWidth;
const load=el=>{if(!el._v) return; el._v.preload='auto';
  const want=isPortrait()?el._srcP:el._src;
  if(el._v.getAttribute('src')!==want){ el._v.src=want; el.style.background='#0b0a09 url('+(isPortrait()?el._posterP:el._posterL)+') center/cover no-repeat'; }
};
const play=el=>{if(reduce||!el._v) return; load(el); const v=el._v; const n=performance.now(); if(v.paused&&(!el._t||n-el._t>700)){el._t=n;const r=v.play(); if(r&&r.catch) r.catch(()=>{})}};
const stop=el=>{if(!el._v) return; const v=el._v; if(!v.paused) v.pause(); if(v.currentTime>0.01){try{v.currentTime=0}catch(e){}}};

PHOTOS.forEach((p,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',p.title+' '+(i+1));
  b.onclick=()=>glide(i);$('hdots').appendChild(b)});

let top0=0;
const measure=()=>{track.style.height=((N-1)*PX+innerHeight)+'px'; top0=track.getBoundingClientRect().top+scrollY};
measure(); addEventListener('resize',measure); addEventListener('load',measure);
const pFromScroll=()=>cl((scrollY-top0)/PX,0,N-1), yOf=i=>top0+i*PX;
const pinned=()=>scrollY>=top0-2&&scrollY<=top0+(N-1)*PX+2;
const nearView=()=>scrollY>top0-innerHeight&&scrollY<top0+(N-1)*PX+innerHeight;

function render(p){
  const up=vel<-0.02;
  slides.forEach((el,i)=>{
    const d=p-i;
    if(Math.abs(d)<2) load(el);
    const vis=d>-1&&d<1, warm=(d<=-1&&d>-WARM)||(up&&d>=1&&d<WARM);
    if(!vis&&!warm){el.style.display='none';stop(el);return}
    el.style.display='block'; el.style.zIndex=i; play(el);   /* warm = already playing, still invisible, so the fade never starts on a frozen frame */
    if(!vis){el.style.opacity=d<=-1?0:1; el.style.transform='none'; return}
    if(d<0){ el.style.opacity=ease(1+d); el.style.transform=reduce?'none':`scale(${1+(-d)*0.08})`; }
    else{ el.style.opacity=1; el.style.transform=(reduce||d<0.002)?'none':`scale(${1+d*0.05})`; }
  });
}

let offDone=false, cur=0, vel=0, prev=performance.now(), lastShown=-1, snapping=false, snapDest=0, snapUntil=0, idle=true, lastScrollAt=0, restY=0;
const glide=i=>{i=cl(Math.round(i),0,N-1);snapping=true;snapDest=yOf(i);snapUntil=performance.now()+2400;
  scrollTo({top:snapDest,behavior:reduce?'auto':'smooth'})};
const stopGlide=()=>{if(snapping){snapping=false;idle=true;restY=scrollY}};
['wheel','touchstart','pointerdown'].forEach(e=>addEventListener(e,stopGlide,{passive:true}));
addEventListener('scroll',()=>{if(snapping)return;idle=false;lastScrollAt=performance.now()},{passive:true});

const modalOpen=()=>document.querySelector('.modal.open')||$('mobileMenu').classList.contains('open');
addEventListener('keydown',e=>{
  if(!pinned()||modalOpen()) return;
  const nxt=['ArrowDown','ArrowRight','PageDown',' '], prv=['ArrowUp','ArrowLeft','PageUp'];
  const at=Math.round(pFromScroll());
  if(nxt.includes(e.key)){ if(at>=N-1) return; e.preventDefault();glide(at+1)}
  else if(prv.includes(e.key)){ if(at<=0) return; e.preventDefault();glide(at-1)}
});
let tx=0,ty=0;
addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{if(!pinned())return;const t=e.changedTouches[0],dx=t.clientX-tx,dy=t.clientY-ty;
  if(Math.abs(dx)>60&&Math.abs(dx)>1.6*Math.abs(dy)) glide(Math.round(pFromScroll())+(dx<0?1:-1))},{passive:true});

const W0=5.2;
function tick(now){
  now=now||performance.now(); const dt=Math.min(0.1,(now-prev)/1000); prev=now;
  if(!nearView()){ idle=true; restY=scrollY; if(!offDone){slides.forEach(stop);offDone=true} requestAnimationFrame(tick); return }
  offDone=false;
  if(snapping){ if(Math.abs(scrollY-snapDest)<2||now>snapUntil){snapping=false;idle=true;restY=scrollY} }
  else if(idle) restY=scrollY;
  else if(now-lastScrollAt>160){
    idle=true;
    if(pinned()){
      const p=pFromScroll(), moved=scrollY-restY, f=p-Math.floor(p);
      if(Math.abs(moved)>3){
        if(moved>0) glide(f>0.12?Math.ceil(p):Math.floor(p)); else glide((1-f)>0.12?Math.floor(p):Math.ceil(p));
      }else glide(Math.round(p));
    }
  }
  const target=pFromScroll();
  for(let n=Math.max(1,Math.round(dt*120)),h=dt/n;n>0;n--){const a=W0*W0*(target-cur)-2*W0*vel;vel+=a*h;cur+=vel*h}
  if(Math.abs(target-cur)<0.0004&&Math.abs(vel)<0.002){cur=target;vel=0}
  render(cur);
  const k=Math.round(cur);
  if(k!==lastShown){ const first=lastShown===-1; lastShown=k; const c=$('hcap'); c.classList.add('swap');
    setTimeout(()=>{$('htitle').textContent=PHOTOS[k].title;$('hcount').textContent=String(k+1).padStart(2,'0')+' / '+String(N).padStart(2,'0');c.classList.remove('swap')},first?0:220);
    [...$('hdots').children].forEach((d,i)=>d.classList.toggle('act',i===k)); }
  $('hhint').style.opacity=(scrollY-top0)>30?0:1;
  requestAnimationFrame(tick);
}
render(0); requestAnimationFrame(tick);
})();
