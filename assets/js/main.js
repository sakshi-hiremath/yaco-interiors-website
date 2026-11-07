/* shared: nav, menu, FAQ, lightbox */
const nav=document.getElementById('nav');
const solidAlways=!document.getElementById('home');
const upd=()=>nav.classList.toggle('solid',solidAlways||scrollY>60);
addEventListener('scroll',upd,{passive:true});upd();
const hb=document.getElementById('hamburger'),mm=document.getElementById('mobileMenu');
hb.onclick=()=>mm.classList.toggle('open');
function closeMobile(){mm.classList.remove('open')}
function toggleFaq(el){el.parentElement.classList.toggle('open')}
(function(){
  const imgs=[...document.querySelectorAll('.pd-grid img')]; if(!imgs.length) return;
  const lb=document.createElement('div'); lb.className='lb';
  lb.innerHTML='<button class="x" aria-label="Close">✕</button><button class="p" aria-label="Previous">‹</button><img alt=""><button class="n" aria-label="Next">›</button>';
  document.body.appendChild(lb); const im=lb.querySelector('img'); let i=0;
  const show=k=>{i=(k+imgs.length)%imgs.length;im.src=imgs[i].src;im.alt=imgs[i].alt};
  const open=k=>{show(k);lb.classList.add('open');document.body.style.overflow='hidden'};
  const close=()=>{lb.classList.remove('open');document.body.style.overflow=''};
  imgs.forEach((m,k)=>m.onclick=()=>open(k));
  lb.querySelector('.x').onclick=close; lb.querySelector('.p').onclick=e=>{e.stopPropagation();show(i-1)}; lb.querySelector('.n').onclick=e=>{e.stopPropagation();show(i+1)};
  lb.onclick=e=>{if(e.target===lb)close()};
  addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)});
})();

/* ACCENT WORDS: last words of each section title get the bronze gradient */
(function(){
  document.querySelectorAll('.section-h').forEach(h=>{
    if(h.querySelector('.grad')) return;
    const words=(h.textContent.trim().match(/\S+/g)||[]).length, k=words>=3?2:1;
    const re=k===2?/([^<>\s]+\s+[^<>\s]+)$/:/([^<>\s]+)$/;
    const html=h.innerHTML.trim(); if(re.test(html)) h.innerHTML=html.replace(re,'<span class="grad">$1</span>');
  });
})();

/* full-width photo slider (project pages) */
(function(){
  const s=document.getElementById('fsSlider'); if(!s) return;
  const slides=[...s.querySelectorAll('.fs-slide')], dots=[...s.querySelectorAll('.fs-dots button')], count=s.querySelector('.fs-count');
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches; let i=0,t=null,x0=null;
  const go=k=>{i=(k+slides.length)%slides.length;
    slides.forEach((el,n)=>el.classList.toggle('on',n===i));
    dots.forEach((d,n)=>d.classList.toggle('on',n===i));
    count.textContent=String(i+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');};
  const start=()=>{clearInterval(t); if(!reduce) t=setInterval(()=>go(i+1),5200)};
  const stop=()=>clearInterval(t);
  s.querySelector('.fs-prev').onclick=()=>{go(i-1);start()};
  s.querySelector('.fs-next').onclick=()=>{go(i+1);start()};
  dots.forEach((d,n)=>d.onclick=()=>{go(n);start()});
  s.addEventListener('mouseenter',stop); s.addEventListener('mouseleave',start);
  s.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
  s.addEventListener('touchend',e=>{if(x0==null) return; const dx=e.changedTouches[0].clientX-x0; x0=null;
    if(Math.abs(dx)>40){go(i+(dx<0?1:-1));start()}},{passive:true});
  document.addEventListener('keydown',e=>{const r=s.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return;
    if(e.key==='ArrowRight'){go(i+1);start()} if(e.key==='ArrowLeft'){go(i-1);start()}});
  go(0); start();
})();
