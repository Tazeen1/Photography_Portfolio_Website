const cursor=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX;
  my=e.clientY;
  cursor.style.transform=`translate(${mx-4}px,${my-4}px)`;
});

(function animate(){
  rx+=(mx-rx)*0.12;
  ry+=(my-ry)*0.12;
  ring.style.transform=`translate(${rx-18}px,${ry-18}px)`;
  requestAnimationFrame(animate);
})();

document.querySelectorAll('a,button,.gallery-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    ring.style.width='60px';
    ring.style.height='60px';
    ring.style.opacity='0.3';
  });
  el.addEventListener('mouseleave',()=>{
    ring.style.width='36px';
    ring.style.height='36px';
    ring.style.opacity='0.5';
  });
});

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
},{threshold:0.12});

document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

function handleSubmit(e){
  e.preventDefault();
  const btn=e.target.querySelector('.btn-submit');
  btn.textContent='Message Sent ✓';
  btn.style.background='#4a7c59';
  btn.style.color='#f0ece4';

  setTimeout(()=>{
    btn.textContent='Send Message →';
    btn.style.background='';
    btn.style.color='';
    e.target.reset();
  },3000);
}

const menuBtn=document.getElementById('menuBtn'),
navLinks=document.getElementById('navLinks');

let open=false;

menuBtn.addEventListener('click',()=>{
  open=!open;
  navLinks.style.cssText=open
    ? 'display:flex;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(10,10,10,0.97);align-items:center;justify-content:center;gap:2.5rem;z-index:99;'
    : '';
});

navLinks.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',()=>{
    open=false;
    navLinks.style.cssText='';
  });
});